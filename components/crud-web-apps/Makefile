GIT_TAG ?= $(shell git describe --tags --always)
IMG ?= docker.io/chepkoyallan/kafka-web-app
DOCKERFILE ?= Dockerfile

docker-build:
	docker build -t ${IMG}:${GIT_TAG} --no-cache -f ${DOCKERFILE} .

docker-push:
	docker push $(IMG):$(GIT_TAG)

image: docker-build docker-push
