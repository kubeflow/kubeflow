#!/usr/bin/env bash
#
# A simple script to build the Docker images.
# This is intended to be invoked as a step in Argo to build the docker image.
#
# build_image.sh ${DOCKERFILE} ${IMAGE} ${TAG}
set -ex

GCLOUD_PROJECT=${GCLOUD_PROJECT:-kubeflow-images-public}
DOCKERFILE=${1:-Dockefile}
CONTEXT_DIR=$(dirname "$DOCKERFILE")
IMAGE=${2:-gcr.io/$GCLOUD_PROJECT/bootstrapper}
TAG=${3:-$(date +v%Y%m%d)-$(git describe --tags --always --dirty)-$(git diff | shasum -a256 | cut -c -6)}

# Wait for the Docker daemon to be available.
until docker ps; do
  sleep 3
done

go version

#GO111MODULE=on 
#go build -gcflags 'all=-N -l' -o bin/bootstrapper cmd/bootstrap/main.go
#make build-bootstrap

# rm -rf reg_tmp
# mkdir -p reg_tmp/kubeflow
# cp -r ../kubeflow reg_tmp/kubeflow
# cp -r ../deployment reg_tmp/kubeflow
# cp -r ../dependencies reg_tmp/kubeflow
# docker build -t ${IMAGE}:$TAG --build-arg registries=reg_tmp --target=bootstrap .

rm -rf reg_tmp
mkdir -p reg_tmp/kubeflow
cp -r ../kubeflow reg_tmp/kubeflow
cp -r ../deployment reg_tmp/kubeflow
cp -r ../dependencies reg_tmp/kubeflow
mkdir -p reg_tmp/kubeflow/bootstrap
cp -r k8sSpec reg_tmp/kubeflow/bootstrap
docker build \
  --build-arg registries=reg_tmp \
  --target=bootstrap \
  --tag ${IMAGE}:${TAG} .
echo Built ${IMAGE}:${TAG}

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
gcloud docker -- push "${IMAGE}:${TAG}"

