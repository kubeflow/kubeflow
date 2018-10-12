#!/bin/bash
#
# A simple script to build the Docker images.
# This is intended to be invoked as a step in Argo to build the docker image.
#
# build_image.sh ${DOCKERFILE} ${IMAGE} ${TAG} ${IS_LATEST} ${BASE_IMAGE} ${TF_PACKAGE} ${INSTALL_TFMA} ${TFMA_VERSION}
set -ex

DOCKERFILE=$1
CONTEXT_DIR=$(dirname "$DOCKERFILE")
IMAGE=$2
# The tag for the image
TAG=$3
# Takes a value of true or false. Determines if we should tag the image
# with the "latest" tag
IS_LATEST=$4
BASE_IMAGE=${5:-"ubuntu:latest"}
TF_PACKAGE=${6:-"tf-nightly"}
TF_PACKAGE_PY_27=${7:-"tf-nightly"}
INSTALL_TFMA=$8
TF_SERVING_VERSION=$9
TFMA_VERSION=${10:-"default"}

# Wait for the Docker daemon to be available.
until docker ps
do sleep 3
done

docker build --pull \
        --build-arg "BASE_IMAGE=${BASE_IMAGE}" \
        --build-arg "TF_PACKAGE=${TF_PACKAGE}" \
        --build-arg "TF_PACKAGE_PY_27=${TF_PACKAGE_PY_27}" \
        --build-arg "INSTALL_TFMA=${INSTALL_TFMA}" \
<<<<<<< HEAD
        --build-arg "TF_SERVING_VERSION=${TF_SERVING_VERSION}" \
=======
        --build-arg "TFMA_VERSION=${TFMA_VERSION}" \
>>>>>>> 5374cd5a... add tfma version [1754](https://github.com/kubeflow/kubeflow/issues/1745)
        -t "${IMAGE}:${TAG}" \
	-f ${DOCKERFILE} ${CONTEXT_DIR}

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
gcloud docker -- push "${IMAGE}:${TAG}"
if [[ "${IS_LATEST}" == "true" ]]; then
  docker tag "${IMAGE}:${TAG}" "${IMAGE}:latest"
  gcloud docker -- push "${IMAGE}:latest"
fi
