# apache

> Apache Ksonnet mixin library contains a simple prototype with pre-configured components to help you deploy a Apache HTTP Server app to a Kubernetes cluster with ease.

* [Quickstart](#quickstart)
* [Using Prototypes](#using-prototypes)
  * [io.ksonnet.pkg.apache-simple](#io.ksonnet.pkg.apache-simple)

## Quickstart

*The following commands use the `io.ksonnet.pkg.apache-simple` prototype to generate Kubernetes YAML for apache, and then deploys it to your Kubernetes cluster.*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a [ksonnet application](linkToSomewhere), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.apache-simple apache \
  --name apache \
  --namespace default

# Apply to server.
$ ks apply -f apache.jsonnet
```

## Using the library

The library files for apache define a set of relevant *parts* (_e.g._, deployments, services, secrets, and so on) that can be combined to configure apache for a wide variety of scenarios. For example, a database like Redis may need a secret to hold the user password, or it may have no password if it's acting as a cache.

This library provides a set of pre-fabricated "flavors" (or "distributions") of apache, each of which is configured for a different use case. These are captured as ksonnet *prototypes*, which allow users to interactively customize these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.apache-simple

Apache HTTP Server. Apache is deployed using a deployment, and exposed to the network using a service.

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.apache-simple apache \
  --namespace YOUR_NAMESPACE_HERE \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--namespace=<namespace>`: Namespace to divvy up your cluster; default is 'default' [string]
* `--name=<name>`: Name to identify all Kubernetes objects in this prototype [string]


[rootReadme]: https://github.com/ksonnet/mixins
