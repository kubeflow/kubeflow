REGISTRY ?= kubeflownotebookswg
TAG ?= $(shell git describe --tags --always --dirty)

build-all:
	@echo "\nBuilding KFAM image...\n"
	make docker-build -C access-management 

	@echo "\nBuilding Admission-webhook image...\n"
	make docker-build -C admission-webhook

	@echo "\nBuilding Centraldashboard image...\n"
	make docker-build -C centraldashboard

	@echo "\nBuilding Jupyter-Web-App image...\n"
	make docker-build -C crud-web-apps/jupyter

	@echo "\nBuilding Tensorboard-Web-App image...\n"
	make docker-build -C crud-web-apps/tensorboards

	@echo "\nBuilding Volumes-Web-App image...\n"
	make docker-build -C crud-web-apps/volumes

	@echo "\nBuilding Notebook-controller image...\n"
	make docker-build -C notebook-controller

	@echo "\nBuilding Profile-controller image...\n"
	make docker-build -C profile-controller

	@echo "\nBuilding tensorboard-controller image...\n"
	make docker-build -C tensorboard-controller

	@echo "\nBuilding notebook-server images...\n"
	make docker-build-all -C example-notebook-servers

	@echo "\nAll images of prv-kubeflow-kubeflow repo have been built successfully!\n"

push-all:	
	for img in kfam admission-webhook centraldashboard jupyter-web-app tensorboards-web-app volumes-web-app notebook-controller profile-controller \
	tensorboard-controller ; do \
		docker tag $$img:$(TAG) ${REGISTRY}/$$img:${TAG} ; \
		docker push ${REGISTRY}/$$img:${TAG} ; \
	done

	make docker-push-all -C example-notebook-servers TAG=${TAG} REGISTRY=${REGISTRY}

	@echo "\nAll images have been succesfully retaged and pushed with registry: ${REGISTRY} and tag: ${TAG}...\n"