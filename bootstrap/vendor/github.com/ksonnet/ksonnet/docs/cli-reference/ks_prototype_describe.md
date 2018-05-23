## ks prototype describe

See more info about a prototype's output and usage

### Synopsis


This command outputs documentation, examples, and other information for
the specified prototype (identified by name). Specifically, this describes:

  1. What sort of component is generated
  2. Which parameters (required and optional) can be passed in via CLI flags
     to customize the component
  3. The file format of the generated component manifest (currently, Jsonnet only)

### Related Commands

* `ks prototype preview` — Preview a prototype's output without creating a component (stdout)
* `ks prototype use` — Use the specified prototype to generate a component manifest

### Syntax


```
ks prototype describe <prototype-name> [flags]
```

### Examples

```

# Display documentation about the prototype 'io.ksonnet.pkg.single-port-deployment'
ks prototype describe deployment
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

* [ks prototype](ks_prototype.md)	 - Instantiate, inspect, and get examples for ksonnet prototypes

