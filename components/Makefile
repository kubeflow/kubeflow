REGISTRY ?= kubeflownotebookswg
TAG ?= $(shell git describe --tags --always --dirty)

SUBDIRS := access-management admission-webhook centraldashboard crud-web-apps/jupyter crud-web-apps/tensorboards \
			crud-web-apps/volumes notebook-controller profile-controller tensorboard-controller example-notebook-servers

.PHONY: build-all
build-all: $(SUBDIRS)
	@echo "\nAll images of prv-kubeflow-kubeflow repo have been built successfully!\n"

.PHONY: $(SUBDIRS)
$(SUBDIRS):
	$(MAKE) docker-build -C $@ TAG=${TAG} REGISTRY=${REGISTRY}

.PHONY: push-all
push-all:
	for img in kfam poddefaults-webhook centraldashboard jupyter-web-app tensorboards-web-app volumes-web-app notebook-controller profile-controller \
	tensorboard-controller ; do \
		docker tag $$img:$(TAG) ${REGISTRY}/$$img:${TAG} ; \
		docker push ${REGISTRY}/$$img:${TAG} ; \
	done

	$(MAKE) docker-push -C example-notebook-servers TAG=${TAG} REGISTRY=${REGISTRY}

	@echo "\nAll images have been succesfully retaged and pushed with registry: ${REGISTRY} and tag: ${TAG}...\n"
