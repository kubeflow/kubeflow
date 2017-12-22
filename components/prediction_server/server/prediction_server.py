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
"""V1 Online prediction server.

The prediction server reads an exported model from either a GCS location or from
a local path. It accepts data over HTTP in a format specified by Cloud ML
Predict Api. It uses a Tensorflow model server to perform the predictions.
The prediction server and model server both talk to each other over a gRpc
interface defined here:
https://github.com/tensorflow/serving/blob/master/tensorflow_serving/apis/prediction_service.proto
"""
from __future__ import print_function

import json
import logging
import os

import default_app
from paste import httpserver

from tensorflow import app
from tensorflow import flags

import prediction_server_lib as server_lib

FLAGS = flags.FLAGS


flags.DEFINE_integer("port", 8080, "The port on which to run the HTTP server.")

flags.DEFINE_boolean("act_as_default", False,
                     "Whether to run a simple default HTTP server instead of "
                     "the prediction server. This is useful for the default "
                     "service, for which we do not specify a model (and which "
                     "should not receive prediction requests). "
                     "May also be set via environment variable "
                     "'act_as_default'.")

# A temporary path where model gets copied if model_export_path is a gcs
# location.
flags.DEFINE_string("temp_model_path", "/tmp/model", "The location where to "
                    "copy the model from model_export_path if it is on GCS.")

# A temporary path where custom user code gets copied to from GCS if custom code
# is present.
flags.DEFINE_string("temp_custom_code_path", "/tmp/custom_code", "The location "
                    "where to copy the custom user code from packages_uris on "
                    "GCS.")

# The model is read from here and copied to temp_model_dir.
flags.DEFINE_string("model_path", "",
                    "A GCS or local path where the model was exported. "
                    "May also be set via environment variable 'model_path'"
                    "If both are defined, flag is preferred over environment "
                    "variable.")

# The subdirectory within model_path, where the custom user code is stored.
flags.DEFINE_string("user_code_dir", "user_code/", "The subdirectory within "
                    "model_path, where the custom user code is stored.")

flags.DEFINE_integer("tensorflow_session_parallelism", None,
                     "Number of threads to use for running a Tensorflow "
                     "session. Passed to model server. Value of zero means "
                     "auto-configured. May also be set via environment variable"
                     "'tensorflow_session_parallelism'. If both are defined, "
                     "flag is preferred over environment variable.")

# The gcp project name if the model is stored in GCS.
flags.DEFINE_string("project", "",
                    "The GCP project name associated with the GCS bucket. "
                    "May also be set via environment variable 'project'.")

flags.DEFINE_string("model_server_binary_path", "",
                    "The binary for the model server.")

flags.DEFINE_string("chemist_endpoint", "",
                    "The Chemist endpoint to use for metric reporting, "
                    "e.g servicecontrol.googleapis.com. "
                    "May also be set via environment variable "
                    "'chemist_endpoint'.")

flags.DEFINE_string("cloud_service_name", "",
                    "The Cloud ML service name, e.g ml.googleapis.com. "
                    "May also be set via environment variable "
                    "'cloud_service_name'.")

flags.DEFINE_integer("project_number", 0, "The user GCP project number. "
                     "May also be set via environment variable "
                     "'consumer_project_number'.")

flags.DEFINE_string("version_reporting_id", "",
                    "The reporting ID of the Cloud ML version. "
                    "May also be set via environment variable "
                    "'version_reporting_id'.")

flags.DEFINE_string("path_to_gsutil",
                    "/prereleased_gsutil/gsutil/gsutil.py",
                    "Path to gsutil binary to use for copy. If this path is "
                    "empty, fallback to using library.")

flags.DEFINE_string("create_version_request", "",
                    "The JSON formatted string of the original create version"
                    "request from the user.")


class _FlagConfig(object):
  """The config for making prediction app."""

  def __init__(self, project, temp_model_path, temp_custom_code_path,
               user_code_dir, path_to_gsutil, tensorflow_session_parallelism,
               model_server_binary_path, port):
    self.project = project
    self.temp_model_path = temp_model_path
    self.temp_custom_code_path = temp_custom_code_path
    self.user_code_dir = user_code_dir
    self.path_to_gsutil = path_to_gsutil
    self.tensorflow_session_parallelism = tensorflow_session_parallelism
    self.model_server_binary_path = model_server_binary_path
    self.port = port


def _get_framework():
  """Reads the 'framework' param from the `create_version_request` parameter."""
  create_version_json = os.environ.get("create_version_request")
  if not create_version_json:
    return None
  create_version_request = json.loads(create_version_json)
  if not create_version_request:
    return None
  version = create_version_request.get("version")
  if not version:
    return None
  return version.get("framework")


def main(unused_argv):
  server_lib.init_logging()
  logging.debug("Entering the V1 server.")
  framework = _get_framework() or os.environ.get("framework")
  logging.debug("Using framework: %s.", framework)
  if FLAGS.act_as_default or os.environ.get("act_as_default"):
    logging.info("Starting default httpserver on port %d", FLAGS.port)
    httpserver.serve(
        default_app.make_app(), host="0.0.0.0", port=str(FLAGS.port))
    logging.info("The default httpserver has exited.")
    return

  model_path = FLAGS.model_path or os.environ.get("model_path")
  if not model_path:
    raise ValueError("Model path is required.")
  create_model_fn = server_lib.choose_create_model_fn(framework)
  flag_config = _FlagConfig(FLAGS.project, FLAGS.temp_model_path,
                            FLAGS.temp_custom_code_path, FLAGS.user_code_dir,
                            FLAGS.path_to_gsutil,
                            FLAGS.tensorflow_session_parallelism,
                            FLAGS.model_server_binary_path, FLAGS.port)
  webapp = server_lib.make_prediction_app(model_path, flag_config,
                                          create_model_fn)
  server_lib.serve_prediction_app(webapp, flag_config)

if __name__ == "__main__":
  app.run()
