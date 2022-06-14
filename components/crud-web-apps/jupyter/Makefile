IMG ?= jupyter-web-app
TAG ?= $(shell git describe --tags --always --dirty)
DOCKERFILE ?= jupyter/Dockerfile


docker-build:
	cd ../ && docker build -t ${IMG}:${TAG} -f ${DOCKERFILE} .

docker-build-registry:
	cd ../ && docker build -t ${REGISTRY}/${IMG}:${TAG} -f ${DOCKERFILE} .

docker-push:
	docker push $(IMG):$(TAG)

image: docker-build docker-push
