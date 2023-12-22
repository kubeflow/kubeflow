#
# This partial Makefile contains common targets for building and pushing docker images.
#
# It expects the following variables to be set:
#  - REGISTRY:           the container registry to push to
#  - TAG:                the primary tag to use
#  - IMAGE_NAME:         name of the image to build
#  - BASE_IMAGE:         the base image to use
#  - BASE_IMAGE_FOLDERS: the folders containing the base images (whitespace separated)
#  - ARCH:               the buildkit platforms to build for
#  - CACHE_IMAGE:        an image to use as a registry-type cache
#  - CACHE_TAG:          the tag to use for the cache image
#

ALSO_TAG_LATEST  ?= 0
ALSO_TAG_VERSION ?=

# compute image ref
IMAGE_REF := $(REGISTRY)/$(IMAGE_NAME)

# compute tag args
IMAGE_TAGS := $(TAG)
ifeq ($(ALSO_TAG_LATEST),1)
	IMAGE_TAGS += latest
endif
ifneq ($(ALSO_TAG_VERSION),)
	IMAGE_TAGS += $(ALSO_TAG_VERSION)
endif
TAG_ARGS  := $(foreach tag_val,$(IMAGE_TAGS),--tag "$(IMAGE_REF):$(tag_val)")
TAG_NAMES := $(foreach tag_val,$(IMAGE_TAGS),"$(IMAGE_REF):$(tag_val)")

# compute cache args
CACHE_FROM := type=registry,ref=$(CACHE_IMAGE):$(CACHE_TAG)
CACHE_TO := type=registry,ref=$(CACHE_IMAGE):$(CACHE_TAG),mode=max

# ------------------------------------------------------------------------------
#  docker-build
# ------------------------------------------------------------------------------

# build images in this folder
.PHONY: docker-build
docker-build:
	@echo "\n\n"
	@echo "------------------------------------------------------------------------------"
	@echo "Building '$(IMAGE_NAME)' image..."
	@echo "------------------------------------------------------------------------------"
	@echo ""
	docker build --build-arg BASE_IMG=$(BASE_IMAGE) --progress=plain $(TAG_ARGS) -f Dockerfile .

# build base images as well
.PHONY: docker-build-dep
docker-build-dep: $(addprefix docker-build-dep--, $(BASE_IMAGE_FOLDERS)) docker-build
docker-build-dep--%:
	$(MAKE) docker-build-dep -C ../$*

# ------------------------------------------------------------------------------
#  docker-push
# ------------------------------------------------------------------------------

# push images in this folder
.PHONY: docker-push
docker-push:
	@echo "\n\n"
	@echo "------------------------------------------------------------------------------"
	@echo "Pushing '$(IMAGE_NAME)' image..."
	@echo "------------------------------------------------------------------------------"
	@echo ""
	docker push $(TAG_NAMES)

# push base images as well
.PHONY: docker-push-dep
docker-push-dep: $(addprefix docker-push-dep--, $(BASE_IMAGE_FOLDERS)) docker-push
docker-push-dep--%:
	$(MAKE) docker-push-dep -C ../$*

# ------------------------------------------------------------------------------
#  docker-build-multi-arch
# ------------------------------------------------------------------------------

# multi-arch build images in this folder
.PHONY: docker-build-multi-arch
docker-build-multi-arch:
	@echo "\n\n"
	@echo "------------------------------------------------------------------------------"
	@echo "Building '$(IMAGE_NAME)' image for '$(ARCH)'..."
	@echo "------------------------------------------------------------------------------"
	@echo ""
	docker buildx build --load --platform $(ARCH) --build-arg BASE_IMG=$(BASE_IMAGE) --progress=plain --cache-from $(CACHE_FROM) $(TAG_ARGS) -f Dockerfile .

# multi-arch build base images as well
.PHONY: docker-build-multi-arch-dep
docker-build-multi-arch-dep: $(addprefix docker-build-multi-arch-dep--, $(BASE_IMAGE_FOLDERS)) docker-build-multi-arch
docker-build-multi-arch-dep--%:
	$(MAKE) docker-build-multi-arch-dep -C ../$*

# ------------------------------------------------------------------------------
#  docker-build-push-multi-arch
# ------------------------------------------------------------------------------

# multi-arch build AND push images in this folder
.PHONY: docker-build-push-multi-arch
docker-build-push-multi-arch:
	@echo "\n\n"
	@echo "------------------------------------------------------------------------------"
	@echo "Building AND Pushing '$(IMAGE_NAME)' image for '$(ARCH)'..."
	@echo "------------------------------------------------------------------------------"
	@echo ""
	docker buildx build --push --platform $(ARCH) --build-arg BASE_IMG=$(BASE_IMAGE) --progress=plain --cache-from $(CACHE_FROM) --cache-to $(CACHE_TO) $(TAG_ARGS) -f Dockerfile .

# multi-arch build AND push base images as well
.PHONY: docker-build-push-multi-arch-dep
docker-build-push-multi-arch-dep: $(addprefix docker-build-push-multi-arch-dep--, $(BASE_IMAGE_FOLDERS)) docker-build-push-multi-arch
docker-build-push-multi-arch-dep--%:
	$(MAKE) docker-build-push-multi-arch-dep -C ../$*
