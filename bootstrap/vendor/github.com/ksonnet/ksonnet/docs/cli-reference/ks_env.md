## ks env

Manage ksonnet environments

### Synopsis


An environment is a deployment target for your ksonnet app and its constituent
components. You can use ksonnet to deploy a given app to *multiple* environments,
such as `dev` and `prod`.

Intuitively, an environment acts as a sort of "named cluster", similar to a
Kubernetes context. (Running `ks env add --help` provides more detail
about the fields that you need to create an environment).

**All of this environment info is cached in local files**. Environments are
represented as a hierarchy in the `environments/` directory of a ksonnet app, like
'default' and 'us-west/staging' in the example below.

```
├── environments
│   ├── base.libsonnet
│   ├── default                      // Default generated environment ('ks init')
│   │   ├── .metadata
│   │   │   ├── k.libsonnet
│   │   │   ├── k8s.libsonnet
│   │   │   └── swagger.json
│   │   ├── main.jsonnet
│   │   ├── params.libsonnet
│   │   └── spec.json
│   └── us-west
│       └── staging                  // Example of user-generated env ('ks env add')
│           ├── .metadata
│           │   ├── k.libsonnet      // Jsonnet library with Kubernetes-compatible types and definitions
│           │   ├── k8s.libsonnet
│           │   └── swagger.json
│           ├── main.libsonnet       // Main file that imports all components (expanded on apply, delete, etc). Add environment-specific logic here.
│           ├── params.libsonnet     // Customize components *per-environment* here.
│           └── spec.json            // Contains the environment's API server address and namespace
```
----


```
ks env [flags]
```

### Options

```
      --as string                      Username to impersonate for the operation
      --as-group stringArray           Group to impersonate for the operation, this flag can be repeated to specify multiple groups.
      --certificate-authority string   Path to a cert file for the certificate authority
      --client-certificate string      Path to a client certificate file for TLS
      --client-key string              Path to a client key file for TLS
      --cluster string                 The name of the kubeconfig cluster to use
      --context string                 The name of the kubeconfig context to use
  -h, --help                           help for env
      --insecure-skip-tls-verify       If true, the server's certificate will not be checked for validity. This will make your HTTPS connections insecure
      --kubeconfig string              Path to a kubeconfig file. Alternative to env var $KUBECONFIG.
  -n, --namespace string               If present, the namespace scope for this CLI request
      --password string                Password for basic authentication to the API server
      --request-timeout string         The length of time to wait before giving up on a single server request. Non-zero values should contain a corresponding time unit (e.g. 1s, 2m, 3h). A value of zero means don't timeout requests. (default "0")
      --server string                  The address and port of the Kubernetes API server
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
* [ks env add](ks_env_add.md)	 - Add a new environment to a ksonnet application
* [ks env describe](ks_env_describe.md)	 - describe
* [ks env list](ks_env_list.md)	 - List all environments in a ksonnet application
* [ks env rm](ks_env_rm.md)	 - Delete an environment from a ksonnet application
* [ks env set](ks_env_set.md)	 - Set environment-specific fields (name, namespace, server)
* [ks env targets](ks_env_targets.md)	 - targets

