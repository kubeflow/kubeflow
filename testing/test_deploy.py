#!/usr/bin/env python

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

"""Test deploying Kubeflow.

Requirements:
  This project assumes the py directory in github.com/kubeflow/tf-operator corresponds
  to a top level Python package on the Python path.

  TODO(jlewi): Come up with a better story for how we reuse the py package
  in kubeflow/tf-operator. We should probably turn that into a legit Python pip
  package that is built and released as part of the kubeflow/tf-operator project.
"""

import argparse
import datetime
import json
import logging
import os
import shutil
import tempfile
import uuid

from kubernetes import client as k8s_client
from kubernetes.client import rest
from kubernetes.config import incluster_config

from kubeflow.testing import test_util
from kubeflow.testing import util

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
    namespace = api.create_namespace(namespace)
    logging.info("Namespace %s created.", namespace.metadata.name)
  except rest.ApiException as e:
    if e.status == 409:
      logging.info("Namespace %s already exists.", namespace.metadata.name)
    else:
      raise

  return namespace

def create_k8s_client(args):
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

def setup(args):
  """Test deploying Kubeflow."""
  api_client = create_k8s_client(args)

  now = datetime.datetime.now()
  run_label = "e2e-" + now.strftime("%m%d-%H%M-") + uuid.uuid4().hex[0:4]

  if not os.path.exists(args.test_dir):
    os.makedirs(args.test_dir)

  logging.info("Using test directory: %s", args.test_dir)

  namespace_name = args.namespace

  namespace = _setup_test(api_client, namespace_name)
  logging.info("Using namespace: %s", namespace)
  if args.github_token:
    logging.info("Setting GITHUB_TOKEN to %s.", args.github_token)
    # Set a GITHUB_TOKEN so that we don't rate limited by GitHub;
    # see: https://github.com/ksonnet/ksonnet/issues/233
    os.environ["GITHUB_TOKEN"] = args.github_token

  if not os.getenv("GITHUB_TOKEN"):
    logging.warn("GITHUB_TOKEN not set; you will probably hit Github API "
                 "limits.")
  # Initialize a ksonnet app.
  app_name = "kubeflow-test"
  util.run(["ks", "init", app_name,], cwd=args.test_dir)

  app_dir = os.path.join(args.test_dir, app_name)

  kubeflow_registry = "github.com/kubeflow/kubeflow/tree/master/kubeflow"
  util.run(["ks", "registry", "add", "kubeflow", kubeflow_registry], cwd=app_dir)

  # Install required packages
  packages = ["kubeflow/core", "kubeflow/tf-serving", "kubeflow/tf-job"]

  for p in packages:
    util.run(["ks", "pkg", "install", p], cwd=app_dir)

  # Delete the vendor directory and replace with a symlink to the src
  # so that we use the code at the desired commit.
  target_dir = os.path.join(app_dir, "vendor", "kubeflow")

  logging.info("Deleting %s", target_dir)
  shutil.rmtree(target_dir)

  REPO_ORG = "kubeflow"
  REPO_NAME = "kubeflow"
  REGISTRY_PATH = "kubeflow"
  source = os.path.join(args.test_dir, "src", REPO_ORG, REPO_NAME,
                        REGISTRY_PATH)
  logging.info("Creating link %s -> %s", target_dir, source)
  os.symlink(source, target_dir)

  # Deploy Kubeflow
  util.run(["ks", "generate", "core", "kubeflow-core", "--name=kubeflow-core",
            "--namespace=" + namespace.metadata.name], cwd=app_dir)

  # TODO(jlewi): For reasons I don't understand even though we ran
  # configure_kubectl above, if we don't rerun it we get rbac errors
  # when we do ks apply; I think because we aren't using the proper service
  # account. This might have something to do with the way ksonnet gets
  # its credentials; maybe we need to configure credentials after calling
  # ks init?
  if args.cluster:
    util.configure_kubectl(args.project, args.zone, args.cluster)

  if args.deploy_core:
    apply_command = ["ks", "apply", "default", "-c", "kubeflow-core",]

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

  if args.deploy_tf_serving:
    logging.info("Deploying tf-serving.")
    model_server_image = (args.model_server_image + "-" +
                          os.getenv("JOB_TYPE", "") + "-" +
                          os.getenv("PULL_BASE_SHA", ""))
    util.run(["ks", "generate", "tf-serving", "modelServer",
              "--name=inception",
              "--namespace=" + namespace.metadata.name,
              "--model_path=gs://kubeflow-models/inception",
              "--model_server_image=" + model_server_image], cwd=app_dir)

    apply_command = ["ks", "apply", "default", "-c", "modelServer",]
    util.run(apply_command, cwd=app_dir)

    core_api = k8s_client.CoreV1Api(api_client)
    deploy = core_api.read_namespaced_service(
        "inception", namespace.metadata.name)
    cluster_ip = deploy.spec.cluster_ip

    util.wait_for_deployment(api_client, namespace.metadata.name, "inception")
    logging.info("Verified TF serving started.")

    if args.test_inception and args.inception_client_image:
      util.run(["docker", "load", "-i", args.test_dir + "/client.tar"])
      util.run(["docker", "run", "-e", "INCEPTION_SERVICE_HOST=" + cluster_ip,
                "-e", "INCEPTION_SERVICE_PORT=9000",
                args.inception_client_image])

