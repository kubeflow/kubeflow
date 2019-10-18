#!/usr/bin/env bash
#

set -ex

# Install KinD
curl -Lo ./kind "https://github.com/kubernetes-sigs/kind/releases/download/v0.5.0/kind-linux-amd64"
chmod +x ./kind
sudo mv kind /usr/local/bin

# Create KinD cluster
# TODO(swiftdiaries): figure out how to bring in the kind config
kind create cluster --name kubeflow_kind --config kind-config.yaml --image kindest/node:v1.15.0@sha256:b4d092fd2b507843dd096fe6c85d06a27a0cbd740a0b32a880fe61aba24bb478
kubectl create -f local-storage-class.yaml
kubectl patch storageclass standard -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
kubectl patch sc local-path -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
