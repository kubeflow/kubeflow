## ks param set

Change component or environment parameters (e.g. replica count, name)

### Synopsis


The `set` command sets component or environment parameters such as replica count
or name. Parameters are set individually, one at a time. All of these changes are
reflected in the `params.libsonnet` files.

For more details on how parameters are organized, see `ks param --help`.

*(If you need to customize multiple parameters at once, we suggest that you modify
your ksonnet application's  `components/params.libsonnet` file directly. Likewise,
for greater customization of environment parameters, we suggest modifying the
 `environments/:name/params.libsonnet` file.)*

### Related Commands

* `ks param diff` — Display differences between the component parameters of two environments
* `ks apply` — Apply local Kubernetes manifests (components) to remote clusters

### Syntax


```
ks param set <component-name> <param-key> <param-value> [flags]
```

### Examples

```

# Update the replica count of the 'guestbook' component to 4.
ks param set guestbook replicas 4

# Update the replica count of the 'guestbook' component to 2, but only for the
# 'dev' environment
ks param set guestbook replicas 2 --env=dev
```

### Options

```
      --env string   Specify environment to set parameters for
  -h, --help         help for set
  -i, --index int    Index in manifest
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks param](ks_param.md)	 - Manage ksonnet parameters for components and environments

