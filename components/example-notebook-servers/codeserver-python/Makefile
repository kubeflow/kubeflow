TAG ?= $(shell git describe --tags --always --dirty)

docker-build-codeserver:
	make docker-build -C ../codeserver TAG=${TAG}

docker-build: docker-build-codeserver
	docker build -t codeserver-python:${TAG} --build-arg BASE_IMG=codeserver:${TAG} -f Dockerfile . 

docker-push:
	docker push codeserver-python:${TAG}