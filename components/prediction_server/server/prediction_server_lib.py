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

"""A module for prediction server related methods.

"""
from __future__ import print_function

import collections
import glob
import json
import logging
import os
import re
import shutil
import subprocess
import sys
import threading
import time
import timeit

from paste import httpserver
import webapp2

import frameworks.tf_prediction_server_lib as tf_prediction_server_lib
import prediction.prediction_lib as mlprediction
from util import _retry

# This is the key for session object within application's config dict.
MODEL_KEY = "model"

# This is the key for the directory from which models can be loaded.
MODEL_DIR_KEY = "model_dir"

# This is the key for the error message (if any) of loading model.
MODEL_LOADING_ERROR_KEY = "model_loading_error_message"

# This is the key for whether we are returning 500.
RETURN_ERROR_KEY = "return_error"

# Keys for timestamps.
SERVER_START_TIME_KEY = "server_start_time"
MODEL_LOADED_TIME_KEY = "model_loaded_time"

# The Key for command line flag passed from main.
FLAG_KEY = "flag"

# The key for the lock for loading model.
MODEL_LOCK_KEY = "lock"

# The key to indicate whether the model is loaded.
MODEL_LOADED_KEY = "model_loaded"

# The key for the function used to create the model itself.
CREATE_MODEL_FN_KEY = "create_model_fn"

# The key for the request counter and its lock.
REQUEST_COUNTER = "request_counter"
COUNTER_LOCK = "counter_lock"

# Prediction metric keys.
MODEL_SIZE = "Prediction-Model-Size"
INSTANCE_COUNT = "Prediction-Instance-Count"
PREDICTION_COUNT = "Prediction-Prediction-Count"
LOADS_TIME = "Prediction-Loads-Time"
DECODE_TIME = "Prediction-Decode-Time"
PREDICT_TIME = "Prediction-Predict-Time"
DUMPS_TIME = "Prediction-Dumps-Time"
START_TIME = "Prediction-Start-Time"
TOTAL_TIME = "Prediction-Total-Time"
REQUEST_COUNT_HEADER = "Concurrent-Request-Count"

# Header for timestamp.
SERVER_START_TIME = "Prediction-Server-Start-Time"
MODEL_LOADED_TIME = "Prediction-Model-Loaded-Time"

REQUEST_FORMAT_MSG = ("The service expects the request to be a valid JSON "
                      "object with a list-valued attribute called "
                      "`instances`, i.e. `{\"instances\": [...]}`.")

# Default values for http server
THREAD_POOL_WORKERS = 10
REQUEST_QUEUE_SIZE = 20


def init_logging():
  """Configure the desired logging format and behavior."""
  logging.basicConfig(
      format="(%(asctime)s %(message)s",
      datefmt="%m/%d/%Y %I:%M:%S %p",
      level=logging.DEBUG)


def _parse_gcs_path(gcs_path):
  """Parse GCS path into bucket and path.

  Args:
    gcs_path: a GCS path, e.g. gs://bucket/foo/bar
  Returns:
    (bucket, path), e.g. ('bucket', 'foo/bar') for gs://bucket/foo/bar'.
  Raises:
    ValueError: if gcs_path is not a GCS path.
  """
  m = re.match("^gs://([^/]+)(?:/(.*))?$", gcs_path)
  if m is None:
    raise ValueError('Not a gcs path: "{}"'.format(gcs_path))
  return (m.group(1), m.group(2) or "")


