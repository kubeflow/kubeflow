# Project used with GCB
PROJECT ?= kubeflow-dev
# Registry where the image should be published
REGISTRY_PROJECT ?= kubeflow-dev
KUBEFLOWVERSION ?= 0.7.0

# IMG ?= gcr.io/$(REGISTRY_PROJECT)/centraldashboard
IMG ?= hub.kce.ksyun.com/dmetasoul/centraldashboard

# List any changed  files. We only include files in the notebooks directory.
# because that is the code in the docker image.
# In particular we exclude changes to the ksonnet configs.
CHANGED_FILES := $(shell git diff-files --relative=components/centraldashboard)

ifeq ($(strip $(CHANGED_FILES)),)
# Changed files is empty; not dirty
# Don't include --dirty because it could be dirty if files outside the ones we care
# about changed.
GIT_VERSION := $(shell git describe --tags --long)
else
GIT_VERSION := $(shell git describe --tags --long)-dirty-$(shell git diff | shasum -a256 | cut -c -6)
endif

COMMIT = $(shell git rev-parse HEAD)
DOCKERFILE ?= Dockerfile
ARCH ?= linux/amd64


all: build

clean:
	rm -rf coverage/ dist/ node_modules/ .nyc_output/

# Builds the package locally
build-local:
	npm install

# Runs unit tests with coverage
test: build-local
	npm run coverage

# To build without the cache set the environment variable
# export DOCKER_BUILD_OPTS=--no-cache
docker-build:
	docker build ${DOCKER_BUILD_OPTS} -t $(IMG):$(TAG) . \
	  --build-arg kubeflowversion=$(shell git describe --abbrev=0 --tags) \
	  --build-arg commit=$(COMMIT) \
      --label=git-version=$(TAG)
	@echo Built $(IMG):$(TAG)

docker-push:
	docker push $(IMG):$(TAG)

.PHONY: docker-build-multi-arch
docker-build-multi-arch: ##  Build multi-arch docker images with docker buildx
	docker buildx build --load --platform ${ARCH} --tag ${IMG}:${TAG} -f ${DOCKERFILE} . --build-arg kubeflowversion=$(shell git describe --abbrev=0 --tags) --build-arg commit=$(COMMIT) --label=git-version=$(TAG)


.PHONY: docker-build-push-multi-arch
docker-build-push-multi-arch: ## Build multi-arch docker images with docker buildx and push to docker registry
	docker buildx build --platform ${ARCH} --tag ${IMG}:${TAG} --push -f ${DOCKERFILE} . --build-arg kubeflowversion=$(shell git describe --abbrev=0 --tags) --build-arg commit=$(COMMIT) --label=git-version=$(TAG)

# Build but don't attach the latest tag. This allows manual testing/inspection of the image
# first.
push: build
	docker -- push $(IMG):$(TAG)
	@echo Pushed $(IMG) with  :$(TAG) tags

push-latest: push
	gcloud container images add-tag --quiet $(IMG):$(TAG) $(IMG):latest --verbosity=info
	echo created $(IMG):latest
