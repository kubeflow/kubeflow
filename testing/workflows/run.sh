#!/usr/bin/env bash
#
# A simple wrapper script to run a command in the e2e tests.
# This script performs common functions like
# activating the service account.
set -ex
gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

echo Working Directory=$(pwd)
# Execute the actual command.
# TODO(jlewi): We should add retries on error.

# Retry up to 3 times
for i in $(seq 1 3); do
  set +e
  "$@"
  result=$?
  set -e
  if [[ ${result} -eq 0 ]]; then
    echo command ran successfully
    exit 0
  fi

  echo Command failed: "$@"
done
echo "command didn't succeed"
exit 1