@_retry.with_exponential_backoff(initial_delay_secs=1.0, num_retries=10)
def _copy(gcs_path, model_dir, path_to_gsutil):
  """Copy files from gcs to a local path.

  Behaves similar to the linux cp command.
  Sample behavior:
  dir1/
    file1
    file2
    dir2/
      file3

  _copy("dir1", "/tmp", path_to_gsutil)
  After copy:
  tmp/
    dir1/
      file1
      ...

  _copy("dir1/", "/tmp", path_to_gsutil)
  After copy:
  tmp/
    file1
    file2
    dir2/
      file3

  Args:
    gcs_path: Source GCS path that we're copying from.
    model_dir: Destination local path that we're copying to.
    path_to_gsutil: Location of gsutil executable.

  Raises:
    Exception: If gsutil is not found.
  """
  copy_start_time = time.time()
  logging.debug("Starting to copy files from %s to %s", gcs_path, model_dir)
  if not os.path.exists(model_dir):
    os.makedirs(model_dir)
  # Simulate behavior of the linux cp command, where if the source is a
  # directory ending in "/", files and directories in source are copied to the
  # destination without the parent directory structure.
  if gcs_path.endswith("/"):
    gcs_path = os.path.join(gcs_path, "*")
  path_to_gsutil = path_to_gsutil or os.environ.get("PATH_TO_GSUTIL") or ""
  if not path_to_gsutil:
    raise Exception("File copy failed: gsutil not found.")
  logging.debug("Using gsutil on path %s to perform file copy",
                path_to_gsutil)
  try:
    subprocess.check_call([
        path_to_gsutil, "-o", "GoogleCompute:service_account=default",
        "cp", "-R", gcs_path, model_dir], stdin=subprocess.PIPE)
  except subprocess.CalledProcessError as e:
    logging.error(str(e))
    raise
  logging.debug("Files copied from %s to %s: took %f seconds", gcs_path,
                model_dir, time.time() - copy_start_time)


_FRAMEWORK_TO_MODEL_FN_MAP = {
    mlprediction.TENSORFLOW_FRAMEWORK_NAME:
        tf_prediction_server_lib.create_tf_model,
    mlprediction.SCIKIT_LEARN_FRAMEWORK_NAME:
        mlprediction.create_sklearn_model,
    mlprediction.XGBOOST_FRAMEWORK_NAME:
        mlprediction.create_xgboost_model
}


def choose_create_model_fn(framework):
  if framework:
    framework = framework.lower()
  else:
    framework = mlprediction.TENSORFLOW_FRAMEWORK_NAME
  if framework not in _FRAMEWORK_TO_MODEL_FN_MAP:
    raise mlprediction.PredictionError(
        mlprediction.PredictionError.FAILED_TO_LOAD_MODEL,
        "Could not load model. Unknown framework provided: %s" % framework)
  return _FRAMEWORK_TO_MODEL_FN_MAP[framework]


def _get_model_size(model_dir):
  """Get model size (every file in model directory)."""
  model_files = glob.glob(os.path.join(model_dir, "saved_model*"))
  checkpoint_files = glob.glob(os.path.join(model_dir, "variables/data*"))
  return sum(os.path.getsize(f) for f in model_files + checkpoint_files)


def prepare_model(model_path, flags, create_model_fn):
  """Prepare the model, including downloading and starting the model server.

  Args:
    model_path: The model path passed to main server. It can be a gcs location
      or a local path.
    flags: The command line flag (flags.FLAGS) passed from server main.
    create_model_fn: Function which takes in a model_path and flags and returns
      a corresponding model instantiation.

  Returns:
    model: The model when successfully loaded.

  Raises:
    ValueError: When no project is specified.
    Exception: Those exceptions raised by create_model_fn.

  """
  # We need to have a directory with 0001 or a number. So we just simply copy
  # it to the temporary model dir.
  # Once we start using the standard exporter, we wouldn't need this.
  temp_model_path = os.path.join(flags.temp_model_path, "0001")
  if model_path.startswith("gs://"):
    # Append a "/" to the end of the model path if it doesn't already end in
    # "/". This ensures that _copy_model will copy the model files directly
    # into the temp_model_path without the source parent directory.
    if not model_path.endswith("/"):
      model_path = os.path.join(model_path, "")
    _copy(model_path, temp_model_path, flags.path_to_gsutil)
    model_path = temp_model_path
  elif not model_path.startswith("@"):
    shutil.copytree(model_path, temp_model_path)
    model_path = temp_model_path

  try:
    model = create_model_fn(model_path, flags)
  except mlprediction.PredictionError as e:
    logging.error("Error when loading the model: " + str(e))
    raise
  except Exception as e:  # pylint: disable=broad-except
    logging.error("Unexpected error when loading the model: " + str(e))
    raise mlprediction.PredictionError(
        mlprediction.PredictionError.FAILED_TO_LOAD_MODEL,
        "Unexpected error when loading the model: " + str(e))
  else:
    if os.environ.get("delete_model", "") == "True":
      logging.info("Model deleted from %s", model_path)
      shutil.rmtree(model_path)

    return model


