# -*- coding: utf-8 -*-
import argparse
import logging
import os
import yaml
from kubeflow.testing import test_helper, util
from kubernetes.config import kube_config


def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument(
      "--cluster",
      default=None,
      type=str,
      help=(
          "The name of the cluster. If not set assumes the script is running in"
          " a cluster and uses that cluster."))
  parser.add_argument(
      "--zone",
      default="us-east1-d",
      type=str,
      help="The zone for the cluster.")
  parser.add_argument(
      "--project", default=None, type=str, help="The project to use.")
  args, _ = parser.parse_known_args()
  return args


def get_gke_credentials(test_case):
  """Configure kubeconfig to talk to the supplied GKE cluster."""
  args = parse_args()
  util.maybe_activate_service_account()
  config_file = os.path.expanduser(kube_config.KUBE_CONFIG_DEFAULT_LOCATION)
  logging.info("Using Kubernetes config file: %s", config_file)
  project = args.project
  cluster_name = args.cluster
  zone = args.zone
  logging.info("Using cluster: %s in project: %s in zone: %s", cluster_name,
               project, zone)
  # Print out config to help debug issues with accounts and
  # credentials.
  util.run(["gcloud", "config", "list"])
  util.configure_kubectl(project, zone, cluster_name)

  # We want to modify the KUBECONFIG file to remove the gcloud commands
  # for any users that are authenticating using service accounts.
  # This will allow the script to be truly headless and not require gcloud.
  # More importantly, kubectl will properly attach auth.info scope so that
  # RBAC rules can be applied to the email and not the id.
  # See https://github.com/kubernetes/kubernetes/pull/58141
  #
  # TODO(jlewi): We might want to check GOOGLE_APPLICATION_CREDENTIALS
  # to see whether we are actually using a service account. If we aren't
  # using a service account then we might not want to delete the gcloud
  # commands.
  logging.info("Modifying kubeconfig %s", config_file)
  with open(config_file, "r") as hf:
    config = yaml.load(hf)

  for user in config["users"]:
    auth_provider = user.get("user", {}).get("auth-provider", {})
    if auth_provider.get("name") != "gcp":
      continue
    logging.info("Modifying user %s which has gcp auth provider", user["name"])
    if "config" in auth_provider:
      logging.info("Deleting config from user %s", user["name"])
      del auth_provider["config"]

      # This is a hack because the python client library will complain
      # about an invalid config if there is no config field.
      #
      # It looks like the code checks here but that doesn't seem to work
      # https://github.com/kubernetes-client/python-base/blob/master/config/kube_config.py#L209
      auth_provider["config"] = {
          "dummy": "dummy",
      }
  logging.info("Writing update kubeconfig:\n %s", yaml.dump(config))
  with open(config_file, "w") as hf:
    yaml.dump(config, hf)


def main():
  test_case = test_helper.TestCase(
      name='get_gke_credentials', test_func=get_gke_credentials)
  test_suite = test_helper.init(
      name='get_gke_credentials', test_cases=[test_case])
  test_suite.run()


if __name__ == "__main__":
  main()
