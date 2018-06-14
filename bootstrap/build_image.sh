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

# Wait for the Docker daemon to be available.
until docker ps
do sleep 3
done

python ${CONTEXT_DIR}/build.py --image=${IMAGE}:${TAG} --build_opts="--pull" --test_registry=${4-}

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
gcloud docker -- push "${IMAGE}:${TAG}"
docker tag "${IMAGE}:${TAG}" "${IMAGE}:latest"
gcloud docker -- push "${IMAGE}:latest"