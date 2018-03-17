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
import glob

import argparse

from kubeflow.testing import test_util
from kubeflow.testing import util

def run(test_files_dirs, t):
  for test_files_dir in test_files_dirs:
    for test_file in glob.glob(test_files_dir + '/*.jsonnet'):
      filename=os.path.basename(test_file)
      logging.info("Running test: %s", filename)
      try:
        util.run(['jsonnet', 'eval', filename],cwd=test_files_dir)
      except Exception as e:
        t.failure = '{} test failed'.format(filename)
        logging.error('%s test failed. See Subprocess output for details.', filename)
        raise


def main():  # pylint: disable=too-many-locals
  logging.getLogger().setLevel(logging.INFO) # pylint: disable=too-many-locals
  # create the top-level parser
  parser = argparse.ArgumentParser(
    description="jsonnet tests.")

  parser.add_argument(
    "--test_files_dirs",
    default="",
    type=str,
    help="Comma separated directories where test jsonnet test files are stored")
  parser.add_argument(
    "--artifacts_dir",
    default="",
    type=str,
    help="Directory to use for artifacts that should be preserved after "
         "the test runs. Defaults to test_dir if not set.")

  args = parser.parse_args()

  if not args.test_files_dirs:
    raise ValueError('--test_files_dirs needs to be set')

  t = test_util.TestCase()
  t.class_name = "Kubeflow"
  t.name = "test-jsonnet"

  test_files_dirs = args.test_files_dirs.split(',')
  start = time.time()

  try:
    run(test_files_dirs, t)
  finally:
    t.time = time.time() - start
    junit_path = os.path.join(
        args.artifacts_dir, "junit_kubeflow-test-jsonnet.xml")
    logging.info("Writing test results to %s", junit_path)
    test_util.create_junit_xml_file([t], junit_path)


if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  main()
