## ks prototype

Instantiate, inspect, and get examples for ksonnet prototypes

### Synopsis


Use the `prototype` subcommands to manage, inspect, instantiate, and get
examples for ksonnet prototypes.

Prototypes are pre-written but incomplete Kubernetes manifests, with "holes"
(parameters) that can be filled in with the ksonnet CLI or manually. For example,
the prototype `io.ksonnet.pkg.single-port-deployment` requires a name and image,
and the ksonnet CLI can expand this into a fully-formed 'Deployment' object.

These complete manifests are output into your `components/` directory. In other
words, prototypes provide the basis for the **components** of your app. You can
use prototypes to autogenerate boilerplate code and focus on customizing them
for your use case.

----


```
ks prototype [flags]
```

### Options

```
  -h, --help   help for prototype
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks](ks.md)	 - Configure your application to deploy to a Kubernetes cluster
* [ks prototype describe](ks_prototype_describe.md)	 - See more info about a prototype's output and usage
* [ks prototype list](ks_prototype_list.md)	 - List all locally available ksonnet prototypes
* [ks prototype preview](ks_prototype_preview.md)	 - Preview a prototype's output without creating a component (stdout)
* [ks prototype search](ks_prototype_search.md)	 - Search for a prototype
* [ks prototype use](ks_prototype_use.md)	 - Use the specified prototype to generate a component manifest

