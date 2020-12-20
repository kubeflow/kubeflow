PROJECT           ?= kubeflow-dev
REGISTRY_PROJECT  ?= kubeflow-dev
GCLOUD_PROJECT    ?= kubeflow-images-public
IMG               ?= gcr.io/$(GCLOUD_PROJECT)/notebook-controller
TAG               ?= $(eval TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6))$(TAG)
DOCKER_BUILD_OPTS ?= --network=host
GOLANG_VERSION    ?= 1.15.6
DOCKER_BUILD_ARGS ?= --build-arg GOLANG_VERSION=$(GOLANG_VERSION)
 
SHELL             := /bin/bash
USE_IMAGE_CACHE   ?= true
CRD_OPTIONS       ?= "crd"
BINDIR            := bin
TOOLS_DIR         := tools
TOOLS_BIN_DIR     := $(TOOLS_DIR)/bin
CONTROLLER_GEN    := $(TOOLS_BIN_DIR)/controller-gen

# Based on recommendation https://sdk.operatorframework.io/docs/building-operators/golang/references/envtest-setup/
ENVTEST_ASSETS_DIR=$(shell pwd)/testbin

all: localbin

# check license
check-license:
	./third_party/check-license.sh

# Run tests
test: generate fmt vet manifests
	mkdir -p ${ENVTEST_ASSETS_DIR}
	test -f ${ENVTEST_ASSETS_DIR}/setup-envtest.sh || curl -sSLo ${ENVTEST_ASSETS_DIR}/setup-envtest.sh https://raw.githubusercontent.com/kubernetes-sigs/controller-runtime/a9bd9117a77a2f84bbc546e28991136fe0000dc0/hack/setup-envtest.sh
	source ${ENVTEST_ASSETS_DIR}/setup-envtest.sh; fetch_envtest_tools $(ENVTEST_ASSETS_DIR); setup_envtest_env $(ENVTEST_ASSETS_DIR);
	go test ./api/... ./controllers/... -coverprofile cover.out

# Build local binary
localbin: generate fmt vet
	go build -o bin/manager main.go

# Run against the configured Kubernetes cluster in ~/.kube/config
run: generate fmt vet
	go run ./main.go

# Install CRDs into a cluster
install: manifests
	kubectl apply -f config/crd/bases

# Deploy controller in the configured Kubernetes cluster in ~/.kube/config
deploy: manifests
	kubectl apply -f config/crd/bases
	kustomize build config/default | kubectl apply -f -

# Generate manifests e.g. CRD, RBAC etc.
manifests: $(CONTROLLER_GEN)
	$(CONTROLLER_GEN) $(CRD_OPTIONS) rbac:roleName=manager-role webhook paths="./..." output:crd:artifacts:config=config/crd/bases

# Run go fmt against code
fmt:
	go fmt ./...

# Run go vet against code
vet:
	go vet ./...

# Generate code
generate: $(CONTROLLER_GEN)
	$(CONTROLLER_GEN) object:headerFile=./hack/boilerplate.go.txt paths=./api/...

# Build the docker image
build:
	cd .. && docker build $(DOCKER_BUILD_OPTS) $(DOCKER_BUILD_ARGS) . -t $(IMG):$(TAG) -f ./notebook-controller/Dockerfile
	@echo "updating kustomize image patch file for manager resource"
	sed -i'' -e 's@image: .*@image: '"${IMG}:${TAG}"'@' ./config/default/manager_image_patch.yaml

# Push the docker image
push:
	docker push ${IMG}

# TODO(jlewi): Can we get rid of this and just use skaffold?
build-gcr: test
	docker build $(DOCKER_BUILD_OPTS) -t $(IMG):$(TAG) .
	@echo Built $(IMG):$(TAG)

push-gcr: build-gcr
	docker push $(IMG):$(TAG)
	@echo Pushed $(IMG):$(TAG)

## --------------------------------------
## Tooling Binaries
## --------------------------------------

$(CONTROLLER_GEN): $(TOOLS_DIR)/go.mod # Build controller-gen from tools folder.
	cd $(TOOLS_DIR); go build -tags=tools -o $(BINDIR)/controller-gen sigs.k8s.io/controller-tools/cmd/controller-gen
