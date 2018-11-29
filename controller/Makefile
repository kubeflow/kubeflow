#
# Builds locally and docker
#
GCLOUD_PROJECT ?= kubeflow-images-public
GOLANG_VERSION ?= 1.11.2
GOPATH ?= $(HOME)/go
# To build without the cache set the environment variable
# export DOCKER_BUILD_OPTS=--no-cache
# set to GOLANG_GCFLAGS=-gcflags "all=-N -l" to debug
GOLANG_GCFLAGS ?= ""
IMG ?= gcr.io/$(GCLOUD_PROJECT)/kubeflow-controller
TAG ?= $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6)
PORT ?= 2345

all: build

# Run tests
test: generate fmt vet manifests
	GO111MODULE=on go test ./pkg/... ./cmd/... -coverprofile cover.out

# Build manager binary
manager: generate fmt vet
	GO111MODULE=on go build -a -o bin/manager github.com/kubeflow/kubeflow/controller/cmd/manager

# Run against the configured Kubernetes cluster in ~/.kube/config
run: generate fmt vet
	GO111MODULE=on go run ./cmd/manager/main.go

# Install CRDs into a cluster
install: manifests
	kubectl apply -f config/crds

# Deploy controller in the configured Kubernetes cluster in ~/.kube/config
deploy: manifests
	kubectl apply -f config/crds
	kustomize build config/default | kubectl apply -f -

$(GOPATH)/bin/controller-gen:
	GO111MODULE=on go get -u sigs.k8s.io/controller-tools/cmd/controller-gen@v0.1.6

$(GOPATH)/bin/client-gen:
	GO111MODULE=on go get -u k8s.io/code-generator/cmd/client-gen@v0.0.0-20181116211957-405721ab9678

# Generate manifests e.g. CRD, RBAC etc.
manifests: $(GOPATH)/bin/controller-gen $(GOPATH)/bin/client-gen
	controller-gen all

# Run go fmt against code
fmt:
	go fmt ./pkg/... ./cmd/...

# Run go vet against code
vet:
	go vet ./pkg/... ./cmd/...

# Generate code
generate:
	go generate ./pkg/... ./cmd/...

build-local: generate fmt vet
	GO111MODULE=on go build -gcflags 'all=-N -l' -o bin/manager cmd/manager/main.go

build: build-local
	docker build -t $(IMG):$(TAG) --build-arg GOLANG_VERSION=$(GOLANG_VERSION) --target=builder .
	@echo "updating kustomize image patch file for manager resource"

push:
	gcloud docker -- push $(IMG):$(TAG)
	@echo Pushed $(IMG):$(TAG)

push-latest:
	gcloud container images add-tag --quiet $(IMG):$(TAG) $(IMG):latest --verbosity=info
	@echo created $(IMG):latest

debug:
	@echo debugging $(IMG):$(TAG) using port $(PORT)
	@./debug.sh $(IMG) $(TAG) $(PORT)

debug-latest:
	@echo debugging $(IMG):latest using port $(PORT)
	@./debug.sh $(IMG) latest $(PORT)

cleanup:
	@echo Removing kubeflow-admin namespace
	@kubectl delete ns kubeflow-admin
