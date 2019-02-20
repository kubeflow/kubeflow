# -*- coding: utf-8 -*-
"""Deploy Kubeflow and wait for it to be deployed.

TODO(jlewi): This script is outdated. Its no longer used for GKE.
It is still used by minikube. For minikube we should be using kfctl.sh
"""
import argparse
import logging
import os

import yaml
from kubernetes.config import kube_config
# TODO(jlewi): We should be using absolute imports always.
# So it should be from testing import deploy_utils because testing
# is the top level python package.
from . import deploy_utils
from kubeflow.testing import test_helper
from kubeflow.testing import util  # pylint: disable=no-name-in-module


def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument(
      "--namespace", default=None, type=str, help=("The namespace to use."))
  parser.add_argument(
      "--as_gcloud_user",
      dest="as_gcloud_user",
      action="store_true",
      help=("Impersonate the user corresponding to the gcloud "
            "command with kubectl and ks."))
  parser.add_argument(
      "--no-as_gcloud_user", dest="as_gcloud_user", action="store_false")
  parser.set_defaults(as_gcloud_user=False)
  parser.add_argument(
      "--github_token",
      default=None,
      type=str,
      help=("The GitHub API token to use. This is needed since ksonnet uses the"
            " GitHub API and without it we get rate limited. For more info see:"
            " https://github.com/ksonnet/ksonnet/blob/master/docs"
            "/troubleshooting.md. Can also be set using environment variable "
            "GITHUB_TOKEN."))
  parser.set_defaults(as_gcloud_user=False)

  args, _ = parser.parse_known_args()
  return args


def deploy_kubeflow(test_case):
  """Deploy Kubeflow."""
  args = parse_args()
  test_dir = test_case.test_suite.test_dir
  namespace = args.namespace
  api_client = deploy_utils.create_k8s_client()
  app_dir = deploy_utils.setup_kubeflow_ks_app(test_dir, namespace,
                                               args.github_token, api_client)

  # ks generate tf-job-operator tf-job-operator
  # TODO(jlewi): We don't need to generate a core component if we are
  # just deploying TFServing. Might be better to refactor this code.
  # Deploy Kubeflow
  util.run([
      "ks",
      "generate",
      "tf-job-operator",
      "tf-job-operator",
  ],
           cwd=app_dir)

  util.run([
      "ks",
      "generate",
      "pytorch-operator",
      "pytorch-operator",
  ],
           cwd=app_dir)

  util.run([
      "ks",
      "generate",
      "jupyter",
      "jupyter",
  ], cwd=app_dir)

  util.run([
      "ks",
      "generate",
      "katib",
      "katib",
  ], cwd=app_dir)

  apply_command = [
      "ks",
      "apply",
      "default",
      "-c",
      "tf-job-operator",
      "-c",
      "pytorch-operator",
      "-c",
      "jupyter",
      "-c",
      "katib",
  ]

  if args.as_gcloud_user:
    account = deploy_utils.get_gcp_identity()
    logging.info("Impersonate %s", account)

    # If we don't use --as to impersonate the service account then we
    # observe RBAC errors when doing certain operations. The problem appears
    # to be that we end up using the in cluster config (e.g. pod service account)
    # and not the GCP service account which has more privileges.
    apply_command.append("--as=" + account)
  util.run(apply_command, cwd=app_dir)

  # Verify that Jupyter is actually deployed.
  jupyter_name = "jupyter"
  logging.info("Verifying TfHub started.")
  util.wait_for_statefulset(api_client, namespace, jupyter_name)

  # Verify that core components are actually deployed.
  deployment_names = [
      "tf-job-operator", "pytorch-operator", "studyjob-controller"
  ]
  for deployment_name in deployment_names:
    logging.info("Verifying that %s started...", deployment_name)
    util.wait_for_deployment(api_client, namespace, deployment_name)


def main():
  test_case = test_helper.TestCase(
      name='deploy_kubeflow', test_func=deploy_kubeflow)
  test_suite = test_helper.init(name='deploy_kubeflow', test_cases=[test_case])
  test_suite.run()


if __name__ == "__main__":
  main()
