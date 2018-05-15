# Modular Components and Cleaner Environments

Status: Pending

Version: Alpha

## Abstract

This document proposes to provide environments with an easier way of being
selective of which components to interact with. It also proposes to make
environments simpler.

## Motivation

The motivation behind this proposal is my user experience while trying to
onboard Heptio's internal infrastructure configuration files onto ksonnet.

The configuration files seem to commonly fall into one or more of these
patterns:

1. Configurations that are identical across environments (_i.e._, same in
   _prod_, _dev_, and _staging_).
2. Configurations that are nearly identical, however have simple parameters
   that need to be tweaked across environments (_i.e._, _prod_ accessing a
   different _mysql_ server than _dev_) 
3. Configurations that are similar, however, have large pieces of code that
   differ between environments and are not easily customizable by parameters.
4. Configurations that are distinctively used in a single environment.

ksonnet currently satisfies the use cases _1_ and _2_, however fall short on
_3_ and _4_.

## Goal

* Redundancy between component manifests should be kept minimal.
* It should be simple for an environment to only use a subset of all component
  manifests.
* It should be trivial to _add_ or _remove_ components from an environment.
* It should be trivial to _clone_ an environment.
* Environments should store the minimal amount of data necessary to operate
  a set of _components_ on a _k8s cluster_.
* The 4 use cases mentioned in _Motivation_ should be adequately satisfied.

## Existing State

To understand the remaining portions of this proposal, it is important to have
context of how environments and components are existingly structured.

This is the current directory structure of a typical ksonnet app:

```text
my-app
├── .ksonnet
├── app.yaml
├── components
│   ├── guestbook.jsonnet
│   ├── params.libsonnet
│   └── redis.jsonnet
├── environments
│   ├── base.libsonnet
│   ├── default
│   │   ├── .metadata
│   │   │   ├── k.libsonnet
│   │   │   ├── k8s.libsonnet
│   │   │   └── swagger.json
│   │   ├── main.jsonnet
│   │   ├── params.libsonnet
│   │   └── spec.json
│   ├── prod
│   │   ├── .metadata
│   │   │   ├── k.libsonnet
│   │   │   ├── k8s.libsonnet
│   │   │   └── swagger.json
│   │   ├── main.jsonnet
│   │   ├── params.libsonnet
│   │   └── spec.json
│   └── staging
│       ├── .metadata
│       │   ├── k.libsonnet
│       │   ├── k8s.libsonnet
│       │   └── swagger.json
│       ├── main.jsonnet
│       ├── params.libsonnet
│       └── spec.json
├── lib
└── vendor
```

The important points to notice are:

1. _components_ have a flat heirarchy, residing in the `components` directory.
   Components are shared across all environments.
2. _environments_ are "registered" if there exists a subdirectory in
   `environments` with the `spec.json` file. `spec.json` contains environment
   details, such as the cluster server URI and cluster namespace.
3. _environments_ each contain their own `.metadata` folder containing details
   of the _ksonnet-lib_ and _kubernetes_ versions being used by the respective
   environment.
4. There is a `base.libsonnet` file which acts as the execution entry point
   when interacting with the clusters specified by a environment. Each
   environment also contains a `main.libsonnet` file which acts as the
   "`base-libsonnet` override" file for each environment; allowing for
   functionality such as the exclusion of components from the specific
   environment.
5. Each environment also contains a `params.libsonnet` file that allows for
   tweaking of simple component parameters (_i.e._ MySQL host) for each
   environment.

## Proposal

1. Consolidate environment metadata files.
   * Each environment's `.metadata` directory currently store 3 files related to
   the generated `ksonnet-lib`. This is unecessary and also costly as the
   number of environments grow. We needn't store multiple copies of the same
   API version on disk. The Kubernetes API version that each environment uses
   can be recorded in the environment specification file. The metadata files
   can be locally cached once per k8s API version in `lib`.

2. A component should not be uniquely defined by it's base file name.
   * The existing implementation implies that there cannot be a `foo.jsonnet`
   and a `foo.yaml`, since the base file name is shared. Instead, a component
   should be identified by it's relative file path from the components
   directory.

