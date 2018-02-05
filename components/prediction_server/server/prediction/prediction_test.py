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
"""Tests for local prediction."""
import base64
import itertools
import json
import os
import shutil
import tempfile
import unittest

import mock
import numpy as np
import tensorflow as tf
import xgboost as xgb

import prediction_lib as mlprediction
import _model_test_util as model_test_util
from testdata.user_custom_python import user_model
from tensorflow.core.framework import types_pb2
from tensorflow.core.protobuf import meta_graph_pb2


SAVED_TESTDATA = (
    "testdata/saved_model/mnist_deployable_saved_model_prediction_input.json")
SAVED_TESTDATA_BAD = (
    "testdata/saved_model/mnist_deployable_saved_model_prediction_input_bad.json")
INPUT_MODEL = (
    "testdata/saved_model")
# simple models that add two numbers.
XGBOOST_MODEL = "testdata/xgboost/"
SKLEARN_JOBLIB_MODEL = "testdata/sklearn_joblib/"
SKLEARN_PICKLE_MODEL = "testdata/sklearn_pickle/"


class PredictionBatchTest(tf.test.TestCase):

  def testBatch(self):
    instances = [{"a": [1.0, 2.0],
                  "b": "a"},
                 {"a": [3.0, 4.0],
                  "b": "c"},
                 {"a": [5.0, 6.0],
                  "b": "e"},]
    columns = mlprediction.columnarize(instances)
    self.assertEqual(columns, {"a": [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]],
                               "b": ["a", "c", "e"]})

  def testBatchSingleTensor(self):
    instances = [
        {
            "b": "a"
        },
        {
            "b": "c"
        },
        {
            "b": "e"
        },
    ]
    columns = mlprediction.columnarize(instances)
    self.assertEqual(columns, {"b": ["a", "c", "e"]})

  def testRowify(self):
    outputs = {"prediction": np.array([1,
                                       0,
                                       1]),
               "scores": np.array([[0.1, 0.9],
                                   [0.7, 0.3],
                                   [0.4, 0.6]])}
    instances = mlprediction.rowify(outputs)
    self.assertItemsEqual(instances, [{"prediction": 1,
                                       "scores": [0.1, 0.9]},
                                      {"prediction": 0,
                                       "scores": [0.7, 0.3]},
                                      {"prediction": 1,
                                       "scores": [0.4, 0.6]}])

  def testRowifyFailed(self):
    # Following are cases the outputs containing items with different sizes.
    # Two outputs. One has a size of 2 and the other is 3.
    outputs1 = {"prediction": np.array([1,
                                        1]),
                "scores": np.array([[0.1, 0.9],
                                    [0.7, 0.3],
                                    [0.4, 0.6]])}
    error_msg_1 = {"prediction": 2, "scores": 3}

    # Two outputs. One has a size of 0 and the other is 3.
    outputs2 = {"prediction": np.array([]),
                "scores": np.array([[0.1, 0.9],
                                    [0.7, 0.3],
                                    [0.4, 0.6]])}
    error_msg_2 = {"prediction": 0, "scores": 3}

    # Two outputs. One has a size of 2 and the other is 1.
    outputs3 = {"prediction": np.array([1,
                                        1]),
                "scores": np.array([[0.1, 0.9]])}
    error_msg_3 = {"prediction": 2, "scores": 1}

    # Two outputs. One has a size of 2 and the other is 0.
    outputs4 = {"prediction": np.array([1,
                                        1]),
                "scores": np.array([])}
    error_msg_4 = {"prediction": 2, "scores": 0}

    # Three outputs. The first two have size of 3. And the last one is 2.
    outputs5 = {"prediction": np.array([1,
                                        0,
                                        1]),
                "scores": np.array([[0.1, 0.9],
                                    [0.7, 0.3],
                                    [0.4, 0.6]]),
                "third": np.array([[0.1, 0.9],
                                   [0.4, 0.6]])}
    error_msg_5 = {"prediction": 3, "scores": 3, "third": 2}

    for outputs, error_msg in ((outputs1, error_msg_1),
                               (outputs2, error_msg_2),
                               (outputs3, error_msg_3),
                               (outputs4, error_msg_4),
                               (outputs5, error_msg_5)):
      with self.assertRaises(mlprediction.PredictionError) as e:
        # rowify() is a generator, therefore the next() to invoke it.
        next(mlprediction.rowify(outputs))
      self.assertEqual(
          mlprediction.PredictionError.INVALID_OUTPUTS.code,
          e.exception.error_code)
      self.assertTrue("%s" % error_msg in e.exception.error_detail)


