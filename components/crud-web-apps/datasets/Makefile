# IMG ?= public.ecr.aws/j1r0q0g6/notebooks/datasets-web-app
# TAG ?= $(shell git describe --tags --always)
IMG ?= hub.kce.ksyun.com/dmetasoul/datasets-web-app
TAG ?= v0.0.1

docker-build:
	docker build -t ${IMG}:${TAG} -f Dockerfile ..

docker-push:
	docker push $(IMG):$(TAG)

image: docker-build docker-push
	@echo "Updated image ${IMG}"
