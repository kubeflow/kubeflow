#!/bin/bash
# Enable IAP for a backend service

# Usage:
# enable_iap project namespace service_name 
#
set -e
PROJECT=$1
NAMESPACE=$2
SERVICE=$3

USAGE="enable_iap.sh <project> <namespace> <service_name>"
if [ -z ${CLIENT_ID} ]; then
  echo Error CLIENT_ID must be set
  exit 1
fi

if [ -z ${CLIENT_SECRET} ]; then
  echo Error CLIENT_SECRET must be set
  exit 1
fi

if [ -z ${PROJECT} ]; then
  echo Error PROJECT must be provided on the command line
  echo usage: ${USAGE}
  exit 1
fi

if [ -z ${NAMESPACE} ]; then
  echo Error NAMESPACE must be provided on the command line
  echo usage: ${USAGE}
  exit 1
fi

if [ -z ${SERVICE} ]; then
  echo Error service_name must be provided on the command line
  echo usage: ${USAGE}
  exit 1
fi

NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
while [[ -z ${BACKEND_ID} ]]; 
do BACKEND_ID=$(gcloud compute --project=${PROJECT} backend-services list --filter=name~k8s-be-${NODE_PORT}- --format='value(id)'); 
echo "Waiting for backend id PROJECT=${PROJECT} NAMESPACE=${NAMESPACE} SERVICE=${SERVICE}..."; 
sleep 2; 
done
echo BACKEND_ID=${BACKEND_ID}

NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
BACKEND_SERVICE=$(gcloud --project=${PROJECT} compute backend-services list --filter=name~k8s-be-${NODE_PORT}- --uri)
# Enable IAP on the backend service:
gcloud --project=${PROJECT} compute backend-services update ${BACKEND_SERVICE} \
      --global \
      --iap=enabled,oauth2-client-id=${CLIENT_ID},oauth2-client-secret=${CLIENT_SECRET}

# Since JupyterHub uses websockets we want to increase the backend timeout
echo Increasing backend timeout for JupyterHub
gcloud --project=${PROJECT} compute backend-services update --global ${BACKEND_SERVICE} --timeout=3600

PROJECT_NUM=$(gcloud projects describe ${PROJECT} --format='value(project_number)')

JWT_AUDIENCE="/projects/${PROJECT_NUM}/global/backendServices/${BACKEND_ID}"

if [ -z ${JWT_AUDIENCE} ]; then
  echo "Error JWT_AUDIENCE couldn't be set"
  exit
fi

echo JWT_AUDIENCE=${JWT_AUDIENCE}