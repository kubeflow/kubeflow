PROJECT           ?= kubeflow-dev
REGISTRY_PROJECT  ?= kubeflow-dev
GCLOUD_PROJECT    ?= kubeflow-images-public
IMG               ?= gcr.io/$(REGISTRY_PROJECT)/common
TAG               ?= $(eval TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6))$(TAG)
DOCKER_BUILD_OPTS ?= --network=host
GOLANG_VERSION    ?= 1.15.6
DOCKER_BUILD_ARGS ?= --build-arg GOLANG_VERSION=$(GOLANG_VERSION)

all: localbin

# Run go fmt against code
fmt:
	go fmt ./...

# Run go vet against code
vet:
	go vet ./...

# 
localbin: fmt vet
	go build ./reconcilehelper/util.go


