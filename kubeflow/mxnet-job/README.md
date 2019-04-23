# MXNet-job

> Prototypes for running MXNet jobs.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Quickstart](#quickstart)
- [Using the library](#using-the-library)
  - [io.ksonnet.pkg.mxnet-operator](#ioksonnetpkgmxnet-operator)
    - [Example](#example)
    - [Parameters](#parameters)
  - [io.ksonnet.pkg.mxnet-job](#ioksonnetpkgmxnet-job)
    - [Example](#example-1)
    - [Parameters](#parameters-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quickstart

*The following commands use the `io.ksonnet.pkg.mxnet-operator` prototype to
generate Kubernetes YAML for mxnet-job, and then deploys it to your Kubernetes
cluster.*

First, install Kubeflow by following the
[Getting Started](https://www.kubeflow.org/docs/started/getting-started/)
guide.

Then, in the ksonnet application directory, run the following:

```shell
# Install the mxnet-job package.
$ ks pkg install kubeflow/mxnet-job@master

# Deploy the mxnet-operator.
$ ks prototype use io.ksonnet.pkg.mxnet-operator mxnet-operator \
  --name mxnet-operator
$ ks apply default -c mxnet-operator # wait for the operator to be running

# Run MXNet training job
$ ks prototype use io.ksonnet.pkg.mxnet-job mxnet-job \
  --name mxnet-job
$ ks apply default -c mxnet-job
```

## Using the library

The library files for mxnet-job define a set of relevant *parts* (_e.g._,
deployments, services, secrets, and so on) that can be combined to configure
mxnet-job for a wide variety of scenarios. For example, a database like Redis may
need a secret to hold the user password, or it may have no password if it's
acting as a cache.

This library provides a set of pre-fabricated "flavors" (or "distributions") of
mxnet-job, each of which is configured for a different use case. These are
captured as ksonnet *prototypes*, which allow users to interactively customize
these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.mxnet-operator

Deploy the MXNet operator, which manages MXNet jobs.

#### Example

```shell
$ ks prototype use io.ksonnet.pkg.mxnet-operator mxnet-operator \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components [string]
* `--image=<image>`: The image for the MXNet Operator [string]

### io.ksonnet.pkg.mxnet-job

A MXNet job.

#### Example

```shell
$ ks prototype use io.ksonnet.pkg.mxnet-job mxnet-job \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components [string]
* `--image=<image>`: The image to user for the job [string]
* `--command=<command>`: Command to pass to the job [string]
* `--args=<args>`: Comma separated list of arguments to pass to the job [string]
* `--numServers=<replicas>`: Total number of replicas for the servers; default to 1 [number]
* `--numWorkers=<replicas>`: Total number of replicas for the workers; default to 1 [number]
* `--numGpus=<gpus>`: Total number of GPUs per worker replica; default to 1 [number]
