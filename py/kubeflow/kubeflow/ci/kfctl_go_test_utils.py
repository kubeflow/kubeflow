"""Common reusable steps for kfctl go testing."""
import datetime
import logging
import os
import tempfile
import urllib
import uuid
import re

import requests
import yaml
from kubeflow.testing import util
from retrying import retry

# retry 4 times, waiting 3 minutes between retries
@retry(stop_max_attempt_number=4, wait_fixed=180000)
def run_with_retries(*args, **kwargs):
  util.run(*args, **kwargs)

def get_kfctl_go_build_dir_binary_path():
  """return the build directory and path to kfctl go binary.

  Args:
    None

  Return:
    build_dir (str): Path to start build will be Kubeflow/kubeflow/bootstrap/
    kfctl_path (str): Path where kfctl go binary has been built.
            will be Kubeflow/kubeflow/bootstrap/bin/kfctl
  """
  this_dir = os.path.dirname(__file__)
  root = os.path.abspath(os.path.join(this_dir, "..", "..", "..", ".."))
  build_dir = os.path.join(root, "bootstrap")
  kfctl_path = os.path.join(build_dir, "bin", "kfctl")
  return build_dir, kfctl_path

def build_kfctl_go():
  """build the kfctl go binary and return the path for the same.

  Args:
    None

  Return:
    kfctl_path (str): Path where kfctl go binary has been built.
            will be Kubeflow/kubeflow/bootstrap/bin/kfctl
  """
  build_dir, kfctl_path = get_kfctl_go_build_dir_binary_path()
  # We need to use retry builds because when building in the test cluster
  # we see intermittent failures pulling dependencies
  run_with_retries(["make", "build-kfctl"], cwd=build_dir)
  return kfctl_path

