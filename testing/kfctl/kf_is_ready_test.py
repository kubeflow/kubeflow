import datetime
import logging
import os
import subprocess
import tempfile
import uuid
import yaml
from retrying import retry

import googleapiclient.discovery
from oauth2client.client import GoogleCredentials

import pytest

from kubeflow.testing import util
from testing import deploy_utils

def set_logging():
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)

def get_platform_app_name(app_path):
  with open(os.path.join(app_path, "tmp.yaml")) as f:
    kfdef = yaml.safe_load(f)
  app_name = kfdef["metadata"]["name"]
  platform = ""
  apiVersion = kfdef["apiVersion"].strip().split("/")
  if len(apiVersion) != 2:
    raise RuntimeError("Invalid apiVersion: " + kfdef["apiVersion"].strip())
  if apiVersion[-1] == "v1alpha1":
    platform = kfdef["spec"]["platform"]
  elif apiVersion[-1] == "v1beta1":
    for plugin in kfdef["spec"].get("plugins", []):
      if plugin.get("kind", "") == "KfGcpPlugin":
        platform = "gcp"
      elif plugin.get("kind", "") == "KfExistingArriktoPlugin":
        platform = "existing_arrikto"
  else:
    raise RuntimeError("Unknown version: " + apiVersion[-1])
  return platform, app_name


def test_katib_is_ready(record_xml_attribute, namespace):
  """Test that Kubeflow was successfully deployed.

  Args:
    namespace: The namespace Kubeflow is deployed to.
  """
  set_logging()
  util.set_pytest_junit(record_xml_attribute, "test_katib_is_ready")

  # Need to activate account for scopes.
  if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
    util.run(["gcloud", "auth", "activate-service-account",
              "--key-file=" + os.environ["GOOGLE_APPLICATION_CREDENTIALS"]])

  api_client = deploy_utils.create_k8s_client()

  util.load_kube_config()

  deployment_names = [
    "katib-controller",
    "katib-db",
    "katib-manager",
    "katib-ui",
  ]
  for deployment_name in deployment_names:
    logging.info("Verifying that deployment %s started...", deployment_name)
    util.wait_for_deployment(api_client, namespace, deployment_name, 10)


