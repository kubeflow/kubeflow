#!/bin/bash
#
# A hack script for rerunning the kfctl commands. 
# Intended for quick iteration during development
#
# This version uses the new config file syntax
set -ex

BOOTSTRAPDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." >/dev/null && pwd )"

CONFIG="${BOOTSTRAPDIR}/config/kfctl_gcp_iap.0.6.yaml"
APPNAME=kftest-$(date +%m%d-%H%M%S)
APPDIR=/tmp/${APPNAME}

cd ${BOOTSTRAPDIR}
make build-kfctl

KFCTL=${BOOTSTRAPDIR}/bin/kfctl
${KFCTL} init ${APPDIR} \
  --config=${CONFIG} \
  --project=jlewi-dev

cd ${APPDIR}
${KFCTL} generate all -V
${KFCTL} apply all -V