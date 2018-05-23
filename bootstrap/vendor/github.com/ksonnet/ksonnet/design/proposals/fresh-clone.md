# Improve the "fresh-clone" story

Status: Pending

Version: Alpha

## Abstract

This document proposes to extend the dependency, registry, and environment
management code to provide a cleaner "fresh-clone" story.

Essentially, a user should only need to run `git clone` and `ks pkg install` to
get started developing, and it should not be necessary to check bulky metadata
files into a version control system to have a good clone-to-development story.
In this sense `ks pkg install` would take on a role similar to `npm install`,
which is used to obtain all dependencies of a node.js project.

## Motivation

The `ks` CLI tool is largely awkward to use with source control systems like
`git`. There are several reasons for this, but likely the biggest is that
ksonnet keeps around a lot of metadata that can (and should) be generated
automatically. Because it's not, users are forced to keep this in version
control, which is non-ideal.

Two good examples of this problem are:

1. source code for packages the application depends on, and
1. metadata associated with ksonnet _environments_ (_e.g._, information about
   the cluster, the `k8s.libsonnet` file that is generated based on the OpenAPI
   specification associated with that cluster, and so on).

(2) in particular is costly; each `k8s.libsonnet` is about ~1.7MB.

Since it is possible generate (or acquire) all of these things based on the
information in the `app.yaml` file, this commit proposes to introduce a `ks
install` command. This command follows the example set by NPM, a project with a
similar problem; NPM has a `package.json` file, and `npm install` is used to
(_e.g._) pull down dependencies from the NPM registry.

The related issue is captured in [#217][217].

## Goal

1. Make it trivial to clone and get started developing a ksonnet application (it
   should be two commands: `git clone` followed by `ks pkg install`).
1. Reduce the memory footprint of checking a ksonnet application into a source
   control system like `git` by autogenerating bulky metadata files.
1. Auto-generate a `.gitignore` as a result of `ks init`. (See issue [#55][55])
1. Don't block development because the user doesn't have access to an
   environment. For example, `prod` environments are usually locked down; a user
   should not be prevented from developing a ksonnet application simply because
   they don't have access to this environment. (They will obviously not be able
   to push to that environment, however.)
1. When `ks pkg install` runs, it should present a clear, easy-to-consume
   picture of what it's going to do (or has done). For example, it should say
   "installed these dependencies", _etc_.

## Proposal

This proposal consists mainly of two main bodies of work:

1. changes to the semantics and implementation of `ks pkg install` (which will
   attempt to get all dependencies if they are not already present)
1. changes to the way environments are initialized (_i.e._, we can't expect
   users to have access to all environments, so the `ks` CLI needs to be able to
   tolerate this).

### `ks pkg install`

We propose the form of the command should change from `ks pkg install
<pkg-name>` to `ks pkg install [pkg-name]` (_i.e._, we propose `pkg-name` should
be optional).

When run with no `pkg-name`, `ks pkg install` should cause all dependencies to
be installed if not present. Specifically:

1. We traverse the list of registries in `app.yaml` and attempt to retrieve and
   cache each of them locally.
1. We traverse the list of dependencies in `app.yaml` and attempt to install
   them one by one.

Other changes related to partially-initialized ksonnet applications are not
necessary. For example, if a user runs `git clone` and forgets to run `ks pkg
install`, we should allow the Jsonnet compiler to not find the dependency, and
error out. If this becomes an expressed problem from users, we can re-evaluate.

This notably does _not_ solve the problem of generating the environment
metadata. This is handled in the next section.

### Lazily-instantiated environments

A number of commands depend on a fully-initialized environment. Since we cannot
expect users to have access to all environments (_e.g._, most `prod`
environments are locked down), the `ks` CLI tool needs to tolerate this case
when the locked-down environments aren't needed, and it needs to present useful
errors in the case they are.

To resolve this problem, we propose that environments should be _instantiated
lazily_ (by which we mean _when needed_ rather than ahead of time).
Specifically, we propose that commands that interact with the environment
(_e.g._, `ks diff`, `ks apply`, and so on) have the following workflow:

1. Check whether the environment is initialized.
1. If it is, try to run the command.
1. If it's not, attempt to initialize the environment from the existing
   metadata.

## User Experience

### Backwards compatibility

This change will be backwards-compatible.

## Alternatives considered

The only alternative is to do what we are doing now, which is to force users to
check the metadata files into source control.

[55]: https://github.com/ksonnet/ksonnet/issues/55
[217]: https://github.com/ksonnet/ksonnet/issues/217