class PredictionCanonicalizeInputTest(tf.test.TestCase):

  def testCanonicalizeSingleInstance(self):
    instances = "a"
    self.assertEqual(
        mlprediction.canonicalize_single_tensor_input(instances, "x"), [{
            "x": "a"
        }])

    instances = ["a"]
    self.assertEqual(
        mlprediction.canonicalize_single_tensor_input(instances, "x"), [{
            "x": "a"
        }])

    instances = [{"x": "a"}]
    self.assertEqual(
        mlprediction.canonicalize_single_tensor_input(instances, "x"), [{
            "x": "a"
        }])

  def testCanonicalizeBatchInstances(self):
    instances = ["a", "b", "c"]
    self.assertEqual(
        mlprediction.canonicalize_single_tensor_input(instances, "x"), [{
            "x": "a"
        }, {
            "x": "b"
        }, {
            "x": "c"
        }])

    instances = [{"x": "a"}, {"x": "b"}, {"x": "c"}]
    self.assertEqual(
        mlprediction.canonicalize_single_tensor_input(instances, "x"), [{
            "x": "a"
        }, {
            "x": "b"
        }, {
            "x": "c"
        }])

  def testWrongTensorName(self):
    with self.assertRaises(mlprediction.PredictionError) as error:
      instances = [{"y": "a"}]
      mlprediction.canonicalize_single_tensor_input(instances, "x")
    self.assertEqual(error.exception.error_detail,
                     ("Expected tensor name: x, got tensor name: ['y']."))


class PredictionDecodeTest(tf.test.TestCase):

  def testSingleRank1Utf8StringTensor(self):
    actual = mlprediction.decode_base64([u"a", u"b", u"c"])
    self.assertEqual(actual, [u"a", u"b", u"c"])

  def testSingleRank1BytesTensor(self):
    actual = mlprediction.decode_base64(
        [{u"b64": base64.b64encode(u"a")},
         {u"b64": base64.b64encode(u"b")},
         {u"b64": base64.b64encode(u"c")},])
    self.assertEqual(actual, [u"a", u"b", u"c"])

  def testSingleUtf8StringTensor(self):
    actual = mlprediction.decode_base64(
        [[[u"a", u"b"]], [[u"c", u"d"]]])
    self.assertEqual(actual, [[[u"a", u"b"]], [[u"c", u"d"]]])

  def testSingleBytesTensor(self):
    actual = mlprediction.decode_base64(
        [[[{u"b64": base64.b64encode(u"a")},
           {u"b64": base64.b64encode(u"b")},]],
         [[{u"b64": base64.b64encode(u"c")},
           {u"b64": base64.b64encode(u"d")},]]])
    self.assertEqual(actual, [[[u"a", u"b"]], [[u"c", u"d"]]])

  def testMultiTensorWithUtf8Strings(self):
    actual = mlprediction.decode_base64(
        [{u"tensor1": [[[u"a", u"b"]], [[u"c", u"d"]]],
          u"tensor2": [u"x", u"y", u"z"],
          u"tensor3": [1.0, -2.0, 3.14]}]
    )
    self.assertEqual(actual,
                     [{u"tensor1": [[[u"a", u"b"]], [[u"c", u"d"]]],
                       u"tensor2": [u"x", u"y", u"z"],
                       u"tensor3": [1.0, -2.0, 3.14]}])

  def testMultiTensorWithBase64Strings(self):
    actual = mlprediction.decode_base64(
        [{u"tensor1": [[[{u"b64": base64.b64encode(u"a")},
                         {u"b64": base64.b64encode(u"b")},]],
                       [[{u"b64": base64.b64encode(u"c")},
                         {u"b64": base64.b64encode(u"d")},]]],
          u"tensor2": [u"x", u"y", u"z"],
          u"tensor3": [1.0, -2.0, 3.14]}])
    self.assertEqual(actual,
                     [{u"tensor1": [[[u"a", u"b"]], [[u"c", u"d"]]],
                       u"tensor2": [u"x", u"y", u"z"],
                       u"tensor3": [1.0, -2.0, 3.14]}])


