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

all: container

TAG?=$(shell git rev-parse HEAD)
REGISTRY?=gcr.io/kubeflow
IMAGE=tensorflow-notebook

container:
	docker build --pull -t ${REGISTRY}/${IMAGE}-cpu:${TAG} -f Dockerfile.cpu .
	docker build --pull -t ${REGISTRY}/${IMAGE}-gpu:${TAG} -f Dockerfile.gpu .

push:
	gcloud docker -- push ${REGISTRY}/${IMAGE}-cpu:${TAG}
	gcloud docker -- push ${REGISTRY}/${IMAGE}-gpu:${TAG}

.PHONY: all container push
