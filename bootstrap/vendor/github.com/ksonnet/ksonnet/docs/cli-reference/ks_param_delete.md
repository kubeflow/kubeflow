## ks param delete

Delete component or environment parameters

### Synopsis


The `delete` command deletes component or environment parameters.

### Related Commands

* `ks param set` — Change component or environment parameters (e.g. replica count, name)
* `ks param diff` — Display differences between the component parameters of two environments
* `ks apply` — Apply local Kubernetes manifests (components) to remote clusters

### Syntax


```
ks param delete <component-name> <param-key> [flags]
```

### Examples

```

# Delete 'guestbook' component replica parameter
ks param delete guestbook replicas

# Delete 'guestbook' component replicate in 'dev' environment
ks param delete guestbook replicas --env=dev
```

### Options

```
      --env string   Specify environment to delete parameter from
  -h, --help         help for delete
  -i, --index int    Index in manifest
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks param](ks_param.md)	 - Manage ksonnet parameters for components and environments

