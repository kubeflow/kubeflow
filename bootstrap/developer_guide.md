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
This image copies the go executable /opt/kubeflow/bootstrapper built in the "builder" image which defaults to 
[gcr.io/kubeflow-images-public/bootstrapper-builder](https://gcr.io/kubeflow-images-public/bootstrapper-builder). 
Both are configurable by overriding environment variables used in the Makefile. Below are various examples that 
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

3. Build the bootstrapper image based on a bootstrapper-builder version and push 
```sh
BUILDER_IMG_VERSION=v20180804-5778003 make push-latest
```

4. Deploy and Debug bootstrapper using your image and version
```sh
IMG=gcr.io/foo/bootstrapper TAG=latest make -e debug
```
The make debug target runs debug.sh which does the following
1. deploys a Namespace, PersistentVolumeClaim and StatefulSet using $(IMG), $(TAG), $(PORT)
2. waits for pod kubeflow-bootstrapper-0 to be in phase 'Running'
3. runs "kubectl port-forward ..." in the background, opening port 2345 to the pod's container
4. wait - cleanup (kill port-forward command) on Ctrl-C
5. when the script exits (Ctrl-C) it will kill "kubectl port-forward ..." 
6. in order to clean up all resources deployed in step 1 run `make cleanup`

The StatefulSet will create a pod and start the following process in the pod's kubeflow-bootstrapper-0 container
```sh
/opt/kubeflow/dlv.sh
```

This script runs

```sh
dlv --listen=:2345 --headless=true --api-version=2 exec /opt/kubeflow/bootstrapper -- --in-cluster --namespace=kubeflow --config=/opt/kubeflow/default.yaml --app-dir=/opt/bootstrap/default --registries-config-file=/opt/kubeflow/image_registries.yaml
```

[dlv](https://github.com/derekparker/delve) is a golang debugger that works with Intellij's IDE [Goland](https://www.jetbrains.com/go/)

In order to connect to the remote bootstrapper process, in goland add a "Go Remote" debug configuration like below
![bootstrapper](./bootstrapper.png)
