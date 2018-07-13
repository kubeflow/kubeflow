#!/bin/bash
#
# A simple and minimal test for deploy.sh
set -ex

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TMPDIR=$(mktemp -d /tmp/tmp.deploy-test-XXXX)
export KUBEFLOW_DEPLOY=false
cd ${TMPDIR}
${DIR}/deploy.sh

EXPECTED_APP_DIR=${TMPDIR}/kubeflow_ks_app

if [[ ! -d ${EXPECTED_APP_DIR} ]]; then
  echo ${EXPECTED_APP_DIR} was not created
  exit 1
fi	
