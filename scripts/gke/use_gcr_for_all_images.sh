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
    ks param set argo workflowControllerImage ${registry}/workflow-controller:v2.2.0
    ks param set argo uiImage ${registry}/argoui:v2.2.0
    ks param set argo executorImage ${registry}/argoexec:v2.2.0
  fi

  if ks component list | awk '{print $1}' | grep -q "^ambassador$"; then
    ks param set ambassador ambassadorImage ${registry}/datawire/ambassador:0.37.0
  fi

  if ks component list | awk '{print $1}' | grep -q "^katib$"; then
    ks param set katib vizierDbImage ${registry}/mysql:8.0.3
  fi

  if ks component list | awk '{print $1}' | grep -q "^metacontroller$"; then
    ks param set metacontroller image ${registry}/metacontroller:v0.3.0
  fi
}

parseArgs $*
main
