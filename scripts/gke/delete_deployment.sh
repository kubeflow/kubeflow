#!/usr/bin/env bash
# Teardown the GCP deployment for Kubeflow.
# We explicitly don't delete GCFS because we don't want to destroy
# data.
#
# Don't fail on error because some commands will fail if the resources were already deleted.

set -x

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"

PROJECT=$1
DEPLOYMENT_NAME=$2
CONFIG_FILE=$3

gcloud deployment-manager --project=${PROJECT} deployments delete \
  ${DEPLOYMENT_NAME} \
  --quiet

RESULT=$?

if [ ${RESULT} -ne 0 ]; then
  echo deleting the deployment did not work retry with abandon
  gcloud deployment-manager --project=${PROJECT} deployments delete \
    ${DEPLOYMENT_NAME} \
    --quiet \
    --delete-policy=abandon
fi

# Ensure resources are deleted.
gcloud --project=${PROJECT} container clusters delete --zone=${ZONE} \
  ${DEPLOYMENT_NAME} --quiet

# Delete IAM bindings
python "${DIR}/iam_patch.py" --action=remove \
  --project=${PROJECT} \
  --iam_bindings_file="iam_bindings.yaml"

# Delete service accounts and all role bindings for the service accounts
declare -a accounts=("vm" "admin" "user")

deleteSa() {
  local SA=$1

  O=$(gcloud --project=${PROJECT} iam service-accounts describe ${SA} 2>&1)
  local RESULT=$?

  if [ "${RESULT}" -ne 0 ]; then
    echo Service account ${SA} "doesn't" exist or you do not have permission to access service accounts.
    return
  fi

  return

  gcloud --project=${PROJECT} iam service-accounts delete \
    ${SA} \
    --quiet
}
# now loop through the above array
for suffix in "${accounts[@]}"; do
  # Delete all role bindings.
  SA=${DEPLOYMENT_NAME}-${suffix}@${PROJECT}.iam.gserviceaccount.com
  deleteSa ${SA}
done
