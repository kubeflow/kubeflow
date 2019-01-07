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

createEnv() {
  # Check if there is a file env.sh
  # If there is source it otherwise create it.
  # this ensures all relevant environment variables are persisted in
  # a file for consistency across runs.
  echo PLATFORM=${PLATFORM} >> ${ENV_FILE}
  DEFAULT_KUBEFLOW_REPO="$(cd "${DIR}/.." > /dev/null && pwd)"
  # Remove trailing slash from the repo.
  KUBEFLOW_REPO=${KUBEFLOW_REPO%/}
  echo KUBEFLOW_REPO=${KUBEFLOW_REPO:-"${DEFAULT_KUBEFLOW_REPO}"} >> ${ENV_FILE}
  echo KUBEFLOW_VERSION=${KUBEFLOW_VERSION:-"master"} >> ${ENV_FILE}
  echo KUBEFLOW_KS_DIR=${KUBEFLOW_KS_DIR:-"$(pwd)/ks_app"} >> ${ENV_FILE}
  echo KUBEFLOW_DOCKER_REGISTRY=${KUBEFLOW_DOCKER_REGISTRY:-""} >> ${ENV_FILE}

  # Namespace where kubeflow is deployed
  echo K8S_NAMESPACE=${K8S_NAMESPACE:-"kubeflow"} >> ${ENV_FILE}

  case "$PLATFORM" in
    minikube)
      echo KUBEFLOW_PLATFORM=minikube >> ${ENV_FILE}
      echo MOUNT_LOCAL=${MOUNT_LOCAL} >> ${ENV_FILE}
      ;;
    docker-for-desktop)
      echo KUBEFLOW_PLATFORM=docker-for-desktop >> ${ENV_FILE}
      echo MOUNT_LOCAL=${MOUNT_LOCAL} >> ${ENV_FILE}
      ;;
    ack)
      echo KUBEFLOW_PLATFORM=ack >> ${ENV_FILE}
      echo KUBEFLOW_DOCKER_REGISTRY=registry.aliyuncs.com >> ${ENV_FILE}
      ;;
    gcp)
      echo KUBEFLOW_PLATFORM=gke >> ${ENV_FILE}
      echo PROJECT="${PROJECT}" >> ${ENV_FILE}
      echo ZONE=${ZONE} >> ${ENV_FILE}
      echo EMAIL=${EMAIL} >> ${ENV_FILE}

      # TODO: Do we need to make PROJECT_NUMBER also a flag like --project-number
      if [ -z "${PROJECT_NUMBER}" ]; then
        PROJECT_NUMBER=$(gcloud projects describe ${PROJECT} --format='value(project_number)')
      fi

      # Name of the deployment
      DEPLOYMENT_NAME=${DEPLOYMENT_NAME:-"kubeflow"}
      echo DEPLOYMENT_NAME="${DEPLOYMENT_NAME}" >> ${ENV_FILE}

      # Kubeflow directories
      echo KUBEFLOW_DM_DIR=${KUBEFLOW_DM_DIR:-"$(pwd)/gcp_config"} >> ${ENV_FILE}
      echo KUBEFLOW_SECRETS_DIR=${KUBEFLOW_SECRETS_DIR:-"$(pwd)/secrets"} >> ${ENV_FILE}
      echo KUBEFLOW_K8S_MANIFESTS_DIR="$(pwd)/k8s_specs" >> ${ENV_FILE}

      # Name of the K8s context to create.
      echo KUBEFLOW_K8S_CONTEXT=${DEPLOYMENT_NAME} >> ${ENV_FILE}

      # GCP Static IP Name
      echo KUBEFLOW_IP_NAME=${KUBEFLOW_IP_NAME:-"${DEPLOYMENT_NAME}-ip"} >> ${ENV_FILE}
      # Name of the endpoint
      KUBEFLOW_ENDPOINT_NAME=${KUBEFLOW_ENDPOINT_NAME:-"${DEPLOYMENT_NAME}"}
      echo KUBEFLOW_ENDPOINT_NAME=${KUBEFLOW_ENDPOINT_NAME} >> ${ENV_FILE}
      # Complete hostname
      echo KUBEFLOW_HOSTNAME=${KUBEFLOW_HOSTNAME:-"${KUBEFLOW_ENDPOINT_NAME}.endpoints.${PROJECT}.cloud.goog"} >> ${ENV_FILE}

      echo CONFIG_FILE=${CONFIG_FILE:-"cluster-kubeflow.yaml"} >> ${ENV_FILE}

      echo PROJECT_NUMBER=${PROJECT_NUMBER} >> ${ENV_FILE}

      echo GKE_API_VERSION=${GKE_API_VERSION} >> ${ENV_FILE}
      ;;
    *)
      echo KUBEFLOW_PLATFORM=null >> ${ENV_FILE}
      ;;
  esac
}

