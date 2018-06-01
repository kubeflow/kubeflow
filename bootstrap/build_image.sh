#!/bin/bash
#
# A simple script to build the Docker images.
# This is intended to be invoked as a step in Argo to build the docker image.
#
# build_image.sh ${BUILDDIR} ${IMAGE} ${CONFIG}
set -ex

BUILDDIR=$1
IMAGE=$2
CONFIG=$3

# Wait for the Docker daemon to be available.
until docker ps
do sleep 3
done

python ${BUILDDIR}/build.py --image=${IMAGE} --build_opts="--pull" --config=${CONFIG}

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
gcloud docker -- push ${IMAGE}