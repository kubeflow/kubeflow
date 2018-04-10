# Copyright 2017 The kubecfg authors
#
#
#    Licensed under the Apache License, Version 2.0 (the "License");
#    you may not use this file except in compliance with the License.
#    You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.

VERSION?=dev-$(shell date +%FT%T%z)
KS_BIN?=ks

APIMACHINERY_VER := $(shell dep status | grep k8s.io/apimachinery | awk '{print $$3}')
REVISION=$(shell git rev-parse HEAD)

GO = go
EXTRA_GO_FLAGS =
GO_FLAGS = -ldflags="-X main.version=$(VERSION) -X main.apimachineryVersion=$(APIMACHINERY_VER) -X generator.revision=$(REVISION) $(GO_LDFLAGS) " $(EXTRA_GO_FLAGS)
GOFMT = gofmt
# GINKGO = "go test" also works if you want to avoid ginkgo tool
GINKGO = ginkgo

KCFG_TEST_FILE = lib/kubecfg_test.jsonnet
GUESTBOOK_FILE = examples/guestbook.jsonnet
DOC_GEN_FILE = ./docs/generate/update-generated-docs.sh
DOC_TEST_FILE = ./docs/generate/verify-generated-docs.sh
JSONNET_FILES = $(KCFG_TEST_FILE) $(GUESTBOOK_FILE)
GO_PACKAGES = ./...

# Default cluster from this config is used for integration tests
KUBECONFIG = $(HOME)/.kube/config
INTEGRATION_TEST_FIXTURES = ./fixtures

all: ks docs

ks:
	$(GO) build -o $(KS_BIN) $(GO_FLAGS) .

docs:
	$(DOC_GEN_FILE)

install:
	$(GO) build -o $(GOPATH)/bin/ks $(GO_FLAGS) .

test: gotest docstest

gotest:
	$(GO) test $(GO_FLAGS) $(GO_PACKAGES)

docstest:
	$(DOC_TEST_FILE)

integrationtest: ks
	$(GINKGO) -tags 'integration' integration -- -fixtures $(INTEGRATION_TEST_FIXTURES) -kubeconfig $(KUBECONFIG) -ksonnet-bin $(abspath $<)

vet:
	$(GO) vet $(GO_PACKAGES)

fmt:
	$(GOFMT) -s -w $(shell $(GO) list -f '{{.Dir}}' $(GO_PACKAGES))

clean:
	$(RM) ./ks ./docs/cli-reference/ks*.md

.PHONY: all test clean vet fmt docs
.PHONY: ks
