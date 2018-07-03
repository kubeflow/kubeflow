#!/bin/bash

set -xe


SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "${SCRIPT_DIR}/../util.sh"

check_install ks
check_install kubectl

KUBEFLOW_REPO=$(cd "${SCRIPT_DIR}/../.."; pwd)
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
