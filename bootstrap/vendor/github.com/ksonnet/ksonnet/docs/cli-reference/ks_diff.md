## ks diff

Compare manifests, based on environment or location (local or remote)

### Synopsis


The `diff` command displays standard file diffs, and can be used to compare manifests
based on *environment* or location ('local' ksonnet app manifests or what's running
on a 'remote' server).

Using this command, you can compare:

1. *Remote* and *local* manifests for a single environment
2. *Remote* manifests for two separate environments
3. *Local* manifests for two separate environments
4. A *remote* manifest in one environment and a *local* manifest in another environment

To see the official syntax, see the examples below. Make sure that your $KUBECONFIG
matches what you've defined in environments.

When NO component is specified (no `-c` flag), this command diffs all of
the files in the `components/` directory.

When a component IS specified via the `-c` flag, this command only checks
the manifest for that particular component.

### Related Commands

* `ks param diff` — Display differences between the component parameters of two environments

### Syntax


```
ks diff <location1:env1> [location2:env2] [-c <component-name>] [flags]
```

### Examples

```

# Show diff between remote and local manifests for a single 'dev' environment.
# This command diffs *all* components in the ksonnet app, and can be used in any
# of that app's subdirectories.
ks diff remote:dev local:dev

# Shorthand for the previous command (remote 'dev' and local 'dev')
ks diff dev

# Show diff between the remote resources running in two different ksonnet environments
# 'us-west/dev' and 'us-west/prod'. This command diffs all resources defined in
# the ksonnet app.
ks diff remote:us-west/dev remote:us-west/prod

# Show diff between local manifests in the 'us-west/dev' environment and remote
# resources in the 'us-west/prod' environment, for an entire ksonnet app
ks diff local:us-west/dev remote:us-west/prod

# Show diff between what's in the local manifest and what's actually running in the
# 'dev' environment, but for the Redis component ONLY
ks diff dev -c redis

```

### Options

```
  -c, --component stringSlice         Name of a specific component (multiple -c flags accepted, allows YAML, JSON, and Jsonnet)
      --diff-strategy string          Diff strategy, all or subset. (default "all")
  -V, --ext-str stringSlice           Values of external variables
      --ext-str-file stringSlice      Read external variable from a file
  -h, --help                          help for diff
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

