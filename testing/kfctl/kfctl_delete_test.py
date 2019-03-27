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
from googlecloudsdk.api_lib.util import apis

import inspect

def test_kfctl_delete(kfctl_path, app_path, project):
  if not kfctl_path:
    raise ValueError("kfctl_path is required")

  if not app_path:
    raise ValueError("app_path is required")

  logging.info("Using kfctl path %s", kfctl_path)
  logging.info("Using app path %s", app_path)

  util.run([kfctl_path, "delete", "all", "--delete_storage", "-V"],
           cwd=app_path)

  req = apis.GetMessagesModule('servicemanagement', 'v1').ServicemanagementServicesListRequest(
      producerProjectId=project)
  logging.info("GG TEST: req type = %s", type(req))
  logging.info("GG TEST: methods = %s", str(inspect.getmembers(req, predicate=inspect.ismethod)))

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
