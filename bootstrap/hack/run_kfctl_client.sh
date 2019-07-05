#!/bin/bash
#
# A hack script for rerunning the kfctl commands. 
# Intended for quick iteration during development
set -ex

. ~/secrets/jlewi-dev.iap-oauth.sh
BOOTSTRAPDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." >/dev/null && pwd )"

# If we regenerate a new name the request won't match and it will get rejected.
KFNAME=kftest-$(date +%m%d-%H%M%S)
#KFNAME=kftest-0701-204548

cd ${BOOTSTRAPDIR}
make build-kfctl-client

export CONFIG=${BOOTSTRAPDIR}/config/kfctl_gcp_iap.0.6.yaml 

KFCTL=${BOOTSTRAPDIR}/bin/kfctlClient
${KFCTL} \
	--v=1 \
	--project=${PROJECT} \
	--name=${KFNAME}  \
	--endpoint=http://localhost:8080 \
	--config=${CONFIG} \
	--zone=us-east1-d