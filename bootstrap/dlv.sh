#!/usr/bin/env bash

#dlv --listen=:2345 --headless=true --api-version=2 exec /opt/kubeflow/bootstrapper -- --in-cluster --namespace=kubeflow --config=/opt/kubeflow/default.yaml --app-dir=/opt/bootstrap --registries-config-file=/opt/kubeflow/image_registries.yaml
dlv --listen=:2345 --headless=true --api-version=2 exec /opt/kubeflow/bootstrapper -- --in-cluster --namespace=kubeflow 
