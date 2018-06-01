#!/bin/bash
#
# A simple helper script to download secrets for Kubeflow service
# accounts and store them as K8s secrets.
set -ex
export SA_EMAIL=${DEPLOYMENT_NAME}-admin@${PROJECT}.iam.gserviceaccount.com

# TODO(jlewi): We should name the secrets more consistently based on the service account name.
# We will need to update the component configs though
gcloud --project=${PROJECT} iam service-accounts keys create ${SA_EMAIL}.json --iam-account ${SA_EMAIL}
kubectl create secret generic --namespace=kubeflow admin-gcp-sa --from-file=admin-gcp-sa.json=./${SA_EMAIL}.json

export USER_EMAIL=${DEPLOYMENT_NAME}-user@${PROJECT}.iam.gserviceaccount.com
export USER_SECRET_NAME=${DEPLOYMENT_NAME}-user
gcloud --project=${PROJECT} iam service-accounts keys create ${USER_EMAIL}.json --iam-account $USER_EMAIL
# We want the secret name to be the same by default for all clusters so
# that users don't have to set it manually.
kubectl create secret generic --namespace=kubeflow user-gcp-sa --from-file=user-gcp-sa.json=./${USER_EMAIL}.json