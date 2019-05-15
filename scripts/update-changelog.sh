#!/usr/bin/env bash

# Copyright 2018 The Kubeflow Authors.
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

# Update CHANGELOG.md using github_changelog_generator.
#
# The script will compute changes between release tags. So make sure there is
# a release tag corresponding to the release you want to compute the changes
# for.
set -o errexit
set -o nounset
set -o pipefail
set -x

GITHUB_TOKEN=${GITHUB_TOKEN:-"NO"}

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." > /dev/null && pwd)"

cd ${ROOT}

if [ "${GITHUB_TOKEN}" == "NO" ]; then
  echo "Environment variable GITHUB_TOKEN is not set."
  exit 1
fi

github_changelog_generator -t ${GITHUB_TOKEN} -u kubeflow -p kubeflow \
  --exclude-labels community/discussion,community/question,duplicate,question,invalid,wontfix \
  --bug-labels kind/bug,problems/bug \
  --enhancement-labels improvement/optimization,kind/enhancement,improvement/enhancement,addition/feature,kind/feature \
  --enhancement-label "**Features and improvements:**"

cd - > /dev/null
