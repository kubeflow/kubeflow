## ks show

Show expanded manifests for a specific environment.

### Synopsis


Show expanded manifests (resource definitions) for a specific environment.
Jsonnet manifests, each defining a ksonnet component, are expanded into their
JSON or YAML equivalents (YAML is the default). Any parameters in these Jsonnet
manifests are resolved based on environment-specific values.

When NO component is specified (no `-c` flag), this command expands all of
the files in the `components/` directory into a list of resource definitions.
This is the YAML version of what gets deployed to your cluster with
`ks apply <env-name>`.

When a component IS specified via the `-c` flag, this command only expands the
manifest for that particular component.

### Related Commands

* `ks validate` — Check generated component manifests against the server's API
* `ks apply` — Apply local Kubernetes manifests (components) to remote clusters

### Syntax


```
ks show <env> [-c <component-filename>] [flags]
```

### Examples

```

# Show all of the components for the 'dev' environment, in YAML
# (In other words, expands all manifests in the components/ directory)
ks show dev

# Show a single component from the 'prod' environment, in JSON
ks show prod -c redis -o json

# Show multiple components from the 'dev' environment, in YAML
ks show dev -c redis -c nginx-server

```

### Options

```
  -c, --component stringSlice         Name of a specific component (multiple -c flags accepted, allows YAML, JSON, and Jsonnet)
  -V, --ext-str stringSlice           Values of external variables
      --ext-str-file stringSlice      Read external variable from a file
  -o, --format string                 Output format.  Supported values are: json, yaml (default "yaml")
  -h, --help                          help for show
  -J, --jpath stringSlice             Additional jsonnet library search path
      --resolve-images string         Change implementation of resolveImage native function. One of: noop, registry (default "noop")
      --resolve-images-error string   Action when resolveImage fails. One of ignore,warn,error (default "warn")
  -A, --tla-str stringSlice           Values of top level arguments
      --tla-str-file stringSlice      Read top level argument from a file
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks](ks.md)	 - Configure your application to deploy to a Kubernetes cluster

