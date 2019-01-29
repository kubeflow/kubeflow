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

all: build

auth:
	gcloud auth configure-docker

# Run go fmt against code
fmt:
	go fmt ./cmd/...

# Run go vet against code
vet:
	go vet ./cmd/...

build-local: fmt vet
	GO111MODULE=on go build -gcflags 'all=-N -l' -o bin/bootstrapper cmd/bootstrap/main.go

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

run-local:
	KUBERNETES_SERVICE_HOST=https://35.233.240.120 KUBERNETES_SERVICE_PORT=80 bin/bootstrapper --app-dir=$$HOME/apps --registries-config-file=$$PWD/local_registries.yaml --config=$$PWD/config/default.yaml --in-cluster=false

run-local-docker:
	docker run -d -it --name bootstrapper \
	  --mount type=bind,source=$$HOME/kf_app,target=/home/kubeflow \
	  --entrypoint /bin/bash $(IMG):$(TAG)

debug: push cleanup
	@echo debugging $(IMG):$(TAG) using port $(PORT)
	@./debug.sh $(IMG) $(TAG) $(PORT)

debug-latest: debug
	@echo debugging $(IMG):latest using port $(PORT)
	@./debug.sh $(IMG) latest $(PORT)

cleanup:
	@./cleanup.sh kubeflow-admin
