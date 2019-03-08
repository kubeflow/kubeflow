#!/bin/bash
#
# GOOGLE_APPLICATION_CREDNTIALS and SERVICE_CLIENT_ID both point to
# service account "load-test-owner@kf-gcp-deploy0.iam.gserviceaccount.com"
# https://pantheon.corp.google.com/iam-admin/serviceaccounts/details/112401461927766705527?organizationId=714441643818&project=kf-gcp-deploy0
#
# CLIENT_ID and CLIENT_SECRET both point to
# https://pantheon.corp.google.com/apis/credentials/oauthclient/459682233032-a76ps35eh3j8odvudf4292bgq0jam74i.apps.googleusercontent.com?project=kf-gcp-deploy0&organizationId=714441643818

GOOGLE_APPLICATION_CREDENTIALS=/usr/local/google/home/zhenghui/env/kf-gcp-deploy0-load-test.json \
SERVICE_CLIENT_ID=112401461927766705527 \
CLIENT_ID=459682233032-a76ps35eh3j8odvudf4292bgq0jam74i.apps.googleusercontent.com \
CLIENT_SECRET=eEWmsMuOo7s1o04bRctfehuD \
  python test_deploy_app.py \
  --mode="loadtest" \
  --project_prefix="kf-gcp-deploy-loadtest-" \
  --number_projects="1" \
  --number_deployments_per_project="3" \
  --sa_client_id="112401461927766705527" \
  --wait_sec="1"
