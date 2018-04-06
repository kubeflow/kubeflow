## ks pkg describe

Describe a ksonnet package and its contents

### Synopsis


The `describe` command outputs documentation for a package that is available
(e.g. downloaded) in the current ksonnet application. (This must belong to an already
known `<registry-name>` like *incubator*). The output includes:

1. The library name
2. A brief description provided by the library authors
3. A list of available prototypes provided by the library

### Related Commands

* `ks pkg list` — List all packages known (downloaded or not) for the current ksonnet app
* `ks prototype describe` — See more info about a prototype's output and usage
* `ks generate` — Use the specified prototype to generate a component manifest

### Syntax


```
ks pkg describe [<registry-name>/]<package-name> [flags]
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

* [ks pkg](ks_pkg.md)	 - Manage packages and dependencies for the current ksonnet application

