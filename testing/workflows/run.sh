#!/bin/bash
#
# A simple wrapper script to run a command in the e2e tests.
# This script performs common functions like 
# activating the service account.
set -ex
gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

echo Working Directory=$(pwd)
# Execute the actual command.
# TODO(jlewi): We should add retries on error.
"$@"