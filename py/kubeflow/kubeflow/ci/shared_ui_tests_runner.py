# This file is only intended for development purposes
import os

import yaml

from kubeflow.kubeflow.ci import shared_ui_tests

WORKFLOW_NAME = os.getenv("WORKFLOW_NAME", "shared-ui-tests")
WORKFLOW_NAMESPACE = os.getenv("WORKFLOW_NAMESPACE", "kubeflow-user")

if __name__ == "__main__":
    print(yaml.dump(shared_ui_tests.create_workflow(WORKFLOW_NAME,
                                                    WORKFLOW_NAMESPACE)))
