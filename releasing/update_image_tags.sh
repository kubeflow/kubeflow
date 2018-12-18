#!/usr/bin/env bash
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
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd ${DIR}/.. && pwd)"

IMAGES_FILE=${ROOT_DIR}/releasing/image_tags.yaml

# Assume the testing repo is checkout in git_kubeflow_testing because
# we depend on the python code in that repo.
export PYTHONPATH=${PYTHONPATH}:${ROOT_DIR}/../git_kubeflow-testing/py

# TODO(richardsliu): Current postsubmits apply this tag to all TF notebook images.
# We should fix our postsubmit jobs such that each postsubmit generates an unique tag based on commit hash.
JUPYTER_TAG=v-base-d1ee37b-955
RELEASE=v0.4.0

# Fetch shas for Jupyter images
python ${ROOT_DIR}/releasing/add_image_shas.py --pattern=.*tensorflow.*1.*notebook.*:${JUPYTER_TAG} \
  --images_file=${IMAGES_FILE}

# Tag the Jupyter images we want with the desired relase tag.
python ${ROOT_DIR}/releasing/add_image_tag.py --pattern=.*tensorflow.*1.*notebook.*:${JUPYTER_TAG} --tag=${RELEASE} \
  --images_file=${IMAGES_FILE}
