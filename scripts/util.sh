#!/bin/bash
# Util functions to be used by scripts in this directory

function usage() {
    echo "usage: kfctl <command> <what>"
    echo "where command is one of"
    echo "init - initialize something"
    echo "apply  -- apply some config"
    echo "delete - delete some components"
    echo "add <module> --dependsOn <component>+"
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

function getmodules() {
  local moduleList=''
  for i in $(ks env describe default | grep '^-' | awk '{print $2}'); do
    moduleList="$moduleList --module $i "
 done
 echo "$moduleList"
}

function addmodulecommand() {
  local apply=false module=${1%/*} currentModules nestedModule modulePath moduleList index
  shift
  declare -a dependsOn modules packages

  while [[ "$#" -gt "0" && $1 =~ ^- ]]; do
    case "$1" in
      -h|--help)
        echo -e "$0 add \n"\
        '  [-h|--help]\n'\
        '  [-d|--dependsOn] component ...\n'\
        '\n'
        exit 1
        ;;
      -d|--dependsOn)
        shift
        while (( $# > 0 )); do
          dependsOn+=($1)
          shift
        done
        ;;
      -a|--apply)
        shift
        apply=true
        ;;
    esac
  done

  currentModules="$(getmodules)"
  ks module create $module
  moduleList="${moduleList} --module $module "

  if (( ${#dependsOn[@]} > 0 )); then
    for index in "${dependsOn[@]}"; do
      component=${index%/*}
      if [[ $index != "${dependsOn[0]}" ]]; then
        ks module create ${module}'.'$component
        module=${module}'.'$component
        modules+=($module)
      fi
      if [[ -d ${KUBEFLOW_REPO}/kubeflow/$component ]]; then
        ks pkg install kubeflow/$component
      elif [[ -f $(echo ${KUBEFLOW_REPO}/kubeflow/*/${component}.libsonnet) ]]; then
        package=$(dirname $(echo ${KUBEFLOW_REPO}/kubeflow/*/${component}.libsonnet))
        package=$(basename $package)
        if [ -z ${packages["${package}"]+_} ]; then
          packages[$package]='true'
          ks pkg install kubeflow/$package
        fi
      fi
      prototype=${index#*/}
      ks generate $prototype $prototype --module $module
    done
  
    for nestedModule in "${modules[@]}"; do
      module=${nestedModule##*.}
      moduleList="$moduleList --module $nestedModule "
    done
  fi

  ks env targets default $moduleList
  if [[ $apply == true ]]; then
    ks apply default
  fi
  moduleList="$currentModules $moduleList"
  ks env targets default $moduleList
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

  # Add a new default environment with the namespace set
  ks env add default --namespace "${K8S_NAMESPACE}"
  ks env current --set default

  # Add the local registry
  ks registry add kubeflow "${KUBEFLOW_REPO}/kubeflow"

  # Install all required packages
  #if [ "${PLATFORM}" != "minikube" ]; then
  #  addmodulecommand workflows --dependsOn argo
  #fi
  addmodulecommand core --dependsOn ambassador centraldashboard
  #if [ "${PLATFORM}" != "minikube" ]; then
  #  addmodulecommand training --dependsOn katib tf-training/tf-job-operator
  #else
  #  addmodulecommand training --dependsOn tf-training/tf-job-operator
  #fi
  #addmodulecommand inference --dependsOn tf-serving seldon
  #addmodulecommand profiles --dependsOn profiles metacontroller
  addmodulecommand notebooks --dependsOn jupyter 
  
  ks param set core.ambassador platform ${KUBEFLOW_PLATFORM} --env default
  ks param set core.ambassador ambassadorServiceType LoadBalancer --env default
  ks param set notebooks.jupyter platform ${KUBEFLOW_PLATFORM} --env default

  ks show default > default.yaml

  #ks pkg install kubeflow/core
  #ks pkg install kubeflow/examples
  #ks pkg install kubeflow/mpi-job
  #ks pkg install kubeflow/pytorch-job
  #ks pkg install kubeflow/application

  # Generate all required components
  #ks generate pytorch-operator pytorch-operator
  #ks generate ambassador ambassador
  #ks generate jupyter jupyter
  #ks generate centraldashboard centraldashboard
  #ks generate tf-job-operator tf-job-operator
  #ks generate metacontroller metacontroller
  #ks generate profiles profiles

  #ks generate argo argo
  #ks generate katib katib

  # Enable collection of anonymous usage metrics
  # To disable metrics collection. Remove the spartakus component.
  # cd ks_app
  # ks component rm spartakus
  # Generate a random 30 bit number
  #local usageId=$(((RANDOM<<15)|RANDOM))
  #ks generate spartakus spartakus --usageId=${usageId} --reportUsage=true
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
  #ks generate application application
}

function removeKsEnv() {
  pushd ${KUBEFLOW_KS_DIR}
  set +e
  O=$(ks env describe default 2>&1)
  RESULT=$?
  set -e
  if [ "${RESULT}" -eq 0 ]; then
    # Remove the default environment for the deleted cluster
    ks delete default
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
