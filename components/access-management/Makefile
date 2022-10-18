REGISTRY_PROJECT ?= kubeflow-dev
PROJECT ?= kubeflow-dev
GO_SWAGGER_URL ?= https://github.com/go-swagger/go-swagger/releases/download/v0.21.0/swagger_linux_amd64

GIT_VERSION := $(shell git describe --tags --always --dirty)

IMG ?= kfam
TAG ?= $(GIT_VERSION)

generate-go-client: bin/swagger
	bin/swagger generate client -f api/swagger.yaml -t api/go_client

bin/swagger:
	mkdir -p bin
	wget -O bin/swagger '$(GO_SWAGGER_URL)'
	chmod +x bin/swagger

docker-build:
	docker build -t $(IMG):$(TAG) .

docker-push: 
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

image: docker-build docker-push 
