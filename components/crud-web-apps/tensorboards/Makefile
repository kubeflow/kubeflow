IMG ?= konstantinosand/twa
TAG ?= v1
DOCKERFILE=tensorboards/Dockerfile

docker-build:
	cp Dockerfile.dockerignore ../.dockerignore
	-cd ../ && docker build -t ${IMG}:${TAG} -f ${DOCKERFILE} .
	rm ../.dockerignore


docker-push:
	docker push $(IMG):$(TAG)

image: docker-build docker-push
	@echo "Updated image ${IMG}"
