#!/bin/bash
#
# A script to automate updating the images to use in the ksonnet
# components
set -ex
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$( cd ${DIR}/.. && pwd )"

# Update the TFJob operator image
python ${ROOT_DIR}/scripts/update_prototype.py \
	--file=${ROOT_DIR}/kubeflow/core/prototypes/all.jsonnet \
	--values=tfJobImage=gcr.io/kubeflow-images-public/tf_operator:v0.2.0
