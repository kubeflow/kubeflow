#!/bin/bash
# deploy_kubeflow_gcp.sh is used for testing the deployment manager
# config at scripts/gke. It takes the following flags:
# NAME, TEST_DIR

set -x

NAME="${1}"
TEST_DIR="${2}"

if [[ -n "${GOOGLE_APPLICATION_CREDENTIALS}" ]]; then
  gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
fi

cd "${TEST_DIR}"

export CLIENT_ID=dummy \
  CLIENT_SECRET=dummy \
  DEPLOYMENT_NAME=${NAME} \
  PROJECT=kubeflow-ci \
  ZONE=us-east1-d \
  KUBEFLOW_REPO="${TEST_DIR}/src/kubeflow/kubeflow" \
  SETUP_PROJECT=false \
  COLLECT_METRICS=false \
  IAP_IAM_ENTRY="serviceAccount:kubeflow-testing@kubeflow-ci.iam.gserviceaccount.com"

bash src/kubeflow/kubeflow/scripts/gke/deploy.sh

# If deploy.sh fails, tear down deployment so that it can be retried

if [[ $? -gt 0 ]]; then
  bash src/kubeflow/kubeflow/scripts/gke/teardown.sh
  rm -rf "${TEST_DIR}/${DEPLOYMENT_NAME}_deployment_manager_configs"
  rm -rf "${TEST_DIR}/${DEPLOYMENT_NAME}_ks_app"
fi
