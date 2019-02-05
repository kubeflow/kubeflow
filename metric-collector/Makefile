IMG = gcr.io/kubeflow-images-public/metric-collector

TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6)

CHANGED_FILES := $(shell git diff-files)

ifeq ($(strip $(CHANGED_FILES)),)
# Changed files is empty; not dirty
# Don't include --dirty because it could be dirty if files outside the ones we care
# about changed.
TAG := $(shell date +v%Y%m%d)-$(shell git describe --always)
else
TAG := $(shell date +v%Y%m%d)-$(shell git describe --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6)
endif

all: build

# To edit which registries to add to bootstrapper, edit config (eg. config/default.yaml)
build:
	docker build --pull -t $(IMG):$(TAG) .
	@echo Built $(IMG):$(TAG)

# Build but don't attach the latest tag. This allows manual testing/inspection of the image
# first.
push: build
	gcloud docker -- push $(IMG):$(TAG)
	@echo Pushed $(IMG) with  :$(TAG) tags

push-latest: push
	gcloud container images add-tag --quiet $(IMG):$(TAG) $(IMG):latest --verbosity=info
	echo created $(IMG):latest
