#!/bin/bash
#
# Script to trigger test_deploy_app.py.
# This is intended to be invoked as a step in Argo.
#
# test_delete.sh ${PROJECT} ${DEPLOYMENT}
set -ex

PROJECT=$1
DEPLOYMENT=$2

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

gcloud deployment-manager deployments delete ${DEPLOYMENT} --project=${PROJECT}

