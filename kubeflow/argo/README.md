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
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.argo argo \
  --namespace default \
  --name argo

# Apply to server.
$ ks apply -c argo
```

[rootReadme]: https://github.com/ksonnet/mixins
