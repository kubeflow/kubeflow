# TODO: move to kubeflow
IMAGE=jiez/openmpi-controller
TAG=0.0.3

default: build push

build:
	docker build --pull -t ${IMAGE}:${TAG} .

push:
	docker push ${IMAGE}:${TAG}

.PHONY: build push
