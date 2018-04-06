# Contributing to ksonnet

Thank you for taking the time to contribute to ksonnet! Before you submit any PRs, we encourage you to read the instructions for the [developer certificate of origin (DCO)](DCO-SIGNOFF.md), as well as the guidelines below:

* [Build](#build)
* [Manage dependencies](#manage-dependencies)
  * [Add a new dependency](#add-a-new-dependency)
  * [Pin a dependency to a specific version](#pin-a-dependency-to-a-specific-version)
* [Test](#test)
* [Make a release](#make-a-release)

## Build

> Ensure that you already have (1) a proper `$GOPATH` and (2) ksonnet installed. If not, follow [these README instructions](/README.md#install) to get set up.

To build ksonnet locally (e.g. for open-source development), run the following in the root of your ksonnet repo (which is `$GOPATH/src/github.com/ksonnet/ksonnet` unless otherwise specified):

```sh
make all
```

This indirectly makes the following targets:

    * `make ks` - Compiles all the code into a local `ks` binary
    * `make docs` - Regenerates all the documentation for the ksonnet CLI, based on the code inside `cmd/`.

### Troubleshooting

`make docs` relies on the `realpath` Linux utility. If you encounter a `realpath: command not found` error, and you are using OSX, run the following command:

```sh
brew install coreutils
```

Running `make` again afterwards should work.

## Manage dependencies

This project uses [`dep`](https://github.com/golang/dep) to manage Go dependencies.

To make things easier for reviewers, put updates to `vendor/` in a separate commit within the same PR.

### Add a new dependency

To introduce a new dependency to the ksonnet codebase, follow these steps:

1. [Open an issue](https://github.com/ksonnet/ksonnet/issues) to discuss the use case and need for the dependency with the project maintainers.

1. After building agreement, vendor the dependency using `dep`.
    * Where possible, **please [pin the dependency](#pin-a-dependency-to-a-specific-version) to a specific stable version.** Please do not vendor HEAD if you can avoid it!
    * **Please introduce a vendored dependency in a dedicated commit to make review easier!**

1. Write the code change that imports and uses the new dependency.

1. Run the following in the root of the ksonnet repository:
    ```sh
    # Add new dependency
    dep ensure -add github.com/pkg/foo
    ```

1. Prune unused dependencies in `vendor```
    ```sh
    # Prune
    dep prune
    ```

1. Separate your dependencies (i.e. `vendor/`,  `Gopkg.*`) and actual code changes into different pull requests:
    * Make a separate commit for your dependency changes, and [cherry-pick it](https://git-scm.com/docs/git-cherry-pick) it into a new branch. Submit a PR for review.
    * After your dependency changes are checked in, rebase your original code change and submit that PR.

1. Feel awesome for making a sizeable contribution to ksonnet! :tada:

### Pin a dependency to a specific version

Pinning a dependency avoids the issue of breaking updates.

```sh
# Pin all imported client-go packages to release >= 3.0.0, < 3.1.0
dep ensure -add k8s.io/client-go@~v3.0.0
```

## Test

Before making a PR, you should make sure to test your changes.

To do so, run `make test` in the root of the ksonnet repo, specifying any additional, custom Go flags with `$EXTRA_GO_FLAGS`.

## Make a Release

See our [release documentation](docs/release.md) for the process of creating a release.
