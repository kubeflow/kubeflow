#!/bin/bash
#
# A hack script for rerunning the kfctl commands. 
# Intended for quick iteration during development
set -ex

. ~/secrets/jlewi-dev.iap-oauth.sh
BOOTSTRAPDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." >/dev/null && pwd )"

KFNAME=kftest-$(date +%m%d-%H%M%S)

cd ${BOOTSTRAPDIR}
make build-kfctl-client

export CONFIG=${BOOTSTRAPDIR}/config/kfctl_gcp_iap.0.6.yaml 

KFCTL=${BOOTSTRAPDIR}/bin/kfctlClient
${KFCTL} \
	--v=1 \
	--project=${PROJECT} \
	--name=${KFNAME}  \
	--endpoint=http://localhost:8080 \
	--config=${CONFIG}