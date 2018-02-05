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
"""Tests for py.google.cloud.ml.dataflow.batch_prediction_pipeline."""

import tensorflow as tf


def create_identity_model(
    model_dir,
    signature_name=(
        tf.saved_model.signature_constants.DEFAULT_SERVING_SIGNATURE_DEF_KEY),
    tags=(tf.saved_model.tag_constants.SERVING,)):
  """Create a model and saved it in SavedModel format."""
  g, signature_def_map = _identity_string_graph(signature_name)
  _write_graph(g, signature_def_map, list(tags), model_dir)


def _identity_string_graph(serving_signature):
  """create a testing graph."""
  with tf.Graph().as_default() as g:
    x = tf.placeholder(dtype=tf.string)
    x = tf.Print(x, [x])
    out = tf.identity(x)
    out = tf.Print(out, [out])
    inputs = {"in": x}
    outputs = {"out": out}

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

    signature_def_map = {serving_signature: signature_def}

  return g, signature_def_map


def create_constant_model(
    model_dir, serving_signature1, constant1, serving_signature2, constant2,
    tags=(tf.saved_model.tag_constants.SERVING,)):
  """Create a model and saved it in SavedModel format."""
  g, signature_def_map = _two_signature_constant_graph(
      serving_signature1, constant1, serving_signature2, constant2)
  _write_graph(g, signature_def_map, list(tags), model_dir)


def _two_signature_constant_graph(
    serving_signature1, constant1, serving_signature2, constant2):
  """create a testing graph."""
  with tf.Graph().as_default() as g:
    x = tf.placeholder(dtype=tf.string)
    x = tf.Print(x, [x])
    out1 = tf.constant(constant1)
    out1 = tf.Print(out1, [out1])
    out2 = tf.constant(constant2)
    out2 = tf.Print(out2, [out2])
    inputs = {"in": x}
    outputs1 = {"out": out1}
    outputs2 = {"out": out2}

    signature_inputs = {
        key: tf.saved_model.utils.build_tensor_info(tensor)
        for key, tensor in inputs.items()
    }
    signature_outputs1 = {
        key: tf.saved_model.utils.build_tensor_info(tensor)
        for key, tensor in outputs1.items()
    }
    signature_outputs2 = {
        key: tf.saved_model.utils.build_tensor_info(tensor)
        for key, tensor in outputs2.items()
    }

    signature_def1 = tf.saved_model.signature_def_utils.build_signature_def(
        signature_inputs, signature_outputs1,
        tf.saved_model.signature_constants.PREDICT_METHOD_NAME)
    signature_def2 = tf.saved_model.signature_def_utils.build_signature_def(
        signature_inputs, signature_outputs2,
        tf.saved_model.signature_constants.PREDICT_METHOD_NAME)

    signature_def_map = {serving_signature1: signature_def1,
                         serving_signature2: signature_def2}

  return g, signature_def_map


def _write_graph(graph, signature_def_map, tags, model_dir):
  """Write the model for given graph, signature, tags into model dir."""
  builder = tf.saved_model.builder.SavedModelBuilder(model_dir)
  tf.reset_default_graph()
  with tf.Session(graph=graph) as sess:
    tf.initialize_all_variables().run()
    builder.add_meta_graph_and_variables(
        sess,
        tags=tags,
        signature_def_map=signature_def_map)
    builder.save()
