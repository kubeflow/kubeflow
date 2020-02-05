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

go list -m all | cut -d ' ' -f 1 > /tmp/generated_dep.txt

cd third_party

if ! diff /tmp/generated_dep.txt dep.txt; then
    echo "Please update the license file for changed dependencies."
    exit 1
fi

python3 concatenate_license.py --output=/tmp/generated_license.txt

if ! diff /tmp/generated_license.txt license.txt; then
    echo "Please regenerate third_party/license.txt."
    exit 1
fi
