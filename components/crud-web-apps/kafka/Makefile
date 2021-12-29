GIT_TAG ?= $(shell git describe --tags --always)
IMG ?= docker.io/chepkoyallan/kafka-web-app
DOCKERFILE ?= Dockerfile

docker-build:
	docker build -t ${IMG}:${GIT_TAG} .

docker-push:
	docker push $(IMG):$(GIT_TAG)

image: docker-build docker-push
