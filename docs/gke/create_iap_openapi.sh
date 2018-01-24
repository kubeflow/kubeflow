#!/bin/bash
# A simple script to create the openapi swagger spec that can be used to put an http service behind IAP
#
# Usage:
# create_iap_openapi.sh project namespace service_name ingress_name
#
PROJECT=$1
NAMESPACE=$2
SERVICE=$3
INGRESS=$4

USAGE="create_iap_openapi.sh <project> <namespace> <service_name> <ingress_name> <endpoint_name>"

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

if [ -z ${INGRESS} ]; then
  echo Error INGRESS must be provided on the command line
  echo usage: ${USAGE}
  exit 1
fi


# TODO(jlewi): raise an error if any of the above values aren't set.


NODE_PORT=$(kubectl --namespace=${NAMESPACE} get svc ${SERVICE} -o jsonpath='{.spec.ports[0].nodePort}')
while [[ -z ${BACKEND_ID} ]]; 
do BACKEND_ID=$(gcloud compute --project=${PROJECT} backend-services list --filter=name~k8s-be-${NODE_PORT}- --format='value(id)'); 
echo "Waiting for backend id PROJECT=${PROJECT} NAMESPACE=${NAMESPACE} SERVICE=${SERVICE}..."; 
sleep 2; 
done
echo BACKEND_ID=${BACKEND_ID}

while [[ -z $INGRESS_IP ]]; 
do INGRESS_IP=$(kubectl --namespace=${NAMESPACE} get ingress ${INGRESS} -o jsonpath='{.status.loadBalancer.ingress[].ip}'); 
echo "Waiting for ingress IP PROJECT=${PROJECT} NAMESPACE=${NAMESPACE} INGRESS=${INGRESS}..."; 
sleep 2; 
done

echo BACKEND_ID=${BACKEND_ID}
echo INGRESS_IP=${INGRESS_IP}

PROJECT_NUM=$(gcloud projects describe ${PROJECT} --format='value(project_number)')
JWT_AUDIENCE="/projects/${PROJECT_NUM}/global/backendServices/${BACKEND_ID}"

if [ -z ${JWT_AUDIENCE} ]; then
  echo "Error JWT_AUDIENCE couldn't be set"
  exit
fi

echo JWT_AUDIENCE=${JWT_AUDIENCE}