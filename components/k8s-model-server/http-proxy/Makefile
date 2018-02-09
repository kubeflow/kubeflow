# Copyright 2018 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

VERSION=1.0
PROJECT_ID=kubeflow
GCR_PROJECT=gcr.io/${PROJECT_ID}
DOCKERHUB_PROJECT=hub.docker.com/r/${PROJECT_ID}

define build
	docker build --pull -t $(1)/http-proxy:${VERSION} .
endef

all:
	$(call build,$(GCR_PROJECT))
	$(call build,$(DOCKERHUB_PROJECT))

build_gcr:
	$(call build,$(GCR_PROJECT))

build_dockerhub:
	$(call build,$(DOCKERHUB_PROJECT))

push_gcr: build_gcr
	gcloud docker -- push ${GCR_PROJECT}/http-proxy:${VERSION}

push_dockerhub: build_dockerhub
	docker push ${DOCKERHUB_PROJECT}/http-proxy:${VERSION}

push: build_gcr build_dockerhub push_gcr push_dockerhub

test:
	pip install -r requirements/test.txt && py.test

.PHONY: all build build_dockerhub build_gcr push push_dockerhub push_gcr
