#!/bin/bash
# This script creates a kubeflow deployment on GCP
# It checks for kubectl, gcloud, ks
# Uses default PROJECT, ZONE, EMAIL from gcloud config
# Creates a deployment manager config copy and edits appropriate values
# Adds user to the IAP role
# Creates the deployment
# Creates the ksonnet app, installs packages, components and then applies them

set -xe

KUBEFLOW_REPO=${KUBEFLOW_REPO:-"`pwd`/kubeflow_repo"}
KUBEFLOW_VERSION=${KUBEFLOW_VERSION:-"master"}
KUBEFLOW_DEPLOY=${KUBEFLOW_DEPLOY:-true}
KUBEFLOW_CLOUD="gke"

if [[ ! -d "${KUBEFLOW_REPO}" ]]; then
  if [ "${KUBEFLOW_VERSION}" == "master" ]; then
    TAG=${KUBEFLOW_VERSION}
  else
    TAG=v${KUBEFLOW_VERSION}
  fi
  TMPDIR=$(mktemp -d /tmp/tmp.kubeflow-repo-XXXX)
  curl -L -o ${TMPDIR}/kubeflow.tar.gz https://github.com/kubeflow/kubeflow/archive/${TAG}.tar.gz
  tar -xzvf ${TMPDIR}/kubeflow.tar.gz  -C ${TMPDIR}
  # GitHub seems to strip out the v in the file name.
  SOURCE_DIR=$(find ${TMPDIR} -maxdepth 1 -type d -name "kubeflow*")
  mv ${SOURCE_DIR} "${KUBEFLOW_REPO}"
fi

source "${KUBEFLOW_REPO}/scripts/util.sh"

check_install gcloud
check_install kubectl
# TODO(ankushagarwal): verify ks version is higher than 0.11.0
check_install ks
check_install uuidgen

PRIVATE_CLUSTER=${PRIVATE_CLUSTER:-false}

if ! ${PRIVATE_CLUSTER}; then
  check_variable "${CLIENT_ID}" "CLIENT_ID"
  check_variable "${CLIENT_SECRET}" "CLIENT_SECRET"
fi

# Name of the deployment
DEPLOYMENT_NAME=${DEPLOYMENT_NAME:-"kubeflow"}
GCFS_INSTANCE=${GCFS_INSTANCE:-"${DEPLOYMENT_NAME}"}
GCFS_STORAGE=${GCFS_STORAGE:-"1T"}
# Kubeflow directories - Deployment Manager and Ksonnet App
KUBEFLOW_DM_DIR=${KUBEFLOW_DM_DIR:-"`pwd`/${DEPLOYMENT_NAME}_deployment_manager_configs"}
KUBEFLOW_KS_DIR=${KUBEFLOW_KS_DIR:-"`pwd`/${DEPLOYMENT_NAME}_ks_app"}
# GCP Project
PROJECT=${PROJECT:-$(gcloud config get-value project 2>/dev/null)}
check_variable "${PROJECT}" "PROJECT"
# GCP Zone
ZONE=${ZONE:-$(gcloud config get-value compute/zone 2>/dev/null)}
ZONE=${ZONE:-"us-central1-a"}
# Email for cert manager
EMAIL=${EMAIL:-$(gcloud config get-value account 2>/dev/null)}
check_variable "${EMAIL}" "EMAIL"
# GCP Static IP Name
KUBEFLOW_IP_NAME=${KUBEFLOW_IP_NAME:-"${DEPLOYMENT_NAME}-ip"}
# Name of the endpoint
KUBEFLOW_ENDPOINT_NAME=${KUBEFLOW_ENDPOINT_NAME:-"${DEPLOYMENT_NAME}"}
# Complete hostname
KUBEFLOW_HOSTNAME=${KUBEFLOW_HOSTNAME:-"${KUBEFLOW_ENDPOINT_NAME}.endpoints.${PROJECT}.cloud.goog"}
# Whether to setup the project. Set to false to skip setting up the project.
SETUP_PROJECT=${SETUP_PROJECT:true}
# Namespace where kubeflow is deployed
K8S_NAMESPACE=${K8S_NAMESPACE:-"kubeflow"}
CONFIG_FILE=${CONFIG_FILE:-"cluster-kubeflow.yaml"}

