# Copyright 2017 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Create a yaml template to deploy the CRD
# Requires the template plugin
# https://github.com/technosophos/helm-template
CHART := https://storage.googleapis.com/tf-on-k8s-dogfood-releases/latest/tf-job-operator-chart-latest.tgz
deploy_config:
	rm -rf /tmp/tfjob_config_builder
	mkdir -p /tmp/tfjob_config_builder
	wget -O /tmp/tfjob_config_builder/tf-job-operator-chart-latest.tgz https://storage.googleapis.com/tf-on-k8s-dogfood-releases/latest/tf-job-operator-chart-latest.tgz
	tar -C /tmp/tfjob_config_builder -xvf  /tmp/tfjob_config_builder/tf-job-operator-chart-latest.tgz
	# We set the templates to render because we don't want to render the tests.
	helm template /tmp/tfjob_config_builder/tf-job-operator-chart --set cloud=gke,rbac.install=true  \
		-x ./templates/config.yaml -x ./templates/deployment.yaml -x ./templates/rbac.yaml -x ./templates/service-account.yaml > deploy_crd.yaml