def _load_model_if_not_loaded(config):
  if config[MODEL_LOADED_KEY]:
    return

  # Acquire the lock when model is not loaded.
  with config[MODEL_LOCK_KEY]:
    # Need to check again because there might be context switch.
    if config[MODEL_LOADED_KEY]:
      return

    config[SERVER_START_TIME_KEY] = time.time() * 1000
    try:
      _setup_custom_user_code(config[MODEL_DIR_KEY], config[FLAG_KEY])
      model = prepare_model(config[MODEL_DIR_KEY], config[FLAG_KEY],
                            config[CREATE_MODEL_FN_KEY])
    except mlprediction.PredictionError as e:
      error_message = "Error loading the model: " + str(e)
      logging.error(error_message)
      config[MODEL_LOADING_ERROR_KEY] = error_message
    except Exception as e:  # pylint: disable=broad-except
      logging.error("Error loading model: " + str(e))
      config[MODEL_LOADING_ERROR_KEY] = "Error loading the model"
    else:
      config[MODEL_LOADED_TIME_KEY] = time.time() * 1000
      config[MODEL_KEY] = model
      logging.debug("Model loaded successfully: took %f seconds", (
          config[MODEL_LOADED_TIME_KEY] - config[SERVER_START_TIME_KEY]) /
                    1000.0)
    config[MODEL_LOADED_KEY] = True


# Request handler for all the health checks.
class _HealthCheckHandler(webapp2.RequestHandler):

  def get(self):
    logging.debug("Health Check invoked.")
    return