createNamespace() {
  set +e
  O=$(kubectl get namespace ${K8S_NAMESPACE} 2>&1)
  RESULT=$?
  set -e

  if [ "${RESULT}" -eq 0 ]; then
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

  if [ "${RESULT}" -eq 0 ]; then
    echo "environment default already exists"
  else
    ks env add default --namespace "${K8S_NAMESPACE}"
  fi

  # Create all the components
  ks apply default -c ambassador
  ks apply default -c jupyter
  ks apply default -c centraldashboard
  ks apply default -c tf-job-operator
  ks apply default -c pytorch-operator
  ks apply default -c metacontroller
  ks apply default -c spartakus
  ks apply default -c argo
  ks apply default -c pipeline

  # Reduce resource demands locally
  if [ "${PLATFORM}" != "minikube" ] && [ "${PLATFORM}" != "docker-for-desktop" ]; then
    ks apply default -c katib
  fi

  popd

  set +x
  if [ "${PLATFORM}" == "minikube" ] || [ "${PLATFORM}" == "docker-for-desktop" ]; then
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
  if [ "${PLATFORM}" == "gcp" ]; then
    # GCP Project
    if [ -z "${PROJECT}" ]; then
      PROJECT=$(gcloud config get-value project 2>/dev/null)
      if [ -z "${PROJECT}" ]; then
        echo "GCP project must be set either using --project <PROJECT>"
        echo "or by setting a default project in gcloud config"
        exit 1
      fi
    fi
    # GCP Zone
    if [ -z "$ZONE" ]; then
      ZONE=$(gcloud config get-value compute/zone 2>/dev/null)
      if [ -z "$ZONE" ]; then
        echo "Set default zone to ${GCP_DEFAULT_ZONE}"
        echo "You can override this by setting a default zone in gcloud config"
        echo "or using --zone <ZONE>"
        ZONE=${GCP_DEFAULT_ZONE}
      fi
    fi
    # GCP Email for cert manager
    if [ -z "$EMAIL" ]; then
      EMAIL=$(gcloud config get-value account 2>/dev/null)
      if [ -z "$EMAIL" ]; then
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
      for em in $EM_LIST; do
        if [ "$em" != "$EMAIL" ]; then
          EMAIL=$em
          break
        fi
      done
    fi
  fi
}

