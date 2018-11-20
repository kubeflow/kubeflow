IMG = gcr.io/kubeflow-images-public/centraldashboard

# List any changed  files. We only include files in the notebooks directory.
# because that is the code in the docker image.
# In particular we exclude changes to the ksonnet configs.
CHANGED_FILES := $(shell git diff-files --relative=components/centraldashboard)

ifeq ($(strip $(CHANGED_FILES)),)
# Changed files is empty; not dirty
# Don't include --dirty because it could be dirty if files outside the ones we care
# about changed.
GIT_VERSION := $(shell git describe --always)
else
GIT_VERSION := $(shell git describe --always)-dirty-$(shell git diff | shasum -a256 | cut -c -6)
endif

TAG := $(shell date +v%Y%m%d)-$(GIT_VERSION)
all: build

# To build without the cache set the environment variable
# export DOCKER_BUILD_OPTS=--no-cache
compile:
	cp Dockerfile.build Dockerfile.build.fin
	sed -i 's/ARCH/'$(ARCH)'/g' Dockerfile.build.fin
	docker build ${DOCKER_BUILD_OPTS} -t $(IMG)-$(ARCH)-builder:$(TAG) \
	  --build-arg kubeflowversion=$(shell git describe --abbrev=0 --tags) \
      --label=git-verions=$(GIT_VERSION) -f Dockerfile.build.fin .
	docker run --rm -v $(shell pwd):/data $(IMG)-$(ARCH)-builder:$(TAG) cp /go/src/github.com/kubeflow/kubeflow/components/centraldashboard/centraldashboard-$(ARCH) /data
	@echo Built and copied to current directory

build: compile
	cp Dockerfile Dockerfile.fin
	sed -i 's/ARCH/'$(ARCH)'/g' Dockerfile.fin
	docker build ${DOCKER_BUILD_OPTS} -t $(IMG)-$(ARCH):$(TAG) \
	  --build-arg kubeflowversion=$(shell git describe --abbrev=0 --tags) \
	  --label=git-verions=$(GIT_VERSION)  -f Dockerfile.fin .
ifeq ($(ARCH), amd64)
	docker tag $(IMG)-$(ARCH):$(TAG) $(IMG):$(TAG)
endif

# Build but don't attach the latest tag. This allows manual testing/inspection of the image
# first.
push: build
	gcloud docker -- push $(IMG)-$(ARCH):$(TAG)
ifeq ($(ARCH), amd64)
	gcloud docker -- push $(IMG):$(TAG)
endif
	@echo Pushed $(IMG)-$(ARCH) with  :$(TAG) tags

push-latest: push
	gcloud container images add-tag --quiet $(IMG)-$(ARCH):$(TAG) $(IMG)-$(ARCH):latest --verbosity=info
ifeq ($(ARCH), amd64)
	gcloud container images add-tag --quiet $(IMG):$(TAG) $(IMG):latest --verbosity=info
endif
	echo created $(IMG)-$(ARCH):latest
