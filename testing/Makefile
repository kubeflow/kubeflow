# Copyright 2017 The Kubernetes Authors.
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
#
# Requirements:
#   https://github.com/mattrobenolt/jinja2-cli
#   pip install jinja2-clie
IMG = gcr.io/mlkube-testing/kubeflow-testing
TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | sha256sum | cut -c -6)
DIR := ${CURDIR}

all: build

# To build without the cache set the environment variable
# export DOCKER_BUILD_OPTS=--no-cache
build:
	@echo {\"image\": \"$(IMG):$(TAG)\"} > version.json
	docker build ${DOCKER_BUILD_OPTS} -t $(IMG):$(TAG) .
	docker tag $(IMG):$(TAG) $(IMG):latest
	@echo Built $(IMG):$(TAG) and tagged with latest

push: build
	gcloud docker -- push $(IMG):$(TAG)
	gcloud docker -- push $(IMG):latest
	@echo Pushed $(IMG) with :latest and :$(TAG) tags
