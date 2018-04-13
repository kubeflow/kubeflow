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

# Takes a zip archive containing Jsonnet sources to be included with the Jsonnet
# website, strips the copyright header from each source file if present, and
# creates a new zip archive containing the processed source files.
#
# Usage:
# build_jsonnet_srcs_zip.sh jsonnet_srcs_zip jsonnet_files...

set -e

readonly JSONNET_SRCS_ZIP=${PWD}/$1
shift
readonly JSONNET_FILES=("$@")

readonly TMP=$(mktemp -d "/tmp/jsonnet_srcs_XXXX")
trap "rm -rf ${TMP}" EXIT

readonly COPYRIGHT_LINE="Copyright 2015 Google Inc. All rights reserved."

function strip_header_comment {
  local src_jsonnet_file=$1
  local dest_jsonnet_file=$2

  local second_line=$(sed -n '2{p;q;}' $src_jsonnet_file)
  if [ "$second_line" == "$COPYRIGHT_LINE" ]; then
    tail -n +17 $src_jsonnet_file > $dest_jsonnet_file
  else
    cp $src_jsonnet_file $dest_jsonnet_file
  fi
}

function process_jsonnet_srcs {
  for i in "${JSONNET_FILES[@]}"; do
    strip_header_comment $i ${TMP}/$(basename $i)
  done
  zip -qj $JSONNET_SRCS_ZIP ${TMP}/*
}

process_jsonnet_srcs
