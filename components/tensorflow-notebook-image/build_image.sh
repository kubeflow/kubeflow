#!/bin/bash
#
# A simple script to build the Docker images.
# This is intended to be invoked as a step in Argo to build the docker image.
#
# build_image.sh ${DOCKERFILE} ${IMAGE}
set -ex

DOCKERFILE=$1
IMAGE=$2

# Wait for the Docker daemon to be available.
until docker ps
do sleep 3
done

docker build --pull -t ${IMAGE} \
	-f ${DOCKERFILE}

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
gcloud docker -- push ${IMAGE}