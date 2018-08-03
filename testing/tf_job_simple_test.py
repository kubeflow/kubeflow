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

"""
Test tf_job_simple prototype. It creates a component from the tf_job_simple
prototype and applies it to the k8s cluster. It then verifies that two pods
and services with the appropriate label get created.
"""

import argparse
import logging
import os
import re
import subprocess
from kubeflow.testing import test_helper, util
from retrying import retry

NAMESPACE = "default"

def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument(
    "--src_dir",
    default="",
    type=str,
    help="The kubeflow src directory")
  parser.add_argument(
    "--tf_job_version",
    default="v1alpha1",
    type=str,
    help="Which TFJob version to use")
  args, _ = parser.parse_known_args()
  return args

@retry(wait_fixed=5000, stop_max_attempt_number=20)
def wait_for_tf_job():
  """Ensure pods enter running state."""
  # For debugging purposes list all pods and their labels.
  # This makes it easy to see if the problem is that we specified
  # the wrong label selector.
  util.run(["kubectl", "--namespace=" + NAMESPACE,
            "get", "pods", "-o",
            ("custom-columns=name:metadata.name,"
             "labels:.metadata.labels,status:status.phase")])
  out = util.run(["kubectl", "get", "pods", "-l",
                  "tf_job_name=mycnnjob", "-n" + NAMESPACE])
  if "No resources found" in out \
       or out.count('Running') != 2:
    raise Exception("Could not find pods with label tf_job_name=mycnnjob")
  logging.info("Found pods with label tf_job_name=mycnnjob")
  out = util.run(["kubectl", "get", "services", "-l",
                  "tf_job_name=mycnnjob", "-ndefault"])
  if "No resources found" in out \
       or len(out.split("\n")) != 3:
    raise Exception("Could not find services with label tf_job_name=mycnnjob")
  logging.info("Found services with label tf_job_name=mycnnjob")

@retry(stop_max_attempt_number=3)
def test_tf_job_simple(test_case): # pylint: disable=redefined-outer-name
  args = parse_args()
  try:
    util.run(["ks", "init", "tf-job-simple-app", "--skip-default-registries"])
  except subprocess.CalledProcessError as e:
    # Keep going if the app already exists. This is a sign the a previous
    # attempt failed and we are retrying.
    if not re.search(".*already exists.*", e.output):
      raise

  os.chdir("tf-job-simple-app")
  try:
    util.run(["ks", "registry", "add", "kubeflow", args.src_dir + "/kubeflow"])
  except subprocess.CalledProcessError as e:
    # Keep going if the registry has already been added.
    # This is a sign the a previous attempt failed and we are retrying.
    if not re.search(".*already exists.*", e.output):
      raise

  try:
    util.run(["ks", "pkg", "install", "kubeflow/examples"])
  except subprocess.CalledProcessError as e:
    # Keep going if the package has already been added.
    # This is a sign the a previous attempt failed and we are retrying.
    if not re.search(".*already exists.*", e.output):
      raise

  if args.tf_job_version == "v1alpha2":
    prototype_name = "tf-job-simple"
  elif args.tf_job_version == "v1alpha1":
    prototype_name = "tf-job-simple-v1alpha1"
  else:
    raise ValueError("Unrecognized value for tf_job_version: %s" %
                     args.tf_job_version)

  util.run(["ks", "generate", prototype_name, "tf-job-simple"])
  util.run(["ks", "apply", "default", "-c", "tf-job-simple"])
  try:
    wait_for_tf_job()
    logging.info("TFJob launched successfully")
  except Exception as e:
    test_case.add_failure_info(e.message)


if __name__ == "__main__":
  test_case = test_helper.TestCase(
    name="test_tf_job_simple", test_func=test_tf_job_simple)
  test_suite = test_helper.init(
    name="", test_cases=[test_case])
  test_suite.run()
