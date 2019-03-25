# Image URL to use all building/pushing image targets
IMG ?= gcr.io/kubeflow-images-public/gcp-admission-webhook
TAG ?= $(eval TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6))$(TAG)
GOLANG_VERSION ?= 1.12

build:
	go build -gcflags 'all=-N -l' -o bin/webhook main.go

build-gcr:
	docker build -t $(IMG):$(TAG) .
	@echo Built $(IMG):$(TAG)

