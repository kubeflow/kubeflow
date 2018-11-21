#!/bin/bash

# conn.sh - establish connection to kubeflow cluster

set -e # exit on error

PROJECT_ID=project_id_placeholder
ZONE=zone_placeholder
DEPLOY_NAME=deploy_name_placeholder

gcloud container clusters get-credentials ${DEPLOY_NAME} --zone ${ZONE} --project ${PROJECT_ID}

echo "Checking load balancing resource"
for i in $(seq 1 10)
do kubectl get pods -n kubeflow --selector=service=ambassador --field-selector=status.phase=Running | grep -q 'Running' && break || sleep 10
done

POD_NAME=$(kubectl get pods -n kubeflow --selector=service=ambassador --field-selector=status.phase=Running -o jsonpath="{.items[0].metadata.name}")

echo "Load balancing now ready"
echo "Your kubeflow service now accessible via: https://ssh.cloud.google.com/devshell/proxy?authuser=0&port=8081"
kubectl port-forward -n kubeflow ${POD_NAME} 8081:80
