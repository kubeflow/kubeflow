## ks param list

List known component parameters

### Synopsis


The `list` command displays all known component parameters or environment parameters.

If a component is specified, this command displays all of its specific parameters.
If a component is NOT specified, parameters for **all** components are listed.
Furthermore, parameters can be listed on a per-environment basis.

### Related Commands

* `ks param set` — Change component or environment parameters (e.g. replica count, name)

### Syntax


```
ks param list [<component-name>] [--env <env-name>] [flags]
```

### Examples

```

# List all component parameters
ks param list

# List all parameters for the component "guestbook"
ks param list guestbook

# List all parameters for the environment "dev"
ks param list --env=dev

# List all parameters for the component "guestbook" in the environment "dev"
ks param list guestbook --env=dev
```

### Options

```
      --env string      Specify environment to list parameters for
  -h, --help            help for list
      --module string   Specify module to list parameters for
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks param](ks_param.md)	 - Manage ksonnet parameters for components and environments

