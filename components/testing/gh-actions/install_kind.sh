#!/bin/bash
set -e
echo "Fetching KinD executable ..."
sudo swapoff -a
sudo rm -f /swapfile
sudo mkdir -p /tmp/etcd
sudo mount -t tmpfs tmpfs /tmp/etcd
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.14.0/kind-linux-amd64
chmod +x ./kind
sudo mv kind /usr/local/bin