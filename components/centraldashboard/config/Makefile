IMG = gcr.io/kubeflow-images-public/centraldashboard

TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6)

all: build

# To build without the cache set the environment variable
# export DOCKER_BUILD_OPTS=--no-cache
build:
	docker build ${DOCKER_BUILD_OPTS} -t $(IMG):$(TAG) . --build-arg kubeflowversion=$(shell git describe --abbrev=0 --tags)
	docker tag $(IMG):$(TAG) $(IMG):latest
	@echo Built $(IMG):latest
	@echo Built $(IMG):$(TAG)


# Build but don't attach the latest tag. This allows manual testing/inspection of the image
# first.
push: build
	gcloud docker -- push $(IMG):$(TAG)
	@echo Pushed $(IMG) with  :$(TAG) tags

push-latest: push
	gcloud container images add-tag --quiet $(IMG):$(TAG) $(IMG):latest --verbosity=info
	echo created $(IMG):latest