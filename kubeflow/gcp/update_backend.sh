#!/bin/bash
#
# A simple shell script to configure the backend timeouts and health checks by using gcloud.

[ -z ${NAMESPACE} ] && echo Error NAMESPACE must be set && exit 1
[ -z ${SERVICE} ] && echo Error SERVICE must be set && exit 1
[ -z ${INGRESS_NAME} ] && echo Error INGRESS_NAME must be set && exit 1
[ -z ${PORT_NAME} ] && echo Error PORT_NAME must be set && exit 1

PROJECT=$(curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/project/project-id)
if [ -z ${PROJECT} ]; then
  echo Error unable to fetch PROJECT from compute metadata
  exit 1
fi

# Activate the service account, allow 5 retries
for i in {1..5}; do gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS} && break || sleep 10; done

NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[?(@.name=="'${PORT_NAME}'")].nodePort}')
echo node port is ${NODE_PORT}

while [[ -z ${BACKEND_NAME} ]]; do
  BACKENDS=$(kubectl --namespace=${NAMESPACE} get ingress ${INGRESS_NAME} -o jsonpath='{.metadata.annotations.ingress\.kubernetes\.io/backends}')
  echo "fetching backends info with ${INGRESS_NAME}: ${BACKENDS}"
  BACKEND_NAME=$(echo $BACKENDS | grep -o "k8s-be-${NODE_PORT}--[0-9a-z]\+")
  echo "backend name is ${BACKEND_NAME}"
  sleep 2
done

while [[ -z ${BACKEND_SERVICE} ]];
do BACKEND_SERVICE=$(gcloud --project=${PROJECT} compute backend-services list --filter=name~k8s-be-${NODE_PORT}- --uri);
echo "Waiting for the backend-services resource PROJECT=${PROJECT} NODEPORT=${NODE_PORT} SERVICE=${SERVICE}...";
sleep 2;
done

while [[ -z ${HEALTH_CHECK_URI} ]];
do HEALTH_CHECK_URI=$(gcloud compute --project=${PROJECT} health-checks list --filter=name~${BACKEND_NAME} --uri);
echo "Waiting for the healthcheck resource PROJECT=${PROJECT} NODEPORT=${NODE_PORT} SERVICE=${SERVICE}...";
sleep 2;
done

echo health check URI is ${HEALTH_CHECK_URI}

# Since we create the envoy-ingress ingress object before creating the envoy
# deployment object, healthcheck will not be configured correctly in the GCP
# load balancer. It will default the healthcheck request path to a value of
# / instead of the intended /healthz.
# Manually update the healthcheck request path to /healthz
if [[ ${HEALTHCHECK_PATH} ]]; then
  echo Running health checks update ${HEALTH_CHECK_URI} with ${HEALTHCHECK_PATH}
  gcloud --project=${PROJECT} compute health-checks update http ${HEALTH_CHECK_URI} --request-path=${HEALTHCHECK_PATH}
else
  echo Running health checks update ${HEALTH_CHECK_URI} with /healthz
  gcloud --project=${PROJECT} compute health-checks update http ${HEALTH_CHECK_URI} --request-path=/healthz
fi

if [[ ${USE_ISTIO} ]]; then
  # Create the route so healthcheck can pass
  kubectl apply -f /var/envoy-config/healthcheck_route.yaml
fi

# Since JupyterHub uses websockets we want to increase the backend timeout
echo Increasing backend timeout for JupyterHub
gcloud --project=${PROJECT} compute backend-services update --global ${BACKEND_SERVICE} --timeout=3600

echo "Backend updated successfully. Waiting 1 hour before updating again."
sleep 3600
