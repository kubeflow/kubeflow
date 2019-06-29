#!/bin/bash
#
# A hack script for rerunning the kfctl commands. 
# Intended for quick iteration during development
set -ex

BOOTSTRAPDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." >/dev/null && pwd )"

APPNAME=kftest-$(date +%m%d-%H%S)
APPDIR=/tmp/${APPNAME}

cd ${BOOTSTRAPDIR}
make build-kfctl

KFCTL=${BOOTSTRAPDIR}/bin/kfctl
${KFCTL} init ${APPDIR} \
  --platform=gcp \
  --skip-init-gcp-project --disable_usage_report \
  --project=jlewi-dev --use_istio
  
#--use_basic_auth


cd ${APPDIR}
${KFCTL} generate all -V
${KFCTL} apply all -V