#!/usr/bin/env bash
#
# Script that defines various environment variables.
# This is script defines values for all the variables used in
# the instructions.

# Bucket and project must be unique for each project 

# Set PROJECT to the project you want to use with Kubeflow.
export PROJECT=<your_project>

# Set DEPLOYMENT_NAME to the name to give to the deployment.
# The name must be unique for each deployment within your project.
export DEPLOYMENT_NAME=kubeflow

# Set this to the zone in your ${CONFIG_FILE}
export ZONE=us-east1-d

# Set config file to the YAML file defining your deployment manager configs.
export CONFIG_FILE=cluster-kubeflow.yaml
