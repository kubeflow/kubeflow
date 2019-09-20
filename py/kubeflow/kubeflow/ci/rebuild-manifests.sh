#!/usr/bin/env bash
# get branch name of kubeflow PR
if [[ -f /workspace/${pull_request_repo}-${pull_request_id}/pr.json ]]; then
  pushd /workspace/${pull_request_repo}-${pull_request_id}
  kubeflow_forked_repo=$(cat pr.json | jq .Head.Repo? | xargs)
  kubeflow_forked_branch=$(cat pr.json | jq .Head.Branch? | xargs)
  kubeflow_forked_commit=$(cat pr.json | jq .Head.SHA? | xargs)
  new_branch_name=$(echo ${kubeflow_forked_branch}-image-update | xargs)
  user=$(cat github/pr.json | jq .user.login | xargs)
  export GITHUB_TOKEN=$(kubectl get secrets github-token-secret -ojson | jq '. | .data.token' | xargs | base64 -d)
  email=$(curl "https://api.github.com/users/kkasravi?access_token=${GITHUB_TOKEN}" -s | jq .email | xargs
  popd
  git config --global user.name $user
  git config --global user.email $email
  kubectl get secret github-secret -ojson | jq ' . | .data["ssh-publickey"]' | xargs | base64 -d > ~/.ssh/id_rsa.pub
  cp ~/.ssh/id_github-secret ~/.ssh/id_rsa
  chmod 0600 ~/.ssh/id_rsa
  chmod 0600 ~/.ssh/id_rsa.pub
  ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
  ssh-keyscan -t rsa github.com > /root/.ssh/known_hosts
  GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" git remote add upstream git@github.com:kubeflow/manifests.git
  GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" git fetch upstream master
  GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" git checkout -b $new_branch_name upstream/master
  kustomize edit set image gcr.io/kubeflow-images-public/${image_name}=gcr.io/kubeflow-images-public/${image_name}@$(cat /kubeflow/${image_name}-digest)
  cd /workspace/manifests/tests
  make generate && make test
  if (( $? == 0 )); then
    GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" git commit -a -m "image updated as part of $kubeflow_forked_repo branch:$kubeflow_forked_branch PR:${pull_request_id}"
    GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" git push origin $new_branch_name -f
    tmpfile=$(mktemp)
    echo "[auto PR] Update the $image_name image to $(cat /kubeflow/${image_name}-digest)" > $tmpfile
    echo "" >> $tmpfile
    echo "" >> $tmpfile
    echo "Image built from repo:$kubeflow_forked_repo branch:$kubeflow_forked_branch commit:$kubeflow_forked_commit" >> $tmpfile
    GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa" hub pull-request -f -b 'kubeflow:master' -F $tmpfile
  else
    echo 'make generate && make test' failed
  fi
else 
  echo 'invalid pull-request'
  echo /workspace/${pull_request_repo}-${pull_request_id}/pr.json does not exist
fi
