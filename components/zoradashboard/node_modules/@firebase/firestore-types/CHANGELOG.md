# @firebase/firestore-types

## 2.3.0

### Minor Changes

- [`97f61e6f3`](https://github.com/firebase/firebase-js-sdk/commit/97f61e6f3d24e5b4c92ed248bb531233a94b9eaf) [#4837](https://github.com/firebase/firebase-js-sdk/pull/4837) (fixes [#4715](https://github.com/firebase/firebase-js-sdk/issues/4715)) - Add mockUserToken support for Firestore.

## 2.2.0

### Minor Changes

- [`b6080a857`](https://github.com/firebase/firebase-js-sdk/commit/b6080a857b1b56e10db041e6357acd69154e31fb) [#4577](https://github.com/firebase/firebase-js-sdk/pull/4577) - Added support to remove a FirestoreDataConverter on a Firestore reference by calling `withConverter(null)`

## 2.1.0

### Minor Changes

- [`b662f8c0a`](https://github.com/firebase/firebase-js-sdk/commit/b662f8c0a9890cbdcf53cce7fe01c2a8a52d3d2d) [#4168](https://github.com/firebase/firebase-js-sdk/pull/4168) - Release Firestore Bundles (pre-packaged Firestore data). For NPM users, this can
  be enabled via an additional import: 'firebase/firestore/bundle'. For CDN usage,
  it is enabled by default.

## 2.0.0

### Major Changes

- [`ffef32e38`](https://github.com/firebase/firebase-js-sdk/commit/ffef32e3837d3ee1098129b237e7a6e2e738182d) [#3897](https://github.com/firebase/firebase-js-sdk/pull/3897) (fixes [#3879](https://github.com/firebase/firebase-js-sdk/issues/3879)) - Removed the `timestampsInSnapshots` option from `FirestoreSettings`. Now, Firestore always returns `Timestamp` values for all timestamp values.

### Minor Changes

- [`79b049375`](https://github.com/firebase/firebase-js-sdk/commit/79b04937537b90422e051086112f6b43c2880cdb) [#3909](https://github.com/firebase/firebase-js-sdk/pull/3909) - Add a useEmulator(host, port) method to Firestore

## 1.14.0

### Minor Changes

- [`4f997bce1`](https://github.com/firebase/firebase-js-sdk/commit/4f997bce102be272b76836b6bcba96ea7de857bc) [#3724](https://github.com/firebase/firebase-js-sdk/pull/3724) - Adds a new `experimentalAutoDetectLongPolling` to FirestoreSettings. When
  enabled, the SDK's underlying transport (WebChannel) automatically detects if
  long-polling should be used. This is very similar to
  `experimentalForceLongPolling`, but only uses long-polling if required.

## 1.13.0

### Minor Changes

- [`f9004177e`](https://github.com/firebase/firebase-js-sdk/commit/f9004177e76f00fc484d30c0c0e7b1bc2da033f9) [#3772](https://github.com/firebase/firebase-js-sdk/pull/3772) - [feature] Added `not-in` and `!=` query operators for use with `.where()`. `not-in` finds documents where a specified field’s value is not in a specified array. `!=` finds documents where a specified field's value does not equal the specified value. Neither query operator will match documents where the specified field is not present.

* [`a8ff3dbaa`](https://github.com/firebase/firebase-js-sdk/commit/a8ff3dbaacd06371e6652a6d639ef2d9bead612b) [#3418](https://github.com/firebase/firebase-js-sdk/pull/3418) - Use FirestoreError instead of Error in onSnapshot\*() error callbacks.

## 1.12.1

### Patch Changes

- [`61b4cd31b`](https://github.com/firebase/firebase-js-sdk/commit/61b4cd31b961c90354be38b18af5fbea9da8d5a3) [#3464](https://github.com/firebase/firebase-js-sdk/pull/3464) (fixes [#3354](https://github.com/firebase/firebase-js-sdk/issues/3354)) - feat: Added `merge` option to `firestore.settings()`, which merges the provided settings with
  settings from a previous call. This allows adding settings on top of the settings that were applied
  by `@firebase/testing`.

## 1.12.0

### Minor Changes

- [`39ca8ecf`](https://github.com/firebase/firebase-js-sdk/commit/39ca8ecf940472159d0bc58212f34a70146da60c) [#3254](https://github.com/firebase/firebase-js-sdk/pull/3254) Thanks [@thebrianchen](https://github.com/thebrianchen)! - Added support for `set()` with merge options when using `FirestoreDataConverter`.
