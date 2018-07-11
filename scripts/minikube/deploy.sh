#!/bin/bash
# This script creates a kubeflow deployment on minikube
# It checks for kubectl, ks
# Creates the ksonnet app, installs packages, components and then applies them

set -xe

KUBEFLOW_REPO=${KUBEFLOW_REPO:-"`pwd`/kubeflow_repo"}
KUBEFLOW_VERSION=${KUBEFLOW_VERSION:-"master"}

if [[ ! -d "${KUBEFLOW_REPO}" ]]; then
  git clone https://github.com/kubeflow/kubeflow.git "${KUBEFLOW_REPO}"
  cd "${KUBEFLOW_REPO}"
  git checkout "${KUBEFLOW_VERSION}"
  cd -
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

# Install all required packages
ks pkg install kubeflow/core

# Generate all required components
ks generate kubeflow-core kubeflow-core

# Apply the components generated
ks apply default
