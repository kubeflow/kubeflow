TAG ?= $(shell git describe --tags --always --dirty)
REGISTRY ?= kubeflownotebookswg

docker-build-all:
	@echo "\nBuilding base image...\n"
	make docker-build -C base

	@echo "\nBuilding codeserver image...\n"
	make docker-build -C codeserver

	@echo "\nBuilding codeserver-python image...\n"
	make docker-build -C codeserver-python

	@echo "\nBuilding rstudio image...\n"
	make docker-build -C rstudio

	@echo "\nBuilding rstudio-tidyverse image...\n"
	make docker-build -C rstudio-tidyverse

	@echo "\nBuilding jupyter image...\n"
	make docker-build -C jupyter 

	@echo "\nBuilding jupyter-scipy image...\n"
	make docker-build -C jupyter-scipy

	@echo "\nBuilding jupyter-pytorch image...\n"
	make docker-build-cpu -C jupyter-pytorch

	@echo "\nBuilding jupyter-pytorch-cuda image...\n"
	make docker-build-cuda -C jupyter-pytorch

	@echo "\nBuilding jupyter-pytorch-full image...\n"
	make docker-build-cpu -C jupyter-pytorch-full

	@echo "\nBuilding jupyter-pytorch-cuda-full image...\n"
	make docker-build-cuda -C jupyter-pytorch-full

	@echo "\nBuilding jupyter-tensorflow image...\n"
	make docker-build-cpu -C jupyter-tensorflow

	@echo "\nBuilding jupyter-tensorflow-cuda image...\n"
	make docker-build-cuda -C jupyter-tensorflow

	@echo "\nBuilding jupyter-tensorflow-full image...\n"
	make docker-build-cpu -C jupyter-tensorflow-full

	@echo "\nBuilding jupyter-tensorflow-cuda-full image...\n"
	make docker-build-cuda -C jupyter-tensorflow-full

	@echo "\nAll notebook-server images have been successfully built...\n"

docker-push-all:
	@echo "\nPushing base image...\n"
	make docker-push -C base

	@echo "\nPushing codeserver image...\n"
	make docker-push -C codeserver

	@echo "\nPushing codeserver-python image...\n"
	make docker-push -C codeserver-python 

	@echo "\nPushing rstudio image...\n"
	make docker-push -C rstudio

	@echo "\nPushing rstudio-tidyverse image...\n"
	make docker-push -C rstudio-tidyverse

	@echo "\nPushing jupyter image...\n"
	make docker-push -C jupyter

	@echo "\nPushing jupyter-scipy image...\n"
	make docker-push -C jupyter-scipy

	@echo "\nPushing jupyter-pytorch image...\n"
	make docker-push-cpu -C jupyter-pytorch

	@echo "\nPushing jupyter-pytorch-cuda image...\n"
	make docker-push-cuda -C jupyter-pytorch

	@echo "\nPushing jupyter-pytorch-full image...\n"
	make docker-push-cpu -C jupyter-pytorch-full

	@echo "\nPushing jupyter-pytorch-cuda-full image...\n"
	make docker-push-cuda -C jupyter-pytorch-full

	@echo "\nPushing jupyter-tensorflow image...\n"
	make docker-push-cpu -C jupyter-tensorflow

	@echo "\nPushing jupyter-tensorflow-cuda image...\n"
	make docker-push-cuda -C jupyter-tensorflow

	@echo "\nPushing jupyter-tensorflow-full image...\n"
	make docker-push-cpu -C jupyter-tensorflow-full

	@echo "\nPushing jupyter-tensorflow-cuda-full image...\n"
	make docker-push-cuda -C jupyter-tensorflow-full

	@echo "\nAll notebook-server images have been successfully pushed...\n"
