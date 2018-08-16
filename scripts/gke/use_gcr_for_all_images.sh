#!/bin/bash
# use_gcr_for_all_images.sh is a simple script which is intended to be run in a ksonnet
# app directory. It sets the docker image params in all the components to use the images
# from gcr.io registries instead of non-gcr.io registries. This is useful when deploying
# private GKE clusters where one can only pull images from gcr.io
set -x

if ks component list | grep -q "^argo$" ; then
  ks param set argo workflowControllerImage gcr.io/kubeflow-images-public/argoproj/workflow-controller:v2.1.1
  ks param set argo uiImage gcr.io/kubeflow-images-public/argoproj/argoui:v2.1.1
  ks param set argo executorImage gcr.io/kubeflow-images-public/argoproj/argoexec:v2.1.1
fi

if ks component list | grep -q "^cert-manager$" ; then
  ks param set cert-manager certManagerImage gcr.io/kubeflow-images-public/quay.io/jetstack/cert-manager-controller:v0.2.4
  ks param set cert-manager certManagerIngressShimImage gcr.io/kubeflow-images-public/quay.io/jetstack/cert-manager-ingress-shim:v0.2.4
fi

if ks component list | grep -q "^ambassador$" ; then
  ks param set ambassador ambassadorImage gcr.io/kubeflow-images-public/quay.io/datawire/ambassador:0.37.0
  ks param set ambassador statsdImage gcr.io/kubeflow-images-public/quay.io/datawire/statsd:0.37.0
fi
