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

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
source "${DIR}/util.sh"
source "${DIR}/gke/util.sh"

createEnv() {
	# Check if there is a file env.sh
	# If there is source it otherwise create it.
	# this ensures all relevant environment variables are persisted in
	# a file for consistency across runs.
	echo PLATFORM=${PLATFORM} >> ${ENV_FILE}
	DEFAULT_KUBEFLOW_REPO="$( cd "${DIR}/.." >/dev/null && pwd )"
	echo KUBEFLOW_REPO=${KUBEFLOW_REPO:-"${DEFAULT_KUBEFLOW_REPO}"} >> ${ENV_FILE}
	echo KUBEFLOW_VERSION=${KUBEFLOW_VERSION:-"master"} >> ${ENV_FILE}
	echo KUBEFLOW_KS_DIR=${KUBEFLOW_KS_DIR:-"$(pwd)/ks_app"} >> ${ENV_FILE}

	# Namespace where kubeflow is deployed
	echo K8S_NAMESPACE=${K8S_NAMESPACE:-"kubeflow"} >> ${ENV_FILE}

	if [ "${PLATFORM}" == "minikube" ]; then
	  echo KUBEFLOW_CLOUD=minikube >> ${ENV_FILE}
	fi

  if [ "${PLATFORM}" == "ack" ]; then
    echo KUBEFLOW_CLOUD=ack >> ${ENV_FILE}
    echo KUBEFLOW_DOCKER_REGISTRY=registry.aliyuncs.com >> ${ENV_FILE}
  fi

	if [ "${PLATFORM}" == "gcp" ]; then
		PROJECT=${PROJECT:-$(gcloud config get-value project 2>/dev/null)}
		echo KUBEFLOW_CLOUD=gke >> ${ENV_FILE}
		echo PROJECT="${PROJECT}" >> ${ENV_FILE}
		if [ -z "${PROJECT}" ]; then
			echo PROJECT must be set either using environment variable PROJECT
			echo or by setting the default project in gcloud
			exit 1
		fi		
		echo KUBEFLOW_DEPLOY=${KUBEFLOW_DEPLOY:-true} >> ${ENV_FILE}

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
		echo ZONE=${ZONE:-"us-east1-d"} >> ${ENV_FILE}

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
  fi
}

if [ "${COMMAND}" == "init" ]; then
	DEPLOYMENT_NAME=${WHAT}	

	while [ "$1" != "" ]; do
    case $1 in
    	--platform)                  shift
                                     PLATFORM=$1
                                     ;;
        --project)                   shift
                                     PROJECT=$1
                                     ;;
		--skipInitProject)           shift
                                     SKIP_INIT_PROJECT=$1
                                     ;;
        --email)                     shift
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
	  if ! ${SKIP_INIT_PROJECT}; then
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

KUBEFLOW_VERSION=${KUBEFLOW_VERSION:-"master"}
KUBEFLOW_DEPLOY=${KUBEFLOW_DEPLOY:-true}
K8S_NAMESPACE=${K8S_NAMESPACE:-"kubeflow"}
KUBEFLOW_CLOUD=${KUBEFLOW_CLOUD:-"minikube"}
KUBEFLOW_DOCKER_REGISTRY=${KUBEFLOW_DOCKER_REGISTRY:-""}

# TODO(ankushagarwal): verify ks version is higher than 0.11.0
check_install ks
check_install kubectl
check_install uuidgen

# Generate all required components
customizeKsApp() {
  ks param set ambassador cloud ${KUBEFLOW_CLOUD}
  ks param set jupyterhub cloud ${KUBEFLOW_CLOUD}
}

ksApply () {
  pushd .
  cd "${KUBEFLOW_KS_DIR}"

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
  ks apply default -c spartakus
  popd
}

source "${ENV_FILE}"

echo PLATFORM=${PLATFORM}
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
      pushd .
      cd ${KUBEFLOW_DM_DIR}
      ${DIR}/gke/delete_deployment.sh ${PROJECT} ${DEPLOYMENT_NAME} ${CONFIG_FILE}
      popd
    fi
  fi
fi
