# Copyright 2016 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""A module for prediction server related TensorFlow functionality.

This module is used by the prediction_server.py to perform tensorflow session
related operations. E.g. restore a session, do inference using a session.
"""
from __future__ import print_function

import logging
import os
import re
import subprocess
import time

import grpc
from grpc.beta import implementations

import prediction.prediction_lib as mlprediction
from prediction._interfaces import PredictionClient

from tensorflow.core.protobuf import config_pb2
from tensorflow.python.framework import tensor_util
from tensorflow.python.saved_model import signature_constants
from tensorflow.python.saved_model import tag_constants
from tensorflow_serving.apis import get_model_metadata_pb2
from tensorflow_serving.apis import predict_pb2
from tensorflow_serving.apis import prediction_service_pb2

MODEL_SERVER_PORT = 8081
ONE_YEAR_SECS = int(3.154e7)

# We're going to delete the model from disk and don't want ModelServer to
# unload the model. To accomplish this, we instruct ModelServer to wait
# a very long time before polling the file system for updates. Since the
# uptime for any given instance is << 1 year (e.g., PCRs), we'll set this
# polling interval to 1 year.
MODEL_SERVER_FS_POLLING_INTERVAL = ONE_YEAR_SECS

# Maximum message length for grpc messages. We pick max message length to be
# 32MiB to match AppEngine limit of 32MiB message size.
MAX_MESSAGE_LENGTH_MB = 1024 * 1024 * 32
# Maximum time to wait for model server startup.
MAX_STARTUP_TIMEOUT_SEC = 120
MODEL_RELOAD_SEC = 30

GET_MODEL_METADATA_DEADLINE_SECS = 60

MODEL_SERVER_CREATE_REQUEST_TIME = "Prediction-Model-Server-Create-Request-Time"
MODEL_SERVER_PARSE_RESPONSE_TIME = (
    "Prediction-Model-Server-Parse-Response-Time")
MODEL_SERVER_ENGINE_NAME = "MODEL_SERVER"
TENSORFLOW_FRAMEWORK_NAME = "TENSORFLOW"
# The deadline for calls to model server.
PREDICT_DEADLINE_SECS = 160

SIGNATURE_KEY = "signature"


def create_predict_request(batched_instances, inputs_type_map, signature_name):
  """Returns the PredictRequest proto for ModelServer."""
  predict_request = predict_pb2.PredictRequest()
  predict_request.model_spec.name = "default"
  predict_request.model_spec.signature_name = signature_name
  for alias, val in batched_instances.iteritems():
    if alias not in inputs_type_map:
      raise mlprediction.PredictionError(
          mlprediction.PredictionError.INVALID_INPUTS,
          "Unexpected tensor name: " + alias)
    predict_request.inputs[alias].CopyFrom(tensor_util.make_tensor_proto(
        val, inputs_type_map[alias].dtype))
  return predict_request


def create_tf_model(model_path, flags):
  """Returns the appropriate Model implementation based on env vars."""
  engine = os.environ.get("prediction_engine",
                          MODEL_SERVER_ENGINE_NAME)
  if engine == MODEL_SERVER_ENGINE_NAME:
    logging.debug("Starting model server from %s", model_path)
    try:
      _, stub = _start_model_server(model_path, flags)
    except Exception as e:  # pylint: disable=broad-except
      logging.critical("Could not load ModelServer.\n%s", str(e))
      raise mlprediction.PredictionError(
          mlprediction.PredictionError.FAILED_TO_LOAD_MODEL,
          "Could not load model: {}".format(e))
    signature_map = _get_model_signature_map(stub)
    if not signature_map:
      raise mlprediction.PredictionError(
          mlprediction.PredictionError.FAILED_TO_LOAD_MODEL,
          "Could not get signature map from the model. ")
    client = ModelServerClient(stub, signature_map)
  elif engine == mlprediction.SESSION_RUN_ENGINE_NAME:
    session, signature_map = _get_session_and_signature_map(model_path, flags)
    client = mlprediction.SessionClient(session, signature_map)
  else:
    logging.critical("Illegal prediction engine %s", engine)
    raise mlprediction.PredictionError(
        mlprediction.PredictionError.FAILED_TO_LOAD_MODEL,
        "Illegal prediction engine %s" % engine)

  return mlprediction.create_model(client, model_path)


def parse_error_message(stderr_data):
  """Parses the stderr data and returns only the message with ERROR level."""
  messages = stderr_data.split("\n")
  result = ""

  # Each line of message should be: date, time, log level, line number, message.
  # E.g. 2017-10-03 18:25:19.742351: E file.cc: xx xxxx.
  # We only want the message with ERROR level.
  pattern = r"(\d+-\d+-\d+) (\d+:\d+:\d+.\d+:) ([EWI]) (\S+) (.*)"
  def _get_log_level_and_message(line):
    match = re.match(pattern, line)
    if match is None:
      return None, line
    else:
      return match.group(3), match.group(5)

  previous_is_error = False
  for message in messages:
    log_level, message_wthout_timestamp = _get_log_level_and_message(message)
    if log_level == "E":
      result += message_wthout_timestamp
      result += "\n"
      previous_is_error = True
    elif log_level == "W" or log_level == "I":
      previous_is_error = False
    else:
      # No log level, part of multiline message.
      if previous_is_error:
        result += message
        result += "\n"
  return result


def _start_model_server(model_path, flags):
  """Start the model server as a subprocess.

  Args:
    model_path: string path to pass to model server in --model_base_path flag
    flags: a _FlagConfig object containing configuration for the webapp

  Returns:
    model_server: model server process
    stub: grpc stub to PredictionService running on model server

  Raises:
    RuntimeError: if model server fails to come up and is used as prediction
    engine.
  """
  if not model_path.startswith("@"):
    port = "--port=%s" % MODEL_SERVER_PORT
    tensorflow_session_parallelism = (
        flags.tensorflow_session_parallelism or
        os.environ.get("tensorflow_session_parallelism") or 0)
    args = [
        flags.model_server_binary_path, port,
        "--model_base_path={}".format(os.path.dirname(model_path)),
        "--file_system_poll_wait_seconds={}".format(
            MODEL_SERVER_FS_POLLING_INTERVAL),
        "--tensorflow_session_parallelism={}".format(
            tensorflow_session_parallelism)
    ]
    logging.debug("Starting model server: %s", args)
    model_server = subprocess.Popen(args=args, stdin=None)
    hostport = "localhost:%s" % MODEL_SERVER_PORT
  else:
    model_server = None
    hostport = model_path[1:]
  logging.debug("Connecting to model server at %s", hostport)
  channel = grpc.insecure_channel(
      hostport,
      options=[("grpc.max_receive_message_length", MAX_MESSAGE_LENGTH_MB),
               ("grpc.max_send_message_length", MAX_MESSAGE_LENGTH_MB),
               ("grpc.max_message_length", MAX_MESSAGE_LENGTH_MB),
               ("grpc.testing.fixed_reconnect_backoff_ms", 1000)])
  channel_ready_future = grpc.channel_ready_future(channel)
  model_server_startup_timeout_secs = os.environ.get(
      "startup_timeout", MAX_STARTUP_TIMEOUT_SEC)
  try:
    channel_ready_future.result(timeout=model_server_startup_timeout_secs)
  except grpc.FutureTimeoutError:
    model_server.terminate()
    # Reload the model. This time we pipe the stderr to get the error message.
    model_server = subprocess.Popen(
        args=args, stdin=None, stderr=subprocess.PIPE)
    time.sleep(MODEL_RELOAD_SEC)
    model_server.terminate()
    _, stderr_data = model_server.communicate()
    raise RuntimeError(parse_error_message(stderr_data))
  grpc_channel = implementations.Channel(channel)
  stub = prediction_service_pb2.beta_create_PredictionService_stub(
      grpc_channel, pool=None, pool_size=None)

  logging.debug("Connected to model server at %s", hostport)
  return model_server, stub


def _get_model_signature_map(model_server):
  """Get signature def for the model from model server.

  If model server request fails OR if returned signature is missing input
  dtypes, fallback to getting signatures by loading session locally.

  Args:
    model_server: stub to a running model server

  Returns:
    an object of type meta_graph_pb2.SignatureDef populated with model
    signature.

  Raises:
    grpc.RpcError: if request to model server fails.
  """
  request = get_model_metadata_pb2.GetModelMetadataRequest()
  request.model_spec.name = "default"
  request.metadata_field.append("signature_def")
  try:
    response = model_server.GetModelMetadata(request,
                                             GET_MODEL_METADATA_DEADLINE_SECS)
  except grpc.RpcError as rpc_error:
    logging.exception("GetModelMetadata call to model server failed with code "
                      "%s and message %s", rpc_error.code(),
                      rpc_error.details())
    return None

  signature_def_map_proto = get_model_metadata_pb2.SignatureDefMap()
  response.metadata["signature_def"].Unpack(signature_def_map_proto)
  signature_def_map = signature_def_map_proto.signature_def
  if not signature_def_map:
    logging.error("Graph has no signatures.")

  # Delete incomplete signatures without input dtypes.
  invalid_signatures = []
  for signature_name in signature_def_map:
    for tensor in signature_def_map[signature_name].inputs.itervalues():
      if not tensor.dtype:
        logging.warn("Signature %s has incomplete dtypes, removing from "
                     "usable signatures", signature_name)
        invalid_signatures.append(signature_name)
        break
  for signature_name in invalid_signatures:
    del signature_def_map[signature_name]

  return signature_def_map


def _get_session_and_signature_map(model_path, flags):
  """Load session and signature from local disk.

  Args:
    model_path: string path to a local directory containing model files
    flags: a _FlagConfig object containing configuration for the webapp

  Returns:
    session, signature_map: session is an object of Session type and
      signature_map is a map<string, SignatureDef>.
  """
  parallelism = (
      flags.tensorflow_session_parallelism or
      int(os.environ.get("tensorflow_session_parallelism", "0")))
  config = config_pb2.ConfigProto(inter_op_parallelism_threads=parallelism,
                                  intra_op_parallelism_threads=parallelism)
  try:
    return mlprediction.load_model(
        model_path,
        tags=[tag_constants.SERVING],
        config=config)
  except Exception:  # pylint: disable=broad-except
    error_msg = "Couldn't restore session from location: {}.".format(
        model_path)
    logging.exception(error_msg)
    raise


class ModelServerClient(PredictionClient):
  """A loaded Tensorflow model to be used for prediction."""

  def __init__(self, stub, signature_map):
    """Constructs the client.

    Args:
      stub: the stub to the ModelServer.
      signature_map: the map of signature name to SignatureDef
        describing the inputs and the output of the model.
    """
    self._stub = stub
    self._signature_map = signature_map

  @property
  def signature_map(self):
    return self._signature_map

  def predict(self, inputs, stats=None,
              signature_name=(signature_constants.
                              DEFAULT_SERVING_SIGNATURE_DEF_KEY),
              **unused_kwargs):
    """Predicts over the input_list."""
    stats = stats or mlprediction.Stats()
    stats[mlprediction.ENGINE] = MODEL_SERVER_ENGINE_NAME
    stats[mlprediction.FRAMEWORK] = TENSORFLOW_FRAMEWORK_NAME

    with stats.time(MODEL_SERVER_CREATE_REQUEST_TIME):
      try:
        request = create_predict_request(
            inputs,
            self._signature_map[signature_name].inputs,
            signature_name)
      except Exception as e:  # pylint: disable=broad-except
        raise mlprediction.PredictionError(
            mlprediction.PredictionError.INVALID_INPUTS,
            "Error processing input: " + str(e))

    with stats.time(mlprediction.SESSION_RUN_TIME):
      try:
        response = self._stub.Predict(request, PREDICT_DEADLINE_SECS)
      except Exception as e:  # pylint: disable=broad-except
        raise mlprediction.PredictionError(
            mlprediction.PredictionError.FAILED_TO_RUN_MODEL,
            "Exception during model execution: " + str(e))
    with stats.time(MODEL_SERVER_PARSE_RESPONSE_TIME):
      return {name: tensor_util.MakeNdarray(val)
              for name, val in response.outputs.items()}
