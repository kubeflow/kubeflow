## ks registry describe

Describe a ksonnet registry and the packages it contains

### Synopsis


The `describe` command outputs documentation for the ksonnet registry identified
by `<registry-name>`. Specifically, it displays the following:

1. Registry URI
2. Protocol (e.g. `github`)
3. List of packages included in the registry

### Related Commands

* `ks pkg install` — Install a package (e.g. extra prototypes) for the current ksonnet app

### Syntax


```
ks registry describe <registry-name> [flags]
```

### Options

```
  -h, --help   help for describe
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks registry](ks_registry.md)	 - Manage registries for current project

