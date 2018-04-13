# Developer guide for bootstrap

## Building the Operator

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

Build it

```sh
go install github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap
```