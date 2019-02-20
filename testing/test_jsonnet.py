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
"""Run jsonnet tests

This test goes through all jsonnet files specified by the test_files_dirs
directory and runs jsonnet eval <filename> and reports the results

Example invocation

python -m testing.test_jsonnet --test_files_dirs=/kubeflow/application/tests,/kubeflow/common/tests,/kubeflow/jupyter/tests,/kubeflow/iap/tests,/kubeflow/gcp/tests,/kubeflow/tensorboard/tests,/kubeflow/examples/tests,/kubeflow/metacontroller/tests,/kubeflow/profiles/tests,/kubeflow/tf-training/tests,/kubeflow/kubebench/tests --artifacts_dir=/tmp/artifacts  # noqa: E501

TODO(jlewi): Should we use pytest to create a parameterized test with respect
to directory? See https://docs.pytest.org/en/latest/example/parametrize.html
"""

from __future__ import print_function

import logging
import json
import os

import argparse

from kubeflow.testing import test_helper, util


# We should test all files which end in .jsonnet or .libsonnet
# except ksonnet prototype definitions - they require additional
# dependencies
def should_test(file_path):
  _, ext = os.path.splitext(file_path)
  if ext not in ('.jsonnet', '.libsonnet'):
    return False
  parts = file_path.split('/')
  if len(parts) < 2:
    raise ValueError('Invalid file : {}'.format(file_path))
  return parts[-2] != 'prototypes'


def is_excluded(file_name, exclude_dirs):
  for exclude_dir in exclude_dirs:
    if file_name.startswith(exclude_dir):
      return True
  return False


def run(test_files_dirs, jsonnet_path_args, exclude_dirs, test_case):
  # Go through each jsonnet file in test_files_dirs and run jsonnet eval
  for test_files_dir in test_files_dirs:
    for root, _, files in os.walk(test_files_dir):
      if is_excluded(root, exclude_dirs):
        logging.info("Skipping %s", root)
        continue

      for test_file in files:
        full_path = os.path.join(root, test_file)
        if should_test(full_path):
          logging.info("Testing: %s", test_file)
          try:
            output = util.run(
                ['jsonnet', 'eval', full_path] + jsonnet_path_args,
                cwd=os.path.dirname(full_path))
            try:
              parsed = json.loads(output)
            except AttributeError:
              logging.error(
                  "Output of jsonnet eval could not be parsed as json; "
                  "output: %s", output)
              parsed = {}

            if not hasattr(parsed, "get"):
              # Legacy style tests emit true rather than a json object.
              # Parsing the string as json converts it to a bool so we
              # just use parsed as test_passed
              # Old style tests actually use std.assert so jsonnet eval
              # will actually return an error in the case the test didn't
              # pass.
              logging.warn(
                  "jsonnet test is using old style and not emitting an object. "
                  "Result was: %s. Output will be treated as a boolean", output)
              test_passed = parsed
            else:
              test_passed = parsed.get("pass", False)

            if not test_passed:
              test_case.add_failure_info('{} test failed'.format(test_file))
              logging.error(
                  '%s test failed. See Subprocess output for details.',
                  test_file)
          except Exception as e:
            test_case.add_failure_info('{} test failed'.format(test_file))
            logging.error(
                '%s test failed with exception %s. '
                'See Subprocess output for details.', e, test_file)


def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument(
      "--test_files_dirs",
      default="",
      type=str,
      help="Comma separated directories where test jsonnet test files are "
      "stored")
  parser.add_argument(
      "--jsonnet_path_dirs",
      default="",
      type=str,
      help="Comma separated directories used by jsonnet to find additional "
      "libraries")

  parser.add_argument(
      "--exclude_dirs",
      default="",
      type=str,
      help="Comma separated directories which should be excluded from the test")

  args, _ = parser.parse_known_args()
  return args


def test_jsonnet(test_case):  # pylint: disable=redefined-outer-name
  args = parse_args()

  if not args.test_files_dirs:
    raise ValueError('--test_files_dirs needs to be set')

  test_files_dirs = args.test_files_dirs.split(',')

  jsonnet_path_args = []
  if len(args.jsonnet_path_dirs) > 0:
    for jsonnet_path_dir in args.jsonnet_path_dirs.split(','):
      jsonnet_path_args.append('--jpath')
      jsonnet_path_args.append(jsonnet_path_dir)

  exclude_dirs = []
  if args.exclude_dirs:
    exclude_dirs = args.exclude_dirs.split(',')

  run(test_files_dirs, jsonnet_path_args, exclude_dirs, test_case)


if __name__ == "__main__":
  test_case = test_helper.TestCase(name='test_jsonnet', test_func=test_jsonnet)
  test_suite = test_helper.init(
      name='jsonnet_test_suite', test_cases=[test_case])
  test_suite.run()
