#!/usr/bin/env bash
#
# One off script to retag Katib images for 0.2
set -ex
docker pull mitdbg/modeldb-backend:latest
docker pull katib/katib-frontend:master
docker pull katib/suggestion-random:master
docker pull katib/suggestion-grid:master
docker pull katib/vizier-core:master

docker tag mitdbg/modeldb-backend:latest \
  gcr.io/kubeflow-images-public/modeldb-backend:v0.2.0

docker tag katib/katib-frontend:master \
  gcr.io/kubeflow-images-public/katib-frontend:v0.2.0

docker tag katib/suggestion-random:master \
  gcr.io/kubeflow-images-public/katib-suggestion-random:v0.2.0

docker tag katib/suggestion-grid:master \
  gcr.io/kubeflow-images-public/katib-suggestion-grid:v0.2.0

docker tag katib/vizier-core:master \
  gcr.io/kubeflow-images-public/katib-vizier-core:v0.2.0

gcloud docker -- push \
  gcr.io/kubeflow-images-public/modeldb-backend:v0.2.0

gcloud docker -- push \
  gcr.io/kubeflow-images-public/katib-frontend:v0.2.0

gcloud docker -- push \
  gcr.io/kubeflow-images-public/katib-suggestion-random:v0.2.0

gcloud docker -- push \
  gcr.io/kubeflow-images-public/katib-suggestion-grid:v0.2.0

gcloud docker -- push \
  gcr.io/kubeflow-images-public/katib-vizier-core:v0.2.0