if [ -z "${PROJECT_NUMBER}" ]; then
  PROJECT_NUMBER=`gcloud projects describe ${PROJECT} --format='value(project_number)'`
fi

ADMIN_EMAIL=${DEPLOYMENT_NAME}-admin@${PROJECT}.iam.gserviceaccount.com
USER_EMAIL=${DEPLOYMENT_NAME}-user@${PROJECT}.iam.gserviceaccount.com
COLLECT_METRICS=${COLLECT_METRICS:-true}
if ${SETUP_PROJECT}; then
  # Enable GCloud APIs
  gcloud services enable deploymentmanager.googleapis.com \
                         servicemanagement.googleapis.com \
                         container.googleapis.com \
                         cloudresourcemanager.googleapis.com \
                         endpoints.googleapis.com \
                         file.googleapis.com \
                         iam.googleapis.com --project=${PROJECT}

  # Set IAM Admin Policy
  gcloud projects add-iam-policy-binding ${PROJECT} \
     --member serviceAccount:${PROJECT_NUMBER}@cloudservices.gserviceaccount.com \
     --role roles/resourcemanager.projectIamAdmin
else
  echo skipping project setup
fi
IAP_IAM_ENTRY=${IAP_IAM_ENTRY:-"user:${EMAIL}"}
# Create the DM configs if they don't exists
if [ ! -d "${KUBEFLOW_DM_DIR}" ]; then
  echo creating Deployment Manager configs in directory "${KUBEFLOW_DM_DIR}"
  cp -r "${KUBEFLOW_REPO}/scripts/gke/deployment_manager_configs" "${KUBEFLOW_DM_DIR}"
  # Set values in DM config file
  sed -i.bak "s/zone: us-central1-a/zone: ${ZONE}/" "${KUBEFLOW_DM_DIR}/${CONFIG_FILE}"
  sed -i.bak "s/users:/users: [\"${IAP_IAM_ENTRY}\"]/" "${KUBEFLOW_DM_DIR}/${CONFIG_FILE}"
  sed -i.bak "s/ipName: kubeflow-ip/ipName: ${KUBEFLOW_IP_NAME}/" "${KUBEFLOW_DM_DIR}/${CONFIG_FILE}"
  if ${PRIVATE_CLUSTER}; then
    sed -i.bak "s/gkeApiVersion: v1/gkeApiVersion: v1beta1/" "${KUBEFLOW_DM_DIR}/${CONFIG_FILE}"
    sed -i.bak "s/privatecluster: false/privatecluster: true/" "${KUBEFLOW_DM_DIR}/${CONFIG_FILE}"
  fi
  rm "${KUBEFLOW_DM_DIR}/${CONFIG_FILE}.bak"
else
  echo Deployment Manager configs already exist in directory "${KUBEFLOW_DM_DIR}"
fi
cd "${KUBEFLOW_DM_DIR}"

# Create GCFS Instance in parallel with deployment manager to speed things up
gcloud beta filestore instances create ${GCFS_INSTANCE} \
    --project=${PROJECT} \
    --location=${ZONE} \
    --tier=STANDARD \
    --file-share=name=kubeflow,capacity=${GCFS_STORAGE} \
    --network=name="default" &

gcfs_creation_pid=$!

