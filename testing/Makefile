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

PROJECT_ID = kubeflow-ci/kubeflow-testing
GCR_PROJECT = gcr.io/${PROJECT_ID}
DOCKERHUB_PROJECT=hub.docker.com/r/${PROJECT_ID}
TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a 256 | cut -c -6)
DIR := ${CURDIR}


# To build without the cache set the environment variable
# export DOCKER_BUILD_OPTS=--no-cache
define build
	docker build ${DOCKER_BUILD_OPTS} -t $(1):$(TAG) .
	docker tag $(1):$(TAG) $(1):latest
	@echo Built $(1):$(TAG) and tagged with latest
endef

all:
	$(call build,$(GCR_PROJECT))
	$(call build,$(DOCKERHUB_PROJECT))

build_gcr:
	$(call build,$(GCR_PROJECT))

build_dockerhub:
	$(call build,$(DOCKERHUB_PROJECT))

push: build_gcr build_dockerhub push_gcr push_dockerhub

push_gcr: build_gcr
	gcloud docker -- push $(GCR_PROJECT):$(TAG)
	gcloud docker -- push $(GCR_PROJECT):latest
	@echo Pushed $(GCR_PROJECT) with :latest and :$(TAG) tags

push_dockerhub: build_dockerhub
	docker push $(DOCKERHUB_PROJECT):$(TAG)
	docker push $(DOCKERHUB_PROJECT):latest
	@echo Pushed $(DOCKERHUB_PROJECT) with :latest and :$(TAG) tags
