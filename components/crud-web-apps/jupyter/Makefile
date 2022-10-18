IMG ?= jupyter-web-app
TAG ?= $(shell git describe --tags --always --dirty)
DOCKERFILE ?= jupyter/Dockerfile
UNIX_TS ?= $(shell date +%s)


docker-build:
	cd ../ && docker build -t ${IMG}:${TAG} -f ${DOCKERFILE} .

docker-push:
	docker push $(IMG):$(TAG)

image: docker-build docker-push


HARBOR_IMG ?= harbor.cloud.aurora.tech/library/notebooks/jupyter-web-app
harbor-build:
	cd ../ &&

harbor-push:
	docker push $(HARBOR_IMG):$(GIT_TAG)-$(UNIX_TS)

harbor-image:
	cd ../ && docker build -t ${HARBOR_IMG}:${GIT_TAG}-$(UNIX_TS) -f ${DOCKERFILE} .
	docker push $(HARBOR_IMG):$(GIT_TAG)-$(UNIX_TS)
