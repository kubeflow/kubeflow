<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Argo](#argo)
  - [Quickstart](#quickstart)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Argo

> Prototypes for deploying Argo and running Argo Workflows


* [Quickstart](#quickstart)
* [Using Prototypes](#using-prototypes)
  * [io.ksonnet.pkg.argo](#io.ksonnet.pkg.argo)

## Quickstart

*The following commands use the `io.ksonnet.pkg.argo` prototype to deploy the Argo Workflow operator on your Kubernetes cluster*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a [ksonnet application](linkToSomewhere), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Install the kubeflow argo package
$ ks pkg install kubeflow/argo

# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.argo argo \
  --namespace default \
  --name argo

# Apply to server.
$ ks apply default -c argo
```

[rootReadme]: https://github.com/ksonnet/mixins
