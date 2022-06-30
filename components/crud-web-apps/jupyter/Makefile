GIT_TAG ?= $(shell git describe --tags --always)
IMG ?= docker.io/kubeflownotebookswg/jupyter-web-app
DOCKERFILE ?= jupyter/Dockerfile

docker-build:
	cd ../ && docker build -t ${IMG}:${GIT_TAG} -f ${DOCKERFILE} .

docker-push:
	docker push $(IMG):$(GIT_TAG)

image: docker-build docker-push
