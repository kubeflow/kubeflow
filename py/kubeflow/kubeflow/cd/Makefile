# This file is only intended for development purposes

# change this env var based on where kubeflow/testing repo lives
# in your local machine
KUBEFLOW_TESTING_REPO ?= /tmp/kubeflow/testing
KUBEFLOW_KUBEFLOW_REPO ?= /tmp/kubeflow/kubeflow
PYTHONPATH ?= "${KUBEFLOW_KUBEFLOW_REPO}/py:${KUBEFLOW_TESTING_REPO}/py"

check-local-jwa-kaniko-build:
	@PYTHONPATH=${PYTHONPATH} \
	LOCAL_TESTING=True \
	python jwa_runner.py

check-prod-jwa-kaniko-build:
	@PYTHONPATH=${PYTHONPATH} \
	python jwa_runner.py
