#!/usr/bin/env bash
#
# Define functions to customize the Kubeflow app for AWS.
#
set -xe

aws_init_project() {
  # FSx

  # log permission
  # https://eksworkshop.com/logging/prereqs/
  echo "TODO. Permission setup"
}

################################ Infrastructure Changes ################################

## Prepare Infrastrcture Configurations
generate_infra_configs() {
  # Create the infrastructure configs if they don't exist.
  if [ ! -d "${KUBEFLOW_INFRA_DIR}" ]; then
    echo "Creating AWS infrastructure configs in directory ${KUBEFLOW_INFRA_DIR}"
    mkdir -p "${KUBEFLOW_INFRA_DIR}"
    cp -r ${KUBEFLOW_REPO}/deployment/aws/infra_configs/* ${KUBEFLOW_INFRA_DIR}

    # Create EFS

    # Create RDS

  else
    echo AWS infrastructure configs already exist in directory "${KUBEFLOW_INFRA_DIR}"
  fi
}


update_infra() {
  set +e
  O=$(kubectl get namespace ${K8S_NAMESPACE} 2>&1)
  RESULT=$?
  set -e

  if [ "${RESULT}" -eq 0 ]; then
    echo namespace ${K8S_NAMESPACE} already exists
  else
    kubectl create namespace ${K8S_NAMESPACE}
  fi
}

################################ Kubernetes Changes ################################

install_k8s_manifests() {
  # Download k8s manifests for resources to deploy on the cluster and install them.
  mkdir -p ${KUBEFLOW_K8S_MANIFESTS_DIR}

  # Create secret to store aws credentials
  #create_secrets

  # Only install cluster level kubernetes addons here
  install_gpu_driver
  install_fluentd_cloudwatch
  #install_alb_ingress_controller
  #install_csi_driver
}

create_secrets() {
  create_aws_secret ${K8S_NAMESPACE} aws_secret
}

# TensorFlow Serving, TensorBoard and CSI FSx for Lustre both use AWS secret.
create_aws_secret() {
  # Store aws credentials in a k8s secret.
  local NAMESPACE=$1
  local SECRET=$2

  check_variable "${AWS_ACCESS_KEY_ID}" "AWS_ACCESS_KEY_ID"
  check_variable "${AWS_SECRET_ACCESS_KEY}" "AWS_SECRET_ACCESS_KEY"

  set +e
  O=$(kubectl get secret --namespace=${NAMESPACE} ${SECRET} 2>&1)
  local RESULT=$?
  set -e

  if [ "${RESULT}" -eq 0 ]; then
    echo "secret ${SECRET} already exists"
    return
  fi

  kubectl create secret generic --namespace=${NAMESPACE} ${SECRET} --from-literal=key_id=$AWS_ACCESS_KEY_ID --from-literal=access_key=$AWS_SECRET_ACCESS_KEY
}

install_gpu_driver() {
  local INSTANCE_TYPE=$(kubectl get nodes -o jsonpath='{.items[0].metadata.labels.beta\.kubernetes\.io/instance-type}')

  # Install the nvidia device plugin for accelarator nodes
  if [[ ($INSTANCE_TYPE == *"p2"*) || ($INSTANCE_TYPE == *"p3"*) ]]; then
    if [ ! `kubectl get ds --all-namespaces | grep nvidia-device-plugin` ] ; then
        kubectl apply -f https://raw.githubusercontent.com/nvidia/k8s-device-plugin/v1.11/nvidia-device-plugin.yml
        echo "installed nvidia-device-plugin"
    fi
  fi
}

install_fluentd_cloudwatch() {
  # Install Fluentd-Cloudwatch Kubernetes agents.
  curl -o ${KUBEFLOW_K8S_MANIFESTS_DIR}/fluentd-cloudwatch.yaml \
    https://eksworkshop.com/logging/deploy.files/fluentd.yml

  replace_text_in_file "us-west-2" ${AWS_REGION} ${KUBEFLOW_K8S_MANIFESTS_DIR}/fluentd-cloudwatch.yaml
  replace_text_in_file "eksworkshop-eksctl" ${DEPLOYMENT_NAME} ${KUBEFLOW_K8S_MANIFESTS_DIR}/fluentd-cloudwatch.yaml

  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/fluentd-cloudwatch.yaml
}

install_alb_ingress_controller() {
  # Install AWS ALB Ingress controller.
  curl -o ${KUBEFLOW_K8S_MANIFESTS_DIR}/aws-alb-ingress-controller-rbac.yaml \
    https://raw.githubusercontent.com/kubernetes-sigs/aws-alb-ingress-controller/v1.1.0/docs/examples/rbac-role.yaml

  curl -o ${KUBEFLOW_K8S_MANIFESTS_DIR}/aws-alb-ingress-controller.yaml \
    https://raw.githubusercontent.com/kubernetes-sigs/aws-alb-ingress-controller/v1.1.0/docs/examples/alb-ingress-controller.yaml

  replace_text_in_file "devCluster" ${DEPLOYMENT_NAME} ${KUBEFLOW_K8S_MANIFESTS_DIR}/aws-alb-ingress-controller.yaml

  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/aws-alb-ingress-controller-rbac.yaml
  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/aws-alb-ingress-controller.yaml
}

install_csi_driver() {
  # Install CSI driver for aws FSx for Lustre. FSx controller needs aws-secret
  curl -o ${KUBEFLOW_K8S_MANIFESTS_DIR}/csi-driver-aws-fsx-controller.yaml \
    https://raw.githubusercontent.com/aws/csi-driver-amazon-fsx/master/deploy/kubernetes/controller.yaml

  curl -o ${KUBEFLOW_K8S_MANIFESTS_DIR}/csi-driver-aws-fsx-node.yaml \
    https://raw.githubusercontent.com/aws/csi-driver-amazon-fsx/master/deploy/kubernetes/node.yaml

  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/csi-driver-aws-fsx-controller.yaml
  kubectl apply -f ${KUBEFLOW_K8S_MANIFESTS_DIR}/csi-driver-aws-fsx-node.yaml
}

################################ Ksonnet changes ################################


aws_generate_ks_app() {
  pushd .
  cd "${KUBEFLOW_KS_DIR}"

  # Install the aws package
  ks pkg install kubeflow/aws

  ks generate aws-alb-ingress-controller aws-alb-ingress-controller --namespace=${K8S_NAMESPACE} --clusterName=${DEPLOYMENT_NAME}
  ks generate aws-fsx-csi-driver aws-fsx-csi-driver --namespace=${K8S_NAMESPACE}
  # we need ingress

  #ks param set jupyter jupyterHubAuthenticator cognito
  #ks param set pipeline mysqlPd "${DEPLOYMENT_NAME}-storage-metadata-store"
  #ks param set pipeline minioPd "${DEPLOYMENT_NAME}-storage-artifact-store"

  popd
}

# TODO: Waiting for alb-ingress-controller iam cert integration
aws_ks_apply() {
  # Apply the components generated
  pushd .
  cd "${KUBEFLOW_KS_DIR}"
  createKsEnv

  if [[ -z $DEFAULT_KUBEFLOW_COMPONENTS ]]; then
    export KUBEFLOW_COMPONENTS+=',"aws-alb-ingress-controller","aws-fsx-csi-driver"'
    writeEnv
    ks param set application components '['$KUBEFLOW_COMPONENTS']'
  fi
  popd
}

validate_aws_arg() {
  if [[ -z "$AWS_ACCESS_KEY_ID" ]]; then
    echo "AWS aws_access_key_id must be provided using --aws_access_key_id <AWS_ACCESS_KEY_ID>"
    exit 1
  fi
  if [[ -z "$AWS_SECRET_ACCESS_KEY" ]]; then
    echo "AWS aws_secret_access_key must be provided using --aws_secret_access_key <AWS_SECRET_ACCESS_KEY>"
    exit 1
  fi
  if [[ -z "$AWS_REGION" ]]; then
    echo "AWS region must be provided using --aws_region <AWS_REGION>"
    exit 1
  fi

  # Rest of them are all optional, we can provide default value there
  if [[ -z "$AWS_SSH_PUBLIC_KEY" ]]; then
      aws_ssh_public_key_option="--ssh-access --ssh-public-key=${AWS_SSH_PUBLIC_KEY}"
  else
      aws_ssh_public_key_option=""
  fi

  # set default value
  if [[ -z "$AWS_NODE_ZONES" ]]; then
      aws_node_zones_option="--node-zones=${AWS_NODE_ZONES}"
  else
      aws_node_zones_option=""
  fi

  if [[ -z "$AWS_NUM_NODES" ]]; then
      aws_num_nodes_option="--nodes=${AWS_NUM_NODES}"
  else
      aws_num_nodes_option=""
  fi

  if [[ -z "$AWS_NODE_TYPE" ]]; then
      aws_node_type_option="--node-type=${AWS_NODE_TYPE}"
  else
      aws_node_type_option=""
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

check_aws_credential() {
    if ! aws sts get-caller-identity >/dev/null ; then
      echo "aws get caller identity failed. Please check the aws credentials provided and try again."
      exit 1
    fi
}

# don't enabled cluster create by default. Use flags to control it.
create_eks_cluster() {
  OPTIONS="${aws_ssh_public_key_option} ${aws_node_zones_option} ${aws_num_nodes_option} ${aws_node_type_option}"

  if [ `eksctl get cluster --name "${DEPLOYMENT_NAME}"  "${OPTIONS}"` == "false" ] ; then
      if ! eksctl create --name "${DEPLOYMENT_NAME}" --region "${AWS_LOCATION} " &>/dev/null ; then
          echo "aws eks create failed."
          exit 1
      fi
  else
      echo "Kubernetes cluster already exists, skip aws eks cluster create."
  fi

  local context_name = "eks-dev@${DEPLOYMENT_NAME}.${AWS_REGION}.eksctl.io"

  if [ `kubectl config use-context ${context_name}` &> /dev/null ] ; then
      eksctl utils  write-kubeconfig --name=${DEPLOYMENT_NAME}
  fi
}

replace_text_in_file() {
  local FIND_TEXT=$1
  local REPLACE_TEXT=$2
  local SRC_FILE=$3

  sed -i.bak "s/${FIND_TEXT}/${REPLACE_TEXT}/" ${SRC_FILE}
  rm $SRC_FILE.bak
}