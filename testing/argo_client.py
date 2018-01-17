"""Some utility functions for working with TfJobs."""

import datetime
import json
import logging
import time

from kubernetes import client as k8s_client
from kubernetes.client.rest import ApiException

from py import util

GROUP = "argoproj.io"
VERSION = "v1alpha1"
PLURAL = "workflows"
KIND = "Workflow"

def log_status(workflow):
  """A callback to use with wait_for_workflow."""
  logging.info("Workflow %s in namespace %s; phase=%s",
           workflow["metadata"]["name"],
           workflow["metadata"]["namespace"],
           workflow["status"]["phase"])

def wait_for_workflow(client, namespace, name,
                      timeout=datetime.timedelta(minutes=5),
                      polling_interval=datetime.timedelta(seconds=30),
                      status_callback=None):
  """Wait for the specified workflow to finish.

  Args:
    client: K8s api client.
    namespace: namespace for the workflow.
    name: Name of the workflow.
    timeout: How long to wait for the workflow.
    polling_interval: How often to poll for the status of the workflow.
    status_callback: (Optional): Callable. If supplied this callable is
      invoked after we poll the job. Callable takes a single argument which
      is the job.

  Raises:
    TimeoutError: If timeout waiting for the job to finish.
  """
  crd_api = k8s_client.CustomObjectsApi(client)
  end_time = datetime.datetime.now() + timeout
  while True:
    results = crd_api.get_namespaced_custom_object(
        GROUP, VERSION, namespace, PLURAL, name)

    if status_callback:
      status_callback(results)

    if results["status"]["phase"] in ["Failed", "Succeeded"]:
      return results

    if datetime.datetime.now() + polling_interval > end_time:
      raise util.TimeoutError(
        "Timeout waiting for workflow {0} in namespace {1} to finish.".format(
          name, namespace))

    time.sleep(polling_interval.seconds)
