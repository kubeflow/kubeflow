# paddle-job

> Prototypes for running Paddle jobs.


* [Quickstart](#quickstart)
* [Using Prototypes](#using-prototypes)
  * [io.ksonnet.pkg.paddle-operator](#io.ksonnet.pkg.paddle-operator)
  * [io.ksonnet.pkg.paddle-job](#io.ksonnet.pkg.paddle-job)

## Quickstart

*The following commands use the `io.ksonnet.pkg.paddle-job` prototype to generate Kubernetes YAML for paddle-job, and then deploys it to your Kubernetes cluster.*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a [ksonnet application](linkToSomewhere), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks pkg install kubeflow/paddle-job@master
$ ks prototype use io.ksonnet.pkg.paddle-operator paddle-operator \
  --namespace default \
  --name paddle-operator

$ ks prototype use io.ksonnet.pkg.paddle-job paddle-job \
  --namespace default \
  --name paddle-job

# Apply to server.
$ ks apply default -c paddle-operator # wait for the operator to be running
$ ks apply default -c paddle-job
```

## Using the library

The library files for paddle-job define a set of relevant *parts* (_e.g._, deployments, services, and so on) that can be combined to configure paddle-job for a wide variety of scenarios. For example, a database like Redis may need a secret to hold the user password, or it may have no password if it's acting as a cache.

This library provides a set of pre-fabricated "flavors" (or "distributions") of paddle-job, each of which is configured for a different use case. These are captured as ksonnet *prototypes*, which allow users to interactively customize these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.paddle-operator

A Paddle Operator.
#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.paddle-operator paddle-operator \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components [string]

### io.ksonnet.pkg.paddle-job

A Paddle job.
#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.paddle-job paddle-job \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components [string]
* `--image=<image>`: The image to user for the job [string]
