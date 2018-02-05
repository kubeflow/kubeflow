# Copyright 2017 Google Inc. All Rights Reserved.
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
"""Tests for tf_prediction_server_lib."""
import base64
import mock
import os
import shutil
import tempfile

import tensorflow as tf

import tf_prediction_server_lib
from prediction import prediction_lib as mlprediction

from tensorflow.core.framework import types_pb2
from tensorflow.core.protobuf import meta_graph_pb2
from tensorflow.python.framework import tensor_util

from tensorflow_serving.apis import get_model_metadata_pb2
from tensorflow_serving.apis import predict_pb2


def make_response(response_dict):
  response = predict_pb2.PredictResponse()
  for key, val in response_dict.iteritems():
    response.outputs[key].CopyFrom(tensor_util.make_tensor_proto(val))
  return response


def example(x1, x2):
  return tf.train.Example(features=tf.train.Features(feature={
      "x1": tf.train.Feature(float_list=tf.train.FloatList(value=[x1])),
      "x2": tf.train.Feature(float_list=tf.train.FloatList(value=[x2]))
  }))


def create_model_using_session(model_path):
  session, signature_map = mlprediction.load_model(
      model_path, tags=[tf.saved_model.tag_constants.SERVING])
  client = mlprediction.SessionClient(session, signature_map)
  return mlprediction.create_model(client, model_path)


def create_model_from_server(model_server, model_path):
  session, signature_map = mlprediction.load_model(
      model_path, tags=[tf.saved_model.tag_constants.SERVING])

  # Session is not used; close it.
  session.close()
  client = tf_prediction_server_lib.ModelServerClient(model_server,
                                                      signature_map)
  return mlprediction.create_model(client, model_path)


def build_signature(inputs, outputs):
  """Build the signature.

  Not using predict_signature_def in saved_model because it is replacing the
  tensor name, b/35900497.

  Args:
    inputs: a dictionary of tensor name to tensor
    outputs: a dictionary of tensor name to tensor
  Returns:
    The signature, a SignatureDef proto.
  """
  signature_inputs = {
      key: tf.saved_model.utils.build_tensor_info(tensor)
      for key, tensor in inputs.items()
  }
  signature_outputs = {
      key: tf.saved_model.utils.build_tensor_info(tensor)
      for key, tensor in outputs.items()
  }

  signature_def = tf.saved_model.signature_def_utils.build_signature_def(
      signature_inputs, signature_outputs,
      tf.saved_model.signature_constants.PREDICT_METHOD_NAME)

  return signature_def


def export_model_with_single_string_input(saved_model_path):
  tf.reset_default_graph()
  with tf.Session() as sess:
    examples = tf.placeholder(shape=(None,), dtype=tf.string)
    x1, x2 = tf.decode_csv(examples, record_defaults=[[0.0], [0.0]])
    y1 = tf.add(tf.multiply(0.5, x1), 2.0)
    y2 = tf.multiply(y1, x2)
    y3 = tf.multiply(y1, y2)
    inputs = {"examples": examples}
    outputs = {"y1": y1, "y2": y2, "y3": y3}

    init_op = tf.initialize_all_variables()
    builder = tf.saved_model.builder.SavedModelBuilder(saved_model_path)
    signature_def = build_signature(inputs=inputs, outputs=outputs)
    signature_def_map = {
        tf.saved_model.signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY:
            signature_def
    }
    builder.add_meta_graph_and_variables(
        sess,
        tags=[tf.saved_model.tag_constants.SERVING],
        signature_def_map=signature_def_map,
        main_op=init_op)
    builder.save()


