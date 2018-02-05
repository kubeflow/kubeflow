# Copyright 2017 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Utilities for running predictions."""
import __builtin__
import base64
import collections
from contextlib import contextmanager
import importlib
import inspect
import json
import logging
import os
import pickle
import pydoc  # used for importing python classes from their FQN
import StringIO
import timeit
from _interfaces import Model
from _interfaces import PredictionClient
from enum import Enum
import numpy as np

import tensorflow.contrib  # pylint: disable=unused-import
from tensorflow.python.client import session as tf_session
from tensorflow.python.framework import dtypes
from tensorflow.python.saved_model import loader
from tensorflow.python.saved_model import signature_constants
from tensorflow.python.saved_model import tag_constants


# --------------------------
# prediction.prediction_lib
# --------------------------
class UserClassType(Enum):
  model_class = "model_class"
  processor_class = "processor_class"


ENGINE = "Prediction-Engine"
ENGINE_RUN_TIME = "Prediction-Engine-Run-Time"
FRAMEWORK = "Framework"
SCIKIT_LEARN_FRAMEWORK_NAME = "scikit_learn"
XGBOOST_FRAMEWORK_NAME = "xgboost"
TENSORFLOW_FRAMEWORK_NAME = "tensorflow"
PREPROCESS_TIME = "Prediction-Preprocess-Time"
POSTPROCESS_TIME = "Prediction-Postprocess-Time"
# Keys for the name of the methods that the user provided `Processor`
# class should implement.
PREPROCESS_KEY = "preprocess"
POSTPROCESS_KEY = "postprocess"
FROM_MODEL_KEY = "from_model_path"

# Additional TF keyword arguments
INPUTS_KEY = "inputs"
OUTPUTS_KEY = "outputs"
SIGNATURE_KEY = "signature_name"

# Stats
COLUMNARIZE_TIME = "Prediction-Columnarize-Time"
UNALIAS_TIME = "Prediction-Unalias-Time"
ENCODE_TIME = "Prediction-Encode-Time"
SESSION_RUN_TIME = "Prediction-Session-Run-Time"
ALIAS_TIME = "Prediction-Alias-Time"
ROWIFY_TIME = "Prediction-Rowify-Time"
SESSION_RUN_ENGINE_NAME = "TF_SESSION_RUN"

# Scikit-learn and XGBoost related constants
MODEL_FILE_NAME_JOBLIB = "model.joblib"
MODEL_FILE_NAME_PICKLE = "model.pkl"
MODEL_FILE_NAME_BST = "model.bst"

PredictionErrorType = collections.namedtuple(
    "PredictionErrorType", ("message", "code"))


class PredictionError(Exception):
  """Customer exception for known prediction exception."""

  # The error code for prediction.
  FAILED_TO_LOAD_MODEL = PredictionErrorType(
      message="Failed to load model", code=0)
  INVALID_INPUTS = PredictionErrorType("Invalid inputs", code=1)
  FAILED_TO_RUN_MODEL = PredictionErrorType(
      message="Failed to run the provided model", code=2)
  INVALID_OUTPUTS = PredictionErrorType(
      message="There was a problem processing the outputs", code=3)
  INVALID_USER_CODE = PredictionErrorType(
      message="There was a problem processing the user code", code=4)
  # When adding new exception, please update the ERROR_MESSAGE_ list as well as
  # unittest.

  def __init__(self, error_code, error_detail, *args):
    super(PredictionError, self).__init__(error_code, error_detail, *args)

  @property
  def error_code(self):
    return self.args[0].code

  @property
  def error_message(self):
    return self.args[0].message

  @property
  def error_detail(self):
    return self.args[1]

  def __str__(self):
    return ("%s: %s (Error code: %d)" % (self.error_message,
                                         self.error_detail, self.error_code))


MICRO = 1000000
MILLI = 1000


class Timer(object):
  """Context manager for timing code blocks.

  The object is intended to be used solely as a context manager and not
  as a general purpose object.

  The timer starts when __enter__ is invoked on the context manager
  and stopped when __exit__ is invoked. After __exit__ is called,
  the duration properties report the amount of time between
  __enter__ and __exit__ and thus do not change. However, if any of the
  duration properties are called between the call to __enter__ and __exit__,
  then they will return the "live" value of the timer.

  If the same Timer object is re-used in multiple with statements, the values
  reported will reflect the latest call. Do not use the same Timer object in
  nested with blocks with the same Timer context manager.

  Example usage:

    with Timer() as timer:
      foo()
    print(timer.duration_secs)
  """

  def __init__(self, timer_fn=None):
    self.start = None
    self.end = None
    self._get_time = timer_fn or timeit.default_timer

  def __enter__(self):
    self.end = None
    self.start = self._get_time()
    return self

  def __exit__(self, exc_type, value, traceback):
    self.end = self._get_time()
    return False

  @property
  def seconds(self):
    now = self._get_time()
    return (self.end or now) - (self.start or now)

  @property
  def microseconds(self):
    return int(MICRO * self.seconds)

  @property
  def milliseconds(self):
    return int(MILLI * self.seconds)