3. Handle environment specifications in `app.yaml` and retire `spec.json`.
   * Multiple files and areas for configuration can cause confusions for users.
   In order to keep configurations simple, I propose that all ksonnet-specific
   _app-level_ configurations reside in the `app.yaml`.

   `app.yaml` would add an _environments_ section as follows:

   ```
   apiVersion: 0.0.1
   kind: ksonnet.io/app
   name: config
   version: 0.0.1
   registries:
     incubator:
       gitVersion:
         commitSha: ea3408d44c2d8ea4d321364e5533d5c60e74bce0
         refSpec: master
       protocol: github
       uri: github.com/ksonnet/parts/tree/master/incubator
   environments:
     dev:
       k8sVersion: 1.9.0
       destinations:
         - server: https://my-dev-server
           namespace: dev
       targets:
         - auth
         - dev
     staging:
       k8sVersion: 1.8.0
       destinations:
         - server: https://my-prod-server-1
           namespace: default
         - server: https://my-prod-server-2
           namespace: foo
       targets:
         - redis.jsonnet
         - auth
         - prod
   ```

   The _environments_ section operates similarly to the existing `spec.json` with
   the additions of:

   1. Support for multiple destinations. A _destination_ is a server, namespace
      pair. The configurations specified by the environment will be deployed to
      all destinations. Destinations can be overwritten locally; see the next
      point, _4_, for more details on this topic.
   2. The introduction of _targets_. _Targets_ are the component targets that an
      environment wishes to include in a deployment. _Target_ definitions are
      equivalent to the directory or file name of the component. If no targets
      are specified, all components are targeted by default. `main.jsonnet` will
      only operate on an environment's target components, while `base.libsonnet`
      will continue to operate on all components.
   3. The introduction of _k8sVersion_, the Kubernetes version the environment
      server is running on.

   Following the above `app.yaml` example, the users directory tree may look
   something like the following _(hidden files / directories are excluded)_:

   ```
   my-ksonnet-app
   ├── app.yaml
   ├── components
   │   ├── auth
   │   │   ├── ca-secret.jsonnet
   │   │   └── tls-certificate.jsonnet
   │   ├── dev
   │   │   └── memcached.jsonnet
   │   ├── params.libsonnet
   │   ├── prod
   │   │   └── database
   │   │       ├── db-secret.jsonnet
   │   │       ├── db-service.yaml
   │   │       └── db-stateful.jsonnet
   │   └── redis.jsonnet
   ├── environments
   │   ├── base.libsonnet
   │   ├── dev
   │   │   ├── main.jsonnet
   │   │   └── params.libsonnet
   │   └── prod
   │       ├── main.jsonnet
   │       └── params.libsonnet
   ├── lib
   └── vendor
   ```

   _Note_: There is no correlation between the environment _dev_ and the
   components directory _dev_; similarly, with _prod_. We are only calling it as
   such out of convenience. The user can call the components subdirectory whatever
   they desire, so long as it is specified as a _target_ in the `app.yaml` file
   for that environment.

   _Note 2_: The hierarchical nature of the components directory is optional. If
   the current state of ksonnet (_i.e._ with all components organized at a single
   layer) satisfies the user's use cases, there is no need to diverge from that
   model or specify _targets_. If no targets are specified, all components will
   be targeted by default.

4. Introduce `env.yaml` for overriding destination configurations.
   * `env.yaml` will reside as a top-level file in the environments directory.
   * This file is optional and does not need to be present in the ksonnet app.
   * The intentions for this file is for it to _not_ be checked into version
     control. A use case for this is for a team sharing a ksonnet app where
     their dev cluster destination is dependent on the operator / developer.
   * The contents of `env.yaml` may appear as follows:
     ```
     environments:
       dev:
         destinations:
           - server: https://my-local-dev-server
             namespace: dev
     ```

## User Experience

### Backwards compatibility

This change will be *not* be backwards-compatible due to the significant changes
in directory structure. We will need to decide whether the advantages outweigh
the cons.

### Alternative Considered

Instead of adding the environment configurations to `app.yaml`, it is also
considerable to add a `environment.yaml` to each environment.
