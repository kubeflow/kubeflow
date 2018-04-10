# mongodb

> MongoDB is a cross-platform document-oriented database. Classified as a NoSQL database, MongoDB eschews the traditional table-based relational database structure in favor of JSON-like documents with dynamic schemas, making the integration of data in certain types of applications easier and faster.

* [Quickstart](#quickstart)
* [Using Prototypes](#using-prototypes)
  * [io.ksonnet.pkg.mongodb-simple](#io.ksonnet.pkg.mongodb-simple)

## Quickstart

*The following commands use the `io.ksonnet.pkg.mongodb-simple` prototype to generate Kubernetes YAML for mongodb, and then deploys it to your Kubernetes cluster.*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a [ksonnet application](linkToSomewhere), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.mongodb-simple mongo \
  --rootPassword boots \
  --password boots \
  --name mongodb \
  --namespace default

# Apply to server.
$ ks apply -f mongo.jsonnet
```

## Using the library

The library files for mongodb define a set of relevant *parts* (_e.g._, deployments, services, secrets, and so on) that can be combined to configure mongodb for a wide variety of scenarios. For example, a database like Redis may need a secret to hold the user password, or it may have no password if it's acting as a cache.

This library provides a set of pre-fabricated "flavors" (or "distributions") of mongodb, each of which is configured for a different use case. These are captured as ksonnet *prototypes*, which allow users to interactively customize these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.mongodb-simple

Deploys a simple instance of mongodb, backed by a persistent volume claim. The mongodb container is deployed using a Kubernetes deployment, and exposed
to the network using a service. Passwords are stored in a secret.

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.mongodb-simple mongo \
  --namespace YOUR_NAMESPACE_HERE \
  --name YOUR_NAME_HERE \
  --rootPassword YOUR_ROOTPASSWORD_HERE \
  --password YOUR_PASSWORD_HERE
```

#### Parameters

The available options to pass prototype are:

* `--namespace=<namespace>`: Namespace to specify destination in cluster; default is 'default' [string]
* `--name=<name>`: Name of app to attach as identifier to all components [string]
* `--rootPassword=<rootPassword>`: RootPassword for db admin password [string]
* `--password=<password>`: Password for db user password [string]


[rootReadme]: https://github.com/ksonnet/mixins
