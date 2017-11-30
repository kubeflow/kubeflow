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
PROJECT ?= kubeflow-images-public
IMG = gcr.io/$(PROJECT)/gcp-click-to-deploy


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

build:
	docker build . -t $(IMG):$(TAG) \
		--label=git-verions=$(GIT_VERSION)
	docker tag $(IMG):$(TAG) $(IMG):latest
	@echo Built $(IMG):latest
	@echo Built $(IMG):$(TAG)


# Build but don't attach the latest tag. This allows manual testing/inspection of the image
# first.
push: build
	gcloud docker -- push $(IMG):$(TAG)
	@echo Pushed $(IMG) with  :$(TAG) tags

update-image: push
	cd ks-app && ks param set webapp image $(IMG):$(TAG)

deploy-latest: update-image
	cd ks-app && ks apply default -c webapp

push-latest: push
	gcloud container images add-tag --quiet $(IMG):$(TAG) $(IMG):latest --verbosity=info
	echo created $(IMG):latest
