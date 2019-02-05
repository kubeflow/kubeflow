"""Test Profiles custom resource.

todo

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
from kubeflow.testing import util

GROUP = "kubeflow.org"
PLURAL = "profiles"
KIND = "Profile"
VERSION = "v1alpha1"

def test_profiles():
  app_credentials = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
  if app_credentials:
    logging.info("Activate service account")
    util.run(["gcloud", "auth", "activate-service-account",
              "--key-file=" + app_credentials])

  # util.load_kube_config appears to hang on python3
  kube_config.load_kube_config()
  api_client = k8s_client.ApiClient()

  this_dir = os.path.dirname(__file__)
  util.run(["kubectl", "apply", "-f", "sample_profile.yaml"], cwd=this_dir)
  conditions = ["Ready"]
  namespace = "kubeflow"
  name = "john"
  results = util.wait_for_cr_condition(api_client, GROUP, PLURAL, VERSION,
                                       namespace, name, conditions)
  logging.info("Result of CRD:\n%s", results)

  # Verifies the namespace is created.
  coreV1 = k8s_client.CoreV1Api(api_client)
  resp = coreV1.read_namespace(name)
  logging.info("read namespace: %s", resp)

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()