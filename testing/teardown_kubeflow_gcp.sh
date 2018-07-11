#!/bin/bash
# teardown_kubeflow_gcp.sh is used to delete the
# kubeflow deployment on GCP using deployment manager

set -xe
DEPLOYMENT_NAME="${1}"
CONFIG_FILE="${2}"
PROJECT="${3}"

if [[ -n "${GOOGLE_APPLICATION_CREDENTIALS}" ]]; then
  gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
fi

# Delete kubeflow namespace - this deletes all the ingress objects
# in the namespace which deletes the associated GCP resources
set +e
kubectl delete ns/kubeflow
while kubectl get ns/kubeflow; do
  echo "kubeflow namespace not yet deleted. sleeping 10 seconds..."
  sleep 10
done
echo "kubeflow namespace successfully deleted."
set -e
# Add a jitter to reduce the chance of deployments updating at the same time
# since tests are run in parallel
sleep $((${RANDOM} % 30))

# We need to run an update because for deleting IAM roles,
# we need to obtain a fresh copy of the IAM policy. A stale
# copy of IAM policy causes issues during deletion.
gcloud deployment-manager deployments update \
 ${DEPLOYMENT_NAME} --config=${CONFIG_FILE} --project=${PROJECT}

gcloud deployment-manager deployments delete --quiet \
 ${DEPLOYMENT_NAME} --project=${PROJECT}
