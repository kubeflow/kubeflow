## ks env rm

Delete an environment from a ksonnet application

### Synopsis


The `rm` command deletes an environment from a ksonnet application. This is
the same as removing the `<env-name>` environment directory and all files
contained. All empty parent directories are also subsequently deleted.

NOTE: This does *NOT* delete the components running in `<env-name>`. To do that, you
need to use the `ks delete` command.

### Related Commands

* `ks env list` — List all locally available ksonnet prototypes
* `ks env add` — 
* `ks env set` — 
* `ks delete` — Delete all the app components running in an environment (cluster)

### Syntax


```
ks env rm <env-name> [flags]
```

### Examples

```

# Remove the directory 'environments/us-west/staging' and all of its contents.
# This will also remove the parent directory 'us-west' if it is empty.
ks env rm us-west/staging
```

### Options

```
  -h, --help       help for rm
  -o, --override   Remove the overridden environment
```

### Options inherited from parent commands

```
      --as string                      Username to impersonate for the operation
      --as-group stringArray           Group to impersonate for the operation, this flag can be repeated to specify multiple groups.
      --certificate-authority string   Path to a cert file for the certificate authority
      --client-certificate string      Path to a client certificate file for TLS
      --client-key string              Path to a client key file for TLS
      --cluster string                 The name of the kubeconfig cluster to use
      --context string                 The name of the kubeconfig context to use
      --insecure-skip-tls-verify       If true, the server's certificate will not be checked for validity. This will make your HTTPS connections insecure
      --kubeconfig string              Path to a kubeconfig file. Alternative to env var $KUBECONFIG.
  -n, --namespace string               If present, the namespace scope for this CLI request
      --password string                Password for basic authentication to the API server
      --request-timeout string         The length of time to wait before giving up on a single server request. Non-zero values should contain a corresponding time unit (e.g. 1s, 2m, 3h). A value of zero means don't timeout requests. (default "0")
      --server string                  The address and port of the Kubernetes API server
      --token string                   Bearer token for authentication to the API server
      --user string                    The name of the kubeconfig user to use
      --username string                Username for basic authentication to the API server
  -v, --verbose count[=-1]             Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks env](ks_env.md)	 - Manage ksonnet environments

