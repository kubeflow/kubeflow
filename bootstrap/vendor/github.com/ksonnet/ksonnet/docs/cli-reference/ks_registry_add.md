## ks registry add

Add a registry to the current ksonnet app

### Synopsis


The `add` command allows custom registries to be added to your ksonnet app,
provided that their file structures follow the appropriate schema. *You can look
at the `incubator` repo (https://github.com/ksonnet/parts/tree/master/incubator)
as an example.*

A registry is uniquely identified by its:

1. Name (e.g. `incubator`)
2. Version (e.g. `master`)

There are two supported registry protocols: **github** and **fs**.

GitHub registries expect a path in a GitHub repository, and filesystem based
registries expect a path on the local filesystem.

During creation, all registries must specify a unique name and URI where the
registry lives. Optionally, a version can be provided (e.g. the *Github branch
name*). If a version is not specified, it will default to `latest`.

Registries can be overridden with `--override`.  Overridden registries
are stored in `app.override.yaml` and can be safely ignored using your
SCM configuration.

### Related Commands

* `ks registry list` — List all registries known to the current ksonnet app.

### Syntax


```
ks registry add <registry-name> <registry-uri> [flags]
```

### Examples

```
# Add a registry with the name 'databases' at the uri 'github.com/example'
ks registry add databases github.com/example

# Add a registry with the name 'databases' at the uri
# 'github.com/example/tree/master/reg' and the version (branch name) 0.0.1
# NOTE that "0.0.1" overrides the branch name in the URI ("master")
ks registry add databases github.com/example/tree/master/reg --version=0.0.1
```

### Options

```
  -h, --help             help for add
  -o, --override         Store in override configuration
      --version string   Version of the registry to add
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks registry](ks_registry.md)	 - Manage registries for current project

