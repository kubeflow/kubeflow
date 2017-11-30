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

PROJECT_ID = kubeflow
GCR_PROJECT = gcr.io/${PROJECT_ID}
DOCKERHUB_PROJECT=hub.docker.com/r/${PROJECT_ID}
TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a 256 | cut -c -6)
DIR := ${CURDIR}

# 1.4 isn't new enough for the tf-benchmarks code
# so we pin to a particular nightly build image.
# CPU_BASE = tensorflow/tensorflow:nightly
CPU_BASE = tensorflow/tensorflow@sha256:5edc0446cc989ad75bc30631f89f20694fe5bf5226f665d47e5c7f35a3b18484
# GPU_BASE = tensorflow/tensorflow:nightly-gpu
GPU_BASE = tensorflow/tensorflow@sha256:bfadad8f2c80424d8d6059d3b8cd6947bf23111dc786fc33db72b56b632a1f28

GCR_BENCHMARKS_IMAGE := $(GCR_PROJECT)/tf-benchmarks
DOCKERHUB_BENCHMARKS_IMAGE := $(DOCKERHUB_PROJECT)/tf-benchmarks

# The published versions of the example code to use.
GCR_PUBLISHED_CPU := gcr.io/kubeflow/tf-benchmarks-cpu:v20171202-bdab599-dirty-284af3
DOCKERHUB_PUBLISHED_GPU := hub.docker.com/r/kubeflow/tf-benchmarks-gpu:v20171202-bdab599-dirty-284af3
GCR_PUBLISHED_CPU := gcr.io/kubeflow/tf-benchmarks-cpu:v20171202-bdab599-dirty-284af3
DOCKERHUB_PUBLISHED_GPU := hub.docker.com/r/kubeflowtf-benchmarks-gpu:v20171202-bdab599-dirty-284af3

define build_cpu
	jinja2 Dockerfile.template --format=yaml -D base_image=$(CPU_BASE) > Dockerfile.cpu
	docker build -t $(1)-cpu:$(TAG) -f Dockerfile.cpu ./
endef

define build_gpu
	jinja2 Dockerfile.template --format=yaml -D base_image=$(GPU_BASE) > Dockerfile.gpu
	docker build -t $(1)-gpu:$(TAG) -f Dockerfile.gpu ./
endef

build_gcr:
	$(call build_cpu,$(GCR_BENCHMARKS_IMAGE))
	$(call build_gpu,$(GCR_BENCHMARKS_IMAGE))

build_dockerhub:
	$(call build_cpu,$(DOCKERHUB_BENCHMARKS_IMAGE))
	$(call build_gpu,$(DOCKERHUB_BENCHMARKS_IMAGE))

push_gcr: build_gcr
	gcloud docker -- push $(GCR_BENCHMARKS_IMAGE)-cpu:$(TAG)
	gcloud docker -- push $(GCR_BENCHMARKS_IMAGE)-gpu:$(TAG)

push_dockerhub: build_dockerhub
	docker push $(DOCKERHUB_BENCHMARKS_IMAGE)-cpu:$(TAG)
	docker push $(DOCKERHUB_BENCHMARKS_IMAGE)-gpu:$(TAG)

build-images: build_gcr build_dockerhub push_dockerhub push_gcr


build-templates:
	python create_job_specs.py --cpu_image=$(PUBLISHED_CPU) --gpu_image=$(PUBLISHED_GPU) \
		--gpu --num_workers=1 --output=tf_job_gpu.yaml
	python create_job_specs.py --cpu_image=$(PUBLISHED_CPU) --gpu_image=$(PUBLISHED_GPU) \
		--gpu --num_workers=3 --output=tf_job_gpu_distributed.yaml
	python create_job_specs.py --cpu_image=$(PUBLISHED_CPU) --gpu_image=$(PUBLISHED_GPU) \
		--no-gpu --num_workers=1 --output=tf_job_cpu.yaml
	python create_job_specs.py --cpu_image=$(PUBLISHED_CPU) --gpu_image=$(PUBLISHED_GPU) \
		--no-gpu --num_workers=3 --output=tf_job_cpu_distributed.yaml
