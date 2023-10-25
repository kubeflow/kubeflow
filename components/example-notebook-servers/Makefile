# NOTE: the images must be listed in the required build order
IMAGE_FOLDERS ?= \
	base \
	codeserver \
	codeserver-python \
	jupyter \
	jupyter-scipy \
	jupyter-pytorch \
	jupyter-pytorch-full \
	jupyter-pytorch-cuda \
	jupyter-pytorch-cuda-full \
	jupyter-tensorflow \
	jupyter-tensorflow-full \
	jupyter-tensorflow-cuda \
	jupyter-tensorflow-cuda-full \
	rstudio \
	rstudio-tidyverse \

# ------------------------------------------------------------------------------
#  docker-build | build all images
#
.PHONY: docker-build
docker-build: $(addprefix docker-build--, $(IMAGE_FOLDERS))
docker-build--%:
	$(MAKE) docker-build -C $*

# ------------------------------------------------------------------------------
#  docker-push | push all images
#
.PHONY: docker-push
docker-push: $(addprefix docker-push--, $(IMAGE_FOLDERS))
docker-push--%:
	$(MAKE) docker-push -C $*

# ------------------------------------------------------------------------------
#  docker-build-multi-arch | multi-arch build all images
#
.PHONY: docker-build-multi-arch
docker-build-multi-arch: $(addprefix docker-build-multi-arch--, $(IMAGE_FOLDERS))
docker-build-multi-arch--%:
	$(MAKE) docker-build-multi-arch -C $*

# ------------------------------------------------------------------------------
#  docker-build-push-multi-arch | multi-arch build AND push all images
#
.PHONY: docker-build-push-multi-arch
docker-build-push-multi-arch: $(addprefix docker-build-push-multi-arch--, $(IMAGE_FOLDERS))
docker-build-push-multi-arch--%:
	$(MAKE) docker-build-push-multi-arch -C $*
