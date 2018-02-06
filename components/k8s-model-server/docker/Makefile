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

VERSION=1.0
GPU_VERSION=1.4
PROJECT_ID=kubeflow
PROJECT=gcr.io/${PROJECT_ID}

all: build

build:
	docker build --pull -t ${PROJECT}/model-server:${VERSION} .

build-gpu:
	docker build --pull -t ${PROJECT}/model-server:${GPU_VERSION} -f Dockerfile.gpu .

push: build
	gcloud docker -- push ${PROJECT}/model-server:${VERSION}

push-gpu: build-gpu
	gcloud docker -- push ${PROJECT}/model-server:${GPU_VERSION}

help:
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@echo '    build        build tensorflow-model-server image'
	@echo '    build-gpu    build tensorflow-model-server with gpu support'
	@echo '    push         push the image of model-server'
	@echo '    push-gpu     push the image of model-server with gpu support'
	@echo '    help         print help doc'

.PHONY: all build build-gpu push push-gpu help
