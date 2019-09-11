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

def test_kf_is_ready(namespace, use_basic_auth, use_istio):
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
      "cloud-endpoints-controller",
      "jupyter-web-app-deployment",
      "metadata-db",
      "metadata-deployment",
      "metadata-ui",
      "ml-pipeline",
      "ml-pipeline-scheduledworkflow",
      "ml-pipeline-ui",
      "notebook-controller-deployment",
      "tf-job-operator",
      "pytorch-operator",
      "katib-controller",
      "workflow-controller",
  ]

  stateful_set_names = [
    "kfserving-controller-manager",
  ]

  ingress_related_deployments = []
  ingress_related_stateful_sets = []

  if use_basic_auth:
    deployment_names.extend(["basic-auth-login"])
    ingress_related_stateful_sets.extend(["backend-updater"])
  else:
    ingress_related_deployments.extend(["iap-enabler"])
    ingress_related_stateful_sets.extend(["backend-updater"])

  # TODO(jlewi): Might want to parallelize this.
  for deployment_name in deployment_names:
    logging.info("Verifying that deployment %s started...", deployment_name)
    util.wait_for_deployment(api_client, namespace, deployment_name, 10)

  for stateful_set_name in stateful_set_names:
    logging.info("Verifying that stateful set %s started...", stateful_set_name)
    util.wait_for_statefulset(api_client, namespace, stateful_set_name)

  ingress_namespace = "istio-system" if use_istio else namespace
  for deployment_name in ingress_related_deployments:
    logging.info("Verifying that deployment %s started...", deployment_name)
    util.wait_for_deployment(api_client, ingress_namespace, deployment_name, 10)

  for name in ingress_related_stateful_sets:
    logging.info("Verifying that statefulset %s started...", name)
    util.wait_for_statefulset(api_client, ingress_namespace, name)

  # TODO(jlewi): We should verify that the ingress is created and healthy.

  knative_namespace = "knative-serving"
  knative_related_deployments = [
          "activator",
          "autoscaler",
          "controller",
  ]
  for deployment_name in knative_related_deployments:
      logging.info("Verifying that deployment %s started...", deployment_name)
      util.wait_for_deployment(api_client, knative_namespace, deployment_name, 10)

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
