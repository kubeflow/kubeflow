# core

> Core components of Kubeflow.


* [Quickstart](#quickstart)
* [Using Prototypes](#using-prototypes)
  * [io.ksonnet.pkg.kubeflow-core](#io.ksonnet.pkg.kubeflow-core)

## Quickstart

*The following commands use the `io.ksonnet.pkg.kubeflow` prototype to generate Kubernetes YAML for core, and then deploys it to your Kubernetes cluster.*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a [ksonnet application](linkToSomewhere), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.kubeflow-core \
  --name core \
  --namespace default \
  --disks 

# Apply to server.
$ ks apply -f core.jsonnet
```

## Using the library

The library files for core define a set of relevant *parts* (_e.g._, deployments, services, secrets, and so on) that can be combined to configure core for a wide variety of scenarios. For example, a database like Redis may need a secret to hold the user password, or it may have no password if it's acting as a cache.

This library provides a set of pre-fabricated "flavors" (or "distributions") of core, each of which is configured for a different use case. These are captured as ksonnet *prototypes*, which allow users to interactively customize these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.kubeflow-core

Kubeflow core components
#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.kubeflow-core core \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components [string]


[rootReadme]: https://github.com/ksonnet/mixins
