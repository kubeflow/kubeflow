## ks registry list

List all registries known to the current ksonnet app.

### Synopsis


The `list` command displays all known ksonnet registries in a table. This
table includes the following info:

1. Registry name
2. Protocol (e.g. `github`)
3. Registry URI

### Related Commands

* `ks registry describe` — Describe a ksonnet registry and the packages it contains

### Syntax


```
ks registry list [flags]
```

### Options

```
  -h, --help   help for list
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks registry](ks_registry.md)	 - Manage registries for current project

