TAG ?= $(shell git describe --tags --always --dirty)

docker-build-jupyter:
	make docker-build -C ../jupyter TAG=${TAG} 

docker-build: docker-build-jupyter
	docker build -t jupyter-scipy:${TAG} --build-arg BASE_IMG=jupyter:${TAG} -f Dockerfile . 

docker-push:
	docker push jupyter-scipy:${TAG}