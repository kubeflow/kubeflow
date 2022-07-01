TAG ?= $(shell git describe --tags --always --dirty)
IMG ?= tensorboards-web-app
DOCKERFILE ?= tensorboards/Dockerfile

docker-build:
	cd ../ && docker build -t ${IMG}:${TAG} -f ${DOCKERFILE} .

docker-push:
	docker push $(IMG):$(TAG)

image: docker-build docker-push
