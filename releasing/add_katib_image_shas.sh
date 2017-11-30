#!/usr/bin/env bash
#
# Fetch Katib image shas from GCR and them to image_tags.yaml
#
set -ex
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd ${DIR}/.. && pwd)"

IMAGES_FILE=${ROOT_DIR}/releasing/image_tags.yaml

# Assume the testing repo is checkout in git_kubeflow_testing because
# we depend on the python code in that repo.
export PYTHONPATH=${PYTHONPATH}:${ROOT_DIR}/../git_kubeflow-testing/py

KATIB_TAG=v0.1.2-alpha-106-gfae6aa5

# Fetch shas for katib images
python ${ROOT_DIR}/releasing/add_image_shas.py --pattern=.*katib/.*:${KATIB_TAG} \
  --images_file=${IMAGES_FILE} --repository=gcr.io/kubeflow-images-public/katib
