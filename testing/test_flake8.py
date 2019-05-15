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
"""Run flake8 tests

This test goes through all Python files in the specified test_files_dirs
directories and runs flake8 <filename> and reports the results

Example invocation

python -m testing.test_flake8 --test_files_dirs=/kubeflow/application/tests,/kubeflow/common/tests,/kubeflow/jupyter/tests,/kubeflow/iap/tests,/kubeflow/gcp/tests,/kubeflow/tensorboard/tests,/kubeflow/examples/tests,/kubeflow/metacontroller/tests,/kubeflow/profiles/tests,/kubeflow/tf-training/tests  # noqa: E501

"""

from __future__ import print_function

import argparse
import json
import logging
import os

from kubeflow.testing import test_helper, util

FLAKE8_OPTS = """--count --select=E901,E999,F821,F822,F823 --show-source
                 --statistics""".split()

# Test only files which end in '.py' or have no suffix


def should_test(file_path):
  _, ext = os.path.splitext(file_path.lower())
  return ext in ('.py', '')


def run(test_files_dirs, test_case):
  # Go through each Python file in test_files_dirs and run flake8
  for test_files_dir in test_files_dirs:
    for root, _, files in os.walk(test_files_dir):
      for test_file in files:
        full_path = os.path.join(root, test_file)
        assert root == os.path.dirname(full_path)
        if should_test(full_path):
          logging.info("Testing: %s", test_file)
          try:
            output = util.run(['flake8', full_path] + FLAKE8_OPTS, cwd=root)
            try:
              parsed = json.loads(output)
            except AttributeError:
              logging.error(
                  "Output of flake8 could not be parsed as json; "
                  "output: %s", output)
              parsed = {}

            if not hasattr(parsed, "get"):
              # Legacy style tests emit true rather than a json object.
              # Parsing the string as json converts it to a bool so we
              # just use parsed as test_passed
              # Old style tests actually use std.assert so flake8 will
              # actually return an error in the case the test did
              # not pass.
              logging.warn(
                  "flake8 is using old style and not emitting an object. "
                  "Result was: %s. Output will be treated as a boolean", output)
              test_passed = parsed
            else:
              test_passed = parsed.get("pass", False)

            if not test_passed:
              msg = '{} test failed'.format(test_file)
              test_case.add_failure_info(msg)
              logging.error(
                  '{}. See Subprocess output for details.'.format(msg))
          except Exception as e:
            msg = '{} test failed'.format(test_file)
            test_case.add_failure_info(msg)
            logging.error('{} with exception {}. See Subprocess output for '
                          'details.'.format(msg, e))


def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument(
      "--test_files_dirs",
      default=".",
      type=str,
      help="Comma separated directories containing Python files")
  args, _ = parser.parse_known_args()
  return args


def test_flake8(test_case):  # pylint: disable=redefined-outer-name
  args = parse_args()
  if not args.test_files_dirs:
    raise ValueError('--test_files_dirs needs to be set')
  run(args.test_files_dirs.split(','), test_case)


if __name__ == "__main__":
  test_case = test_helper.TestCase(name='test_flake8', test_func=test_flake8)
  test_suite = test_helper.init(
      name='flake8_test_suite', test_cases=[test_case])
  test_suite.run()
