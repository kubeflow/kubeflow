#!/bin/bash
set -e
echo "Installing cert-manager ..."
CERT_MANAGER_VERSION="v1.10.1"
mkdir cert_tmp
pushd cert_tmp > /dev/null
    OS=$(go env GOOS); ARCH=$(go env GOARCH); \
        curl -L -o cmctl.tar.gz https://github.com/cert-manager/cert-manager/releases/download/$CERT_MANAGER_VERSION/cmctl-$OS-$ARCH.tar.gz
    tar xzf cmctl.tar.gz
    sudo mv cmctl /usr/local/bin
    cmctl x install
popd