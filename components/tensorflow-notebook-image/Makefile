# Copyright 2015 Google Inc. All rights reserved.
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

TAG?=$(shell git rev-parse HEAD)
GCR_REGISTRY?=gcr.io/kubeflow
DOCKERHUB_REGISTRY?=hub.docker.com/r/kubeflow
IMAGE=tensorflow-notebook

define container
	docker build --pull -t $(1)/${IMAGE}-cpu:${TAG} -f Dockerfile.cpu .
	docker build --pull -t $(1)/${IMAGE}-gpu:${TAG} -f Dockerfile.gpu .
endef

all:
	$(call container,$(GCR_REGISTRY))
	$(call container,$(DOCKERHUB_REGISTRY))

build_gcr:
	$(call container,$(GCR_REGISTRY))

build_dockerhub:
	$(call container,$(DOCKERHUB_REGISTRY))

push_gcr: build_gcr
	gcloud docker -- push $(GCR_REGISTRY)/${IMAGE}-cpu:${TAG}
	gcloud docker -- push $(GCR_REGISTRY)/${IMAGE}-gpu:${TAG}

push_dockerhub: build_dockerhub
	docker push $(DOCKERHUB_REGISTRY)/${IMAGE}-cpu:${TAG}
	docker push $(DOCKERHUB_REGISTRY)/${IMAGE}-gpu:${TAG}

push: build_gcr build_dockerhub push_gcr push_dockerhub

.PHONY: all containers push push_dockerhub push_gcr
