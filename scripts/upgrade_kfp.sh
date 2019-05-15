#!/usr/bin/env bash

# This script upgrade the pipeline to the latest version.
# To use the script, call
#

set -xe

export KUBEFLOW_KS_DIR=${KUBEFLOW_KS_DIR:-"$(pwd)/ks_app"}

pushd ${KUBEFLOW_KS_DIR}

set +e
# Point Kubeflow registry to the pipeline branch
# Ksonnet doesn't allow registry name to be different from the import path
# https://github.com/ksonnet/ksonnet/issues/791 so we can't do
# ks registry add kfp https://github.com/kubeflow/kubeflow/tree/pipelines/kubeflow
ks registry add --override kubeflow https://github.com/kubeflow/kubeflow/tree/pipelines/kubeflow
set -e

# Remove old package and component in order to install new package and import new parameters
ks pkg remove kubeflow/pipeline

# export GITHUB_TOKEN=[token]if hit rate limit
if [ -z "$1" ]
  then
    # use HEAD
    ks pkg install kubeflow/pipeline
  else
    # use user provided commit id
    ks pkg install kubeflow/pipeline@$1
fi

# Regenerate pipeline ksonnet component and recover default environment parameter
ks apply default -c pipeline

popd
