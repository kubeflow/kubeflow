#!/usr/bin/env bash

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

set -ex

# Checkout the code.
/usr/local/bin/checkout.sh /src

# Trigger a workflow
if [ -f /src/${REPO_OWNER}/${REPO_NAME}/prow_config.yaml ]; then
  python -m kubeflow.testing.run_e2e_workflow \
    --project=kubeflow-ci \
    --zone=us-east1-d \
    --cluster=kubeflow-testing \
    --bucket=kubernetes-jenkins \
    --config_file=/src/${REPO_OWNER}/${REPO_NAME}/prow_config.yaml \
    --repos_dir=/src
else
  python -m kubeflow.testing.run_e2e_workflow \
    --project=kubeflow-ci \
    --zone=us-east1-d \
    --cluster=kubeflow-testing \
    --bucket=kubernetes-jenkins \
    --component=workflows \
    --app_dir=/src/kubeflow/kubeflow/testing/workflows
fi
