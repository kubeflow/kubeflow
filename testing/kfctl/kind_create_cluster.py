"""Run kind create as a pytest.

We use pytest in order to generate a junit_xml file.
"""
import logging
import pytest

from kubeflow.kubeflow.ci import kfctl_kind_util as kind_util
from kubeflow.testing import util

# TODO(swiftdiaries): KinD requirements for running in Prow?
kind_config_path = "https://raw.githubusercontent.com/swiftdiaries/manifests/" \
                    "kfctl_k8s_e2e/kind/kind-config.yaml"
kind_sc_path =  "https://raw.githubusercontent.com/swiftdiaries/manifests/" \
                    "kfctl_k8s_e2e/kind/local-path-storage.yaml"
kind_image_name = "kindest/node:v1.15.0" \
                    "@sha256:b4d092fd2b507843dd096fe6c85d06a27a0cbd740a0b32a880fe61aba24bb478"

def test_create_kind_cluster():
    kind_path = kind_util.download_kind_binary()
    util.run(kind_path, "create", "cluster", "--name=kubeflow_kind","--config="+kind_config_path, 
                "--image="+kind_image_name, "--loglevel=debug")
    kind_util.switch_storage_class()

# def create_gcloud_cluster():
#   project = os.environ("PROJECT")
#   zone = os.environ("ZONE")
#   job_name = os.environ("JOB_NAME")
#   logging.
#   util.run("gcloud", "--project="+project, "container", "clusters", "create", job_name, "--zone="+zone)
  
#   util.run()

if __name__ == "__main__":
  logging.basicConfig(
    level=logging.INFO,
    format=('%(levelname)s|%(asctime)s'
        '|%(pathname)s|%(lineno)d| %(message)s'),
    datefmt='%Y-%m-%dT%H:%M:%S',
  )
  logging.getLogger().setLevel(logging.INFO)
  pytest.main()