# Request handler for all the web requests.
class _InferenceHandler(webapp2.RequestHandler):
  """The request handler for online prediction."""

  def _write_error(self, message):
    logging.error(message)
    self.response.write(json.dumps({"error": message}))

  def _increase_request_count(self):
    with self.app.config[COUNTER_LOCK]:
      current_count = self.app.config[REQUEST_COUNTER]
      self.app.config[REQUEST_COUNTER] += 1
    return current_count

  def _decrease_request_count(self):
    with self.app.config[COUNTER_LOCK]:
      current_count = self.app.config[REQUEST_COUNTER]
      self.app.config[REQUEST_COUNTER] -= 1
    return current_count

  def get(self):
    logging.debug("Started GET.")
    _load_model_if_not_loaded(self.app.config)
    if not self.app.config[MODEL_KEY]:
      self._write_error(self.app.config[MODEL_LOADING_ERROR_KEY])

  def post(self):
    post_start_time = timeit.default_timer()
    stats = mlprediction.Stats()
    with stats.time(TOTAL_TIME):
      request_count = self._increase_request_count()
      logging.debug("Started POST.")
      _load_model_if_not_loaded(self.app.config)

      model = self.app.config[MODEL_KEY]
      if not model:
        self._write_error(self.app.config[MODEL_LOADING_ERROR_KEY])
        return

      self._instrumented_post(stats)

      # Dumps stats as headers for collecting metrics in the frontend.
      # Unit: microseconds.
      self.response.headers[START_TIME] = str(post_start_time * 1000000)
      self.response.headers[REQUEST_COUNT_HEADER] = str(request_count)
      self._decrease_request_count()

    for name, value in stats.iteritems():
      self.response.headers[name] = str(value)

  def _instrumented_post(self, stats):
    self.response.content_type = "application/json"

    stats[SERVER_START_TIME] = self.app.config[SERVER_START_TIME_KEY]
    stats[MODEL_LOADED_TIME] = self.app.config[MODEL_LOADED_TIME_KEY]
    stats[MODEL_SIZE] = self.app.config[MODEL_SIZE]
    if not self.request.body:
      stats[INSTANCE_COUNT] = 0
      self.response.write("{}")

    model = self.app.config[MODEL_KEY]
    logging.debug("Loading request body")

    with stats.time(LOADS_TIME):
      try:
        # Can raise; caught by exception handler.
        request_body = json.load(self.request.body_file_seekable)
      except Exception as e:  # pylint: disable=broad-except
        self.request.body_file.seek(0)
        if not self.request.body.strip():
          self._write_error("Empty request body. " + REQUEST_FORMAT_MSG)
        else:
          self._write_error(
              "The request did not contain valid JSON. %s The received "
              "request was:\n%s" % (REQUEST_FORMAT_MSG, self.request.body))
        return

      if (not isinstance(request_body, collections.Mapping)
          or "instances" not in request_body):
        self.request.body_file.seek(0)
        self._write_error("Invalid request. %s The received request was:\n%s" %
                          (REQUEST_FORMAT_MSG, self.request.body))
        return

    # process instances separately, rest of body will be used as predict options
    instances = request_body.pop("instances")
    stats[INSTANCE_COUNT] = len(instances)

    logging.debug("Loading instances from body")
    with stats.time(DECODE_TIME):
      try:
        instances = mlprediction.decode_base64(instances)
      except TypeError as e:
        logging.error("Base64 decode failed: %s", e)
        self._write_error("Base64 decode failed: {0}".format(e))
        return
      except Exception as e:  # pylint: disable=broad-except
        logging.error("Base64 decode failed: %s", e)
        self._write_error("Base64 decode failed.")
        return

    # TODO(bhupc): It would be nice if we could adjust the timeout and
    # auto-increment if necessary.
    logging.debug("Calling predict now.")
    try:
      with stats.time(PREDICT_TIME):
        _, predictions = model.predict(instances, stats=stats, **request_body)
    except mlprediction.PredictionError as e:
      self._write_error("Prediction failed: {0}".format(e.error_detail))
    except Exception as e:  # TF error, pylint: disable=broad-except
      logging.error("Prediction failed: " + str(e))
      self._write_error("Prediction failed: unknown error.")
    else:
      stats[PREDICTION_COUNT] = len(predictions)
      with stats.time(DUMPS_TIME):
        try:
          self.response.write(json.dumps({"predictions": predictions}))
        except Exception as e:  # pylint: disable=broad-except
          logging.error("Json encoding response failed: %s", e)
          self._write_error("Failed to json encode the prediction response: {0}"
                            " If your output is not text, did you forget to "
                            "suffix the alias of your output tensor with "
                            "_bytes?".format(e))
          return


class _WarmupHandler(webapp2.RequestHandler):
  """The warm-up handler for GAE min_idle_instances."""

  def get(self):
    _load_model_if_not_loaded(self.app.config)

    self.response.headers["Content-Type"] = "text/plain"
    self.response.write("Warmup successful")

  def post(self):
    pass


def make_prediction_app(model_dir, flag, create_model_fn):
  """Create the webapp for http server to serve.

  Args:
    model_dir: a string of model directory
    flag: a _FlagConfig object containing configuration for the webapp
    create_model_fn: Function which takes in a model_path and flags and returns
      a corresponding model instantiation.

  Returns:
    a webapp that handles the request
  """
  model_lock = threading.Lock()
  model_size = _get_model_size(model_dir)
  counter_lock = threading.Lock()
  config = {
      MODEL_KEY: None,
      MODEL_DIR_KEY: model_dir,
      MODEL_SIZE: model_size,
      FLAG_KEY: flag,
      MODEL_LOCK_KEY: model_lock,
      MODEL_LOADED_KEY: False,
      REQUEST_COUNTER: 0,
      COUNTER_LOCK: counter_lock,
      CREATE_MODEL_FN_KEY: create_model_fn
  }
  return webapp2.WSGIApplication(
      [("/_ah/health", _HealthCheckHandler), ("/", _InferenceHandler),
       ("/_ah/warmup", _WarmupHandler), ("/_ah/start", _WarmupHandler)],
      debug=True,
      config=config)


