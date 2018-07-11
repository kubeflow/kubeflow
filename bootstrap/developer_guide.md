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

	* We decided not to check in vendor because it adds 150M + to the repository size.
	* We want to keep the repository small so checking it out to get our ksonnet registry is fast.

Build it

```sh
go install github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap
```

or

```sh
go build -i -o /opt/kubeflow/bootstrapper ${GOPATH}/src/github.com/kubeflow/kubeflow/bootstrap/cmd/bootstrap/main.go
```