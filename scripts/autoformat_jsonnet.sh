#!/usr/bin/env bash
set -ex
# Copyright 2018 The Kubeflow Authors All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Script to autoformat libsonnet files.
# Assumes jsonnet is on the path.

ALL_FILES=false

usage() {
  echo "autoformat_jsonnet.sh [--all]"
  echo ""
  echo "Autoformats .jsonnet and .libjsonnet files tracked by git."
  echo "By default only files relative that are modified to origin/master are formatted"
  echo ""
  echo "Options:"
  echo "    --all : Formats all .jsonnet and .libjsonnet files."
}

while [ "$1" != "" ]; do
  PARAM=$(echo $1 | awk -F= '{print $1}')
  case $PARAM in
    -h | --help)
      usage
      exit
      ;;
    --all)
      ALL_FILES=true
      ;;
    *)
      echo "ERROR: unknown parameter \"$PARAM\""
      usage
      exit 1
      ;;
  esac
  shift
done

if $ALL_FILES; then
  fmt_files=($(git ls-files -- '*.libsonnet' '*.jsonnet'))
else
  # Checkout versions of the code that shouldn't be overwritten
  raw=$(git remote)
  readarray -t remotes <<< "$raw"

  repo_name=''
  non_matching=''
  for r in "${remotes[@]}"; do
    url=$(git remote get-url ${r})
    # Period is in brackets because its a special character.
    if [[ ${url} =~ (git@github[.]com:kubeflow/.*|https://github[.]com/kubeflow/.*) ]]; then
      repo_name=${r}
    else
      non_matching="${non_matching}${r} at ${url} did not match"
    fi
  done
  echo using ${repo_name}
  if [ -z "$repo_name" ]; then
    echo "Could not find remote repository pointing at git@github.com:kubeflow/.*.git in ${non_matching}"
    exit 1
  fi
  fmt_files=($(git diff --name-only ${repo_name}/master -- '*.libsonnet' '*.jsonnet'))
fi

# Need to execute from root because git will return full paths.
ROOT=$(git rev-parse --show-toplevel)
pushd .
cd ${ROOT}

# 2 spaces vertical indentation
# Use double quotes for strings
# Use // for comments
#
# TODO(jlewi): We should probably exclude vendor and k8s lib files.
for f in "${fmt_files[@]}"; do
  if [ ! -f $f ]; then
    echo "$f doesn't exist; it was probably deleted"
    continue
  fi
  jsonnet fmt -i --string-style d --comment-style s --indent 2 $f
  echo "Autoformatted $f"
done

echo "Done Autoformatting files"
popd
