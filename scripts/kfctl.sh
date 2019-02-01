#!/usr/bin/env bash
# This script provides commands to initialize and manage Kubeflow
# deployments.
#
# Basic usage
#
# kfctl.sh init myapp --platform generatic
# cd myapp
# kfctl.sh generate all
# kfctl.sh apply all
set -xe

ENV_FILE="env.sh"
SKIP_INIT_PROJECT=false

# To enable GKE beta features we need to use the v1beta1 API.
# https://cloud.google.com/kubernetes-engine/docs/reference/api-organization#beta
# We currently use this by default so we can enable the new stackdriver
# logging agents.
GKE_API_VERSION="v1beta1"

# Default GCP zone to deploy Kubeflow cluster if not specified
GCP_DEFAULT_ZONE="us-east1-d"

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"
source "${DIR}/util.sh"
source "${DIR}/gke/util.sh"
source "${DIR}/util-minikube.sh"
INPUT=()
FORMAT=()
export KUBEFLOW_COMPONENTS=${DEFAULT_KUBEFLOW_COMPONENTS:-'"ambassador","jupyter","centraldashboard","tf-job-operator","pytorch-operator","spartakus","argo","pipeline"'}
export KUBEFLOW_EXTENDEDINFO=${KUBEFLOW_EXTENDEDINFO:-false}

# envsubst alternative if envsubst is not installed
if ! which envsubst > /dev/null 2>&1; then
  envsubst() {
    while read line; do
      line=$( echo $line | sed 's/"/\\"/g' )
      eval echo $line
    done
  }
fi

writeEnv() {
  IFS=''
  echo -e "${INPUT[*]}" | envsubst "${FORMAT[*]}" > ${ENV_FILE}
}

