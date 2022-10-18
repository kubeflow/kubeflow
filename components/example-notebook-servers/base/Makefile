TAG ?= $(shell git describe --tags --always --dirty)

docker-build:
	docker build -t base:${TAG} -f Dockerfile .

docker-push:
	docker push base:${TAG}