class PredictionEncodeTest(tf.test.TestCase):

  def testSingleRank1Utf8StringTensor(self):
    tensor_info = meta_graph_pb2.TensorInfo(dtype=tf.string.as_datatype_enum)
    outputs_map = {"dummy": tensor_info}
    actual = mlprediction.encode_base64([u"a", u"b", u"c"], outputs_map)
    self.assertEqual(actual, [u"a", u"b", u"c"])

  def testSingleRank1BytesTensor(self):
    tensor_info = meta_graph_pb2.TensorInfo(dtype=tf.string.as_datatype_enum)
    outputs_map = {"dummy_bytes": tensor_info}
    actual = mlprediction.encode_base64([u"a", u"b", u"c"], outputs_map)
    self.assertEqual(actual, [{u"b64": base64.b64encode(u"a")},
                              {u"b64": base64.b64encode(u"b")},
                              {u"b64": base64.b64encode(u"c")},])

  def testSingleUtf8StringTensor(self):
    tensor_info = meta_graph_pb2.TensorInfo(dtype=tf.string.as_datatype_enum)
    outputs_map = {"dummy": tensor_info}
    actual = mlprediction.encode_base64(
        [[[u"a", u"b"]], [[u"c", u"d"]]], outputs_map)
    self.assertEqual(actual, [[[u"a", u"b"]], [[u"c", u"d"]]])

  def testSingleBytesTensor(self):
    tensor_info = meta_graph_pb2.TensorInfo(dtype=tf.string.as_datatype_enum)
    outputs_map = {"dummy_bytes": tensor_info}
    actual = mlprediction.encode_base64(
        [[[u"a", u"b"]], [[u"c", u"d"]]],
        outputs_map)
    self.assertEqual(actual, [[[{u"b64": base64.b64encode(u"a")},
                                {u"b64": base64.b64encode(u"b")},]],
                              [[{u"b64": base64.b64encode(u"c")},
                                {u"b64": base64.b64encode(u"d")},]]])

  def testMultiTensorWithUtf8Strings(self):
    tensor_info_1 = meta_graph_pb2.TensorInfo(dtype=tf.string.as_datatype_enum)
    tensor_info_2 = meta_graph_pb2.TensorInfo(dtype=tf.string.as_datatype_enum)
    tensor_info_3 = meta_graph_pb2.TensorInfo(dtype=tf.float32.as_datatype_enum)
    outputs_map = {
        "tensor1": tensor_info_1,
        "tensor2": tensor_info_2,
        "tensor3": tensor_info_3,
    }
    actual = mlprediction.encode_base64(
        [{u"tensor1": [[[u"a", u"b"]], [[u"c", u"d"]]],
          u"tensor2": [u"x", u"y", u"z"],
          u"tensor3": [1.0, -2.0, 3.14]}],
        outputs_map)
    self.assertEqual(actual, [{u"tensor1": [[[u"a", u"b"]], [[u"c", u"d"]]],
                               u"tensor2": [u"x", u"y", u"z"],
                               u"tensor3": [1.0, -2.0, 3.14]}])

  def testMultiTensorWithBase64Strings(self):
    tensor_info_1 = meta_graph_pb2.TensorInfo(dtype=tf.string.as_datatype_enum)
    tensor_info_2 = meta_graph_pb2.TensorInfo(dtype=tf.string.as_datatype_enum)
    tensor_info_3 = meta_graph_pb2.TensorInfo(dtype=tf.float32.as_datatype_enum)
    outputs_map = {
        "tensor1_bytes": tensor_info_1,
        "tensor2": tensor_info_2,
        "tensor3": tensor_info_3,
    }
    actual = mlprediction.encode_base64(
        [{u"tensor1_bytes": [[[u"a", u"b"]], [[u"c", u"d"]]],
          u"tensor2": [u"x", u"y", u"z"],
          u"tensor3": [1.0, -2.0, 3.14]}],
        outputs_map)
    self.assertEqual(
        actual,
        [{u"tensor1_bytes": [[[{u"b64": base64.b64encode(u"a")},
                               {u"b64": base64.b64encode(u"b")},]],
                             [[{u"b64": base64.b64encode(u"c")},
                               {u"b64": base64.b64encode(u"d")},]]],
          u"tensor2": [u"x", u"y", u"z"],
          u"tensor3": [1.0, -2.0, 3.14]}])

  def testModelWithBytesBasedOutput(self):
    mock_client = mock.Mock()
    mock_client.predict.return_value = {"x_bytes": "to_encode"}
    signature_def = meta_graph_pb2.SignatureDef()
    signature_def.outputs["x_bytes"].dtype = types_pb2.DT_STRING
    signature_def.inputs["input_key"].dtype = types_pb2.DT_STRING
    mock_client.signature_map = {
        tf.saved_model.signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY:
        signature_def}

    model = mlprediction.create_model(mock_client, "gs://tmp/foo")
    _, predictions = model.predict({"input_key": "foo"})
    self.assertEqual(predictions, [{
        "x_bytes": {
            "b64": base64.b64encode("to_encode")
        }
    }])


class LoadModelTest(tf.test.TestCase):

  def setUp(self):
    self.test_dir = tempfile.mkdtemp()

  def tearDown(self):
    shutil.rmtree(self.test_dir)

  def testConfigIsSet(self):
    # Arrange
    test_config = tf.ConfigProto(inter_op_parallelism_threads=3)

    # Act
    model_path = INPUT_MODEL
    session, _ = mlprediction.load_model(
        model_path,
        tags=(tf.saved_model.tag_constants.SERVING,),
        config=test_config)

    # Assert
    self.assertEqual(session._config, test_config)

  def testLoadCustomSignature(self):
    model_dir = os.path.join(self.test_dir, "identity_model")
    model_test_util.create_identity_model(
        model_dir=model_dir,
        signature_name="mysignature",
        tags=("tag1", "tag2"))
    _, signature_map = mlprediction.load_model(model_dir,
                                               tags=("tag1", "tag2"))
    signature = signature_map["mysignature"]
    self.assertEqual([i for i in signature.inputs], ["in"])
    self.assertEqual("Print:0", signature.inputs["in"].name)
    self.assertEqual([i for i in signature.outputs], ["out"])
    self.assertEqual("Print_1:0", signature.outputs["out"].name)

    with self.assertRaises(mlprediction.PredictionError) as error:
      _, _ = mlprediction.load_model(model_dir, tags=("tag1",))
    self.assertEqual(error.exception.error_detail,
                     "Failed to load the model due to bad model data. "
                     "tags: ['tag1']\nMetaGraphDef associated with tags 'tag1' "
                     "could not be found in SavedModel. To inspect available "
                     "tag-sets in the SavedModel, please use the SavedModel "
                     "CLI: `saved_model_cli`")