class Stats(dict):
  """An object for tracking stats.

  This class is dict-like, so stats are accessed/stored like so:

    stats = Stats()
    stats["count"] = 1
    stats["foo"] = "bar"

  This class also facilitates collecting timing information via the
  context manager obtained using the "time" method. Reported timings
  are in microseconds.

  Example usage:

    with stats.time("foo_time"):
      foo()
    print(stats["foo_time"])
  """

  @contextmanager
  def time(self, name, timer_fn=None):
    with Timer(timer_fn) as timer:
      yield timer
    self[name] = timer.microseconds


def columnarize(instances):
  """Columnarize inputs.

  Each line in the input is a dictionary of input names to the value
  for that input (a single instance). For each input "column", this method
  appends each of the input values to a list. The result is a dict mapping
  input names to a batch of input data. This can be directly used as the
  feed dict during prediction.

  For example,

    instances = [{"a": [1.0, 2.0], "b": "a"},
                 {"a": [3.0, 4.0], "b": "c"},
                 {"a": [5.0, 6.0], "b": "e"},]
    batch = prediction_server_lib.columnarize(instances)
    assert batch == {"a": [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]],
                     "b": ["a", "c", "e"]}

  Arguments:
    instances: (list of dict) where the dictionaries map input names
      to the values for those inputs.

  Returns:
    A dictionary mapping input names to values, as described above.
  """
  columns = collections.defaultdict(list)
  for instance in instances:
    for k, v in instance.iteritems():
      columns[k].append(v)
  return columns


def rowify(columns):
  """Converts columnar input to row data.

  Consider the following code:

    columns = {"prediction": np.array([1,             # 1st instance
                                       0,             # 2nd
                                       1]),           # 3rd
               "scores": np.array([[0.1, 0.9],        # 1st instance
                                   [0.7, 0.3],        # 2nd
                                   [0.4, 0.6]])}      # 3rd

  Then rowify will return the equivalent of:

    [{"prediction": 1, "scores": [0.1, 0.9]},
     {"prediction": 0, "scores": [0.7, 0.3]},
     {"prediction": 1, "scores": [0.4, 0.6]}]

  (each row is yielded; no list is actually created).

  Arguments:
    columns: (dict) mapping names to numpy arrays, where the arrays
      contain a batch of data.

  Raises:
    PredictionError: if the outer dimension of each input isn't identical
    for each of element.

  Yields:
    A map with a single instance, as described above. Note: instances
    is not a numpy array.
  """
  sizes_set = {e.shape[0] for e in columns.itervalues()}

  # All the elements in the length array should be identical. Otherwise,
  # raise an exception.
  if len(sizes_set) != 1:
    sizes_dict = {name: e.shape[0] for name, e in columns.iteritems()}
    raise PredictionError(
        PredictionError.INVALID_OUTPUTS,
        "Bad output from running tensorflow session: outputs had differing "
        "sizes in the batch (outer) dimension. See the outputs and their "
        "size: %s. Check your model for bugs that effect the size of the "
        "outputs." % sizes_dict)
  # Pick an arbitrary value in the map to get it's size.
  num_instances = len(next(columns.itervalues()))
  for row in xrange(num_instances):
    yield {name: output[row, ...].tolist()
           for name, output in columns.iteritems()}


def canonicalize_single_tensor_input(instances, tensor_name):
  """Canonicalize single input tensor instances into list of dicts.

  Instances that are single input tensors may or may not be provided with their
  tensor name. The following are both valid instances:
    1) instances = [{"x": "a"}, {"x": "b"}, {"x": "c"}]
    2) instances = ["a", "b", "c"]
  This function canonicalizes the input instances to be of type 1).

  Arguments:
    instances: single input tensor instances as supplied by the user to the
      predict method.
    tensor_name: the expected name of the single input tensor.

  Raises:
    PredictionError: if the wrong tensor name is supplied to instances.

  Returns:
    A list of dicts. Where each dict is a single instance, mapping the
    tensor_name to the value (as supplied by the original instances).
  """

  # Input is a single string tensor, the tensor name might or might not
  # be given.
  # There are 3 cases (assuming the tensor name is "t", tensor = "abc"):
  # 1) {"t": "abc"}
  # 2) "abc"
  # 3) {"y": ...} --> wrong tensor name is given.
  def parse_single_tensor(x, tensor_name):
    if not isinstance(x, dict):
      # case (2)
      return {tensor_name: x}
    elif len(x) == 1 and tensor_name == x.keys()[0]:
      # case (1)
      return x
    else:
      raise PredictionError(PredictionError.INVALID_INPUTS,
                            "Expected tensor name: %s, got tensor name: %s." %
                            (tensor_name, x.keys()))

  if not isinstance(instances, list):
    instances = [instances]
  instances = [parse_single_tensor(x, tensor_name) for x in instances]
  return instances


