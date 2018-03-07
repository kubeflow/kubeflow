#!/bin/bash
#
# A simple script to build the Docker images.
# This is intended to be invoked as a step in Argo to build the docker image.
#
# build_image.sh ${DOCKERFILE} ${IMAGE} ${BASE_IMAGE} ${TF_PACKAGE}
set -ex

DOCKERFILE=$1
CONTEXT_DIR=$(dirname "$DOCKERFILE")
IMAGE=$2
BASE_IMAGE=${3:-"ubuntu:latest"}
TF_PACKAGE=${4:-"tf-nightly"}

# Wait for the Docker daemon to be available.
until docker ps
do sleep 3
done

docker build --pull \
        --build-arg "BASE_IMAGE=${BASE_IMAGE}" \
        --build-arg "TF_PACKAGE=${TF_PACKAGE}" \
        -t ${IMAGE} \
	-f ${DOCKERFILE} ${CONTEXT_DIR}

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
gcloud docker -- push ${IMAGE}
