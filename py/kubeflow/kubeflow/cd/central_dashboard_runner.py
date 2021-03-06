# This file is only intended for development purposes
import os

import yaml

from kubeflow.kubeflow.cd import central_dashboard

WORKFLOW_NAME = os.getenv("WORKFLOW_NAME", "central-dashboard-build")
WORKFLOW_NAMESPACE = os.getenv("WORKFLOW_NAMESPACE", "kubeflow-user")

if __name__ == "__main__":
    print(yaml.dump(central_dashboard.create_workflow(WORKFLOW_NAME, WORKFLOW_NAMESPACE)))
