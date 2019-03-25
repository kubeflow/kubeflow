#!/usr/bin/env bash
#
# Script to delete kubeflow-ci namespace; deployment and source repo in sandbox project.
# This is intended to be invoked as a step in Argo.
#
# test_delete.sh ${DEPLOYMENT} ${CLUSTER} ${ZONE} ${NAMESPACE}
set -ex

DEPLOYMENT=$1
CLUSTER=$2
ZONE=$3
NAMESPACE=$4

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

gcloud container clusters get-credentials ${CLUSTER} --zone ${ZONE} --project kubeflow-ci
# delete test namespace
kubectl delete namespace ${NAMESPACE} || echo "Failed to delete namespace"

for i in 1 2 3 4 5; do
  gcloud -q deployment-manager deployments delete ${DEPLOYMENT} --project=kubeflow-ci-deployment && break || sleep 30
done

for i in 1 2 3 4 5; do
  gcloud -q source repos delete kubeflow-ci-deploy-kubeflow-config --project=kubeflow-ci-deployment && break || sleep 30
done
