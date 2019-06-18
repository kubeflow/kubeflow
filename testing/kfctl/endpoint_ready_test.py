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

def test_endpoint_is_ready():
  """Test that Kubeflow was successfully deployed.

  Args:
  """
  if not gcp_util.endpoint_is_ready("https://kf.endpoints.kubeflow-ci.cloud.goog"):
    raise Error("GG")

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
