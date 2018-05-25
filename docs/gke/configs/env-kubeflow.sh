#!/bin/bash
#
# Script that defines various environment variables.
# This is script defines values for all the variables used in
# the instructions.

# Bucket and project must be unique for each project 

# Set PROJECT to the project you want to use with Kubeflow.
export PROJECT=kubeflow

# Set config file to the YAML file defining your deployment manager configs.
export CONFIG_FILE=cluster-${PROJECT}.yaml
# export PROJECT_CONFIG_FILE=project-${PROJECT}.yaml

# Get the project number
export PROJECT_NUMBER=`gcloud projects describe ${PROJECT} --format='value(project_number)'`
