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
	@echo kfctl init test/$* $(VERBOSE) --platform $* --project $(GCLOUD_PROJECT) --version master && \
	GOOGLE_APPLICATION_CREDENTIALS=$(GOOGLE_APPLICATION_CREDENTIALS) PLUGINS_ENVIRONMENT=$(PLUGINS_ENVIRONMENT) kfctl init $(PWD)/test/$* $(VERBOSE) --platform $* --project $(GCLOUD_PROJECT) --version master

%.init-no-platform:
	@echo kfctl init test/$* $(VERBOSE) --version master && \
	kfctl init $(PWD)/test/$* $(VERBOSE) --version master

%.generate:
	@echo kfctl generate all $(VERBOSE) '(--platform '$*')' && \
	cd test/$* && \
	GOOGLE_APPLICATION_CREDENTIALS=$(GOOGLE_APPLICATION_CREDENTIALS) PLUGINS_ENVIRONMENT=$(PLUGINS_ENVIRONMENT) kfctl generate all $(VERBOSE) --mount-local --email gcp-deploy@$(GCLOUD_PROJECT).iam.gserviceaccount.com

all: build

auth:
	gcloud auth configure-docker

# Run go fmt against code
fmt:
	@$(GO) fmt ./config/... ./pkg/apis/apps/kfdef/... ./pkg/utils/... ./pkg/kfapp/minikube ./pkg/kfapp/gcp/... ./cmd/kfctl/...

# Run go vet against code
vet:
	@$(GO) vet ./config/... ./pkg/apis/apps/kfdef/... ./pkg/utils/... ./pkg/kfapp/minikube ./pkg/kfapp/gcp/... ./cmd/kfctl/...

generate:
	@$(GO) generate ./config/... ./pkg/apis/apps/kfdef/... ./pkg/utils/... ./pkg/kfapp/minikube ./pkg/kfapp/gcp/... ./cmd/kfctl/...

/tmp/v2:
	@[ ! -d /tmp/v2 ] && unzip -q -d /tmp hack/v2.zip

$(GOPATH)/bin/deepcopy-gen:
	GO111MODULE=off $(GO) get k8s.io/code-generator/cmd/deepcopy-gen

config/zz_generated.deepcopy.go: config/types.go
	$(GOPATH)/bin/deepcopy-gen -i github.com/kubeflow/kubeflow/bootstrap/config/... -O zz_generated.deepcopy

pkg/apis/apps/kfdef/v1alpha1/zz_generated.deepcopy.go: pkg/apis/apps/kfdef/v1alpha1/application_types.go
	$(GOPATH)/bin/deepcopy-gen -i github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/... -O zz_generated.deepcopy

v2/pkg/apis/apps/kfdef/v1alpha1/zz_generated.deepcopy.go: v2/pkg/apis/apps/kfdef/v1alpha1/application_types.go
	$(GOPATH)/bin/deepcopy-gen -i github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/... -O zz_generated.deepcopy

deepcopy: $(GOPATH)/bin/deepcopy-gen config/zz_generated.deepcopy.go pkg/apis/apps/kfdef/v1alpha1/zz_generated.deepcopy.go v2/pkg/apis/apps/kfdef/v1alpha1/zz_generated.deepcopy.go 

build-bootstrap: /tmp/v2 deepcopy generate fmt vet
	$(GO) build -gcflags 'all=-N -l' -o bin/bootstrapper cmd/bootstrap/main.go

build-kfctl: /tmp/v2 deepcopy generate fmt vet
	$(GO) build -i -gcflags 'all=-N -l' -o bin/kfctl cmd/kfctl/main.go

# Release tarballs suitable for upload to GitHub release pages
build-kfctl-tgz: build-kfctl
	chmod a+rx ./bin/kfctl
	rm -f bin/*.tgz
	cd bin && tar -cvzf kfctl_$(TAG)_linux.tar.gz ./kfctl
	cp -f ./bin/kfctl_$(TAG)_linux.tar.gz ./bin/kfctl_$(TAG)_darwin.tar.gz

# push the releases to a GitHub page
push-to-github-release: build-kfctl-tgz
	github-release upload \
	    --user kubeflow \
	    --repo kubeflow \
	    --tag $(TAG) \
	    --name "kfctl_$(TAG)_linux.tar.gz" \
	    --file bin/kfctl_$(TAG)_linux.tar.gz
	github-release upload \
	    --user kubeflow \
	    --repo kubeflow \
	    --tag $(TAG) \
	    --name "kfctl_$(TAG)_darwin.tar.gz" \
	    --file bin/kfctl_$(TAG)_darwin.tar.gz
	 
build-kfctl-container:
	docker build \
		--build-arg GOLANG_VERSION=$(GOLANG_VERSION) \
		--target=kfctl \
		--tag $(KFCTL_IMG):$(TAG) .
	@echo Built $(KFCTL_IMG):$(TAG)

build-local: build-bootstrap build-kfctl

# To edit which registries to add to bootstrapper, edit config (eg. config/default.yaml)
build:
	rm -rf reg_tmp
	mkdir -p reg_tmp/kubeflow
	cp -r ../kubeflow reg_tmp/kubeflow
	cp -r ../deployment reg_tmp/kubeflow
	cp -r ../dependencies reg_tmp/kubeflow
	mkdir -p reg_tmp/kubeflow/bootstrap
	cp -r k8sSpec reg_tmp/kubeflow/bootstrap
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

install: build-kfctl dockerfordesktop.so
	@echo copying bin/kfctl to /usr/local/bin
	@cp bin/kfctl /usr/local/bin

run-local-docker:
	docker run -d -it --name bootstrapper \
	  --mount type=bind,source=${HOME}/kf_app,target=/home/kubeflow \
	  --entrypoint /bin/bash $(IMG):$(TAG)

clean: 
	rm -rf test && mkdir test

test-init: clean install dockerfordesktop.init minikube.init gcp.init none.init-no-platform

test-generate: test-init dockerfordesktop.generate minikube.generate gcp.generate none.generate
