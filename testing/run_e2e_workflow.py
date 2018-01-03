"""Run the E2E workflow.

This script submits an Argo workflow to run the E2E tests and waits for
it to finish. It is intended to invoked by prow jobs.
"""

import argparse
import logging
from kubernetes import client as k8s_client
import os
import tempfile
from testing import argo_client
from py import util

# The namespace used by the workflow ksonnet component.
NAMESPACE = "kubeflow-testing"

def _get_src_dir():
  return os.path.abspath(os.path.join(__file__, "..",))

def run(args):
  src_dir = _get_src_dir()
  logging.info("Source directory: %s", src_dir)
  app_dir = os.path.join(src_dir, "testing", "test-infra")

  util.configure_kubectl(args.project, args.zone, args.cluster)
  util.load_kube_config()

  # Create the name for the workflow
  workflow_name = os.getenv("JOB_NAME")
  job_type = os.getenv("JOB_TYPE")
  if job_type == "presubmit":
    workflow_name += "-{0}".format(os.getenv("PULL_NUMBER"))
  elif job_type == "postsubmit":
    workflow_name += "-{0}".format(os.getenv("PULL_BASE_SHA"))

  workflow_name += "-{0}".format(os.getenv("BUILD_NUMBER"))

  util.run(["ks", "param", "set", "name", workflow_name], cwd=app_dir)
  util.load_kube_config()

  api_client = k8s_client.ApiClient()

  # Set the prow environment variables.
  prow_env = []

  names = ["JOB_NAME", "JOB_TYPE", "BUILD_ID", "BUILD_NUMBER",
           "PULL_BASE_SHA", "PULL_NUMBER", "PULL_PULL_SHA", "REPO_OWNER",
           "REPO_NAME"]
  names.sort()
  for v in names:
    if not os.getenv(v):
      continue
    prow_env.append("{0}={1}".format(v, os.getenv(v)))

  util.run(["ks", "param", "set", "prow_env", ",".join(prow_env)], cwd=app_dir)

  # TODO(jlewi): Should we set the namespace using ks param set so that it
  # always matches the namespace used by run_e2e_workflow.py?

  util.run(["ks", "apply", "prow", "-c", "workflows"], cwd=app_dir)

  success = False
  try:
    results = argo_client.wait_for_workflow(api_client, NAMESPACE, workflow_name)
    if results["status"]["phase"] == "Succeeded":
      success = True
  except util.TimeoutError:
    success = False
  finally:
    # TODO(jlewi): upload build log to Gubernator and create finished.json
    # in gubernator. Currently we create finished.json in the workflow.
    pass

def main(unparsed_args=None):  # pylint: disable=too-many-locals
  logging.getLogger().setLevel(logging.INFO) # pylint: disable=too-many-locals
  # create the top-level parser
  parser = argparse.ArgumentParser(
    description="Submit an Argo workflow to run the E2E tests.")

  parser.add_argument(
    "--project",
    default="",
    type=str,
    help="The project containing the GKE cluster to use to run the workflow.")

  parser.add_argument(
    "--zone",
    default="",
    type=str,
    help="The zone containing the GKE cluster to use to run the workflow.")

  parser.add_argument(
    "--cluster",
    default="",
    type=str,
    help="The GKE cluster to use to run the workflow.")

  #############################################################################
  # Process the command line arguments.

  # Parse the args
  args = parser.parse_args(args=unparsed_args)

  # Setup a logging file handler. This way we can upload the log outputs
  # to gubernator.
  root_logger = logging.getLogger()

  with tempfile.NamedTemporaryFile(prefix="tmpRunE2eWorkflow", suffix="log") as hf:
    test_log = hf.name

  file_handler = logging.FileHandler(test_log)
  root_logger.addHandler(file_handler)
  # We need to explicitly set the formatter because it will not pick up
  # the BasicConfig.
  formatter = logging.Formatter(fmt=("%(levelname)s|%(asctime)s"
                                     "|%(pathname)s|%(lineno)d| %(message)s"),
                                datefmt="%Y-%m-%dT%H:%M:%S")
  file_handler.setFormatter(formatter)
  logging.info("Logging to %s", test_log)

  run(args)

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  main()