class BaseModel(Model):
  """The base definition of an internal Model interface.
  """

  def __init__(self, client):
    """Constructs a BaseModel.

    Args:
      client: An instance of PredictionClient for performing prediction.
    """
    self._client = client
    self._user_processor = None

  def preprocess(self, instances, stats=None, **kwargs):
    """Runs the preprocessing function on the instances.

    Args:
      instances: list of instances as provided to the predict() method.
      stats: Stats object for recording timing information.
      **kwargs: Additional keyword arguments for preprocessing.

    Returns:
      A new list of preprocessed instances. Each instance is as described
      in the predict() method.
    """
    pass

  def postprocess(self, predicted_output, original_input=None, stats=None,
                  **kwargs):
    """Runs the postprocessing function on the instances.

    Args:
      predicted_output: list of instances returned by the predict() method on
        preprocessed instances.
      original_input: List of instances, before any pre-processing was applied.
      stats: Stats object for recording timing information.
      **kwargs: Additional keyword arguments for postprocessing.

    Returns:
      A new list of postprocessed instances.
    """
    pass

  def predict(self, instances, stats=None, **kwargs):
    """Runs preprocessing, predict, and postprocessing on the input."""

    stats = stats or Stats()
    self._validate_kwargs(kwargs)

    with stats.time(PREPROCESS_TIME):
      preprocessed = self.preprocess(instances, stats=stats, **kwargs)
    with stats.time(ENGINE_RUN_TIME):
      predicted_outputs = self._client.predict(
          preprocessed, stats=stats, **kwargs)
    with stats.time(POSTPROCESS_TIME):
      postprocessed = self.postprocess(
          predicted_outputs, original_input=instances, stats=stats, **kwargs)
    return instances, postprocessed

  def _validate_kwargs(self, kwargs):
    """Validates and sets defaults for extra predict keyword arguments.

    Modifies the keyword args dictionary in-place. Keyword args will be included
    into pre/post-processing and the client predict method.
    Can raise Exception to error out of request on bad keyword args.
    If no additional args are required, pass.

    Args:
      kwargs: Dictionary (str->str) of keyword arguments to check.
    """
    pass


def load_model(
    model_path,
    tags=(tag_constants.SERVING,),
    config=None):
  """Loads the model at the specified path.

  Args:
    model_path: the path to either session_bundle or SavedModel
    tags: the tags that determines the model to load.
    config: tf.ConfigProto containing session configuration options.

  Returns:
    A pair of (Session, map<string, SignatureDef>) objects.

  Raises:
    PredictionError: if the model could not be loaded.
  """
  if loader.maybe_saved_model_directory(model_path):
    try:
      session = tf_session.Session(target="", graph=None, config=config)
      meta_graph = loader.load(session, tags=list(tags), export_dir=model_path)
    except Exception as e:  # pylint: disable=broad-except
      raise PredictionError(PredictionError.FAILED_TO_LOAD_MODEL,
                            "Failed to load the model due to bad model data."
                            " tags: %s\n%s" % (list(tags), str(e)))
  else:
    raise PredictionError(PredictionError.FAILED_TO_LOAD_MODEL,
                          "Cloud ML only supports TF 1.0 or above and models "
                          "saved in SavedModel format.")

  if session is None:
    raise PredictionError(PredictionError.FAILED_TO_LOAD_MODEL,
                          "Failed to create session when loading the model")

  if not meta_graph.signature_def:
    raise PredictionError(PredictionError.FAILED_TO_LOAD_MODEL,
                          "MetaGraph must have at least one signature_def.")

  # Remove invalid signatures from the signature map.
  invalid_signatures = []
  for signature_name in meta_graph.signature_def:
    try:
      signature = meta_graph.signature_def[signature_name]
      _update_dtypes(session.graph, signature.inputs)
      _update_dtypes(session.graph, signature.outputs)
    except ValueError as e:
      logging.warn("Error updating signature %s: %s", signature_name, str(e))
      invalid_signatures.append(signature_name)
  for signature_name in invalid_signatures:
    del meta_graph.signature_def[signature_name]

  return session, meta_graph.signature_def


def _update_dtypes(graph, interface):
  """Adds dtype to TensorInfos in interface if necessary.

  If already present, validates TensorInfo matches values in the graph.
  TensorInfo is updated in place.

  Args:
    graph: the TensorFlow graph; used to lookup datatypes of tensors.
    interface: map from alias to TensorInfo object.

  Raises:
    ValueError: if the data type in the TensorInfo does not match the type
      found in graph.
  """
  for alias, info in interface.iteritems():
    # Postpone conversion to enum for better error messages.
    dtype = graph.get_tensor_by_name(info.name).dtype
    if not info.dtype:
      info.dtype = dtype.as_datatype_enum
    elif info.dtype != dtype.as_datatype_enum:
      raise ValueError("Specified data types do not match for alias %s. "
                       "Graph has %d while TensorInfo reports %d." %
                       (alias, dtype, info.dtype))


