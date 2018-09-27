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
PROJECT="$GCP_PROJECT}"
REGISTRY="$GCP_REGISTRY}"

# Wait for the Docker daemon to be available.
until docker ps
do sleep 3
done

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

cd $CONTEXT_DIR

echo "GCP Project: "$PROJECT
echo "GCP Registry: "$REGISTRY

echo "Building centraldashboard using gcloud build"
gcloud builds submit --tag=${REGISTRY}/${IMAGE}:${TAG} --project=${PROJECT} .
echo "Finished building image"