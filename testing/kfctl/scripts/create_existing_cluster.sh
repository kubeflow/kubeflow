#!/bin/bash

set -e

export PROJECT="kubeflow-ci"
export GCP_ZONE="us-central1-a"
export GCP_USER="$(gcloud config list account --format "value(core.account)" )"
export GCP_PROJECT="$(gcloud config list project --format "value(core.project)" )"
export CLUSTER_NAME="kfctl-arr-${REPO_NAME}-${BUILD_ID}"
export CLUSTER_VERSION="$(gcloud container get-server-config --zone=${GCP_ZONE} --format="value(validMasterVersions[0])" )"

############################
# Create and setup cluster #
############################

gcloud container clusters create "${CLUSTER_NAME}" \
--project "${GCP_PROJECT}" \
--zone "${GCP_ZONE}" \
--username "admin" \
--cluster-version "${CLUSTER_VERSION}" \
--machine-type "custom-6-23040" --num-nodes "1" \
--image-type "UBUNTU" \
--local-ssd-count=4 \
--disk-type "pd-ssd" --disk-size "50" \
--no-enable-cloud-logging --no-enable-cloud-monitoring \
--no-enable-ip-alias \
--enable-network-policy \
--enable-autoupgrade --enable-autorepair

echo "Getting credentials for newly created cluster..."
gcloud container clusters get-credentials "${CLUSTER_NAME}" --zone="${GCP_ZONE}"

echo "Setting up GKE RBAC..."
kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin --user="${GCP_USER}"