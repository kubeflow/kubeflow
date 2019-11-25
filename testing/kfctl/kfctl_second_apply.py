import logging
import os

import pytest

from kubeflow.kubeflow.ci import kfctl_go_test_utils as kfctl_util
from kubeflow.testing import util


@pytest.mark.skipif(os.getenv("JOB_TYPE") == "presubmit",
                    reason="test second apply doesn't run in presubmits")
def test_second_apply(record_xml_attribute, app_path):
  """Test that we can run kfctl apply again with error.

  Args:
    kfctl_path: The path to kfctl binary.
    app_path: The app dir of kubeflow deployment.
  """
  _, kfctl_path = kfctl_util.get_kfctl_go_build_dir_binary_path()
  if not os.path.exists(kfctl_path):
    msg = "kfctl Go binary not found: {path}".format(path=kfctl_path)
    logging.error(msg)
    raise RuntimeError(msg)
  util.run([kfctl_path, "apply", "-V", "-f=" + os.path.join(app_path, "tmp.yaml")], cwd=app_path)
