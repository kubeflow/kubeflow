#!/bin/bash
#
# A simple script to build the Docker images.
# This is intended to be invoked as a step in Argo to build the docker image.
#
# build_image.sh ${DOCKERFILE} ${IMAGE} ${TAG} (optional | ${TEST_REGISTRY})
set -o errexit
set -o nounset
set -o pipefail

DOCKERFILE=$1
IMAGE=$2
TAG=$3
GCLOUD_PROJECT="kubeflow-images-public"

# Wait for the Docker daemon to be available.
until docker ps
do sleep 3
done

docker build -f ${DOCKERFILE} -t ${IMAGE}:${TAG} .

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

docker tag "${IMAGE}:${TAG}" "gcr.io/${GCLOUD_PROJECT}/${IMAGE}:${TAG}"
gcloud docker -- push "gcr.io/${GCLOUD_PROJECT}/${IMAGE}:${TAG}"

docker tag "${IMAGE}:${TAG}" "gcr.io/${GCLOUD_PROJECT}/${IMAGE}:latest"
gcloud docker -- push "gcr.io/${GCLOUD_PROJECT}/${IMAGE}:latest"