main() {
  if [ "${COMMAND}" == "init" ]; then
    DEPLOYMENT_NAME=${WHAT}
    parseArgs $*

    # TODO(jlewi): Should we default to directory name?
    # TODO(jlewi): This doesn't work if user doesn't provide name we will end up
    # interpreting parameters as the name. To fix this we need to check name doesn't start with --
    if [ -z "${DEPLOYMENT_NAME}" ]; then
      echo "name must be provided"
      echo "usage: kfctl init <name>"
      exit 1
    fi
    if [ -d ${DEPLOYMENT_NAME} ]; then
      echo "Directory ${DEPLOYMENT_NAME} already exists"
      exit 1
    fi

    # Check that DEPLOYMENT_NAME is not a path e.g. /a/b/c
    BASE_DEPLOYMENT_NAME=$(basename ${DEPLOYMENT_NAME})

    if [ "${BASE_DEPLOYMENT_NAME}" != "${DEPLOYMENT_NAME}" ]; then
      echo "usage: kfctl init <name>"
      echo "<name> should be the name for the deployment; not a path"
      exit 1
    fi

    mkdir -p ${DEPLOYMENT_NAME}
    # Most commands expect to be executed from the app directory
    cd ${DEPLOYMENT_NAME}
    createEnv

    source ${ENV_FILE}
    
    if [ -z "${PLATFORM}" ]; then
      echo "--platform must be provided"
      echo "usage: kfctl init <PLATFORM>"
      exit 1
    fi
    source "${ENV_FILE}"

    # TODO(jlewi): How can we skip GCP project setup? Add a command line argument
    # to skip it?
    if [ "${PLATFORM}" == "gcp" ]; then
      if ${SKIP_INIT_PROJECT}; then
        echo "skipping project initialization"
      else
        echo initializing project
        gcpInitProject
      fi
    fi
  fi

  source ${ENV_FILE}

  if [ -z "${COMMAND}" ]; then
    echo "COMMAND must be provided"
    usage
    exit 1
  fi

  if [ -z "${WHAT}" ]; then
    echo "WHAT must be provided"
    usage
    exit 1
  fi

  # TODO(ankushagarwal): verify ks version is higher than 0.11.0
  check_install ks
  check_install kubectl

  if [ "${PLATFORM}" == "gcp" ]; then
    checkInstallPy pyyaml yaml
  fi

  if [ "${COMMAND}" == "generate" ]; then
    if [ "${WHAT}" == "platform" ] || [ "${WHAT}" == "all" ]; then
      if [ "${PLATFORM}" == "gcp" ]; then
        generateDMConfigs
        downloadK8sManifests
      fi
    fi

    if [ "${WHAT}" == "k8s" ] || [ "${WHAT}" == "all" ]; then
      createKsApp
      customizeKsApp
      customizeKsAppWithDockerImage

      if [ "${PLATFORM}" == "gcp" ]; then
        gcpGenerateKsApp
      fi

      if [ "${PLATFORM}" == "minikube" ] || [ "${PLATFORM}" == "docker-for-desktop" ]; then
        create_local_fs_mount_spec
        if ${MOUNT_LOCAL}; then
          ks param set jupyter disks "local-notebooks"
          ks param set jupyter notebookUid $(id -u)
          ks param set jupyter notebookGid $(id -g)
          ks param set jupyter accessLocalFs true
        fi
      fi
    fi
  fi

  if [ "${COMMAND}" == "apply" ]; then
    if [ "${WHAT}" == "platform" ] || [ "${WHAT}" == "all" ]; then
      if [ "${PLATFORM}" == "gcp" ]; then
        updateDM
        createSecrets
      fi
    fi

    if [ "${WHAT}" == "k8s" ] || [ "${WHAT}" == "all" ]; then
      ksApply

      if [ "${PLATFORM}" == "gcp" ]; then
        gcpKsApply
      fi

      # all components deployed
      # deploy the application CR
      pushd ${KUBEFLOW_KS_DIR}
      ks apply default -c application
      popd
    fi
  fi

  if [ "${COMMAND}" == "delete" ]; then
    if [ "${WHAT}" == "k8s" ] || [ "${WHAT}" == "all" ]; then
      # Delete kubeflow namespace - this deletes all the ingress objects
      # in the namespace which deletes the associated GCP resources
      set +e
      kubectl delete ns/${K8S_NAMESPACE}
      while kubectl get ns/${K8S_NAMESPACE}; do
        echo "namespace ${K8S_NAMESPACE} not yet deleted. sleeping 10 seconds..."
        sleep 10
      done
      echo "namespace ${K8S_NAMESPACE} successfully deleted."
      set -e
    fi
    if [ "${WHAT}" == "platform" ] || [ "${WHAT}" == "all" ]; then
      if [ "${PLATFORM}" == "gcp" ]; then
        if [ -d "${KUBEFLOW_DM_DIR}" ]; then
          pushd ${KUBEFLOW_DM_DIR}
          ${DIR}/gke/delete_deployment.sh ${PROJECT} ${DEPLOYMENT_NAME} ${CONFIG_FILE}
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
