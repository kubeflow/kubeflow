TAG ?= $(shell git describe --tags --always --dirty)

docker-build-base:
	make docker-build -C ../base TAG=${TAG}

docker-build: docker-build-base
	docker build -t jupyter:${TAG} --build-arg BASE_IMG=base:${TAG} -f Dockerfile . 

docker-push:
	docker push jupyter:${TAG}