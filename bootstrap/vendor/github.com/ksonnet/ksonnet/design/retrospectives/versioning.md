# Versioning in ksonnet

## How it works now

A typical ksonnet application will depend on a set of _packages_ that are
obtained from collections called _registries_. When a command like `ks pkg
install incubator/nginx@latest` is run, several things must happen in sequence:

1. We resolve the registry name `incubator` to a registry specification that is
   cached locally. `incubator` is the name the current application gives to some
   registry. This specification for this registry pinned to a specific version
   of the registry, and contains a collection of packages to install, as well as
   available versions at the time it was cached.
1. We look inside the resolved registry specification for a library called
   `nginx`, and we attempt to find the version `latest`. In the future,
   `@latest` will have special meaning, so that the client chooses the last
   version in a list of versions; today that would just be a version name.
1. Once we resolve this library, we can retrieve it from the remote registry
   using the information specified.

At each point, we rely in a critical way on a notion of versions:

* The API schema for each of these specifications files is versioned:
  * `app.yaml`, which contains the registry reference (_i.e._, the name
    `incubator`, and what version specifically that name refers to), as well as
    the list of packages the application is dependent on.
  * `registry.yaml`, which contains the cached specification of the registry we
    resolve the name to, including the names and versions of available packages.
  * `parts.yaml`, which contains the specification of a vendored package the
    application depends on.
* Each instance of each of these specifications also contains a version:
  * A specific version of `registry.yaml` was obtained when we called `registry
    add`.
  * A specific version of each `parts.yaml` was obtained when we called `pkg
    install`.

## Problems

The main problem is that most of these versions are not actually enforced:

* None of the API schema versions (for `app.yaml`, `registry.yaml`, or
  `parts.yaml`) are enforced.
* API versions on prototypes are not enforced.
* Prototypes in `incubator` actually refer to the `incubator` directory in their
  imports (_e.g._, `import "incubator/foo/foo.libsonnet"`); but, all registry
  names are specific to a ksonnet app. So, for example, these imports will fail
  in the event the registry is called something other than `incubator`.
* When we `pkg install`, we default to `@master`. This is almost never what we
  want; instead, we want a notion of `@latest`, which will choose _the last
  named version_. `master`, in contrast, is just a normal refspec, and
  consistently changes.
* Package versions are not enforced or checked for sanity. And indeed, when we
  `pkg install`, we actually write down the wrong version when we add the
  dependency to `app.yaml`.

## Proposed solutions

For 0.8.1:

* Check and enforce all API versions.
* Create a tag in `ksonnet/parts` called `incubator-v0.1.0`, and hae `ks` 0.8.1
  use the version of the registry at that tag by default.

For 0.9.0:

* Since we're pre-1.0, we should break `master` immediately, and simply ask
  people to upgrade to 0.8.1. We should break `master` in a way that is obvious
  (_e.g._, deleting the `master` branch), so that users are not too confused,
  and then add an issue with the error message they will encounter so that they
  are able to find quick resolution.
* Implement `@latest` as default version, which will choose the last named
  version, and install that.
* Phase out including registry name in prototypes.
* Add `registry upgrade` and `registry delete`.
