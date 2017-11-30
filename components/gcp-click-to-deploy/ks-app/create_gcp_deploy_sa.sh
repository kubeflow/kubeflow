#!/usr/bin/env bash
#
# Creates a service account for running the GCP deploy app.
# We need a service account to work with external DNS.
set -x

PROJECT=${PROJECT:=kubeflow-dev}

NAME=gcp-deploy
EMAIL=${NAME}@${PROJECT}.iam.gserviceaccount.com
NAMESPACE=gcp-deploy

# Project that administers DNS.
DNS_PROJECT=${DNS_PROJECT:-kubeflow-dns}

# Check that the current kubectl context points to the correct cluster
# IP addres of kubeflow-dev master
EXPECTED_MASTER_IP=${EXPECTED_MASTER_IP:-35.188.73.10}

# TODO(jlewi): We'd like to check that kubectl is pointing
# at the correct cluster. the code below doesn't quite work.
# There's a problem with how the data ends up in KUBE_INFO
# that the regex doesn't actually work.
# KUBE_INFO=$(kubectl cluster-info)
# MASTER=`expr match "${KUBE_INFO}" '[^\.0-9]*\([\.0-9]\+\)'`
# echo MASTER=${MASTER}
#
# if [[ "${MASTER}" != "${EXPECTED_MASTER_IP}" ]]; then
#  echo "The current kubectl context doesn't match the expected cluster ip"
#  echo "Please configure the context to point to cluster: ${EXPECTED_MASTER_IP}"
#  exit -1
#else
#  echo kubectl context matches expected ip ${EXPECTED_MASTER_IP}
#fi

# Create the service account
gcloud --project=${PROJECT} --quiet iam service-accounts create ${NAME}

declare -a roles=("dns.admin")

# Add policy bindings
for ROLE in "${roles[@]}"; do
  gcloud projects add-iam-policy-binding ${DNS_PROJECT} \
    --member serviceAccount:${EMAIL} \
    --role roles/${ROLE}
done

# Get a new service account key
SECRET_FILE=~/tmp/${EMAIL}.json
rm -f ~${SECRET_FILE}
gcloud --project=${PROJECT} iam service-accounts keys create ${SECRET_FILE} --iam-account ${EMAIL}

# Delete and recreate the key
kubectl create secret generic --namespace=${NAMESPACE} gcp-sa --from-file=gcp-sa.json=${SECRET_FILE}
