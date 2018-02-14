#!/bin/bash
#
# This script is used to bootstrap our prow jobs.
# The point of this script is to check out repositories
# at the commit corresponding to the Prow job. 
#
# In addition to understanding the prow environment variables.
# the environment variable EXTRA_REPOS can be used to specify
# extra GitHub repositories to checkout.
# EXTRA_REPOS should be a ; delimited list of the form
# {REPO_ORG}/{REPO_NAME}@{SHA}
#
# For a pull request do
# {REPO_ORG}/{REPO_NAME}@{SHA}:{PULL_NUMBER}
set -xe

SRC_DIR=$1

mkdir -p /src/${REPO_OWNER}

# TODO(jlewi): We should eventually move the code for running the workflow from
# kubeflow/kubeflow into kubeflow/testing
git clone https://github.com/${REPO_OWNER}/${REPO_NAME}.git ${SRC_DIR}/${REPO_OWNER}/${REPO_NAME}

echo Job Name = ${JOB_NAME}

# See https://github.com/kubernetes/test-infra/tree/master/prow#job-evironment-variables
REPO_DIR=${SRC_DIR}/${REPO_OWNER}/${REPO_NAME}
cd ${REPO_DIR}
if [ ! -z ${PULL_NUMBER} ]; then
 git fetch origin  pull/${PULL_NUMBER}/head:pr
 if [ ! -z ${PULL_PULL_SHA} ]; then
 	git checkout ${PULL_PULL_SHA}
 else
 	git checkout pr
 fi
 
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
echo ${REPO_DIR} is at `git describe --tags --always --dirty`
git submodule
git status

# Check out any extra repos.
IFS=';' read -ra REPOS <<< "${EXTRA_REPOS}"
echo REPOS=${REPOS}
for r in "${REPOS[@]}"; do
  echo "Processing ${r}" 
  ORG_NAME="$(cut -d'@' -f1 <<< "$r")"
  EXTRA_ORG="$(cut -d'/' -f1 <<< "$ORG_NAME")"
  EXTRA_NAME="$(cut -d'/' -f2<<< "$ORG_NAME")"
  SHA_AND_PR="$(cut -d'@' -f2 <<< "$r")"  
  SHA="$(cut -d':' -f1 <<< "$SHA_AND_PR")"  
  EXTRA_PR="$(cut -d':' -s -f2 <<< "$SHA_AND_PR")"
  URL=https://github.com/${EXTRA_ORG}/${EXTRA_NAME}.git
  TARGET=${SRC_DIR}/${EXTRA_ORG}/${EXTRA_NAME}
  if [ ! -d ${TARGET} ]; then
  	git clone  ${URL} ${TARGET}
  	cd ${TARGET}

  	if [ ! -z ${EXTRA_PR} ]; then
  		git fetch origin  pull/${EXTRA_PR}/head:pr
  		git checkout pr

	  	if [ "$SHA" -ne "HEAD" ]; then
	  		git checkout ${SHA}
		fi  		
  	else  	
  		git checkout ${SHA}
	fi  
	echo ${TARGET} is at `git describe --tags --always --dirty`
  else
  	echo Error ${TARGET} already exists not cloning ${URL}
  fi
done	

# Check out the kubeflow/testing repo (unless that's the repo being tested)
# since it contains common utilities.
# TODO(jlewi): We should get rid of this and just treat kubeflow/testing as
# an EXTRA_REPOS.
if [ ! -d ${SRC_DIR}/kubeflow/testing ]; then
	git clone https://github.com/kubeflow/testing.git ${SRC_DIR}/kubeflow/testing
fi	
