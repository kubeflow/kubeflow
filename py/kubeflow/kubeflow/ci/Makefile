# This file is only intended for development purposes

# change this env var based on where kubeflow/testing repo lives
# in your local machine
KUBEFLOW_TESTING_REPO ?= /tmp/kubeflow/testing
KUBEFLOW_KUBEFLOW_REPO ?= /tmp/kubeflow/kubeflow
PYTHONPATH ?= "${KUBEFLOW_KUBEFLOW_REPO}/py:${KUBEFLOW_TESTING_REPO}/py"

check-local-common-ui-tests:
	PYTHONPATH=${PYTHONPATH} \
	LOCAL_TESTING=True \
	python common_ui_tests_runner.py

check-prod-common-ui-tests:
	PYTHONPATH=${PYTHONPATH} \
	python common_ui_tests_runner.py

check-local-access-management-tests:
	PYTHONPATH=${PYTHONPATH} \
	LOCAL_TESTING=True \
	python access_management_tests_runner.py

check-prod-access-management-tests:
	PYTHONPATH=${PYTHONPATH} \
	python access_management_tests_runner.py

check-local-admission-webhook-tests:
	PYTHONPATH=${PYTHONPATH} \
	LOCAL_TESTING=True \
	python admission_webhook_tests_runner.py

check-prod-admission-webhook-tests:
	PYTHONPATH=${PYTHONPATH} \
	python admission_webhook_tests_runner.py

check-local-central-dashboard-tests:
	PYTHONPATH=${PYTHONPATH} \
	LOCAL_TESTING=True \
	python central_dashboard_tests_runner.py

check-prod-central-dashboard-tests:
	PYTHONPATH=${PYTHONPATH} \
	python central_dashboard_tests_runner.py

check-local-jwa-tests:
	PYTHONPATH=${PYTHONPATH} \
	LOCAL_TESTING=True \
	python jwa_tests_runner.py

check-prod-jwa-tests:
	PYTHONPATH=${PYTHONPATH} \
	python jwa_tests_runner.py

check-local-notebook-controller-tests:
	PYTHONPATH=${PYTHONPATH} \
	LOCAL_TESTING=True \
	python notebook_controller_tests_runner.py

check-prod-notebook-controller-tests:
	PYTHONPATH=${PYTHONPATH} \
	python notebook_controller_tests_runner.py

check-local-profile-controller-tests:
	PYTHONPATH=${PYTHONPATH} \
	LOCAL_TESTING=True \
	python profile_controller_tests_runner.py

check-prod-profile-controller-tests:
	PYTHONPATH=${PYTHONPATH} \
	python profile_controller_tests_runner.py

check-local-tensorboard-controller-tests:
	PYTHONPATH=${PYTHONPATH} \
	LOCAL_TESTING=True \
	python tensorboard_controller_tests_runner.py

check-prod-tensorboard-controller-tests:
	PYTHONPATH=${PYTHONPATH} \
	python tensorboard_controller_tests_runner.py

check-local-twa-tests:
	PYTHONPATH=${PYTHONPATH} \
	LOCAL_TESTING=True \
	python twa_tests_runner.py

check-prod-twa-tests:
	PYTHONPATH=${PYTHONPATH} \
	python twa_tests_runner.py

check-local-vwa-tests:
	PYTHONPATH=${PYTHONPATH} \
	LOCAL_TESTING=True \
	python vwa_tests_runner.py

check-prod-vwa-tests:
	PYTHONPATH=${PYTHONPATH} \
	python vwa_tests_runner.py
