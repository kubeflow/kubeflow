IMG ?= docker.io/kubeflownotebookswg/volumes-web-app
TAG ?= $(shell git describe --tags --always)

docker-build:
	docker build -t ${IMG}:${TAG} -f Dockerfile ..

docker-push:
	docker push $(IMG):$(TAG)

image: docker-build docker-push
	@echo "Updated image ${IMG}"