class LocalPredictionTest(tf.test.TestCase):

  def setUp(self):
    self.test_dir = tempfile.mkdtemp()

  def tearDown(self):
    shutil.rmtree(self.test_dir)

  def _input_dir(self, rel_path):
    return os.path.join(os.path.dirname(__file__), rel_path)

  def testPredictWithSavedModelWithCustomSignature(self):
    model_dir = os.path.join(self.test_dir, "identity_model_predict")
    model_test_util.create_identity_model(
        model_dir=model_dir,
        signature_name="mysignature",
        tags=("tag1", "tag2"))
    result = mlprediction.local_predict(model_dir,
                                        tags=("tag1", "tag2"),
                                        signature_name="mysignature",
                                        instances=[{"in": "check"}])
    self.assertEqual(result["predictions"], [{"out": "check"}])

    # Only one signature_def in the graph, so it's optional to specify it.
    result = mlprediction.local_predict(model_dir,
                                        tags=("tag1", "tag2"),
                                        instances=[{"in": "check"}])
    self.assertEqual(result["predictions"], [{"out": "check"}])

  def testPredictWithSavedModelMultipleSignatures(self):
    model_dir = os.path.join(self.test_dir, "constant_model_predict")
    model_test_util.create_constant_model(
        model_dir,
        "mysignature", 1, "serving_default", 2,
        tags=("tag1", "tag2"))
    # Predict with specified signature.
    result = mlprediction.local_predict(model_dir,
                                        tags=("tag1", "tag2"),
                                        signature_name="mysignature",
                                        instances=[{"in": "check"}])
    self.assertEqual(result["predictions"], [{"out": 1}])

    # Predict without specified signature will use serving default.
    result = mlprediction.local_predict(model_dir,
                                        tags=("tag1", "tag2"),
                                        instances=[{"in": "check"}])
    self.assertEqual(result["predictions"], [{"out": 2}])

    # Predict with wrong specified signature.
    with self.assertRaises(mlprediction.PredictionError) as error:
      result = mlprediction.local_predict(model_dir,
                                          tags=("tag1", "tag2"),
                                          signature_name="wrongsignature",
                                          instances=[{"in": "check"}])
    self.assertEqual("No signature found for signature key wrongsignature.",
                     error.exception.error_detail)

  @mock.patch("prediction_lib.create_client")
  def testLocalPredictionTensorflowModelWithStrings(self, mock_create_client):

    signature_def = meta_graph_pb2.SignatureDef()
    signature_def.outputs["x_bytes"].dtype = types_pb2.DT_STRING
    signature_def.inputs["x_bytes"].dtype = types_pb2.DT_STRING

    mock_client = mock.Mock()
    mock_client.signature_map = {
        tf.saved_model.signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY:
            signature_def
    }
    mock_client.predict.return_value = {"x_bytes": "to_encode"}
    mock_create_client.return_value = mock_client
    predictions = mlprediction.local_predict(
        model_dir=None, instances=[{"x_bytes": [1, 2, 3]}])
    # Validate that the output is correctly base64 encoded (and only once)
    self.assertEquals(
        predictions,
        {"predictions": [{"x_bytes": {"b64": base64.b64encode("to_encode")}}]})

  def testPredictionSavedModelWithBadInput(self):
    data_path = SAVED_TESTDATA_BAD
    with open(data_path) as f:
      # Read two input records as strings.
      instances = [
          json.loads(next(f).rstrip("\n")),
          json.loads(next(f).rstrip("\n"))]

    model_path = INPUT_MODEL
    with self.assertRaises(mlprediction.PredictionError) as error:
      mlprediction.local_predict(
          model_dir=model_path, instances=instances)

    self.assertTrue("Unexpected tensor name: x" in error.exception.error_detail)

  def testLocalPredictionSklearnModel(self):
    # Uses a trained sklearn model that computes x+y
    instances = [[10, 20], [1, 2], [5, 6]]
    model_path = SKLEARN_JOBLIB_MODEL
    predictions = mlprediction.local_predict(
        model_dir=model_path,
        instances=instances,
        framework=mlprediction.SCIKIT_LEARN_FRAMEWORK_NAME)

    self.assertEqual(predictions, {"predictions": [30, 3, 11]})

  def testLocalPredictionXgboostModel(self):
    # Uses a trained xgboost model that computes x+y
    instances = [[10, 20], [1, 2], [5, 6]]
    model_path = XGBOOST_MODEL
    predictions = mlprediction.local_predict(
        model_dir=model_path,
        instances=instances,
        framework=mlprediction.XGBOOST_FRAMEWORK_NAME)
    self.assertEqual([round(i)
                      for i in predictions["predictions"]], [30, 3, 11])


