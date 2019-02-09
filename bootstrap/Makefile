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
GOLANG_VERSION ?= 1.11.5
GOPATH ?= $(HOME)/go
# To build without the cache set the environment variable
# export DOCKER_BUILD_OPTS=--no-cache
IMG ?= gcr.io/$(GCLOUD_PROJECT)/bootstrapper
TAG ?= $(shell git describe --tags --always --dirty)
PORT ?= 2345
export GO111MODULE=on
export GO=go

all: build

auth:
	gcloud auth configure-docker

# Run go fmt against code
fmt:
	$(GO) fmt ./pkg/... ./cmd/...

# Run go vet against code
vet:
	$(GO) vet ./pkg/... ./cmd/...

generate:
	$(GO) generate ./pkg/... ./cmd/...


build-bootstrap: generate fmt vet
	$(GO) build -gcflags 'all=-N -l' -o bin/bootstrapper cmd/bootstrap/main.go

build-kfctl: generate fmt vet
	$(GO) build -i -gcflags 'all=-N -l' -o bin/kfctl cmd/kfctl/main.go

build-foo-plugin: generate fmt vet
	$(GO) build -i -gcflags 'all=-N -l' -o bin/foo.so -buildmode=plugin cmd/plugins/foo.go

build-local: build-bootstrap build-kfctl

# To edit which registries to add to bootstrapper, edit config (eg. config/default.yaml)
build: build-local
	rm -rf reg_tmp
	mkdir -p reg_tmp/kubeflow
	cp -r ../kubeflow reg_tmp/kubeflow
	cp -r ../deployment reg_tmp/kubeflow
	cp -r ../dependencies reg_tmp/kubeflow
	docker build \
		--build-arg GOLANG_VERSION=$(GOLANG_VERSION) \
		--build-arg registries=reg_tmp \
		--target=bootstrap \
		--tag $(IMG):$(TAG) .
	@echo Built $(IMG):$(TAG)

# Build but don't attach the latest tag. This allows manual testing/inspection of the image
# first.
push: build
	docker push $(IMG):$(TAG)
	@echo Pushed $(IMG):$(TAG)

push-latest: push
	gcloud container images add-tag --quiet $(IMG):$(TAG) $(IMG):latest --verbosity=info
	echo created $(IMG):latest

install: build-kfctl
	@echo copying bin/kfctl to /usr/local/bin
	@cp bin/kfctl /usr/local/bin

run-local-docker:
	docker run -d -it --name bootstrapper \
	  --mount type=bind,source=${HOME}/kf_app,target=/home/kubeflow \
	  --entrypoint /bin/bash $(IMG):$(TAG)

# init ~/myapp --platform none
test-known-platforms-init: install build-foo-plugin
	@rm -rf $(HOME)/ksonnet && \
	kfctl init $(HOME)/ksonnet -V --platform none --version master && \
	rm -rf $(HOME)/minikube && \
	kfctl init $(HOME)/minikube -V --platform minikube --version master && \
	rm -rf $(HOME)/foo && \
	PLUGINS_ENVIRONMENT=$(GOPATH)/src/github.com/kubeflow/kubeflow/bootstrap/bin kfctl init $(HOME)/foo -V --platform foo --version master && \
	echo SUCCESS

# generate all --email john@foo.com --ipName 35.233.240.120
test-known-platforms-generate: test-known-platforms-init
	@cd ~/ksonnet && \
	kfctl generate all -V && \
	cd ~/minikube && \
	kfctl generate all -V --mount-local && \
	cd ~/foo && \
	PLUGINS_ENVIRONMENT=$(GOPATH)/src/github.com/kubeflow/kubeflow/bootstrap/bin kfctl generate all -V && \
	echo SUCCESS

test-foo-plugin:
	rm -rf $(HOME)/foo
	PLUGINS_ENVIRONMENT=$(GOPATH)/src/github.com/kubeflow/kubeflow/bootstrap/bin kfctl init $(HOME)/foo --platform foo
