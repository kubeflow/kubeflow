#!/usr/bin/env bash
# use_gcr_for_all_images.sh is a simple script which is intended to be run in a ksonnet
# app directory. It sets the docker image params in all the components to use the images
# from gcr.io registries instead of non-gcr.io registries. This is useful when deploying
# private GKE clusters where one can only pull images from gcr.io
# To push an image from DockerHub / Quay to gcr.io/kubeflow-images-public registry, use
# the following bash function
# sync_image() {
#   local source="${1}"
#   local target="gcr.io/kubeflow-images-public/${1}"
#   docker pull "${source}"
#   docker tag "${source}" "${target}"
#   docker push "${target}"
# }
# Example invocations:
# sync_image prom/statsd-exporter:v0.6.0
# sync_image quay.io/datawire/ambassador:0.37.0

set -x

if ks component list | awk '{print $1}' | grep -q "^argo$"; then
  ks param set argo workflowControllerImage gcr.io/kubeflow-images-public/argoproj/workflow-controller:v2.2.0
  ks param set argo uiImage gcr.io/kubeflow-images-public/argoproj/argoui:v2.2.0
  ks param set argo executorImage gcr.io/kubeflow-images-public/argoproj/argoexec:v2.2.0
fi

if ks component list | awk '{print $1}' | grep -q "^cert-manager$"; then
  ks param set cert-manager certManagerImage gcr.io/kubeflow-images-public/quay.io/jetstack/cert-manager-controller:v0.2.4
  ks param set cert-manager certManagerIngressShimImage gcr.io/kubeflow-images-public/quay.io/jetstack/cert-manager-ingress-shim:v0.2.4
fi

if ks component list | awk '{print $1}' | grep -q "^ambassador$"; then
  ks param set ambassador ambassadorImage gcr.io/kubeflow-images-public/quay.io/datawire/ambassador:0.37.0
fi

if ks component list | awk '{print $1}' | grep -q "^katib$"; then
  ks param set katib modeldbDatabaseImage gcr.io/kubeflow-images-public/mongo:3.4
  ks param set katib vizierDbImage gcr.io/kubeflow-images-public/mysql:8.0.3
fi
