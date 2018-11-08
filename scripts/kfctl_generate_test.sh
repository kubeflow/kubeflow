#!/usr/bin/env bash
#
# A simple and minimal test for kfctl.sh
# TODO(jlewi): Should add this to our ci system
set -ex

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TMPDIR=$(mktemp -d /tmp/tmp.kfctl-test-XXXX)
cd ${TMPDIR}
${DIR}/kfctl.sh init kfapp --platform non
cd ${TMPDIR}/kfapp
${DIR}/kfctl.sh generate k8s

EXPECTED_APP_DIR=${TMPDIR}/kfapp/ks_app

if [[ ! -d ${EXPECTED_APP_DIR} ]]; then
  echo ${EXPECTED_APP_DIR} was not created
  exit 1
fi
