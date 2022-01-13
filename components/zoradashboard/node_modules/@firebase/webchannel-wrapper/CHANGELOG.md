# @firebase/webchannel-wrapper

## 0.5.1

### Patch Changes

- [`85f73abb5`](https://github.com/firebase/firebase-js-sdk/commit/85f73abb5c5dd5625c82b874adbfbb4acd1d70d7) [#5099](https://github.com/firebase/firebase-js-sdk/pull/5099) - Added a new export for FetchXmlHttpFactory.

## 0.5.0

### Minor Changes

- [`10fb5b87f`](https://github.com/firebase/firebase-js-sdk/commit/10fb5b87faecf3aa79e15545b21de99af3e51a71) [#4982](https://github.com/firebase/firebase-js-sdk/pull/4982) (fixes [#4977](https://github.com/firebase/firebase-js-sdk/issues/4977)) - Added a new export for FetchXmlHttpFactory.

## 0.4.1

### Patch Changes

- [`9822e125c`](https://github.com/firebase/firebase-js-sdk/commit/9822e125c399ae7271d4a9077f82b184a44526e4) [#4078](https://github.com/firebase/firebase-js-sdk/pull/4078) - Fix an issue that prevented `experimentalAutoDetectLongPolling` from working correctly.

## 0.4.0

### Minor Changes

- [`4f997bce1`](https://github.com/firebase/firebase-js-sdk/commit/4f997bce102be272b76836b6bcba96ea7de857bc) [#3724](https://github.com/firebase/firebase-js-sdk/pull/3724) - Adds a new `experimentalAutoDetectLongPolling` to FirestoreSettings. When
  enabled, the SDK's underlying transport (WebChannel) automatically detects if
  long-polling should be used. This is very similar to
  `experimentalForceLongPolling`, but only uses long-polling if required.

## 0.3.0

### Minor Changes

- [`7f0860a4`](https://github.com/firebase/firebase-js-sdk/commit/7f0860a4ced76da8492ae44d2267a2f1cc58eccb) [#3372](https://github.com/firebase/firebase-js-sdk/pull/3372) - Upgrade to the latest version of Google Closure Library and Compiler. This dependency will be
  necessary for future updates to the @firebase/firestore package. Developers will not need to
  make any changes to their code to handle this change.
