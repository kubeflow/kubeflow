#!/bin/bash
#
# Create the GKE cluster used for testing Kubeflow deployments.
# This should be a one-time thing because we reuse the same cluster for all tests.
gcloud --project=mlkube-testing container clusters create \
	--zone=us-east1-d  \
	--machine-type=n1-standard-8 \
	--cluster-version=1.8.4-gke.1 \
	kubeflow-testing