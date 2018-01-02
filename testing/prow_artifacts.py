"""Script to create artifacts needed by Gubernator.

For reference see:
https://github.com/kubernetes/test-infra/tree/master/gubernator
"""
import argparse
import logging
import json
import os
import time

def create_started(args):
  """Create the started output in the artifacts dir.
  """
  # See:
  # https://github.com/kubernetes/test-infra/tree/master/gubernator#job-artifact-gcs-layout
  # For a list of fields expected by gubernator
  started = {
      "timestamp": int(time.time()),
      "repos": {
      },
  }

  repo_owner = os.getenv("REPO_OWNER", "")
  repo_name = os.getenv("REPO_NAME", "")

  if repo_owner:
    sha = os.getenv("PULL_PULL_SHA", "")
    if not sha:
      # Its a post submit job.
      sha = os.getenv("PULL_BASE_SHA", "")

    started["repos"][repo_owner + "/" + repo_name] = sha

  PULL_REFS = os.getenv("PULL_REFS", "")
  if PULL_REFS:
    started["pull"] = PULL_REFS

  started_path = os.path.join(args.artifacts_dir, "started.json")
  logging.info("Creating %s", started_path)
  with open(started_path, "w") as hf:
    json.dump(started, hf)

  return started_path

def create_finished(args):
  """Create the finished output file.
  """
  # TODO(jlewi): Under what conditions should we report failure? Can we
  # mark the job successful if the ARGO workflow ran to completion and
  # rely on junit files to report individual test failures? For now
  # we always report success.
  result = "SUCCESS"
  finished = {
      "timestamp": int(time.time()),
      "result": result,
      # Dictionary of extra key value pairs to display to the user.
      # TODO(jlewi): Perhaps we should add the GCR path of the Docker image
      # we are running in. We'd have to plumb this in from bootstrap.
      "metadata": {},
  }

  path = os.path.join(args.artifacts_dir, "finished.json")
  logging.info("Creating %s", path)
  with open(path, "w") as hf:
    json.dump(finished, hf)

def main(unparsed_args=None):  # pylint: disable=too-many-locals
  logging.getLogger().setLevel(logging.INFO) # pylint: disable=too-many-locals
  # create the top-level parser
  parser = argparse.ArgumentParser(
    description="Create prow artifacts.")

  parser.add_argument(
    "--artifacts_dir",
    default="",
    type=str,
    help="Directory to use for all the gubernator artifacts.")

  subparsers = parser.add_subparsers()

  #############################################################################
  # Create started artifact.
  parser_started = subparsers.add_parser(
    "create_started", help="Create started artifact.")

  parser_started.set_defaults(func=create_started)

  #############################################################################
  # Create finished artifact.
  parser_finished = subparsers.add_parser(
    "create_finished", help="Create finished artifact.")

  parser_finished.set_defaults(func=create_finished)

  # Parse the args
  args = parser.parse_args(args=unparsed_args)
  #############################################################################
  # Process the command line arguments.

  # Setup a logging file handler. This way we can upload the log outputs
  # to gubernator.
  root_logger = logging.getLogger()

  test_log = os.path.join(os.path.join(args.artifacts_dir, "artifacts"),
                          "logs", "prow_artifacts." + args.func.__name__)
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

  args.func(args)

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  main()
