#!/bin/bash -e
#
# Copyright 2017 The ksonnet authors
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

KSONNET_ROOT=$(cd "$(dirname "$0")/../.."; pwd)

BIN=${KSONNET_ROOT}/_output/bin
mkdir -p ${BIN}
go build -o ${BIN}/docs-gen ./docs/generate/ks.go

if [[ $# -gt 1 ]]; then
  echo "usage: ${BASH_SOURCE} [DIRECTORY]"
  exit 1
fi

OUTPUT_DIR="$@"
if [[ -z "${OUTPUT_DIR}" ]]; then
  OUTPUT_DIR=${KSONNET_ROOT}/docs/cli-reference
fi

${BIN}/docs-gen ${OUTPUT_DIR}
