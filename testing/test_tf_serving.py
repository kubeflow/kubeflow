#!/usr/bin/env python

# Copyright 2018 The Kubeflow Authors All rights reserved.
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

from __future__ import print_function

import logging

import argparse
from grpc.beta import implementations
import tensorflow as tf
from tensorflow_serving.apis import predict_pb2
from tensorflow_serving.apis import prediction_service_pb2

from kubeflow.testing import test_util


def main():
  parser = argparse.ArgumentParser('Label an image using Inception')
  parser.add_argument(
  	'-p',
    '--port',
    type=int,
    default=9000,
    help='Port at which Inception model is being served')
  parser.add_argument(
    "--namespace",
    required=True,
    type=str,
    help=("The namespace to use."))
  parser.add_argument(
    "--service_name",
    required=True,
    type=str,
    help=("The TF serving service to use."))
  parser.add_argument(
    "--artifacts_dir",
    default="",
    type=str,
    help="Directory to use for artifacts that should be preserved after "
         "the test runs. Defaults to test_dir if not set.")
  parser.add_argument(
    "--image_path",
    required=True,
    type=str,
    help=("The image to use."))
  parser.add_argument(
    "--result_path",
    type=str,
    help=("The expected result."))

  args = parser.parse_args()

  server = "{}.{}:{}".format(args.namespace, args.service_name, args.port)
  channel = implementations.insecure_channel(server)
  stub = prediction_service_pb2.beta_create_PredictionService_stub(channel)

  with tf.gfile.Open(image_path) as img:
    raw_image = (img.read())

  # Send request
  # See prediction_service.proto for gRPC request/response details.
  request = predict_pb2.PredictRequest()
  request.model_spec.name = 'inception'
  request.model_spec.signature_name = 'predict_images'
  request.inputs['images'].CopyFrom(
      tf.make_tensor_proto(raw_image, shape=[1,]))
  result = stub.Predict(request, 10.0)  # 10 secs timeout
  print(result)


if __name__ == '__main__':
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  main()
