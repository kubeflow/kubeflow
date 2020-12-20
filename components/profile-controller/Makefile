PROJECT           ?= kubeflow-dev
REGISTRY_PROJECT  ?= kubeflow-dev
GCLOUD_PROJECT    ?= kubeflow-images-public
IMG               ?= gcr.io/$(GCLOUD_PROJECT)/profile-controller
TAG               ?= $(eval TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6))$(TAG)
DOCKER_BUILD_OPTS ?= --network=host
GOLANG_VERSION    ?= 1.15.6
DOCKER_BUILD_ARGS ?= --build-arg GOLANG_VERSION=$(GOLANG_VERSION)

SHELL             := /bin/bash
USE_IMAGE_CACHE   ?= true
CRD_OPTIONS       ?= "crd:trivialVersions=true"
BINDIR            := bin
TOOLS_DIR         := tools
TOOLS_BIN_DIR     := $(TOOLS_DIR)/bin
CONTROLLER_GEN    := $(TOOLS_BIN_DIR)/controller-gen

all: localbin

# Run tests
test: generate fmt vet
	go test ./... -coverprofile cover.out

# Build local binary
localbin: generate fmt vet
	go build -o bin/manager main.go

# Run against the configured Kubernetes cluster in ~/.kube/config
run: generate fmt vet
	go run ./main.go

# Install CRDs into a cluster
install:
	kustomize build config/crd | kubectl apply -f -

# Deploy controller in the configured Kubernetes cluster in ~/.kube/config
deploy: manifests
	cd config/manager && kustomize edit set image controller=${IMG}
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
	$(CONTROLLER_GEN) object:headerFile=./hack/boilerplate.go.txt paths="./..."

# Build the docker image
build:
	docker build $(DOCKER_BUILD_OPTS) $(DOCKER_BUILD_ARGS) -t ${IMG}:${TAG} .
	@echo Built ${IMG}:${TAG}

build-gcb:
	gcloud --project=$(PROJECT) \
		builds submit \
		--machine-type=n1-highcpu-32 \
		--substitutions=_TAG=$(TAG),_REGISTRY=$(PROJECT) \
		--config=cloudbuild.yaml .

# Push the docker image
push: build
	docker push ${IMG}:${TAG}
	@echo Pushed ${IMG}:${TAG}

## --------------------------------------
## Tooling Binaries
## --------------------------------------

$(CONTROLLER_GEN): $(TOOLS_DIR)/go.mod # Build controller-gen from tools folder.
	cd $(TOOLS_DIR); go build -tags=tools -o $(BINDIR)/controller-gen sigs.k8s.io/controller-tools/cmd/controller-gen
