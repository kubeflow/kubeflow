# This file is only intended for development purposes
import os

import yaml

from kubeflow.kubeflow.cd import twa

WORKFLOW_NAME = os.getenv("WORKFLOW_NAME", "twa-build")
WORKFLOW_NAMESPACE = os.getenv("WORKFLOW_NAMESPACE", "kubeflow-user")

if __name__ == "__main__":
    print(yaml.dump(twa.create_workflow(WORKFLOW_NAME, WORKFLOW_NAMESPACE)))
