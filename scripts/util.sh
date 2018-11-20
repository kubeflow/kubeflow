#!/usr/bin/env bash
# Util functions to be used by scripts in this directory

usage() {
  echo "usage: kfctl <command> <what>"
  echo "where command is one of"
  echo "init - initialize something"
  echo "add [-h|--help] <module> [--apply] --dependsOn <component[/prototype]>+"
  echo "apply  -- apply some config"
  echo "delete - delete some components"
  echo
  echo "what is one of"
  echo "project - the GCP project"
  echo "platform - platform resources (e.g. GCP, minikube); basically non K8s resources"
  echo "k8s - kubernetes resources"
  echo "help - print this message"
}

check_install() {
  if ! which "${1}" &>/dev/null; then
    echo "You don't have ${1} installed. Please install ${1}."
    exit 1
  fi
}

check_variable() {
  if [[ -z "${1}" ]]; then
    echo "'${2}' environment variable is not set. Please set it using export ${2}=value."
    exit 1
  fi
}

getmodules() {
  local moduleList=''
  for i in $(ks env describe default | grep '^-' | awk '{print $2}'); do
    moduleList="$moduleList --module $i "
 done
 echo "$moduleList"
}

addmodule() {
  local apply=false module=${1%/*} currentModules nestedModule moduleList oneOrMorePrototypes prototype index
  declare -a dependsOn modules prototypes packages
  shift

  while [[ "$#" -gt "0" && $1 =~ ^- ]]; do
    case "$1" in
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
      oneOrMorePrototypes=${index#*/}
      if [[ $oneOrMorePrototypes =~ { ]]; then
        oneOrMorePrototypes=${oneOrMorePrototypes:1:$((${#oneOrMorePrototypes}-2))}
        IFS=',' read -r -a prototypes <<<"$oneOrMorePrototypes"
      else 
        prototypes=($oneOrMorePrototypes)
      fi
      for prototype in "${prototypes[@]}"; do
        ks generate $prototype $prototype --module $module
      done
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

createKsApp() {
  local usageId=$(((RANDOM << 15) | RANDOM))
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

  # Generate all required components
  # Enable collection of anonymous usage metrics
  # To disable metrics collection. Remove the spartakus component.
  # cd ks_app
  # ks component rm spartakus
  # Generate a random 30 bit number
  addmodule core --dependsOn 'core/{ambassador,centraldashboard,spartakus}'
  addmodule jupyter --dependsOn jupyter
  addmodule pytorch --dependsOn 'pytorch-job/{pytorch-job,pytorch-operator}'
  addmodule training --dependsOn tf-training/tf-job-operator
  addmodule serving --dependsOn tf-serving
  addmodule profiles --dependsOn profiles metacontroller

  if [ "${PLATFORM}" != "minikube" ]; then
    addmodule argo --dependsOn argo
    addmodule seldon --dependsOn seldon
    addmodule katib --dependsOn katib
  fi
  addmodule application --dependsOn application
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

  ks param set core.ambassador platform ${KUBEFLOW_PLATFORM} --env default
  ks param set core.spartakus usageId ${usageId} --env default
  ks param set core.spartakus reportUsage true --env default
  ks param set jupyter.jupyter platform ${KUBEFLOW_PLATFORM} --env default
  ks show default > default.yaml
}

function removeKsEnv() {
  pushd ${KUBEFLOW_KS_DIR}
  ks env describe default 2>&1 && ks delete default || echo "'default' environment doesn't exist"
  popd
}

customizeKsAppWithDockerImage() {
  # customize docker registry
  if [[ ! -z "$KUBEFLOW_DOCKER_REGISTRY" ]]; then
    find ${KUBEFLOW_KS_DIR} -name "*.libsonnet" -o -name "*.jsonnet" | xargs sed -i -e "s%gcr.io%$KUBEFLOW_DOCKER_REGISTRY%g"
    find ${KUBEFLOW_KS_DIR} -name "*.libsonnet" -o -name "*.jsonnet" | xargs sed -i -e "s%quay.io%$KUBEFLOW_DOCKER_REGISTRY%g"
  fi
}
