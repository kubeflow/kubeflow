import datetime
import logging
import os
import subprocess
import tempfile
import uuid
from retrying import retry

import pytest

from kubeflow.testing import util

# retry 4 times, waiting 3 minutes between retries
@retry(stop_max_attempt_number=4, wait_fixed=180000)
def run_with_retries(*args, **kwargs):
  util.run(*args, **kwargs)

def verify_kubeconfig(project, zone, app_path):
  name = os.path.basename(app_path)
  context = util.run(["kubectl", "config", "current-context"])
  if not name == context:
    logging.info("KUBECONFIG current context name matches app name: " + name)
  else:
    raise RuntimeError("KUBECONFIG not having expected context: {expected} v.s. {actual}".format(
        expected=name,
        actual=context))

def test_build_kfctl_go(app_path, project):
  if not app_path:
    logging.info("--app_path not specified")
    stamp = datetime.datetime.now().strftime("%H%M")
    parent_dir = tempfile.gettempdir()
    app_path = os.path.join(parent_dir,
                            "kfctl-{0}-{1}".format(stamp,
                                                   uuid.uuid4().hex[0:4]))
  else:
    parent_dir = os.path.dirname(app_path)

  logging.info("Using app path %s", app_path)
  this_dir = os.path.dirname(__file__)
  root = os.path.abspath(os.path.join(this_dir, "..", ".."))
  build_dir = os.path.join(root, "bootstrap")
  zone = 'us-east1-d'

  # Need to activate account for scopes.
  if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
    util.run(["gcloud", "auth", "activate-service-account",
              "--key-file=" + os.environ["GOOGLE_APPLICATION_CREDENTIALS"]])

  # We need to use retry builds because when building in the test cluster
  # we see intermittent failures pulling dependencies
  run_with_retries(["make", "build-kfctl"], cwd=build_dir)
  kfctl_path = os.path.join(build_dir, "bin", "kfctl")

  # Set ENV for basic auth username/password.
  os.environ["KUBEFLOW_USERNAME"] = "kf-test-user"
  os.environ["KUBEFLOW_PASSWORD"] = str(uuid.uuid4().hex)

  version = "master"
  if os.getenv("PULL_NUMBER"):
    version = "pull/{0}".format(os.getenv("PULL_NUMBER"))

  # username and password are passed as env vars and won't appear in the logs
  run_with_retries([kfctl_path, "init", app_path, "-V", "--platform=gcp",
                         "--version=" + version,
                         "--use_basic_auth",
                         "--skip-init-gcp-project",
                         "--disable_usage_report",
                         "--project=" + project], cwd=parent_dir)

  # We need to specify a valid email because
  #  1. We need to create appropriate RBAC rules to allow the current user
  #     to create the required K8s resources.
  #  2. Setting the IAM policy will fail if the email is invalid.
  email = util.run(["gcloud", "config", "get-value", "account"])

  if not email:
    raise ValueError("Could not determine GCP account being used.")

  run_with_retries([kfctl_path, "generate", "-V", "all",
                    "--email=" + email, "--zone=" + zone],
                    cwd=app_path)

  # We need to use retries because if we don't we see random failures
  # where kfctl just appears to die.
  #
  # TODO(https://github.com/kubeflow/kubeflow/issues/2791): Running with
  # retries will mask failures like kubeflow/kubeflow#2791 that will succeed
  # on retry. We should fix the test so that we don't mask those errors.
  run_with_retries([kfctl_path, "apply", "-V", "all"], cwd=app_path)

  verify_kubeconfig(project, zone, app_path)

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
