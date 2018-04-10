## ks validate

Check generated component manifests against the server's API

### Synopsis


The `validate` command checks that an application or file is compliant with the
server API's Kubernetes specification. Note that this command actually communicates
*with* the server for the specified `<env-name>`, so it only works if your
$KUBECONFIG specifies a valid kubeconfig file.

When NO component is specified (no `-c` flag), this command checks all of
the files in the `components/` directory. This is the same as what would
get deployed to your cluster with `ks apply <env-name>`.

When a component IS specified via the `-c` flag, this command only checks
the manifest for that particular component.

### Related Commands

* `ks show` — Show expanded manifests for a specific environment.
* `ks apply` — Apply local Kubernetes manifests (components) to remote clusters

### Syntax


```
ks validate <env-name> [-c <component-name>] [flags]
```

### Examples

```

# Validate all resources described in the ksonnet app, against the server
# specified by the 'dev' environment.
# NOTE: Make sure your current $KUBECONFIG matches the 'dev' cluster info
ksonnet validate dev

# Validate resources from the 'redis' component only, against the server specified
# by the 'prod' environment
# NOTE: Make sure your current $KUBECONFIG matches the 'prod' cluster info
ksonnet validate prod -c redis

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
  -h, --help                           help for validate
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

