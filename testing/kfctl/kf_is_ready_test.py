import datetime
import logging
import os
import subprocess
import tempfile
import uuid
from retrying import retry

import pytest

from kubeflow.testing import util
from testing import deploy_utils

def test_kf_is_ready(namespace):
  """Test that Kubeflow was successfully deployed.

  Args:
    namespace: The namespace Kubeflow is deployed to.
  """

  logging.info("Using namespace %s", namespace)

  # Need to activate account for scopes.
  if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
    util.run(["gcloud", "auth", "activate-service-account",
              "--key-file=" + os.environ["GOOGLE_APPLICATION_CREDENTIALS"]])



  api_client = deploy_utils.create_k8s_client()

  util.load_kube_config()

  # Verify that components are actually deployed.
  # TODO(jlewi): We need to parameterize this list based on whether
  # we are using IAP or basic auth.
  deployment_names = [
      "argo-ui",
      "centraldashboard",
      "cert-manager",
      "cloud-endpoints-controller",
      "jupyter-web-app",
      "ml-pipeline",
      "ml-pipeline-scheduledworkflow",
      "ml-pipeline-ui",
      "notebooks-controller",
      "tf-job-operator",
      "profiles",
      "pytorch-operator",
      "studyjob-controller",
      "workflow-controller",
  ]
  for deployment_name in deployment_names:
    logging.info("Verifying that %s started...", deployment_name)
    util.wait_for_deployment(api_client, namespace, deployment_name)

  # TODO(jlewi): We should verify that the ingress is created and healthy.

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
