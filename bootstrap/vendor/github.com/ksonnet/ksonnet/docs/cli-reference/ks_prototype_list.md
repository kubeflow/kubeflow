## ks prototype list

List all locally available ksonnet prototypes

### Synopsis


The `list` command displays all prototypes that are available locally, as
well as brief descriptions of what they generate.

ksonnet comes with a set of system prototypes that you can use out-of-the-box
(e.g. `io.ksonnet.pkg.configMap`). However, you can use more advanced
prototypes like `io.ksonnet.pkg.redis-stateless` by downloading extra packages
from the *incubator* registry.

### Related Commands

* `ks prototype describe` — See more info about a prototype's output and usage
* `ks prototype preview` — Preview a prototype's output without creating a component (stdout)
* `ks prototype use` — Use the specified prototype to generate a component manifest
* `ks pkg install` Install a package (e.g. extra prototypes) for the current ksonnet app

### Syntax


```
ks prototype list [flags]
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

* [ks prototype](ks_prototype.md)	 - Instantiate, inspect, and get examples for ksonnet prototypes

