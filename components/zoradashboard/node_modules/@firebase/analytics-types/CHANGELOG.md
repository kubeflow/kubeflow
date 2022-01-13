# @firebase/analytics-types

## 0.5.0

### Minor Changes

- [`02586c975`](https://github.com/firebase/firebase-js-sdk/commit/02586c9754318b01a0051561d2c7c4906059b5af) [#5070](https://github.com/firebase/firebase-js-sdk/pull/5070) - Add `firebase_screen` and `firebase_screen_class` to `logEvent()` overload for `screen_view` events.

## 0.4.0

### Minor Changes

- [`fb3b095e4`](https://github.com/firebase/firebase-js-sdk/commit/fb3b095e4b7c8f57fdb3172bc039c84576abf290) [#2800](https://github.com/firebase/firebase-js-sdk/pull/2800) - Analytics now dynamically fetches the app's Measurement ID from the Dynamic Config backend
  instead of depending on the local Firebase config. It will fall back to any `measurementId`
  value found in the local config if the Dynamic Config fetch fails.
