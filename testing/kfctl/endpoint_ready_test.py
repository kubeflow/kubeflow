import datetime
import logging
import os
import subprocess
import tempfile
import uuid
from retrying import retry

import pytest

from kubeflow.testing import util
from testing import deploy_utils
from testing import gcp_util

def test_endpoint_is_ready(project, app_name):
  """Test that Kubeflow was successfully deployed.

  Args:
    project: The gcp project that we deployed kubeflow
    app_name: The name of the kubeflow deployment
  """
  # Owned by project kubeflow-ci-deployment.
  os.environ["CLIENT_ID"] = "CJ4qVPLTi0j0GJMkONj7Quwt"
  if not gcp_util.endpoint_is_ready(
      "https://{}.endpoints.{}.cloud.goog".format(app_name, project)):
    raise Error("GG")

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
