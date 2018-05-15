## ks apply

Apply local Kubernetes manifests (components) to remote clusters

### Synopsis


The `apply`command uses local manifest(s) to update (and optionally create)
Kubernetes resources on a remote cluster. This cluster is determined by the
mandatory `<env-name>` argument.

The manifests themselves correspond to the components of your app, and reside
in your app's `components/` directory. When applied, the manifests are fully
expanded using the parameters of the specified environment.

By default, all component manifests are applied. To apply a subset of components,
use the `--component` flag, as seen in the examples below.

Note that this command needs to be run *within* a ksonnet app directory.

### Related Commands

* `ks diff` — Compare manifests, based on environment or location (local or remote)
* `ks delete` — Remove component-specified Kubernetes resources from remote clusters

### Syntax


```
ks apply <env-name> [-c <component-name>] [--dry-run] [flags]
```

### Examples

```

# Create or update all resources described in the ksonnet application, specifically
# the ones running in the 'dev' environment. This command works in any subdirectory
# of the app.
#
# This essentially deploys all components in the 'components/' directory.
ks apply dev

# Similar to the previous command, but does not immediately execute. Use this to
# see a preview of the cluster-changing actions.
ks apply dev --dry-run

# Create or update the single 'guestbook-ui' component of a ksonnet app, specifically
# the instance running in the 'dev' environment.
#
# This essentially deploys 'components/guestbook-ui.jsonnet'.
ks apply dev -c guestbook-ui

# Create or update multiple components in a ksonnet application (e.g. 'guestbook-ui'
# and 'ngin-depl') for the 'dev' environment. Does not create resources that are
# not already present on the cluster.
#
# This essentially deploys 'components/guestbook-ui.jsonnet' and
# 'components/nginx-depl.jsonnet'.
ks apply dev -c guestbook-ui -c nginx-depl --create false

```

### Options

```
      --as string                      Username to impersonate for the operation
      --as-group stringArray           Group to impersonate for the operation, this flag can be repeated to specify multiple groups.
      --certificate-authority string   Path to a cert file for the certificate authority
      --client-certificate string      Path to a client certificate file for TLS
      --client-key string              Path to a client key file for TLS
      --cluster string                 The name of the kubeconfig cluster to use
  -c, --component stringSlice          Name of a specific component (multiple -c flags accepted, allows YAML, JSON, and Jsonnet)
      --context string                 The name of the kubeconfig context to use
      --create                         Option to create resources if they do not already exist on the cluster (default true)
      --dry-run                        Option to preview the list of operations without changing the cluster state
  -V, --ext-str stringSlice            Values of external variables
      --ext-str-file stringSlice       Read external variable from a file
      --gc-tag string                  A tag that's (1) added to all updated objects (2) used to garbage collect existing objects that are no longer in the manifest
  -h, --help                           help for apply
      --insecure-skip-tls-verify       If true, the server's certificate will not be checked for validity. This will make your HTTPS connections insecure
  -J, --jpath stringSlice              Additional jsonnet library search path
      --kubeconfig string              Path to a kubeconfig file. Alternative to env var $KUBECONFIG.
  -n, --namespace string               If present, the namespace scope for this CLI request
      --password string                Password for basic authentication to the API server
      --request-timeout string         The length of time to wait before giving up on a single server request. Non-zero values should contain a corresponding time unit (e.g. 1s, 2m, 3h). A value of zero means don't timeout requests. (default "0")
      --resolve-images string          Change implementation of resolveImage native function. One of: noop, registry (default "noop")
      --resolve-images-error string    Action when resolveImage fails. One of ignore,warn,error (default "warn")
      --server string                  The address and port of the Kubernetes API server
      --skip-gc                        Option to skip garbage collection, even with --gc-tag specified
  -A, --tla-str stringSlice            Values of top level arguments
      --tla-str-file stringSlice       Read top level argument from a file
      --token string                   Bearer token for authentication to the API server
      --user string                    The name of the kubeconfig user to use
      --username string                Username for basic authentication to the API server
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks](ks.md)	 - Configure your application to deploy to a Kubernetes cluster

