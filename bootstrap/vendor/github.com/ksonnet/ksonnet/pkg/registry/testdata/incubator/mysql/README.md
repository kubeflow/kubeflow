# mysql

> MySQL is one of the most popular database servers in the world. Notable users include Wikipedia, Facebook and Google.

* [Quickstart](#quickstart)
* [Using Prototypes](#using-prototypes)
  * [io.ksonnet.pkg.simple-mysql](#io.ksonnet.pkg.simple-mysql)

## Quickstart

*The following commands use the `io.ksonnet.pkg.simple-mysql` prototype to generate Kubernetes YAML for mysql, and then deploys it to your Kubernetes cluster.*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a [ksonnet application](linkToSomewhere), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.simple-mysql mysql \
  --name mysql \
  --namespace default

# Apply to server.
$ ks apply -f mysql.jsonnet
```

## Using the library

The library files for mysql define a set of relevant *parts* (_e.g._, deployments, services, secrets, and so on) that can be combined to configure mysql for a wide variety of scenarios. For example, a database like Redis may need a secret to hold the user password, or it may have no password if it's acting as a cache.

This library provides a set of pre-fabricated "flavors" (or "distributions") of mysql, each of which is configured for a different use case. These are captured as ksonnet *prototypes*, which allow users to interactively customize these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.simple-mysql

Deploys MySQL backed by a persistent volume. The MySQL container is deployed using a deployment and exposed to the network with a service. The
passwords are stored in a secret.

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.simple-mysql mysql \
  --namespace YOUR_NAMESPACE_HERE \
  --name YOUR_NAME_HERE \
  --mysqlRootPassword YOUR_MYSQLROOTPASSWORD_HERE \
  --mysqlPassword YOUR_MYSQLPASSWORD_HERE
```

#### Parameters

The available options to pass prototype are:

* `--namespace=<namespace>`: Namespace in which to put the application [string]
* `--name=<name>`: Name to give to each of the components [string]
* `--mysqlRootPassword=<mysqlRootPassword>`: Password for root user [string]
* `--mysqlPassword=<mysqlPassword>`: Password for new user [string]


[rootReadme]: https://github.com/ksonnet/mixins
