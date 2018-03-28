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
import os
import time
import urllib2
import base64
import json

import argparse
from kubernetes import client as k8s_client

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

  t = test_util.TestCase()
  t.class_name = "Kubeflow"
  t.name = "tf-serving-image-" + args.service_name

  start = time.time()
  try:
    server = "{}.{}.svc.cluster.local".format(args.service_name, args.namespace)
    with open(args.image_path, 'rb') as img:
      data ={'image': {'b64': base64.b64encode(img.read())}}

    base_url = '%s:%s'%(server, args.port)
    model_path = 'model/%s'%args.service_name
    req = urllib2.Request('/'.join([base_url, model_path])+':predict')

    # Send request
    # See prediction_service.proto for gRPC request/response details.

    num_try = 1
    result = None
    while True:
      try:
        result = urllib2.urlopen(req, json.dumps(data), 10) # 10 secs timeout
        result = result.read()  
      except Exception as e:
        num_try += 1
        if num_try > 10:
          raise
        logging.info('prediction failed: {}. Retrying...'.format(e))
        time.sleep(5)
      else:
        break
    logging.info('Got result: {}'.format(result))
    if args.result_path:
      with open(args.result_path) as f:
        expected_result = f.read()
        logging.info('Expected result: {}'.format(expected_result))
        assert(expected_result == result)
  except Exception as e:
    t.failure = "Test failed; " + e.message
    raise
  finally:
    t.time = time.time() - start
    junit_path = os.path.join(
        args.artifacts_dir, "junit_kubeflow-tf-serving-image-{}.xml".format(args.service_name))
    logging.info("Writing test results to %s", junit_path)
    test_util.create_junit_xml_file([t], junit_path)
    # Pause to collect Stackdriver logs.
    time.sleep(60)

if __name__ == '__main__':
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  main()