createEnv() {
  # Check if there is a file env.sh
  # If there is source it otherwise create it.
  # this ensures all relevant environment variables are persisted in
  # a file for consistency across runs.

  DEFAULT_KUBEFLOW_REPO="$(cd "${DIR}/.." > /dev/null && pwd)"
  # Remove trailing slash from the repo.
  KUBEFLOW_REPO=${KUBEFLOW_REPO%/}

  # builds a set of inputs to be used with envsubst for env.sh 
  # writeEnv updates env.sh when any env var changes
  # eg: envsubst < input.tmpl > env.sh
  INPUT+=('PLATFORM=$PLATFORM\n'
          'KUBEFLOW_REPO=$KUBEFLOW_REPO\n'
          'KUBEFLOW_VERSION=$KUBEFLOW_VERSION\n'
          "KUBEFLOW_COMPONENTS='$KUBEFLOW_COMPONENTS'\n"
          'KUBEFLOW_EXTENDEDINFO=$KUBEFLOW_EXTENDEDINFO\n'
          'KUBEFLOW_KS_DIR=$KUBEFLOW_KS_DIR\n'
          'KUBEFLOW_DOCKER_REGISTRY=$KUBEFLOW_DOCKER_REGISTRY\n'
          'DOCKER_REGISTRY_KATIB_NAMESPACE=$DOCKER_REGISTRY_KATIB_NAMESPACE\n'
          'K8S_NAMESPACE=$K8S_NAMESPACE\n'
          'KUBEFLOW_PLATFORM=$KUBEFLOW_PLATFORM\n'
          'MOUNT_LOCAL=$MOUNT_LOCAL\n'
          'DEPLOYMENT_NAME=$DEPLOYMENT_NAME\n')
  FORMAT+=('$PLATFORM$KUBEFLOW_REPO'
           '$KUBEFLOW_VERSION'
           '$KUBEFLOW_KS_DIR'
           '$KUBEFLOW_DOCKER_REGISTRY'
           '$KUBEFLOW_COMPONENTS'
           '$DOCKER_REGISTRY_KATIB_NAMESPACE'
           '$K8S_NAMESPACE'
           '$KUBEFLOW_PLATFORM$MOUNT_LOCAL'
           '$DEPLOYMENT_NAME'
           '$KUBEFLOW_EXTENDEDINFO')

  export PLATFORM=${PLATFORM:-""}
  export GKE_API_VERSION=${GKE_API_VERSION:-""}
  export KUBEFLOW_REPO=${KUBEFLOW_REPO:-"${DEFAULT_KUBEFLOW_REPO}"}
  export KUBEFLOW_VERSION=${KUBEFLOW_VERSION:-"master"}
  export KUBEFLOW_KS_DIR=${KUBEFLOW_KS_DIR:-"$(pwd)/ks_app"}
  export KUBEFLOW_DOCKER_REGISTRY=${KUBEFLOW_DOCKER_REGISTRY:-""}
  export DOCKER_REGISTRY_KATIB_NAMESPACE=${DOCKER_REGISTRY_KATIB_NAMESPACE:-""}
  # Namespace where kubeflow is deployed
  export K8S_NAMESPACE=${K8S_NAMESPACE:-"kubeflow"}

  case "$PLATFORM" in
    minikube)
      export KUBEFLOW_PLATFORM=minikube 
      export MOUNT_LOCAL=${MOUNT_LOCAL:-""}
      ;;
    docker-for-desktop)
      export KUBEFLOW_PLATFORM=docker-for-desktop
      export MOUNT_LOCAL=${MOUNT_LOCAL:-""}
      ;;
    ack)
      export KUBEFLOW_PLATFORM=ack
      export KUBEFLOW_DOCKER_REGISTRY=registry.aliyuncs.com
      export DOCKER_REGISTRY_KATIB_NAMESPACE=katib
      ;;
    gcp)
      INPUT+=('PROJECT=$PROJECT\n'
              'ZONE=$ZONE\n'
              'EMAIL=$EMAIL\n'
              'PROJECT_NUMBER=$PROJECT_NUMBER\n'
              'KUBEFLOW_DM_DIR=$KUBEFLOW_DM_DIR\n'
              'KUBEFLOW_SECRETS_DIR=$KUBEFLOW_SECRETS_DIR\n'
              'KUBEFLOW_K8S_MANIFESTS_DIR=$KUBEFLOW_K8S_MANIFESTS_DIR\n'
              'KUBEFLOW_K8S_CONTEXT=$KUBEFLOW_K8S_CONTEXT\n'
              'KUBEFLOW_IP_NAME=$KUBEFLOW_IP_NAME\n'
              'KUBEFLOW_ENDPOINT_NAME=$KUBEFLOW_ENDPOINT_NAME\n'
              'KUBEFLOW_HOSTNAME=$KUBEFLOW_HOSTNAME\n'
              'CONFIG_FILE=$CONFIG_FILE\n'
              'GKE_API_VERSION=$GKE_API_VERSION\n')
      FORMAT+=('$PROJECT'
               '$ZONE'
               '$EMAIL'
               '$PROJECT_NUMBER'
               '$KUBEFLOW_DM_DIR'
               '$KUBEFLOW_SECRETS_DIR'
               '$KUBEFLOW_K8S_MANIFESTS_DIR'
               '$KUBEFLOW_K8S_CONTEXT'
               '$KUBEFLOW_IP_NAME'
               '$KUBEFLOW_ENDPOINT_NAME'
               '$KUBEFLOW_HOSTNAME'
               '$CONFIG_FILE$GKE_API_VERSION')

      export KUBEFLOW_PLATFORM=gke
      export PROJECT="${PROJECT}" 
      export ZONE=${ZONE}
      export EMAIL=${EMAIL}

      # TODO: Do we need to make PROJECT_NUMBER also a flag like --project-number
      if [[ -z "${PROJECT_NUMBER}" ]]; then
        export PROJECT_NUMBER=$(gcloud projects describe ${PROJECT} --format='value(project_number)')
      fi

      # Name of the deployment
      export DEPLOYMENT_NAME=${DEPLOYMENT_NAME:-"kubeflow"}

      # Kubeflow directories
      export KUBEFLOW_DM_DIR=${KUBEFLOW_DM_DIR:-"$(pwd)/gcp_config"} 
      export KUBEFLOW_SECRETS_DIR=${KUBEFLOW_SECRETS_DIR:-"$(pwd)/secrets"}
      export KUBEFLOW_K8S_MANIFESTS_DIR="$(pwd)/k8s_specs"

      # Name of the K8s context to create.
      export KUBEFLOW_K8S_CONTEXT=${DEPLOYMENT_NAME}

      # GCP Static IP Name
      export KUBEFLOW_IP_NAME=${KUBEFLOW_IP_NAME:-"${DEPLOYMENT_NAME}-ip"}
      
      # Name of the endpoint
      export KUBEFLOW_ENDPOINT_NAME=${KUBEFLOW_ENDPOINT_NAME:-"${DEPLOYMENT_NAME}"}
      # Complete hostname
      export KUBEFLOW_HOSTNAME=${KUBEFLOW_HOSTNAME:-"${KUBEFLOW_ENDPOINT_NAME}.endpoints.${PROJECT}.cloud.goog"}
      export CONFIG_FILE=${CONFIG_FILE:-"cluster-kubeflow.yaml"}
      ;;
    *)
      export PLATFORM=null
      export KUBEFLOW_PLATFORM=null
      ;;
  esac
  writeEnv
}

