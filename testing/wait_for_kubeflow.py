"""Wait for Kubeflow to be deployed.


TODO(jlewi): With 0.5 and kfctl go binary this test is replaced by
kf_is_ready_test.py.
"""
import argparse
import logging

from testing import deploy_utils
from kubeflow.testing import test_helper
from kubeflow.testing import util  # pylint: disable=no-name-in-module


def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument(
      "--namespace", default=None, type=str, help=("The namespace to use."))

  args, _ = parser.parse_known_args()
  return args


def deploy_kubeflow(_):
  """Deploy Kubeflow."""
  args = parse_args()
  namespace = args.namespace
  api_client = deploy_utils.create_k8s_client()

  util.load_kube_config()

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
