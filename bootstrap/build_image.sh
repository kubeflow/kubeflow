#!/bin/bash
#
# A simple script to build the Docker images.
# This is intended to be invoked as a step in Argo to build the docker image.
#
# build_image.sh ${DOCKERFILE} ${IMAGE}
set -ex

DOCKERFILE=$1
CONTEXT_DIR=$(dirname "$DOCKERFILE")
IMAGE=$2
KFVERSION=$3

# Wait for the Docker daemon to be available.
until docker ps
do sleep 3
done

if [[ -z "${KFVERSION}" ]]; then
  KFVERSION=v0.1.3  
fi

docker build --pull -t ${IMAGE} \
  --build-arg kubeflowversion="${KFVERSION}" \
	-f ${DOCKERFILE} ${CONTEXT_DIR}

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
gcloud docker -- push ${IMAGE}
