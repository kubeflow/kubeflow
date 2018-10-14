#!/bin/bash
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

COMMAND=$1
WHAT=$2

ENV_FILE="env.sh"
SKIP_INIT_PROJECT=false
MIN_CLUSTER_VERSION="1.10.6-gke.2"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
source "${DIR}/util.sh"
source "${DIR}/gke/util.sh"
source "${DIR}/util-minikube.sh"

createEnv() {
  # Check if there is a file env.sh
  # If there is source it otherwise create it.
  # this ensures all relevant environment variables are persisted in
  # a file for consistency across runs.
  echo PLATFORM=${PLATFORM} >> ${ENV_FILE}
  DEFAULT_KUBEFLOW_REPO="$( cd "${DIR}/.." >/dev/null && pwd )"
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
      echo KUBEFLOW_CLOUD=minikube >> ${ENV_FILE}
      echo MOUNT_LOCAL=${MOUNT_LOCAL} >> ${ENV_FILE}
      ;;
    ack)
      echo KUBEFLOW_CLOUD=ack >> ${ENV_FILE}
      echo KUBEFLOW_DOCKER_REGISTRY=registry.aliyuncs.com >> ${ENV_FILE}
      ;;
    gcp)
      PROJECT=${PROJECT:-$(gcloud config get-value project 2>/dev/null)}
      echo KUBEFLOW_CLOUD=gke >> ${ENV_FILE}
      echo PROJECT="${PROJECT}" >> ${ENV_FILE}
      if [ -z "${PROJECT}" ]; then
        echo PROJECT must be set either using environment variable PROJECT
        echo or by setting the default project in gcloud
        exit 1
      fi

      # Name of the deployment
      DEPLOYMENT_NAME=${DEPLOYMENT_NAME:-"kubeflow"}
      echo DEPLOYMENT_NAME="${DEPLOYMENT_NAME}" >> ${ENV_FILE}

      # Kubeflow directories
      echo KUBEFLOW_DM_DIR=${KUBEFLOW_DM_DIR:-"$(pwd)/gcp_config"} >> ${ENV_FILE}
      echo KUBEFLOW_SECRETS_DIR=${KUBEFLOW_SECRETS_DIR:-"$(pwd)/secrets"} >> ${ENV_FILE}
      echo KUBEFLOW_K8S_MANIFESTS_DIR="$(pwd)/k8s_specs" >> ${ENV_FILE}

      # Name of the K8s context to create.
      echo  KUBEFLOW_K8S_CONTEXT=${DEPLOYMENT_NAME} >> ${ENV_FILE}

      # GCP Zone
      # The default should be a zone that supports Haswell.
      ZONE=${ZONE:-$(gcloud config get-value compute/zone 2>/dev/null)}
      ZONE=${ZONE:-"us-east1-d"} 
      echo ZONE=${ZONE} >> ${ENV_FILE}

      # Email for cert manager
      EMAIL=${EMAIL:-$(gcloud config get-value account 2>/dev/null)}
      echo EMAIL=${EMAIL} >> ${ENV_FILE}

      # GCP Static IP Name
      echo KUBEFLOW_IP_NAME=${KUBEFLOW_IP_NAME:-"${DEPLOYMENT_NAME}-ip"} >> ${ENV_FILE}
      # Name of the endpoint
      KUBEFLOW_ENDPOINT_NAME=${KUBEFLOW_ENDPOINT_NAME:-"${DEPLOYMENT_NAME}"}
      echo KUBEFLOW_ENDPOINT_NAME=${KUBEFLOW_ENDPOINT_NAME} >> ${ENV_FILE}
      # Complete hostname
      echo KUBEFLOW_HOSTNAME=${KUBEFLOW_HOSTNAME:-"${KUBEFLOW_ENDPOINT_NAME}.endpoints.${PROJECT}.cloud.goog"} >> ${ENV_FILE}

      echo CONFIG_FILE=${CONFIG_FILE:-"cluster-kubeflow.yaml"} >> ${ENV_FILE}

      if [ -z "${PROJECT_NUMBER}" ]; then
        PROJECT_NUMBER=$(gcloud projects describe ${PROJECT} --format='value(project_number)')
      fi

      echo PROJECT_NUMBER=${PROJECT_NUMBER} >> ${ENV_FILE}

      # Settig cluster version, while ensuring we still stick with kubernetes 'v1.10.x'
      SERVER_CONFIG=$(gcloud --project=${PROJECT} container get-server-config --zone=${ZONE})
      CLUSTER_VERSION=$(\
          echo "${SERVER_CONFIG}" | \
          awk '/validNodeVersions/{f=0} f; /validMasterVersions/{f=1}' | \
          awk '{print $2}' | \
          grep '^1.10.[0-9]*[-d]gke.[0-9]*$' | \
          head -1)
      if [[ ${CLUSTER_VERSION} == "" ]]; then
          echo "Setting cluster version to ${MIN_CLUSTER_VERSION}"
          CLUSTER_VERSION=${MIN_CLUSTER_VERSION}
      fi
      echo CLUSTER_VERSION=${CLUSTER_VERSION} >> ${ENV_FILE}
      ;;
    *)
      echo KUBEFLOW_CLOUD=null >> ${ENV_FILE}
      ;;
  esac
}

