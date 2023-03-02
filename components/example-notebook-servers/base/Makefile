TAG ?= $(shell git describe --tags --always --dirty)
REGISTRY ?= kubeflownotebookswg

docker-build:
	docker build -t ${REGISTRY}/base:${TAG} -f Dockerfile .

docker-push:
	docker push ${REGISTRY}/base:${TAG}
