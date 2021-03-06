# This file is only intended for development purposes
import os

import yaml

from kubeflow.kubeflow.ci import notebook_controller_tests

WORKFLOW_NAME = os.getenv("WORKFLOW_NAME", "nb-c-tests")
WORKFLOW_NAMESPACE = os.getenv("WORKFLOW_NAMESPACE", "kubeflow-user")

if __name__ == "__main__":
    print(yaml.dump(notebook_controller_tests.create_workflow(WORKFLOW_NAME, WORKFLOW_NAMESPACE)))
