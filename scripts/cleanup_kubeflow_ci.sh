#!/usr/bin/env bash
# This script cleans up ingress related compute engine resources like backend-services,
# forwarding rules, health-checks, etc. from kubeflow-ci project which
# do not belong to the kubeflow-testing cluster

set -xe

PROJECT="kubeflow-ci"

# This id comes from ingress objects in kubeflow-testing cluster
# They use a common suffix for GCP resources
KUBEFLOW_TESTING_ID=c3cb19bff97cde34

cleanup() {
  gcloud compute ${1} list --project=${PROJECT} |
    grep -v ${KUBEFLOW_TESTING_ID} |
    awk '{print $1}' |
    tail -n +2 |
    xargs gcloud compute ${1} delete ${2} --quiet --project=${PROJECT}
}

cleanup forwarding-rules --global

cleanup target-http-proxies

cleanup target-https-proxies

cleanup url-maps

cleanup health-checks

cleanup backend-services --global
