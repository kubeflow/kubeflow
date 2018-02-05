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
"""Tests for prediction_server_lib_beta."""

import base64
import json
import os
import shutil
import tempfile
import threading
import unittest
import uuid

import mock
import tensorflow as tf
import webapp2
import webtest

import prediction_server_lib as server_lib
from frameworks import tf_prediction_server_lib
from prediction import prediction_lib as mlprediction

from parameterized import parameterized

from tensorflow.core.framework import types_pb2
from tensorflow.core.protobuf import meta_graph_pb2
from tensorflow.python.framework import tensor_util
from tensorflow.python.saved_model import tag_constants
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
      model_path, tags=[tag_constants.SERVING])
  client = mlprediction.SessionClient(session, signature_map)
  return mlprediction.create_model(client, model_path)


def create_model_from_server(model_server, model_path):
  session, signature_map = mlprediction.load_model(
      model_path, tags=[tag_constants.SERVING])

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


def export_model_with_integer_inputs(saved_model_path):
  tf.reset_default_graph()
  with tf.Session() as sess:
    x = tf.placeholder(tf.int32, shape=(None,), name="exx")
    y = tf.placeholder(tf.int32, shape=(None,), name="yyy")
    z = tf.add(x, y, name="zee")
    s = tf.subtract(y, x, name="ess")
    inputs = {"x": x, "y": y}
    outputs = {"z": z, "s": s}

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


def create_app_config(model=None,
                      model_loaded=True,
                      model_size=0,
                      server_start_time=0,
                      model_loaded_time=1,
                      model_loading_error=None,
                      request_count=0):
  config = {server_lib.MODEL_KEY: model,
            server_lib.MODEL_LOADED_KEY: model_loaded,
            server_lib.MODEL_SIZE: model_size,
            server_lib.SERVER_START_TIME_KEY: server_start_time,
            server_lib.MODEL_LOADED_TIME_KEY: model_loaded_time,
            server_lib.MODEL_LOADING_ERROR_KEY: model_loading_error,
            server_lib.REQUEST_COUNTER: request_count,
            server_lib.COUNTER_LOCK: threading.Lock()}
  return config


