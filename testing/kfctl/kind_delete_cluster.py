"""Run kind delete as a pytest.

We use pytest in order to generate a junit_xml file.
"""
import logging
import pytest

from kubeflow.kubeflow.ci import kfctl_kind_util as kind_util
from kubeflow.testing import util

def test_delete_kind_cluster():
    kind_path = kind_util.download_kind_binary()
    util.run([kind_path, "delete", "cluster","--name=kubeflow_kind"])

if __name__ == "__main__":
  logging.basicConfig(
    level=logging.INFO,
    format=('%(levelname)s|%(asctime)s'
        '|%(pathname)s|%(lineno)d| %(message)s'),
    datefmt='%Y-%m-%dT%H:%M:%S',
  )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
