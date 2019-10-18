"""Run kind create as a pytest.

We use pytest in order to generate a junit_xml file.
"""
import logging
import pytest

from kubeflow.testing import util

def test_create_kind_cluster():
  # Install KinD
  install_kind = os.path.join(
      os.path.dirname(__file__), "install_kind.sh")

if __name__ == "__main__":
  logging.basicConfig(
    level=logging.INFO,
    format=('%(levelname)s|%(asctime)s'
        '|%(pathname)s|%(lineno)d| %(message)s'),
    datefmt='%Y-%m-%dT%H:%M:%S',
  )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
