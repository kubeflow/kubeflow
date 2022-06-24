REGISTRY_PROJECT ?= kubeflow-dev
GOLANG_VERSION ?= 1.12
GCLOUD_PROJECT ?= kubeflow-images-public
IMG ?= gcr.io/$(GCLOUD_PROJECT)/kfam
PROJECT ?= kubeflow-dev
TAG ?= $(eval TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6))$(TAG)

CHANGED_FILES := $(shell git diff-files --relative=components/centraldashboard)

ifeq ($(strip $(CHANGED_FILES)),)
# Changed files is empty; not dirty
# Don't include --dirty because it could be dirty if files outside the ones we care
# about changed.
GIT_VERSION := $(shell git describe --tags --long)
else
GIT_VERSION := $(shell git describe --tags --long)-dirty-$(shell git diff | shasum -a256 | cut -c -6)
endif

build:
	docker build -t $(IMG):$(TAG) .

build-gcb:
	gcloud --project=$(PROJECT) \
		builds submit \
		--machine-type=n1-highcpu-32 \
		--substitutions=_GIT_VERSION=$(GIT_VERSION),_REGISTRY=$(REGISTRY_PROJECT) \
		--config=cloudbuild.yaml .

push: build
	docker push $(IMG):$(TAG)

UNIX_TS ?= $(shell date +%s)
GIT_TAG ?= $(shell git describe --tags --always)
DOCKERFILE ?= Dockerfile
HARBOR_IMG ?= harbor.cloud.aurora.tech/library/kfam
harbor-build:
	cd ../ &&

harbor-push:
	docker push $(HARBOR_IMG):$(GIT_TAG)-$(UNIX_TS)

harbor-image:
	docker build -t ${HARBOR_IMG}:${GIT_TAG}-$(UNIX_TS) -f ${DOCKERFILE} .
	docker push $(HARBOR_IMG):$(GIT_TAG)-$(UNIX_TS)