# redis

> Redis is an advanced key-value cache and store. Often referred to as a data structure server since keys can contain structures as simple as strings, hashes and as complex as bitmaps and hyperloglogs. This package will deploy redis backed by a mounted persistent volume, a secret to hold your database password and a service to expose your deployment.


* [Quickstart](#quickstart)
* [Using Prototypes](#using-prototypes)
  * [io.ksonnet.pkg.redis-stateless](#io.ksonnet.pkg.redis-stateless)
  * [io.ksonnet.pkg.redis-persistent](#io.ksonnet.pkg.redis-persistent)
  * [io.ksonnet.pkg.redis-all-features](#io.ksonnet.pkg.redis-all-features)

## Quickstart

*The following commands use the `io.ksonnet.pkg.redis-persistent` prototype to generate Kubernetes YAML for redis, and then deploys it to your Kubernetes cluster.*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a [ksonnet application](linkToSomewhere), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.redis-persistent redis \
  --name redis \
  --namespace default \
  --password boots

# Apply to server.
$ ks apply -f redis.jsonnet
```

## Using the library

The library files for redis define a set of relevant *parts* (_e.g._, deployments, services, secrets, and so on) that can be combined to configure redis for a wide variety of scenarios. For example, a database like Redis may need a secret to hold the user password, or it may have no password if it's acting as a cache.

This library provides a set of pre-fabricated "flavors" (or "distributions") of redis, each of which is configured for a different use case. These are captured as ksonnet *prototypes*, which allow users to interactively customize these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.redis-stateless

Stateless redis, backed with NO persistent volume claim. Redis is deployed using a Kubernetes deployment, exposed to the network with a service, with
a password stored in a secret.

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.redis-stateless redis \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components. [string]

### io.ksonnet.pkg.redis-persistent

Redis backed by a persistent volume claim. Redis is deployed using a Kubernetes deployment, exposed to the network with a service, with a password stored in a secret.

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.redis-persistent redis \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components [string]

### io.ksonnet.pkg.redis-all-features

Redis with all the features supported by redis.libsonnet (e.g. secret, metrics, ingress, PVC)

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.redis-all-features redis \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components [string]


[rootReadme]: https://github.com/ksonnet/mixins
