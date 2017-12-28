#!/bin/bash
#
# This script keeps track of the commands used to setup Argo.
#
# TODO(jlewi): We should create a ksonnet component to deploy argo.
# The user guide recommends using the CLI to do the install
# https://github.com/argoproj/argo/blob/master/cmd/argo/commands/install.go
# but it should be straightforward to reverse engineer that and
# create the deployments and config map directly.

kubectl create namespace kubeflow-test-infra

argo install --install-namespace=kubeflow-test-infra
