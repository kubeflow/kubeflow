#!/bin/bash
#
# A simple script to setup deployment service.
# This is intended to be invoked as a step in Argo.
#
# test_setup.sh ${MANIFEST} ${TAG} ${CLUSTER} ${ZONE} ${PROJECT} ${NAMESPACE}
set -ex

MANIFEST=$1
TAG=$2

CLUSTER=$3
ZONE=$4
PROJECT=$5

NAMESPACE=$6

# insert image tag
sed -i -e "s/tag-placeholder/${TAG}/g" ${MANIFEST}
sed -i -e "s/namespace-placeholder/${NAMESPACE}/g" ${MANIFEST}

gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
gcloud container clusters get-credentials ${CLUSTER} --zone ${ZONE} --project ${PROJECT}
# start deployment service
kubectl create -f ${MANIFEST}
