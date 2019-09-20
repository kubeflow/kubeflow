import datetime
import logging
import os
import requests
import subprocess
import tempfile
import uuid
import urllib
from retrying import retry
import yaml

import pytest

from kubeflow.testing import util


# retry 4 times, waiting 3 minutes between retries
@retry(stop_max_attempt_number=4, wait_fixed=180000)
def run_with_retries(*args, **kwargs):
  util.run(*args, **kwargs)


def load_config(config_path):
  """Load specified KFDEf.

  Args:
    config_path: Path to a YAML file containing a KFDef object.
      Can be a local path or a URI like
      https://raw.githubusercontent.com/kubeflow/manifests/master/kfdef/kfctl_gcp_iap.yaml
  """
  u = urllib.parse.urlparse(config_path)

  if u.scheme in ["http", "https"]:
    data = requests.get(config_path)
    return yaml.load(data.content)
  else:
    with open(config_path, 'r') as f:
      config_spec = yaml.load(f)
      return config_spec

def verify_kubeconfig(project, zone, app_path):
  name = os.path.basename(app_path)
  context = util.run(["kubectl", "config", "current-context"]).strip()
  if name == context:
    logging.info("KUBECONFIG current context name matches app name: " + name)
  else:
    msg = "KUBECONFIG not having expected context: {expected} v.s. {actual}".format(
        expected=name, actual=context)
    logging.error(msg)
    raise RuntimeError(msg)


def test_build_kfctl_go(app_path, project, use_basic_auth, use_istio, config_path):
  """Test building and deploying Kubeflow.

  Args:
    app_path: The path to the Kubeflow app.
    project: The GCP project to use.
  """
  if not app_path:
    logging.info("--app_path not specified")
    stamp = datetime.datetime.now().strftime("%H%M")
    parent_dir = tempfile.gettempdir()
    app_path = os.path.join(
        parent_dir, "kfctl-{0}-{1}".format(stamp,
                                           uuid.uuid4().hex[0:4]))
  else:
    parent_dir = os.path.dirname(app_path)

  logging.info("Using app path %s", app_path)
  this_dir = os.path.dirname(__file__)
  root = os.path.abspath(os.path.join(this_dir, "..", ".."))
  build_dir = os.path.join(root, "bootstrap")
  zone = 'us-central1-a'

  # Need to activate account for scopes.
  if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
    util.run([
        "gcloud", "auth", "activate-service-account",
        "--key-file=" + os.environ["GOOGLE_APPLICATION_CREDENTIALS"]
    ])

  # We need to use retry builds because when building in the test cluster
  # we see intermittent failures pulling dependencies
  run_with_retries(["make", "build-kfctl"], cwd=build_dir)
  kfctl_path = os.path.join(build_dir, "bin", "kfctl")

  # Set ENV for basic auth username/password.
  init_args = []
  if use_basic_auth:
    os.environ["KUBEFLOW_USERNAME"] = "kf-test-user"
    os.environ["KUBEFLOW_PASSWORD"] = str(uuid.uuid4().hex)
    init_args = ["--use_basic_auth"]
  else:
    # Owned by project kubeflow-ci-deployment.
    os.environ["CLIENT_SECRET"] = "CJ4qVPLTi0j0GJMkONj7Quwt"
    os.environ["CLIENT_ID"] = (
      "29647740582-7meo6c7a9a76jvg54j0g2lv8lrsb4l8g"
      ".apps.googleusercontent.com")

  if use_istio:
    init_args.append("--use_istio")
  else:
    init_args.append("--use_istio=false")

  version = "master"
  if os.getenv("REPO_NAME") != "manifests":
    if os.getenv("PULL_NUMBER"):
      version = "pull/{0}".format(os.getenv("PULL_NUMBER"))
  pull_manifests = "@master"
  if os.getenv("REPO_NAME") == "manifests":
    if os.getenv("PULL_PULL_SHA"):
      pull_manifests = "@" + os.getenv("PULL_PULL_SHA")

  # We need to specify a valid email because
  #  1. We need to create appropriate RBAC rules to allow the current user
  #     to create the required K8s resources.
  #  2. Setting the IAM policy will fail if the email is invalid.
  email = util.run(["gcloud", "config", "get-value", "account"])

  if not email:
    raise ValueError("Could not determine GCP account being used.")

  # username and password are passed as env vars and won't appear in the logs
  # TODO(https://github.com/kubeflow/kubeflow/issues/2831): Once kfctl
  # supports loading version from a URI we should use that so that we
  # pull the configs from the repo we checked out.
  #
  # We don't run with retries because if kfctl init exits with an error
  # but creates app.yaml then rerunning init will fail because app.yaml
  # already exists. So retrying ends up masking the original error message
  config_spec = load_config(config_path)
  config_spec["spec"]["project"] = project
  config_spec["spec"]["email"] = email
  config_spec["spec"] = filterSpartakus(config_spec["spec"])
  repos = config_spec["spec"]["repos"]

  if os.getenv("REPO_NAME") == "manifests":
    # kfctl_go_test.py was triggered on presubmit from the kubeflow/manifests
    # repository. In this case we want to use the specified PR of the
    # kubeflow/manifests repository; so we need to change the repo specification
    # in the KFDef spec.
    # TODO(jlewi): We should also point to a specific commit when triggering
    # postsubmits from the kubeflow/manifests repo
    for repo in repos:
      for key, value in repo.items():
        if value == "https://github.com/kubeflow/manifests/archive/master.tar.gz":
          repo["uri"] = str("https://github.com/kubeflow/manifests/archive/pull/"+str(os.getenv("PULL_NUMBER"))+"/head.tar.gz")
    logging.info(str(config_spec))
  with open(os.path.join(parent_dir, "tmp.yaml"), "w") as f:
    yaml.dump(config_spec, f)
  util.run([
      kfctl_path, "init", app_path, "-V",
      "--config=" + os.path.join(parent_dir, "tmp.yaml")], cwd=parent_dir)
  util.run(["cat", "app.yaml"], cwd=app_path)

  run_with_retries([
      kfctl_path, "generate", "-V", "all", "--email=" + email, "--zone=" + zone
  ],
                   cwd=app_path)

  # We need to use retries because if we don't we see random failures
  # where kfctl just appears to die.
  #
  # Do not run with retries since it masks errors
  util.run([kfctl_path, "apply", "-V", "all"], cwd=app_path)

  verify_kubeconfig(project, zone, app_path)

def filterSpartakus(spec):
  for i, app in enumerate(spec["applications"]):
    if app["name"] == "spartakus":
      spec["applications"].pop(i)
      break
  return spec

if __name__ == "__main__":
  logging.basicConfig(
      level=logging.INFO,
      format=('%(levelname)s|%(asctime)s'
              '|%(pathname)s|%(lineno)d| %(message)s'),
      datefmt='%Y-%m-%dT%H:%M:%S',
  )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
