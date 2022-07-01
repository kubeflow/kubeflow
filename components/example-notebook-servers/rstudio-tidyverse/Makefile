TAG ?= $(shell git describe --tags --always --dirty)

docker-build-rstudio:
	make docker-build -C ../rstudio TAG=${TAG} 

docker-build: docker-build-rstudio
	docker build -t rstudio-tidyverse:${TAG} --build-arg BASE_IMG=rstudio:${TAG} -f Dockerfile . 

docker-push:
	docker push rstudio-tidyverse:${TAG}