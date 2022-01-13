# @firebase/app-check

## 0.2.0

### Minor Changes

- [`870dd5e35`](https://github.com/firebase/firebase-js-sdk/commit/870dd5e3594f5b588bdc2801c60c6d984d1d08cc) [#5033](https://github.com/firebase/firebase-js-sdk/pull/5033) - Added `getToken()` and `onTokenChanged` methods to App Check.

### Patch Changes

- [`5d007b8fb`](https://github.com/firebase/firebase-js-sdk/commit/5d007b8fb64ac26c2f82704398965e9f3deda58a) [#5084](https://github.com/firebase/firebase-js-sdk/pull/5084) - Fixed so token listeners added through public API call the error handler while internal token listeners return the error as a token field.

* [`5d31e2192`](https://github.com/firebase/firebase-js-sdk/commit/5d31e2192d0ea68a768bc7826ad5aa830c2bc36c) [#5055](https://github.com/firebase/firebase-js-sdk/pull/5055) (fixes [#5052](https://github.com/firebase/firebase-js-sdk/issues/5052)) - Fix an error causing App Check to log `HTTP status 429` errors in debug mode.

* Updated dependencies [[`870dd5e35`](https://github.com/firebase/firebase-js-sdk/commit/870dd5e3594f5b588bdc2801c60c6d984d1d08cc), [`5d007b8fb`](https://github.com/firebase/firebase-js-sdk/commit/5d007b8fb64ac26c2f82704398965e9f3deda58a), [`56a6a9d4a`](https://github.com/firebase/firebase-js-sdk/commit/56a6a9d4af2766154584a0f66d3c4d8024d74ba5)]:
  - @firebase/app-check-types@0.2.0
  - @firebase/component@0.5.4

## 0.1.4

### Patch Changes

- Updated dependencies [[`725ab4684`](https://github.com/firebase/firebase-js-sdk/commit/725ab4684ef0999a12f71e704c204a00fb030e5d)]:
  - @firebase/component@0.5.3

## 0.1.3

### Patch Changes

- Updated dependencies [[`4c4b6aed9`](https://github.com/firebase/firebase-js-sdk/commit/4c4b6aed9757c9a7e75fb698a15e53274f93880b)]:
  - @firebase/component@0.5.2

## 0.1.2

### Patch Changes

- Updated dependencies [[`5fbc5fb01`](https://github.com/firebase/firebase-js-sdk/commit/5fbc5fb0140d7da980fd7ebbfbae810f8c64ae19)]:
  - @firebase/component@0.5.1

## 0.1.1

### Patch Changes

- [`60e834739`](https://github.com/firebase/firebase-js-sdk/commit/60e83473940e60f8390b1b0f97cf45a1733f66f0) [#4897](https://github.com/firebase/firebase-js-sdk/pull/4897) - Make App Check initialization explicit, to prevent unexpected errors for users who do not intend to use App Check.

## 0.1.0

### Minor Changes

- [`81c131abe`](https://github.com/firebase/firebase-js-sdk/commit/81c131abea7001c5933156ff6b0f3925f16ff052) [#4860](https://github.com/firebase/firebase-js-sdk/pull/4860) - Release the Firebase App Check package.

### Patch Changes

- Updated dependencies [[`81c131abe`](https://github.com/firebase/firebase-js-sdk/commit/81c131abea7001c5933156ff6b0f3925f16ff052)]:
  - @firebase/app-check-interop-types@0.1.0
  - @firebase/app-check-types@0.1.0

## 0.1.1

### Patch Changes

- Updated dependencies [[`c34ac7a92`](https://github.com/firebase/firebase-js-sdk/commit/c34ac7a92a616915f38d192654db7770d81747ae), [`ac4ad08a2`](https://github.com/firebase/firebase-js-sdk/commit/ac4ad08a284397ec966e991dd388bb1fba857467)]:
  - @firebase/component@0.5.0
  - @firebase/util@1.1.0
