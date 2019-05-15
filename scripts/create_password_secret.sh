#!/bin/bash
#
# Helper script to create a secret containing the passord
set -ex
user=$1

# bcrypt encoded password
password=$2

PASSWORDB64=`echo "${password}" | base64`

#PASSWORDB64="${password}"

set +e
kubectl -n kubeflow delete secret kubeflow-login
set -e

kubectl -n kubeflow create secret generic kubeflow-login --from-literal=username=${USER} --from-literal=passwordhash="${PASSWORDB64}"

# Delete the pod to load the new secret
kubectl -n kubeflow delete pods -l app=basic-auth
