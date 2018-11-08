#!/usr/bin/env bash
#
# A simple script to build the Docker images.
# This is intended to be invoked as a step in Argo to build the docker image.
#
# build_image.sh ${DOCKERFILE} ${IMAGE} ${TAG} ${JSON_CONFIG_FILE}
set -ex

DOCKERFILE=$1
CONTEXT_DIR=$(dirname "$DOCKERFILE")
IMAGE=$2
# The tag for the image
TAG=$3
# Takes a value of true or false. Determines if we should tag the image
# with the "latest" tag
#
# TODO(jlewi): We should take in the json config file and then parse that.
CONFIG_FILE=$4
BASE_IMAGE=$(jq -r .BASE_IMAGE ${CONFIG_FILE})
TF_PACKAGE=$(jq -r .TF_PACKAGE ${CONFIG_FILE})
TF_PACKAGE_PY_27=$(jq -r .TF_PACKAGE_PY_27 ${CONFIG_FILE})
TF_SERVING_VERSION=$(jq -r .TF_SERVING_VERSION ${CONFIG_FILE})
TFMA_VERSION=$(jq -r .TFMA_VERSION ${CONFIG_FILE})
TFDV_VERSION=$(jq -r .TFDV_VERSION ${CONFIG_FILE})

# JQ returns null for non defined values.
if [ ${BASE_IMAGE} == "null" ]; then
  BASE_IMAGE=""
fi

if [ ${TFMA_VERSION} == "null" ]; then
  TFMA_VERSION=""
fi

if [ ${TFDV_VERSION} == "null" ]; then
  TFDV_VERSION=""
fi

# Wait for the Docker daemon to be available.
until docker ps; do
  sleep 3
done

docker build --pull \
  --build-arg "BASE_IMAGE=${BASE_IMAGE}" \
  --build-arg "TF_PACKAGE=${TF_PACKAGE}" \
  --build-arg "TF_PACKAGE_PY_27=${TF_PACKAGE_PY_27}" \
  --build-arg "TF_SERVING_VERSION=${TF_SERVING_VERSION}" \
  --build-arg "TFMA_VERSION=${TFMA_VERSION}" \
  --build-arg "TFDV_VERSION=${TFDV_VERSION}" \
  -t "${IMAGE}:${TAG}" \
  -f ${DOCKERFILE} ${CONTEXT_DIR}

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
gcloud docker -- push "${IMAGE}:${TAG}"
if [[ "${IS_LATEST}" == "true" ]]; then
  docker tag "${IMAGE}:${TAG}" "${IMAGE}:latest"
  gcloud docker -- push "${IMAGE}:latest"
fi
