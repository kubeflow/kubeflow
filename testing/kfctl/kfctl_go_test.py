import logging
import os

import pytest
import yaml
from kubeflow.ci import kfctl_go_test_utils as kfctl_util
from kubeflow.testing import util
from retrying import retry


def test_build_kfctl_go(app_path, project, use_basic_auth, use_istio, config_path):
  """Test building and deploying Kubeflow.

  Args:
    app_path: The path to the Kubeflow app.
    project: The GCP project to use.
    use_basic_auth: Whether to use basic_auth.
    use_istio: Whether to use Istio or not
    config_path: config_path: Path to the KFDef spec file.
  """
  # Need to activate account for scopes.
  if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
    util.run([
        "gcloud", "auth", "activate-service-account",
        "--key-file=" + os.environ["GOOGLE_APPLICATION_CREDENTIALS"]
    ])

  kfctl_path = kfctl_util.build_kfctl_go()
  app_path, parent_dir = kfctl_util.get_app_path_and_parent_dir(app_path)

  logging.info("Using app path %s", app_path)
  zone = 'us-central1-a'
  os.environ["ZONE"] = zone
  if not zone:
    raise ValueError("Could not get zone being used")
  # We need to specify a valid email because
  #  1. We need to create appropriate RBAC rules to allow the current user
  #     to create the required K8s resources.
  #  2. Setting the IAM policy will fail if the email is invalid.
  email = util.run(["gcloud", "config", "get-value", "account"])
  os.environ["EMAIL"] = email
  if not email:
    raise ValueError("Could not determine GCP account being used.")
  os.environ["PROJECT"] = project
  if not project:
    raise ValueError("Could not get project being used")
  # username and password are passed as env vars and won't appear in the logs
  #
  config_spec = kfctl_util.get_config_spec(config_path, project, email, app_path)

  if not os.path.exists(parent_dir):
    os.makedirs(parent_dir)
  if not os.path.exists(app_path):
    os.makedirs(app_path)

  with open(os.path.join(parent_dir, "tmp.yaml"), "w") as f:
    yaml.dump(config_spec, f)

  # TODO(jlewi): When we switch to KfDef v1beta1 this logic will need to change because 
  # use_base_auth will move into the plugin spec
  use_basic_auth = config_spec["spec"].get("useBasicAuth", False)  
  logging.info("use_basic_auth=%s", use_basic_auth)
  
  use_istio = config_spec["spec"].get("useIstio", True)
  logging.info("use_istio=%s", use_istio)
    
  # Set ENV for basic auth username/password.
  kfctl_util.set_env_init_args(use_basic_auth, use_istio)
  
  logging.info("Running kfctl with config:\n%s", yaml.safe_dump(config_spec))
  util.run([kfctl_path, "apply", "-V", "-f=" + os.path.join(parent_dir, "tmp.yaml")], cwd=app_path)
  kfctl_util.verify_kubeconfig(app_path)

if __name__ == "__main__":
  logging.basicConfig(
      level=logging.INFO,
      format=('%(levelname)s|%(asctime)s'
              '|%(pathname)s|%(lineno)d| %(message)s'),
      datefmt='%Y-%m-%dT%H:%M:%S',
  )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
