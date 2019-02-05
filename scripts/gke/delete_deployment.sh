#!/usr/bin/env bash
# Teardown the GCP deployment for Kubeflow.
# We explicitly don't delete GCFS because we don't want to destroy
# data.
#
# Don't fail on error because some commands will fail if the resources were already deleted.

set -x

# Don't fail on error because some commands will fail if the resources were already deleted.

set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

parseArgs() {
  # Parse all command line options
  while [[ $# -gt 0 ]]; do
    # Parameters should be of the form
    # --{name}=${value}
    echo parsing "$1"
    if [[ $1 =~ ^--(.*)=(.*)$ ]]; then
      name=${BASH_REMATCH[1]}
      value=${BASH_REMATCH[2]}

      eval ${name}="${value}"
    elif [[ $1 =~ ^--(.*)$ ]]; then
    name=${BASH_REMATCH[1]}
    value=true
    eval ${name}="${value}"
    else
      echo "Argument $1 did not match the pattern --{name}={value} or --{name}"
    fi
    shift
  done
}


usage() {
  echo "Usage: delete_deployment --project=PROJECT --deployment=DEPLOYMENT_NAME --zone=ZONE"
}

main() {

 cd "${DIR}"

  # List of required parameters
  names=(project deployment zone)

  missingParam=false
  for i in ${names[@]}; do
    if [ -z ${!i} ]; then
      echo "--${i} not set"
      missingParam=true
    fi
  done

  if ${missingParam}; then
    usage
    exit 1
  fi

gcloud deployment-manager --project=${project} deployments delete ${deployment} \
--quiet

RESULT=$?

if [ ${RESULT} -ne 0 ]; then
  echo deleting the deployment did not work retry with abandon
  gcloud deployment-manager --project=${project} deployments delete \
  ${deployment} \
  --quiet \
  --delete-policy=abandon

fi

# Ensure resources are deleted.

gcloud --project=${project} container clusters delete --zone=${zone} \
  ${deployment} --quiet

# Delete service accounts and all role bindings for the service accounts
declare -a accounts=("vm" "admin" "user")

# now loop through the above array
for suffix in "${accounts[@]}";
do
   # Delete all role bindings.
   SA=${deployment}-${suffix}@${project}.iam.gserviceaccount.com
   python delete_role_bindings.py --project=${project} --service_account=${SA}
   gcloud --project=${project} iam service-accounts delete \
  ${SA} \
  --quiet
done

# Exit with status zero.
exit 0
# TODO(jlewi): Should we cleanup ingress , loadbalancer, etc...?
}

parseArgs $*
main
