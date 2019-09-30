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
# The script does the following in a forked manifests repo
# - edits the image tag in the kustomization.yaml (its workingdir is where the component's manifest is)
# - calls `make generate; make test` under manifests/tests 
# - if successful 
#   - commits the changes 
#   - creates a PR.
#
echo '--env--'
env
echo '--env--'
new_branch_name='update_'$image_name'_'$kubeflow_repo_revision
export GITHUB_TOKEN=$(kubectl get secrets github-token -ojson | jq '. | .data.token' | xargs | base64 -d)
kubectl get secret github-ssh -ojson | jq ' . | .data["ssh-publickey"]' | xargs | base64 -d > ~/.ssh/id_rsa.pub
cp ~/.ssh/id_github-ssh ~/.ssh/id_rsa
chmod 0600 ~/.ssh/id_rsa
chmod 0600 ~/.ssh/id_rsa.pub
ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
ssh-keyscan -t rsa github.com > /root/.ssh/known_hosts
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" git fetch origin master
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" git checkout -b $new_branch_name origin/master
kustomize edit set image gcr.io/kubeflow-images-public/${image_name}=gcr.io/kubeflow-images-public/${image_name}@$(cat /kubeflow/${image_name}-digest)
cd /workspace/manifests/tests
make generate && make test
if (( $? == 0 )); then
  git config --global user.email "kubeflow-bot@kubflow.org"
  git config --global user.name "kubeflow-bot"
  GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" git commit -a -m "image updated as part of kubeflow repo:$kubeflow_repo_url commit:$kubeflow_repo_revision"
  GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" git push origin $new_branch_name -f
  tmpfile=$(mktemp)
  echo "[auto PR] Update the $image_name image to $(cat /kubeflow/${image_name}-digest)" > $tmpfile
  echo "" >> $tmpfile
  echo "" >> $tmpfile
  echo "Image built from repo:$manifests_repo_url branch:$new_branch_name commit:$(git rev-parse HEAD)" >> $tmpfile
  GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" hub pull-request -f -b 'manifests:master' -F $tmpfile
else
  echo 'make generate && make test' failed
fi
