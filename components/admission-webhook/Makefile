# Image URL to use all building/pushing image targets
IMG ?= admission-webhook
TAG ?= $(shell git describe --tags --always --dirty)

build:
	go build -gcflags 'all=-N -l' -o bin/webhook .

docker-build:
	docker build -t ${IMG}:${TAG} -f Dockerfile .

docker-push: 
	docker push ${IMG}:${TAG}

image: docker-build docker-push

build-gcr:
	docker build -t $(IMG):$(TAG) .
	@echo Built $(IMG):$(TAG)

docker-push:
	docker push ${IMG}:${TAG}