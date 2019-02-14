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

from __future__ import print_function

import argparse
import json
import logging
import numbers
import os
import time

from six.moves import xrange

from grpc.beta import implementations
from kubernetes import client as k8s_client
import requests
import tensorflow as tf
from tensorflow_serving.apis import predict_pb2
from tensorflow_serving.apis import prediction_service_pb2

from kubeflow.testing import test_util
from kubeflow.testing import util


def almost_equal(a, b, tol=0.001):
  """
  Compares two json objects (assuming same structure) with tolerance on numbers
  """
  if isinstance(a, dict):
    for key in a.keys():
      if not almost_equal(a[key], b[key]):
        return False
    return True
  elif isinstance(a, list):
    for i in xrange(len(a)):
      if not almost_equal(a[i], b[i]):
        return False
    return True
  elif isinstance(a, numbers.Number):
    return abs(a - b) < tol
  else:
    return a == b


def main():
  parser = argparse.ArgumentParser('Label an image using Inception')
  parser.add_argument(
      '-p',
      '--port',
      type=int,
      default=9000,
      help='Port at which Inception model is being served')
  parser.add_argument(
      "--namespace", required=True, type=str, help=("The namespace to use."))
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
      "--input_path", required=True, type=str, help=("The input file to use."))
  parser.add_argument("--result_path", type=str, help=("The expected result."))
  parser.add_argument(
      "--workflow_name",
      default="tfserving",
      type=str,
      help="The name of the workflow.")

  args = parser.parse_args()

  t = test_util.TestCase()
  t.class_name = "Kubeflow"
  t.name = args.workflow_name + "-" + args.service_name

  start = time.time()

  util.load_kube_config(persist_config=False)
  api_client = k8s_client.ApiClient()
  core_api = k8s_client.CoreV1Api(api_client)
  try:
    with open(args.input_path) as f:
      instances = json.loads(f.read())

    service = core_api.read_namespaced_service(args.service_name,
                                               args.namespace)
    service_ip = service.spec.cluster_ip
    model_urls = [
        "http://" + service_ip +
        ":8500/v1/models/mnist:predict",  # tf serving's http server
    ]
    for model_url in model_urls:
      logging.info("Try predicting with endpoint {}".format(model_url))
      num_try = 1
      result = None
      while True:
        try:
          result = requests.post(model_url, json=instances)
          assert (result.status_code == 200)
        except Exception as e:
          num_try += 1
          if num_try > 10:
            raise
          logging.info('prediction failed: {}. Retrying...'.format(e))
          time.sleep(5)
        else:
          break
      logging.info('Got result: {}'.format(result.text))
      if args.result_path:
        with open(args.result_path) as f:
          expected_result = json.loads(f.read())
          logging.info('Expected result: {}'.format(expected_result))
          assert (almost_equal(expected_result, json.loads(result.text)))
  except Exception as e:
    t.failure = "Test failed; " + e.message
    raise
  finally:
    t.time = time.time() - start
    junit_path = os.path.join(
        args.artifacts_dir,
        "junit_kubeflow-tf-serving-image-{}.xml".format(args.service_name))
    logging.info("Writing test results to %s", junit_path)
    test_util.create_junit_xml_file([t], junit_path)
    # Pause to collect Stackdriver logs.
    time.sleep(60)


if __name__ == '__main__':
  logging.basicConfig(
      level=logging.INFO,
      format=('%(levelname)s|%(asctime)s'
              '|%(pathname)s|%(lineno)d| %(message)s'),
      datefmt='%Y-%m-%dT%H:%M:%S',
  )
  logging.getLogger().setLevel(logging.INFO)
  main()
