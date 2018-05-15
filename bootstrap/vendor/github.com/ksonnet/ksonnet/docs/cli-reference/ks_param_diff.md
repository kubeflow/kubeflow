## ks param diff

Display differences between the component parameters of two environments

### Synopsis


The `diff` command pretty prints differences between the component parameters
of two environments.

By default, the diff is performed for all components. Diff-ing for a single component
is supported via a component flag.

### Related Commands

* `ks param set` — Change component or environment parameters (e.g. replica count, name)
* `ks apply` — Apply local Kubernetes manifests (components) to remote clusters

### Syntax


```
ks param diff <env1> <env2> [--component <component-name>] [flags]
```

### Examples

```

# Diff between all component parameters for environments 'dev' and 'prod'
ks param diff dev prod

# Diff only between the parameters for the 'guestbook' component for environments
# 'dev' and 'prod'
ks param diff dev prod --component=guestbook
```

### Options

```
      --component string   Specify the component to diff against
  -h, --help               help for diff
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks param](ks_param.md)	 - Manage ksonnet parameters for components and environments

