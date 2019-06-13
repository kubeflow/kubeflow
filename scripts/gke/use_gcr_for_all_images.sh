#!/usr/bin/env bash
# use_gcr_for_all_images.sh is a simple script which is intended to be run in a ksonnet
# app directory. It sets the docker image params in all the components to use the images
# from gcr.io registries instead of non-gcr.io registries. This is useful when deploying
# private GKE clusters where one can only pull images from gcr.io
#
# To sync the images to your registry use
# PROJECT=$(PROJET) make copy-gcb

set -xe

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

parseArgs() {
  # Parse all command line options
  while [[ $# -gt 0 ]]; do
	# Parameters should be of the form
	# --{name}=${value}
	echo parsing "$1"
	if [[ $1 =~ ^--(.*)=(.*)$ ]]; then
	  name=${BASH_REMATCH[1]}
	  value=${BASH_REMATCH[2]}

	  eval ${name}="${value}"
	elif [[ $1 =~ ^--(.*)$ ]]; then
	name=${BASH_REMATCH[1]}
	value=true
	eval ${name}="${value}"
	else
	  echo "Argument $1 did not match the pattern --{name}={value} or --{name}"
	fi
	shift
  done
}

usage() {
  echo "Usage: use_gcr_for_all_images --registry=<REGISTRY>"
}

main() {
	# List of required parameters
  names=(registry)

  missingParam=false
  for i in ${names[@]}; do
	if [ -z ${!i} ]; then
	  echo "--${i} not set"
	  missingParam=true
	fi
  done
	
  if ks component list | awk '{print $1}' | grep -q "^argo$"; then
    ks param set argo workflowControllerImage ${registry}/workflow-controller:v2.3.0
    ks param set argo uiImage ${registry}/argoui:v2.3.0
    ks param set argo executorImage ${registry}/argoexec:v2.3.0
  fi

  if ks component list | awk '{print $1}' | grep -q "^ambassador$"; then
    ks param set ambassador ambassadorImage ${registry}/datawire/ambassador:0.37.0
  fi

  if ks component list | awk '{print $1}' | grep -q "^cloud-endpoints$"; then
    ks param set cloud-endpoints cloudEndpointsImage ${registry}/cloud-solutions-group/cloud-endpoints-controller:0.2.1
  fi

  if ks component list | awk '{print $1}' | grep -q "^katib$"; then
    ks param set katib vizierDbImage ${registry}/mysql:8.0.3
  fi

  if ks component list | awk '{print $1}' | grep -q "^iap$"; then
    ks param set iap-ingress  ${registry}/cloud-solutions-group/esp-sample-app:1.0.0
  fi

  if ks component list | awk '{print $1}' | grep -q "^metacontroller$"; then
    ks param set metacontroller image ${registry}/metacontroller:v0.3.0
  fi

  if ks component list | awk '{print $1}' | grep -q "^pipeline$"; then
    ks param set pipeline minioImage ${registry}/minio:RELEASE.2018-02-09T22-40-05Z
    ks param set pipeline mysqlImage ${registry}/mysql:8.0.3

    ks param set pipeline apiImage ${registry}/ml-pipeline/api-server:0.1.17
    ks param set pipeline scheduledWorkflowImage ${registry}/ml-pipeline/scheduledworkflow:0.1.17
    ks param set pipeline persistenceAgentImage ${registry}/ml-pipeline/persistenceagent:0.1.17
    ks param set pipeline viewerCrdControllerImage ${registry}/ml-pipeline/viewer-crd-controller:0.1.17
  fi

}

parseArgs $*
main
