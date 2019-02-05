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
# Requirements:
#   https://github.com/mattrobenolt/jinja2-cli
#   pip install jinja2-clie
IMG = gcr.io/kubeflow-images-staging/echo-server
PUBLIC = gcr.io/kubeflow-images-public/echo-server
DIR := ${CURDIR}

# List any changed  files.
CHANGED_FILES := $(shell git diff-files --relative=components/echo-server)

ifeq ($(strip $(CHANGED_FILES)),)
# Changed files is empty; not dirty
# Don't include --dirty because it could be dirty if files outside the ones we care
# about changed.
TAG := $(shell date +v%Y%m%d)-$(shell git describe --always)
else
TAG := $(shell date +v%Y%m%d)-$(shell git describe --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6)
endif

all: build

# To build without the cache set the environment variable
# export DOCKER_BUILD_OPTS=--no-cache
build:
	docker build ${DOCKER_BUILD_OPTS} -t $(IMG):$(TAG) .
	docker tag ${DOCKER_BUILD_OPTS} $(IMG):$(TAG) $(IMG):latest
	@echo Built $(IMG):$(TAG)

# Build but don't attach the latest tag. This allows manual testing/inspection of the image
# first.
push: build
	gcloud docker -- push $(IMG):$(TAG)
	@echo Pushed $(IMG) with  :$(TAG) tags

push-latest: push
	gcloud container images add-tag --quiet $(IMG):$(TAG) $(IMG):latest --verbosity=info
	echo created $(IMG):latest

push-public: push-latest
	gcloud container images add-tag --quiet $(IMG):$(TAG) $(PUBLIC):$(TAG) --verbosity=info
	gcloud container images add-tag --quiet $(IMG):$(TAG) $(PUBLIC):latest --verbosity=info
