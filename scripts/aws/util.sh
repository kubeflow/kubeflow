#!/usr/bin/env bash
#
# Define functions to customize the Kubeflow app for AWS.
#
set -xe

################################ Infrastructure Changes ################################

## Prepare Infrastrcture Configurations
generate_aws_infra_configs() {
  # Create the infrastructure configs if they don't exist.
  if [ ! -d "${KUBEFLOW_INFRA_DIR}" ]; then
    echo "Creating AWS infrastructure configs in directory ${KUBEFLOW_INFRA_DIR}"
    mkdir -p "${KUBEFLOW_INFRA_DIR}"
    cp -r ${KUBEFLOW_REPO}/deployment/aws/infra_configs/* ${KUBEFLOW_INFRA_DIR}
  else
    echo AWS infrastructure configs already exist in directory "${KUBEFLOW_INFRA_DIR}"
  fi

  # Replace placehold with user configurations
  replace_text_in_file "your_cluster_name" ${AWS_CLUSTER_NAME} ${KUBEFLOW_INFRA_DIR}/cluster_config.yaml
  replace_text_in_file "your_cluster_region" ${AWS_REGION} ${KUBEFLOW_INFRA_DIR}/cluster_config.yaml
}

apply_aws_infra() {
  source ${KUBEFLOW_INFRA_DIR}/cluster_features.sh

  if ! eksctl get cluster --name=${AWS_CLUSTER_NAME} >/dev/null ; then
    create_eks_cluster

    # Find nodegroup role for later inline policy binding
    AWS_NODEGROUP_ROLE_NAMES=$(aws iam list-roles \
      | jq -r ".Roles[] \
      | select(.RoleName \
      | startswith(\"eksctl-${AWS_CLUSTER_NAME}\") and contains(\"NodeInstanceRole\")) \
      .RoleName")
    AWS_NODEGROUP_ROLE_NAMES=$(echo ${AWS_NODEGROUP_ROLE_NAMES} | sed -e 's/ /,/g')

    if [[ -z "$AWS_NODEGROUP_ROLE_NAMES" ]]; then
      echo "AWS_NODEGROUP_ROLE_NAMES cannot be empty. Error list roles from new created cluster"
      exit 1
    fi

    echo "AWS_NODEGROUP_ROLE_NAMES=${AWS_NODEGROUP_ROLE_NAMES}" >> ${KUBEFLOW_REPO}/${DEPLOYMENT_NAME}/${ENV_FILE}
    echo "MANAGED_CLUSTER=true" >> ${KUBEFLOW_REPO}/${DEPLOYMENT_NAME}/${ENV_FILE}
  fi

  set +e
  O=$(kubectl get namespace ${K8S_NAMESPACE} 2>&1)
  RESULT=$?
  set -e

  if [ "${RESULT}" -eq 0 ]; then
    echo namespace ${K8S_NAMESPACE} already exists
  else
    kubectl create namespace ${K8S_NAMESPACE}
  fi

  attach_inline_policy iam_alb_ingress_policy ${KUBEFLOW_INFRA_DIR}/iam_alb_ingress_policy.json
  attach_inline_policy iam_csi_fsx_policy ${KUBEFLOW_INFRA_DIR}/iam_csi_fsx_policy.json
  if [ "$WORKER_NODE_GROUP_LOGGING" = true ]; then
    attach_inline_policy iam_cloudwatch_policy ${KUBEFLOW_INFRA_DIR}/iam_cloudwatch_policy.json
  fi

  # Customize private access and control panel Logging
  if [ "$PRIVATE_ACCESS" = true ]; then
    update_config=$(aws eks update-cluster-config --name ${AWS_CLUSTER_NAME} --region ${AWS_REGION} --resources-vpc-config \
      endpointPublicAccess=${ENDPOINT_PUBLIC_ACCESS},endpointPrivateAccess=${ENDPOINT_PRIVATE_ACCESS})
    wait_cluster_update $(echo $update_config | jq -r '.update.id')
  fi

  if [ "$CONTROL_PLANE_LOGGING" = true ]; then
    logging_components=$(echo $CONTROL_PLANE_LOGGING_COMPONENTS | sed 's/[^,]*/"&"/g')
    update_config=$(aws eks update-cluster-config --name ${AWS_CLUSTER_NAME} --region ${AWS_REGION} \
      --logging '{"clusterLogging":[{"types":['${logging_components}'],"enabled":true}]}')
    wait_cluster_update $(echo $update_config | jq -r '.update.id')
  fi
}

wait_cluster_update() {
  local update_id=$1
  until [ $(aws eks describe-update --name ${AWS_CLUSTER_NAME} --region ${AWS_REGION} --update-id ${update_id} | jq -r '.update.status') = 'Successful' ]; do
    echo "eks is updating cluster configuraion, wait for 15s..."
    sleep 15
  done
}

