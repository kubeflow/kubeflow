#!/bin/bash
# Util functions to be used by scripts in this directory

function usage() {
    echo "usage: kfctl <command> <what>"
    echo "where command is one of"
    echo "init - initialize something"
    echo "apply  -- apply some config"
    echo "delete - delete some components"
    echo
    echo "what is one of"
    echo "project - the GCP project"
    echo "platform - platform resources (e.g. GCP, minikube); basically non K8s resources"
    echo "k8s - kubernetes resources"
    echo "help - print this message"
}


function check_install() {
  if ! which "${1}" &>/dev/null; then
    echo "You don't have ${1} installed. Please install ${1}."
    exit 1
  fi
}

function check_variable() {
  if [[ -z "${1}" ]]; then
    echo "'${2}' environment variable is not set. Please set it using export ${2}=value."
    exit 1
  fi
}

function createKsApp() {
  # Create the ksonnet application.
  # All deployments should call this function to create a common ksonnet app.
  # They can then customize it as necessary.
  pushd .
  # Create the ksonnet app
  cd $(dirname "${KUBEFLOW_KS_DIR}")
  ks init $(basename "${KUBEFLOW_KS_DIR}")
  cd "${KUBEFLOW_KS_DIR}"

  # Remove the default environment; The cluster might not exist yet
  # So we might be pointing to the wrong  cluster.
  ks env rm default

  # Add the local registry
  ks registry add kubeflow "${KUBEFLOW_REPO}/kubeflow"

  # Install all required packages
  ks pkg install kubeflow/argo
  ks pkg install kubeflow/core
  ks pkg install kubeflow/examples
  ks pkg install kubeflow/katib
  ks pkg install kubeflow/mpi-job
  ks pkg install kubeflow/pytorch-job
  ks pkg install kubeflow/seldon
  ks pkg install kubeflow/tf-serving
  ks pkg install kubeflow/application

  # Generate all required components
  ks generate pytorch-operator pytorch-operator
  # TODO(jlewi): Why are we overloading the ambassador images here?
  ks generate ambassador ambassador
  ks generate jupyterhub jupyterhub
  ks generate centraldashboard centraldashboard
  ks generate tf-job-operator tf-job-operator

  ks generate argo argo
  ks generate katib katib
  # Enable collection of anonymous usage metrics
  # To disable metrics collection. Remove the spartakus component.
  # cd ks_app
  # ks component rm spartakus
  # Generate a random 30 bit number
  local usageId=$(((RANDOM<<15)|RANDOM))
  ks generate spartakus spartakus --usageId=${usageId} --reportUsage=true
  echo ""
  echo "****************************************************************"
  echo "Notice anonymous usage reporting enabled using spartakus"
  echo "To disable it"
  echo "If you have already deployed it run the following commands:"
  echo "  cd $(pwd)"
  echo "  ks delete default -c spartakus"
  echo "  kubectl -n ${K8S_NAMESPACE} delete deploy -l app=spartakus"
  echo " "
  echo "Then run the following command to remove it from your ksonnet app"
  echo "  ks component rm spartakus"
  echo ""
  echo "For more info: https://www.kubeflow.org/docs/guides/usage-reporting/"
  echo "****************************************************************"
  echo ""
  ks generate application application
}

function removeKsEnv() {
  pushd ${KUBEFLOW_KS_DIR}
  set +e
  O=$(ks env describe default 2>&1)
  RESULT=$?
  set -e
  if [ "${RESULT}" -eq 0 ]; then
    # Remove the default environment for the deleted cluster
    ks env rm default
  else
    echo environment default is already removed
  fi
  popd
}

function customizeKsAppWithDockerImage() {
   # customize docker registry
   if [[ ! -z "$KUBEFLOW_DOCKER_REGISTRY" ]]; then
      find ${KUBEFLOW_KS_DIR} -name "*.libsonnet" -o -name "*.jsonnet" | xargs sed -i -e "s%gcr.io%$KUBEFLOW_DOCKER_REGISTRY%g"
      find ${KUBEFLOW_KS_DIR} -name "*.libsonnet" -o -name "*.jsonnet" | xargs sed -i -e "s%quay.io%$KUBEFLOW_DOCKER_REGISTRY%g"
   fi
}
