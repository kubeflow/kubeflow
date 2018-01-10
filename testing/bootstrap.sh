#!/bin/bash
#
# This script is used to bootstrap our prow jobs.
# The point of this script is to check out the google/kubeflow repo
# at the commit corresponding to the Prow job. We can then
# invoke the launcher script at that commit to submit and
# monitor an Argo workflow
set -xe

mkdir -p /src
git clone https://github.com/google/kubeflow.git /src/google_kubeflow

cd /src/google_kubeflow

echo Job Name = ${JOB_NAME}

# See https://github.com/kubernetes/test-infra/tree/master/prow#job-evironment-variables
if [ ! -z ${PULL_NUMBER} ]; then
 git fetch origin  pull/${PULL_NUMBER}/head:pr
 git checkout ${PULL_PULL_SHA}
else 
 if [ ! -z ${PULL_BASE_SHA} ]; then
 	# Its a post submit; checkout the commit to test.
  	git checkout ${PULL_BASE_SHA}
 fi
fi	

# Update submodules.
git submodule init
git submodule update

# Print out the commit so we can tell from logs what we checked out.
echo Repo is at `git describe --tags --always --dirty`
git submodule
git status

export PYTHONPATH=$PYTHONPATH:/src/google_kubeflow/tensorflow_k8s
cd /src/google_kubeflow
# Invoke the script to run the workflow
python -m testing.run_e2e_workflow  \
  --project=mlkube-testing \
  --zone=us-east1-d \
  --cluster=kubeflow-testing \
  --bucket=kubernetes-jenkins