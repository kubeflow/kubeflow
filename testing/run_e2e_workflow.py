"""Run the E2E workflow.

This script submits an Argo workflow to run the E2E tests and waits for
it to finish. It is intended to invoked by prow jobs.
"""

import logging
import os
from py import util

def _get_src_dir():
  return os.path.abspath(os.path.join(__file__, "..",))

def run(args):
  src_dir = _get_src_dir()
  logging.info("Source directory: %s", src_dir)
  app_dir = os.path.join(src_dir, "testing", "test-infra")

  # Create the name for the workflow
  worflow_name = os.getenv("JOB_NAME")
  job_type = os.getenv("JOB_TYPE")
  if job_type == "presubmit":
    worflow_name += "-{0}".format(os.getenv("PULL_NUMBER"))
  elif job_type == "postsubmit"):
    worflow_name += "-{0}".format(os.getenv("PULL_BASE_SHA"))

  workflow_name += "-{0}".format(os.getenv("BUILD_NUMBER"))

  util.run(["ks", "param", "set", "name", workflow_name], cwd=app_dir)

  # Set the prow environment variables.
  prow_env = []
  for v in ["JOB_NAME", "JOB_TYPE", "BUILD_ID", "BUILD_NUMBER",
            "PULL_BASE_SHA", "PULL_NUMBER", "PULL_PULL_SHA", "REPO_OWNER",
            "REPO_NAME"]:
    if not os.getenv(v):
      continue
    prow_env.append("{0}={1}".format(v, os.getenv(v)))

  util.run(["ks", "param", "set", "prow_env", prow_env], cwd=app_dir)

  util.run(["ks", "apply", "prow", "-c", "workflows"], cwd=app_dir)

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

  test_log = os.path.join(os.path.join(args.artifacts_dir, "artifacts"),
                          "logs", "prow_artifacts." + args.func.__name__ +
                          ".log")
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

  run(args)

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  main()