class PredictionServerLibTest(tf.test.TestCase):

  def setUp(self):
    self.test_dir = tempfile.mkdtemp()

  def tearDown(self):
    shutil.rmtree(self.test_dir)

  def testPredictRequestFromBatchedJson(self):
    a_info = meta_graph_pb2.TensorInfo(
        name="a_unaliased", dtype=types_pb2.DT_FLOAT)
    b_info = meta_graph_pb2.TensorInfo(
        name="b_unaliased", dtype=types_pb2.DT_STRING)
    input_signature = {"a": a_info, "b": b_info}
    batched_strings = {"a": [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]],
                       "b": ["a", "c", "e"]}
    expected_predict_request = predict_pb2.PredictRequest(
        inputs={
            "a": tensor_util.make_tensor_proto(
                [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]],
                input_signature["a"].dtype),
            "b": tensor_util.make_tensor_proto(
                ["a", "c", "e"],
                input_signature["b"].dtype)
        })
    expected_predict_request.model_spec.name = "default"
    expected_predict_request.model_spec.signature_name = "signature"
    predict_request = (
        tf_prediction_server_lib.create_predict_request(
            batched_strings, input_signature, "signature"))
    self.assertProtoEquals(predict_request, expected_predict_request)

  def testPredictRequestWithInt64InputTensors(self):
    a_info = meta_graph_pb2.TensorInfo(
        name="a_unaliased", dtype=types_pb2.DT_INT64)
    b_info = meta_graph_pb2.TensorInfo(
        name="b_unaliased", dtype=types_pb2.DT_STRING)
    input_signature = {"a": a_info, "b": b_info}
    batched_strings = {"a": [[1, 2], [3, 4], [5, 6]],
                       "b": ["a", "c", "e"]}
    expected_predict_request = predict_pb2.PredictRequest(
        inputs={
            "a": tensor_util.make_tensor_proto(
                [[1, 2], [3, 4], [5, 6]], input_signature["a"].dtype),
            "b": tensor_util.make_tensor_proto(["a", "c", "e"],
                                               input_signature["b"].dtype)
        })
    expected_predict_request.model_spec.name = "default"
    expected_predict_request.model_spec.signature_name = "signature"
    predict_request = (
        tf_prediction_server_lib.create_predict_request(
            batched_strings, input_signature, "signature"))
    self.assertEqual(predict_request.inputs["a"].dtype, types_pb2.DT_INT64)
    self.assertProtoEquals(predict_request, expected_predict_request)

  def testPredictRequestFromBatchedStrings(self):
    preprocessed_instances = [
        example(1, 3).SerializeToString(),
        example(2, -4).SerializeToString(),
        example(0, 0).SerializeToString(),
    ]

    input_signature = {"a": meta_graph_pb2.TensorInfo(
        name="a_unaliased",
        dtype=types_pb2.DT_STRING)}
    batched_strings = {"a": preprocessed_instances}
    expected_predict_request = predict_pb2.PredictRequest(
        inputs={
            "a": tensor_util.make_tensor_proto(preprocessed_instances,
                                               input_signature["a"].dtype)
        })
    expected_predict_request.model_spec.name = "default"
    expected_predict_request.model_spec.signature_name = "signature"
    predict_request = (
        tf_prediction_server_lib.create_predict_request(
            batched_strings, input_signature, "signature"))
    self.assertProtoEquals(predict_request, expected_predict_request)

  def testPredictRequestUnexpectedTensor(self):
    preprocessed_instances = [
        example(1, 3).SerializeToString(),
        example(2, -4).SerializeToString(),
        example(0, 0).SerializeToString(),
    ]

    input_signature = {"a": meta_graph_pb2.TensorInfo(
        name="a_unaliased",
        dtype=types_pb2.DT_STRING)}
    batched_strings = {"a": preprocessed_instances, "b": [[1], [2], [3]]}

    with self.assertRaises(mlprediction.PredictionError) as error:
      tf_prediction_server_lib.create_predict_request(
          batched_strings, input_signature, "signature")

    self.assertTrue("Unexpected tensor name: b" in error.exception.error_detail)

  @mock.patch(
      "tensorflow_serving.apis.prediction_service_pb2.BetaPredictionServiceStub")
  def testCreatePredictRequestFromBatchedStrings(self, mock_model_server):
    def features(x1, x2):
      return tf.train.Features(feature={
          "x1": tf.train.Feature(float_list=tf.train.FloatList(value=[x1])),
          "x2": tf.train.Feature(float_list=tf.train.FloatList(value=[x2]))
      })
    batched_instances = {
        "examples": [
            tf.train.Example(features=features(1, 3)).SerializeToString(),
            tf.train.Example(features=features(2, -4)).SerializeToString(),
            tf.train.Example(features=features(0, 0)).SerializeToString()]
    }
    input_signature = {"examples": meta_graph_pb2.TensorInfo(
        name="examples_unaliased",
        dtype=types_pb2.DT_STRING)}

    expected_predict_request = predict_pb2.PredictRequest(
        inputs={
            "examples": tensor_util.make_tensor_proto(
                batched_instances["examples"],
                input_signature["examples"].dtype)
        })
    expected_predict_request.model_spec.name = "default"
    expected_predict_request.model_spec.signature_name = "signature"
    predict_request = (
        tf_prediction_server_lib.create_predict_request(
            batched_instances, input_signature, "signature"))
    self.assertProtoEquals(expected_predict_request, predict_request)

  def testModelWithStringBasedInputUsingSessionRun(self):
    input_list = ["1, 3", "2, -4", "0, 0"]
    model_path = os.path.join(
        self.test_dir, "testModelWithStringBasedInputUsingSessionRun")
    export_model_with_single_string_input(model_path)
    model = create_model_using_session(model_path)

    _, predictions = model.predict(input_list, stats=mlprediction.Stats())

    # y1 = 0.5 * x1 + 2.0
    # y2 = y1 * x2
    # y3 = y1 * y2
    self.assertEqual(
        list(predictions), [{"y1": 2.5,
                             "y2": 7.5,
                             "y3": 18.75},
                            {"y1": 3.0,
                             "y2": -12.0,
                             "y3": -36.0},
                            {"y1": 2.0,
                             "y2": 0.0,
                             "y3": 0.0},])

  def _serializedToExample(self, serialized):
    """Create an Example proto from its serialized version."""
    example_proto = tf.train.Example()
    example_proto.ParseFromString(serialized)
    return example_proto

  def _assertProtoListEquals(self, list_a, list_b):
    for serialized_a, serialized_b in zip(list_a, list_b):
      self.assertEqual(self._serializedToExample(serialized_a),
                       self._serializedToExample(serialized_b))

  def testCanOmitTensorNameWithSingleStringInput(self):
    # Test that for single string input, we can give or omit the tensor name.
    input_list1 = ["1, 3", "2, -4", "0, 0"]
    input_list2 = [{"examples": "1, 3"},
                   {"examples": "2, -4"},
                   {"examples": "0, 0"}]
    input_list3 = [{"examples": "1, 3"},
                   {"examples": "2, -4"},
                   "0, 0"]

    model_path = os.path.join(
        self.test_dir, "testCanOmitTensorNameWithSingleStringInput")
    export_model_with_single_string_input(model_path)
    model = create_model_using_session(model_path)
    dummy_stats = mlprediction.Stats()
    _, predictions1 = model.predict(input_list1, stats=dummy_stats)
    _, predictions2 = model.predict(input_list2, stats=dummy_stats)
    _, predictions3 = model.predict(input_list3, stats=dummy_stats)

    predictions1 = list(predictions1)
    self.assertEquals(predictions1, list(predictions2))
    self.assertEquals(predictions1, list(predictions3))

  def testUnexpectedTensorNameInput(self):
    # The expected tensor name is "examples", or we can omit it.
    # Other tensor names should not be given.
    input_list = [{"examples": "1, 3"},
                  {"examples": "2, -4"},
                  {"b64": "0, 0"}]

    model_path = os.path.join(
        self.test_dir, "testUnexpectedTensorNameInput")
    export_model_with_single_string_input(model_path)
    model = create_model_using_session(model_path)
    expected_msg = (r".*Expected tensor name: examples, "
                    r"got tensor name: \['b64'\].*")
    with self.assertRaisesRegexp(mlprediction.PredictionError, expected_msg):
      _ = model.predict(input_list, stats=mlprediction.Stats())

  def testCreateTFModelIllegalPredictionEngine(self):
    env_updates = {"prediction_engine": "test_engine"}

    with mock.patch.dict("os.environ", env_updates):
      with self.assertRaises(mlprediction.PredictionError) as error:
        tf_prediction_server_lib.create_tf_model("/dummy/model/path", flags={})
    self.assertEqual(error.exception.error_detail,
                     "Illegal prediction engine test_engine")

  def testCreateTFModelCantStartModelServer(self):
    env_updates = {"prediction_engine": "MODEL_SERVER"}

    # ModelServer dies if tensorflow_session_parallelism flag is not provided.
    with mock.patch.dict("os.environ", env_updates):
      with self.assertRaises(mlprediction.PredictionError) as error:
        tf_prediction_server_lib.create_tf_model("/dummy/model/path", flags={})
    self.assertTrue("Could not load model" in error.exception.error_detail)
    self.assertTrue("tensorflow_session_parallelism" in
                    error.exception.error_detail)

  @mock.patch(
      "tensorflow_serving.apis.prediction_service_pb2.BetaPredictionServiceStub")
  def testCreateTFModelCantGetModelSignature(self, mock_model_server):
    env_updates = {"prediction_engine": "MODEL_SERVER"}
    flag_values = {"tensorflow_session_parallelism": 3}
    pseudo_flags = type("Flags", (object,), flag_values)

    # With a mocked model_server, create_tf_model will fail when it tries to
    # retrieve the model's SignatureDef.
    with mock.patch.dict("os.environ", env_updates):
      with mock.patch.object(tf_prediction_server_lib, "_start_model_server"):
        with self.assertRaises(mlprediction.PredictionError) as error:
          tf_prediction_server_lib._start_model_server.return_value = (
              None, mock_model_server)
          tf_prediction_server_lib.create_tf_model("/dummy/model/path",
                                                   pseudo_flags)
    self.assertEqual(error.exception.error_detail,
                     "Could not get signature map from the model. ")

  @mock.patch(
      "tensorflow_serving.apis.prediction_service_pb2.BetaPredictionServiceStub")
  def testCreateTFModelFromModelServerClient(self, mock_model_server):
    env_updates = {"prediction_engine": "MODEL_SERVER"}
    flag_values = {"tensorflow_session_parallelism": 3}
    pseudo_flags = type("Flags", (object,), flag_values)

    # Create model's SignatureDef and expected response.
    expected_response = get_model_metadata_pb2.GetModelMetadataResponse()
    expected_response.model_spec.name = "default"

    in_bytes = meta_graph_pb2.TensorInfo(
        name="x", dtype=tf.string.as_datatype_enum)
    out_bytes = meta_graph_pb2.TensorInfo(
        name="y", dtype=tf.string.as_datatype_enum)

    inputs = {"in_bytes": in_bytes}
    outputs = {"out_bytes": out_bytes}
    signatures_def = meta_graph_pb2.SignatureDef(inputs=inputs, outputs=outputs)
    signatures_def_map = get_model_metadata_pb2.SignatureDefMap()
    signatures_def_map.signature_def["serving_default"].CopyFrom(signatures_def)
    expected_response.metadata["signature_def"].Pack(signatures_def_map)
    mock_model_server.GetModelMetadata.return_value = expected_response

    with mock.patch.dict("os.environ", env_updates):
      with mock.patch.object(tf_prediction_server_lib, "_start_model_server"):
        tf_prediction_server_lib._start_model_server.return_value = (
            None, mock_model_server)
        model = tf_prediction_server_lib.create_tf_model(
            "/dummy/model/path", pseudo_flags)

    # model is a TensorflowModel instance with a ModelServer client.
    expected_predict_response = make_response({"out_bytes": ["to encode"]})
    mock_model_server.Predict.return_value = expected_predict_response

    dummy_instances = []
    _, predictions = model.predict(dummy_instances, stats=mlprediction.Stats())
    self.assertEqual(
        list(predictions), [{
            "out_bytes": {
                u"b64": base64.b64encode("to encode")
            }
        }])

  def testCreateTFModelFromSessionRunClient(self):
    env_updates = {"prediction_engine": "TF_SESSION_RUN"}
    flag_values = {"tensorflow_session_parallelism": 3}
    pseudo_flags = type("Flags", (object,), flag_values)

    model_path = os.path.join(self.test_dir,
                              "testCreateTFModelSessionRunClient")
    export_model_with_single_string_input(model_path)

    session, signature_map = mlprediction.load_model(
        model_path,
        tags=[tf.saved_model.tag_constants.SERVING])

    with mock.patch.dict("os.environ", env_updates):
      with mock.patch.object(tf_prediction_server_lib,
                             "_get_session_and_signature_map"):
        tf_prediction_server_lib._get_session_and_signature_map.return_value = (
            session, signature_map)
        model = tf_prediction_server_lib.create_tf_model(
            model_path, pseudo_flags)

    input_list = ["1, 3", "2, -4", "0, 0"]

    # model is a TensorflowModel instance with a SessionClient.
    _, predictions = model.predict(input_list, stats=mlprediction.Stats())
    predictions = list(predictions)
    self.assertEqual(
        list(predictions), [{
            "y1": 2.5,
            "y2": 7.5,
            "y3": 18.75
        }, {
            "y1": 3.0,
            "y2": -12.0,
            "y3": -36.0
        }, {
            "y1": 2.0,
            "y2": 0.0,
            "y3": 0.0
        }])

  @mock.patch(
      "tensorflow_serving.apis.prediction_service_pb2.BetaPredictionServiceStub")
  def testGetModelSignatureMap(self, mock_model_server):
    expected_response = get_model_metadata_pb2.GetModelMetadataResponse()
    expected_response.model_spec.name = "default"

    in_bytes = meta_graph_pb2.TensorInfo(
        name="x", dtype=tf.string.as_datatype_enum)
    out_bytes = meta_graph_pb2.TensorInfo(
        name="y", dtype=tf.string.as_datatype_enum)

    inputs = {"in_bytes": in_bytes}
    outputs = {"out_bytes": out_bytes}
    signatures_def = meta_graph_pb2.SignatureDef(inputs=inputs, outputs=outputs)
    signatures_def_map = get_model_metadata_pb2.SignatureDefMap()
    signatures_def_map.signature_def["serving_default"].CopyFrom(signatures_def)
    expected_response.metadata["signature_def"].Pack(signatures_def_map)
    mock_model_server.GetModelMetadata.return_value = expected_response
    received_signatures = tf_prediction_server_lib._get_model_signature_map(
        mock_model_server)
    self.assertTrue("serving_default" in received_signatures)
    self.assertProtoEquals(signatures_def,
                           received_signatures["serving_default"])

  @mock.patch(
      "tensorflow_serving.apis.prediction_service_pb2.BetaPredictionServiceStub")
  def testGetModelSignatureMissingDtype(self, mock_model_server):
    expected_response = get_model_metadata_pb2.GetModelMetadataResponse()
    expected_response.model_spec.name = "default"

    in_bytes = meta_graph_pb2.TensorInfo(name="x")
    out_bytes = meta_graph_pb2.TensorInfo(name="y",
                                          dtype=tf.string.as_datatype_enum)

    inputs = {"in_bytes": in_bytes}
    outputs = {"out_bytes": out_bytes}
    signatures_def = meta_graph_pb2.SignatureDef(inputs=inputs, outputs=outputs)
    signatures_def_map = get_model_metadata_pb2.SignatureDefMap()
    signatures_def_map.signature_def["serving_default"].CopyFrom(signatures_def)
    expected_response.metadata["signature_def"].Pack(signatures_def_map)
    mock_model_server.GetModelMetadata.return_value = expected_response
    received_signatures = tf_prediction_server_lib._get_model_signature_map(
        mock_model_server)
    self.assertTrue("serving_default" not in received_signatures)


if __name__ == "__main__":
  tf.test.main()
