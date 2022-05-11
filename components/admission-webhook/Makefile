# Image URL to use all building/pushing image targets
IMG ?= gcr.io/kubeflow-images-public/admission-webhook
TAG ?= $(shell git describe --tags --always)
GOLANG_VERSION ?= 1.12

build:
	go build -gcflags 'all=-N -l' -o bin/webhook .

docker-build:
	docker build -t $(IMG):$(TAG) .
	@echo Built $(IMG):$(TAG)

docker-push:
	docker push ${IMG}:${TAG}