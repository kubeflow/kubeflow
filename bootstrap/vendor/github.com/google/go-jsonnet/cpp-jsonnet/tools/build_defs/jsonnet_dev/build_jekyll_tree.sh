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

# Builds a zip archive containing the full Jekyll tree for the Jsonnet website.
#
# Usage:
# build_jekyll_tree.sh jekyll_files.zip \
#     example_jsonnet_srcs.zip \
#     benchmark_jsonnet_srcs.zip \
#     jekyll_tree.zip

set -e

readonly JEKYLL_FILES_ZIP=${PWD}/$1
shift
readonly EXAMPLE_JSONNET_SRCS_ZIP=${PWD}/$1
shift
readonly BENCHMARK_JSONNET_SRCS_ZIP=${PWD}/$1
shift
readonly OUTPUT_ZIP=${PWD}/$1

readonly TMP=$(mktemp -d "/tmp/jsonnet_docs_XXXX")
trap "rm -rf ${TMP}" EXIT

function build_jekyll_tree {
  local jekyll_tree_dir=${TMP}/jekyll_tree
  rm -rf $jekyll_tree_dir
  mkdir -p $jekyll_tree_dir
  unzip -q $JEKYLL_FILES_ZIP -d $jekyll_tree_dir

  local examples_dir=$jekyll_tree_dir/doc/_includes/examples
  local benchmarks_dir=$jekyll_tree_dir/doc/_includes/benchmarks

  mkdir -p $examples_dir
  mkdir -p $benchmarks_dir

  unzip -q $EXAMPLE_JSONNET_SRCS_ZIP -d $examples_dir
  unzip -q $BENCHMARK_JSONNET_SRCS_ZIP -d $benchmarks_dir

  (cd $jekyll_tree_dir/doc && zip -qR $OUTPUT_ZIP $(find . -type f))
}

build_jekyll_tree
