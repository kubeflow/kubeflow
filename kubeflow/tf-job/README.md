# tf-job

> Prototypes for running TensorFlow jobs.


* [Quickstart](#quickstart)
* [Using Prototypes](#using-prototypes)
  * [io.ksonnet.pkg.tf-job](#io.ksonnet.pkg.tf-job)
  * [io.ksonnet.pkg.tf-cnn](#io.ksonnet.pkg.tf-cnn)

## Quickstart

*The following commands use the `io.ksonnet.pkg.tf-job` prototype to generate Kubernetes YAML for tf-job, and then deploys it to your Kubernetes cluster.*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a [ksonnet application](linkToSomewhere), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.tf-job tf-job \
  --namespace default \
  --name tf-job

# Apply to server.
$ ks apply -f tf-job.jsonnet
```

## Using the library

The library files for tf-job define a set of relevant *parts* (_e.g._, deployments, services, secrets, and so on) that can be combined to configure tf-job for a wide variety of scenarios. For example, a database like Redis may need a secret to hold the user password, or it may have no password if it's acting as a cache.

This library provides a set of pre-fabricated "flavors" (or "distributions") of tf-job, each of which is configured for a different use case. These are captured as ksonnet *prototypes*, which allow users to interactively customize these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.tf-job

A TensorFlow job (could be training or evaluation).
#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.tf-job tf-job \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components [string]
### io.ksonnet.pkg.tf-cnn

A TensorFlow CNN Benchmarking job
#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.tf-cnn tf-job \
  --name YOUR_NAME_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name for the job. [string]


[rootReadme]: https://github.com/ksonnet/mixins
