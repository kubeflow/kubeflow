TAG ?= $(shell git describe --tags --always --dirty)

docker-build-jupyter:
	make docker-build -C ../jupyter TAG=${TAG}

docker-build-cpu: docker-build-jupyter
	docker build -t jupyter-pytorch:${TAG} --build-arg BASE_IMG=jupyter:${TAG} -f cpu.Dockerfile . 

docker-build-cuda: docker-build-jupyter
	docker build -t jupyter-pytorch-cuda:${TAG} --build-arg BASE_IMG=jupyter:${TAG} -f cuda.Dockerfile . 

docker-push-cpu:
	docker push jupyter-pytorch:${TAG}

docker-push-cuda:
	docker push jupyter-pytorch-cuda:${TAG}