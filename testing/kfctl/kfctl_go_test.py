import json
import logging
import os
import subprocess
import requests
import uuid
from retrying import retry
import six

from kubernetes.config import kube_config
from kubernetes import client as k8s_client

import datetime
import tempfile
import pytest

from kubeflow.testing import util

def test_build_kfctl_go(app_path, project):
  if not app_path:
    logging.info("--app_path not specified")
    stamp = datetime.datetime.now().strftime("%H%M")
    app_path = os.path.join(tempfile.gettempdir(),
                            "kfctl-{0}-{1}".format(stamp,
                                                   uuid.uuid4().hex[0:4]))
  logging.info("Using app path %s", app_path)
  this_dir = os.path.dirname(__file__)
  root = os.path.abspath(os.path.join(this_dir, "..", ".."))
  build_dir = os.path.join(root, "bootstrap")
  util.run(["make", "build-kfctl"], cwd=build_dir)

  kfctl_path = os.path.join(build_dir, "bin", "kfctl")

  util.run([kfctl_path, "init", app_path, "-V", "--platform=gcp",
            "--use_basic_auth", "--skip-init-gcp-project",
            "--project=" + project])

  util.run([kfctl_path, "generate", "-V", "all", "--email=test@kubeflow.org"],
            cwd=app_path)

  util.run([kfctl_path, "apply", "-V", "all"], cwd=app_path)

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO,
                      format=('%(levelname)s|%(asctime)s'
                              '|%(pathname)s|%(lineno)d| %(message)s'),
                      datefmt='%Y-%m-%dT%H:%M:%S',
                      )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()