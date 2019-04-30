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
Launch a simple katib studyjob and verify that it runs.

TODO(ricliu): This code shares a lot in common with the e2etest for tf-operator.
Consider merging the common code into a CRD library. There are only some minor
differences - for example TFJob Status has a list of job conditions, whereas
Katib Studyjob status only shows the most recent condition.
"""

import argparse
import datetime
import logging
import multiprocessing
import os
import re
import subprocess
import time

from kubernetes import client as k8s_client
from kubeflow.testing import test_helper, util
from retrying import retry

NAMESPACE = "default"
STUDY_JOB_GROUP = "kubeflow.org"
STUDY_JOB_PLURAL = "studyjobs"
STUDY_JOB_KIND = "StudyJob"
TIMEOUT = 120


# TODO: TimeoutError is a built in exception in python3 so we can
# delete this when we go to Python3.
class TimeoutError(Exception):  # pylint: disable=redefined-builtin
  """An error indicating an operation timed out."""


class JobTimeoutError(TimeoutError):
  """An error indicating the job timed out.
    The job spec/status can be found in .job.
  """

  def __init__(self, message, job):
    super(JobTimeoutError, self).__init__(message)
    self.job = job


def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument(
      "--src_dir", default="", type=str, help="The kubeflow src directory")
  parser.add_argument(
      "--studyjob_version",
      default="v1alpha1",
      type=str,
      help="Which katib study job version to use")
  args, _ = parser.parse_known_args()
  return args


@retry(stop_max_attempt_number=3)
def create_app_and_job(args, namespace, name):
  try:
    util.run([
        "ks", "init", "katib-app", "--skip-default-registries",
        "--namespace=" + namespace
    ])
  except subprocess.CalledProcessError as e:
    # Keep going if the app already exists. This is a sign the a previous
    # attempt failed and we are retrying.
    if not re.search(".*already exists.*", e.output):
      raise

  os.chdir("katib-app")
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

  if args.studyjob_version == "v1alpha1":
    prototype_name = "katib-studyjob-test-v1alpha1"
  else:
    raise ValueError(
        "Unrecognized value for studyjob_version: %s" % args.studyjob_version)

  util.run(["ks", "generate", prototype_name, name])
  util.run(["ks", "apply", "default", "-c", "katib-studyjob-test"])


@retry(wait_fixed=10000, stop_max_attempt_number=20)
def log_status(study_job):
  """A callback to use with wait_for_job."""
  condition = study_job.get("status", {}).get("condition")
  logging.info("Job %s in namespace %s; uid=%s; condition=%s",
               study_job.get("metadata", {}).get("name"),
               study_job.get("metadata", {}).get("namespace"),
               study_job.get("metadata", {}).get("uid"), condition)


# This is a modification of
# https://github.com/kubeflow/tf-operator/blob/master/py/tf_job_client.py#L119.
# pylint: disable=too-many-arguments
def wait_for_condition(client,
                       namespace,
                       name,
                       expected_condition,
                       version="v1alpha1",
                       timeout=datetime.timedelta(minutes=10),
                       polling_interval=datetime.timedelta(seconds=30),
                       status_callback=None):
  """Waits until any of the specified conditions occur.
  Args:
    client: K8s api client.
    namespace: namespace for the job.
    name: Name of the job.
    expected_condition: A list of conditions. Function waits until any of the
      supplied conditions is reached.
    timeout: How long to wait for the job.
    polling_interval: How often to poll for the status of the job.
    status_callback: (Optional): Callable. If supplied this callable is
      invoked after we poll the job. Callable takes a single argument which is
      the job.
  """
  crd_api = k8s_client.CustomObjectsApi(client)
  end_time = datetime.datetime.now() + timeout
  while True:
    # By setting async_req=True ApiClient returns multiprocessing.pool.AsyncResult
    # If we don't set async_req=True then it could potentially block
    # forever.
    thread = crd_api.get_namespaced_custom_object(
        STUDY_JOB_GROUP,
        version,
        namespace,
        STUDY_JOB_PLURAL,
        name,
        async_req=True)

    # Try to get the result but timeout.
    results = None
    try:
      results = thread.get(TIMEOUT)
    except multiprocessing.TimeoutError:
      logging.error("Timeout trying to get StudyJob.")
    except Exception as e:
      logging.error(
          "There was a problem waiting for StudyJob %s.%s; Exception; %s", name,
          name, e)
      raise

    if results:
      if status_callback:
        status_callback(results)

      condition = results.get("status", {}).get("condition")
      if condition in expected_condition:
        return results

    if datetime.datetime.now() + polling_interval > end_time:
      raise JobTimeoutError(
          "Timeout waiting for job {0} in namespace {1} to enter one of the "
          "conditions {2}.".format(name, namespace, expected_condition),
          results)

    time.sleep(polling_interval.seconds)

  # Linter complains if we don't have a return statement even though
  # this code is unreachable.
  return None


def test_katib(test_case):  # pylint: disable=redefined-outer-name
  args = parse_args()
  namespace = NAMESPACE
  name = "katib-studyjob-test"

  util.load_kube_config()
  api_client = k8s_client.ApiClient()
  create_app_and_job(args, namespace, name)
  try:
    wait_for_condition(
        api_client, namespace, name, ["Running"], status_callback=log_status)
    logging.info("StudyJob launched successfully")
  except Exception as e:
    logging.error("Test failed waiting for job; %s", e)
    test_case.add_failure_info(e.message)


if __name__ == "__main__":
  test_case = test_helper.TestCase(name="test_katib", test_func=test_katib)
  test_suite = test_helper.init(name="test_katib", test_cases=[test_case])
  test_suite.run()
