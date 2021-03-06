# This file is only intended for development purposes
import os

import yaml

from kubeflow.kubeflow.ci import admission_webhook_tests

WORKFLOW_NAME = os.getenv("WORKFLOW_NAME", "ad-wh-tests")
WORKFLOW_NAMESPACE = os.getenv("WORKFLOW_NAMESPACE", "kubeflow-user")

if __name__ == "__main__":
    print(yaml.dump(admission_webhook_tests.create_workflow(WORKFLOW_NAME,
                                                    WORKFLOW_NAMESPACE)))
