import logging
import os

import pytest
from kubeflow.testing import util
import kfctl_go_test_utils as kfctl_util

def test_build_kfctl_go(record_xml_attribute):
  """Test building of kfctl go.

  """
  if os.getenv("JUNIT_CLASS_NAME"):
    # Override the classname attribute in the junit file.
    # This makes it easy to group related tests in test grid.
    # http://doc.pytest.org/en/latest/usage.html#record-xml-attribute
    record_xml_attribute("classname", os.getenv("JUNIT_CLASS_NAME"))

  # Need to activate account for scopes.
  if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
    util.run([
      "gcloud", "auth", "activate-service-account",
      "--key-file=" + os.environ["GOOGLE_APPLICATION_CREDENTIALS"]
    ])

  kfctl_path = kfctl_util.build_kfctl_go()
  logging.info("kfctl go binary path %s", kfctl_path)


if __name__ == "__main__":
  logging.basicConfig(
    level=logging.INFO,
    format=('%(levelname)s|%(asctime)s'
        '|%(pathname)s|%(lineno)d| %(message)s'),
    datefmt='%Y-%m-%dT%H:%M:%S',
  )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
