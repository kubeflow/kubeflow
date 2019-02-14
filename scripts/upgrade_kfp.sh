#!/usr/bin/env bash

# This script upgrade the pipeline to the latest version.

set -xe

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
ENV_FILE="env.sh"

source ${ENV_FILE}
export KUBEFLOW_KS_DIR=${KUBEFLOW_KS_DIR:-"$(pwd)/ks_app"}

pushd ${KUBEFLOW_KS_DIR}

cp environments/default/params.libsonnet environments/default/params_tmp.libsonnet

set +e
# Add the kubeflow pipeline branch as a registry
# ??? ks registry add kfp https://github.com/kubeflow/kubeflow/tree/pipelines/kubeflow
ks registry add --override kubeflow https://github.com/kubeflow/kubeflow/tree/pipelines/kubeflow
set -e

ks pkg remove kubeflow/pipeline
ks component rm pipeline

# export GITHUB_TOKEN=[token]if hit rate limit
# or ks pkg install kubeflow/pipeline@hash_for_specific_version
ks pkg install kubeflow/pipeline@64a7c55ea8a9b3732a3bba6d25057f5dbf301cfa
ks generate pipeline pipeline

mv environments/default/params_tmp.libsonnet environments/default/params.libsonnet

popd