createNamespace() {
  set +e
  O=$(kubectl get namespace ${K8S_NAMESPACE} 2>&1)
  RESULT=$?
  set -e

  if [[ "${RESULT}" -eq 0 ]]; then
    echo "namespace ${K8S_NAMESPACE} already exists"
  else
    kubectl create namespace ${K8S_NAMESPACE}
  fi
}

# Generate all required components
customizeKsApp() {
  ks param set ambassador platform ${KUBEFLOW_PLATFORM}
  ks param set jupyter platform ${KUBEFLOW_PLATFORM}
}

ksApply() {
  pushd ${KUBEFLOW_KS_DIR}

  createNamespace

  set +e
  O=$(ks env describe default 2>&1)
  RESULT=$?
  set -e

  if [[ "${RESULT}" -eq 0 ]]; then
    echo "environment default already exists"
  else
    ks env add default --namespace "${K8S_NAMESPACE}"
  fi

  # Reduce resource demands locally
  if [[ "${PLATFORM}" != "minikube" ]] && [[ "${PLATFORM}" != "docker-for-desktop" ]]; then
    if [[ -z ${DEFAULT_KUBEFLOW_COMPONENTS} ]]; then
      export KUBEFLOW_COMPONENTS+=',"katib"'
      writeEnv
      ks param set application components '['$KUBEFLOW_COMPONENTS']'
    fi
  fi

  popd

  set +x
  if [[ "${PLATFORM}" == "minikube" ]] || [[ "${PLATFORM}" == "docker-for-desktop" ]]; then
    if is_kubeflow_ready; then
      mount_local_fs
      setup_tunnels
    else
      echo -e "${RED}Unable to get kubeflow ready${NC}"
    fi
  fi
  set -x
}

parseArgs() {
  # Parse all command line options
  while [[ $# -gt 0 ]]; do
    case $1 in
      -h | --help)
        usage
        exit
        ;;
      --platform)
        shift
        PLATFORM=$1
        ;;
      --project)
        shift
        PROJECT=$1
        ;;
      --zone)
        shift
        ZONE=$1
        ;;
      --email)
        shift
        EMAIL=$1
        ;;
      --gkeApiVersion)
        shift
        GKE_API_VERSION=$1
        ;;       
      --skipInitProject)
        SKIP_INIT_PROJECT=true
        ;;
    esac
    shift
  done

  # Check for gcp specific parameters to be set before proceeding
  if [[ "${PLATFORM}" == "gcp" ]]; then
    # GCP Project
    if [[ -z "${PROJECT}" ]]; then
      PROJECT=$(gcloud config get-value project 2>/dev/null)
      if [[ -z "${PROJECT}" ]]; then
        echo "GCP project must be set either using --project <PROJECT>"
        echo "or by setting a default project in gcloud config"
        exit 1
      fi
    fi
    # GCP Zone
    if [[ -z "$ZONE" ]]; then
      export ZONE=$(gcloud config get-value compute/zone 2>/dev/null)
      if [[ -z "$ZONE" ]]; then
        echo "Set default zone to ${GCP_DEFAULT_ZONE}"
        echo "You can override this by setting a default zone in gcloud config"
        echo "or using --zone <ZONE>"
        export ZONE=${GCP_DEFAULT_ZONE}
      fi
    fi
    # GCP Email for cert manager
    if [[ -z "$EMAIL" ]]; then
      EMAIL=$(gcloud config get-value account 2>/dev/null)
      if [[ -z "$EMAIL" ]]; then
        echo "GCP account must be set either using --email <EMAIL>"
        echo "or by setting a default account in gcloud config"
        exit 1
      fi
      
      # See kubeflow/kubeflow#1936
      # gcloud may not get the case correct for the email.
      # The iam-policy respects the case so we check the IAM policy for the email
      # and if found we use that value.
      # This is an imperfect check because  users might be granted access through
      # a group and will not be explicitly in the IAM policy.
      # So we don't fail on error
      set +e
      EM_LIST="$(gcloud projects get-iam-policy $PROJECT | grep -io $EMAIL)"
      set -e
      for em in ${EM_LIST}; do
        if [[ "$em" != "$EMAIL" ]]; then
          EMAIL=${em}
          break
        fi
      done
    fi
  fi
}

