#!/bin/bash
#
# A script to automate updating the images to use in the ksonnet
# components.
# This script contains the most recent commands run.
# You can update it to run the latest images.
#
# This won't actually update any tags on images. It will just update
# image_tags.yaml
#
# If image_tags.yaml looks good invoke apply_tags.py
set -ex
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$( cd ${DIR}/.. && pwd )"

IMAGES_FILE=${ROOT_DIR}/releasing/image_tags.yaml

# Assume the testing repo is checkout in git_kubeflow_testing because 
# we depend on the python code in that repo.
export PYTHONPATH=${PYTHONPATH}:${ROOT_DIR}/../git_kubeflow-testing/py

RELEASE=v0.2.0

OLD_NOTEBOOK_RELEASE=v0.2.0
NOTEBOOK_RELEASE=v0.2.1

# Update the Jupyter Images
sed -i "s/tensorflow-\([0-9\.]*\)-notebook-\(.*\):${OLD_NOTEBOOK_RELEASE}/tensorflow-\1-notebook-\2:${NOTEBOOK_RELEASE}/" \
	kubeflow/core/kubeform_spawner.py 

# Update the TFJob operator image
python scripts/update_prototype.py \
	--file=${ROOT_DIR}/kubeflow/core/prototypes/all.jsonnet \
	--values=tfJobImage=gcr.io/kubeflow-images-public/tf_operator:${RELEASE}