class SessionClient(object):
  """A client for Prediction that uses Session.run."""

  def __init__(self, session, signature_map):
    self._session = session
    self._signature_map = signature_map

    # TensorFlow requires a list of tensor names for the fetches. To avoid
    # regenerating the list every prediction, we cache the list of output
    # tensor names.
    self._output_tensors_map = {
        signature_name:
        [v.name for v in signature_map[signature_name].outputs.values()]
        for signature_name in signature_map}

  @property
  def signature_map(self):
    return self._signature_map

  def predict(self, inputs, stats=None,
              signature_name=(signature_constants.
                              DEFAULT_SERVING_SIGNATURE_DEF_KEY),
              **unused_kwargs):
    """Produces predictions for the given inputs.

    Args:
      inputs: a dict mapping input names to values
      stats: Stats object for recording timing information.
      signature_name: name of SignatureDef to use in this prediction
      **unused_kwargs: placeholder, pre/postprocess may have additional args

    Returns:
      A dict mapping output names to output values, similar to the input
      dict.
    """
    stats = stats or Stats()
    stats[ENGINE] = "SessionRun"
    stats[FRAMEWORK] = TENSORFLOW_FRAMEWORK_NAME

    with stats.time(UNALIAS_TIME):
      try:
        signature = self._signature_map[signature_name]
        unaliased = {signature.inputs[key].name: val
                     for key, val in inputs.iteritems()}
      except Exception as e:
        raise PredictionError(PredictionError.INVALID_INPUTS,
                              "Input mismatch: " + str(e))

    with stats.time(SESSION_RUN_TIME):
      try:
        outputs = self._session.run(
            fetches=self._output_tensors_map[signature_name],
            feed_dict=unaliased)
      except Exception as e:
        logging.error("Exception during running the graph: " + str(e))
        raise PredictionError(PredictionError.FAILED_TO_RUN_MODEL,
                              "Exception during running the graph: " + str(e))

    with stats.time(ALIAS_TIME):
      return dict(zip(signature.outputs.iterkeys(), outputs))


def load_model_class(client, model_path):
  """Loads in the user specified custom Model class.

  Args:
    client: An instance of ModelServerClient for performing prediction.
    model_path: the path to either session_bundle or SavedModel

  Returns:
    An instance of a Model.
    Returns None if the user didn't specify the name of the custom
    python class to load in the create_version_request.

  Raises:
    PredictionError: for any of the following:
      (1) the user provided python model class cannot be found
      (2) if the loaded class does not implement the Model interface.
  """
  model_class = load_custom_class(UserClassType.model_class)
  if not model_class:
    return None
  model_instance = model_class.from_client(client, model_path)
  _validate_model_class(model_instance)
  return model_instance


def load_custom_class(class_type):
  """Loads in the user specified custom class.

  Args:
    class_type: An instance of UserClassType specifying what type of class to
    load.

  Returns:
    An instance of a class specified by the user in the `create_version_request`
    or None if no such class was specified.

  Raises:
    PredictionError: if the user provided python class cannot be found.
  """
  create_version_json = os.environ.get("create_version_request")
  if not create_version_json:
    return None
  create_version_request = json.loads(create_version_json)
  if not create_version_request:
    return None
  version = create_version_request.get("version")
  if not version:
    return None
  class_name = version.get(class_type.name)
  if not class_name:
    return None
  custom_class = pydoc.locate(class_name)
  if not custom_class:
    package_uris = [str(s) for s in version.get("package_uris")]
    raise PredictionError(PredictionError.INVALID_USER_CODE,
                          "%s cannot be found. Please make sure "
                          "(1) %s is the fully qualified function "
                          "name, and (2) %s uses the correct package "
                          "name as provided by the package_uris: %s" %
                          (class_name, class_type.name, class_type.name,
                           package_uris))
  return custom_class


def _validate_model_class(user_class):
  """Validates a user provided instance of a Model implementation.

  Args:
    user_class: An instance of a Model implementation.

  Raises:
    PredictionError: for any of the following:
      (1) the user model class does not have the correct method signatures for
      the predict method
  """
  user_class_name = type(user_class).__name__
  # Can't use isinstance() because the user doesn't have access to our Model
  # class. We can only inspect the user_class to check if it conforms to the
  # Model interface.
  if not hasattr(user_class, "predict"):
    raise PredictionError(PredictionError.INVALID_USER_CODE,
                          "The provided model class, %s, is missing the "
                          "required predict method." % user_class_name)
  # Check the predict method has the correct number of arguments
  user_signature = inspect.getargspec(user_class.predict)[0]
  model_signature = inspect.getargspec(Model.predict)[0]
  user_predict_num_args = len(user_signature)
  predict_num_args = len(model_signature)
  if predict_num_args is not user_predict_num_args:
    raise PredictionError(PredictionError.INVALID_USER_CODE,
                          "The provided model class, %s, has a predict method "
                          "with an invalid signature. Expected signature: %s "
                          "User signature: %s" %
                          (user_class_name, model_signature, user_signature))


def _new_processor_class(model_path=None):
  user_processor_cls = load_custom_class(UserClassType.processor_class)
  if user_processor_cls:
    user_preprocess_fn = getattr(user_processor_cls, PREPROCESS_KEY, None)
    user_postprocess_fn = getattr(user_processor_cls, POSTPROCESS_KEY, None)
    user_from_model_path_fn = getattr(user_processor_cls, FROM_MODEL_KEY, None)

    _validate_fn_signature(user_preprocess_fn,
                           ["self", "instances"],
                           PREPROCESS_KEY, user_processor_cls.__name__)
    _validate_fn_signature(user_postprocess_fn,
                           ["self", "instances"],
                           POSTPROCESS_KEY, user_processor_cls.__name__)
    _validate_fn_signature(user_from_model_path_fn, ["cls", "model_path"],
                           FROM_MODEL_KEY, user_processor_cls.__name__)
    if user_from_model_path_fn:
      return user_from_model_path_fn(model_path)  # pylint: disable=not-callable
    # Call the constructor if no `from_model_path` method provided.
    return user_processor_cls()


