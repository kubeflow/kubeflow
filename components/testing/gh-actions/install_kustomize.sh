#!/bin/bash
set -e
curl --silent --location --remote-name "https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize/v3.2.3/kustomize_kustomize.v3.2.3_linux_amd64"
chmod a+x kustomize_kustomize.v3.2.3_linux_amd64
sudo mv kustomize_kustomize.v3.2.3_linux_amd64 /usr/local/bin/kustomize