#!/usr/bin/env bash
#
# A simple shell script to configure the backend timeouts and health checks by using gcloud.
[ -z ${NAMESPACE} ] && echo Error NAMESPACE must be set && exit 1
[ -z ${SERVICE} ] && echo Error SERVICE must be set && exit 1
[ -z ${INGRESS_NAME} ] && echo Error INGRESS_NAME must be set && exit 1

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

# Activate the service account
gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
# Print out the config for debugging
gcloud config list

NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
echo "node port is ${NODE_PORT}"

while [[ -z ${BACKEND_NAME} ]]; do
  BACKENDS=$(kubectl --namespace=${NAMESPACE} get ingress ${INGRESS_NAME} -o jsonpath='{.metadata.annotations.ingress\.kubernetes\.io/backends}')
  echo "fetching backends info with ${INGRESS_NAME}: ${BACKENDS}"
  BACKEND_NAME=$(echo $BACKENDS | grep -o "k8s-be-${NODE_PORT}--[0-9a-z]\+")
  echo "backend name is ${BACKEND_NAME}"
  sleep 2
done

while [[ -z ${BACKEND_ID} ]]; do
  BACKEND_ID=$(gcloud compute --project=${PROJECT} backend-services list --filter=name~${BACKEND_NAME} --format='value(id)')
  echo "Waiting for backend id PROJECT=${PROJECT} NAMESPACE=${NAMESPACE} SERVICE=${SERVICE} filter=name~${BACKEND_NAME}"
  sleep 2
done
echo BACKEND_ID=${BACKEND_ID}

JWT_AUDIENCE="/projects/${PROJECT_NUM}/global/backendServices/${BACKEND_ID}"

# For healthcheck compare.
mkdir -p /var/shared
echo "JWT_AUDIENCE=${JWT_AUDIENCE}" > /var/shared/healthz.env
echo "NODE_PORT=${NODE_PORT}" >> /var/shared/healthz.env
echo "BACKEND_ID=${BACKEND_ID}" >> /var/shared/healthz.env

if [[ -z ${USE_ISTIO} ]]; then
  # TODO(https://github.com/kubeflow/kubeflow/issues/942): We should publish the modified envoy
  # config as a config map and use that in the envoy sidecars.
  kubectl get configmap -n ${NAMESPACE} envoy-config -o jsonpath='{.data.envoy-config\.json}' |
    sed -e "s|{{JWT_AUDIENCE}}|${JWT_AUDIENCE}|g" > /var/shared/envoy-config.json
else
  # Apply the jwt validation policy
  cat /var/envoy-config/jwt-policy-template.yaml | sed -e "s|{{JWT_AUDIENCE}}|${JWT_AUDIENCE}|g" > /var/shared/jwt-policy.yaml
  kubectl apply -f /var/shared/jwt-policy.yaml
fi

echo "Clearing lock on service annotation"
kubectl patch svc "${SERVICE}" -p "{\"metadata\": { \"annotations\": {\"backendlock\": \"\" }}}"

checkBackend() {
  # created by init container.
  . /var/shared/healthz.env

  # If node port or backend id change, so does the JWT audience.
  CURR_NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
  read -ra toks <<<"$(gcloud compute --project=${PROJECT} backend-services list --filter=name~k8s-be-${CURR_NODE_PORT}- --format='value(id,timeoutSec)')"
  CURR_BACKEND_ID="${toks[0]}"
  CURR_BACKEND_TIMEOUT="${toks[1]}"
  [[ "$BACKEND_ID" == "$CURR_BACKEND_ID" && "${CURR_BACKEND_TIMEOUT}" -eq 3600 ]]
}

# Verify configuration every 10 seconds.
while true; do
  if ! checkBackend; then
    echo "$(date) WARN: Backend check failed, restarting container."
    exit 1
  fi
  sleep 10
done
