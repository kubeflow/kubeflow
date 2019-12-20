#!/usr/bin/env bash
# 
# this script assumes the following
#  - PipelineResource of type git for kubeflow is mounted at /workspace/kubeflow
#  - PipelineResource of type git for manifests is mounted at /workspace/manifests
# 
# and expects the following:
# env-vars:
#   namespace
#   image_name (eg centraldashboard)
#   kubeflow_repo_revision
#   kubeflow_repo_url
# secrets:
#   gcp-credentials
#   github-token
#   github-ssh
#   kubeflow-oauth
# 
# The script does the following in the kubeflow manifests repo
# - edits the image tag in the kustomization.yaml (its workingdir is where the component's manifest is)
# - calls `make generate; make test` under manifests/tests 
# - if successful 
#   - commits the changes 
#   - creates a PR.
#
# how to set env vars from configmap if debugging
# for i in $(kubectl get cm ci-pipeline-run-parameters -ojson | jq -r '.data | keys[] as $k | "\($k)=\(.[$k])"'); do echo export $i; export $i; done
#
set -ex

# This is for debug
echo '--env--'
env | sort
echo '--env--'

# GitHub user to store the fork
fork_user=kubeflow-bot

# Get the commit for the kubeflow repository
cd /workspace/kubeflow
kubeflow_commit=$(git rev-parse HEAD)
kubeflow_commit=${digest:0:8}

# We use a unique branch name based on the digest of the image
digest=$(cat /workspace/${image_name}-digest)
# Shorten the digest. The digest will start with sha256:
short_digest=${digest:7:8}
new_branch_name='update_'$image_name'_'${short_digest}

# TODO(jlewi): We should mount the GITHUB_TOKEN as a secret
#export GITHUB_TOKEN=$(kubectl get secrets github-token -ojson | jq '. | .data.token' | xargs | base64 -d)

# Tekton will automatically mount the ssh private key and known hosts stored in the git secret
# in /tekton/home/.ssh
# however since this scriptt runs in our test worker image  it ends up using /root/.sssh
ln -sf /tekton/home/.ssh /root/.ssh
ssh-keyscan -t rsa github.com > /root/.ssh/known_hosts
cd /workspace/manifests

# Do a full fetch to unshallow the clone
# it looks like Tekton might do a shallow checkout
git fetch --unshallow

# Create a new branch for the pull request
git checkout -b $new_branch_name origin/${manifests_repo_revision}

# Add the kubeflow-bot repo
git remote add ${fork_user} git@github.com:${fork_user}/manifests.git

cd /workspace/manifests/${path_to_manifests_dir}
kustomize edit set image gcr.io/kubeflow-images-public/${image_name}=gcr.io/kubeflow-images-public/${image_name}@$(cat /workspace/${image_name}-digest)
cd /workspace/manifests/tests

# TODO(jlewi): Changed to make generate-changed-only once https://github.com/kubeflow/manifests/pull/665
# is submitted
# make generate-changed-only 
make generate
make test
if (( $? == 0 )); then
  git config --global user.email "kubeflow-bot@kubflow.org"
  git config --global user.name "kubeflow-bot"
  
  tmpfile=$(mktemp)
  
  echo "[auto PR] Update the ${image_name} image to commit ${kubeflow_commit}" > $tmpfile
  echo "" >> $tmpfile
  echo "* Use image digest $(cat /workspace/${image_name}-digest)" >> $tmpfile

  echo "" >> $tmpfile
  echo "" >> $tmpfile
  echo "* Image built from repo:$manifests_repo_url branch:$new_branch_name commit:$(kubeflow_commit)" >> $tmpfile

  git commit -a -F ${tmpfile}
  
  git push ${fork_user} $new_branch_name -f
  hub pull-request -f -b 'kubeflow:master' -F $tmpfile
else
  echo 'make generate && make test' failed
fi
