#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
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
"""
Runs the Inception model being served on the kubeflow model server on an image
that you specify.

Note: This file is a modification of the inception client available on the
TensorFlow Serving GitHub repository:
  https://github.com/tensorflow/serving/blob/master/tensorflow_serving/example/inception_client.py  # noqa: E501
"""

from __future__ import print_function

# This is a placeholder for a Google-internal import.

import argparse
import tensorflow as tf
from grpc.beta import implementations
from tensorflow_serving.apis import predict_pb2
from tensorflow_serving.apis import prediction_service_pb2


def main(image_paths, server, port):
  channel = implementations.insecure_channel(server, port)
  stub = prediction_service_pb2.beta_create_PredictionService_stub(channel)

  raw_images = []
  for path in image_paths:
    with tf.gfile.Open(path) as img:
      raw_images.append(img.read())

  # Send request
  # See prediction_service.proto for gRPC request/response details.
  request = predict_pb2.PredictRequest()
  request.model_spec.name = 'inception'
  request.model_spec.signature_name = 'predict_images'
  request.inputs['images'].CopyFrom(
      tf.make_tensor_proto(raw_images, shape=[len(raw_images)]))
  result = stub.Predict(request, 10.0)  # 10 secs timeout
  print(result)


if __name__ == '__main__':
  parser = argparse.ArgumentParser('Label an image using Inception')
  parser.add_argument(
      '-s', '--server', help='URL of host serving the Inception model')
  parser.add_argument(
      '-p',
      '--port',
      type=int,
      default=9000,
      help='Port at which Inception model is being served')
  parser.add_argument(
      'images',
      nargs='+',
      help='Paths (local or GCS) to images you would like to label')

  args = parser.parse_args()

  main(args.images, args.server, args.port)
