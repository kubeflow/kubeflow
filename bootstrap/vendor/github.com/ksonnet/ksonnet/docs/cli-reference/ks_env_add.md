## ks env add

Add a new environment to a ksonnet application

### Synopsis


The `add` command creates a new environment (specifically for the ksonnet app
whose directory it's executed in). This environment is cached with the following
info:

1. **Name** — A string used to uniquely identify the environment.
2. **Server** — The address and port of a Kubernetes API server (i.e. cluster).
3. **Namespace**  — A Kubernetes namespace. *Must already exist on the cluster.*
4. **Kubernetes API Version**  — Used to generate a library with compatible type defs.

(1) is mandatory. (2) and (3) can be inferred from $KUBECONFIG, *or* from the
`--kubeconfig` or `--context` flags. Otherwise, (2), (3), and (4) can all be
specified by individual flags. Unless otherwise specified, (4) defaults to the
latest Kubernetes version that ksonnet supports.

Note that an environment *DOES NOT* contain user-specific data such as private keys.

### Related Commands

* `ks env list` — List all locally available ksonnet prototypes
* `ks env rm` — 
* `ks env set` — 
* `ks param set` — Change component or environment parameters (e.g. replica count, name)
* `ks apply` — Apply local Kubernetes manifests (components) to remote clusters

### Syntax


```
ks env add <env-name> [flags]
```

### Examples

```

# Initialize a new environment, called "staging". No flags are set, so 'server'
# and 'namespace' info are pulled from the file specified by $KUBECONFIG.
# 'version' defaults to the latest that ksonnet supports.
ks env add us-west/staging

# Initialize a new environment called "us-west/staging" with the pre-existing
# namespace 'staging'. 'version' is specified, so the OpenAPI spec from the
# Kubernetes v1.7.1 build is used to generate the helper library 'ksonnet-lib'.
#
# NOTE: "us-west/staging" indicates a hierarchical structure, so the env-specific
# files here are saved in "<ksonnet-app-root>/environments/us-west/staging".
ks env add us-west/staging --api-spec=version:v1.7.1 --namespace=staging

# Initialize a new environment "my-env" using the "dev" context in your current
# kubeconfig file ($KUBECONFIG).
ks env add my-env --context=dev

# Initialize a new environment "prod" using the address of a cluster's Kubernetes
# API server.
ks env add prod --server=https://ksonnet-1.us-west.elb.amazonaws.com
```

### Options

```
      --api-spec string   Manually specify API version from OpenAPI schema, cluster, or Kubernetes version (default "version:v1.7.0")
  -h, --help              help for add
  -o, --override          Add environment as override
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

