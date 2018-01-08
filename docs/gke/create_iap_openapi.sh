#!/bin/bash
# A simple script to create the openapi swagger spec that can be used to put an http service behind IAP
#
# Usage:
# create_iap_openapi.sh project namespace service_name ingress_name endpoint_name
#
PROJECT=$1
NAMESPACE=$2
SERVICE=$3
INGRESS=$4
ENDPOINT=$5

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
  echo Error INGERSS must be provided on the command line
  echo usage: ${USAGE}
  exit 1
fi

if [ -z ${ENDPOINT} ]; then
  echo Error ENDPOINT must be provided on the command line
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

# We use the service name as the name for the service
ENDPOINT_URL="${ENDPOINT}.endpoints.${PROJECT}.cloud.goog"
echo ENDPOINT_URL=${ENDPOINT_URL}

OUTPUT=${ENDPOINT}-openapi.yaml
echo Writing open api spec to ${OUTPUT}

cat > ${OUTPUT} <<EOF
swagger: "2.0"
info:
  description: "wildcard config for any HTTP service behind IAP."
  title: "General HTTP Service using IAP"
  version: "1.0.0"
basePath: "/"
consumes:
- "application/json"
produces:
- "application/json"
schemes:
- "https"
paths:
  "/**":
    get:
      operationId: Get
      responses:
        '200':
          description: Get
        default:
          description: Error
    delete:
      operationId: Delete
      responses:
        '204':
          description: Delete
        default:
          description: Error
    patch:
      operationId: Patch
      responses:
        '200':
          description: Patch
        default:
          description: Error
    post:
      operationId: Post
      responses:
        '200':
          description: Post
        default:
          description: Error
    put:
      operationId: Put
      responses:
        '200':
          description: Put
        default:
          description: Error
security:
  # This causes ESP to reject requests without a valid JWT
  - google_jwt: []
securityDefinitions:  
  google_jwt:
    authorizationUrl: ""
    flow: "implicit"
    type: "oauth2"
    # This must match the 'iss' field in the JWT.
    x-google-issuer: "https://cloud.google.com/iap"
    x-google-jwks_uri: "https://www.gstatic.com/iap/verify/public_key-jwk"
    # This must match the "aud" field in the JWT. You can add multiple audiences to accept JWTs from multiple clients.
    x-google-audiences: "${JWT_AUDIENCE}"
host: "${ENDPOINT_URL}"
x-google-endpoints:
- name: "${ENDPOINT_URL}"
  target: "${INGRESS_IP}"
EOF
