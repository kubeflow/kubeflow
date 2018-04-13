# Command line reference

Ksonnet provides a CLI (invoked with [`ks`](ks.md)) that allows you to generate Kubernetes resource manifests locally (in `jsonnet`) and synchronize them with your remote cluster(s).

*The files in this directory enumerate each of the possible `ks` commands and their flags. Note that you can also find this info with the CLI itself, using the `--help` flag.*

Suggested command usage is described below:

## Getting started

* Set up a ksonnet [*application*](/docs/concepts.md#application)
  * [`ks init`](ks_init.md)

* Generate [*components*](/docs/concepts.md#component) for your app (e.g. Redis)
  * [`ks generate`](ks_generate.md) (alias of [`ks prototype use`](ks_prototype_use.md))

* Deploy to a cluster
  * [`ks apply`](ks_apply.md)

* Delete resources running on a cluster
  * [`ks delete`](ks_delete.md)  

## Fancier components

* Learn about existing [*prototypes*](/docs/concepts.md#prototype) ([`ks prototype`](ks_prototype.md))
  * [`ks prototype list`](ks_prototype_list.md)
  * [`ks prototype search`](ks_prototype_search.md)
  * [`ks prototype describe`](ks_prototype_describe.md)
  * [`ks prototype preview`](ks_prototype_preview.md)

* Learn about and download currently available [*packages*](/docs/concepts.md#package) ([`ks pkg`](ks_pkg.md))
  * [`ks pkg list`](ks_pkg_list.md)
  * [`ks pkg describe`](ks_pkg_describe.md)
  * [`ks pkg install`](ks_pkg_install.md)

* Learn about existing [*registries*](/docs/concepts.md#registry) ([`ks registry`](ks_registry.md))
  * [`ks registry list`](ks_registry_list.md)
  * [`ks registry describe `](ks_registry_describe.md)

## Environments

* Managing [*environments*](/docs/concepts.md#environment) ([`ks env`](ks_env.md))
  * [`ks env list`](ks_env_list.md)
  * [`ks env add`](ks_env_add.md)
  * [`ks env set`](ks_env_set.md)
  * [`ks env rm`](ks_env_rm.md)

* Customizing environments with [*parameters*](/docs/concepts.md#parameter) ([`ks param`](ks_param.md))
  * [`ks param list`](ks_param_list.md)
  * [`ks param set`](ks_param_set.md)

* Comparing environments
  * [`ks diff`](ks_diff.md)
  * [`ks param diff`](ks_param_diff.md)

## Miscellaneous

* View expanded manifests
  * [`ks show`](ks_show.md)

* Validate manifests against the Kubernetes API
  * [`ks validate`](ks_validate.md)

* View metadata about the ksonnet binary
  * [`ks version`](ks_version.md)
