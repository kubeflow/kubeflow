# This file is only intended for development purposes
import os

import yaml

from kubeflow.kubeflow.cd import tensorboard_controller

WORKFLOW_NAME = os.getenv("WORKFLOW_NAME", "ten-c-build")
WORKFLOW_NAMESPACE = os.getenv("WORKFLOW_NAMESPACE", "kubeflow-user")

if __name__ == "__main__":
    print(yaml.dump(tensorboard_controller.create_workflow(WORKFLOW_NAME, WORKFLOW_NAMESPACE)))
