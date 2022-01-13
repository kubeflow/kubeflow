# @firebase/analytics

## 0.6.15

### Patch Changes

- Updated dependencies [[`02586c975`](https://github.com/firebase/firebase-js-sdk/commit/02586c9754318b01a0051561d2c7c4906059b5af)]:
  - @firebase/analytics-types@0.5.0

## 0.6.14

### Patch Changes

- Updated dependencies [[`56a6a9d4a`](https://github.com/firebase/firebase-js-sdk/commit/56a6a9d4af2766154584a0f66d3c4d8024d74ba5)]:
  - @firebase/component@0.5.4
  - @firebase/installations@0.4.30

## 0.6.13

### Patch Changes

- Updated dependencies [[`725ab4684`](https://github.com/firebase/firebase-js-sdk/commit/725ab4684ef0999a12f71e704c204a00fb030e5d)]:
  - @firebase/component@0.5.3
  - @firebase/installations@0.4.29

## 0.6.12

### Patch Changes

- Updated dependencies [[`4c4b6aed9`](https://github.com/firebase/firebase-js-sdk/commit/4c4b6aed9757c9a7e75fb698a15e53274f93880b)]:
  - @firebase/component@0.5.2
  - @firebase/installations@0.4.28

## 0.6.11

### Patch Changes

- Updated dependencies [[`5fbc5fb01`](https://github.com/firebase/firebase-js-sdk/commit/5fbc5fb0140d7da980fd7ebbfbae810f8c64ae19)]:
  - @firebase/component@0.5.1
  - @firebase/installations@0.4.27

## 0.6.10

### Patch Changes

- Updated dependencies [[`c34ac7a92`](https://github.com/firebase/firebase-js-sdk/commit/c34ac7a92a616915f38d192654db7770d81747ae), [`ac4ad08a2`](https://github.com/firebase/firebase-js-sdk/commit/ac4ad08a284397ec966e991dd388bb1fba857467)]:
  - @firebase/component@0.5.0
  - @firebase/util@1.1.0
  - @firebase/installations@0.4.26

## 0.6.9

### Patch Changes

- Updated dependencies [[`7354a0ed4`](https://github.com/firebase/firebase-js-sdk/commit/7354a0ed438f4e3df6577e4927e8c8f8f1fbbfda)]:
  - @firebase/util@1.0.0
  - @firebase/component@0.4.1
  - @firebase/installations@0.4.25

## 0.6.8

### Patch Changes

- Updated dependencies [[`f24d8961b`](https://github.com/firebase/firebase-js-sdk/commit/f24d8961b3b87821413297688803fc85113086b3)]:
  - @firebase/component@0.4.0
  - @firebase/installations@0.4.24

## 0.6.7

### Patch Changes

- Updated dependencies [[`de5f90501`](https://github.com/firebase/firebase-js-sdk/commit/de5f9050137acc9ed1490082e5aa429b5de3cb2a)]:
  - @firebase/util@0.4.1
  - @firebase/component@0.3.1
  - @firebase/installations@0.4.23

## 0.6.6

### Patch Changes

- Updated dependencies [[`5c1a83ed7`](https://github.com/firebase/firebase-js-sdk/commit/5c1a83ed70bae979322bd8751c0885d683ce4bf3)]:
  - @firebase/component@0.3.0
  - @firebase/installations@0.4.22

## 0.6.5

### Patch Changes

- Updated dependencies [[`ec95df3d0`](https://github.com/firebase/firebase-js-sdk/commit/ec95df3d07e5f091f2a7f7327e46417f64d04b4e)]:
  - @firebase/util@0.4.0
  - @firebase/component@0.2.1
  - @firebase/installations@0.4.21

## 0.6.4

### Patch Changes

- Updated dependencies [[`6afe42613`](https://github.com/firebase/firebase-js-sdk/commit/6afe42613ed3d7a842d378dc1a09a795811db2ac)]:
  - @firebase/component@0.2.0
  - @firebase/installations@0.4.20

## 0.6.3

### Patch Changes

- [`74bf52009`](https://github.com/firebase/firebase-js-sdk/commit/74bf52009b291a62deabfd865084d4e0fcacc483) [#4458](https://github.com/firebase/firebase-js-sdk/pull/4458) - Fixed a behavior causing `gtag` to be downloaded twice on Firebase Analytics initialization. This did not seem to affect the functionality of Firebase Analytics but adds noise to the logs when users are trying to debug.

## 0.6.2

### Patch Changes

- Updated dependencies [[`9cf727fcc`](https://github.com/firebase/firebase-js-sdk/commit/9cf727fcc3d049551b16ae0698ac33dc2fe45ada)]:
  - @firebase/util@0.3.4
  - @firebase/component@0.1.21
  - @firebase/installations@0.4.19

## 0.6.1

### Patch Changes

- Updated dependencies [[`a5768b0aa`](https://github.com/firebase/firebase-js-sdk/commit/a5768b0aa7d7ce732279931aa436e988c9f36487), [`7d916d905`](https://github.com/firebase/firebase-js-sdk/commit/7d916d905ba16816ac8ac7c8748c83831ff614ce)]:
  - @firebase/component@0.1.20
  - @firebase/util@0.3.3
  - @firebase/installations@0.4.18

## 0.6.0

### Minor Changes

- [`d4db75ff8`](https://github.com/firebase/firebase-js-sdk/commit/d4db75ff81388430489bd561ac2247fe9e0b6eb5) [#3836](https://github.com/firebase/firebase-js-sdk/pull/3836) (fixes [#3573](https://github.com/firebase/firebase-js-sdk/issues/3573)) - Analytics now warns instead of throwing if it detects a browser environment where analytics does not work.

## 0.5.0

### Minor Changes

- [`fb3b095e4`](https://github.com/firebase/firebase-js-sdk/commit/fb3b095e4b7c8f57fdb3172bc039c84576abf290) [#2800](https://github.com/firebase/firebase-js-sdk/pull/2800) - Analytics now dynamically fetches the app's Measurement ID from the Dynamic Config backend
  instead of depending on the local Firebase config. It will fall back to any `measurementId`
  value found in the local config if the Dynamic Config fetch fails.

### Patch Changes

- Updated dependencies [[`da1c7df79`](https://github.com/firebase/firebase-js-sdk/commit/da1c7df7982b08bbef82fcc8d93255f3e2d23cca), [`fb3b095e4`](https://github.com/firebase/firebase-js-sdk/commit/fb3b095e4b7c8f57fdb3172bc039c84576abf290), [`fb3b095e4`](https://github.com/firebase/firebase-js-sdk/commit/fb3b095e4b7c8f57fdb3172bc039c84576abf290)]:
  - @firebase/component@0.1.19
  - @firebase/util@0.3.2
  - @firebase/analytics-types@0.4.0
  - @firebase/installations@0.4.17

## 0.4.2

### Patch Changes

- [`2a0d254f`](https://github.com/firebase/firebase-js-sdk/commit/2a0d254fa58e607842fc0380c8cfa7bbbb69df75) [#3555](https://github.com/firebase/firebase-js-sdk/pull/3555) - Added Browser Extension check for Firebase Analytics. `analytics.isSupported()` will now return `Promise<false>` for extension environments.

- Updated dependencies [[`d4ca3da0`](https://github.com/firebase/firebase-js-sdk/commit/d4ca3da0a59fcea1261ba69d7eb663bba38d3089)]:
  - @firebase/util@0.3.1
  - @firebase/component@0.1.18
  - @firebase/installations@0.4.16

## 0.4.1

### Patch Changes

- [`a87676b8`](https://github.com/firebase/firebase-js-sdk/commit/a87676b84b78ccc2f057a22eb947a5d13402949c) [#3472](https://github.com/firebase/firebase-js-sdk/pull/3472) - - Fix an error where an analytics PR included a change to `@firebase/util`, but
  the util package was not properly included in the changeset for a patch bump.

  - `@firebase/util` adds environment check methods `isIndexedDBAvailable`
    `validateIndexedDBOpenable`, and `areCookiesEnabled`.

- Updated dependencies [[`a87676b8`](https://github.com/firebase/firebase-js-sdk/commit/a87676b84b78ccc2f057a22eb947a5d13402949c)]:
  - @firebase/util@0.3.0
  - @firebase/component@0.1.17
  - @firebase/installations@0.4.15

## 0.4.0

### Minor Changes

- [`02419ce8`](https://github.com/firebase/firebase-js-sdk/commit/02419ce8470141f012d9ce425a6a4a4aa912e480) [#3165](https://github.com/firebase/firebase-js-sdk/pull/3165) - Issue 2393 fix - analytics module

  - Added a public method `isSupported` to Analytics module which returns true if current browser context supports initialization of analytics module.
  - Added runtime checks to Analytics module that validate if cookie is enabled in current browser and if current browser environment supports indexedDB functionalities.

## 0.3.9

### Patch Changes

- [`a754645e`](https://github.com/firebase/firebase-js-sdk/commit/a754645ec2be1b8c205f25f510196eee298b0d6e) [#3297](https://github.com/firebase/firebase-js-sdk/pull/3297) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependency typescript to v3.9.5

- Updated dependencies [[`a754645e`](https://github.com/firebase/firebase-js-sdk/commit/a754645ec2be1b8c205f25f510196eee298b0d6e)]:
  - @firebase/component@0.1.16
  - @firebase/installations@0.4.14
  - @firebase/logger@0.2.6
