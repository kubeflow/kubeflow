"""Run kfctl delete as a pytest.

We use this in order to generate a junit_xml file.
"""
import datetime
import logging
import os
import subprocess
import tempfile
import uuid
from retrying import retry

import pytest

from kubeflow.testing import util

# TODO(): Need to make delete work with a KUBECONFIG file.
@pytest.mark.xfail
def test_kfctl_delete(kfctl_path, app_path, project):
  if not kfctl_path:
    raise ValueError("kfctl_path is required")

  if not app_path:
    raise ValueError("app_path is required")

  logging.info("Using kfctl path %s", kfctl_path)
  logging.info("Using app path %s", app_path)

  util.run([kfctl_path, "delete", "-V", "all"], cwd=app_path)

  # Delete the storage
  app_name = os.path.basename(app_path)
  util.run(["gcloud", "deployment-manager", "--project=" + project,
            "deployments", "delete", app_name + "-storage", "--quiet"])

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
