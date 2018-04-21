# TODO: move to kubeflow
IMAGE=jiez/openmpi-controller
TAG=latest

build:
	docker build --pull -t ${IMAGE}:${TAG} .

push: build
	docker push ${IMAGE}:${TAG}

.PHONY: build push
