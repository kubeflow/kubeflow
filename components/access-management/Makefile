GCLOUD_PROJECT ?= kubeflow-images-public
GOLANG_VERSION ?= 1.12
IMG ?= gcr.io/$(GCLOUD_PROJECT)/kfam
TAG ?= $(eval TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6))$(TAG)

build:
	docker build -t $(IMG):$(TAG) .

push: build
	docker push $(IMG):$(TAG)
