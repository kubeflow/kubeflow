"""Test jupyter custom resource.

This file tests that we can create notebooks using the Jupyter custom resource.

It is an integration test as it depends on having access to
a Kubeflow cluster with the custom resource test installed.

We use the pytest framework because
  1. It can output results in junit format for prow/gubernator
  2. It has good support for configuring tests using command line arguments
    (https://docs.pytest.org/en/latest/example/simple.html)
Python Path Requirements:
  kubeflow/testing/py - https://github.com/kubeflow/testing/tree/master/py
    * Provides utilities for testing

Manually running the test
  1. Configure your KUBECONFIG file to point to the desired cluster
"""

import logging
import os
import subprocess
import re
import requests
from retrying import retry
import six

import pytest

from kubernetes.config import kube_config
from kubernetes import client as k8s_client
from kubeflow.testing import ks_util
from kubeflow.testing import util

GROUP = "kubeflow.org"
PLURAL = "notebooks"
KIND = "Notebook"
VERSION = "v1alpha1"

logging.basicConfig(
    level=logging.INFO,
    format=('%(levelname)s|%(asctime)s'
            '|%(pathname)s|%(lineno)d| %(message)s'),
    datefmt='%Y-%m-%dT%H:%M:%S',
)
logging.getLogger().setLevel(logging.INFO)


def is_retryable_result(r):
  if r.status_code in [requests.codes.NOT_FOUND, requests.codes.UNAVAILABLE]:
    message = "Request to {0} returned {1}".format(r.url, r.status_code)
    logging.error(message)
    return True

  return False


@retry(
    wait_exponential_multiplier=1000,
    wait_exponential_max=10000,
    stop_max_delay=5 * 60 * 1000,
    retry_on_result=is_retryable_result)
def send_request(*args, **kwargs):
  """Send a request to the Jupyter server.

  Sends a request to verify we can fetch the main page for the Jupyter
  notebook.
  """
  # We don't use util.run because that ends up including the access token
  # in the logs
  token = subprocess.check_output(["gcloud", "auth", "print-access-token"])
  if six.PY3 and hasattr(token, "decode"):
    token = token.decode()
  token = token.strip()

  headers = {
      "Authorization": "Bearer " + token,
  }

  if "headers" not in kwargs:
    kwargs["headers"] = {}

  kwargs["headers"].update(headers)

  r = requests.get(*args, **kwargs)

  # TODO(https://github.com/kubeflow/testing/issues/288): Use selenium
  # to create a proper test. Jupyter returns a 404 because the page is
  # using javascript. If we use selenium we can properly fetch the page.
  pattern = re.compile(".*Jupyter Notebook.*")

  content = r.content
  if six.PY3 and hasattr(content, "decode"):
    content = content.decode()
  if r.status_code == requests.codes.NOT_FOUND and pattern.findall(content):
    r.status_code = 200
  return r


def test_jupyter(env, namespace):
  app_credentials = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
  if app_credentials:
    logging.info("Activate service account")
    util.run([
        "gcloud", "auth", "activate-service-account",
        "--key-file=" + app_credentials
    ])

  # util.load_kube_config appears to hang on python3
  kube_config.load_kube_config()
  api_client = k8s_client.ApiClient()
  host = api_client.configuration.host
  logging.info("Kubernetes master: %s", host)
  master = host.rsplit("/", 1)[-1]

  this_dir = os.path.dirname(__file__)
  app_dir = os.path.join(this_dir, "test_app")

  ks_cmd = ks_util.get_ksonnet_cmd(app_dir)

  name = "jupyter-test"
  service = "jupyter-test"
  component = "jupyter"
  params = ""
  ks_util.setup_ks_app(app_dir, env, namespace, component, params)

  util.run([ks_cmd, "apply", env, "-c", component], cwd=app_dir)
  conditions = ["Running"]
  results = util.wait_for_cr_condition(api_client, GROUP, PLURAL, VERSION,
                                       namespace, name, conditions)

  logging.info("Result of CRD:\n%s", results)

  # We proxy the request through the APIServer so that we can connect
  # from outside the cluster.
  url = ("https://{master}/api/v1/namespaces/{namespace}/services/{service}:80"
         "/proxy/default/jupyter/lab?").format(
             master=master, namespace=namespace, service=service)
  logging.info("Request: %s", url)
  r = send_request(url, verify=False)

  if r.status_code != requests.codes.OK:
    msg = "Request to {0} exited with status code: {1} and content: {2}".format(
        url, r.status_code, r.content)
    logging.error(msg)
    raise RuntimeError(msg)


if __name__ == "__main__":
  logging.basicConfig(
      level=logging.INFO,
      format=('%(levelname)s|%(asctime)s'
              '|%(pathname)s|%(lineno)d| %(message)s'),
      datefmt='%Y-%m-%dT%H:%M:%S',
  )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
