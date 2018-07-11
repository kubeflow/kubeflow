#!/usr/bin/env bash

##
# This utility script can be used to deploy Kubeflow end-to-end.
# A few variables are required and can be set in `env-kubeflow.sh`.
# Detailed instructions can be found at https://www.kubeflow.org/docs/getting-started-gke.
# In summary, update `cluster-kubeflow.yaml`, load required variables
# into environment (optionally from `env-kubeflow.sh`) and execute the script.
# Usage:
#   $ . env-kubeflow.sh
#   $ ./deploy.sh
#

set -xe

# Required Variables
export PROJECT=${PROJECT:-}
export DEPLOYMENT_NAME=${DEPLOYMENT_NAME:-}
export ZONE=${ZONE:-}
export CONFIG_FILE=${CONFIG_FILE:-}
export CLIENT_ID=${CLIENT_ID:-}
export CLIENT_SECRET=${CLIENT_SECRET:-}

# Set to false to skip setting up the project.
export SETUP_PROJECT=${SETUP_PROJECT:true}

if [ -z "${PROJECT}" ] || \
   [ -z "${DEPLOYMENT_NAME}" ] || \
   [ -z "${ZONE}" ] || \
   [ -z "${CONFIG_FILE}" ] || \
   [ -z "${CLIENT_ID}" ] || \
   [ -z "${CLIENT_SECRET}" ]; then
  echo 'Required variables missing. Please check again!'
  exit 1
fi

if [[ ! -f "${CONFIG_FILE}" ]]; then
  echo "Config file ${CONFIG_FILE} does not exist!"
  exit 1
fi

# Computed Variables
export PROJECT_NUMBER=`gcloud projects describe ${PROJECT} --format='value(project_number)'`
export SA_EMAIL=${DEPLOYMENT_NAME}-admin@${PROJECT}.iam.gserviceaccount.com
export USER_EMAIL=${DEPLOYMENT_NAME}-user@${PROJECT}.iam.gserviceaccount.com
export USER_SECRET_NAME=${DEPLOYMENT_NAME}-user
export K8S_ADMIN_NAMESPACE=kubeflow-admin
export K8S_NAMESPACE=kubeflow

# Perform project setup
if ${SETUP_PROJECT}; then
  # Enable GCloud APIs
  gcloud services enable deploymentmanager.googleapis.com \
                         servicemanagement.googleapis.com \
                         iam.googleapis.com --project=${PROJECT}

  # Set IAM Admin Policy
  gcloud projects add-iam-policy-binding ${PROJECT} \
     --member serviceAccount:${PROJECT_NUMBER}@cloudservices.gserviceaccount.com \
     --role roles/resourcemanager.projectIamAdmin
else
  echo skipping project setup
fi

# Check if it already exists
set +e
gcloud deployment-manager --project=${PROJECT} deployments describe ${DEPLOYMENT_NAME}
exists=$?
set -e

if [ ${exists} -eq 0 ]; then
  echo ${DEPLOYMENT_NAME} exists
  gcloud deployment-manager --project=${PROJECT} deployments update ${DEPLOYMENT_NAME} --config=${CONFIG_FILE}  
else
  # Run Deployment Manager
  gcloud deployment-manager --project=${PROJECT} deployments create ${DEPLOYMENT_NAME} --config=${CONFIG_FILE}
fi

# TODO(jlewi): We should name the secrets more consistently based on the service account name.
# We will need to update the component configs though
gcloud --project=${PROJECT} iam service-accounts keys create ${SA_EMAIL}.json --iam-account ${SA_EMAIL}
gcloud --project=${PROJECT} iam service-accounts keys create ${USER_EMAIL}.json --iam-account ${USER_EMAIL}

# Set credentials for kubectl context
gcloud --project=${PROJECT} container clusters get-credentials --zone=${ZONE} ${DEPLOYMENT_NAME}

# Ignore errors from now onwards. If secret/namespace already exists just keep going.
set +e

# The namespace kubeflow may not exist yet because the bootstrapper can't run until the admin-gcp-sa
# secret is created.
kubectl create namespace ${K8S_NAMESPACE}

# We want the secret name to be the same by default for all clusters so that users don't have to set it manually.
kubectl create secret generic --namespace=${K8S_ADMIN_NAMESPACE} admin-gcp-sa --from-file=admin-gcp-sa.json=./${SA_EMAIL}.json
kubectl create secret generic --namespace=${K8S_NAMESPACE} admin-gcp-sa --from-file=admin-gcp-sa.json=./${SA_EMAIL}.json
kubectl create secret generic --namespace=${K8S_NAMESPACE} user-gcp-sa --from-file=user-gcp-sa.json=./${USER_EMAIL}.json
kubectl create secret generic --namespace=${K8S_NAMESPACE} kubeflow-oauth --from-literal=CLIENT_ID=${CLIENT_ID} --from-literal=CLIENT_SECRET=${CLIENT_SECRET}

# Install the GPU driver. It has not effect on non-GPU nodes.
kubectl apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/container-engine-accelerators/stable/nvidia-driver-installer/cos/daemonset-preloaded.yaml

