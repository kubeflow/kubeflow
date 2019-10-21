import logging
import os

import pytest

from kubeflow.kubeflow.ci import kfctl_go_test_utils as kfctl_util
from kubeflow.testing import util

def test_build_kfctl_go(record_xml_attribute, app_path, project, use_basic_auth,
                        use_istio, config_path, build_and_apply,
                        cluster_creation_script):
  """Test building and deploying Kubeflow.

  Args:
    app_path: The path to the Kubeflow app.
    project: The GCP project to use.
    use_basic_auth: Whether to use basic_auth.
    use_istio: Whether to use Istio or not
    config_path: Path to the KFDef spec file.
    cluster_creation_script: script invoked to create a new cluster
    build_and_apply: whether to build and apply or apply
  """
  util.set_pytest_junit(record_xml_attribute, "test_build_kfctl_go")

  # Need to activate account for scopes.
  if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
    util.run([
        "gcloud", "auth", "activate-service-account",
        "--key-file=" + os.environ["GOOGLE_APPLICATION_CREDENTIALS"]
    ])

  # TODO(yanniszark): split this into a separate workflow step
  if cluster_creation_script:
      logging.info("Cluster creation script specified: %s", cluster_creation_script)
      util.run(["/bin/bash", "-c", cluster_creation_script])


  kfctl_path = kfctl_util.build_kfctl_go()
  app_path = kfctl_util.kfctl_deploy_kubeflow(
                  app_path, project, use_basic_auth,
                  use_istio, config_path, kfctl_path, build_and_apply)
  if not cluster_creation_script:
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
