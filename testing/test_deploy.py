#!/usr/bin/python
"""Test deploying Kubeflow.

Requirements:
  This project assumes the py directory in github.com/tensorflow/k8s corresponds
  to a top level Python package on the Python path.

  TODO(jlewi): Come up with a better story for how we reuse the py package
  in tensorflow/k8s. We should probably turn that into a legit Python pip
  package that is built and released as part of the tensorflow/k8s project.
"""

import argparse
import datetime
import json
import logging
import os
import tempfile
import uuid

from kubernetes import client as k8s_client
from kubernetes.client import rest
from kubernetes.config import incluster_config

from py import test_util
from py import util

def _setup_test(api_client, run_label):
  """Create the namespace for the test.

  Returns:
    test_dir: The local test directory.
  """

  api = k8s_client.CoreV1Api(api_client)
  namespace = k8s_client.V1Namespace()
  namespace.api_version = "v1"
  namespace.kind = "Namespace"
  namespace.metadata = k8s_client.V1ObjectMeta(name=run_label, labels={
    "app": "kubeflow-e2e-test",
    }
  )

  try:
    logging.info("Creating namespace %s", namespace.metadata.name)
    api.create_namespace(namespace)
  except rest.ApiException as e:
    if e.status == 409:
      logging.info("Namespace %s already exists.", namespace.metadata.name)
    else:
      raise

  return namespace

def setup(args):
  """Test deploying Kubeflow."""
  if args.cluster:
    project = args.project
    cluster_name = args.cluster
    zone = args.zone
    logging.info("Using cluster: %s in project: %s in zone: %s",
                 cluster_name, project, zone)
    # Print out config to help debug issues with accounts and
    # credentials.
    util.run(["gcloud", "config", "list"])
    util.configure_kubectl(project, zone, cluster_name)
    util.load_kube_config()
  else:
    # TODO(jlewi): This is sufficient for API access but it doesn't create
    # a kubeconfig file which ksonnet needs for ks init.
    logging.info("Running inside cluster.")
    incluster_config.load_incluster_config()

  # Create an API client object to talk to the K8s master.
  api_client = k8s_client.ApiClient()

  now = datetime.datetime.now()
  run_label = "e2e-" + now.strftime("%m%d-%H%M-") + uuid.uuid4().hex[0:4]

  if not os.path.exists(args.test_dir):
    os.makedirs(args.test_dir)

  logging.info("Using test directory: %s", args.test_dir)

  namespace_name = run_label
  def run():
    namespace = _setup_test(api_client, namespace_name)
    logging.info("Using namespace: %s", namespace)
    # Set a GITHUB_TOKEN so that we don't rate limited by GitHub;
    # see: https://github.com/ksonnet/ksonnet/issues/233
    os.environ["GITHUB_TOKEN"] = args.github_token

    # Initialize a ksonnet app.
    app_name = "kubeflow-test"
    util.run(["ks", "init", app_name,], cwd=args.test_dir, use_print=True)

    app_dir = os.path.join(args.test_dir, app_name)

    # TODO(jlewi): In presubmits we probably want to change this so we can
    # pull the changes on a branch. Its not clear whether that's well supported
    # in Ksonnet yet.
    kubeflow_registry = "github.com/google/kubeflow/tree/master/kubeflow"
    util.run(["ks", "registry", "add", "kubeflow", kubeflow_registry], cwd=app_dir)

    # Install required packages
    # TODO(jlewi): For presubmits how do we pull the package from the desired
    # branch at the desired commit.
    packages = ["kubeflow/core", "kubeflow/tf-serving", "kubeflow/tf-job"]

    for p in packages:
      util.run(["ks", "pkg", "install", p], cwd=app_dir)

    # Deploy Kubeflow
    util.run(["ks", "generate", "core", "kubeflow-core", "--name=kubeflow-core",
              "--namespace=" + namespace.metadata.name], cwd=app_dir)

    apply_command = ["ks", "apply", "default", "-c", "kubeflow-core",]

    if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
      with open(os.getenv("GOOGLE_APPLICATION_CREDENTIALS")) as hf:
        key = json.load(hf)
        apply_command.append("--as=" + key["client_email"])
    util.run(apply_command, cwd=app_dir)

    # Verify that the TfJob operator is actually deployed.
    tf_job_deployment_name = "tf-job-operator"
    logging.info("Verifying TfJob controller started.")
    util.wait_for_deployment(api_client, namespace.metadata.name,
                             tf_job_deployment_name)

    # Verify that JupyterHub is actually deployed.
    jupyter_name = "tf-hub"
    logging.info("Verifying TfHub started.")
    util.wait_for_statefulset(api_client, namespace.metadata.name, jupyter_name)

  main_case = test_util.TestCase()
  main_case.class_name = "KubeFlow"
  main_case.name = "deploy-kubeflow"
  try:
    test_util.wrap_test(run, main_case)
  finally:
    # Delete the namespace
    logging.info("Deleting namespace %s", namespace_name)

    # We report teardown as a separate test case because this will help
    # us track down issues with garbage collecting namespaces.
    teardown = test_util.TestCase(main_case.class_name, "teardown")
    def run_teardown():
      core_api = k8s_client.CoreV1Api(api_client)
      core_api.delete_namespace(namespace_name, {})

    try:
      test_util.wrap_test(run_teardown, teardown)
    except Exception as e:  # pylint: disable-msg=broad-except
      logging.error("There was a problem deleting namespace: %s; %s",
                    namespace_name, e.message)
    junit_path = os.path.join(args.artifacts_dir, "junit_kubeflow-deploy.xml")
    logging.info("Writing test results to %s", junit_path)
    test_util.create_junit_xml_file([main_case, teardown], junit_path)

