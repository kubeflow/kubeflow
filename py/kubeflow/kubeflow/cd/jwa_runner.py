# This file is only intended for development purposes
import os

import yaml

from kubeflow.kubeflow.cd import jwa

WORKFLOW_NAME = os.getenv("WORKFLOW_NAME", "jwa-build")
WORKFLOW_NAMESPACE = os.getenv("WORKFLOW_NAMESPACE", "kubeflow-user")

if __name__ == "__main__":
    print(yaml.dump(jwa.create_workflow(WORKFLOW_NAME, WORKFLOW_NAMESPACE)))
