#!/bin/bash
# teardown_kubeflow_gcp.sh is used to delete the
# kubeflow deployment on GCP using deployment manager

set -xe

NAME="${1}"
TEST_DIR="${2}"

if [[ -n "${GOOGLE_APPLICATION_CREDENTIALS}" ]]; then
  gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
fi

cd "${TEST_DIR}"

export DEPLOYMENT_NAME=${NAME} \
  PROJECT=kubeflow-ci \
  ZONE=us-east1-d

bash src/kubeflow/kubeflow/scripts/gke/teardown.sh
