# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.5.4](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v2.5.3...v2.5.4) (2021-04-19)


### Bug Fixes

* context with symbols ([#94](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/94)) ([6fc6874](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/6fc6874f4ee295eea372dcfa0a86799b355dab70))
* resolve paths and normalize ([#97](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/97)) ([818b825](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/818b825db119dde0b53b24d96688f1af89344b29))
* use `finishModules` if thread is less than or equal 1 ([#95](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/95)) ([c12e7be](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/c12e7be0be49f95fa8f2d9ae354acba3bd412b5c))

### [2.5.3](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v2.5.2...v2.5.3) (2021-03-24)


### Bug Fixes

* allow multiple instances ([#92](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/92)) ([0cdd621](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/0cdd621be597c643cad6c4a41c7fed31c29fb1a5))
* match hidden directories for path exclusions ([#87](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/87)) ([bb8750c](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/bb8750cb8a1cb4f6297a07b579ad4e394e11d968))

### [2.5.2](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v2.5.1...v2.5.2) (2021-02-18)


### Bug Fixes

* **fail-on-error:** show eslint errors when failOnError is disabled ([#85](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/85)) ([69be533](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/69be5338a8f72ffdbee055ab926cf4d84047fd35))

### [2.5.1](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v2.5.0...v2.5.1) (2021-02-12)


### Bug Fixes

* exclude node_modules root ([#80](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/80)) ([be0391e](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/be0391e28322e220cf628f842f35b3d800c284c0))
* prevent lint all files ([#77](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/77)) ([f57cb8e](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/f57cb8e1f01c522e562f0af3460d900d7fbba94f))
* update types ([#81](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/81)) ([90608da](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/90608da93f13ae2de70c2696d4284c1558a3f301))

## [2.5.0](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v2.4.3...v2.5.0) (2021-02-04)


### Refactor

* Updates to emitError and emitWarning

Setting only emitError to true will no longer exclusively print files with errors
and disregard the files with warnings. Similarly, setting only emitWarning to true
will no longer exclusively print files with warnings disregard the files with errors.

* fix: use quiet to override emitError and emitWarning

- quiet is essentially syntactic sugar for setting emitError to true
and emitWarning to false

### Bug Fixes

* fails when `failOnError` or `failOnWarning` enabled ([#72](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/72)) ([8a72a8a](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/8a72a8ad26b8decb800f955d8f4d362f280c4d0f))
* lint dirty modules only ([#67](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/67)) ([f7f372e](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/f7f372e800e75fcd2928655648fee01266c6d158))
* threads multi-compiler ([#69](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/69)) ([cef4f74](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/cef4f7473707fb3f069ec44c54b5ed2d27d931f8))
* types ([#66](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/66)) ([4daddf5](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/4daddf5335b2c78203482d7e7f6d82a909277212))
* Fix emit warning error quiet (#46) ([d38165b](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/d38165bef1e2d73a9d53f42d80b926c9eab12707)), closes [#46](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/46) [#19](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/19) [#19](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/19)

### [2.4.3](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v2.4.2...v2.4.3) (2021-01-19)


### Bug Fixes

* crash on `split` ([#62](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/62)) ([db38f61](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/db38f611965cfdec83984364e0b982bbd7a678e0))

### [2.4.2](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v2.4.1...v2.4.2) (2021-01-19)


### Bug Fixes

* strip resource query ([#58](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/58)) ([f0a2d81](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/f0a2d81a4feecf87e13649f2930f773c04fa3814))

### [2.4.1](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v2.4.0...v2.4.1) (2020-11-30)


### Bug Fixes

* [#43](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/43), [#44](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/44), [#45](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/45) ([#47](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/47)) ([4b8d4de](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/4b8d4def970381126f70c8407eb708c1c975bbf5))
* recompile speedups ([#55](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/55)) ([d862d92](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/d862d9291853c6b7430a0dbdc965b16db0723925))

## [2.4.0](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v2.3.0...v2.4.0) (2020-11-20)


### Features

* threads ([#39](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/39)) ([1e38fc7](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/1e38fc77fd575d9e56be0da6a206ded54a8f7c34))

## [2.3.0](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v2.2.1...v2.3.0) (2020-11-13)


### Features

* exclude option ([#41](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/41)) ([dc2fac7](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/dc2fac7918c0733f26fa5a1683315bf439370559))

### [2.2.1](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v2.2.0...v2.2.1) (2020-11-07)


### Bug Fixes

* folder pattern ([#36](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/36)) ([e79741e](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/e79741ee22d04c8c6e4d6f11d6869434ed5b339d))

## [2.2.0](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v1.0.0...v2.2.0) (2020-11-04)


### Features

* feat: only use the import graph, update tests ([#28](https://github.com/webpack-contrib/eslint-webpack-plugin/pull/28)) ([47612f16](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/47612f16894f22f4b5c3848595bba48ca8eb9b0f))

### Bug Fixes

* fix: use compiler.outputFileSystem to write report

* fix: use fs callback forms because webpack5 does not work with promisify on outputFileSystem methods

* fix: do not accumulate more taps as watchRuns occur

* fix: windows path escape, cleanup watch-fixture

## [2.1.0](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v1.0.0...v2.1.0) (2020-07-30)


### Features

* support typescript ([#8](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/8)) ([6634d96](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/6634d96e7e80dd2d7097479f13a48115e0544f59))

## [2.0.0](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v1.0.0...v2.0.0) (2020-07-26)


### Features

* ESLint class migration ([#11](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/11)) ([efd5e7d](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/efd5e7d01b8569c5dcb2808f618f56e4857fcf52)), closes [#10](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/10) [#10](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/10) [#10](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/10) [#10](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/10) [#10](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/10) [#10](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/10) [#10](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/10) [#10](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/10) [#10](https://github.com/webpack-contrib/eslint-webpack-plugin/issues/10)

### ⚠ BREAKING CHANGES

* minimum supported eslint version is `7`

## [1.0.0](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v0.1.0...v1.0.0) (2020-05-04)

### ⚠ BREAKING CHANGES

* minimum supported Node.js version is `10.13`
* minimum supported eslint version is `6.0.0`

## [0.1.0](https://github.com/webpack-contrib/eslint-webpack-plugin/compare/v0.0.1...v0.1.0) (2019-12-20)


### Features

* support webpack 5 ([b7f3679](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/b7f3679a8d5e5166376caec2a28ed38d6772bcca))


### Bug Fixes

* hooks and callback error ([3e7c36e](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/3e7c36e78e7c05bb5559adced2f92317affbf1ff))
* resolve file glob patterns ([d5c8820](https://github.com/webpack-contrib/eslint-webpack-plugin/commit/d5c8820d9467e8794a4aa3944bf6ded746d79411))

### 0.0.1 (2019-11-12)
