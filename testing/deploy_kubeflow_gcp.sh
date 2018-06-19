#!/bin/bash
# deploy_kubeflow_gcp.sh is used for testing the deployment manager
# config at docs/gke/configs. It takes the following flags:
# NAME, SRC_DIR, TFJOB_VERSION, BOOTSTRAPPER_IMAGE

set -xe

NAME="${1}"
SRC_DIR="${2}"
TFJOB_VERSION="${3}"
BOOTSTRAPPER_IMAGE="${4}"

cd "${SRC_DIR}"
cp -r docs/gke/configs docs/gke/configs-${NAME}

# Update various fields in cluster-kubeflow.yaml
python -m testing.update_dm_config --tfjob_version "${TFJOB_VERSION}" \
  --ip_name "${NAME}-ip" \
  --hostname "${NAME}.endpoints.kubeflow-ci.cloud.goog" \
  --bootstrapper_image ${BOOTSTRAPPER_IMAGE} \
  --config "docs/gke/configs-${NAME}/cluster-kubeflow.yaml"

cd "docs/gke/configs-${NAME}"

export PROJECT=kubeflow-ci

# Set DEPLOYMENT_NAME to the name to give to the deployment.
# The name must be unique for each deployment within your project.
export DEPLOYMENT_NAME=${NAME}

# Set this to the zone in your ${CONFIG_FILE}
export ZONE=us-east1-d

# Set config file to the YAML file defining your deployment manager configs.
export CONFIG_FILE=cluster-kubeflow.yaml

# Set placeholder values
export CLIENT_ID=x
export CLIENT_SECRET=y

if [[ -n "${GOOGLE_APPLICATION_CREDENTIALS}" ]]; then
  gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
fi

set +e
# Delete the existing deployment in case we end up retying this script
# TODO: This logic should probably in deploy.sh. It should check for existing
# deployment and update it instead of creating it.
gcloud deployment-manager deployments delete ${DEPLOYMENT_NAME} --quiet --project=kubeflow-ci

# Add a jitter to reduce the chance of deployments starting at the same time
# since tests are run in parallel
sleep $((${RANDOM} % 30))

./deploy.sh
