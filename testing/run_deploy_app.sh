#!/bin/bash
#
# This script shows how to manually trigger a load test for 1-click-deployment service.
#
# All the projects created for load tests have one owner
# "load-test-owner@kf-gcp-deploy0.iam.gserviceaccount.com".So in order to run the load
# test you have to set GOOGLE_APPLICATION_CREDNTIALS and SERVICE_CLIENT_ID both point to
# service account "load-test-owner@kf-gcp-deploy0.iam.gserviceaccount.com"
# https://pantheon.corp.google.com/iam-admin/serviceaccounts/details/112401461927766705527?organizationId=714441643818&project=kf-gcp-deploy0
#
# CLIENT_ID and CLIENT_SECRET should be set to
# https://pantheon.corp.google.com/apis/credentials/oauthclient/459682233032-a76ps35eh3j8odvudf4292bgq0jam74i.apps.googleusercontent.com?project=kf-gcp-deploy0&organizationId=714441643818
#
# Make sure kubeflow/test/py is on the path.
set -ex
export GOOGLE_APPLICATION_CREDENTIALS=/home/jlewi/secrets/kf-gcp-deploy0-11089b0d75ae.json
export SERVICE_CLIENT_ID=112401461927766705527

if [[ -z "${CLIENT_ID}" ]]; then
	echo You must sect CLIENT_ID to id for OAUTH client
	exit 1
fi

if [[ -z "${CLIENT_SECRET}" ]]; then
	echo You must sect CLIENT_SECRET to id for OAUTH client
	exit 1
fi

# IAP requires setting CLIENT_ID and CLIENT_SECRET environment variable
#CLIENT_ID=459682233032-a76ps35eh3j8odvudf4292bgq0jam74i.apps.googleusercontent.com \
  python test_deploy_app.py \
  --mode="loadtest" \
  --kfversion="v0.5.1" \
  --project_prefix="kf-load-test-project" \
  --email="load-test-owner@kf-gcp-deploy0.iam.gserviceaccount.com" \
  --number_projects="1" \
  --number_deployments_per_project="1" \
  --sa_client_id="${SERVICE_CLIENT_ID}" \
  --iap_wait_min="45"
