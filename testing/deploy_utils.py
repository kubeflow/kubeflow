# -*- coding: utf-8 -*-
import argparse
import datetime
import json
import logging
import os
import shutil
import ssl
import tempfile
import time
import uuid

import requests
import yaml
from googleapiclient import discovery, errors
from kubernetes import client as k8s_client
from kubernetes.client import rest
from kubernetes.config import kube_config
from oauth2client.client import GoogleCredentials

from kubeflow.testing import test_util, util  # pylint: disable=no-name-in-module  # noqa: E501
from testing import vm_util


def get_gcp_identity():
  identity = util.run(["gcloud", "config", "get-value", "account"])
  logging.info("Current GCP account: %s", identity)
  return identity


def create_k8s_client():
  # We need to load the kube config so that we can have credentials to
  # talk to the APIServer.
  util.load_kube_config(persist_config=False)

  # Create an API client object to talk to the K8s master.
  api_client = k8s_client.ApiClient()

  return api_client


def _setup_test(api_client, run_label):
  """Create the namespace for the test.

  Returns:
    test_dir: The local test directory.
  """

  api = k8s_client.CoreV1Api(api_client)
  namespace = k8s_client.V1Namespace()
  namespace.api_version = "v1"
  namespace.kind = "Namespace"
  namespace.metadata = k8s_client.V1ObjectMeta(
      name=run_label, labels={
          "app": "kubeflow-e2e-test",
      })

  try:
    logging.info("Creating namespace %s", namespace.metadata.name)
    namespace = api.create_namespace(namespace)
    logging.info("Namespace %s created.", namespace.metadata.name)
  except rest.ApiException as e:
    if e.status == 409:
      logging.info("Namespace %s already exists.", namespace.metadata.name)
    else:
      raise

  return namespace


def setup_kubeflow_ks_app(dir, namespace, github_token, api_client):
  """Create a ksonnet app for Kubeflow"""
  util.makedirs(dir)

  logging.info("Using test directory: %s", dir)

  namespace_name = namespace

  namespace = _setup_test(api_client, namespace_name)
  logging.info("Using namespace: %s", namespace)
  if github_token:
    logging.info("Setting GITHUB_TOKEN to %s.", github_token)
    # Set a GITHUB_TOKEN so that we don't rate limited by GitHub;
    # see: https://github.com/ksonnet/ksonnet/issues/233
    os.environ["GITHUB_TOKEN"] = github_token

  if not os.getenv("GITHUB_TOKEN"):
    logging.warning("GITHUB_TOKEN not set; you will probably hit Github API "
                    "limits.")
  # Initialize a ksonnet app.
  app_name = "kubeflow-test-" + uuid.uuid4().hex[0:4]
  util.run([
      "ks",
      "init",
      app_name,
  ], cwd=dir)

  app_dir = os.path.join(dir, app_name)

  # Set the default namespace.
  util.run(["ks", "env", "set", "default", "--namespace=" + namespace_name],
           cwd=app_dir)

  kubeflow_registry = "github.com/kubeflow/kubeflow/tree/master/kubeflow"
  util.run(["ks", "registry", "add", "kubeflow", kubeflow_registry],
           cwd=app_dir)

  # Install required packages
  packages = [
      "kubeflow/common", "kubeflow/gcp", "kubeflow/jupyter",
      "kubeflow/tf-serving", "kubeflow/tf-job", "kubeflow/tf-training",
      "kubeflow/pytorch-job", "kubeflow/argo", "kubeflow/katib"
  ]

  # Instead of installing packages we edit the app.yaml file directly for p in
  # packages:
  # util.run(["ks", "pkg", "install", p], cwd=app_dir)
  app_file = os.path.join(app_dir, "app.yaml")
  with open(app_file) as f:
    app_yaml = yaml.load(f)

  libraries = {}
  for pkg in packages:
    pkg = pkg.split("/")[1]
    libraries[pkg] = {
        'gitVersion': {
            'commitSha': 'fake',
            'refSpec': 'fake'
        },
        'name': pkg,
        'registry': "kubeflow"
    }
  app_yaml['libraries'] = libraries

  with open(app_file, "w") as f:
    yaml.dump(app_yaml, f)

  # Create vendor directory with a symlink to the src so that we use the code
  # at the desired commit.
  target_dir = os.path.join(app_dir, "vendor", "kubeflow")

  REPO_ORG = "kubeflow"
  REPO_NAME = "kubeflow"
  REGISTRY_PATH = "kubeflow"
  source = os.path.join(dir, "src", REPO_ORG, REPO_NAME, REGISTRY_PATH)
  logging.info("Creating link %s -> %s", target_dir, source)
  os.symlink(source, target_dir)

  return app_dir


def log_operation_status(operation):
  """A callback to use with wait_for_operation."""
  name = operation.get("name", "")
  status = operation.get("status", "")
  logging.info("Operation %s status %s", name, status)


def wait_for_operation(client,
                       project,
                       op_id,
                       timeout=datetime.timedelta(hours=1),
                       polling_interval=datetime.timedelta(seconds=5),
                       status_callback=log_operation_status):
  """Wait for the specified operation to complete.

  Args:
    client: Client for the API that owns the operation.
    project: project
    op_id: Operation id.
    timeout: A datetime.timedelta expressing the amount of time to wait before
      giving up.
    polling_interval: A datetime.timedelta to represent the amount of time to
      wait between requests polling for the operation status.

  Returns:
    op: The final operation.

  Raises:
    TimeoutError: if we timeout waiting for the operation to complete.
  """
  endtime = datetime.datetime.now() + timeout
  while True:
    try:
      op = client.operations().get(project=project, operation=op_id).execute()

      if status_callback:
        status_callback(op)

      status = op.get("status", "")
      # Need to handle other status's
      if status == "DONE":
        return op
    except ssl.SSLError as e:
      logging.error("Ignoring error %s", e)
    if datetime.datetime.now() > endtime:
      raise TimeoutError(
          "Timed out waiting for op: {0} to complete.".format(op_id))
    time.sleep(polling_interval.total_seconds())

  # Linter complains if we don't have a return here even though its unreachable
  return None
