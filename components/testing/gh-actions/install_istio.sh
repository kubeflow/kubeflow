#!/bin/bash
set -e
ISTIO_VERSION="1.16.0"
echo "Installing Istio ..."
mkdir istio_tmp
pushd istio_tmp >/dev/null
    curl -L https://istio.io/downloadIstio | ISTIO_VERSION=${ISTIO_VERSION} sh -
    cd istio-${ISTIO_VERSION}
    export PATH=$PWD/bin:$PATH
    istioctl install -y
popd
