import json
import logging
import os
import subprocess
import requests
from retrying import retry
import six

from kubernetes.config import kube_config
from kubernetes import client as k8s_client

import pytest

from kubeflow.testing import util

def test_build_kfctl_go():
  this_dir = os.path.dirname(__file__)
  root = os.path.abspath(os.path.join(this_dir, "..", ".."))
  build_dir = os.path.join(root, "bootstrap")
  util.run(["make", "build-kfctl"], cwd=build_dir)

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()