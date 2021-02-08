# This file is only intended for development purposes

# change this env var based on where kubeflow/testing repo lives
# in your local machine
KUBEFLOW_TESTING_REPO ?= /tmp/kubeflow/testing
KUBEFLOW_KUBEFLOW_REPO ?= /tmp/kubeflow/kubeflow
PYTHONPATH ?= "${KUBEFLOW_KUBEFLOW_REPO}/py:${KUBEFLOW_TESTING_REPO}/py"

check-local-shared-ui-tests:
	PYTHONPATH=${PYTHONPATH} \
	LOCAL_TESTING=True \
	python shared_ui_tests_runner.py

check-prod-shared-ui-tests:
	PYTHONPATH=${PYTHONPATH} \
	python shared_ui_tests_runner.py
