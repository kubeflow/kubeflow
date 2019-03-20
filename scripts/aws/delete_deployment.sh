#!/usr/bin/env bash
# Teardown the AWS deployment for Kubeflow.
#
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
  echo "Usage: delete_cluster --cluster_name=CLUSTER_NAME --delete_cluster=true"
}

delete_iam_role_inline_policy() {
  declare -r POLICY_NAME="$1"

  if [[ -z "$NODEGROUP_ROLE_NAMES" ]]; then
    # only new cluster rely on scripts to figure out roles
    export NODEGROUP_ROLE_NAMES=$(aws iam list-roles \
      | jq -r ".Roles[] \
      | select(.RoleName \
      | startswith(\"eksctl-${cluster_name}-nodegroup-n-NodeInstanceRole\")) \
      .RoleName")
  fi

  for IAM_ROLE in ${NODEGROUP_ROLE_NAMES//,/ }
  do
    echo "Deleting inline policy $POLICY_NAME for iam role $IAM_ROLE"
    if ! aws iam delete-role-policy --role-name=$IAM_ROLE --policy-name=$POLICY_NAME; then
        echo "Unable to delete iam inline policy $POLICY_NAME" >&2
    fi
  done

  return 0
}

main() {

 cd "${DIR}"

  # List of required parameters
  names=(cluster_name resource_dir)

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

delete_cluster=${delete_cluster:-"false"}

# Uninstall system manifests
kubectl delete -f ${resource_dir}/istio-crds.yaml
kubectl delete -f ${resource_dir}/istio-noauth.yaml
kubectl delete -f ${resource_dir}/fluentd-cloudwatch.yaml

# Detach inline policy from iam roles
delete_iam_role_inline_policy iam_alb_ingress_policy
delete_iam_role_inline_policy iam_cloudwatch_policy

# Ensure resources are deleted.
if [ $delete_cluster == "true" ] ; then
  if ! eksctl delete cluster --name=${cluster_name} ; then
    echo "Please go to aws console to check CloudFormation."
  fi
fi

# Exit with status zero.
exit 0
}

parseArgs $*
main