def main():  # pylint: disable=too-many-locals
  logging.getLogger().setLevel(logging.INFO) # pylint: disable=too-many-locals
  # create the top-level parser
  parser = argparse.ArgumentParser(
    description="Test Kubeflow E2E.")

  parser.add_argument(
    "--test_dir",
    default="",
    type=str,
    help="Directory to use for all the test files. If not set a temporary "
         "directory is created.")

  parser.add_argument(
    "--artifacts_dir",
    default="",
    type=str,
    help="Directory to use for artifacts that should be preserved after "
         "the test runs. Defaults to test_dir if not set.")

  parser.add_argument(
    "--project",
    default=None,
    type=str,
    help="The project to use.")

  parser.add_argument(
    "--cluster",
    default=None,
    type=str,
    help=("The name of the cluster. If not set assumes the "
          "script is running in a cluster and uses that cluster."))

  parser.add_argument(
    "--zone",
    default="us-east1-d",
    type=str,
    help="The zone for the cluster.")

  parser.add_argument(
    "--github_token",
    default=None,
    type=str,
    help=("The GitHub API token to use. This is needed since ksonnet uses the "
          "GitHub API and without it we get rate limited. For more info see: "
          "https://github.com/ksonnet/ksonnet/blob/master/docs"
          "/troubleshooting.md"))

  args = parser.parse_args()

  if not args.test_dir:
    logging.info("--test_dir not set; using a temporary directory.")

    now = datetime.datetime.now()
    label = "test_deploy-" + now.strftime("%m%d-%H%M-") + uuid.uuid4().hex[0:4]

    # Create a temporary directory for this test run
    args.test_dir = os.path.join(tempfile.gettempdir(), label)

  if not args.artifacts_dir:
    args.artifacts_dir = args.test_dir
  # Setup a logging file handler. This way we can upload the log outputs
  # to gubernator.
  root_logger = logging.getLogger()

  test_log = os.path.join(args.artifacts_dir, "logs", "test_deploy.log.txt")
  if not os.path.exists(os.path.dirname(test_log)):
    os.makedirs(os.path.dirname(test_log))

  file_handler = logging.FileHandler(test_log)
  root_logger.addHandler(file_handler)
  # We need to explicitly set the formatter because it will not pick up
  # the BasicConfig.
  formatter = logging.Formatter(fmt=("%(levelname)s|%(asctime)s"
                                     "|%(pathname)s|%(lineno)d| %(message)s"),
                                datefmt="%Y-%m-%dT%H:%M:%S")
  file_handler.setFormatter(formatter)
  logging.info("Logging to %s", test_log)

  if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
    logging.info("GOOGLE_APPLICATION_CREDENTIALS is set; configuring gcloud "
                 "to use service account.")
    # Since a service account is set tell gcloud to use it.
    util.run(["gcloud", "auth", "activate-service-account", "--key-file=" +
              os.getenv("GOOGLE_APPLICATION_CREDENTIALS")])
  setup(args)

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  main()
