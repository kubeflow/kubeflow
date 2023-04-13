IMG ?= volumes-web-app
TAG ?= $(shell git describe --tags --always --dirty)
ARCH ?= linux/amd64

docker-build:
	docker build -t ${IMG}:${TAG} -f Dockerfile ..

docker-push:
	docker push $(IMG):$(TAG)


.PHONY: docker-build-multi-arch
docker-build-multi-arch: ##  Build multi-arch docker images with docker buildx
	docker buildx build --load --platform ${ARCH} --tag ${IMG}:${TAG} -f Dockerfile ..

.PHONY: docker-build-push-multi-arch
docker-build-push-multi-arch: ## Build multi-arch docker images with docker buildx and push to docker registry 
	docker buildx build --platform ${ARCH} --tag ${IMG}:${TAG} --push -f Dockerfile ..

image: docker-build docker-push
	@echo "Updated image ${IMG}:${TAG}"
