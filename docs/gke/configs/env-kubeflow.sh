#!/bin/bash
#
# Script that defines various environment variables.
# This is script defines values for all the variables used in
# the instructions.

# Bucket and project must be unique for each project 

# Set PROJECT to the project you want to use with Kubeflow.
export PROJECT=kubeflow

# The name of the ip address as defined in cluster.jinja
# We will reserve a GCP IP address to use for ingress to the cluster.
export IP_NAME=static-ip

# Set the namespace to the name of the namespace to deploy Kubeflow in.
export NAMESPACE=kubeflow

# Set config file to the YAML file defining your deployment manager configs.
export CONFIG_FILE=cluster-${PROJECT}.yaml
export PROJECT_CONFIG_FILE=project-${PROJECT}.yaml

# Get the project number
export PROJECT_NUMBER=`gcloud projects describe ${PROJECT} --format='value(project_number)'`

# ksonnet environment
#export ENV=${PROJECT}

# The fully qualified domain name to use with ingress.
# You only need to set this if you want to use a custom domain
# with ingress as opposed to an automatic domain for your project.
# TODO(jlewi): What is the automatic domain name.
#export FQDN=${PROJECT}.kubeflow.dev
