# This file is only intended for development purposes
import os

import yaml

from kubeflow.kubeflow.ci import access_management_tests

WORKFLOW_NAME = os.getenv("WORKFLOW_NAME", "a-man-tests")
WORKFLOW_NAMESPACE = os.getenv("WORKFLOW_NAMESPACE", "kubeflow-user")

if __name__ == "__main__":
    print(yaml.dump(access_management_tests.create_workflow(WORKFLOW_NAME, WORKFLOW_NAMESPACE)))
