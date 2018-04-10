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

# Brings up the Jsonnet website locally.
#
# This script builds an archive containing the Jsonnet website, unzips the
# files into a temporary directory or the WORKING_DIR if provided, and runs
# jekyll serve.
#
# Usage:
# serve_docs.sh [WORKING_DIR]

set -e

readonly WORKING_DIR=$1

function check {
  which $1 > /dev/null || (echo "$1 not installed. Please install $1."; exit 1)
}

function main {
  check bazel
  check jekyll

  local working_dir=$WORKING_DIR
  if [ -z "$working_dir" ]; then
    working_dir=$(mktemp -d "/tmp/jsonnet_jekyll_tree_XXXX")
    trap "rm -rf ${working_dir}" EXIT
  fi

  if [ ! -r 'doc/BUILD' ]; then
    echo 'No BUILD file found.' >&1
    echo 'Are you running this script from the root of the Jsonnet repository?' >&1
    exit 1
  fi

  bazel build //doc:jekyll_tree
  unzip -q bazel-genfiles/doc/jekyll_tree.zip -d $working_dir

  cd $working_dir
  jekyll serve --port 8200 --watch
}

main
