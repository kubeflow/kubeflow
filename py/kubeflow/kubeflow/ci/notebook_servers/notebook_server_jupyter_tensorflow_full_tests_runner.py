# This file is only intended for development purposes
from kubeflow.kubeflow.ci import base_runner

base_runner.main(
    component_name="notebook_servers.notebook_server_jupyter_tensorflow_full_tests",  # noqa: E501
    workflow_name="nb-j-tf-f-tests")