createNamespace() {
  set +e
  O=`kubectl get namespace ${K8S_NAMESPACE} 2>&1`
  RESULT=$?
  set -e

  if [ "${RESULT}" -eq 0 ]; then
    echo "namespace ${K8S_NAMESPACE} already exists"
  else
    kubectl create namespace ${K8S_NAMESPACE}
  fi
}

if [ "${COMMAND}" == "init" ]; then
	DEPLOYMENT_NAME=${WHAT}

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
        --skipInitProject)
            SKIP_INIT_PROJECT=true
            ;;
        --email)
            shift
            EMAIL=$1
            ;;
      esac
      shift
	done

	mkdir -p ${DEPLOYMENT_NAME}
	# Most commands expect to be executed from the app directory
	cd ${DEPLOYMENT_NAME}
	createEnv
	source ${ENV_FILE}
	# TODO(jlewi): Should we default to directory name?
	# TODO(jlewi): This doesn't work if user doesn't provide name we will end up
	# interpreting parameters as the name. To fix this we need to check name doesn't start with --
	if [ -z "${DEPLOYMENT_NAME}" ]; then
  		echo "name must be provided"
  		echo "usage: kfctl init <name>"
  		exit 1
	fi
    if [ -d ${DEPLOYMENT_NAME} ]; then
		echo Directory ${DEPLOYMENT_NAME} already exists
		exit 1
	fi

	if [ -z "${PLATFORM}" ]; then
  		echo "--platform must be provided"
  		echo "usage: kfctl init <PLATFORM>"
  		exit 1
	fi
	source "${ENV_FILE}"

	# TODO(jlewi): How can we skip GCP project setup? Add a command line argument
	# to skip it?
	if [ "${PLATFORM}" == "gcp" ]; then
	  if [ ! ${SKIP_INIT_PROJECT} ]; then
	  	gcpInitProject
	  fi
	fi

fi

source ${ENV_FILE}

if [ -z "${COMMAND}" ]; then
  echo COMMAND must be provided
  usage
  exit 1
fi

if [ -z "${WHAT}" ]; then
  echo WHAT must be provided
  usage
  exit 1
fi

# TODO(ankushagarwal): verify ks version is higher than 0.11.0
check_install ks
check_install kubectl

# Generate all required components
customizeKsApp() {
  ks param set ambassador cloud ${KUBEFLOW_CLOUD}
  ks param set jupyterhub cloud ${KUBEFLOW_CLOUD}
}

ksApply () {
  pushd ${KUBEFLOW_KS_DIR}

  if [ "${PLATFORM}" == "minikube" ]; then
    createNamespace
  fi

  set +e
  O=$(ks env describe default 2>&1)
  RESULT=$?
  set -e

  if [ "${RESULT}" -eq 0 ]; then
  	echo environment default already exists
  else
    ks env add default --namespace "${K8S_NAMESPACE}"
  fi

  # Create all the core components
  ks apply default -c ambassador
  ks apply default -c jupyterhub
  ks apply default -c centraldashboard
  ks apply default -c tf-job-operator
  ks apply default -c argo
  ks apply default -c katib
  ks apply default -c spartakus
  popd

  set +x
  if [ "${PLATFORM}" == "minikube" ]; then
    if is_kubeflow_ready; then
      mount_local_fs
      setup_tunnels
    else
      echo -e "${RED}Unable to get kubeflow ready${NC}"
    fi
  fi
  set -x
}

source "${ENV_FILE}"

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

    if [ "${PLATFORM}" == "minikube" ]; then
      create_local_fs_mount_spec
      if ${MOUNT_LOCAL}; then
        ks param set jupyterhub disks "local-notebooks"
        ks param set jupyterhub notebookUid `id -u`
        ks param set jupyterhub notebookGid `id -g`
        ks param set jupyterhub accessLocalFs true
      fi
    fi
  fi
fi

if [ "${COMMAND}" == "apply" ]; then
  if [ "${WHAT}" == "platform" ] || [ "${WHAT}" == "all" ] ; then
  	if [ "${PLATFORM}" == "gcp" ]; then
    	updateDM
    	createSecrets
    fi
  fi

  if [ "${WHAT}" == "k8s"  ] || [ "${WHAT}" == "all" ]; then
    createNamespace
    ksApply

    if [ "${PLATFORM}" == "gcp" ]; then
    	gcpKsApply
    fi
  fi
fi

if [ "${COMMAND}" == "delete" ]; then
  if [ "${WHAT}" == "k8s"  ] || [ "${WHAT}" == "all" ]; then
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
  if [ "${WHAT}" == "platform" ] || [ "${WHAT}" == "all" ] ; then
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
