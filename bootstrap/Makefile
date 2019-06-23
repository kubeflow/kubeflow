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
GCLOUD_PROJECT ?= kubeflow-images-public
GOLANG_VERSION ?= 1.12
GOPATH ?= $(HOME)/go
# To build without the cache set the environment variable
# export DOCKER_BUILD_OPTS=--no-cache
BOOTSTRAPPER_IMG ?= gcr.io/$(GCLOUD_PROJECT)/bootstrapper
TAG ?= $(eval TAG := $(shell git describe --tags --long))$(TAG)
MOUNT_KUBE ?=  -v $(HOME)/.kube:/root/.kube 
MOUNT_GCP ?=  -v $(HOME)/.config:/root/.config 
# set to -V
VERBOSE ?= 
PLUGINS_ENVIRONMENT ?= $(GOPATH)/src/github.com/kubeflow/kubeflow/bootstrap/bin
export GO111MODULE = on
export GO = go

# Location of junit file
JUNIT_FILE ?= /tmp/report.xml

%.md:

all: build

auth:
	gcloud auth configure-docker

# Run go fmt against code
fmt:
	@${GO} fmt ./cmd/...

# Run go vet against code
vet:
	@${GO} vet ./cmd/...

build-bootstrap: fmt vet
	${GO} build -gcflags 'all=-N -l' -o bin/bootstrapper cmd/bootstrap/main.go

# build containers using GCLOUD_PROJECT
build-gcb:
	gcloud --project=$(GCLOUD_PROJECT)\
		builds submit \
		--machine-type=n1-highcpu-32 \
		--substitutions=TAG_NAME=$(TAG)
		--config=cloudbuild.yaml .

build-local: build-bootstrap

# To edit which registries to add to bootstrapper, edit config (eg. config/default.yaml)
build:
	rm -rf reg_tmp
	mkdir -p reg_tmp/kubeflow
	cp -r ../kubeflow reg_tmp/kubeflow
	cp -r ../deployment reg_tmp/kubeflow
	mkdir -p reg_tmp/kubeflow/bootstrap
	cp -r k8sSpec reg_tmp/kubeflow/bootstrap
	docker build \
		--build-arg GOLANG_VERSION=$(GOLANG_VERSION) \
		--build-arg registries=reg_tmp \
		--target=bootstrap \
		--tag $(BOOTSTRAPPER_IMG):$(TAG) .
	@echo Built $(BOOTSTRAPPER_IMG):$(TAG)

# Build but don't attach the latest tag. This allows manual testing/inspection of the image
# first.
push: build
	docker push $(BOOTSTRAPPER_IMG):$(TAG)
	@echo Pushed $(BOOTSTRAPPER_IMG):$(TAG)

push-latest: push
	gcloud container images add-tag --quiet $(BOOTSTRAPPER_IMG):$(TAG) $(BOOTSTRAPPER_IMG):latest --verbosity=info
	echo created $(BOOTSTRAPPER_IMG):latest

run-local-docker:
	docker run -d -it --name bootstrapper \
	  --mount type=bind,source=${HOME}/kf_app,target=/home/kubeflow \
	  --entrypoint /bin/bash $(BOOTSTRAPPER_IMG):$(TAG)

#***************************************************************************************************
# Build a docker container that can be used to build kfctl
#
# The rules in this section are used to build the docker image that provides
# a suitable go build environment for kfctl

build-builder-container:
	docker build \
		--build-arg GOLANG_VERSION=$(GOLANG_VERSION) \
		--target=builder \
		--tag $(KFCTL_IMG):$(TAG) .
	@echo Built $(KFCTL_IMG):$(TAG)

# build containers using GCLOUD_PROJECT
build-builder-container-gcb:
	gcloud --project=$(GCLOUD_PROJECT) \
		builds submit \
		--machine-type=n1-highcpu-32 \
		--substitutions=TAG_NAME=$(TAG),_TARGET=builder \
		--config=cloudbuild.yaml .

# build containers using GCLOUD_PROJECT
build-bootstrap-dev-gcb:
	gcloud --project=$(GCLOUD_PROJECT) \
		builds submit \
		--machine-type=n1-highcpu-32 \
		--substitutions=TAG_NAME=$(TAG),_TARGET=bootstrap_base \
		--config=cloudbuild.yaml .

#***************************************************************************************************

clean: 
	rm -rf test && mkdir test

doc:
	doctoc README.md k8sSpec/README.md developer_guide.md
