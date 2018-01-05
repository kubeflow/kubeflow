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
from testing import prow_artifacts
import uuid
from google.cloud import storage  # pylint: disable=no-name-in-module
from py import util
import sys

# The namespace to launch the Argo workflow in.
NAMESPACE = "kubeflow-test-infra"

# The name of the ksonnet component for the workflow
COMPONENT = "workflows"

def _get_src_dir():
  return os.path.abspath(os.path.join(__file__, "..",))

def upload_to_gcs(contents, target):
  gcs_client = storage.Client()

  bucket_name, path = util.split_gcs_uri(target)

  bucket = gcs_client.get_bucket(bucket_name)
  logging.info("Writing %s", target)
  blob = bucket.blob(path)
  blob.upload_from_string(contents)

def upload_file_to_gcs(source, target):
  gcs_client = storage.Client()
  bucket_name, path = util.split_gcs_uri(target)

  bucket = gcs_client.get_bucket(bucket_name)

  logging.info("Uploading file %s to %s.", source, target)
  blob = bucket.blob(path)
  blob.upload_from_filename(source)

def create_started_file(bucket):
  """Create the started file in gcs for gubernator."""
  contents = prow_artifacts.create_started()

  target = os.path.join(prow_artifacts.get_gcs_dir(bucket), "started.json")
  upload_to_gcs(contents, target)

def create_finished_file(bucket, success):
  """Create the started file in gcs for gubernator."""
  contents = prow_artifacts.create_finished(success)

  target = os.path.join(prow_artifacts.get_gcs_dir(bucket), "finished.json")
  upload_to_gcs(contents, target)

def run(args, file_handler):
  src_dir = _get_src_dir()
  logging.info("Source directory: %s", src_dir)
  app_dir = os.path.join(src_dir, "test-infra")

  create_started_file(args.bucket)

  if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
    logging.info("GOOGLE_APPLICATION_CREDENTIALS is set; configuring gcloud "
                 "to use service account.")
    # Since a service account is set tell gcloud to use it.
    util.run(["gcloud", "auth", "activate-service-account", "--key-file=" +
              os.getenv("GOOGLE_APPLICATION_CREDENTIALS")])

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

  # Add some salt. This is mostly a convenience for the case where you
  # are submitting jobs manually for testing/debugging. Since the prow should
  # vend unique build numbers for each job.
  workflow_name += "-{0}".format(uuid.uuid4().hex[0:4])

  util.run(["ks", "param", "set", "workflows", "name", workflow_name], cwd=app_dir)
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

  util.run(["ks", "param", "set", COMPONENT, "prow_env", ",".join(prow_env)], cwd=app_dir)
  util.run(["ks", "param", "set", COMPONENT, "namespace", NAMESPACE], cwd=app_dir)
  util.run(["ks", "param", "set", COMPONENT, "bucket", args.bucket], cwd=app_dir)

  # For debugging print out the manifest
  util.run(["ks", "show", "prow", "-c", COMPONENT], cwd=app_dir)
  util.run(["ks", "apply", "prow", "-c", COMPONENT], cwd=app_dir)

  success = False
  try:
    results = argo_client.wait_for_workflow(api_client, NAMESPACE, workflow_name,
                                            status_callback=argo_client.log_status)
    if results["status"]["phase"] == "Succeeded":
      success = True
    logging.info("Workflow %s/%s finished phase: %s", NAMESPACE, workflow_name,
                 results["status"]["phase"] )
  except util.TimeoutError:
    success = False
    logging.error("Time out waiting for Workflow %s/%s to finish", NAMESPACE, workflow_name)
  finally:
    create_finished_file(args.bucket, success)

    # Upload logs to GCS. No logs after this point will appear in the
    # file in gcs
    file_handler.flush()
    upload_file_to_gcs(
      file_handler.baseFilename,
      os.path.join(prow_artifacts.get_gcs_dir(args.bucket), "build-log.txt"))

  return success

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

  parser.add_argument(
    "--bucket",
    default="",
    type=str,
    help="The bucket to use for the Gubernator outputs.")

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

  return run(args, file_handler)


if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  success = main()
  if not success:
    # Exit with a non-zero exit code by to signal failure to prow.
    logging.error("One or more test steps failed exiting with non-zero exit "
                  "code.")
    sys.exit(1)