def teardown(args):
  # Delete the namespace
  logging.info("Deleting namespace %s", args.namespace)
  api_client = create_k8s_client(args)
  core_api = k8s_client.CoreV1Api(api_client)
  core_api.delete_namespace(args.namespace, {})

# TODO(jlewi): We should probably make this a generic function in
# kubeflow.testing.`
def wrap_test(args):
  """Run the tests given by args.func and output artifacts as necessary.
  """
  test_name = args.func.__name__
  test_case = test_util.TestCase()
  test_case.class_name = "KubeFlow"
  test_case.name = "deploy-kubeflow-" + test_name
  try:
    def run():
      args.func(args)

    test_util.wrap_test(run, test_case)
  finally:

    junit_path = os.path.join(
      args.artifacts_dir, "junit_kubeflow-deploy-{0}.xml".format(test_name))
    logging.info("Writing test results to %s", junit_path)
    test_util.create_junit_xml_file([test_case], junit_path)

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
    "--namespace",
    required=True,
    type=str,
    help=("The namespace to use."))

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
          "/troubleshooting.md. Can also be set using environment variable "
          "GITHUB_TOKEN."))

  subparsers = parser.add_subparsers()

  parser_setup = subparsers.add_parser(
    "setup",
    help="setup the test infrastructure.")

  parser_setup.set_defaults(func=setup)

  parser_teardown = subparsers.add_parser(
    "teardown",
    help="teardown the test infrastructure.")

  parser_teardown.set_defaults(func=teardown)

  parser_setup.add_argument(
    "--deploy_core",
    default=True,
    type=bool,
    help=("If True, deploy the kubeflow-core component."))

  parser_setup.add_argument(
    "--deploy_tf_serving",
    default=False,
    type=bool,
    help=("If True, deploy the tf-serving component."))

  parser_setup.add_argument(
    "--model_server_image",
    default="gcr.io/kubeflow/model-server:1.0",
    type=str,
    help=("The TF serving image to use."))

  parser_setup.add_argument(
    "--inception_client_image",
    default="",
    type=str,
    help=("The inception client image to use."))

  parser_setup.add_argument(
    "--test_inception",
    default=False,
    type=bool,
    help=("If True, send the prediction request."))

  args = parser.parse_args()

  if not args.test_dir:
    logging.info("--test_dir not set; using a temporary directory.")

    now = datetime.datetime.now()
    label = "test_deploy-" + now.strftime("%m%d-%H%M-") + uuid.uuid4().hex[0:4]

    # Create a temporary directory for this test run
    args.test_dir = os.path.join(tempfile.gettempdir(), label)

  if not args.artifacts_dir:
    args.artifacts_dir = args.test_dir

  test_log = os.path.join(args.artifacts_dir, "logs",
                          "test_deploy." + args.func.__name__ + ".log.txt")
  if not os.path.exists(os.path.dirname(test_log)):
    os.makedirs(os.path.dirname(test_log))

  # TODO(jlewi): We should make this a util routine in kubeflow.testing.util
  # Setup a logging file handler. This way we can upload the log outputs
  # to gubernator.
  root_logger = logging.getLogger()

  file_handler = logging.FileHandler(test_log)
  root_logger.addHandler(file_handler)
  # We need to explicitly set the formatter because it will not pick up
  # the BasicConfig.
  formatter = logging.Formatter(fmt=("%(levelname)s|%(asctime)s"
                                     "|%(pathname)s|%(lineno)d| %(message)s"),
                                datefmt="%Y-%m-%dT%H:%M:%S")
  file_handler.setFormatter(formatter)
  logging.info("Logging to %s", test_log)

  util.maybe_activate_service_account()

  wrap_test(args)

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  main()
