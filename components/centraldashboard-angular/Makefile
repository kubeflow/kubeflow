IMG ?= centraldashboard-angular
TAG ?= $(shell git describe --tags --always --dirty)
COMMIT = $(shell git rev-parse HEAD)

# To build without the cache set the environment variable
# export DOCKER_BUILD_OPTS=--no-cache
docker-build:
	docker build ${DOCKER_BUILD_OPTS} -t $(IMG):$(TAG) -f Dockerfile .. \
		--build-arg kubeflowversion=$(shell git describe --abbrev=0 --tags) \
		--build-arg commit=$(COMMIT) \
		--label=git-verions=$(TAG)

docker-push:
	docker push $(IMG):$(TAG)

image: docker-build docker-push

