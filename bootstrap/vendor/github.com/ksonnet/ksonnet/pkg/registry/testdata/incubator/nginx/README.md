# nginx

> Nginx is an open source reverse proxy server that supports HTTP, HTTPS, SMTP, POP3, and IMAP protocols. It can be used as a load balancer, HTTP cache, and web server. It is designed for high concurrency, high performance, and low memory usage.

* [Quickstart](#quickstart)
* [Using Prototypes](#using-prototypes)
  * [io.ksonnet.pkg.nginx-simple](#io.ksonnet.pkg.nginx-simple)
  * [io.ksonnet.pkg.nginx-server-block](#io.ksonnet.pkg.nginx-server-block)

## Quickstart

*The following commands use the `io.ksonnet.pkg.nginx-simple` prototype to generate Kubernetes YAML for nginx, and then deploys it to your Kubernetes cluster.*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a [ksonnet application](linkToSomewhere), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.nginx-simple nginx \
  --name nginx \
  --namespace default

# Apply to server.
$ ks apply -f nginx.jsonnet
```

## Using the library

The library files for nginx define a set of relevant *parts* (_e.g._, deployments, services, secrets, and so on) that can be combined to configure nginx for a wide variety of scenarios. For example, a database like Redis may need a secret to hold the user password, or it may have no password if it's acting as a cache.

This library provides a set of pre-fabricated "flavors" (or "distributions") of nginx, each of which is configured for a different use case. These are captured as ksonnet *prototypes*, which allow users to interactively customize these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.nginx-simple

Deploys a simple, stateless nginx server. The nginx container is deployed using a Kubernetes deployment, and is exposed to a network with a
service.

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.nginx-simple nginx \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components [string]

### io.ksonnet.pkg.nginx-server-block

Deploys a simple, stateless nginx server with server blocks (roughly equivalent to nginx virtual hosts). The nginx container is deployed using a
Kubernetes deployment, and is exposed to a network with a service.

#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.nginx-server-block nginx \
  --namespace YOUR_NAMESPACE_HERE \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--namespace=<namespace>`: Namespace in which to put the application [string]
* `--name=<name>`: Name to give to all components. [string]


[rootReadme]: https://github.com/ksonnet/mixins
