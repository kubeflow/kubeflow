import logging
import os
import pytest

from kubeflow.ci import kfctl_go_test_utils as kfctl_util
from kubeflow.testing import util

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
  app_path = kfctl_util.kfctl_deploy_kubeflow(app_path, project, use_basic_auth, 
                            use_istio, config_path, kfctl_path)

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
