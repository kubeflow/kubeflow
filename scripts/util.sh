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

function getmodules() {
  local moduleList=''
  for i in $(ks env describe default | grep '^-' | awk '{print $2}'); do
    moduleList="$moduleList --module $i "
 done
 echo "$moduleList"
}

function addmodulecommand() {
  local module=$1 nestedModule modulePath moduleList index
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
    esac
  done

  moduleList="$(getmodules)"
  echo ks module create $module
  ks module create $module
  moduleList="${moduleList} --module $module "

  if (( ${#dependsOn[@]} > 0 )); then
    for index in "${dependsOn[@]}"; do
      if [[ $index != "${dependsOn[0]}" ]]; then
        echo ks module create ${module}'.'$index
        ks module create ${module}'.'$index
        module=${module}'.'$index
        modules+=($module)
      fi
      if [[ -d ${KUBEFLOW_REPO}/kubeflow/$index ]]; then
        echo ks pkg install kubeflow/$index
        ks pkg install kubeflow/$index
      elif [[ -f $(echo ${KUBEFLOW_REPO}/kubeflow/*/${index}.libsonnet) ]]; then
        package=$(dirname $(echo ${KUBEFLOW_REPO}/kubeflow/*/${index}.libsonnet))
        package=$(basename $package)
        if [ -z ${packages["${package}"]+_} ]; then
          packages[$package]='true'
          echo ks pkg install kubeflow/$package
          ks pkg install kubeflow/$package
        fi
      fi
      echo ks generate $index $index --module $module
      ks generate $index $index --module $module
    done
  
    for nestedModule in "${modules[@]}"; do
      module=${nestedModule##*.}
      moduleList="$moduleList --module $nestedModule "
    done
  fi

  echo ks env targets default $moduleList
  ks env targets default $moduleList

  ks show default | tee default.yaml
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
  ks env add default --namespace "${K8S_NAMESPACE}"
  ks env current --set default

  # Add the local registry
  ks registry add kubeflow "${KUBEFLOW_REPO}/kubeflow"

  # Install all required packages
  addmodulecommand workflows --dependsOn argo
  addmodulecommand core --dependsOn ambassador centraldashboard
  addmodulecommand training --dependsOn katib tf-training
  addmodulecommand inference --dependsOn tf-serving seldon
  addmodulecommand profiles --dependsOn profiles metacontroller
  addmodulecommand notebooks --dependsOn jupyter 
  
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