def test_kf_is_ready(record_xml_attribute, namespace, use_basic_auth, use_istio,
                     app_path):
  """Test that Kubeflow was successfully deployed.

  Args:
    namespace: The namespace Kubeflow is deployed to.
  """
  set_logging()
  util.set_pytest_junit(record_xml_attribute, "test_kf_is_ready")

  # Need to activate account for scopes.
  if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
    util.run(["gcloud", "auth", "activate-service-account",
              "--key-file=" + os.environ["GOOGLE_APPLICATION_CREDENTIALS"]])

  api_client = deploy_utils.create_k8s_client()

  util.load_kube_config()

  # Verify that components are actually deployed.
  # TODO(jlewi): We need to parameterize this list based on whether
  # we are using IAP or basic auth.
  # TODO(yanniszark): This list is incomplete and missing a lot of components.
  deployment_names = [
      "argo-ui",
      "centraldashboard",
      "jupyter-web-app-deployment",
      "minio",
      "ml-pipeline",
      "ml-pipeline-persistenceagent",
      "ml-pipeline-scheduledworkflow",
      "ml-pipeline-ui",
      "ml-pipeline-viewer-controller-deployment",
      "mysql",
      "notebook-controller-deployment",
      "profiles-deployment",
      "pytorch-operator",
      "tf-job-operator",
      "workflow-controller",
  ]

  stateful_set_names = []

  platform, _ = get_platform_app_name(app_path)

  ingress_related_deployments = [
    "istio-egressgateway",
    "istio-ingressgateway",
    "istio-pilot",
    "istio-policy",
    "istio-sidecar-injector",
    "istio-telemetry",
    "istio-tracing",
    "prometheus",
  ]
  ingress_related_stateful_sets = []

  knative_namespace = "knative-serving"
  knative_related_deployments = [
          "activator",
          "autoscaler",
          "controller",
  ]

  if platform == "gcp":
    deployment_names.extend(["cloud-endpoints-controller"])
    stateful_set_names.extend(["kfserving-controller-manager"])
    if use_basic_auth:
      deployment_names.extend(["basic-auth-login"])
      ingress_related_stateful_sets.extend(["backend-updater"])
    else:
      ingress_related_deployments.extend(["iap-enabler"])
      ingress_related_stateful_sets.extend(["backend-updater"])
  elif platform == "existing_arrikto":
    deployment_names.extend(["dex"])
    ingress_related_deployments.extend(["authservice"])
    knative_related_deployments = []


  # TODO(jlewi): Might want to parallelize this.
  for deployment_name in deployment_names:
    logging.info("Verifying that deployment %s started...", deployment_name)
    util.wait_for_deployment(api_client, namespace, deployment_name, 10)

  ingress_namespace = "istio-system" if use_istio else namespace
  for deployment_name in ingress_related_deployments:
    logging.info("Verifying that deployment %s started...", deployment_name)
    util.wait_for_deployment(api_client, ingress_namespace, deployment_name, 10)


  all_stateful_sets = [(namespace, name) for name in stateful_set_names]
  all_stateful_sets.extend([(ingress_namespace, name) for name in ingress_related_stateful_sets])

  for ss_namespace, name in all_stateful_sets:
    logging.info("Verifying that stateful set %s.%s started...", ss_namespace, name)
    try:
      util.wait_for_statefulset(api_client, ss_namespace, name)
    except:
      # Collect debug information by running describe
      util.run(["kubectl", "-n", ss_namespace, "describe", "statefulsets", name])
      raise

  # TODO(jlewi): We should verify that the ingress is created and healthy.

  for deployment_name in knative_related_deployments:
    logging.info("Verifying that deployment %s started...", deployment_name)
    util.wait_for_deployment(api_client, knative_namespace, deployment_name, 10)


def test_gcp_access(record_xml_attribute, namespace, app_path, project):
  """Test that Kubeflow gcp was configured with workload_identity and GCP service account credentails.

  Args:
    namespace: The namespace Kubeflow is deployed to.
  """
  set_logging()
  util.set_pytest_junit(record_xml_attribute, "test_gcp_access")

  # Need to activate account for scopes.
  if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
    util.run(["gcloud", "auth", "activate-service-account",
              "--key-file=" + os.environ["GOOGLE_APPLICATION_CREDENTIALS"]])

  api_client = deploy_utils.create_k8s_client()

  platform, app_name = get_platform_app_name(app_path)
  if platform == "gcp":
    # check secret
    util.check_secret(api_client, namespace, "user-gcp-sa")

    cred = GoogleCredentials.get_application_default()
    # Create the Cloud IAM service object
    service = googleapiclient.discovery.build('iam', 'v1', credentials=cred)

    userSa = 'projects/%s/serviceAccounts/%s-user@%s.iam.gserviceaccount.com' % (project, app_name, project)
    adminSa = 'serviceAccount:%s-admin@%s.iam.gserviceaccount.com' % (app_name, project)

    request = service.projects().serviceAccounts().getIamPolicy(resource=userSa)
    response = request.execute()
    roleToMembers = {}
    for binding in response['bindings']:
      roleToMembers[binding['role']] = set(binding['members'])

    if 'roles/owner' not in roleToMembers:
      raise Exception("roles/owner missing in iam-policy of %s" % userSa)

    if adminSa not in roleToMembers['roles/owner']:
      raise Exception("Admin %v should be owner of user %s" % (adminSa, userSa))

    workloadIdentityRole = 'roles/iam.workloadIdentityUser'
    if workloadIdentityRole not in roleToMembers:
      raise Exception("roles/iam.workloadIdentityUser missing in iam-policy of %s" % userSa)


if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