class PredictionServerLibTest(unittest.TestCase):

  def setUp(self):
    self.test_dir = tempfile.mkdtemp()

  def tearDown(self):
    shutil.rmtree(self.test_dir)

  def testModelWithBytesBasedInput(self):
    # Setup the app.
    mock_model = mock.Mock()
    mock_model.predict.return_value = [], []
    mock_model.signature_map = {
        tf.saved_model.signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY:
            meta_graph_pb2.SignatureDef()}

    config = create_app_config(model=mock_model)
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    serialized_examples = [
        example(1, 3).SerializeToString(),
        example(2, -4).SerializeToString(),
        example(0, 0).SerializeToString()
    ]

    # Act.
    instances = [
        {"b64": base64.b64encode(serialized_examples[0])},
        {"b64": base64.b64encode(serialized_examples[1])},
        {"b64": base64.b64encode(serialized_examples[2])},]
    body = {"instances": instances}
    test_app.post(
        url="/", params=json.dumps(body), content_type="application/json")

    # Assert.
    mock_model.predict.assert_has_calls(
        [mock.call(serialized_examples, stats=mock.ANY)])

  def testModelWithAdditionalOptions(self):
    # Setup the app.
    mock_model = mock.Mock()
    mock_model.predict.return_value = [], []
    mock_model.signature_map = {
        "custom_signature": meta_graph_pb2.SignatureDef()}

    config = create_app_config(model=mock_model)
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    serialized_examples = [
        example(1, 3).SerializeToString(),
        example(2, -4).SerializeToString(),
        example(0, 0).SerializeToString()
    ]

    # Act.
    instances = [
        {"b64": base64.b64encode(serialized_examples[0])},
        {"b64": base64.b64encode(serialized_examples[1])},
        {"b64": base64.b64encode(serialized_examples[2])},]
    body = {"instances": instances, "signature_name": "custom_signature"}
    test_app.post(
        url="/", params=json.dumps(body), content_type="application/json")

    # Assert.
    mock_model.predict.assert_has_calls(
        [mock.call(serialized_examples, stats=mock.ANY,
                   signature_name="custom_signature")])

  def testModelWithOutputCannotJsonEncode(self):
    # Setup the app.
    mock_model = mock.Mock()
    mock_model.predict.return_value = [], [{"x": "\xe1"}]
    signature_def = meta_graph_pb2.SignatureDef()
    signature_def.outputs["x"].dtype = types_pb2.DT_STRING
    mock_model.signature_map = {
        tf.saved_model.signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY:
            signature_def}
    config = create_app_config(model=mock_model)
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    # Act.
    body = {"instances": []}
    response = test_app.post(
        url="/", params=json.dumps(body), content_type="application/json")
    self.assertIn("Failed to json encode the prediction response", response)
    self.assertIn("suffix the alias of your output tensor with _bytes",
                  response)

  @mock.patch("prediction.Model")
  def testInferenceHandlerError(self, model):
    # Arrange.
    # Model will raise an exception
    model.predict.side_effect = mlprediction.PredictionError(
        3, "exception message")

    # Setup the app.
    config = create_app_config(model=model, model_size=123)
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    # Act.
    instances = [{"x": 30, "y": 40},
                 {"x": 10, "y": 50}]
    body = {"instances": instances}
    response = test_app.post(
        url="/", params=json.dumps(body), content_type="application/json")

    # Assert.
    self.assertEqual(response.body,
                     json.dumps({
                         "error": "Prediction failed: exception message"
                     }))

  @mock.patch("prediction.Model")
  def testInferenceHandlerUnknownError(self, model):
    # Arrange.
    # Model will raise an exception
    model.predict.side_effect = ValueError("value error")

    # Setup the app.
    config = create_app_config(model=model, model_size=123)
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    # Act.
    instances = [{"x": 30, "y": 40},
                 {"x": 10, "y": 50}]
    body = {"instances": instances}
    response = test_app.post(
        url="/", params=json.dumps(body), content_type="application/json")

    # Assert.
    self.assertEqual(response.body,
                     json.dumps({
                         "error": "Prediction failed: unknown error."
                     }))

  @mock.patch(
      "tensorflow_serving.apis.prediction_service_pb2"
      ".BetaPredictionServiceStub")
  def testInferenceHandlerSuccess(self, mock_model_server):
    # Build the model.
    model_path = os.path.join(
        self.test_dir, "testInferenceHandlerSuccess")
    export_model_with_integer_inputs(model_path)
    model = create_model_from_server(mock_model_server, model_path)

    predict_response = make_response({"s": [10, 40], "z": [70, 60]})
    mock_model_server.Predict.return_value = predict_response

    # Setup the app.
    config = create_app_config(model=model, model_size=123,
                               request_count=10)
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    # Act.
    instances = [{"x": 30, "y": 40},
                 {"x": 10, "y": 50}]
    body = {"instances": instances}
    response = test_app.post(
        url="/", params=json.dumps(body), content_type="application/json")

    # Assert.
    # Graph computes x+y and x-y.
    expected_predictions = [{"s": 10, "z": 70}, {"z": 60, "s": 40}]

    self.assertEqual(response.body,
                     json.dumps({"predictions": expected_predictions}))
    self.assertEqual(
        response.headers.getone("Prediction-Instance-Count"), "2")
    self.assertEqual(
        response.headers.getone("Prediction-Model-Size"), "123")
    self.assertEqual(
        response.headers.getone("Prediction-Server-Start-Time"), "0")
    self.assertEqual(
        response.headers.getone("Prediction-Model-Loaded-Time"), "1")
    self.assertEqual(
        response.headers.getone("Concurrent-Request-Count"), "10")

  @mock.patch(
      "tensorflow_serving.apis.prediction_service_pb2"
      ".BetaPredictionServiceStub")
  def testWrongInputTensorName(self, mock_model_server):
    # Build the model.
    model_path = os.path.join(
        self.test_dir, "testWrongInputTensorName")
    export_model_with_integer_inputs(model_path)
    model = create_model_from_server(mock_model_server, model_path)

    # Setup the app.
    config = create_app_config(model=model)
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    # Wrong tensor name.
    instances = [{"x2": 30, "y": 40}]
    body = {"instances": instances}
    response = test_app.post(
        url="/", params=json.dumps(body), content_type="application/json")
    self.assertTrue("Unexpected tensor name" in response)

  @mock.patch(
      "tensorflow_serving.apis.prediction_service_pb2"
      ".BetaPredictionServiceStub")
  def testModelServerThrowsException(self, mock_model_server):
    # Build the model.
    model_path = os.path.join(
        self.test_dir, "testModelServerThrowsException")
    export_model_with_integer_inputs(model_path)
    print("throw:   =======  " + str(os.listdir(model_path)))
    model = create_model_from_server(mock_model_server, model_path)
    mock_model_server.Predict.side_effect = Exception(
        "Model server prediction error")

    # Setup the app.
    config = create_app_config(model=model)
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    # Act.
    instances = [{"x": 30, "y": 40}]
    body = {"instances": instances}
    response = test_app.post(
        url="/", params=json.dumps(body), content_type="application/json")
    print response
    self.assertTrue("Model server prediction error" in response)

  @mock.patch(
      "tensorflow_serving.apis.prediction_service_pb2"
      ".BetaPredictionServiceStub")
  def testOutputShapeMismatch(self, mock_model_server):
    # Build the model.
    model_path = os.path.join(
        self.test_dir, "testOutputShapeMismatch")
    export_model_with_integer_inputs(model_path)
    model = create_model_from_server(mock_model_server, model_path)

    # Outer dimension of the tensors does not match.
    predict_response = make_response({"s": [10], "z": [70, 60]})
    mock_model_server.Predict.return_value = predict_response

    # Setup the app.
    config = create_app_config(model=model)
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    # Act.
    instances = [{"x": 30, "y": 40}]
    body = {"instances": instances}
    response = test_app.post(
        url="/", params=json.dumps(body), content_type="application/json")
    self.assertIn("Bad output from running tensorflow session: outputs had "
                  "differing sizes in the batch (outer) dimension. See the "
                  "outputs and their size:", response)
    self.assertIn("u's': 1", response)
    self.assertIn("u'z': 2", response)

  def testInferenceHandlerNonJson(self):
    # Setup the app.
    config = create_app_config(model=mock.Mock())
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    # Act.
    body = "non-json"
    response = test_app.post(
        url="/", params=body, content_type="application/json")

    self.assertEqual(
        response.body,
        json.dumps({
            "error": "The request did not contain valid JSON. The service "
                     "expects the request to be a valid JSON object with a "
                     "list-valued attribute called `instances`, i.e. "
                     "`{\"instances\": [...]}`. The received request was:\n"
                     "%s" % (body)
        }))

  def testInferenceHandlerBodyIsJsonStringContainingSubstringInstance(self):
    # Setup the app.
    config = create_app_config(model=mock.Mock())
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    # Act.
    body = "\"this has the word instances\""
    response = test_app.post(
        url="/", params=body, content_type="application/json")

    self.assertEqual(
        response.body,
        json.dumps({
            "error": "Invalid request. The service expects the request to be "
                     "a valid JSON object with a list-valued attribute called "
                     "`instances`, i.e. `{\"instances\": [...]}`. The received "
                     "request was:\n%s" % (body)
        }))

  def testInferenceHandlerBodyIsJsonList(self):
    # Setup the app.
    config = create_app_config(model=mock.Mock())
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    # Act.
    body = "[1,2,3]"
    response = test_app.post(
        url="/", params=body, content_type="application/json")

    self.assertEqual(
        response.body,
        json.dumps({
            "error": "Invalid request. The service expects the request to be "
                     "a valid JSON object with a list-valued attribute called "
                     "`instances`, i.e. `{\"instances\": [...]}`. The received "
                     "request was:\n%s" % (body)
        }))

  def testInferenceHandlerNoInstancesAttribute(self):
    # Setup the app.
    config = create_app_config(model=mock.Mock())
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    # Act.
    body = json.dumps({"anything_but_instances": "dummy"})
    response = test_app.post(
        url="/", params=body, content_type="application/json")

    self.assertEqual(
        response.body,
        json.dumps({
            "error": "Invalid request. The service expects the request to be "
                     "a valid JSON object with a list-valued attribute called "
                     "`instances`, i.e. `{\"instances\": [...]}`. The received "
                     "request was:\n%s" % (body)
        }))

  def testInferenceHandlerGetReturnModelLoadingError(self):
    # Setup the app.
    config = create_app_config(model_loading_error="abc")
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    response = test_app.get(url="/")

    self.assertEqual(response.body,
                     json.dumps({"error": "abc"}))

  def testAppDecodesBytesIn(self):
    #     mock_model = mock.create_autospec(server_lib.Model)
    mock_model = mock.Mock()
    signature_def = meta_graph_pb2.SignatureDef()
    signature_def.outputs["z_bytes"].dtype = types_pb2.DT_STRING
    mock_model.signature_map = {
        tf.saved_model.signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY:
            signature_def}

    # Setup the app.
    config = create_app_config(model=mock_model)
    inference_app = webapp2.WSGIApplication(
        [("/", server_lib._InferenceHandler)],
        debug=True,
        config=config)
    test_app = webtest.app.TestApp(app=inference_app)

    instances = [
        {u"x_bytes": {"b64": unicode(base64.b64encode("first"))},
         u"y_bytes": {"b64": unicode(base64.b64encode("second"))}}
    ]
    predictions = [{"z_bytes": "some binary string"}]
    mock_model.predict.return_value = instances, predictions

    body = {"instances": instances}
    response = test_app.post(
        url="/", params=json.dumps(body), content_type="application/json")

    # Assert.
    # Inputs are automatically decoded
    expected_instances = [{u"x_bytes": "first", u"y_bytes": "second"}]
    mock_model.predict.assert_has_calls(
        [mock.call(expected_instances, stats=mock.ANY)])

    expected_predictions = {"predictions": predictions}
    self.assertEqual(response.body, json.dumps(expected_predictions))

  def testGetPackageUris(self):
    create_version_json = """
        {
          "version": {
            "package_uris": ["package1", "package2"]
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      self.assertEqual(server_lib._get_package_uris(), ["package1", "package2"])

  def testGetPackageUrisNone(self):
    create_version_json = """
        {
          "version": {
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      self.assertIsNone(server_lib._get_package_uris())

  def testValidateCustomUserFiles(self):
    test_package_uris = ["package"]
    test_custom_code_path = "/local/path"
    with (mock.patch.object(os.path, "exists", return_value=True)):
      try:
        server_lib._validate_custom_user_files(test_package_uris,
                                               test_custom_code_path)
      except mlprediction.PredictionError:
        self.fail("_validate_custom_user_files shouldn't have raised "
                  "PredictionError.")

  def testValidateCustomUserFilesFailInvaidPackageUri(self):
    test_package_uris = ["package/"]
    test_custom_code_path = "/local/path"
    with (mock.patch.object(os.path, "exists", return_value=True)):
      with self.assertRaises(mlprediction.PredictionError) as e:
        server_lib._validate_custom_user_files(test_package_uris,
                                               test_custom_code_path)
        self.assertEqual(mlprediction.PredictionError.FAILED_TO_LOAD_MODEL.code,
                         e.exception.error_code)
        self.assertIn(("User-provided package package/ is a directory, not a "
                       "package file."), e.exception.error_detail)

  def testValidateCustomUserFilesFailCopy(self):
    test_package_uris = ["failed_package"]
    test_custom_code_path = "/local/path"
    with (mock.patch.object(os.path, "exists", return_value=False)):
      with self.assertRaises(mlprediction.PredictionError) as e:
        server_lib._validate_custom_user_files(test_package_uris,
                                               test_custom_code_path)
        self.assertEqual(
            mlprediction.PredictionError.FAILED_TO_LOAD_MODEL.code,
            e.exception.error_code)
        self.assertIn(
            "User-provided package failed_package was not successfully copied.",
            e.exception.error_detail)


class CreateModelTests(unittest.TestCase):

  @parameterized.expand([
      ( mlprediction.TENSORFLOW_FRAMEWORK_NAME,
       tf_prediction_server_lib.create_tf_model),
      ("TENSORFLOW", tf_prediction_server_lib.create_tf_model),
      ( mlprediction.XGBOOST_FRAMEWORK_NAME,
       mlprediction.create_xgboost_model),
      ("XGBOOST", mlprediction.create_xgboost_model),
      (mlprediction.SCIKIT_LEARN_FRAMEWORK_NAME,
       mlprediction.create_sklearn_model),
      ("SCIKIT_LEARN", mlprediction.create_sklearn_model),
      ("", tf_prediction_server_lib.create_tf_model),
      (None, tf_prediction_server_lib.create_tf_model),
  ])
  def testCreateModelFn(self, framework, expected_create_fn):
    self.assertEqual(
        server_lib.choose_create_model_fn(framework), expected_create_fn)

  def testCreateModelInvalidFramework(self):
    with self.assertRaises(mlprediction.PredictionError) as error:
      server_lib.choose_create_model_fn("foo")
    self.assertEqual(error.exception.error_code,
                     mlprediction.PredictionError.FAILED_TO_LOAD_MODEL.code)
    self.assertIn("Could not load model. Unknown framework provided",
                  error.exception.error_detail)


class PredictionServerTest(unittest.TestCase):

  def setUp(self):
    self.test_dir = tempfile.mkdtemp()

  def tearDown(self):
    shutil.rmtree(self.test_dir)

  def _fillFile(self, filename, expected_size):
    f = open(filename, "wb")
    with f:
      f.seek(expected_size - 1)
      f.write("\0")

  def testParseGCSPath(self):
    with self.assertRaises(ValueError):
      server_lib._parse_gcs_path("/foo/bar")
    with self.assertRaises(ValueError):
      server_lib._parse_gcs_path("")
    self.assertEqual(server_lib._parse_gcs_path("gs://foo"), ("foo", ""))
    self.assertEqual(server_lib._parse_gcs_path("gs://foo/"), ("foo", ""))
    self.assertEqual(server_lib._parse_gcs_path("gs://foo/bar"), ("foo", "bar"))
    self.assertEqual(
        server_lib._parse_gcs_path("gs://foo/bar/"), ("foo", "bar/"))
    self.assertEqual(
        server_lib._parse_gcs_path("gs://foo/bar/baz"), ("foo", "bar/baz"))
    self.assertEqual(
        server_lib._parse_gcs_path("gs://foo/bar/baz/image.jpg"),
        ("foo", "bar/baz/image.jpg"))

  def testGetModelSizeOnSavedModel(self):
    saved_model_dir = os.path.join(self.test_dir, str(uuid.uuid4()))
    if not os.path.exists(saved_model_dir):
      os.mkdir(saved_model_dir)
    variables_dir = os.path.join(saved_model_dir,
                                 tf.saved_model.constants.VARIABLES_DIRECTORY)
    if not os.path.exists(variables_dir):
      os.mkdir(variables_dir)
    expected_size = 1024
    self._fillFile(
        os.path.join(saved_model_dir,
                     tf.saved_model.constants.SAVED_MODEL_FILENAME_PB),
        expected_size)
    self.assertEqual(server_lib._get_model_size(saved_model_dir), expected_size)
    self._fillFile(
        os.path.join(saved_model_dir,
                     tf.saved_model.constants.SAVED_MODEL_FILENAME_PBTXT),
        expected_size)
    self.assertEqual(
        server_lib._get_model_size(saved_model_dir), 2 * expected_size)
    self._fillFile(
        os.path.join(saved_model_dir, "not_a_saved_model_file"), expected_size)
    self.assertEqual(
        server_lib._get_model_size(saved_model_dir), 2 * expected_size)
    self._fillFile(os.path.join(variables_dir, "data.0"), expected_size)
    self.assertEqual(
        server_lib._get_model_size(saved_model_dir), 3 * expected_size)
    self._fillFile(os.path.join(variables_dir, "random_file"), expected_size)
    self.assertEqual(
        server_lib._get_model_size(saved_model_dir), 3 * expected_size)

if __name__ == "__main__":
  unittest.main()
