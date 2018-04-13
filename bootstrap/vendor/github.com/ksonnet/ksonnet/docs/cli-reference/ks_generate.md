## ks generate

Use the specified prototype to generate a component manifest

### Synopsis


The `generate` command (aliased from `prototype use`) generates Kubernetes-
compatible, Jsonnet manifests for components in your ksonnet app. Each component
corresponds to a single manifest in the `components/` directory. This manifest
can define one or more Kubernetes resources, and is generated from a ksonnet
*prototype* (a customizable, reusable Kubernetes configuration snippet).

1. The first argument, the **prototype name**, can either be fully qualified
(e.g. `io.ksonnet.pkg.single-port-service`) or a partial match (e.g. `service`).
If using a partial match, note that any ambiguity in resolving the name will
result in an error.

2. The second argument, the **component name**, determines the filename for the
generated component manifest. For example, the following command will expand
template `io.ksonnet.pkg.single-port-deployment` and place it in the
file `components/nginx-depl.jsonnet` . Note that by default ksonnet will
expand prototypes into Jsonnet files.

       ks prototype use io.ksonnet.pkg.single-port-deployment nginx-depl \
         --image=nginx

  If the optional `--name` tag is not specified, all Kubernetes API resources
  declared by this prototype use this argument as their own `metadata.name`

3. Prototypes can be further customized by passing in **parameters** via additional
command line flags, such as  `--image` in the example above. Note that
different prototypes support their own unique flags.

### Related Commands

* `ks show` — Show expanded manifests for a specific environment.
* `ks apply` — Apply local Kubernetes manifests (components) to remote clusters
* `ks param set` Change component or environment parameters (e.g. replica count, name)

### Syntax


```
ks generate <prototype-name> <component-name> [type] [parameter-flags] [flags]
```

### Examples

```

# Instantiate prototype 'io.ksonnet.pkg.single-port-deployment', using the
# 'nginx' image. The expanded prototype is placed in
# 'components/nginx-depl.jsonnet'.
# The associated Deployment has metadata.name 'nginx-depl'.
ks prototype use io.ksonnet.pkg.single-port-deployment nginx-depl \
  --image=nginx

# Instantiate prototype 'io.ksonnet.pkg.single-port-deployment' using the
# suffix, 'deployment'. (This works unless there is an ambiguity, e.g. another
# prototype with 'deployment' in its name.) The expanded prototype is again
# placed in 'components/nginx-depl.jsonnet'.
# The associated Deployment has metadata.name 'nginx' instead of 'nginx-depl'
# (due to --name).
ks prototype use deployment nginx-depl \
  --name=nginx                         \
  --image=nginx
```

### Options

```
  -h, --help   help for generate
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks](ks.md)	 - Configure your application to deploy to a Kubernetes cluster

