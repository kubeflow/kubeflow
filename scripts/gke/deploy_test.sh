#!/bin/bash
#
# A simple and minimal test for deploy.sh
# This only verifies the configs are created it doesn't try to deploy them.
set -ex

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TMPDIR=$(mktemp -d /tmp/tmp.deploy-gke-test-XXXX)
export KUBEFLOW_DEPLOY=false
export SETUP_PROJECT=false
export PROJECT=fakeproject
export PROJECT_NUMBER=1234
export CLIENT_ID=fake_id
export CLIENT_SECRET=fake_secret

cd ${TMPDIR}
${DIR}/deploy.sh

EXPECTED_DM_DIR=${TMPDIR}/kubeflow_deployment_manager_configs

if [[ ! -d ${EXPECTED_DM_DIR} ]]; then
  echo ${EXPECTED_DM_DIR} was not created
  exit 1
fi	

EXPECTED_APP_DIR=${TMPDIR}/kubeflow_ks_app

if [[ ! -d ${EXPECTED_APP_DIR} ]]; then
  echo ${EXPECTED_APP_DIR} was not created
  exit 1
fi	
