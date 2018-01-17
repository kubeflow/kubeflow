#!/bin/bash
#
# This script is used as the first step in our Argo workflows to check out the code
# corresponding the prow job.
#
# TODO(jlewi): Eliminate code duplication with bootstraph.sh my moving shared code into
# a bash script that can be sourced from multiple scripts.
#!/bin/bash
set -xe 
SRC_DIR=$1

# Print out env for debugging.
env | sort

git clone https://github.com/${REPO_OWNER}/${REPO_NAME}.git /tmp/src

# Some git operations are really slow when using NFS.
# We observed clone times increasing from O(30) seconds to O(4 minutes)
# when we switched to NFS.
# As a workaround we clone into a local directory and then move the files onto
# NFS. Copying to NFS is still a bottleneck and increases the run time to O(1. 5 minutes).
# clone --recurse-submodules https://github.com/google/kubeflow.git /tmp/src",
cd /tmp/src

# We need to set the preloadindex option; to try to speedup git ops like describe
# and status when using an NFS filesystem.
# See: https://stackoverflow.com/questions/4994772/ways-to-improve-git-status-performance
# unfortunately this doesn't seem to help with sub modules.
git config core.preloadindex true

# See https://github.com/kubernetes/test-infra/tree/master/prow#job-evironment-variables
if [ ! -z ${PULL_NUMBER} ]; then
 git fetch origin  pull/${PULL_NUMBER}/head:pr
 if [ ! -z ${PULL_PULL_SHA} ]; then
	git checkout ${PULL_PULL_SHA}
 else
 	# Checkout the latest commit for this PR since no commit specified.
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

# TODO(jlewi): As noted above the git operations below are really
# slow when using NFS.
# Print out the git version in the logs
git describe --tags --always --dirty      
git status

# Move it to NFS
mkdir -p + ${SRC_DIR}

# The period is needed because we want to copy the contents of the src directory
# into srcDir not srcDir/src/.
cp -r /tmp/src/.  ${SRC_DIR}

# Make the files world readable/writable.
# This is a hack to make it easy to modify the files from jupyterhub which is using
# a different user/group id.
chmod -R a+rwx  ${SRC_DIR}