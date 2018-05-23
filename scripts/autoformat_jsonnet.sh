#!/bin/bash

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

function usage()
{
    echo "autoformat_jsonnet.sh [--all]"
    echo ""
    echo "Autoformats .jsonnet and .libjsonnet files tracked by git."
    echo "By default only files relative that are modified to origin/master are formatted"
    echo ""
    echo "Options:"
    echo "    --all : Formats all .jsonnet and .libjsonnet files."
}

while [ "$1" != "" ]; do
    PARAM=`echo $1 | awk -F= '{print $1}'`
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
    fmt_files=($(git diff --name-only origin/master -- '*.libsonnet' '*.jsonnet'))
fi

# 2 spaces vertical indentation
# Use double quotes for strings
# Use // for comments
for f in "${fmt_files[@]}"
do
  jsonnet fmt -i --string-style d --comment-style s --indent 2 $f 
  echo "Autoformatted $f"
done

