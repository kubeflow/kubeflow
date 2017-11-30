# Copyright 2017 Google Inc.
#
# Licensed under the Apache License, VERSION 2.0 (the "License");
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

TF_VERSION=1.0
TF_GPU_VERSION=1.4
PROJECT_ID=kubeflow
GCR_PROJECT=gcr.io/${PROJECT_ID}
DOCKERHUB_PROJECT=docker.io/${PROJECT_ID}

define build
	docker build --pull -t $(1)/tf-model-server-cpu:${TF_VERSION} -f Dockerfile.cpu .
endef

define build-gpu
    docker build --pull -t $(1)/tf-model-server-gpu:${TF_GPU_VERSION} -f Dockerfile.gpu .
endef

all:
	$(call build,$(GCR_PROJECT))
	$(call build,$(DOCKERHUB_PROJECT))

build_gpu:
	$(call build-gpu,$(GCR_PROJECT))
	$(call build-gpu,$(DOCKERHUB_PROJECT))

build_gcr:
	$(call build,$(GCR_PROJECT))

build_dockerhub:
	$(call build,$(DOCKERHUB_PROJECT))

push_gcr: build_gcr
	gcloud docker -- push ${GCR_PROJECT}/tf-model-server-cpu:${TF_VERSION}

push_dockerhub: build_dockerhub
	docker push ${DOCKERHUB_PROJECT}/tf-model-server-cpu:${TF_VERSION}

push: build_gcr build_dockerhub push_gcr push_dockerhub

build_gpu_gcr:
	$(call build-gpu,$(GCR_PROJECT))

build_gpu_dockerhub:
	$(call build-gpu,$(DOCKERHUB_PROJECT))

push_gpu_gcr: build_gpu_gcr
	gcloud docker -- push ${GCR_PROJECT}/tf-model-server-gpu:${TF_GPU_VERSION}

push_gpu_dockerhub: build_gpu_dockerhub
	docker push ${DOCKERHUB_PROJECT}/tf-model-server-gpu:${TF_GPU_VERSION}

push_gpu: build_gpu_gcr build_gpu_dockerhub push_gpu_gcr push_gpu_dockerhub

help:
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@echo '    build                  build kubeflow/model-server image for both gcr and dockerhub'
	@echo '    build_gcr              build gcr.io/kubeflow/model-server image'
	@echo '    build_dockerhub        build hub.docker.com/r/kubeflow/model-server image'
	@echo '    build_gpu              build kubeflow/model-server-gpu image for both gcr and dockerhub'
	@echo '    build_gpu_gcr          build gcr.io/kubeflow/model-server-gpu image'
	@echo '    build_gpu_dockerhub    build hub.docker.com/r/kubeflow/model-server image'
	@echo '    push                   push kubeflow/model-server image to both gcr.io and hub.docker.com'
	@echo '    push_gcr               push gcr.io/kubeflow/model-server image'
	@echo '    push_dockerhub         push hub.docker.com/r/kubeflow/model-server image'
	@echo '    push_gpu               push kubeflow/model-server-gpu image to both gcr and dockerhub'
	@echo '    push_gpu_gcr           push gcr.io/kubeflow/model-server-gpu image'
	@echo '    push_gpu_dockerhub     push hub.docker.com/r/kubeflow/model-server-gpu image'
	@echo '    help                   print help doc'

.PHONY: all build build_dockerhub build_gcr push push_dockerhub push_gcr build_gpu build_gpu_gcr build_gpu_dockerhub push_gpu push_gpu_gcr push_gpu_dockerhub help
