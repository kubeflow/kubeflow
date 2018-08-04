# Developer guide for bootstrap

## Building bootstrapper locally

Create a symbolic link inside your GOPATH to the location you checked out the code

```sh
mkdir -p ${GOPATH}/src/github.com/kubeflow
ln -sf ${GIT_KUBEFLOW} ${GOPATH}/src/github.com/kubeflow/kubeflow
```

* GIT_KUBEFLOW should be the location where you checked out https://github.com/kubeflow/kubeflow

Resolve dependencies (if you don't have glide install, check how to do it [here](https://github.com/Masterminds/glide/blob/master/README.md#install))

Install dependencies, `-v` will ignore subpackage vendor

```sh
glide install -v
```

	* We decided not to check in vendor because it adds 150M + to the repository size.
	* We want to keep the repository small so checking it out to get our ksonnet registry is fast.

Build it

```sh
go install github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap
```

or

```sh
go build -i -o ${GOPATH}/bin/bootstrapper ${GOPATH}/src/github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap/main.go
```

## Building and pushing the bootstrapper-builder and bootstrapper images.  

The bootstrapper image defaults to [gcr.io/kubeflow-images-public/bootstrapper](https://gcr.io/kubeflow-images-public/bootstrapper). 
This image inherits from a base "builder" image which defaults to 
[gcr.io/kubeflow-images-public/bootstrapper-builder](https://gcr.io/kubeflow-images-public/bootstrapper-builder). 
Both are configurable by overridding environment variables used in the Makefile. Below are various examples that 
show how and where these images are built and pushed.

1. Use a different gcloud project than kubeflow-images-public. 
```sh
export GCLOUD_PROJECT=mygcloudproject 
make push-builder && make push
```

2. Build with debug symbols included in the bootstrapper executable 
```sh
export GOLANG_GCFLAGS='-gcflags "all=-N -l"'
make push-builder && make push
```

3. Deploy and Debug bootstrapper 
```sh
kubectl apply -f bootstrapper.debug.yaml
kubectl port-forward kubeflow-bootstrapper-0 2345 --namespace=kubeflow-admin
```
In goland add a "Go Remote" debug configuration like below
![bootstrapper](./bootstrapper.png)

4. Build the bootstrapper image based on a bootstrapper-builder version and push 
```sh
BUILDER_IMG_VERSION=v20180804-5778003 make push-latest
```
