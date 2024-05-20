#!/bin/bash

set -euo pipefail

KUSTOMIZE_VERSION="5.4.1"
KUSTOMIZE_URL="https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize/v${KUSTOMIZE_VERSION}/kustomize_v${KUSTOMIZE_VERSION}_linux_amd64.tar.gz"

echo "Installing kustomize ${KUSTOMIZE_VERSION} ..."
curl -sL -o kustomize.tar.gz "$KUSTOMIZE_URL"
tar -xzf kustomize.tar.gz
chmod +x kustomize
sudo mv kustomize /usr/local/bin
