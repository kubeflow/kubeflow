"""Run kind create as a pytest.

We use pytest in order to generate a junit_xml file.
"""
import datetime
import logging
import os
import subprocess
import tempfile
import uuid
import os
from retrying import retry

import pytest

from kubeflow.testing import util

# TODO(swiftdiaries): switch repos once tests pass and PR is merged.
kind_config_path = "https://raw.githubusercontent.com/swiftdiaries/manifests/" \
                    "kfctl_k8s_e2e/kind/kind-config.yaml"
kind_sc_path =  "https://raw.githubusercontent.com/swiftdiaries/manifests/" \
                    "kfctl_k8s_e2e/kind/local-path-storage.yaml"
kind_image_name = "kindest/node:v1.15.0" \
                    "@sha256:b4d092fd2b507843dd096fe6c85d06a27a0cbd740a0b32a880fe61aba24bb478"
kind_sc_patch = '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'

def download_kind_binary():
    uname = os.uname().sysname
    util.run("curl", "-Lo", "./kind", "https://github.com/kubernetes-sigs/kind/"
                "releases/download/v0.5.0/kind-"+uname+"-amd64")
    util.run("chmod", "+x", "./kind")
    kind_path = os.getcwd() + "/kubernetes-in-docker"
    util.run("mv", "./kind", kind_path)
    return kind_path

def switch_storage_class():
  util.run("kubectl", "delete", "sc", "standard")
  util.run("kubectl", "apply", "-f", kind_sc_path)
  util.run("kubectl", "patch", "sc", "local-path", "-p", kind_sc_patch)

def create_kind_cluster():
    kind_path = download_kind_binary()
    util.run(kind_path, "create", "cluster", "--name=kubeflow_kind","--config="+kind_config_path, 
                "--image="+kind_image_name, "--loglevel=debug")
    switch_storage_class()

if __name__ == "__main__":
  logging.basicConfig(
    level=logging.INFO,
    format=('%(levelname)s|%(asctime)s'
        '|%(pathname)s|%(lineno)d| %(message)s'),
    datefmt='%Y-%m-%dT%H:%M:%S',
  )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
