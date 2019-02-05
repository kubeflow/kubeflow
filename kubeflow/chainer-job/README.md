# chainer-job

> Prototypes for running Chainer jobs.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Quickstart](#quickstart)
- [Using the library](#using-the-library)
  - [io.ksonnet.pkg.chainer-operator](#ioksonnetpkgchainer-operator)
    - [Example](#example)
    - [Parameters](#parameters)
  - [io.ksonnet.pkg.chainer-job-simple](#ioksonnetpkgchainer-job-simple)
    - [Example](#example-1)
    - [Parameters](#parameters-1)
  - [io.ksonnet.pkg.chainer-job](#ioksonnetpkgchainer-job)
    - [Example](#example-2)
    - [Parameters](#parameters-2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quickstart

*The following commands use the `io.ksonnet.pkg.chainer-job` prototype to generate Kubernetes YAML for chainer-job, and then deploys it to your Kubernetes cluster.*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](../../README.md)).

If you haven't yet created a [ksonnet application](https://ksonnet.io/docs/tutorial#1-initialize-your-app), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks pkg install kubeflow/chainer-job@master
$ ks generate io.ksonnet.pkg.chainer-operator chainer-operator \
  --name chainer-operator

$ ks generate io.ksonnet.pkg.chainer-job chainer-job-simple \
  --name chainer-job-simple

# Apply to server.
$ ks apply default -c chainer-operator # wait for the operator to be running
$ ks apply default -c chainer-job-simple
```

## Using the library

The library files for chainer-job define a set of relevant *parts* (_e.g._, deployments, services, secrets, and so on) that can be combined to configure chainer-job for a wide variety of scenarios. For example, a database like Redis may need a secret to hold the user password, or it may have no password if it's acting as a cache.

This library provides a set of pre-fabricated "flavors" (or "distributions") of chainer-job, each of which is configured for a different use case. These are captured as ksonnet *prototypes*, which allow users to interactively customize these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.chainer-operator

A [Chainer Operator](https://github.com/kubeflow/chainer-operator).

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks generate io.ksonnet.pkg.chainer-operator chainer-operator \
  --name YOUR_NAME_HERE
```

#### Parameters

```shell
# This outputs available parameters
$ ks prototype describe io.ksonnet.pkg.chainer-operator
```

### io.ksonnet.pkg.chainer-job-simple

A Simple [Chainer Job](https://github.com/kubeflow/chainer-operator).

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks generate io.ksonnet.pkg.chainer-job-simple chainer-job-simple \
  --name YOUR_NAME_HERE
```

#### Parameters

```shell
# This outputs available parameters
$ ks prototype describe io.ksonnet.pkg.chainer-job-simple
```

### io.ksonnet.pkg.chainer-job

A [Chainer Job](https://github.com/kubeflow/chainer-operator) which supports distributed and non-distributed jobs.

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks generate io.ksonnet.pkg.chainer-job chainer-job \
  --name YOUR_NAME_HERE
```

#### Parameters

```shell
# This outputs available parameters
$ ks prototype describe io.ksonnet.pkg.chainer-job
```