def _validate_fn_signature(fn, required_arg_names, expected_fn_name, cls_name):
  if not fn:
    return
  if not callable(fn):
    raise PredictionError(
        PredictionError.INVALID_USER_CODE,
        "The provided %s function in the Processor class "
        "%s is not callable." % (expected_fn_name, cls_name))
  for arg in required_arg_names:
    if arg not in inspect.getargspec(fn).args:
      raise PredictionError(
          PredictionError.INVALID_USER_CODE,
          "The provided %s function in the Processor class "
          "has an invalid signature. It should take %s as arguments but "
          "takes %s" %
          (fn.__name__, required_arg_names, inspect.getargspec(fn).args))


class TensorFlowModel(BaseModel):
  """The default implementation of the Model interface that uses TensorFlow.

  This implementation optionally performs preprocessing and postprocessing
  using the provided functions. These functions accept a single instance
  as input and produce a corresponding output to send to the prediction
  client.
  """

  def __init__(self, client):
    """Constructs a TensorFlowModel.

    Args:
      client: An instance of ModelServerClient or SessionClient.
    """
    super(TensorFlowModel, self).__init__(client)
    self._default_signature_key = self._get_default_signature()
    self._preprocess_fn = None
    self._postprocess_fn = None
    processor_cls = _new_processor_class()
    if processor_cls:
      self._preprocess_fn = getattr(processor_cls, PREPROCESS_KEY, None)
      self._postprocess_fn = getattr(processor_cls, POSTPROCESS_KEY, None)

  def _get_default_signature(self):
    """If the graph contains only single signature, returns the key of that.

    Otherwise, returns signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY.

    Returns:
      The default signature key.
    """
    if len(self._client.signature_map) == 1:
      return self._client.signature_map.keys()[0]
    else:
      return signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY

  def _get_columns(self, instances, stats, signature):
    """Columnarize the instances, appending input_name, if necessary.

    Instances are the same instances passed to the predict() method. Since
    models with a single input can accept the raw input without the name,
    we create a dict here with that name.

    This list of instances is then converted into a column-oriented format:
    The result is a dictionary mapping input name to a list of values for just
    that input (one entry per row in the original instances list).

    Args:
      instances: the list of instances as provided to the predict() method.
      stats: Stats object for recording timing information.
      signature: SignatureDef for the current request.

    Returns:
      A dictionary mapping input names to their values.

    Raises:
      PredictionError: if an error occurs during prediction.
    """
    with stats.time(COLUMNARIZE_TIME):
      columns = columnarize(instances)
      for k, v in columns.iteritems():
        if k not in signature.inputs.keys():
          raise PredictionError(
              PredictionError.INVALID_INPUTS,
              "Unexpected tensor name: %s" % k)
        # Detect whether or not the user omits an input in one or more inputs.
        if isinstance(v, list) and len(v) != len(instances):
          raise PredictionError(
              PredictionError.INVALID_INPUTS,
              "Input %s was missing in at least one input instance." % k)
    return columns

  def is_single_input(self, signature):
    """Returns True if the graph only has one input tensor."""
    return len(signature.inputs) == 1

  def is_single_string_input(self, signature):
    """Returns True if the graph only has one string input tensor."""
    if self.is_single_input(signature):
      dtype = signature.inputs.values()[0].dtype
      return dtype == dtypes.string.as_datatype_enum
    return False

  def preprocess(self, instances, stats=None,
                 **kwargs):
    # We already validate that kwargs has SIGNATURE_KEY.
    signature_name = kwargs[SIGNATURE_KEY]
    signature = self._client.signature_map[signature_name]
    preprocessed = self._canonicalize_input(instances, signature)
    if self._preprocess_fn:
      try:
        preprocessed = self._preprocess_fn(preprocessed, **kwargs)
      except Exception as e:
        logging.error("Exception during preprocessing: " + str(e))
        raise PredictionError(PredictionError.INVALID_INPUTS,
                              "Exception during preprocessing: " + str(e))
    return self._get_columns(preprocessed, stats, signature)

  def _canonicalize_input(self, instances, signature):
    """Preprocess single-input instances to be dicts if they aren't already."""
    # The instances should be already (b64-) decoded here.
    if not self.is_single_input(signature):
      return instances

    tensor_name = signature.inputs.keys()[0]
    return canonicalize_single_tensor_input(instances, tensor_name)

  def postprocess(self, predicted_output, original_input=None, stats=None,
                  **kwargs):
    """Performs the necessary transformations on the prediction results.

    The transformations include rowifying the predicted results, and also
    making sure that each input/output is a dict mapping input/output alias to
    the value for that input/output.

    Args:
      predicted_output: list of instances returned by the predict() method on
        preprocessed instances.
      original_input: List of instances, before any pre-processing was applied.
      stats: Stats object for recording timing information.
      **kwargs: Additional keyword arguments for postprocessing

    Returns:
      A list which is a dict mapping output alias to the output.
    """
    # We already validate that kwargs has SIGNATURE_KEY.
    signature_name = kwargs[SIGNATURE_KEY]
    signature = self._client.signature_map[signature_name]
    with stats.time(ROWIFY_TIME):
      # When returned element only contains one result (batch size == 1),
      # tensorflow's session.run() will return a scalar directly instead of a
      # a list. So we need to listify that scalar.
      def listify(value):
        if not hasattr(value, "shape"):
          return np.asarray([value], dtype=np.object)
        elif not value.shape:
          return np.expand_dims(value, axis=0)
        else:
          return value

      postprocessed_outputs = {
          alias: listify(val)
          for alias, val in predicted_output.iteritems()
      }
      postprocessed_outputs = rowify(postprocessed_outputs)

    postprocessed_outputs = list(postprocessed_outputs)
    if self._postprocess_fn:
      try:
        postprocessed_outputs = self._postprocess_fn(postprocessed_outputs,
                                                     **kwargs)
      except Exception as e:
        logging.error("Exception during postprocessing: %s", e)
        raise PredictionError(PredictionError.INVALID_INPUTS,
                              "Exception during postprocessing: " + str(e))

    with stats.time(ENCODE_TIME):
      try:
        postprocessed_outputs = encode_base64(
            postprocessed_outputs, signature.outputs)
      except PredictionError as e:
        logging.error("Encode base64 failed: %s", e)
        raise PredictionError(PredictionError.INVALID_OUTPUTS,
                              "Prediction failed during encoding instances: {0}"
                              .format(e.error_detail))
      except ValueError as e:
        logging.error("Encode base64 failed: %s", e)
        raise PredictionError(PredictionError.INVALID_OUTPUTS,
                              "Prediction failed during encoding instances: {0}"
                              .format(e))
      except Exception as e:  # pylint: disable=broad-except
        logging.error("Encode base64 failed: %s", e)
        raise PredictionError(PredictionError.INVALID_OUTPUTS,
                              "Prediction failed during encoding instances")

      return postprocessed_outputs

  @classmethod
  def from_client(cls, client, unused_model_path, **unused_kwargs):
    """Creates a TensorFlowModel from a SessionClient and model data files."""
    return cls(client)

  @property
  def signature_map(self):
    return self._client.signature_map

  def _validate_kwargs(self, kwargs):
    """Validates and sets defaults for extra client keyword arguments.

    Args:
      kwargs: Dictionary of keyword args to check. Will guarantee valid:
        "signature_name": selects TF signature for inputs/outputs

    Raises:
      PredictionError: if any keyword args are invalid
    """
    if SIGNATURE_KEY not in kwargs or kwargs[SIGNATURE_KEY] is None:
      kwargs[SIGNATURE_KEY] = self._default_signature_key
    if kwargs[SIGNATURE_KEY] not in self._client.signature_map:
      raise PredictionError(
          PredictionError.INVALID_INPUTS,
          "No signature found for signature key %s." % kwargs[SIGNATURE_KEY])


