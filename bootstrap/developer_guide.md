<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Developer guide](#developer-guide)
  - [Prerequisites](#prerequisites)
  - [Setting up the build environment](#setting-up-the-build-environment)
  - [Building kfctl](#building-kfctl)
        - [Fetch dependencies](#fetch-dependencies)
        - [`make build-kfctl`](#make-build-kfctl)
      - [Build and test in a container](#build-and-test-in-a-container)
        - [`make install`](#make-install)
        - [`make build-kfctl-container`](#make-build-kfctl-container)
        - [`make push-kfctl-container`](#make-push-kfctl-container)
        - [`make push-kfctl-container-latest`](#make-push-kfctl-container-latest)
        - [`make run-kfctl-container`](#make-run-kfctl-container)
        - [`make test-init`](#make-test-init)
  - [kfctl unit tests](#kfctl-unit-tests)
  - [Building bootstrap](#building-bootstrap)
    - [Iterative Development Using Skaffold](#iterative-development-using-skaffold)
        - [`make build-bootstrap`](#make-build-bootstrap)
        - [`make build`](#make-build)
        - [`make push`](#make-push)
        - [`make push-latest`](#make-push-latest)
        - [`make static, make plugins`](#make-static-make-plugins)
  - [How to run bootstrapper with Click-to-deploy app locally](#how-to-run-bootstrapper-with-click-to-deploy-app-locally)
  - [Releasing kfctl](#releasing-kfctl)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Developer guide

This guide covers to binaries

1. kfctl
1. bootstrap

   * bootstrap is a legacy binary that is being replaced by kfctl see [#2870](https://github.com/kubeflow/kubeflow/issues/2870).
   * It is still used as the binary providing a REST server around kfctl
     * With [#2870](https://github.com/kubeflow/kubeflow/issues/2870) we may or may not move that into kfctl

## Prerequisites

golang to 1.12

```sh
$ ☞  go version
go version go1.12 darwin/amd64
```

On mac osx you can run

```sh
brew upgrade golang
```

On linux you can install the [download](https://golang.org/dl/) and follow the [installation directions](https://golang.org/doc/install).

golang-1.12 uses the golang module framework. See [golang Modules](https://github.com/golang/go/wiki/Modules).
You should add the environment variable `GO111MODULE=on` to your shell init file

Normally go will build a dependency list in the go.mod file, installing 
a dependency explicitly is done by running `go get <dependency>`. 
See the [use case](https://github.com/golang/go/wiki/Modules#why-am-i-getting-an-error-cannot-find-module-providing-package-foo) in the golang Modules Wiki.
golang-1.12 no longer creates a vendor directory.

## Setting up the build environment

Download the kubeflow repo by running

```sh
git clone git@github.com:kubeflow/kubeflow.git
```

or

```sh
git clone https://github.com:kubeflow/kubeflow .
```

Create a symbolic link inside your GOPATH to the location you checked out the code

```sh
mkdir -p ${GOPATH}/src/github.com/kubeflow
ln -sf ${GIT_KUBEFLOW} ${GOPATH}/src/github.com/kubeflow/kubeflow
```

* GIT_KUBEFLOW should be the location where you checked out https://github.com/kubeflow/kubeflow. GOPATH is typically $HOME/go.


## Building kfctl

##### Fetch dependencies

```sh
GO111MODULE=on
export GO111MODULE
go mod download
```

##### `make build-kfctl`
```sh
cd $GIT_KUBEFLOW/bootstrap
make build-kfctl
```

* This will create `bin/kfctl` with full debug information


#### Build and test in a container

This section describes how to build and test kfctl in a docker container. This ensures a reproducible build environment.
This is also useful for reproducing what happens in our CI system.

Create the docker image used to build and test `kfctl`.

```
 GCLOUD_PROJECT=cloud-ml-dev make build-builder-container
```

Alternatively to build using GCB

```
 GCLOUD_PROJECT=cloud-ml-dev make build-builder-container
```

We can now start an interactive shell inside the docker container

```
IMAGE=$(docker images --format '{{ .Repository }}:{{ .Tag }}' | awk 'FNR==1{print $0}')
REPO_ROOT=$(git rev-parse --show-toplevel)
mkdir -p ${REPO_ROOT}/bootstrap/bin/tmp
docker run -it \
  -v ${REPO_ROOT}:/go/src/github.com/kubeflow/kubeflow \
  -v ${REPO_ROOT}/bootstrap/bin/tmp:/tmp \
  ${IMAGE} \
  /bin/bash
docker run  -v ${REPO_ROOT}:/go/src/github.com/kubeflow/kubeflow  \
  -v ${REPO_ROOT}/bootstrap/bin/tmp:/tmp \
  -it $IMAGE \
  /bin/bash -c "cd /go/src/github.com/kubeflow/kubeflow/bootstrap;exec /bin/bash"  
```

Then to build it run the following inside the container

```
make build-kfctl
```

To run the unittests run the following inside the container

```
make test
```

**Note** Since this is running as root files written to bin/... will be owned by root.

##### `make install`

```sh
make install #depends on build-kfctl
```

* Installs kfctl in /usr/local/bin


##### `make build-kfctl-container`

```sh
make build-kfctl-container
```

* creates a docker container

##### `make push-kfctl-container`

```sh
make push-kfctl-container
```

* pushes the docker container to $IMG_KFCTL

##### `make push-kfctl-container-latest`

```sh
make push-kfctl-container-latest
```

* pushes the docker container to $IMG_KFCTL and tags it with kfctl:latest

##### `make run-kfctl-container`

```sh
make run-kfctl-container
```

* runs the local docker container. Opens a shell in the container

> how to deploy gcp from within the container<br>

Run 

```sh
KFCTL_TARGET=kfctl_base MOUNT_KUBE='' make run-kfctl-container
```

The above command will open a shell in the container. Then run the following:

```
$ cp bin/kfctl /usr/local/bin
$ cd /opt/kubeflow
$ kfctl init gcp-test --platform gcp --project <PROJECT> -V
$ cd gcp-test
$ kfctl generate all -V
$ CLIENT_ID=XXX CLIENT_SECRET=YYY kfctl apply all -V
```


##### `make test-init`

```sh
make test-init
```

* will run `kfctl init` for gcp, minikube and no platform


## kfctl unit tests

This section provides information about how we continually run the go unittests for kfctl.

We create a suitable docker image for building and testing the code under Prow

```
GCLOUD_PROJECT=kubeflow-ci make build-builder-container-gcb
```

This image is then set [unit_tests.jsonnet](https://github.com/kubeflow/kubeflow/blob/master/testing/workflows/components/unit_tests.jsonnet).



## Building bootstrap 

One of the functions of bootstrap is to provide a REST server for deploying Kubeflow.

* With [#2152](https://github.com/kubeflow/kubeflow/issues/2870) we are adopting a design where there are 2 servers
 
  * A router that clients directly connect to
  * Router handles requests by creating a statefulset running the server for a single deployment.

* This makes testing/developing the router and statefulset interactions more complicated because
  we need to deploy the router on a Kubernetes cluster.

### Iterative Development Using Skaffold

This section describes how to use skaffold to make iterative development/testing of the router and statefulset easy

* skaffold is used to continuously update and deploy the bootstrap server on your Kubernetes cluster

* To make rebuilds of the docker image fast we build `bootstrap` in a container that already has the go dependencies cached init

* The base container is provided by 

  ```
  DOCKERFILE=Dockerfile
  TARGET=bootstrap_base
  ```
* To build the base container

  ```
  make GCLOUD_PROJECT=${PROJECT} PROJECT=${PROJECT} build-builder-container-gcb
  ```

  * You will need to rebuild if the dependencies change.

* The actual docker container is file `Dockerfile.bootstrap.dev`

* To start skaffold

  ```
  REPO=gcr.io/${PROJECT}
  skaffold dev -v=info --default-repo ${REPO}
  ```
  * `.dockerignore` controls which files trigger rebuilds and are uploaded as part of the context

* Then to send requests use kfctlClient


  ```
  build-kfctl-client
  CONFIG=$(pwd)/config/kfctl_gcp_iap.0.6.yaml
  kubectl port-forward service/kfctl-router 8080:8080
  ./bin/kfctlClient --v=1 --project=${PROJECT} --name=${KFNAME} --endpoint=http://localhost:8080 --config=${CONFIG}
  ```


##### `make build-bootstrap`

```sh
cd $GIT_KUBEFLOW/bootstrap
make build-bootstrap
```

* Creates bin/bootstrapper with full debug information

##### `make build`

* Depends on `make build-local`. Creates a docker image gcr.io/$(GCLOUD_PROJECT)/bootstrapper:$(TAG)

##### `make push`

* Depends on `make build`. Pushes the docker image gcr.io/$(GCLOUD_PROJECT)/bootstrapper:$(TAG)

##### `make push-latest`

* Depends on `make push`. Tags the docker image gcr.io/$(GCLOUD_PROJECT)/bootstrapper:$(TAG) with latest.
Note: To use a different gcloud project than kubeflow-images-public.
```sh
export GCLOUD_PROJECT=mygcloudproject
make push
```

##### `make static, make plugins`
These targets are for kfctl and allows the goland debugger work by disabling plugins.
This is a problem in the go compiler which should be fixed in 1.12.
See the [kfctl/README.md](./cmd/kfctl) for additional information.

## How to run bootstrapper with Click-to-deploy app locally

Start the backend:

```
IMAGE=gcr.io/kubeflow-images-public/bootstrapper:latest  # change this

docker run -d -it --name bootstrapper \
    --mount type=bind,source=${HOME}/kf_app,target=/home/kubeflow -p 8080:8080 \
    ${IMAGE} /opt/kubeflow/bootstrapper \
    --install-istio --namespace=kubeflow  # change args if you want
```

Start the frontend:

```
cd ../components/gcp-click-to-deploy
npm start
```

## Releasing kfctl

See [release guide](https://github.com/kubeflow/kubeflow/blob/master/docs_dev/releasing.md)
