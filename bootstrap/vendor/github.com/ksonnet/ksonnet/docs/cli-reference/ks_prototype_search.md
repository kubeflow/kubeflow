## ks prototype search

Search for a prototype

### Synopsis


The `prototype search` command allows you to search for specific prototypes by name.
Specifically, it matches any prototypes with names that contain the string <name-substring>.

### Related Commands

* `ks prototype describe` — See more info about a prototype's output and usage
* `ks prototype list` — List all locally available ksonnet prototypes

### Syntax


```
ks prototype search <name-substring> [flags]
```

### Examples

```

# Search for prototypes with names that contain the string 'service'.
ks prototype search service
```

### Options

```
  -h, --help   help for search
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks prototype](ks_prototype.md)	 - Instantiate, inspect, and get examples for ksonnet prototypes

