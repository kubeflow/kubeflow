#!/bin/bash

set -e

export CLUSTER_NAME="existing-arrikto-${REPO_NAME}-${PULL_NUMBER}"

gcloud auth activate-service-account --key-file="${GOOGLE_APPLICATION_CREDENTIALS}"
gcloud container clusters delete "${CLUSTER_NAME}" --zone us-central1-a