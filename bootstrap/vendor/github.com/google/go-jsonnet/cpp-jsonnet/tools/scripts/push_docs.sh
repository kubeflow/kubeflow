#!/bin/bash
# Copyright 2015 Google Inc. All rights reserved.
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

# Publishes a new version of the Jsonnet website.
#
# This script does the following:
#
# 1. Builds an archive containing the Jekyll website
# 2. In a temporary directory or the provided WORKING_DIR, clones the
#    Jsonnet website, and checks out the gh-pages branch
# 3. Replaces the contents of the repository with the new version of the site
#    from the archive
# 4. Commits the new version of the site and pushes to the remote repository.
#
# Usage:
# push_docs.sh [WORKING_DIR]

set -e

readonly WORKING_DIR=$1

readonly JSONNET_REPO="git@github.com:google/jsonnet.git"

function check {
  which $1 > /dev/null || (echo "$1 not installed. Please install $1."; exit 1)
}

function main {
  check git
  check bazel

  local working_dir=$WORKING_DIR
  if [ -z "$working_dir" ]; then
    working_dir=$(mktemp -d "/tmp/jsonnet_gh_pages_XXXX")
    trap "rm -rf ${working_dir}" EXIT
  fi

  if [ ! -r 'doc/BUILD' ]; then
    echo 'No BUILD file found.' >&1
    echo 'Are you running this script from the root of the Jsonnet repository?' >&1
    exit 1
  fi

  local jekyll_tree_zip=${working_dir}/jekyll_tree.zip
  make doc/js/libjsonnet.js
  bazel build //doc:jekyll_tree
  cp bazel-genfiles/doc/jekyll_tree.zip $jekyll_tree_zip

  local gh_pages_repo=${working_dir}/gh-pages
  mkdir $gh_pages_repo
  git clone $JSONNET_REPO $gh_pages_repo

  cd $gh_pages_repo
  git checkout gh-pages
  rm $(git ls-tree --name-only -r HEAD)
  unzip -q $jekyll_tree_zip -d $gh_pages_repo

  git add .
  git commit -am "Update docs."
  git push -u origin gh-pages
}

main
