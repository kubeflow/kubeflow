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
GOOGLE_APPLICATION_CREDENTIALS ?= $(HOME)/auth.json
# To build without the cache set the environment variable
# export DOCKER_BUILD_OPTS=--no-cache
IMG ?= gcr.io/$(GCLOUD_PROJECT)/bootstrapper
TAG ?= $(shell git describe --tags --always --dirty)
# set to -V
VERBOSE ?= 
PLUGINS_ENVIRONMENT ?= $(GOPATH)/src/github.com/kubeflow/kubeflow/bootstrap/bin
export GO111MODULE = on
export GO = go

%.so:
	cd cmd/plugins/$* && \
	$(GO) build -i -gcflags 'all=-N -l' -o ../../../bin/$*.so -buildmode=plugin $*.go

%.init:
	@echo kfctl init test/$* $(VERBOSE) --platform $* --project $(GCLOUD_PROJECT) && \
	GOOGLE_APPLICATION_CREDENTIALS=$(GOOGLE_APPLICATION_CREDENTIALS) PLUGINS_ENVIRONMENT=$(PLUGINS_ENVIRONMENT) kfctl init $(PWD)/test/$* $(VERBOSE) --platform $* --project $(GCLOUD_PROJECT)

%.generate:
	@echo kfctl generate all $(VERBOSE) '(--platform '$*')' && \
	cd test/$* && \
	GOOGLE_APPLICATION_CREDENTIALS=$(GOOGLE_APPLICATION_CREDENTIALS) PLUGINS_ENVIRONMENT=$(PLUGINS_ENVIRONMENT) kfctl generate all $(VERBOSE) --mount-local --email gcp-deploy@$(GCLOUD_PROJECT).iam.gserviceaccount.com

all: build

auth:
	gcloud auth configure-docker

# Run go fmt against code
fmt:
	@$(GO) fmt ./pkg/apis/apps/client/... ./pkg/apis/apps/gcp/... ./pkg/utils/... ./pkg/client/minikube ./pkg/client/gcp/... ./cmd/kfctl/...

# Run go vet against code
vet:
	@$(GO) vet ./pkg/apis/apps/client/... ./pkg/apis/apps/gcp/... ./pkg/utils/... ./pkg/client/minikube ./pkg/client/gcp/... ./cmd/kfctl/...

generate:
	@$(GO) generate ./pkg/apis/apps/client/... ./pkg/apis/apps/gcp/... ./pkg/utils/... ./pkg/client/minikube ./pkg/client/gcp/... ./cmd/kfctl/...

$(GOPATH)/bin/deepcopy-gen:
	GO111MODULE=off $(GO) get k8s.io/code-generator/cmd/deepcopy-gen

pkg/apis/apps/gcp/v1alpha1/zz_generated.deepcopy.go: pkg/apis/apps/gcp/v1alpha1/application_types.go
	$(GOPATH)/bin/deepcopy-gen -i github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/gcp/... -O zz_generated.deepcopy

pkg/apis/apps/ksonnet/v1alpha1/zz_generated.deepcopy.go: pkg/apis/apps/ksonnet/v1alpha1/application_types.go
	$(GOPATH)/bin/deepcopy-gen -i github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/ksonnet/... -O zz_generated.deepcopy

pkg/apis/apps/client/v1alpha1/zz_generated.deepcopy.go: pkg/apis/apps/client/v1alpha1/application_types.go
	$(GOPATH)/bin/deepcopy-gen -i github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/client/... -O zz_generated.deepcopy

deepcopy: $(GOPATH)/bin/deepcopy-gen pkg/apis/apps/gcp/v1alpha1/zz_generated.deepcopy.go pkg/apis/apps/client/v1alpha1/zz_generated.deepcopy.go

build-bootstrap: generate fmt vet
	$(GO) build -gcflags 'all=-N -l' -o bin/bootstrapper cmd/bootstrap/main.go

build-kfctl: deepcopy generate fmt vet
	$(GO) build -i -gcflags 'all=-N -l' -o bin/kfctl cmd/kfctl/main.go

build-local: build-bootstrap build-kfctl

# To edit which registries to add to bootstrapper, edit config (eg. config/default.yaml)
build:
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

install: build-kfctl dockerfordesktop.so kustomize.so ksonnet.so
	@echo copying bin/kfctl to /usr/local/bin
	@cp bin/kfctl /usr/local/bin

run-local-docker:
	docker run -d -it --name bootstrapper \
	  --mount type=bind,source=${HOME}/kf_app,target=/home/kubeflow \
	  --entrypoint /bin/bash $(IMG):$(TAG)

# static and plugins toogle whether we try and load a platform as a .so.
# There is an example plugin 'dockerfordesktop' that can be loaded as a .so.
# By default we disable loading plugins and link dockerfordesktop into the kfctl binary (static)
static:
	@ex pkg/apis/apps/group.go <hack/static
	@ex pkg/client/client.go <hack/static || echo Plugin functionality disabled

plugins:
	@ex pkg/apis/apps/group.go <hack/plugins
	@ex pkg/client/client.go <hack/plugins || echo Plugin functionality enabled

clean: 
	rm -rf test && mkdir test
      
test-init: clean install dockerfordesktop.init minikube.init gcp.init

test-generate: test-init dockerfordesktop.generate minikube.generate gcp.generate

test-kfctl: plugins test-generate static test-generate
      
test-plugins-static: plugins test-known-platforms-generate static test-known-platforms-generate

test-kfctl: test-plugins-static
