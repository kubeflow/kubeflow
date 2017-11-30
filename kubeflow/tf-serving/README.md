# tf-serving

> TensorFlow serving is a server for TensorFlow models.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Quickstart](#quickstart)
- [Using the library](#using-the-library)
  - [io.ksonnet.pkg.tf-serving](#ioksonnetpkgtf-serving)
    - [Example](#example)
    - [Parameters](#parameters)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quickstart

*The following commands use the `io.ksonnet.pkg.tf-serving` prototype to generate Kubernetes YAML for tf-serving, and then deploys it to your Kubernetes cluster.*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](../../README.md)).

If you haven't yet created a [ksonnet application](https://ksonnet.io/docs/tutorial#1-initialize-your-app), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.tf-serving tf-serving \
  --name tf-serving \
  --namespace default

# Apply to server.
$ ks apply -f tf-serving.jsonnet
```

## Using the library

The library files for tf-serving define a set of relevant *parts* (_e.g._, deployments, services, secrets, and so on) that can be combined to configure tf-serving for a wide variety of scenarios. For example, a database like Redis may need a secret to hold the user password, or it may have no password if it's acting as a cache.

This library provides a set of pre-fabricated "flavors" (or "distributions") of tf-serving, each of which is configured for a different use case. These are captured as ksonnet *prototypes*, which allow users to interactively customize these distributions for their specific needs.

These prototypes, as well as how to use them, are enumerated below.

### io.ksonnet.pkg.tf-serving

TensorFlow serving
#### Example

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.tf-serving tf-serving \
  --name YOUR_NAME_HERE \
  --model_path YOUR_MODEL_PATH_HERE
```

#### Parameters

The available options to pass prototype are:

* `--name=<name>`: Name to give to each of the components [string]
* `--model_path=<model_path>`: Path to the model. This can be a GCS path. [string]
