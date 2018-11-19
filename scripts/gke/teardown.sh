#!/usr/bin/env bash

set -xe

# TODO(jlewi): delete deploy.sh after updating the E2E test to use
# kfctl.sh
echo "WARNING teardown.sh is deprecated; use kfctl.sh"

DEPLOYMENT_NAME=${DEPLOYMENT_NAME:-"kubeflow"}
CONFIG_FILE=${CONFIG_FILE:-"cluster-kubeflow.yaml"}
PROJECT=${PROJECT:-$(gcloud config get-value project 2>/dev/null)}
KUBEFLOW_DM_DIR=${KUBEFLOW_DM_DIR:-"$(pwd)/${DEPLOYMENT_NAME}_deployment_manager_configs"}
GCFS_INSTANCE=${GCFS_INSTANCE:-"${DEPLOYMENT_NAME}"}
# GCP Zone
ZONE=${ZONE:-$(gcloud config get-value compute/zone 2>/dev/null)}
ZONE=${ZONE:-"us-central1-a"}

cd "${KUBEFLOW_DM_DIR}"

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

# We need to run an update because for deleting IAM roles,
# we need to obtain a fresh copy of the IAM policy. A stale
# copy of IAM policy causes issues during deletion.
gcloud deployment-manager deployments update \
  ${DEPLOYMENT_NAME} --config=${CONFIG_FILE} --project=${PROJECT}

gcloud deployment-manager deployments delete --quiet \
  ${DEPLOYMENT_NAME} --project=${PROJECT}

gcloud beta filestore instances delete ${GCFS_INSTANCE} \
  --project=${PROJECT} \
  --location=${ZONE} \
  --quiet
