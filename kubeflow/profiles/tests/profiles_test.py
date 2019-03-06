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
import time

import pytest

from kubernetes.config import kube_config
from kubernetes import client as k8s_client
from kubernetes.client.rest import ApiException
from kubeflow.testing import util

GROUP = "kubeflow.org"
PLURAL = "profiles"
KIND = "Profile"
VERSION = "v1alpha1"

logging.basicConfig(level=logging.INFO,
                    format=('%(levelname)s|%(asctime)s'
                            '|%(pathname)s|%(lineno)d| %(message)s'),
                    datefmt='%Y-%m-%dT%H:%M:%S',
                    )
logging.getLogger().setLevel(logging.INFO)

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

  # TODO: check CR status/condition instead of sleep
  # conditions = ["Ready"]
  # namespace = "kubeflow"
  # name = "john"
  # results = util.wait_for_cr_condition(api_client, GROUP, PLURAL, VERSION,
  #                                      namespace, name, conditions)
  # logging.info("Result of CRD:\n%s", results)
  time.sleep(10)

  # Verifies the namespace is created.
  name = "john"  # The name of the profile, also the new namespace's name.
  coreV1 = k8s_client.CoreV1Api(api_client)
  retry_read_namespace = retry(
    wait_exponential_multiplier=1000,  # wait 2^i * 1000 ms, on the i-th retry
    wait_exponential_max=60000,  # 60 sec max
  )(coreV1.read_namespace)
  resp = retry_read_namespace(name)
  logging.info("found namespace: %s", resp)

  rbacV1 = k8s_client.RbacAuthorizationV1Api(api_client)
  resp = rbacV1.read_namespaced_role("edit", name)
  logging.info("role: %s", resp)
  resp = rbacV1.read_namespaced_role_binding("default", name)
  logging.info("role binding: %s", resp)

  # delete the profile and make sure namespace is deleted
  util.run(["kubectl", "delete", "-f", "sample_profile.yaml"], cwd=this_dir)
  time.sleep(15)

  with pytest.raises(ApiException) as e:
    resp = coreV1.read_namespace(name)
  logging.info("exception info: %s", e)

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()