# This class is specific to Scikit-learn, and should be moved to a separate
# module. However due to gcloud's complicated copying mechanism we need to keep
# things in one file for now.
class SklearnClient(PredictionClient):
  """A loaded scikit-learn model to be used for prediction."""

  def __init__(self, predictor):
    self._predictor = predictor

  def predict(self, inputs, stats=None, **kwargs):
    stats = stats or Stats()
    stats[FRAMEWORK] = SCIKIT_LEARN_FRAMEWORK_NAME
    stats[ENGINE] = SCIKIT_LEARN_FRAMEWORK_NAME
    try:
      return self._predictor.predict(inputs, **kwargs)
    except Exception as e:
      logging.exception("Exception while predicting with sklearn model.")
      raise PredictionError(PredictionError.FAILED_TO_RUN_MODEL,
                            "Exception during sklearn prediction: " + str(e))


class XgboostClient(PredictionClient):
  """A loaded xgboost model to be used for prediction."""

  def __init__(self, booster):
    self._booster = booster

  def predict(self, inputs, stats=None, **kwargs):
    stats = stats or Stats()
    stats[FRAMEWORK] = XGBOOST_FRAMEWORK_NAME
    stats[ENGINE] = XGBOOST_FRAMEWORK_NAME
    import xgboost as xgb  # pylint: disable=g-import-not-at-top
    try:
      inputs_dmatrix = xgb.DMatrix(inputs)
    except Exception as e:
      logging.exception("Could not initialize DMatrix from inputs: ")
      raise PredictionError(
          PredictionError.FAILED_TO_RUN_MODEL,
          "Could not initialize DMatrix from inputs: " + str(e))
    try:
      return self._booster.predict(inputs_dmatrix, **kwargs)
    except Exception as e:
      logging.exception("Exception during predicting with xgboost model: ")
      raise PredictionError(PredictionError.FAILED_TO_RUN_MODEL,
                            "Exception during xgboost prediction: " + str(e))


