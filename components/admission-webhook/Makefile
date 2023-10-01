# Image URL to use all building/pushing image targets
IMG ?= poddefaults-webhook
TAG ?= $(shell git describe --tags --always --dirty)
ARCH ?= linux/amd64
# Get the currently used golang install path (in GOPATH/bin, unless GOBIN is set)
ifeq (,$(shell go env GOBIN))
GOBIN=$(shell go env GOPATH)/bin
else
GOBIN=$(shell go env GOBIN)
endif

generate: controller-gen
	$(CONTROLLER_GEN) object:headerFile="hack/boilerplate.go.txt" paths="./..."

manifests: controller-gen
	$(CONTROLLER_GEN) crd:crdVersions=v1,maxDescLen=0 output:crd:artifacts:config=manifests/base paths="./..."
	mv manifests/base/kubeflow.org_poddefaults.yaml manifests/base/crd.yaml

test:
	go test -coverprofile cover.out

build:
	go build -gcflags 'all=-N -l' -o bin/webhook .

docker-build:
	docker build -t ${IMG}:${TAG} -f Dockerfile .

docker-push:
	docker push ${IMG}:${TAG}

.PHONY: docker-build-multi-arch
docker-build-multi-arch: ##  Build multi-arch docker images with docker buildx
	docker buildx build --load --platform ${ARCH} --tag ${IMG}:${TAG} .

.PHONY: docker-build-push-multi-arch
docker-build-push-multi-arch: ## Build multi-arch docker images with docker buildx and push to docker registry 
	docker buildx build --platform ${ARCH} --tag ${IMG}:${TAG} --push .

image: docker-build docker-push

CONTROLLER_GEN = $(shell pwd)/bin/controller-gen
.PHONY: controller-gen
controller-gen: ## Download controller-gen locally if necessary.
	$(call go-get-tool,$(CONTROLLER_GEN),sigs.k8s.io/controller-tools/cmd/controller-gen@v0.8.0)

# go-get-tool will 'go get' any package $2 and install it to $1.
PROJECT_DIR := $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))
define go-get-tool
@[ -f $(1) ] || { \
set -e ;\
echo "Downloading $(2)" ;\
GOBIN=$(PROJECT_DIR)/bin go install $(2) ;\
}
endef
