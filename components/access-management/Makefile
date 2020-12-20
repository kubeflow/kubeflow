PROJECT           ?= kubeflow-dev
REGISTRY_PROJECT  ?= kubeflow-dev
GCLOUD_PROJECT    ?= kubeflow-images-public
IMG               ?= gcr.io/$(GCLOUD_PROJECT)/kfam
TAG               ?= $(eval TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6))$(TAG)
DOCKER_BUILD_OPTS ?= --network=host
GOLANG_VERSION    ?= 1.15.6
DOCKER_BUILD_ARGS ?= --build-arg GOLANG_VERSION=$(GOLANG_VERSION)

CHANGED_FILES := $(shell git diff-files --relative=components/centraldashboard)

ifeq ($(strip $(CHANGED_FILES)),)
# Changed files is empty; not dirty
# Don't include --dirty because it could be dirty if files outside the ones we care
# about changed.
GIT_VERSION := $(shell git describe --tags --long)
else
GIT_VERSION := $(shell git describe --tags --long)-dirty-$(shell git diff | shasum -a256 | cut -c -6)
endif

all: localbin

# Run go fmt against code
fmt:
	go fmt ./...

# Run go vet against code
vet:
	go vet ./...

# Build local binary
localbin: fmt vet
	go build -o bin/access-management main.go

build:
	cd .. && docker build $(DOCKER_BUILD_OPTS) $(DOCKER_BUILD_ARGS) . -t $(IMG):$(TAG) -f ./access-management/Dockerfile

build-gcb:
	gcloud --project=$(PROJECT) \
		builds submit \
		--machine-type=n1-highcpu-32 \
		--substitutions=_GIT_VERSION=$(GIT_VERSION),_REGISTRY=$(REGISTRY_PROJECT) \
		--config=cloudbuild.yaml .

push: build
	docker push $(IMG):$(TAG)
