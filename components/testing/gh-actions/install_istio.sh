#!/bin/bash

set -euo pipefail

ISTIO_VERSION="1.17.8"
ISTIO_URL="https://istio.io/downloadIstio"

echo "Installing Istio ${ISTIO_VERSION} ..."
mkdir istio_tmp
pushd istio_tmp >/dev/null
    curl -sL "$ISTIO_URL" | ISTIO_VERSION=${ISTIO_VERSION} sh -
    cd istio-${ISTIO_VERSION}
    export PATH=$PWD/bin:$PATH
    istioctl install -y
popd
