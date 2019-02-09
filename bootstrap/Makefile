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
PLUGINS_ENVIRONMENT ?= $(GOPATH)/src/github.com/kubeflow/kubeflow/bootstrap/bin
export GO111MODULE = on
export GO = go

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
	$(GO) build -i -gcflags 'all=-N -l' -o bin/foo.so -buildmode=plugin cmd/plugins/foo/foo.go

build-minikube-plugin: generate fmt vet
	$(GO) build -i -gcflags 'all=-N -l' -o bin/minikube.so -buildmode=plugin cmd/plugins/minikube/minikube.go

build-dockerfordesktop-plugin: generate fmt vet
	$(GO) build -i -gcflags 'all=-N -l' -o bin/dockerfordesktop.so -buildmode=plugin cmd/plugins/dockerfordesktop/dockerfordesktop.go

build-gcp-plugin: generate fmt vet
	$(GO) build -i -gcflags 'all=-N -l' -o bin/gcp.so -buildmode=plugin cmd/plugins/gcp/gcp.go

build-ksonnet-plugin: generate fmt vet
	$(GO) build -i -gcflags 'all=-N -l' -o bin/ksonnet.so -buildmode=plugin cmd/plugins/ksonnet/ksonnet.go

build-local: build-bootstrap build-kfctl

# To edit which registries to add to bootstrapper, edit config (eg. config/default.yaml)
build: build-local
	rm -rf reg_tmp
	mkdir -p reg_tmp/kubeflow
	cp -r ../kubeflow reg_tmp/kubeflow
	cp -r ../deployment reg_tmp/kubeflow
	cp -r ../dependencies reg_tmp/kubeflow
	docker build -t $(IMG):$(TAG) --build-arg GOLANG_VERSION=$(GOLANG_VERSION) --build-arg registries=reg_tmp --target=bootstrap .
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

test-known-platforms-init: install build-ksonnet-plugin build-minikube-plugin build-dockerfordesktop-plugin build-foo-plugin build-gcp-plugin
	@rm -rf $(HOME)/foo && \
	PLUGINS_ENVIRONMENT=$(PLUGINS_ENVIRONMENT) kfctl init $(HOME)/foo -V --platform foo --version master && \
	rm -rf $(HOME)/ksonnet && \
	PLUGINS_ENVIRONMENT=$(PLUGINS_ENVIRONMENT) kfctl init $(HOME)/ksonnet -V --platform ksonnet --version master && \
	rm -rf $(HOME)/minikube && \
	PLUGINS_ENVIRONMENT=$(PLUGINS_ENVIRONMENT) kfctl init $(HOME)/minikube -V --platform minikube --version master && \
	rm -rf $(HOME)/dockerfordesktop && \
	PLUGINS_ENVIRONMENT=$(PLUGINS_ENVIRONMENT) kfctl init $(HOME)/dockerfordesktop -V --platform docker-for-desktop --version master && \
	rm -rf $(HOME)/gcp && \
	PLUGINS_ENVIRONMENT=$(PLUGINS_ENVIRONMENT) kfctl init $(HOME)/gcp -V --platform gcp --version master && \
	echo SUCCESS

test-known-platforms-generate: test-known-platforms-init
	@cd ~/foo && \
	PLUGINS_ENVIRONMENT=$(GOPATH)/src/github.com/kubeflow/kubeflow/bootstrap/bin kfctl generate all -V && \
	cd ~/ksonnet && \
	PLUGINS_ENVIRONMENT=$(GOPATH)/src/github.com/kubeflow/kubeflow/bootstrap/bin kfctl generate all -V && \
	cd ~/minikube && \
	PLUGINS_ENVIRONMENT=$(GOPATH)/src/github.com/kubeflow/kubeflow/bootstrap/bin kfctl generate all -V --mount-local && \
	cd ~/dockerfordesktop && \
	PLUGINS_ENVIRONMENT=$(GOPATH)/src/github.com/kubeflow/kubeflow/bootstrap/bin kfctl generate all -V --mount-local && \
	cd ~/gcp && \
	PLUGINS_ENVIRONMENT=$(GOPATH)/src/github.com/kubeflow/kubeflow/bootstrap/bin kfctl generate all -V --email jsmith@foo.com --ipName 35.233.240.120 --zone us-west1-a --project constant-cubist-173123 && \
	echo SUCCESS

# debug and nodebug are for kfctl and enable debugging in goland 
# by disabling plugins. This is a golang compiler bug which will be fixed in 1.12.
debug:
	@ex pkg/apis/apps/group.go <hack/debug
	@ex pkg/client/foo/foo.go <hack/debug
	@ex pkg/client/minikube/minikube.go <hack/debug
	@ex pkg/client/dockerfordesktop/dockerfordesktop.go <hack/debug
	@ex pkg/client/gcp/gcp.go <hack/debug
	@ex cmd/kfctl/cmd/root.go <hack/debug || echo DEBUG ENABLED

nodebug:
	@ex pkg/apis/apps/group.go <hack/nodebug
	@ex pkg/client/foo/foo.go <hack/nodebug
	@ex pkg/client/minikube/minikube.go <hack/nodebug
	@ex pkg/client/dockerfordesktop/dockerfordesktop.go <hack/nodebug
	@ex pkg/client/gcp/gcp.go <hack/nodebug
	@ex cmd/kfctl/cmd/root.go <hack/nodebug || echo DEBUG DISABLED
