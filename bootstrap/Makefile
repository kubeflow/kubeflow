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
GOLANG_VERSION ?= 1.10.3
# set to GOLANG_GCFLAGS=-gcflags "all=-N -l" to debug
GOLANG_GCFLAGS ?= ""
IMG ?= gcr.io/$(GCLOUD_PROJECT)/bootstrapper

BUILDER_IMG ?= gcr.io/$(GCLOUD_PROJECT)/bootstrapper-builder
BUILDER_IMG_VERSION ?= $(shell head -1 glide.lock | cut -d ' ' -f 2)

TAG ?= $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6)
PORT ?= 2345


CHANGED_FILES := $(shell git diff-files)

ifeq ($(strip $(CHANGED_FILES)),)
# Changed files is empty; not dirty
# Don't include --dirty because it could be dirty if files outside the ones we care
# about changed.
GIT_VERSION := $(shell git describe --always)
else
GIT_VERSION := $(shell git describe --always)-dirty-$(shell git diff | shasum -a256 | cut -c -6)
endif

TAG := $(shell date +v%Y%m%d)-$(GIT_VERSION)

all: build

# To build without the cache set the environment variable
# export DOCKER_BUILD_OPTS=--no-cache

# To edit which registries to add to bootstrapper, edit config (eg. config/default.yaml)
build:
	python build.py --build_args=BUILDER_IMG=$(BUILDER_IMG),BUILDER_IMG_VERSION=$(BUILDER_IMG_VERSION) --image=$(IMG):$(TAG) --build_opts=$(DOCKER_BUILD_OPTS) --config=image_registries.yaml --target=build
	@echo Built $(IMG):$(TAG)


build-builder:
	docker build ${DOCKER_BUILD_OPTS} --build-arg GOLANG_VERSION=$(GOLANG_VERSION) \
           --build-arg GOLANG_GCFLAGS="$(GOLANG_GCFLAGS)" -t $(BUILDER_IMG):$(BUILDER_IMG_VERSION) \
           --label=git-verions=$(GIT_VERSION) -f Dockerfile.Builder .
	@echo Built $(BUILDER_IMG):$(BUILDER_IMG_VERSION)

push-builder: build-builder
	gcloud docker -- push $(BUILDER_IMG):$(BUILDER_IMG_VERSION)
	@echo Pushed $(BUILDER_IMG):$(BUILDER_IMG_VERSION)

push-builder-latest: push-builder
	gcloud container images add-tag --quiet $(BUILDER_IMG):$(BUILDER_IMG_VERSION) $(BUILDER_IMG):latest --verbosity=info
	@echo created $(BUILDER_IMG):latest

# Build but don't attach the latest tag. This allows manual testing/inspection of the image
# first.
push: build
	gcloud docker -- push $(IMG):$(TAG)
	@echo Pushed $(IMG):$(TAG)

push-latest: push
	gcloud container images add-tag --quiet $(IMG):$(TAG) $(IMG):latest --verbosity=info
	echo created $(IMG):latest

debug:
	@echo debugging $(IMG):$(TAG) using port $(PORT)
	@./debug.sh $(IMG) $(TAG) $(PORT)

cleanup:
	@echo Removing kubeflow-admin namespace
	@kubectl delete ns kubeflow-admin
