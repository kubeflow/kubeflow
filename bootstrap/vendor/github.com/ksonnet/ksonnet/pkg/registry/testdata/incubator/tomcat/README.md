# tomcat

> Apache Tomcat, or Tomcat, is an open-source web server and servlet container. This package deploys a stateless tomcat container, service, and secret to your cluster

* [Quickstart](#quickstart)
* [Using Prototypes](#using-prototypes)
  * [io.ksonnet.pkg.non-persistent-tomcat](#io.ksonnet.pkg.non-persistent-tomcat)
  * [io.ksonnet.pkg.persistent-tomcat](#io.ksonnet.pkg.persistent-tomcat)

## Quickstart

*The following commands use the `io.ksonnet.pkg.persistent-tomcat` prototype to generate Kubernetes YAML for tomcat, and then deploys it to your Kubernetes cluster.*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a [ksonnet application](linkToSomewhere), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.persistent-tomcat tomcat \
  --name tomcat \
  --namespace default \
  --tomcatUser frank \
  --tomcatPassword boots

# Apply to server.
$ ks apply -f tomcat.jsonnet
```

## Using the library

The library files for tomcat define a set of relevant *parts* (_e.g._, deployments, services, secrets, and so on) that can be combined to configure tomcat for a wide variety of scenarios. For example, a database like Redis may need a secret to hold the user password, or it may have no password if it's acting as a cache.

This library provides a set of pre-fabricated "flavors" (or "distributions") of tomcat, each of which is configured for a different use case. These are captured as ksonnet *prototypes*, which allow users to interactively customize these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.non-persistent-tomcat

Deploys a stateless Tomcat server. Server is deployed using a Kubernetes deployment, and exposed to the network using a service. The password is stored as a secret.

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.non-persistent-tomcat tomcat \
  --namespace YOUR_NAMESPACE_HERE \
  --name YOUR_NAME_HERE \
  --tomcatUser YOUR_TOMCATUSER_HERE \
  --tomcatPassword YOUR_TOMCATPASSWORD_HERE
```

#### Parameters

The available options to pass prototype are:

* `--namespace=<namespace>`: Namespace in which to put the application [string]
* `--name=<name>`: Name to give to each of the components. [string]
* `--tomcatUser=<tomcatUser>`: Username for tomcat manager page, if not specified tomcat will not assign users [string]
* `--tomcatPassword=<tomcatPassword>`: Tomcat manager page password, to be encrypted and included in Secret API object [string]

### io.ksonnet.pkg.persistent-tomcat

Deploys a stateful Tomcat server, backed by a persistent volume. Server is deployed using a Kubernetes deployment, and exposed to the network using a
service. The password is stored as a secret.

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.persistent-tomcat tomcat \
  --namespace YOUR_NAMESPACE_HERE \
  --name YOUR_NAME_HERE \
  --tomcatUser YOUR_TOMCATUSER_HERE \
  --tomcatPassword YOUR_TOMCATPASSWORD_HERE
```

#### Parameters

The available options to pass prototype are:

* `--namespace=<namespace>`: Namespace in which to put the application [string]
* `--name=<name>`: Name to give to each of the components [string]
* `--tomcatUser=<tomcatUser>`: Username for tomcat manager page, if not specified tomcat will not assign users [string]
* `--tomcatPassword=<tomcatPassword>`: Tomcat manager page password, to be encrypted and included in Secret API object [string]


[rootReadme]: https://github.com/ksonnet/mixins
