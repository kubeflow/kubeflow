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
REGISTRY="${GCP_REGISTRY}"
PROJECT="${GCP_PROJECT}"
VERSION=$(git describe --tags --always --dirty)
CONTEXT_DIR=$(dirname "$DOCKERFILE")

# Wait for the Docker daemon to be available.
until docker ps
do sleep 3
done

# Get gcloud auth
gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

cd $CONTEXT_DIR

# Build with tag
gcloud builds submit --tag=${REGISTRY}/${IMAGE}:${TAG} --project=${PROJECT} .
# Build with latest
gcloud builds submit --tag=${REGISTRY}/${IMAGE}:latest --project=${PROJECT} .