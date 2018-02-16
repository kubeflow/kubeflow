# Centraldash

> Prototypes for deploying Centraldash


* [Quickstart](#quickstart)
* [Using Prototypes](#using-prototypes)
  * [io.ksonnet.pkg.centraldash](#io.ksonnet.pkg.centraldash)

## Quickstart

*The following commands use the `io.ksonnet.pkg.centraldash` prototype to deploy the Centraldash on your Kubernetes cluster*

First, create a cluster and install the ksonnet CLI (see root-level [README.md](rootReadme)).

If you haven't yet created a [ksonnet application](linkToSomewhere), do so using `ks init <app-name>`.

Finally, in the ksonnet application directory, run the following:

```shell
# Expand prototype as a Jsonnet file, place in a file in the
# `components/` directory. (YAML and JSON are also available.)
$ ks prototype use io.ksonnet.pkg.centraldash centraldash \
  --namespace default \
  --name centraldash

# Apply to server.
$ ks apply -c centraldash
```

[rootReadme]: https://github.com/ksonnet/mixins
