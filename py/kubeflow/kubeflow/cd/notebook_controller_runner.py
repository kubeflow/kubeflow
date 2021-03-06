# This file is only intended for development purposes
import os

import yaml

from kubeflow.kubeflow.cd import notebook_controller

WORKFLOW_NAME = os.getenv("WORKFLOW_NAME", "notebook-controller-build")
WORKFLOW_NAMESPACE = os.getenv("WORKFLOW_NAMESPACE", "kubeflow-user")

if __name__ == "__main__":
    print(yaml.dump(notebook_controller.create_workflow(WORKFLOW_NAME, WORKFLOW_NAMESPACE)))