def get_or_create_app_path_and_parent_dir(app_path):
  """Get a valid app_path and parent dir. Create if they are not existing.
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

  if not os.path.exists(parent_dir):
    os.makedirs(parent_dir)
  if not os.path.exists(app_path):
    os.makedirs(app_path)

  return app_path, parent_dir

def load_config(config_path):
  """Load specified KFDef.

  Args:
    config_path: Path to a YAML file containing a KFDef object.
    Can be a local path or a URI like
    https://raw.githubusercontent.com/kubeflow/manifests/master/kfdef/kfctl_gcp_iap.yaml
  Returns:
    config_spec: KfDef spec
  """
  url_for_spec = urllib.parse.urlparse(config_path)

  if url_for_spec.scheme in ["http", "https"]:
    data = requests.get(config_path)
    return yaml.load(data.content)
  else:
    with open(config_path, 'r') as f:
      config_spec = yaml.load(f)
      return config_spec

def set_env_init_args(use_basic_auth, use_istio):
  # Is it really needed?
  init_args = []
  # Set ENV for basic auth username/password.
  if use_basic_auth:
    # Don't log the password.
    # logging.info("Setting environment variables KUBEFLOW_USERNAME and KUBEFLOW_PASSWORD")
    os.environ["KUBEFLOW_USERNAME"] = "kf-test-user"
    os.environ["KUBEFLOW_PASSWORD"] = str(uuid.uuid4().hex)
    init_args = ["--use_basic_auth"]
  else:
    # Owned by project kubeflow-ci-deployment.
    logging.info("Setting environment variables CLIENT_SECRET and CLIENT_ID")
    os.environ["CLIENT_SECRET"] = "CJ4qVPLTi0j0GJMkONj7Quwt"
    os.environ["CLIENT_ID"] = (
      "29647740582-7meo6c7a9a76jvg54j0g2lv8lrsb4l8g"
      ".apps.googleusercontent.com")

  if use_istio:
    init_args.append("--use_istio")
  else:
    init_args.append("--use_istio=false")

def filter_spartakus(spec):
  """Filter our Spartakus from KfDef spec.

  Args:
    spec: KfDef spec

  Returns:
    spec: Filtered KfDef spec
  """
  for i, app in enumerate(spec["applications"]):
    if app["name"] == "spartakus":
      spec["applications"].pop(i)
      break
  return spec

def get_config_spec(config_path, project, email, zone, app_path):
  """Generate KfDef spec.

  Args:
    config_path: Path to a YAML file containing a KFDef object.
    Can be a local path or a URI like
    https://raw.githubusercontent.com/kubeflow/manifests/master/kfdef/kfctl_gcp_iap.yaml
    project: The GCP project to use.
    email: a valid email of the GCP account
    zone: a valid GCP zone for the cluster.
    app_path: The path to the Kubeflow app.
  Returns:
    config_spec: Updated KfDef spec
  """
  # TODO(https://github.com/kubeflow/kubeflow/issues/2831): Once kfctl
  # supports loading version from a URI we should use that so that we
  # pull the configs from the repo we checked out.
  config_spec = load_config(config_path)
  apiVersion = config_spec["apiVersion"].strip().split("/")
  if len(apiVersion) != 2:
    raise RuntimeError("Invalid apiVersion: " + config_spec["apiVersion"].strip())
  if apiVersion[-1] == "v1alpha1":
    config_spec["spec"]["project"] = project
    config_spec["spec"]["email"] = email
    config_spec["spec"]["zone"] = zone
  elif apiVersion[-1] == "v1beta1":
    for plugin in config_spec["spec"].get("plugins", []):
      if plugin.get("kind", "") == "KfGcpPlugin":
        plugin["spec"]["project"] = project
        plugin["spec"]["email"] = email
        plugin["spec"]["zone"] = zone
        break
  else:
    raise RuntimeError("Unknown version: " + apiVersion[-1])
  config_spec["spec"] = filter_spartakus(config_spec["spec"])

  # Set KfDef name to be unique
  # TODO(swiftdiaries): this is already being set at app_name
  # we need to reuse that
  regex = re.compile('[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?')
  kfdef_name = regex.findall(app_path)[-1]
  config_spec["metadata"]["name"] = kfdef_name

  repos = config_spec["spec"]["repos"]
  manifests_repo_name = "manifests"
  if os.getenv("REPO_NAME") == manifests_repo_name:
    # kfctl_go_test.py was triggered on presubmit from the kubeflow/manifests
    # repository. In this case we want to use the specified PR of the
    # kubeflow/manifests repository; so we need to change the repo specification
    # in the KFDef spec.
    # TODO(jlewi): We should also point to a specific commit when triggering
    # postsubmits from the kubeflow/manifests repo
    for repo in repos:
      if repo["name"] !=  manifests_repo_name:
        continue

      version = None

      if os.getenv("PULL_PULL_SHA"):
        # Presubmit
        version = os.getenv("PULL_PULL_SHA")

      # See https://github.com/kubernetes/test-infra/blob/45246b09ed105698aa8fb928b7736d14480def29/prow/jobs.md#job-environment-variables  # pylint: disable=line-too-long
      elif os.getenv("PULL_BASE_SHA"):
        version = os.getenv("PULL_BASE_SHA")

      if version:
        repo["uri"] = ("https://github.com/kubeflow/manifests/archive/"
                       "{0}.tar.gz").format(version)
        logging.info("Overwriting the URI")
      else:
        # Its a periodic job so use whatever value is set in the KFDef
        logging.info("Not overwriting manifests version")
    logging.info(str(config_spec))
  return config_spec

def kfctl_deploy_kubeflow(app_path, project, use_basic_auth, use_istio, config_path, kfctl_path, build_and_apply):
  """Deploy kubeflow.

  Args:
  app_path: The path to the Kubeflow app.
  project: The GCP project to use.
  use_basic_auth: Whether to use basic_auth.
  use_istio: Whether to use Istio or not
  config_path: Path to the KFDef spec file.
  kfctl_path: Path to the kfctl go binary
  build_and_apply: whether to build and apply or apply
  Returns:
  app_path: Path where Kubeflow is installed
  """
  # build_and_apply is a boolean used for testing both the new semantics
  # test case 1: build_and_apply
  # kfctl build -f <config file>
  # kfctl apply
  # test case 2: apply
  # kfctl apply -f <config file>

  if not os.path.exists(kfctl_path):
    msg = "kfctl Go binary not found: {path}".format(path=kfctl_path)
    logging.error(msg)
    raise RuntimeError(msg)

  app_path, parent_dir = get_or_create_app_path_and_parent_dir(app_path)

  logging.info("Project: %s", project)
  logging.info("app path %s", app_path)
  logging.info("kfctl path %s", kfctl_path)
  # TODO(nrchakradhar): Probably move all the environ sets to set_env_init_args
  zone = 'us-central1-a'
  if not zone:
    raise ValueError("Could not get zone being used")

  # We need to specify a valid email because
  #  1. We need to create appropriate RBAC rules to allow the current user
  #   to create the required K8s resources.
  #  2. Setting the IAM policy will fail if the email is invalid.
  email = util.run(["gcloud", "config", "get-value", "account"])

  if not email:
    raise ValueError("Could not determine GCP account being used.")
  if not project:
    raise ValueError("Could not get project being used")

  config_spec = get_config_spec(config_path, project, email, zone, app_path)
  with open(os.path.join(app_path, "tmp.yaml"), "w") as f:
    yaml.dump(config_spec, f)

  # TODO(jlewi): When we switch to KfDef v1beta1 this logic will need to change because
  # use_base_auth will move into the plugin spec
  gcp_plugin = {}
  for plugin in config_spec["spec"]["plugins"]:
    if plugin["kind"] == "KfGcpPlugin":
      gcp_plugin = plugin
      break
  use_basic_auth = gcp_plugin.get("spec", {}).get("useBasicAuth", False)
  logging.info("use_basic_auth=%s", use_basic_auth)

  use_istio = gcp_plugin.get("spec", {}).get("useIstio", True)
  logging.info("use_istio=%s", use_istio)

  # Set ENV for basic auth username/password.
  set_env_init_args(use_basic_auth, use_istio)

  # build_and_apply
  logging.info("running kfctl with build and apply: %s \n", build_and_apply)

  logging.info("switching working directory to: %s \n", app_path)
  os.chdir(app_path)

  # Do not run with retries since it masks errors
  logging.info("Running kfctl with config:\n%s", yaml.safe_dump(config_spec))
  if build_and_apply:
    build_and_apply_kubeflow(kfctl_path, app_path)
  else:
    apply_kubeflow(kfctl_path, app_path)
  return app_path

def apply_kubeflow(kfctl_path, app_path):
  util.run([kfctl_path, "apply", "-V", "-f=" + os.path.join(app_path, "tmp.yaml")], cwd=app_path)
  return app_path

def build_and_apply_kubeflow(kfctl_path, app_path):
  util.run([kfctl_path, "build", "-V", "-f=" + os.path.join(app_path, "tmp.yaml")], cwd=app_path)
  util.run([kfctl_path, "apply", "-V", "-f=" + os.path.join(app_path, "tmp.yaml")], cwd=app_path)
  return app_path

def verify_kubeconfig(app_path):
  """Verify kubeconfig.

  Args:
    app_path: KfDef spec path
  """
  name = os.path.basename(app_path)
  context = util.run(["kubectl", "config", "current-context"]).strip()
  if name == context:
    logging.info("KUBECONFIG current context name matches app name: %s", name)
  else:
    msg = "KUBECONFIG not having expected context: {expected} v.s. {actual}".format(
      expected=name, actual=context)
    logging.error(msg)
    raise RuntimeError(msg)
