#!/bin/bash
#
# A simple script to build the Docker images.
# This is intended to be invoked as a step in Argo to build the docker image.
#
# build_image.sh ${DOCKERFILE} ${IMAGE} ${TAG}
set -ex

DOCKERFILE=$1
IMAGE=$2
TAG=$3
CONTEXT_DIR=$(dirname "$DOCKERFILE")


# Wait for the Docker daemon to be available.
until docker ps
do sleep 3
done

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

cd $CONTEXT_DIR

echo "Building centraldashboard using gcloud build"
gcloud builds submit --tag=${IMAGE}:${TAG} .