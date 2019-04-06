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

  if [[ -z "$AWS_NODEGROUP_ROLE_NAMES" ]]; then
    # only new cluster rely on scripts to figure out roles
    export AWS_NODEGROUP_ROLE_NAMES=$(aws iam list-roles \
      | jq -r ".Roles[] \
      | select(.RoleName \
      | startswith(\"eksctl-${cluster_name}-nodegroup\")) \
      .RoleName")
  fi

  for IAM_ROLE in ${AWS_NODEGROUP_ROLE_NAMES//,/ }
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
source ${KUBEFLOW_INFRA_DIR}/cluster_features.sh


  # List of required parameters
  names=(cluster_name resource_dir managed_cluster)

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

# Uninstall system manifests
kubectl delete -f ${resource_dir}/istio-crds.yaml
kubectl delete -f ${resource_dir}/istio-noauth.yaml
if [ "$WORKER_NODE_GROUP_LOGGING" = true ]; then
  kubectl delete -f ${resource_dir}/fluentd-cloudwatch.yaml
fi

# Detach inline policy from iam roles
delete_iam_role_inline_policy iam_alb_ingress_policy
delete_iam_role_inline_policy iam_csi_fsx_policy
if [ "$WORKER_NODE_GROUP_LOGGING" = true ]; then
  delete_iam_role_inline_policy iam_cloudwatch_policy
fi


# Ensure resources are deleted.
if [ $managed_cluster = "true" ] ; then
  # User may create cluster from command or cluster_config
  if [[ ! -z "$cluster_config" ]]; then
    if ! eksctl delete cluster --cluster_config=${cluster_config} ; then
      echo "Please go to aws console to check CloudFormation status and double make sure your cluster has been shutdown."
    fi
  else
    if ! eksctl delete cluster --name=${cluster_name} ; then
      echo "Please go to aws console to check CloudFormation status and double make sure your cluster has been shutdown."
    fi
fi

# Exit with status zero.
exit 0
}

parseArgs $*
main