class SklearnModel(BaseModel):
  """The implementation of Scikit-learn Model.
  """

  def __init__(self, client):
    super(SklearnModel, self).__init__(client)
    self._user_processor = _new_processor_class()
    if self._user_processor and hasattr(self._user_processor, PREPROCESS_KEY):
      self._preprocess = self._user_processor.preprocess
    else:
      self._preprocess = self._null_processor
    if self._user_processor and hasattr(self._user_processor, POSTPROCESS_KEY):
      self._postprocess = self._user_processor.postprocess
    else:
      self._postprocess = self._null_processor

  def predict(self, instances, stats=None, **kwargs):
    """Override the predict method to remove TF-specific args from kwargs."""
    kwargs.pop(SIGNATURE_KEY, None)
    return super(SklearnModel, self).predict(instances, stats, **kwargs)

  def preprocess(self, instances, stats=None, **kwargs):
    return self._preprocess(np.array(instances), **kwargs)

  def postprocess(self, predicted_outputs, original_input=None, stats=None,
                  **kwargs):
    post_processed = self._postprocess(predicted_outputs, **kwargs)
    if isinstance(post_processed, np.ndarray):
      return post_processed.tolist()
    if isinstance(post_processed, list):
      return post_processed
    raise PredictionError(
        PredictionError.INVALID_OUTPUTS,
        "Bad output type returned after running %s"
        "The post-processing function should return either "
        "a numpy ndarray or a list."
        % self._postprocess.__name__)

  def _null_processor(self, instances, **unused_kwargs):
    return instances


class XGBoostModel(SklearnModel):
  """The implementation of XGboost Model.
  """

  def __init__(self, client):
    super(XGBoostModel, self).__init__(client)


def create_sklearn_client(model_path, unused_tags):
  """Returns a prediction client for the corresponding sklearn model."""
  logging.info("Loading the scikit-learn model file from %s", model_path)
  sklearn_predictor = _load_joblib_or_pickle_model(model_path)
  if not sklearn_predictor:
    error_msg = "Could not find either {} or {} in {}".format(
        MODEL_FILE_NAME_JOBLIB, MODEL_FILE_NAME_PICKLE, model_path)
    logging.critical(error_msg)
    raise PredictionError(PredictionError.FAILED_TO_LOAD_MODEL, error_msg)

  return SklearnClient(sklearn_predictor)


def create_sklearn_model(model_path, unused_flags):
  """Returns a sklearn model from the given model_path."""
  return SklearnModel(create_sklearn_client(model_path, None))


def create_xgboost_client(model_path, unused_tags):
  """Returns a prediction client for the corresponding xgboost model."""
  logging.info("Loading the xgboost model from %s", model_path)
  import xgboost as xgb  # pylint: disable=g-import-not-at-top
  try:
    booster = _load_joblib_or_pickle_model(model_path) or xgb.Booster(
        model_file=os.path.join(model_path, MODEL_FILE_NAME_BST))
  except xgb.core.XGBoostError as e:
    error_msg = "Could not load the model: {}. {}.".format(
        os.path.join(model_path, MODEL_FILE_NAME_BST), str(e))
    logging.critical(error_msg)
    raise PredictionError(PredictionError.FAILED_TO_LOAD_MODEL, error_msg)
  return XgboostClient(booster)


def create_xgboost_model(model_path, unused_flags):
  """Returns a xgboost model from the given model_path."""
  return XGBoostModel(create_xgboost_client(model_path, None))


def create_tf_session_client(model_dir, tags):
  return SessionClient(*load_model(model_dir, tags))

_PICKLE_MODULE_WHITELIST = [
    "sklearn", "copy_reg", "xgboost", "numpy", "scipy", "pandas"
]
_PICKLE_CLASS_WHITELIST = {
    "__builtin__": (__builtin__, [
        "basestring",
        "bool",
        "buffer",
        "bytearray",
        "bytes",
        "complex",
        "dict",
        "enumerate",
        "float",
        "frozenset",
        "int",
        "list",
        "long",
        "reversed",
        "set",
        "slice",
        "str",
        "tuple",
        "unicode",
        "xrange",
        "object",
    ],),
}


class _RestrictedUnpickler(pickle.Unpickler):
  """Restricted Unpickler implementation.

  Prevents execution of code from pickled data by allowing only importing
  whitelisted modules.
  """

  def find_class(self, module_name, name):
    if module_name.split(".")[0] in _PICKLE_MODULE_WHITELIST:
      module = importlib.import_module(module_name)
      return getattr(module, name)

    (module, safe_names) = _PICKLE_CLASS_WHITELIST.get(module_name, (None, []))
    if name in safe_names:
      return getattr(module, name)
    # Forbid everything else.
    raise pickle.UnpicklingError("Importing global module: %s.%s is forbidden" %
                                 (module_name, name))

  @classmethod
  def load_string(class_, pickle_string):
    return class_(StringIO.StringIO(pickle_string)).load()


