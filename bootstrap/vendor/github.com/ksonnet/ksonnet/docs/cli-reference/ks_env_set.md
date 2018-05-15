## ks env set

Set environment-specific fields (name, namespace, server)

### Synopsis


The `set` command lets you change the fields of an existing environment.
You can currently only update your environment's name.

Note that changing the name of an environment will also update the corresponding
directory structure in `environments/`.

### Related Commands

* `ks env list` — List all environments in a ksonnet application

### Syntax


```
ks env set <env-name> [flags]
```

### Examples

```
#Update the name of the environment 'us-west/staging'.
# Updating the name will update the directory structure in 'environments/'.
ks env set us-west/staging --name=us-east/staging
```

### Options

```
  -h, --help          help for set
      --name string   Name used to uniquely identify the environment. Must not already exist within the ksonnet app
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

