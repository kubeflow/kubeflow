# GIT_TAG ?= $(shell git describe --tags --always)
GIT_TAG ?= v1.5.0
# IMG ?= public.ecr.aws/j1r0q0g6/notebooks/jupyter-web-app
IMG ?= swr.cn-southwest-2.myhuaweicloud.com/dmetasoul-public/jupyter-web-app
DOCKERFILE ?= jupyter/Dockerfile
ARCH ?= linux/amd64


docker-build:
	cd ../ && docker build -t ${IMG}:${TAG} -f ${DOCKERFILE} .

docker-push:
	docker push $(IMG):$(TAG)

.PHONY: docker-build-multi-arch
docker-build-multi-arch: ##  Build multi-arch docker images with docker buildx
	cd ../ && docker buildx build --load --platform ${ARCH} --tag ${IMG}:${TAG} -f ${DOCKERFILE} .


.PHONY: docker-build-push-multi-arch
docker-build-push-multi-arch: ## Build multi-arch docker images with docker buildx and push to docker registry 
	cd ../ && docker buildx build --platform ${ARCH} --tag ${IMG}:${TAG} --push -f ${DOCKERFILE} .

image: docker-build docker-push