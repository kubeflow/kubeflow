# mpi-job

> Message Passing Interface (MPI) is a standardized and portable message-passing
standard designed by a group of researchers from academia and industry to
function on a wide variety of parallel computing architectures. It can be used
to run allreduce-style distributed training.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Quickstart](#quickstart)
- [Using the library](#using-the-library)
  - [io.ksonnet.pkg.mpi-operator](#ioksonnetpkgmpi-operator)
    - [Example](#example)
    - [Parameters](#parameters)
  - [io.ksonnet.pkg.mpi-job-simple](#ioksonnetpkgmpi-job-simple)
    - [Example](#example-1)
    - [Parameters](#parameters-1)
  - [io.ksonnet.pkg.mpi-job-custom](#ioksonnetpkgmpi-job-custom)
    - [Example](#example-2)
    - [Parameters](#parameters-2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quickstart

*The following commands use the `io.ksonnet.pkg.mpi-job-simple` prototype to
generate Kubernetes YAML for mpi-job, and then deploys it to your Kubernetes
cluster.*

First, install Kubeflow by following the
[Getting Started](https://www.kubeflow.org/docs/started/getting-started/)
guide.

Then, in the ksonnet application directory, run the following:

```shell
# Install the mpi-job package.
$ ks pkg install kubeflow/mpi-job@master

# Deploy the mpi-operator.
$ ks generate mpi-operator mpi-operator
$ ks apply default -c mpi-operator # wait for the operator to be running

# Run TensorFlow benchmark on 16 GPUs.
$ ks generate mpi-job-simple tensorflow-benchmark-16 --gpus 16
$ ks apply default -c tensorflow-benchmark-16
```

## Using the library

The library files for mpi-job define a set of relevant *parts* (_e.g._,
deployments, services, secrets, and so on) that can be combined to configure
mpi-job for a wide variety of scenarios. For example, a database like Redis may
need a secret to hold the user password, or it may have no password if it's
acting as a cache.

This library provides a set of pre-fabricated "flavors" (or "distributions") of
mpi-job, each of which is configured for a different use case. These are
captured as ksonnet *prototypes*, which allow users to interactively customize
these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.mpi-operator

Deploy the MPI operator, which manages MPI jobs.

#### Example

```shell
$ ks generate mpi-operator YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components [string]
* `--image=<image>`: The image for the MPI Operator [string]
* `--kubectlDeliveryImage=<kubectlDeliveryImage>`: The image for delivering kubectl [string]
* `--gpusPerNode=<gpus>`: The maximum number of GPUs per node [number]

### io.ksonnet.pkg.mpi-job-simple

A simple MPI job that allows you to specify the total number of GPUs.

#### Example

```shell
$ ks generate mpi-job-simple YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components [string]
* `--gpus=<gpus>`: Total number of GPUs for the job; default to 1 [number]
* `--image=<image>`: The image to user for the job [string]
* `--command=<command>`: Command to pass to the job [string]
* `--args=<args>`: Comma separated list of arguments to pass to the job [string]

### io.ksonnet.pkg.mpi-job-custom

A custom MPI Job that allows you to specify number of replicas and GPUs per
replica.

#### Example

```shell
$ ks generate mpi-job-custom YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components [string]
* `--replicas=<replicas>`: Total number of replicas for the job; default to 1 [number]
* `--gpusPerReplica=<gpus>`: Total number of GPUs per replica; default to 1 [number]
* `--image=<image>`: The image to user for the job [string]
* `--command=<command>`: Command to pass to the job [string]
* `--args=<args>`: Comma separated list of arguments to pass to the job [string]
