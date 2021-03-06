# This file is only intended for development purposes
import os

import yaml

from kubeflow.kubeflow.cd import access_management

WORKFLOW_NAME = os.getenv("WORKFLOW_NAME", "access-management-build")
WORKFLOW_NAMESPACE = os.getenv("WORKFLOW_NAMESPACE", "kubeflow-user")

if __name__ == "__main__":
    print(yaml.dump(access_management.create_workflow(WORKFLOW_NAME, WORKFLOW_NAMESPACE)))
