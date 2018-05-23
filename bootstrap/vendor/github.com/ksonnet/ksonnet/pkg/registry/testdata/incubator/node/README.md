# nodejs

> Node is an event-driven I/O server-side JavaScript environment based on V8

* [Quickstart](#quickstart)
* [Using Prototypes](#using-prototypes)
  * [io.ksonnet.pkg.nodejs-simple](#io.ksonnet.pkg.nodejs-simple)
  * [io.ksonnet.pkg.nodejs-nonpersistent](#io.ksonnet.pkg.nodejs-nonpersistent)

## Quickstart

*The following commands use the `io.ksonnet.pkg.nodejs-simple` prototype to generate Kubernetes YAML for nodejs, and then deploys it to your Kubernetes cluster.*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a [ksonnet application](linkToSomewhere), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.nodejs-simple nodejs \
  --name nodejs \
  --namespace default

# Apply to server.
$ ks apply -f nodejs.jsonnet
```

## Using the library

The library files for nodejs define a set of relevant *parts* (_e.g._, deployments, services, secrets, and so on) that can be combined to configure nodejs for a wide variety of scenarios. For example, a database like Redis may need a secret to hold the user password, or it may have no password if it's acting as a cache.

This library provides a set of pre-fabricated "flavors" (or "distributions") of nodejs, each of which is configured for a different use case. These are captured as ksonnet *prototypes*, which allow users to interactively customize these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.nodejs-simple

Deploy a node.js server with persistent volumes. The node container is deployed using a deployment, and exposed to the network using a service.

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.nodejs-simple nodejs \
  --namespace YOUR_NAMESPACE_HERE \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--namespace=<namespace>`: Namespace to specify location of app; default is 'default' [string]
* `--name=<name>`: Name of app to identify all K8s objects in this prototype [string]

### io.ksonnet.pkg.nodejs-nonpersistent

Deploy a node.js server with no persistent volumes. The node container is deployed using a deployment, and exposed to the network using a service.

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.nodejs-nonpersistent nodejs \
  --namespace YOUR_NAMESPACE_HERE \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--namespace=<namespace>`: Namespace to specify location of app; default is 'default' [string]
* `--name=<name>`: Name of app to identify all K8s objects in this prototype [string]


[rootReadme]: https://github.com/ksonnet/mixins
