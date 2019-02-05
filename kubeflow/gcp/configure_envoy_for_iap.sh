#!/usr/bin/env bash
#
# A script to modify envoy config to perform JWT validation
# given the information for the service.
# Script executed by the iap container to configure IAP. When finished, the envoy config is created with the JWT audience.

[ -z ${NAMESPACE} ] && echo Error NAMESPACE must be set && exit 1
[ -z ${SERVICE} ] && echo Error SERVICE must be set && exit 1

PROJECT=$(curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/project/project-id)
if [ -z ${PROJECT} ]; then
  echo Error unable to fetch PROJECT from compute metadata
  exit 1
fi

PROJECT_NUM=$(curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/project/numeric-project-id)
if [ -z ${PROJECT_NUM} ]; then
  echo Error unable to fetch PROJECT_NUM from compute metadata
  exit 1
fi

checkIAP() {
  # created by init container.
  . /var/shared/healthz.env

  # If node port or backend id change, so does the JWT audience.
  CURR_NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
  CURR_BACKEND_ID=$(gcloud compute --project=${PROJECT} backend-services list --filter=name~k8s-be-${CURR_NODE_PORT}- --format='value(id)')
  [ "$BACKEND_ID" == "$CURR_BACKEND_ID" ]
}

# Activate the service account
for i in $(seq 1 10); do
  gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS} && break || sleep 10
done

# Print out the config for debugging
gcloud config list

NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
while [[ -z ${BACKEND_ID} ]]; do
  BACKEND_ID=$(gcloud compute --project=${PROJECT} backend-services list --filter=name~k8s-be-${NODE_PORT}- --format='value(id)')
  echo "Waiting for backend id PROJECT=${PROJECT} NAMESPACE=${NAMESPACE} SERVICE=${SERVICE} filter=name~k8s-be-${NODE_PORT}-..."
  sleep 2
done
echo BACKEND_ID=${BACKEND_ID}

NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
BACKEND_SERVICE=$(gcloud --project=${PROJECT} compute backend-services list --filter=name~k8s-be-${NODE_PORT}- --uri)

JWT_AUDIENCE="/projects/${PROJECT_NUM}/global/backendServices/${BACKEND_ID}"

# For healthcheck compare.
echo "JWT_AUDIENCE=${JWT_AUDIENCE}" > /var/shared/healthz.env
echo "NODE_PORT=${NODE_PORT}" >> /var/shared/healthz.env
echo "BACKEND_ID=${BACKEND_ID}" >> /var/shared/healthz.env

kubectl get configmap -n ${NAMESPACE} envoy-config -o jsonpath='{.data.envoy-config\.json}' |
  sed -e "s|{{JWT_AUDIENCE}}|${JWT_AUDIENCE}|g" >/var/shared/envoy-config.json

echo "Restarting envoy"
curl -s ${ENVOY_ADMIN}/quitquitquit

# Verify IAP every 10 seconds.
while true; do
  if ! checkIAP; then
    echo "$(date) WARN: IAP check failed, restarting container."
    exit 1
  fi
  sleep 10
done