class PredictionXgboostModelTest(unittest.TestCase):

  def testXGBoostPredictionNoPreprocessing(self):
    expected_output = [[1.0, 1.1, 1.2], [2.1, 2.2, 2.3]]
    instances = [1, 2]
    mock_client = mock.Mock()
    mock_client.predict.return_value = expected_output
    xgboost_model = mlprediction.XGBoostModel(mock_client)
    self.assertEqual(
        xgboost_model.predict(instances), (instances, expected_output))
    np.testing.assert_array_equal(
        np.array(instances), mock_client.predict.call_args[0][0])

  def testXGBoostPredictionWithUserProcessor(self):

    create_version_json = """
        {
          "version": {
            "processor_class": "testdata.user_custom_python.user_model.UserProcessor"
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      instances = [1, 2]
      mock_client = mock.Mock()
      mock_client.predict.return_value = [10, 20]
      xgboost_model = mlprediction.XGBoostModel(mock_client)
      # Verify postprocessing (which divides values by 2) is applied to the
      # predicted results.
      self.assertEqual(
          xgboost_model.predict(instances), (instances, [5, 10]))

      # Verify preprocessing(which multiplies values by 2) is applied
      # before calling predict.
      mock_client.predict.assert_has_calls(
          [mock.call([2, 4], stats=mock.ANY)])

  def testXGBoostPredictionWithInvalidProcessor(self):

    create_version_json = """
        {
          "version": {
            "processor_class": "testdata.user_custom_python.user_model.InvalidProcessor"
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      mock_client = mock.Mock()
      with self.assertRaises(mlprediction.PredictionError) as error:
        mlprediction.XGBoostModel(mock_client)
    self.assertEqual(error.exception.error_detail,
                     ("The provided preprocess function in the Processor class "
                      "InvalidProcessor is not callable."))

  def testCreateXgboostModel(self):
    model_path = XGBOOST_MODEL
    # model is a Xgboost booster.
    model = mlprediction.create_xgboost_model(model_path, None)
    inputs = [[10, 20], [1, 2], [5, 6]]
    stats = mlprediction.Stats()
    stats["dummy"] = 1  # So that a new stats object is not created.
    original_inputs, predictions = model.predict(inputs, stats)
    predictions = [int(round(i)) for i in predictions]
    self.assertEqual(predictions, [30, 3, 11])
    self.assertEqual(original_inputs, inputs)
    self.assertEqual(stats[mlprediction.ENGINE],
                     mlprediction.XGBOOST_FRAMEWORK_NAME)

  def testInvalidXgboostModel(self):
    model_path = "foo"  # Model doesn't exist.
    with self.assertRaises(mlprediction.PredictionError) as error:
      mlprediction.create_xgboost_model(model_path, None)
    self.assertTrue(
        "Could not load the model: " in error.exception.error_detail)

  def testInvalidDmatrixInput(self):
    model_path = XGBOOST_MODEL
    model = mlprediction.create_xgboost_model(model_path, None)
    inputs = [1, 2]  # Requires a 2-dimensional list.
    with self.assertRaises(mlprediction.PredictionError) as error:
      model.predict(inputs, None)

    self.assertEqual(error.exception.error_code,
                     mlprediction.PredictionError.FAILED_TO_RUN_MODEL.code)
    self.assertIn("Could not initialize DMatrix from inputs:",
                  error.exception.error_detail)


class PredictionSklearnModelTest(unittest.TestCase):

  def setUp(self):
    self.test_dir = tempfile.mkdtemp()

  def tearDown(self):
    shutil.rmtree(self.test_dir)

  def testSklearnPredictionNoPreprocessing(self):
    expected_output = [[1.0, 1.1, 1.2], [2.1, 2.2, 2.3]]
    instances = [1, 2]
    mock_client = mock.Mock()
    mock_client.predict.return_value = expected_output
    sklearn_model = mlprediction.SklearnModel(mock_client)
    self.assertEqual(
        sklearn_model.predict(instances), (instances, expected_output))
    np.testing.assert_array_equal(
        np.array(instances), mock_client.predict.call_args[0][0])

  def testTransformerPreprocessing(self):

    create_version_json = """
        {
          "version": {
            "processor_class": "testdata.user_custom_python.user_model.FunctionTransformerPreprocessor"
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      instances = [[1, 2], [3, 4]]
      mock_client = mock.Mock()
      mock_client.predict.return_value = [10, 20]
      sklearn_model = mlprediction.SklearnModel(mock_client)
      sklearn_model.predict(instances)

      # The first feature is dropped, and log1p is applied on the rest.
      expected_preprocessed_input = np.log1p(np.array([[2], [4]]))
      np.testing.assert_array_equal(expected_preprocessed_input,
                                    mock_client.predict.call_args[0][0])

  def testSklearnPredictionWithUserProcessor(self):

    create_version_json = """
        {
          "version": {
            "processor_class": "testdata.user_custom_python.user_model.UserProcessor"
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      instances = [1, 2]
      mock_client = mock.Mock()
      mock_client.predict.return_value = [10, 20]
      sklearn_model = mlprediction.SklearnModel(mock_client)
      # Verify postprocessing (which divides values by 2) is applied to the
      # predicted results.
      self.assertEqual(
          sklearn_model.predict(instances), (instances, [5, 10]))

      # Verify preprocessing(which multiplies values by 2) is applied before
      # calling predict.
      mock_client.predict.assert_has_calls(
          [mock.call([2, 4], stats=mock.ANY)])

  def testSklearnPredictionWithBadPostProcessor(self):

    create_version_json = """
        {
          "version": {
            "processor_class": "testdata.user_custom_python.user_model.InvalidPostProcessor"
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      instances = [1, 2]
      mock_client = mock.Mock()
      mock_client.predict.return_value = [10, 20]
      sklearn_model = mlprediction.SklearnModel(mock_client)
      with self.assertRaises(mlprediction.PredictionError) as e:
        _ = sklearn_model.predict(instances), (instances, [5, 10])
        # postprocessing returns an invalid type, which we should raise.
        self.assertEqual(mlprediction.PredictionError.INVALID_OUTPUTS.code,
                         e.exception.error_code)
        self.assertIn(
            "The post-processing function should return either "
            "a numpy ndarray or a list.", e.exception.error_detail)

  def testCreateSklearnModelFromJoblib(self):
    model_path = SKLEARN_JOBLIB_MODEL
    # model is a Scikit-Learn classifier.
    model = mlprediction.create_sklearn_model(
        model_path, None)
    inputs = [[10, 20], [1, 2], [5, 6]]
    stats = mlprediction.Stats()
    stats["dummy"] = 1  # So that a new stats object is not created.
    original_inputs, predictions = model.predict(inputs, stats=stats)
    self.assertEqual(predictions, [30, 3, 11])
    self.assertEqual(original_inputs, inputs)
    self.assertEqual(stats[mlprediction.ENGINE],
                     mlprediction.SCIKIT_LEARN_FRAMEWORK_NAME)

  def testCreateSklearnModelFromPickle(self):
    model_path = SKLEARN_PICKLE_MODEL
    # model is a Scikit-Learn classifier.
    model = mlprediction.create_sklearn_model(
        model_path, None)
    inputs = [[10, 20], [1, 2], [5, 6]]
    stats = mlprediction.Stats()
    stats["dummy"] = 1  # So that a new stats object is not created.
    original_inputs, predictions = model.predict(inputs, stats=stats)
    self.assertEqual(predictions, [30, 3, 11])
    self.assertEqual(original_inputs, inputs)
    self.assertEqual(stats[mlprediction.ENGINE],
                     mlprediction.SCIKIT_LEARN_FRAMEWORK_NAME)

  def testCreateSklearnInvalidModel(self):
    model_path = self.test_dir
    # Copying a .joblib model with incorrect suffix (.pkl), so that it cannot be
    # loaded.
    shutil.copy2(
        os.path.join(SKLEARN_JOBLIB_MODEL, "model.joblib"),
        os.path.join(model_path, "model.pkl"))

    with self.assertRaises(mlprediction.PredictionError) as error:
      mlprediction.create_sklearn_model(model_path, None)
    self.assertEqual(error.exception.error_code,
                     mlprediction.PredictionError.FAILED_TO_LOAD_MODEL.code)
    self.assertIn(
        "Could not load the model", error.exception.error_detail)

  def testSklearnModelNotFound(self):
    model_path = "non_existent_path"
    with self.assertRaises(mlprediction.PredictionError) as error:
      mlprediction.create_sklearn_model(model_path, None)
    self.assertIn("Could not find ", error.exception.error_detail)

  def testInvalidPredictionWithSklearn(self):
    model_path = SKLEARN_JOBLIB_MODEL
    # model is a Scikit-Learn classifier.
    model = mlprediction.create_sklearn_model(
        model_path, None)
    # The shape doesn't match the expected shape of: (2,)
    inputs = [[10, 20, 30]]
    with self.assertRaises(mlprediction.PredictionError) as error:
      model.predict(inputs, stats=None)
    self.assertEqual(error.exception.error_code,
                     mlprediction.PredictionError.FAILED_TO_RUN_MODEL.code)
    self.assertIn("Exception during sklearn prediction",
                  error.exception.error_detail)


class TensorFlowCustomModelTest(unittest.TestCase):

  def testTensorFlowModelCreationNoCreateVersionRequest(self):
    client = mock.Mock()
    client.signature_map = {"serving_default": None}
    dummy_model_path = "gs://dummy/model/path"
    model = mlprediction.create_model(client, dummy_model_path)
    self.assertIsInstance(model, mlprediction.TensorFlowModel)

  def testModelCreationNoCustomCode(self):
    create_version_json = """
       {
         "version": {}
       }
       """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      client = mock.Mock()
      client.signature_map = {"serving_default": None}
      dummy_model_path = "gs://dummy/model/path"
      model = mlprediction.create_model(client, dummy_model_path)
      self.assertIsInstance(model, mlprediction.TensorFlowModel)

  def testUserModelCreationFromClassMethod(self):
    create_version_json = """
        {
          "version": {
            "model_class": "testdata.user_custom_python.user_model.UserModel"
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      client = None
      dummy_model_path = "gs://dummy/model/path"
      model = mlprediction.create_model(client, dummy_model_path)
      self.assertIsInstance(model, user_model.UserModel)

  def testUserModelCreationFromNestedClass(self):
    create_version_json = """
        {
          "version": {
            "model_class": "testdata.user_custom_python.user_model.UserModelOuter.UserModelInner"
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      client = None
      dummy_model_path = "gs://dummy/model/path"
      model = mlprediction.create_model(client, dummy_model_path)
      self.assertIsInstance(model, user_model.UserModelOuter.UserModelInner)

  def testUserModelMissingCustomMethod(self):
    create_version_json = """
        {
          "version": {
            "model_class": "testdata.user_custom_python.wrong_user_model",
            "package_uris": ["gs://test_package"]
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      with self.assertRaises(mlprediction.PredictionError) as error:
        client = None
        dummy_model_path = "gs://dummy/model/path"
        mlprediction.create_model(client, dummy_model_path)
    self.assertEqual(error.exception.error_detail,
                     ("testdata.user_custom_python."
                      "wrong_user_model cannot be found. Please make "
                      "sure (1) model_class is the fully qualified function "
                      "name, and (2) model_class uses the correct package name "
                      "as provided by the package_uris: ['gs://test_package']"))

  def testMissingUserModelClassModule(self):
    create_version_json = """
        {
          "version": {
            "model_class": "wrong_module.UserModel",
            "package_uris": ["gs://test_package"]
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      with self.assertRaises(mlprediction.PredictionError) as error:
        client = None
        dummy_model_path = "gs://dummy/model/path"
        mlprediction.create_model(client, dummy_model_path)
    self.assertEqual(error.exception.error_detail,
                     "wrong_module.UserModel cannot be found. "
                     "Please make sure (1) model_class is the fully qualified "
                     "function name, and (2) model_class uses the correct "
                     "package name as provided by the package_uris: "
                     "['gs://test_package']")

  def testMissingPredictAndProcessMethod(self):
    create_version_json = """
        {
          "version": {
            "model_class": "testdata.user_custom_python.user_model.MissingPredict"
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      with self.assertRaises(mlprediction.PredictionError) as error:
        client = None
        dummy_model_path = "gs://dummy/model/path"
        mlprediction.create_model(client, dummy_model_path)
    self.assertEqual(error.exception.error_detail,
                     ("The provided model class, MissingPredict, is missing "
                      "the required predict method."))

  def testUserModelTooManyPredictArgs(self):
    create_version_json = """
        {
          "version": {
            "model_class": "testdata.user_custom_python.user_model.PredictMethodTooManyArgs"
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      with self.assertRaises(mlprediction.PredictionError) as error:
        client = None
        dummy_model_path = "gs://dummy/model/path"
        mlprediction.create_model(client, dummy_model_path)
    self.assertEqual(error.exception.error_detail,
                     ("The provided model class, PredictMethodTooManyArgs, "
                      "has a predict method with an invalid signature. "
                      "Expected signature: ['self', 'instances'] "
                      "User signature: ['self', 'instances', 'another']"))

  def testUserModelTooFewPredictArgs(self):
    create_version_json = """
        {
          "version": {
            "model_class": "testdata.user_custom_python.user_model.PredictMethodTooFewArgs"
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      with self.assertRaises(mlprediction.PredictionError) as error:
        client = None
        dummy_model_path = "gs://dummy/model/path"
        mlprediction.create_model(client, dummy_model_path)
    self.assertEqual(error.exception.error_detail,
                     ("The provided model class, PredictMethodTooFewArgs, has "
                      "a predict method with an invalid signature. "
                      "Expected signature: ['self', 'instances'] "
                      "User signature: ['self']"))


class TensorflowCustomProcessingTest(unittest.TestCase):

  def setUp(self):
    self._instances = [{"a": 1, "b": 2}, {"a": 2, "b": 4}]
    self._model_path = "gs://dummy/model/path"
    signature_def = meta_graph_pb2.SignatureDef()
    signature_def.inputs["a"].dtype = types_pb2.DT_INT32
    signature_def.inputs["b"].dtype = types_pb2.DT_INT32
    signature_def.outputs["c"].dtype = types_pb2.DT_INT32
    self._mock_client = mock.Mock()
    self._mock_client.predict.return_value = {"c": np.array([10, 20])}
    self._mock_client.signature_map = {
        tf.saved_model.signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY:
        signature_def}
    self._kwargs = {
        "signature_name":
        tf.saved_model.signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY}

  def testNoUserProcessor(self):
    model = mlprediction.create_model(self._mock_client, self._model_path)
    self.assertIsInstance(model, mlprediction.TensorFlowModel)
    self.assertEqual(
        model.predict(self._instances, **self._kwargs),
        (self._instances, [{
            "c": 10
        }, {
            "c": 20
        }]))
    self._mock_client.predict.assert_has_calls(
        [mock.call({
            "a": [1, 2],
            "b": [2, 4]
        }, stats=mock.ANY, signature_name=mock.ANY)])

  def testUserProcessor(self):
    create_version_json = """
        {
          "version": {
            "processor_class": "testdata.user_custom_python.user_model.TfUserProcessor"
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      model = mlprediction.create_model(self._mock_client, self._model_path)
      # Verify the default TensorFlowModel is instantiated.
      self.assertIsInstance(model, mlprediction.TensorFlowModel)
      # Verify postprocessing (which divides values by 2) is applied to the
      # predicted results.
      self.assertEqual(
          model.predict(self._instances, **self._kwargs),
          (self._instances, [{
              "c": 5
          }, {
              "c": 10
          }]))
      # Verify preprocessing(which multiplies values by 2) is applied
      # before calling predict.
      self._mock_client.predict.assert_has_calls(
          [mock.call({
              "a": [2, 4],
              "b": [4, 8]
          }, stats=mock.ANY, signature_name=mock.ANY)])

  def testUserPreprocessOnly(self):
    create_version_json = """
        {
          "version": {
            "processor_class": "testdata.user_custom_python.user_model.TfUserPreprocessor"
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      model = mlprediction.create_model(self._mock_client, self._model_path)
      # Verify the default TensorFlowModel is instantiated.
      self.assertIsInstance(model, mlprediction.TensorFlowModel)
      # Verify no postprocessing performed.
      self.assertEqual(
          model.predict(self._instances, **self._kwargs),
          (self._instances, [{
              "c": 10
          }, {
              "c": 20
          }]))
      # Verify preprocessing(which multiplies values by 2) is applied
      # before calling predict.
      self._mock_client.predict.assert_has_calls(
          [mock.call({
              "a": [2, 4],
              "b": [4, 8]
          }, stats=mock.ANY, signature_name=mock.ANY)])

  def testUserPostprocessOnly(self):
    create_version_json = """
        {
          "version": {
            "processor_class": "testdata.user_custom_python.user_model.TfUserPostprocessor"
          }
        }
        """
    env_map = {"create_version_request": create_version_json}
    with mock.patch.dict("os.environ", env_map):
      model = mlprediction.create_model(self._mock_client, self._model_path)
      # Verify the default TensorFlowModel is instantiated.
      self.assertIsInstance(model, mlprediction.TensorFlowModel)
      # Verify postprocessing (which divides values by 2) is applied to the
      # predicted results.
      self.assertEqual(
          model.predict(self._instances, **self._kwargs),
          (self._instances, [{
              "c": 5
          }, {
              "c": 10
          }]))
      # Verify no preprocessing performed.
      self._mock_client.predict.assert_has_calls(
          [mock.call({
              "a": [1, 2],
              "b": [2, 4]
          }, stats=mock.ANY, signature_name=mock.ANY)])


def make_timer_fn(start_time, end_time):
  """Returns a function that returns start_time, then end_time, then -1."""
  timer_fn = mock.Mock()
  timer_fn.side_effect = itertools.chain([start_time, end_time],
                                         itertools.repeat(-1))
  return timer_fn


class TestTimer(unittest.TestCase):

  def testStandardUsage(self):
    with mlprediction.Timer(make_timer_fn(314, 315)) as timer:
      pass

    duration = timer.seconds

    # Ensure that timer is correct
    self.assertEqual(timer.seconds, 1)  # 315 - 314

    # Ensure that unit conversion is correct
    self.assertEqual(timer.milliseconds, int(timer.seconds * 1000))
    self.assertEqual(timer.microseconds, int(timer.seconds * 1000000))

    # Ensure that the timer has stopped
    self.assertEqual(duration, timer.seconds)


class TestStats(unittest.TestCase):

  def testStandardUsage(self):
    stats = mlprediction.Stats()
    self.assertEqual(stats, {})

    stats["foo"] = 1
    with stats.time("bar", make_timer_fn(314, 315)):
      pass

    self.assertEqual(stats["foo"], 1)
    # We slept for 1 sec = 1e6 microseconds
    self.assertEqual(stats["bar"], 1000000)


class TestException(unittest.TestCase):

  def testOneException(self):
    e = mlprediction.PredictionError(
        mlprediction.PredictionError.FAILED_TO_RUN_MODEL,
        "detailed description.")
    self.assertEqual(2, e.error_code)
    self.assertEqual("detailed description.", e.error_detail)
    self.assertEqual("Failed to run the provided model: detailed description. "
                     "(Error code: 2)", str(e))


if __name__ == "__main__":
  tf.test.main()
