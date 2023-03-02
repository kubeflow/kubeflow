TAG ?= $(shell git describe --tags --always --dirty)
REGISTRY ?= kubeflownotebookswg

docker-build-jupyter:
	$(MAKE) docker-build -C ../jupyter TAG=${TAG} 

docker-build-cpu: docker-build-jupyter
	docker build -t ${REGISTRY}/jupyter-tensorflow:${TAG} --build-arg BASE_IMG=${REGISTRY}/jupyter:${TAG} -f cpu.Dockerfile . 

docker-build-cuda: docker-build-jupyter
	docker build -t ${REGISTRY}/jupyter-tensorflow-cuda:${TAG} --build-arg BASE_IMG=${REGISTRY}/jupyter:${TAG} -f cuda.Dockerfile . 

docker-push-cpu: 
	docker push ${REGISTRY}/jupyter-tensorflow:${TAG}

docker-push-cuda:
	docker push ${REGISTRY}/jupyter-tensorflow-cuda:${TAG}
