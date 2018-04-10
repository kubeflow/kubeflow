## ks param

Manage ksonnet parameters for components and environments

### Synopsis


Parameters are customizable fields that are used inside ksonnet *component*
manifests. Examples might include a deployment's 'name' or 'image'. Parameters
can also be defined on a *per-environment* basis. (Environments are ksonnet
deployment targets, e.g. specific clusters. For more info, run `ks env --help`.)

For example, this allows a `dev` and `prod` environment to use the same component
manifest for an nginx deployment, but customize `prod` to use more replicas to meet
heavier load demands.

Params are structured as follows:

* App params (stored in `components/params.libsonnet`)
    * Component-specific params
        * Originally populated from `ks generate`
        * e.g. 80 for `deployment-example.port`
    * Global params
        * Out of scope for CLI (requires Jsonnet editing)
        * Use to make a variable accessible to multiple components (e.g. service name)

* Per-environment params (stored in + `environments/<env-name>/params.libsonnet`)
    * Component-specific params ONLY
    * Override app params (~inheritance)

Note that all of these params are tracked **locally** in version-controllable
Jsonnet files.

----


```
ks param [flags]
```

### Options

```
  -h, --help   help for param
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks](ks.md)	 - Configure your application to deploy to a Kubernetes cluster
* [ks param delete](ks_param_delete.md)	 - Delete component or environment parameters
* [ks param diff](ks_param_diff.md)	 - Display differences between the component parameters of two environments
* [ks param list](ks_param_list.md)	 - List known component parameters
* [ks param set](ks_param_set.md)	 - Change component or environment parameters (e.g. replica count, name)

