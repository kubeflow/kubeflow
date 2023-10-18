#!/bin/sh

# Copyright 2022 The Kubeflow Authors.
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

# Runs a pod ($1). Waits for the done file ($2) to appear.
# Copy out the test report file ($3)

# Wait for the pod to generate a done file.
until kubectl exec $1 -n kf-conformance -- ls $2
do
    sleep 30
    echo "Waiting for $1 to finish ..."
done

REPORT_PATH=/tmp/kf-conformance/$(basename $3)
kubectl cp kf-conformance/$1:$3 $REPORT_PATH

echo "Test report copied to $REPORT_PATH"