> **I M P O R T A N T**
>
> Version 4 release is imminent. Please try it. More info on the [homepage](https://github.com/bholloway/resolve-url-loader).
>
> Version 3 is now in maintenance mode.

# Resolve URL Loader

[![NPM](https://nodei.co/npm/resolve-url-loader.png)](https://www.npmjs.com/package/resolve-url-loader)

A **webpack loader** that rewrites relative paths in url() statements based on the original source file.

## Why?

> **TL;DR** Making Sass work with a feature based project structure

With webpack you can import a `.scss` file (or some other compile-to-css file) and have a loader take care of the transpilation. With **Sass** (at least) this file can include a whole tree of source files into a single output.

We can imagine a virtual `.css` file at the location the original `.scss` import. Webpack expects any **assets** found in this CSS to be relative to the original imported file.

For projects with a **feature based structure** this will be a problem, since you will want to **co-locate** your assets with your `.scss` partials.

**Example** - webpack imports `index.scss` which includes feature `foo`.

| files                              | content                |
|------------------------------------|------------------------|
|src /                               |                        |
|&nbsp;&nbsp;index.scss              | `@import features/foo` |
|&nbsp;&nbsp;features /              |                        |
|&nbsp;&nbsp;&nbsp;&nbsp;_foo.scss   | `url(bar.png)`         |
|&nbsp;&nbsp;&nbsp;&nbsp;bar.png     |                        |

Intuatively we want the assets in partial `_foo.scss` relative to the partial, meaning `url(bar.png)`.

However webpack's `css-loader` will encounter `url(bar.png)` and expect to find `src/bar.png`. This is **not** the correct location and the build will fail.

Thankfully `resolve-url-loader` provides the "url rewriting" that Sass is missing. Use it _after_ the transpiler (such as [sass-loader](https://www.npmjs.com/package/sass-loader)). It makes use of the [source-map](http://www.mattzeunert.com/2016/02/14/how-do-source-maps-work.html) to find the original source file and rewrite `url()` statements.

In our example it rewrites `url(bar.png)` to `url(features/bar.png)` as required.

## Version 3

**Features**

* Use `postcss` parser by default. This is long overdue as the old `rework` parser doesn't cope with modern css.

* Lots of automated tests running actual webpack builds. If you have an interesting use-case let me know.

**Breaking Changes**
* Multiple options changed or deprecated.
* Removed file search "magic" in favour of `join` option.
* Errors always fail and are no longer swallowed.
* Processing absolute asset paths requires `root` option to be set.

**Migrating**

Initially set option `engine: 'rework'` for parity with your existing build. Once working you can remove this option **or** set `engine: 'postcss'` explicitly.

Retain `keepQuery` option if you are already using it.

The `root` option now has a different meaning. Previously it limited file search. Now it is the base path for absolute or root-relative URIs, consistent with `css-loader`. If you are already using it you can probably remove it.

If you build on Windows platform **and** your content contains absolute asset paths, then `css-loader` could fail. The `root` option here may fix the URIs before they get to `css-loader`. Try to leave it unspecified, otherwise (windows only) set to empty string `root: ''`.

## Getting started

### Install

via npm

```bash
npm install resolve-url-loader --save-dev
```

via yarn

```bash
yarn add resolve-url-loader --dev
```

### Configure Webpack

The typical use case is `resolve-url-loader` between `sass-loader` and `css-loader`.

**:warning: IMPORTANT**
* **source-maps required** for loaders preceding `resolve-url-loader` (regardless of `devtool`).
* Always use **full loader package name** (don't omit `-loader`) otherwise you can get errors that are hard to debug.


``` javascript
rules: [
  {
    test: /\.scss$/,
    use: [
      ...
      {
        loader: 'css-loader',
        options: {...}
      }, {
        loader: 'resolve-url-loader',
        options: {...}
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          sourceMapContents: false
        }
      }
    ]
  },
  ...
]
```

Refer to `test` directory for full webpack configurations (as used in automated tests).

## Options

| option      | type                       | default     |          |  description                                                                                                                                                                     |
|-------------|----------------------------|-------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `engine`    | `'rework'`<br/>`'postcss'` | `'postcss'` |          | The css parser engine.                                                                                                                                                           |
| `sourceMap` | boolean                    | `false`     |          | Generate a source-map.                                                                                                                                                           |
| `keepQuery` | boolean                    | `false`     |          | Keep query-string and/or hash suffixes.<br/>e.g. `url('./MyFont.eot?#iefix')`<br/>Be aware downstream loaders may remove query-string or hash.                                   |
| `removeCR`  | boolean                    | `false`     |          | Convert orphan CR to whitespace (postcss only).<br/>See known issues below.                                                                                                          |
| `debug`     | boolean                    | `false`     |          | Display debug information.                                                                                                                                                       |
| `silent`    | boolean                    | `false`     |          | Do **not** display warnings.                                                                                                                                                     |
| `root`      | string                     | _unset_     |          | Similar to the (now defunct) option in `css-loader`.<br/>This string, possibly empty, is prepended to absolute URIs.<br/>Absolute URIs are only processed if this option is set. |
| `join`      | function                   | _inbuilt_   | advanced | Custom join function.<br/>Use custom javascript to fix asset paths on a per-case basis.<br/>Refer to the default implementation for more information.                            |
| `absolute`  | boolean                    | `false`     | useless  | Forces URIs to be output as absolute file paths.<br/>This is retained for historical compatibility but is likely to be removed in the future, so let me know if you use it.      |

## How it works

A [rework](https://github.com/reworkcss/rework) or [postcss](https://postcss.org/) process is run on incoming CSS.

Each `url()` statement may imply an asset or may not. Generally only relative URIs are considered. However if `root` is specified then absolute or root-relative URIs are considered.

For each URI considered, the incomming source-map is consulted to determine the original file where the `url()` was specified. This becomes the `base` argument to the `join` function, whose default implementation is something like the following pseudocode.

```javascript
join(uri, base?) =>
  compose(path.normalize, path.join)(base || options.join, uri);
```

Note that for absolute `uri` then the `base` is absent. In the default implementation the `root` option is used instead.

Full file search has been discontinued in version 3, however it is possible to specify a custom `join` function.

There is the added complexity that `base` may be an iterator. However `resolve-url-loader` exports some useful functions that makes a custom `join` easier.

Following `join` the URI has become an absolute path. Back-slashes are then converted to forward-slashes and the path is made relative to the initial resource being considered.

Use the `debug` option to see verbose information from the `join` function.

## Limitations / Known-issues

### Mixins

Where `url()` statements are created in a mixin the source file may then be the mixin file, and not the file calling the mixin. Obviously this is **not** the desired behaviour.

Ensure this is indeed the problem as there are many ways to misconfigure webpack. Try inlining the mixin and check that everything works correctly. However ultimately you will need to work around this.

### Compatiblity

Tested `macOS` and `Windows` for `node 6.x`.

All `webpack1`-`webpack4` with contemporaneous loaders/plugins.

Refer to `test` directory for full webpack configurations (as used in automated tests).

Some edge cases with `libsass` on `Windows` (see below).

### Engines

The `engine:postcss` is by far the more reliable option.

The `engine:rework` option is retained for historical compatibility but is likely to be removed in the future, so let me know if you use it.

If you need production css source-map it is best to avoid the combination `webpack4` with `engine:rework`. Tests show a systematic flaw in the outgoing source-map mappings.

### Absolute URIs

By "absolute URIs" we more correctly mean assets with root-relative URLs or absolute file paths.

> Absolute paths are **not** processed by default

These are **not** processed unless a `root` is specified.

However recall that any paths that _are_ processed will have windows back-slash converted to posix forward-slash. This can be useful since some webpack loaders can choke on windows paths. By using `root: ''` then `resolve-url-loader` effectively does nothing to absolute paths except change the back-slash.

It can also be useful to process absolute URIs if you have a custom `join` function and want to process all paths. However this is perhaps better done with some separate `postcss` plugin.

### Windows line breaks

Normal windows linebreaks are `CRLF`. But sometimes libsass will output single `CR` characters.

This problem is specific to multiline declarations. Refer to the [libsass bug #2693](https://github.com/sass/libsass/issues/2693).

If you have _any_ such multiline declarations preceding `url()` statements it will fail your build.
 
Libsass doesn't consider these orphan `CR` to be newlines but `postcss` engine does.  The result being an offset in source-map line-numbers which crashes `resolve-url-loader`.

```
Module build failed: Error: resolve-url-loader: CSS error
  source-map information is not available at url() declaration
```

Some users find the node-sass `linefeed` option solves the problem.

**Solutions**
* Try the node-sass [linefeed](https://github.com/sass/node-sass#linefeed--v300) option by way of `sass-loader`.

**Work arounds** 
* Enable `removeCR` option [here](#option).
* Remove linebreaks in declarations.

**Diagnosis**
1. Run a stand-alone sass build `npx node-sass index.scss output.css`
2. Use a hex editor to check line endings `Format-Hex output.css` 
3. Expect `0DOA` (or desired) line endings. Single `0D` confirms this problem.

## Getting help

Webpack is difficult to configure but extremely rewarding.

> Remove this loader and make sure it is not a problem with a different loader in your config (most often the case)

I am happy for you to **raise an issue** to ask a question regarding this package. However ensure you follow the check-list first.

Currently I am **not** [dogfooding](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) this loader in my own work. I may rely on you being able to isolate the problem in a simple example project and to help debug.

I am happy this loader helps so many people. Open-source is provided as-is so please try not project your frustrations. There are some really great people who follow this project who can help.

### Issues

Before raising a new issue:

* Remove this loader and make sure it is not a problem with a different loader in your config (most often the case).
* Check [stack overflow](http://stackoverflow.com/search?q=resolve-url-loader) for an answer.
* Review [previous issues](/issues?utf8=%E2%9C%93&q=is%3Aissue) that may be similar.
* Be prepared to create a **simple open-source project** that exhibits your problem, should the solution not be immediately obvious to us.
* (ideally) Debug some code and let me know where the problem sits.

### Pull requests

I am happy to take **pull requests**, however:

* Ensure your change is **backwards compatible** - not all users will be using the same version of Webpack or SASS that you do.
* Follow the **existing code style**. I know it is old but it maintains backwards compatibility.
* Uncomon use-cases/fixes should be opt-in per a new **option**.
* Do **not** overwrite existing variables with new values. I would prefer your change variable names elsewhere if necessary.
* Add **comments** that describe why the code is necessary - i.e. what edge case are we solving. Otherwise we may rewrite later and break your use-case.
