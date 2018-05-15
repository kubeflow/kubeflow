## ks pkg

Manage packages and dependencies for the current ksonnet application

### Synopsis


A ksonnet package contains:

* A set of prototypes (see `ks prototype --help` for more info on prototypes), which
generate similar types of components (e.g. `redis-stateless`, `redis-persistent`)
* Associated helper libraries that define the prototype parts (e.g. `redis.libsonnet`)

Packages allow you to easily distribute and reuse code in any ksonnet application.
Packages come from registries, such as Github repositories. (For more info, see
`ks registry --help`).

To be recognized and imported by ksonnet, packages need to follow a specific schema.
See the annotated file tree below, as an example:

```
.
├── README.md                      // Human-readable description of the package
├── parts.yaml                     // Provides metadata about the package
├── prototypes                     // Can be imported and used to generate components
│   ├── redis-all-features.jsonnet
│   ├── redis-persistent.jsonnet
│   └── redis-stateless.jsonnet
└── redis.libsonnet                // Helper library, includes prototype parts
```
---


```
ks pkg [flags]
```

### Options

```
  -h, --help   help for pkg
```

### Options inherited from parent commands

```
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

### SEE ALSO

* [ks](ks.md)	 - Configure your application to deploy to a Kubernetes cluster
* [ks pkg describe](ks_pkg_describe.md)	 - Describe a ksonnet package and its contents
* [ks pkg install](ks_pkg_install.md)	 - Install a package (e.g. extra prototypes) for the current ksonnet app
* [ks pkg list](ks_pkg_list.md)	 - List all packages known (downloaded or not) for the current ksonnet app

