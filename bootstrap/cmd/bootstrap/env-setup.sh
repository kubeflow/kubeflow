#!/bin/bash

set -ex

if [ -z ${!GOOGLE_APPLICATION_CREDENTIALS} ]; then
  echo "ENV GOOGLE_APPLICATION_CREDENTIALS not set."
  exit 1
fi

# Activate service account on bootstrapper.
gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
gcloud config list