main() {
  if [[ "${COMMAND}" == "init" ]]; then
    export DEPLOYMENT_NAME=${WHAT}
    parseArgs $*

    # TODO(jlewi): Should we default to directory name?
    # TODO(jlewi): This doesn't work if user doesn't provide name we will end up
    # interpreting parameters as the name. To fix this we need to check name doesn't start with --
    if [[ -z "${DEPLOYMENT_NAME}" ]]; then
      echo "name must be provided"
      echo "usage: kfctl init <name>"
      exit 1
    fi
    if [[ ${#DEPLOYMENT_NAME} -gt 25 ]]; then
      echo "Name ${DEPLOYMENT_NAME} should not be longer than 25 characters" 
      exit 1
    fi
    if [[ ${DEPLOYMENT_NAME} == *.*  ]]; then
      echo "Name should not contain '.'"
      exit 1
    fi
    if [[ -d ${DEPLOYMENT_NAME} ]]; then
      echo "Directory ${DEPLOYMENT_NAME} already exists"
      exit 1
    fi
    if [[ ${DEPLOYMENT_NAME} =~ _  ]]; then
      echo "Name should not contain '_'"
      exit 1
    fi

    # Check that DEPLOYMENT_NAME is not a path e.g. /a/b/c
    BASE_DEPLOYMENT_NAME=$(basename ${DEPLOYMENT_NAME})

    if [[ "${BASE_DEPLOYMENT_NAME}" != "${DEPLOYMENT_NAME}" ]]; then
      echo "usage: kfctl init <name>"
      echo "<name> should be the name for the deployment; not a path"
      exit 1
    fi

    mkdir -p ${DEPLOYMENT_NAME}
    # Most commands expect to be executed from the app directory
    cd ${DEPLOYMENT_NAME}
    createEnv

    source ${ENV_FILE}
    
    if [[ -z "${PLATFORM}" ]]; then
      echo "--platform must be provided"
      echo "usage: kfctl init <PLATFORM>"
      exit 1
    fi
    source "${ENV_FILE}"

    # TODO(jlewi): How can we skip GCP project setup? Add a command line argument
    # to skip it?
    if [[ "${PLATFORM}" == "gcp" ]]; then
      if ${SKIP_INIT_PROJECT}; then
        echo "skipping project initialization"
      else
        echo initializing project
        gcpInitProject
      fi
    fi
  fi

  source ${ENV_FILE}

  if [[ -z "${COMMAND}" ]]; then
    echo "COMMAND must be provided"
    usage
    exit 1
  fi

  if [[ -z "${WHAT}" ]]; then
    echo "WHAT must be provided"
    usage
    exit 1
  fi

  # TODO(ankushagarwal): verify ks version is higher than 0.11.0
  check_install ks
  check_install kubectl

  if [[ "${PLATFORM}" == "gcp" ]]; then
    checkInstallPy pyyaml yaml
  fi

  if [[ "${COMMAND}" == "generate" ]]; then
    if [[ "${WHAT}" == "platform" ]] || [[ "${WHAT}" == "all" ]]; then
      if [[ "${PLATFORM}" == "gcp" ]]; then
        generateDMConfigs
        downloadK8sManifests
      fi
    fi

    if [[ "${WHAT}" == "k8s" ]] || [[ "${WHAT}" == "all" ]]; then
      createKsApp
      customizeKsApp
      customizeKsAppWithDockerImage

      if [[ "${PLATFORM}" == "gcp" ]]; then
        gcpGenerateKsApp
      fi

      if [[ "${PLATFORM}" == "minikube" ]] || [[ "${PLATFORM}" == "docker-for-desktop" ]]; then
        create_local_fs_mount_spec
        ks param set ambassador replicas 1
        if ${MOUNT_LOCAL}; then
          ks param set jupyter disks "local-notebooks"
          ks param set jupyter notebookUid $(id -u)
          ks param set jupyter notebookGid $(id -g)
          ks param set jupyter accessLocalFs true
        fi
      fi
    fi
  fi

  if [[ "${COMMAND}" == "apply" ]]; then
    if [[ "${WHAT}" == "platform" ]] || [[ "${WHAT}" == "all" ]]; then
      if [[ "${PLATFORM}" == "gcp" ]]; then
        updateDM
        createSecrets
      fi
    fi

    if [[ "${WHAT}" == "k8s" ]] || [[ "${WHAT}" == "all" ]]; then
      ksApply

      if [[ "${PLATFORM}" == "gcp" ]]; then
        gcpKsApply
      fi

      # all components deployed
      # deploy the application CR
      pushd ${KUBEFLOW_KS_DIR}
      ks param set application name ${DEPLOYMENT_NAME}
      if [[ ${KUBEFLOW_EXTENDEDINFO} == true ]]; then
        ks param set application extendedInfo true
      fi
      ks param set application components '['$KUBEFLOW_COMPONENTS']'
      ks show default -c metacontroller -c application > default.yaml
      kubectl apply --validate=false -f default.yaml
      popd
    fi
  fi

  if [[ "${COMMAND}" == "delete" ]]; then
    if [[ "${WHAT}" == "k8s" ]] || [[ "${WHAT}" == "all" ]]; then
      # Delete kubeflow namespace - this deletes all the ingress objects
      # in the namespace which deletes the associated GCP resources

      # Fetch master information and strip away color markers
      KUBE_INFO=$(kubectl cluster-info | sed 's/\x1B\[[0-9;]\+[A-Za-z]//g')
      pushd ${KUBEFLOW_KS_DIR}
      KS_ENV=default
      KS_ENV_INFO=$(ks env describe ${KS_ENV})
      popd
      KS_MASTER=`expr match "${KS_ENV_INFO}" '.*server[^\.0-9]*\([\.0-9]\+\)'`
      echo KS_MASTER=${KS_MASTER}
      MASTER=`expr match "${KUBE_INFO}" '[^\.0-9]*\([\.0-9]\+\)'`
      echo MASTER=${MASTER}

       if [[ "${MASTER}" != "${KS_MASTER}" ]]; then
        echo "The current kubectl context doesn't match the ks environment"
        echo "Please configure the context to match ks environment ${KS_ENV}"
        exit -1
      else
        echo "kubectl context matches ks environment ${KS_ENV}"
      fi
      set +e
      kubectl delete ns/${K8S_NAMESPACE}
      while kubectl get ns/${K8S_NAMESPACE}; do
        echo "namespace ${K8S_NAMESPACE} not yet deleted. sleeping 10 seconds..."
        sleep 10
      done
      echo "namespace ${K8S_NAMESPACE} successfully deleted."
      set -e
    fi
    if [[ "${WHAT}" == "platform" ]] || [[ "${WHAT}" == "all" ]]; then
      if [[ "${PLATFORM}" == "gcp" ]]; then
        if [[ -d "${KUBEFLOW_DM_DIR}" ]]; then
          pushd ${KUBEFLOW_DM_DIR}
          ${DIR}/gke/delete_deployment.sh --project=${PROJECT} --deployment=${DEPLOYMENT_NAME} --zone=${ZONE}
          popd
        fi
      fi
      removeKsEnv
    fi
  fi
}


# If less than 2 command line options are provided exit early and print usage
if [[ $# -lt 2 ]]; then
  usage
  exit 1
fi

COMMAND=$1
WHAT=$2
shift
shift

main $*
