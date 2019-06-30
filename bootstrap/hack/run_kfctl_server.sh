#!/bin/bash
#
# A hack script for starting up the kfctl server (bootstrapper) 
# Intended for quick iteration during development
set -ex

BOOTSTRAPDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." >/dev/null && pwd )"

APPNAME=kftest-$(date +%m%d-%H%S)
APPDIR=/tmp/${APPNAME}

cd ${BOOTSTRAPDIR}
make build-bootstrap

KFCTL=${BOOTSTRAPDIR}/bin/bootstrapper
${KFCTL} \
	--keep-alive=true \
	--app-dir=/tmp \
	--registries-config-file="" \
	--mode=kfctl \
	--json-log-format=false