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
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials

# TODO(gabrielwen): Move this to a separate test "kfctl_go_check_post_delete"
def get_endpoints_list(project):
  cred = GoogleCredentials.get_application_default()
  services_mgt = discovery.build('servicemanagement', 'v1', credentials=cred)
  services = services_mgt.services()
  next_page_token = None
  endpoints = []

  while True:
    results = services.list(producerProjectId=project,
                            pageToken=next_page_token).execute()

    for s in results.get("services", {}):
      name = s.get("serviceName", "")
      endpoints.append(name)
    if not "nextPageToken" in results:
      break
    next_page_token = results["nextPageToken"]

  return endpoints

def test_kfctl_delete(kfctl_path, app_path, project):
  if not kfctl_path:
    raise ValueError("kfctl_path is required")

  if not app_path:
    raise ValueError("app_path is required")

  logging.info("Using kfctl path %s", kfctl_path)
  logging.info("Using app path %s", app_path)

  util.run([kfctl_path, "delete", "all", "--delete_storage", "-V"],
           cwd=app_path)

  logging.info("List of endpoints: %s", str(get_endpoints_list(project)))

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
