"""Run kind delete as a pytest.

We use pytest in order to generate a junit_xml file.
"""
import datetime
import logging
import os
import subprocess
import tempfile
import uuid
from retrying import retry

import pytest
import docker

from kubeflow.testing import util

def delete_kind_cluster():
    kind_path = download_kind_binary()
    util.run(kind_path, "delete", "cluster","--name=kubeflow_kind")

if __name__ == "__main__":
  logging.basicConfig(
    level=logging.INFO,
    format=('%(levelname)s|%(asctime)s'
        '|%(pathname)s|%(lineno)d| %(message)s'),
    datefmt='%Y-%m-%dT%H:%M:%S',
  )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
