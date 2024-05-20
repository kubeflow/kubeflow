#!/bin/bash

set -euo pipefail

KIND_VERSION="0.22.0"
KIND_URL="https://kind.sigs.k8s.io/dl/v${KIND_VERSION}/kind-linux-amd64"

echo "Setting up kind environment..."
sudo swapoff -a
sudo rm -f /swapfile
sudo mkdir -p /tmp/etcd
sudo mount -t tmpfs tmpfs /tmp/etcd

echo "Installing kind ${KIND_VERSION} ..."
curl -sL -o kind "$KIND_URL"
chmod +x ./kind
sudo mv kind /usr/local/bin
