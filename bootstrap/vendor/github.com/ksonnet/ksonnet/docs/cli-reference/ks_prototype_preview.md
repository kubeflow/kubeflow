## ks prototype preview

Preview a prototype's output without creating a component (stdout)

### Synopsis


This `preview` command expands a prototype with CLI flag parameters, and
emits the resulting manifest to stdout. This allows you to see the potential
output of a `ks generate` command without actually creating a new component file.

The output is formatted in Jsonnet. To see YAML or JSON equivalents, first create
a component with `ks generate` and then use `ks show`.

### Related Commands

* `ks generate` — Use the specified prototype to generate a component manifest

### Syntax


```
ks prototype preview <prototype-name> [parameter-flags] [flags]
```

### Examples

```

# Preview prototype 'io.ksonnet.pkg.single-port-deployment', using the
# 'nginx' image, and port 80 exposed.
ks prototype preview single-port-deployment \
  --name=nginx                              \
  --image=nginx                             \
  --port=80
```

### Options

```
  -h, --help   help for preview
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks prototype](ks_prototype.md)	 - Instantiate, inspect, and get examples for ksonnet prototypes