if ${KUBEFLOW_DEPLOY}; then
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
  gcloud --project=${PROJECT} iam service-accounts keys create ${ADMIN_EMAIL}.json --iam-account ${ADMIN_EMAIL}
  gcloud --project=${PROJECT} iam service-accounts keys create ${USER_EMAIL}.json --iam-account ${USER_EMAIL}

  # Set credentials for kubectl context
  gcloud --project=${PROJECT} container clusters get-credentials --zone=${ZONE} ${DEPLOYMENT_NAME}

  # Make yourself cluster admin
  kubectl create clusterrolebinding default-admin --clusterrole=cluster-admin --user=${EMAIL}

  kubectl create namespace ${K8S_NAMESPACE}

  # We want the secret name to be the same by default for all clusters so that users don't have to set it manually.
  kubectl create secret generic --namespace=${K8S_NAMESPACE} admin-gcp-sa --from-file=admin-gcp-sa.json=./${ADMIN_EMAIL}.json
  kubectl create secret generic --namespace=${K8S_NAMESPACE} user-gcp-sa --from-file=user-gcp-sa.json=./${USER_EMAIL}.json
  kubectl create secret generic --namespace=${K8S_NAMESPACE} kubeflow-oauth --from-literal=CLIENT_ID=${CLIENT_ID} --from-literal=CLIENT_SECRET=${CLIENT_SECRET}

  # Install the GPU driver. It has no effect on non-GPU nodes.
  kubectl apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/container-engine-accelerators/stable/nvidia-driver-installer/cos/daemonset-preloaded.yaml
fi

# wait for gcfs creation to complete
wait ${gcfs_creation_pid}

GCFS_INSTANCE_IP_ADDRESS=$(gcloud beta filestore instances describe \
 ${GCFS_INSTANCE} --location ${ZONE} | \
 grep --after-context=1 ipAddresses | \
 tail -1 | \
 awk '{print $2}')

# Create the ksonnet app
cd $(dirname "${KUBEFLOW_KS_DIR}")
ks init $(basename "${KUBEFLOW_KS_DIR}")
cd "${KUBEFLOW_KS_DIR}"

ks env set default --namespace "${K8S_NAMESPACE}"
# Add the local registry
ks registry add kubeflow "${KUBEFLOW_REPO}/kubeflow"

# Install all required packages
ks pkg install kubeflow/argo
ks pkg install kubeflow/core
ks pkg install kubeflow/examples
ks pkg install kubeflow/katib
ks pkg install kubeflow/mpi-job
ks pkg install kubeflow/pytorch-job
ks pkg install kubeflow/seldon
ks pkg install kubeflow/tf-serving

# Generate all required components
ks generate google-cloud-filestore-pv google-cloud-filestore-pv --name="kubeflow-gcfs" --storageCapacity="${GCFS_STORAGE}" --serverIP="${GCFS_INSTANCE_IP_ADDRESS}"
ks generate pytorch-operator pytorch-operator
ks generate ambassador ambassador --ambassadorImage="gcr.io/kubeflow-images-public/ambassador:0.30.1" --statsdImage="gcr.io/kubeflow-images-public/statsd:0.30.1" --cloud=${KUBEFLOW_CLOUD}
ks generate jupyterhub jupyterhub --cloud=${KUBEFLOW_CLOUD} --disks="kubeflow-gcfs"
ks generate centraldashboard centraldashboard
ks generate tf-job-operator tf-job-operator

ks generate argo argo

if ! ${PRIVATE_CLUSTER}; then
  # Enable collection of anonymous usage metrics
  # Skip this step if you don't want to enable collection.
  ks generate spartakus spartakus --usageId=$(uuidgen) --reportUsage=${COLLECT_METRICS}
  ks generate cloud-endpoints cloud-endpoints
  ks generate cert-manager cert-manager --acmeEmail=${EMAIL}
  ks generate iap-ingress iap-ingress --ipName=${KUBEFLOW_IP_NAME} --hostname=${KUBEFLOW_HOSTNAME}
  ks param set jupyterhub jupyterHubAuthenticator iap
fi
# Apply the components generated
if ${KUBEFLOW_DEPLOY}; then
  ks apply default -c google-cloud-filestore-pv
  ks apply default -c ambassador
  ks apply default -c jupyterhub
  ks apply default -c centraldashboard
  ks apply default -c tf-job-operator
  ks apply default -c argo
  if ! ${PRIVATE_CLUSTER}; then
    ks apply default -c spartakus
    ks apply default -c cloud-endpoints
    ks apply default -c cert-manager
    ks apply default -c iap-ingress
  fi
  ks apply default -c pytorch-operator
fi