attach_inline_policy() {
  declare -r POLICY_NAME="$1" POLICY_DOCUMENT="$2"

  for IAM_ROLE in ${AWS_NODEGROUP_ROLE_NAMES//,/ }
  do
    echo "Attach inline policy $POLICY_NAME for iam role $IAM_ROLE"
    if ! aws iam put-role-policy --role-name $IAM_ROLE --policy-name $POLICY_NAME --policy-document file://${POLICY_DOCUMENT}; then
        echo "Unable to attach iam inline policy $POLICY_NAME to role $IAM_ROLE" >&2
        return 1
    fi
  done

  return 0
}

################################ Kubernetes Changes ################################

install_k8s_manifests() {
  source ${KUBEFLOW_INFRA_DIR}/cluster_features.sh
  # Download k8s manifests for resources to deploy on the cluster and install them.
  mkdir -p ${KUBEFLOW_K8S_MANIFESTS_DIR}

  # Only install cluster level kubernetes addons here
  install_gpu_driver
  install_istio

  if [[ ! -z "$WORKER_NODE_GROUP_LOGGING" ]]; then
    install_fluentd_cloudwatch
  fi
}

install_gpu_driver() {
  local INSTANCE_TYPE=$(kubectl get nodes -o jsonpath='{.items[*].metadata.labels.beta\.kubernetes\.io/instance-type}')

  # Install the nvidia device plugin for accelarator nodes
  if [[ ($INSTANCE_TYPE == *"p2"*) || ($INSTANCE_TYPE == *"p3"*) ]]; then
    if [[ $(kubectl get ds --all-namespaces | grep nvidia-device-plugin) ]]; then
      echo "You already install nvidia-device-plugin"
    else
      kubectl apply -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/1.0.0-beta/nvidia-device-plugin.yml
      echo "installed nvidia-device-plugin"
    fi
  fi
}

install_fluentd_cloudwatch() {
  # Install Fluentd-Cloudwatch Kubernetes agents.
  curl -o ${KUBEFLOW_K8S_MANIFESTS_DIR}/fluentd-cloudwatch.yaml \
    https://eksworkshop.com/logging/deploy.files/fluentd.yml

  replace_text_in_file "us-west-2" ${AWS_REGION} ${KUBEFLOW_K8S_MANIFESTS_DIR}/fluentd-cloudwatch.yaml
  replace_text_in_file "eksworkshop-eksctl" ${AWS_CLUSTER_NAME} ${KUBEFLOW_K8S_MANIFESTS_DIR}/fluentd-cloudwatch.yaml

  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/fluentd-cloudwatch.yaml
}

install_istio() {
  # Use customized istio manifests direclty https://www.kubeflow.org/docs/components/istio/
  curl -o ${KUBEFLOW_K8S_MANIFESTS_DIR}/istio-crds.yaml \
    https://raw.githubusercontent.com/kubeflow/kubeflow/master/dependencies/istio/install/crds.yaml

  # 1. sidecar injection configmap policy is changed from enabled to disabled
  # 2. istio-ingressgateway is of type NodePort instead of LoadBalancer
  curl -o ${KUBEFLOW_K8S_MANIFESTS_DIR}/istio-noauth.yaml \
    https://raw.githubusercontent.com/kubeflow/kubeflow/master/dependencies/istio/install/istio-noauth.yaml

  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/istio-crds.yaml
  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/istio-noauth.yaml

  kubectl label namespace ${K8S_NAMESPACE} istio-injection=enabled --overwrite
}

################################ Ksonnet changes ################################
generate_aws_ks_app() {
  pushd .
  cd "${KUBEFLOW_KS_DIR}"

  # Install the aws package
  ks pkg install kubeflow/aws

  # relace with cluster namespace
  ks generate aws-alb-ingress-controller aws-alb-ingress-controller --clusterName=${AWS_CLUSTER_NAME}
  ks generate istio-ingress istio-ingress --namespace=${K8S_NAMESPACE}

  # Since JupyterHub will be removed evently, we skip authentication for it.
  popd
}

# TODO: Waiting for alb-ingress-controller iam cert integration
apply_aws_ks() {
  # Apply the components generated
  pushd .
  cd "${KUBEFLOW_KS_DIR}"
  createKsEnv

  if [[ -z $DEFAULT_KUBEFLOW_COMPONENTS ]]; then
    export KUBEFLOW_COMPONENTS+=',"aws-alb-ingress-controller","istio-ingress"'
    writeEnv
    ks param set application components '['$KUBEFLOW_COMPONENTS']'
  fi
  popd
}
################################ arguments and setup validation ################################
validate_aws_arg() {
  if [[ -z "$AWS_CLUSTER_NAME" ]]; then
    echo "eks cluster_name must be provided using --awsClusterName <AWS_CLUSTER_NAME>"
    exit 1
  fi

  if [[ -z "$AWS_REGION" ]]; then
    echo "eks region must be provided using --awsRegion <AWS_REGION>"
    exit 1
  fi
}

check_aws_cli() {
  if ! which "aws" &>/dev/null && ! type -a "aws" &>/dev/null ; then
    echo "You don't have awscli installed. Please install aws cli. https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html"
    exit 1
  fi
}

check_eksctl_cli() {
  # eskctl is recommended to create EKS clusters now. This will be replaced by awscli eventually.
  if ! which "eksctl" &>/dev/null && ! type -a "eksctl" &>/dev/null ; then
    echo "You don't have eksctl installed. Please install eksctl cli. https://eksctl.io/"
    exit 1
  fi
}

check_jsonnet() {
  if ! which "ks" &>/dev/null && ! type -a "ks" &>/dev/null ; then
    echo "You don't have ks installed. Please install ksonnet. https://github.com/ksonnet/ksonnet/"
    exit 1
  fi
}

check_aws_iam_authenticator() {
  if ! which "aws-iam-authenticator" &>/dev/null && ! type -a "aws-iam-authenticator" &>/dev/null ; then
    echo "You don't have aws-iam-authenticator installed. Please install aws-iam-authenticator. https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html"
    exit 1
  fi
}

check_jq() {
  if ! which "jq" &>/dev/null && ! type -a "jq" &>/dev/null ; then
    echo "You don't have jq installed. Please install jq. https://stedolan.github.io/jq/download/"
    exit 1
  fi
}

check_aws_credential() {
  if ! aws sts get-caller-identity >/dev/null ; then
    echo "aws get caller identity failed. Please check the aws credentials provided and try again."
    exit 1
  fi
}

check_nodegroup_roles() {
  if eksctl get cluster --name=${AWS_CLUSTER_NAME} >/dev/null ; then
    if [[ -z "$AWS_NODEGROUP_ROLE_NAMES" ]]; then
      echo "Nodegroup Roles must be provided for existing cluster with --awsNodegroupRoleNames <AWS_NODEGROUP_ROLE_NAMES>"
      exit 1
    fi
  fi
}

check_aws_setups() {
  check_aws_cli
  check_eksctl_cli
  check_jq
  check_jsonnet
  check_aws_iam_authenticator
  check_aws_credential
  check_nodegroup_roles
}

# don't enabled cluster create by default. Use flags to control it.
create_eks_cluster() {
  if ! eksctl create cluster --config-file=${KUBEFLOW_INFRA_DIR}/cluster_config.yaml ; then
    echo "aws eks create failed."
    exit 1
  fi

  local AWS_ROLE_NAME=$(aws sts get-caller-identity | jq -r '.Arn' | cut -d'/' -f2)
  local context_name="${AWS_ROLE_NAME}@${AWS_CLUSTER_NAME}.${AWS_REGION}.eksctl.io"

  if [ `kubectl config use-context ${context_name}` &> /dev/null ] ; then
      eksctl utils write-kubeconfig --name=${AWS_CLUSTER_NAME}
  fi
}

replace_text_in_file() {
  local FIND_TEXT=$1
  local REPLACE_TEXT=$2
  local SRC_FILE=$3

  sed -i.bak "s/${FIND_TEXT}/${REPLACE_TEXT}/" ${SRC_FILE}
  rm $SRC_FILE.bak
}

uninstall_aws_k8s() {
  source ${KUBEFLOW_INFRA_DIR}/cluster_features.sh
  kubectl delete -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/istio-noauth.yaml
  kubectl delete -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/istio-crds.yaml
  if [ "$WORKER_NODE_GROUP_LOGGING" = true ]; then
    kubectl delete -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/fluentd-cloudwatch.yaml
  fi
}

uninstall_aws_platform() {
  source ${KUBEFLOW_INFRA_DIR}/cluster_features.sh

  # Detach inline policy from iam roles
  delete_iam_role_inline_policy iam_alb_ingress_policy
  delete_iam_role_inline_policy iam_csi_fsx_policy
  if [ "$WORKER_NODE_GROUP_LOGGING" = true ]; then
    delete_iam_role_inline_policy iam_cloudwatch_policy
  fi

  MANAGED_CLUSTER=${MANAGED_CLUSTER:-"false"}
  if [ $MANAGED_CLUSTER = "true" ] ; then
    if ! eksctl delete cluster --config-file=${KUBEFLOW_INFRA_DIR}/cluster_config.yaml ; then
      echo "Please go to aws console to check CloudFormation status and double make sure your cluster has been shutdown."
    fi
  fi
}

delete_iam_role_inline_policy() {
  declare -r POLICY_NAME="$1"

  for IAM_ROLE in ${AWS_NODEGROUP_ROLE_NAMES//,/ }
  do
    echo "Deleting inline policy $POLICY_NAME for iam role $IAM_ROLE"
    if ! aws iam delete-role-policy --role-name=$IAM_ROLE --policy-name=$POLICY_NAME; then
        echo "Unable to delete iam inline policy $POLICY_NAME" >&2
    fi
  done
}