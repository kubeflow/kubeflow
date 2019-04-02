<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Developer guide for bootstrap](#developer-guide-for-bootstrap)
  - [Building bootstrapper locally](#building-bootstrapper-locally)
    - [Prerequisites](#prerequisites)
    - [Makefile targets](#makefile-targets)
      - [`make build-local`](#make-build-local)
      - [`make build`](#make-build)
      - [`make push`](#make-push)
      - [`make push-latest`](#make-push-latest)
      - [`make static, make plugins`](#make-static-make-plugins)
  - [How to run bootstrapper with Click-to-deploy app locally](#how-to-run-bootstrapper-with-click-to-deploy-app-locally)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Developer guide for bootstrap

## Building kfctl

```sh
cd bootstrap
make build-kfctl
```

* This will create `bin/kfctl`

* If you get an error about missing files in `/tmp/v2`, you are hitting [#2790](https://github.com/kubeflow/kubeflow/issues/2790) and need to delete `/tmp/v2` and rerun the build.



## Building bootstrapper locally

Create a symbolic link inside your GOPATH to the location you checked out the code

```sh
mkdir -p ${GOPATH}/src/github.com/kubeflow
ln -sf ${GIT_KUBEFLOW} ${GOPATH}/src/github.com/kubeflow/kubeflow
```

* GIT_KUBEFLOW should be the location where you checked out https://github.com/kubeflow/kubeflow

### Prerequisites

golang to 1.11.5

```sh
$ ☞  go version
go version go1.11.5 darwin/amd64
```

On mac osx you can run

```sh
brew upgrade golang
```

golang-1.11.5 uses go.mod, go.sum files which include dependencies.
To install a new dependency use `go get <dependency>`.
golang-1.11.5 no longer creates a vendor directory.
You should add the environment variable `GO111MODULE=on` to your shell init file

### Makefile targets

```
build             debug             push
build-local       debug-latest      push-latest
cleanup
```

#### `make build-local`
Creates bin/bootstrapper with full debug information

#### `make build`
Depends on `make build-local`. Creates a docker image gcr.io/$(GCLOUD_PROJECT)/bootstrapper:$(TAG)

#### `make push`
Depends on `make build`. Pushes the docker image gcr.io/$(GCLOUD_PROJECT)/bootstrapper:$(TAG)

#### `make push-latest`
Depends on `make push`. Tags the docker image gcr.io/$(GCLOUD_PROJECT)/bootstrapper:$(TAG) with latest.
Note: To use a different gcloud project than kubeflow-images-public.
```sh
export GCLOUD_PROJECT=mygcloudproject
make push
```

#### `make static, make plugins`
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