def _load_joblib_or_pickle_model(model_path):
  """Loads either a .joblib or .pkl file.

  Loads one of MODEL_FILE_NAME_JOBLIB or MODEL_FILE_NAME_PICKLE files if they
  exist.

  Arguments:
    model_path: The path to the directory that contains the model file.

  Raises:
    PredictionError: If there is a problem while loading the file.

  Returns:
    A loaded scikit-learn predictor object or None if neither
    MODEL_FILE_NAME_JOBLIB nor MODEL_FILE_NAME_PICKLE files are found.
  """
  try:
    # If we put this at the top, we need to add a dependency to sklearn
    # anywhere that prediction_lib is called.
    from sklearn.externals import joblib  # pylint: disable=g-import-not-at-top
  except Exception as e:
    error_msg = "Could not import sklearn module."
    logging.critical(error_msg)
    raise PredictionError(PredictionError.FAILED_TO_LOAD_MODEL, error_msg)
  try:
    if os.path.exists(os.path.join(model_path, MODEL_FILE_NAME_JOBLIB)):
      model_file_name = os.path.join(model_path, MODEL_FILE_NAME_JOBLIB)
      logging.info("Loading model %s using joblib.", model_file_name)
      return joblib.load(os.path.join(model_path, MODEL_FILE_NAME_JOBLIB))

    elif os.path.exists(os.path.join(model_path, MODEL_FILE_NAME_PICKLE)):
      model_file_name = os.path.join(model_path, MODEL_FILE_NAME_PICKLE)
      logging.info("Loading model %s using pickle.", model_file_name)
      with open(os.path.join(model_path, MODEL_FILE_NAME_PICKLE), "rb") as f:
        return _RestrictedUnpickler.load_string(f.read())
  except Exception as e:
    error_msg = "Could not load the model: {}. {}.".format(
        model_file_name, str(e))
    logging.critical(error_msg)
    raise PredictionError(PredictionError.FAILED_TO_LOAD_MODEL, error_msg)
  return None


_FRAMEWORK_TO_MODEL_MAP = {
    TENSORFLOW_FRAMEWORK_NAME: (TensorFlowModel, create_tf_session_client),
    SCIKIT_LEARN_FRAMEWORK_NAME: (SklearnModel, create_sklearn_client),
    XGBOOST_FRAMEWORK_NAME: (XGBoostModel, create_xgboost_client)
}


def create_model(client,
                 model_path,
                 framework=TENSORFLOW_FRAMEWORK_NAME,
                 **unused_kwargs):
  """Creates and returns the appropriate model.

  Creates and returns a Model if no user specified model is
  provided. Otherwise, the user specified model is imported, created, and
  returned.

  Args:
    client: An instance of PredictionClient for performing prediction.
    model_path: The path to the exported model (e.g. session_bundle or
      SavedModel)
    framework: The framework used to train the model.

  Returns:
    An instance of the appropriate model class.
  """
  model_cls = _FRAMEWORK_TO_MODEL_MAP[framework][0]
  return (load_model_class(client, model_path) or
          model_cls(client))


def create_client(framework, model_path, tags):
  framework = framework or TENSORFLOW_FRAMEWORK_NAME
  create_client_fn = _FRAMEWORK_TO_MODEL_MAP[framework][1]
  return create_client_fn(model_path, tags)


def decode_base64(data):
  if isinstance(data, list):
    return [decode_base64(val) for val in data]
  elif isinstance(data, dict):
    if data.viewkeys() == {"b64"}:
      return base64.b64decode(data["b64"])
    else:
      return {k: decode_base64(v) for k, v in data.iteritems()}
  else:
    return data


def encode_base64(instances, outputs_map):
  """Encodes binary data in a JSON-friendly way."""
  if not isinstance(instances, list):
    raise ValueError("only lists allowed in output; got %s" %
                     (type(instances),))

  if not instances:
    return instances
  first_value = instances[0]
  if not isinstance(first_value, dict):
    if len(outputs_map) != 1:
      return ValueError("The first instance was a string, but there are "
                        "more than one output tensor, so dict expected.")
    # Only string tensors whose name ends in _bytes needs encoding.
    tensor_name, tensor_info = outputs_map.items()[0]
    tensor_type = tensor_info.dtype
    if tensor_type == dtypes.string and tensor_name.endswith("_bytes"):
      instances = _encode_str_tensor(instances)
    return instances

  encoded_data = []
  for instance in instances:
    encoded_instance = {}
    for tensor_name, tensor_info in outputs_map.iteritems():
      tensor_type = tensor_info.dtype
      tensor_data = instance[tensor_name]
      if tensor_type == dtypes.string and tensor_name.endswith("_bytes"):
        tensor_data = _encode_str_tensor(tensor_data)
      encoded_instance[tensor_name] = tensor_data
    encoded_data.append(encoded_instance)
  return encoded_data


def _encode_str_tensor(data):
  if isinstance(data, list):
    return [_encode_str_tensor(val) for val in data]
  return {"b64": base64.b64encode(data)}


def local_predict(
    model_dir=None,
    tags=(tag_constants.SERVING,),
    signature_name=None,
    instances=None,
    framework=TENSORFLOW_FRAMEWORK_NAME):
  """Run a prediction locally."""
  instances = decode_base64(instances)
  client = create_client(framework, model_dir, tags)
  model = create_model(client, model_dir, framework)
  _, predictions = model.predict(instances, signature_name=signature_name)
  return {"predictions": list(predictions)}
