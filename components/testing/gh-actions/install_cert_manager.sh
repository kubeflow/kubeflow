#!/bin/bash
set -e
echo "Fetching cert-manager manifests..."
CERT_MANAGER_VERSION="v1.10.1"
CERT_MANAGER_URL="https://github.com/cert-manager/cert-manager/releases/download/$CERT_MANAGER_VERSION/cert-manager.yaml"
curl -sL -o cert-manager.yaml $CERT_MANAGER_URL

echo "Applying the Cert Manager manifests..."
kubectl apply -f cert-manager.yaml

echo "Waiting for cert-manager to be ready ..."
kubectl wait --for=condition=ready pod -l 'app in (cert-manager,webhook)' --timeout=180s -n cert-manager
