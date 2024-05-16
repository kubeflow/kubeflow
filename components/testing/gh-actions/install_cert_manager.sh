#!/bin/bash

set -euo pipefail

CERT_MANAGER_VERSION="1.12.10"
CERT_MANAGER_URL="https://github.com/cert-manager/cert-manager/releases/download/v${CERT_MANAGER_VERSION}/cert-manager.yaml"

echo "Fetching cert-manager ${CERT_MANAGER_VERSION} manifests..."
curl -sL -o cert-manager.yaml "$CERT_MANAGER_URL"

echo "Applying cert-manager manifests..."
kubectl apply -f cert-manager.yaml

echo "Waiting for cert-manager to be ready..."
kubectl wait --for=condition=ready pod -l 'app in (cert-manager,webhook)' --timeout=180s -n cert-manager
