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

"""Test if jsonnet files are formatted or not

This test runs the autoformat_jsonnet.sh script
and checks if the any of the files changed

Example invocation

python -m testing.test_jsonnet_format --src_dir=/git/kubeflow

"""

from __future__ import print_function

import logging
import os
import sys
import time
import glob

import argparse

from kubeflow.testing import test_util
from kubeflow.testing import util

def run(src_dir, t):
  #util.run([os.path.join(src_dir, 'scripts', 'autoformat_jsonnet.sh')], cwd=src_dir)
  util.run(['bash', os.path.join(src_dir, 'scripts', 'autoformat_jsonnet.sh')], cwd=src_dir)
  logging.info('done with date')
  git_status_short = util.run_and_output(['git', 'status', '--short'], cwd=src_dir)
  if git_status_short:
    t.failure = 'jsonnet files are not formatted. Run ./scripts/autoformat_jsonnet.sh'
    logging.error('jsonnet files are not formatted. Run ./scripts/autoformat_jsonnet.sh')
    sys.exit(1)
  logging.info('All jsonnet files are correctly formatted')

def main():  # pylint: disable=too-many-locals
  logging.getLogger().setLevel(logging.INFO) # pylint: disable=too-many-locals
  parser = argparse.ArgumentParser(
    description="jsonnet tests.")

  parser.add_argument(
    "--src_dir",
    default="",
    type=str,
    help="Source directory")
  parser.add_argument(
    "--artifacts_dir",
    default="",
    type=str,
    help="Directory to use for artifacts that should be preserved after "
         "the test runs. Defaults to test_dir if not set.")

  args = parser.parse_args()

  if not args.src_dir:
    raise ValueError('--src_dir needs to be set')

  test_log = os.path.join(args.artifacts_dir, "logs",
                          "test_jsonnet_format.log.txt")
  if not os.path.exists(os.path.dirname(test_log)):
    os.makedirs(os.path.dirname(test_log))

  root_logger = logging.getLogger()
  file_handler = logging.FileHandler(test_log)
  root_logger.addHandler(file_handler)
  # We need to explicitly set the formatter because it will not pick up
  # the BasicConfig.
  formatter = logging.Formatter(fmt=("%(levelname)s|%(asctime)s"
                                     "|%(pathname)s|%(lineno)d| %(message)s"),
                                datefmt="%Y-%m-%dT%H:%M:%S")
  file_handler.setFormatter(formatter)
  logging.info("Logging to %s", test_log)


  t = test_util.TestCase()
  t.class_name = "Kubeflow"
  t.name = "test-jsonnet-format"

  start = time.time()

  try:
    run(args.src_dir, t)
  finally:
    t.time = time.time() - start
    junit_path = os.path.join(
        args.artifacts_dir, "junit_kubeflow-test-jsonnet-format.xml")
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
