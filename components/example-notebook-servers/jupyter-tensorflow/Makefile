TAG ?= $(shell git describe --tags --always --dirty)

docker-build-jupyter:
	make docker-build -C ../jupyter TAG=${TAG} 

docker-build-cpu: docker-build-jupyter
	docker build -t jupyter-tensorflow:${TAG} --build-arg BASE_IMG=jupyter:${TAG} -f cpu.Dockerfile . 

docker-build-cuda: docker-build-jupyter
	docker build -t jupyter-tensorflow-cuda:${TAG} --build-arg BASE_IMG=jupyter:${TAG} -f cuda.Dockerfile . 

docker-push-cpu: 
	docker push jupyter-tensorflow:${TAG}

docker-push-cuda:
	docker push jupyter-tensorflow-cuda:${TAG}