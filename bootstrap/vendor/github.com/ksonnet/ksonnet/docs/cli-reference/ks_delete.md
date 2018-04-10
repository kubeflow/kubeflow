## ks delete

Remove component-specified Kubernetes resources from remote clusters

### Synopsis


The `delete` command removes Kubernetes resources (described in local
*component* manifests) from a cluster. This cluster is determined by the mandatory
`<env-name>`argument.

An entire ksonnet application can be removed from a cluster, or just its specific
components.

**This command can be considered the inverse of the `ks apply` command.**

### Related Commands

* `ks diff` — Compare manifests, based on environment or location (local or remote)
* `ks apply` — Apply local Kubernetes manifests (components) to remote clusters

### Syntax


```
ks delete [env-name] [-c <component-name>] [flags]
```

### Examples

```
# Delete resources from the 'dev' environment, based on ALL of the manifests in your
# ksonnet app's 'components/' directory. This command works in any subdirectory
# of the app.
ks delete dev

# Delete resources described by the 'nginx' component. $KUBECONFIG is overridden by
# the CLI-specified './kubeconfig', so these changes are deployed to the current
# context's cluster (not the 'default' environment)
ks delete --kubeconfig=./kubeconfig -c nginx
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
  -V, --ext-str stringSlice            Values of external variables
      --ext-str-file stringSlice       Read external variable from a file
      --grace-period int               Number of seconds given to resources to terminate gracefully. A negative value is ignored (default -1)
  -h, --help                           help for delete
      --insecure-skip-tls-verify       If true, the server's certificate will not be checked for validity. This will make your HTTPS connections insecure
  -J, --jpath stringSlice              Additional jsonnet library search path
      --kubeconfig string              Path to a kubeconfig file. Alternative to env var $KUBECONFIG.
  -n, --namespace string               If present, the namespace scope for this CLI request
      --password string                Password for basic authentication to the API server
      --request-timeout string         The length of time to wait before giving up on a single server request. Non-zero values should contain a corresponding time unit (e.g. 1s, 2m, 3h). A value of zero means don't timeout requests. (default "0")
      --resolve-images string          Change implementation of resolveImage native function. One of: noop, registry (default "noop")
      --resolve-images-error string    Action when resolveImage fails. One of ignore,warn,error (default "warn")
      --server string                  The address and port of the Kubernetes API server
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

