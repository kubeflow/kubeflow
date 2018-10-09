#!/bin/bash
#
# A simple script to build the Docker images.
# This is intended to be invoked as a step in Argo to build the docker image.
#
# build_image.sh ${DOCKERFILE} ${IMAGE} ${TAG} (optional | ${TEST_REGISTRY})
set -ex

DOCKERFILE=$1
CONTEXT_DIR=$(dirname "$DOCKERFILE")
IMAGE=$2
TAG=$3

BUILDER_IMG=gcr.io/kubeflow-images-public/bootstrapper-builder
BUILDER_IMG_VERSION=$(head -1 ${CONTEXT_DIR}/glide.lock | cut -d ' ' -f 2)

# pull builder image from GCR or build it from local if required one doesn't exist.
docker pull ${BUILDER_IMG}:${BUILDER_IMG_VERSION} || docker build -t ${BUILDER_IMG}:${BUILDER_IMG_VERSION} -f ${CONTEXT_DIR}/Dockerfile.Builder .

# Wait for the Docker daemon to be available.
until docker ps
do sleep 3
done

python ${CONTEXT_DIR}/build.py --build_args=BUILDER_IMG=${BUILDER_IMG},BUILDER_IMG_VERSION=${BUILDER_IMG_VERSION} --image=${IMAGE}:${TAG} --config=${CONTEXT_DIR}/image_registries.yaml --test_registry=${4-}

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
gcloud docker -- push "${IMAGE}:${TAG}"
