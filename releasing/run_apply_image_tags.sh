#!/usr/bin/env bash
# Wrapper script for running apply_image_tags.py
set -ex

PATTERN=$1
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd ${DIR}/.. && pwd)"

# We need to add kubeflow/testing to the python path.
# We assume its checked out as git_kubeflow-testing
export PYTHONPATH=${PYTHONPATH}:${ROOT_DIR}/../git_kubeflow-testing/py

# Update the TFJob operator image
python ${ROOT_DIR}/releasing/apply_image_tags.py \
  --images_file=${ROOT_DIR}/releasing/image_tags.yaml \
  --pattern=${PATTERN}
