GIT_TAG ?= $(shell git describe --tags --always)
IMG ?= docker.io/kubeflownotebookswg/tensorboards-web-app
DOCKERFILE=tensorboards/Dockerfile

docker-build:
	cd ../ && docker build -t ${IMG}:${GIT_TAG} -f ${DOCKERFILE} .

docker-push:
	docker push $(IMG):$(GIT_TAG)

image: docker-build docker-push
