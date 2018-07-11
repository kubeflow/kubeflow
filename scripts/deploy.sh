#!/bin/bash
# This script creates a kubeflow deployment on minikube
# It checks for kubectl, ks
# Creates the ksonnet app, installs packages, components and then applies them

set -xe

KUBEFLOW_REPO=${KUBEFLOW_REPO:-"`pwd`/kubeflow_repo"}
KUBEFLOW_VERSION=${KUBEFLOW_VERSION:-"master"}
KUBEFLOW_DEPLOY=${KUBEFLOW_DEPLOY:-true}

if [[ ! -d "${KUBEFLOW_REPO}" ]]; then
  if [ "${KUBEFLOW_VERSION}" == "master" ]; then
	TAG=${KUBEFLOW_VERSION}
  else
  	TAG=v${KUBEFLOW_VERSION}
  fi
  curl -L -o /tmp/kubeflow.${KUBEFLOW_VERSION}.tar.gz https://github.com/kubeflow/kubeflow/archive/${TAG}.tar.gz
  tar -xzvf /tmp/kubeflow.${KUBEFLOW_VERSION}.tar.gz  -C /tmp
  mv /tmp/kubeflow-${TAG} "${KUBEFLOW_REPO}"
fi

source "${KUBEFLOW_REPO}/scripts/util.sh"

# TODO(ankushagarwal): verify ks version is higher than 0.11.0
check_install ks
check_install kubectl

# Name of the deployment
DEPLOYMENT_NAME=${DEPLOYMENT_NAME:-"kubeflow"}

KUBEFLOW_KS_DIR=${KUBEFLOW_KS_DIR:-"`pwd`/${DEPLOYMENT_NAME}_ks_app"}

cd $(dirname "${KUBEFLOW_KS_DIR}")
ks init $(basename "${KUBEFLOW_KS_DIR}")
cd "${KUBEFLOW_KS_DIR}"

# Add the local registry
ks registry add kubeflow "${KUBEFLOW_REPO}/kubeflow"

# Install packages
ks pkg install kubeflow/argo
ks pkg install kubeflow/core
ks pkg install kubeflow/examples
ks pkg install kubeflow/katib
ks pkg install kubeflow/mpi-job
ks pkg install kubeflow/pytorch-job
ks pkg install kubeflow/seldon
ks pkg install kubeflow/tf-serving

# Generate all required components
ks generate kubeflow-core kubeflow-core

# Enable collection of anonymous usage metrics
# Skip this step if you don't want to enable collection.
ks param set kubeflow-core reportUsage true
ks param set kubeflow-core usageId $(uuidgen)

# Apply the components generated
if ${KUBEFLOW_DEPLOY}; then
  ks apply default
fi
