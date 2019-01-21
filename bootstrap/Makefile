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
GOLANG_VERSION ?= 1.11.2
# To build without the cache set the environment variable
# export DOCKER_BUILD_OPTS=--no-cache
# set to GOLANG_GCFLAGS=-gcflags "all=-N -l" to debug
GOLANG_GCFLAGS ?= ""
IMG ?= gcr.io/$(GCLOUD_PROJECT)/bootstrapper
TAG ?= $(eval TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6))$(TAG)
PORT ?= 2345
export GO111MODULE=on

all: build

auth:
	gcloud auth configure-docker

client-gen:
	@rm -f $(shell find pkg/client/kfapi/ -name '*.go' -exec grep -lr 'DO NOT EDIT' {} \;)
	go get k8s.io/code-generator/cmd/client-gen@kubernetes-1.10.12
	mkdir -p ${GOPATH}/src/k8s.io/code-generator/hack && \
		cp hack/boilerplate.go.txt ${GOPATH}/src/k8s.io/code-generator/hack/boilerplate.go.txt
	${GOPATH}/bin/client-gen \
		--fake-clientset=false \
		--input apps/v1alpha1 \
		--input-base github.com/kubeflow/kubeflow/bootstrap/pkg/apis \
		--input-dirs github.com/kubeflow/kubeflow/bootstrap/pkg/apis \
		--clientset-path github.com/kubeflow/kubeflow/bootstrap/pkg/client \
		--clientset-name kfapi

# Run go fmt against code
fmt:
	go fmt ./pkg/... ./cmd/...

# Run go vet against code
vet:
	go vet ./pkg/... ./cmd/...

build-local-bootstrap: client-gen fmt vet
	go build -gcflags 'all=-N -l' -o bin/bootstrapper cmd/bootstrap/main.go

build-local-kfctl: client-gen fmt vet
	go build -gcflags 'all=-N -l' -o bin/kfctl cmd/kfctl/main.go

build-local: build-local-bootstrap build-local-kfctl

# To edit which registries to add to bootstrapper, edit config (eg. config/default.yaml)
build: build-local
	rm -rf reg_tmp
	mkdir -p reg_tmp/kubeflow
	cp -r ../kubeflow reg_tmp/kubeflow
	cp -r ../deployment reg_tmp/kubeflow
	docker build \
		--build-arg GOLANG_VERSION=$(GOLANG_VERSION) \
		--build-arg registries=reg_tmp \
		--target=bootstrap -t $(IMG):$(TAG) .
	@echo Built $(IMG):$(TAG)

# Build but don't attach the latest tag. This allows manual testing/inspection of the image
# first.
push: build
	docker push $(IMG):$(TAG)
	@echo Pushed $(IMG):$(TAG)

push-latest: push
	gcloud container images add-tag --quiet $(IMG):$(TAG) $(IMG):latest --verbosity=info
	echo created $(IMG):latest

install: build-local-kfctl
	@echo copying bin/kfctl to /usr/local/bin
	@cp bin/kfctl /usr/local/bin

run-local:
	KUBERNETES_SERVICE_HOST=https://35.233.240.120 KUBERNETES_SERVICE_PORT=80 \
		bin/bootstrapper \
		--app-dir=${HOME}/apps \
		--registries-config-file=${PWD}/local_registries.yaml \
		--config=${PWD}/config/default.yaml \
		--in-cluster=false

run-local-docker:
	docker run -d -it --name bootstrapper \
	  --mount type=bind,source=${HOME}/kf_app,target=/home/kubeflow \
	  --entrypoint /bin/bash $(IMG):$(TAG)

debug: push cleanup
	@echo debugging $(IMG):$(TAG) using port $(PORT)
	@./debug.sh $(IMG) $(TAG) $(PORT)

debug-latest: debug
	@echo debugging $(IMG):latest using port $(PORT)
	@./debug.sh $(IMG) latest $(PORT)

cleanup:
	@./cleanup.sh kubeflow-admin
