IMG ?= volumes-web-app
TAG ?= $(shell git describe --tags --always --dirty)

docker-build:
	docker build -t ${IMG}:${TAG} -f Dockerfile ..

docker-push:
	docker push $(IMG):$(TAG)

image: docker-build docker-push
	@echo "Updated image ${IMG}:${TAG}"
