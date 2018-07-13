#!/bin/bash
# deploy_kubeflow_gcp.sh is used for testing the deployment manager
# config at scripts/gke. It takes the following flags:
# NAME, TEST_DIR

set -xe

NAME="${1}"
TEST_DIR="${2}"

if [[ -n "${GOOGLE_APPLICATION_CREDENTIALS}" ]]; then
  gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
fi

cd "${TEST_DIR}"
ln -s src/kubeflow/kubeflow kubeflow_repo
export CLIENT_ID=dummy \
  CLIENT_SECRET=dummy \
  DEPLOYMENT_NAME=${NAME} \
  PROJECT=kubeflow-ci \
  ZONE=us-east1-d \
  SETUP_PROJECT=false \
  SKIP_METRICS_COLLECTION=true \
  IAP_IAM_ENTRY="serviceAccount:kubeflow-testing@kubeflow-ci.iam.gserviceaccount.com"
bash src/kubeflow/kubeflow/scripts/gke/deploy.sh
