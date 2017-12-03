VERSION=1.0
PROJECT_ID=kubeflow
PROJECT=gcr.io/${PROJECT_ID}

all: build

build:
	docker build --pull -t ${PROJECT}/model-server:${VERSION} .

push: build
	gcloud docker -- push ${PROJECT}/model-server:${VERSION}

.PHONY: all build push

