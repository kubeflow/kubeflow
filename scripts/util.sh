#!/usr/bin/env bash
# Util functions to be used by scripts in this directory

usage() {
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

check_installed_deps() {
  declare -a kf_deps=("ks" "kubectl")

  for kf_dep in "${kf_app[@]}"; do
    if ! which "${kf_dep}" &>/dev/null && ! type -a "${kf_dep}" &>/dev/null ; then
      echo "You don't have ${kf_dep} installed. Please install ${kf_dep}."
      exit 1
    fi
  done

  # check minimum ks versions
  kf_dep="ks"
  min_ks_ver="0.11.0"
  ks_ver=$(${kf_dep} version | cut -d' ' -f3 | head -1)
  if [ ${ks_ver} \< ${min_ks_ver} ]; then
    echo "Please install ${kf_dep} version ${min_ks_ver} or newer"
    exit 1
  fi
}

checkInstallPy() {
  local PYPI=$1
  local MOD=$2
  if python -c "import pkgutil; exit(pkgutil.find_loader('${MOD}'))" &>/dev/null; then
    echo "Failed to import python module ${MOD}."
    echo "You don't have ${PYPI} installed. Please install ${PYPI}."
    exit 1
  fi
}

check_variable() {
  if [[ -z "${1}" ]]; then
    echo "'${2}' environment variable is not set. Please set it using export ${2}=value."
    exit 1
  fi
}

createKsApp() {
  # Create the ksonnet application.
  # All deployments should call this function to create a common ksonnet app.
  # They can then customize it as necessary.
  pushd .
  # Create the ksonnet app
  cd $(dirname "${KUBEFLOW_KS_DIR}")
  eval ks init $(basename "${KUBEFLOW_KS_DIR}") --skip-default-registries ${KS_INIT_EXTRA_ARGS}
  cd "${KUBEFLOW_KS_DIR}"

  # Remove the default environment; The cluster might not exist yet
  # So we might be pointing to the wrong  cluster.
  ks env rm default

  # Add the local registry
  ks registry add kubeflow "${KUBEFLOW_REPO}/kubeflow"

  # Install all required packages
  ks pkg install kubeflow/argo
  ks pkg install kubeflow/pipeline
  ks pkg install kubeflow/common
  ks pkg install kubeflow/examples
  ks pkg install kubeflow/jupyter
  ks pkg install kubeflow/katib
  ks pkg install kubeflow/mpi-job
  ks pkg install kubeflow/pytorch-job
  ks pkg install kubeflow/seldon
  ks pkg install kubeflow/tf-serving
  ks pkg install kubeflow/openvino
  ks pkg install kubeflow/tensorboard
  ks pkg install kubeflow/tf-training
  ks pkg install kubeflow/metacontroller
  ks pkg install kubeflow/profiles
  ks pkg install kubeflow/application
  ks pkg install kubeflow/modeldb

  # Generate all required components
  ks generate pytorch-operator pytorch-operator
  ks generate ambassador ambassador
  ks generate openvino openvino
  ks generate jupyter jupyter
  ks generate notebook-controller notebook-controller
  ks generate jupyter-web-app jupyter-web-app
  ks generate centraldashboard centraldashboard
  ks generate tf-job-operator tf-job-operator
  ks generate tensorboard tensorboard
  ks generate metacontroller metacontroller
  ks generate profiles profiles
  ks generate notebooks notebooks
  ks generate argo argo
  ks generate pipeline pipeline

  ks generate katib katib
  # Enable collection of anonymous usage metrics
  # To disable metrics collection. Remove the spartakus component.
  # cd ks_app
  # ks component rm spartakus
  # Generate a random 30 bit number
  local usageId=$(((RANDOM << 15) | RANDOM))
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

createKsEnv(){
  pushd ${KUBEFLOW_KS_DIR}
  set +e
  O=$(ks env describe default 2>&1)
  RESULT=$?
  set -e

  if [ "${RESULT}" -eq 0 ]; then
    echo environment default already exists
  else
    ks env add default --namespace "${K8S_NAMESPACE}"
  fi
  popd
}

removeKsEnv() {
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

customizeKsAppWithDockerImage() {
  # customize docker registry
  if [[ ! -z "$KUBEFLOW_DOCKER_REGISTRY" ]]; then
    find ${KUBEFLOW_KS_DIR} -name "*.libsonnet" -o -name "*.jsonnet" | xargs sed -i -e "s%gcr.io%$KUBEFLOW_DOCKER_REGISTRY%g"
    find ${KUBEFLOW_KS_DIR} -name "*.libsonnet" -o -name "*.jsonnet" | xargs sed -i -e "s%quay.io%$KUBEFLOW_DOCKER_REGISTRY%g"
    find ${KUBEFLOW_KS_DIR} -name config.yaml | xargs sed -i -e "s%gcr.io%$KUBEFLOW_DOCKER_REGISTRY%g"
  fi

  # The katib images like gcr.io/kubeflow-images-public/katib/tfevent-metrics-collector:v0.4.0 uses sub namespace kubeflow-images-public/katib in
  # gcr.io repo, but it's not supported by other docker image repo. We need to consider how to support it in other docker repos.
  if [[ ! -z "$DOCKER_REGISTRY_KATIB_NAMESPACE" ]]; then
    find ${KUBEFLOW_KS_DIR} -name "*.libsonnet" -o -name "*.jsonnet" | xargs sed -i -e "s%kubeflow-images-public/katib%$DOCKER_REGISTRY_KATIB_NAMESPACE%g"
  fi
}
