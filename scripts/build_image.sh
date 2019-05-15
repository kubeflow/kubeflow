#!/usr/bin/env bash
#
# A simple script to build the Docker images.
# This is intended to be invoked as a step in Argo to build the docker image.
#
# build_image.sh --dockerfile=${dockerfile} --image=${image} --tag=${tag}
set -ex

parseArgs() {
  # Parse all command line options
  while [[ $# -gt 0 ]]; do
    # Parameters should be of the form
    # --{name}=${value}
    echo parsing "$1"
    if [[ $1 =~ ^--(.*)=(.*)$ ]]; then
      _name=${BASH_REMATCH[1]}
      _value=${BASH_REMATCH[2]}

      eval ${_name}="${_value}"
    elif [[ $1 =~ ^--(.*)$ ]]; then
    _name=${BASH_REMATCH[1]}
    _value=true
    eval ${_name}="${_value}"
    else
      echo "Argument $1 did not match the pattern --{name}={value} or --{name}"
      exit 1
    fi
    shift
  done
}

validateRequiredArgs() {
  local _names=$1
  for i in ${_names[@]}; do
    if [ -z ${!i} ]; then
      echo "--${i} not set."
      exit 1
    fi
  done
}

# Deployment configs.
required_args=(dockerfile image tag)

parseArgs $*
validateRequiredArgs ${required_args}

CONTEXT_DIR=$(dirname "$dockerfile")
PROJECT="${GCP_PROJECT}"

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

cd $CONTEXT_DIR

echo "GCP Project: kubeflow-ci"

echo "Building ${image} using gcloud build"
gcloud builds submit --tag=${image}:${tag} --project=kubeflow-ci .
echo "Finished building image"
