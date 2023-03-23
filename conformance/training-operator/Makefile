# Copyright 2023 The Kubeflow Authors.
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

setup:
	# Create the conformance report directory
	mkdir -p /tmp/kf-conformance

	kubectl apply -f ./setup.yaml

run: setup run-training-operator

report: report-training-operator

clean:
	kubectl delete -f ./setup.yaml
	rm -rf /tmp/kf-conformance

run-training-operator:
	kubectl apply -f ./training-operator-conformance.yaml

report-training-operator:
	./report-pod.sh \
		$(shell kubectl get pod -n kf-conformance --selector=app=training-operator-conformance -o jsonpath='{.items[*].metadata.name}') \
		/tmp/training-operator-conformance.done \
		/tmp/training-operator-conformance.log
