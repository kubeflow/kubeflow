# Developer guide for bootstrap

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
