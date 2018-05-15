# `ks registry update` and `ks registry delete`

Status: Pending

Version: Alpha

## Abstract

This proposal describes `ks registry update` and `ks registry delete`, commands
that will allow users to update and delete the local cache of their registry.
This is intended to provide a clear path for users to obtain new libraries that
have been added to the source registry, as well as new versions of old libraries
in a registry.

## Motivation

The `ks` client tool currently allows user to manage _registries_—collections of
_packages_ that can be installed and used in the local ksonnet application.

Managing the local cache of a registry when the two diverge is a major painpoint
in the `ks` client tool. In particular, `ks` currently does not have the ability
either to update the registry, or to delete a registry, so when a new package is
added to a remote registry, in order to obtain it, they must:

1. figure out how registries work (_i.e._, via the registry specification in a
   YAML file), and
2. manually update their registry spec files (and possibly script it, as [this
   user has done])

Since users are now creating their own custom registries, we can't afford for
this part of the workflow to be painful.

The related issue is captured in [#237][237].

## Goal

* Make it trivial to additively refresh registries (_i.e._, most updates should
  be one command).
* Make it trivial to delete a registry (_i.e._, if we don't depend on anything
  from a registry, it should take one command).
* The `registry update` and `registry delete` commands should output a
  trivially-consumable summary of changes that are being incorporated. (_e.g._,
  "adding these packages", "removing these", "adding releases for these
  packages")
* Should alert the user if a `registry update` or `registry delete` is about to
  make the application un-buildable. For example, if `registry delete`'ing the
  registry would delete a version of a dependency you actually use, we should
  warn the user before proceeding (perhaps requiring a `--force` flag).

## Non Goals

* Any sort of package refresh. Something like `ks pkg upgrade` is orthogonal to
  the current expressed pain of users, and is complex enough to greatly slow the
  speed of delivering the cause of this pain (namely, `ks registry update`).
* Transitive closure resolution. Our package structure is very simple, so we
  don't need to traverse dependencies of dependencies (yet!).

## Proposal

We propose to implement the following commands:

```
ks registry update <registry-name> [flags]

Attempt to update our local cache of a package registry. This might include
adding or removing packages from the cached registry, as well as adding or
removing specific versions of a package. These packages can be installed into
the current application with `ks pkg`.

This command additionally provides sanity checks, and will fail in cases where
updating would make the application un-buildable. For example, if 'registry
update' would remove a package (or a version of a package) that the application
depends on, the command will fail. This can be overridden using the `--force`
command.

Usage:
  ks registry update <registry-name> [flags]

Flags:
  -h, --help   help for update
      --force  Ignore warnings and force the update

Global Flags:
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

```
ks registry delete <registry-name> [flags]

Attempt to delete our local cache of a package registry. The application will
not be able to use packages from this registry after it is deleted.

This command additionally provides sanity checks, and will fail in cases where
deleting would make the application un-buildable. For example, if 'registry
delete' would remove a package that the application depends on, the command
will fail. This can be overridden using the `--force` command.

Usage:
  ks registry delete <registry-name> [flags]

Flags:
  -h, --help   help for delete
      --force  Ignore warnings and force the delete

Global Flags:
  -v, --verbose count[=-1]   Increase verbosity. May be given multiple times.
```

## User Experience

### Backwards compatibility

This change will be backwards-compatible.

## Alternatives considered

The only alternative is essentially to allow users to do this manually; this
user wrote a [script][script] to do it.

[237]: https://github.com/ksonnet/ksonnet/issues/237
[script]: https://github.com/ksonnet/ksonnet/issues/237#issuecomment-356268108
