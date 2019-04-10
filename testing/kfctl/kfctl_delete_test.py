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

  # Use services.list instead of services.get because error returned is not
  # 404, it's 403 which is confusing.
  name = os.path.basename(app_path)
  endpoint_name = "{deployment}.endpoints.{project}.cloud.goog".format(
      deployment=name,
      project=project)
  logging.info("Verify endpoint service is deleted: " + endpoint_name)
  if endpoint_name in get_endpoints_list(project):
    msg = "Endpoint is not deleted: " + endpoint_name
    logging.error(msg)
    raise AssertionError(msg)
  else:
    logging.info("Verified endpoint service is deleted.")

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
