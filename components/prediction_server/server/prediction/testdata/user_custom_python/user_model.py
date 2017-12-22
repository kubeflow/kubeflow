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
"""Dummy user provided python code for testing prediction_lib.create_model.

This file is used in testing the model creation process for user provided
python code. prediction_lib.create_model model factory method that loads and
creates both default models as well as user-provided models. This file defines
multiple dummy user-provided models for the purpose of testing create_model.
"""

import numpy as np
from sklearn.preprocessing import FunctionTransformer


class UserModel(object):
  """Sample good user model."""

  def __init__(self, client):
    self._client = client

  @classmethod
  def from_client(cls, client, model_path):
    del model_path
    return cls(client)

  def predict(self, instances, **kwargs):
    pass


class MissingFromClient(object):

  def __init__(self, client):
    self._client = client

  def predict(self, instances, **kwargs):
    pass


class MissingPredict(object):

  def __init__(self, client):
    self._client = client

  @classmethod
  def from_client(cls, client, model_path):
    del model_path
    return cls(client)


class UserModelOuter(object):

  class UserModelInner(object):
    """Sample nested user model."""

    def __init__(self, client):
      self._client = client

    @classmethod
    def from_client(cls, client, model_path):
      del model_path
      return cls(client)

    def predict(self, instances, **kwargs):
      pass


class PredictMethodTooManyArgs(object):
  """Bad user model with too many args in predict."""

  def __init__(self, client):
    self._client = client

  @classmethod
  def from_client(cls, client, model_path):
    del model_path
    return cls(client)

  def predict(self, instances, another, **kwargs):
    pass


class PredictMethodTooFewArgs(object):
  """Bad user model with too few args in predict."""

  def __init__(self, client):
    self._client = client

  @classmethod
  def from_client(cls, client, model_path):
    del model_path
    return cls(client)

  def predict(self):
    pass


class UserProcessor(object):
  """Sample good user processor."""

  def __init__(self):
    self._multiplier = 2

  @classmethod
  def from_model_path(cls, model_path):
    del model_path
    return cls()

  def preprocess(self, instances, **unused_kwargs):
    return [x*self._multiplier for x in instances]

  def postprocess(self, instances, **unused_kwargs):
    return [x/self._multiplier for x in instances]


class FunctionTransformerPreprocessor(object):
  """Processor that drops the first column, and returns log of features."""

  def _drop_first_feature(self, data):
    return data[:, 1:]

  def __init__(self):
    self._log_transformer = FunctionTransformer(np.log1p)
    self._drop_first_feature = FunctionTransformer(self._drop_first_feature)

  def preprocess(self, instances):
    return self._log_transformer.transform(
        self._drop_first_feature.transform(instances))


class InvalidProcessor(object):
  """Sample user model with an uncallable preprocess method."""

  preprocess = "foo"

  def postprocess(self, instances, **unused_kwargs):
    return [x*2 for x in instances]


class InvalidPostProcessor(object):
  """Sample user model with an invalid postprocess method."""

  def postprocess(self, instances, **unused_kwargs):
    """Returns a string instead of a list or an ndarray."""
    del instances
    return "foo"


class TfUserProcessor(object):
  """Sample good TF user processor."""

  @classmethod
  def from_model_path(cls, model_path):
    del model_path
    return cls()

  def preprocess(self, instances, **unused_kwargs):
    return [self._double_instance(instance) for instance in instances]

  def postprocess(self, instances, **unused_kwargs):
    return [self._halve_instance(instance) for instance in instances]

  def _double_instance(self, instance):
    return {key: value * 2 for key, value in instance.iteritems()}

  def _halve_instance(self, instance):
    return {key: value / 2 for key, value in instance.iteritems()}


class TfUserPreprocessor(object):
  """Sample TF user processor with preprocess only."""

  @classmethod
  def from_model_path(cls, model_path):
    del model_path
    return cls()

  def preprocess(self, instances, **unused_kwargs):
    return [self._double_instance(instance) for instance in instances]

  def _double_instance(self, instance):
    return {key: value * 2 for key, value in instance.iteritems()}


class TfUserPostprocessor(object):
  """Sample TF user processor with postprocess only."""

  @classmethod
  def from_model_path(cls, model_path):
    del model_path
    return cls()

  def postprocess(self, instances, **unused_kwargs):
    return [self._halve_instance(instance) for instance in instances]

  def _halve_instance(self, instance):
    return {key: value / 2 for key, value in instance.iteritems()}