def serve_prediction_app(webapp, flags):
  """Serve the provided prediction webapp using paste.httpserver.

  Args:
    webapp: A webapp that handles incoming predict requests.
    flags: The command line flags passed from server main.
  """
  logging.info("Starting httpserver on port %d", flags.port)

  # We keep a higher request queue size so that we can hold more requests in
  # the queue before returning them back with error. Holding that many
  # requests in the queue also requires additional memory.
  # It is not immediately clear what would be a good number since it would
  # be model dependent. So, in future, we might actually assign these
  # values during deployment of the model and not hardcode them here.
  threadpool_workers = int(
      os.environ.get("threadpool_workers", THREAD_POOL_WORKERS))
  request_queue_size = int(
      os.environ.get("max_queued_requests", REQUEST_QUEUE_SIZE))
  httpserver.serve(
      webapp,
      host="0.0.0.0",
      port=str(flags.port),
      threadpool_workers=threadpool_workers,
      request_queue_size=request_queue_size,
      threadpool_options={
          "spawn_if_under": min(threadpool_workers, 5),
      },
  )


def _get_package_uris():
  """Returns the package_uris if they exist, as provided in create version."""
  if not os.environ.get("create_version_request"):
    return None
  request = json.loads(os.environ.get("create_version_request"))
  if not request:
    return None
  version = request.get("version")
  if not version:
    return None
  package_uris = version.get("package_uris")
  if not package_uris:
    return None
  return package_uris


def _validate_custom_user_files(package_uris, local_custom_code_path):
  """Validates that the user provided packages were successfully copied locally.

  Args:
    package_uris: The original user provided list of package uris, from the
      CreateVersionRequest.
   local_custom_code_path: The location of the copied packages in the local
     container.

  Raises:
    PredictionError: if any of the user provided packages paths are invalid or
      failed to copy to local container.
  """
  for uri in package_uris:
    # Each package_uri has already been validated to be non-empty and a valid
    # GCS path in the frontend.
    filename = os.path.basename(uri)
    if not filename:
      raise mlprediction.PredictionError(
          mlprediction.PredictionError.FAILED_TO_LOAD_MODEL,
          "User-provided package " + uri +
          " is a directory, not a package file.")
    if not os.path.exists(os.path.join(local_custom_code_path, filename)):
      raise mlprediction.PredictionError(
          mlprediction.PredictionError.FAILED_TO_LOAD_MODEL,
          "User-provided package " + uri + " was not successfully copied.")


def _setup_custom_user_code(model_path, flags):
  """Installs the user provided python packages if they exist.

  Args:
    model_path: The model path passed to main server. It can be a gcs location
      or a local path.
   flags: A _FlagConfig object containing configuration for the webapp.

  Raises:
    PredictionError: if any of the user provided packages are invalid or fails
    to pip install.
  """
  package_uris = _get_package_uris()
  if not package_uris:
    return
  user_code_path = os.path.join(model_path, flags.user_code_dir)
  if user_code_path.startswith("gs://"):
    _copy(user_code_path, flags.temp_custom_code_path, flags.path_to_gsutil)
  else:
    shutil.copytree(user_code_path, flags.temp_custom_code_path)
  _validate_custom_user_files(package_uris, flags.temp_custom_code_path)

  install_dir = "/tmp/custom_lib"
  for package_name in os.listdir(flags.temp_custom_code_path):
    pip_install(
        os.path.join(flags.temp_custom_code_path, package_name), install_dir)
  sys.path.append(install_dir)


def pip_install(package_path, target_path):
  """Pip installs the python package from a specified location.

  Args:
    package_path: a string of the package or tar.gz path
    target_path: a string of the target path where the package should be
      installed. This is necessary since write access is limited in the
      containers launched on GAE. The target_path should be a path where write
      access is allowed.

  Raises:
    PredictionError: if pip is unable to install the package provided by
        package_path.
  """
  try:
    subprocess.check_call([
        "python", "-m", "pip", "install", "--upgrade", "--force-reinstall",
        "--target=" + target_path, "--no-cache-dir", "--no-deps", package_path
    ])
  except subprocess.CalledProcessError as e:
    raise mlprediction.PredictionError(
        mlprediction.PredictionError.FAILED_TO_LOAD_MODEL,
        "User-provided package " + os.path.basename(package_path) +
        " failed to install: " + str(e))
