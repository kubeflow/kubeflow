# Unreleased

## 0.10.8

### Patch Changes

- [`fb3e35965`](https://github.com/firebase/firebase-js-sdk/commit/fb3e35965b23f88e318dd877fabade16cdcb6385) [#5146](https://github.com/firebase/firebase-js-sdk/pull/5146) - Fix sending of auth tokens on node.

## 0.10.7

### Patch Changes

- [`99414a51c`](https://github.com/firebase/firebase-js-sdk/commit/99414a51ca5cd25f69a96e4c9949ad5b84e3f64e) [#5082](https://github.com/firebase/firebase-js-sdk/pull/5082) - On Node, always send Auth and AppCheck tokens when they are available.

## 0.10.6

### Patch Changes

- Updated dependencies [[`56a6a9d4a`](https://github.com/firebase/firebase-js-sdk/commit/56a6a9d4af2766154584a0f66d3c4d8024d74ba5)]:
  - @firebase/component@0.5.4

## 0.10.5

### Patch Changes

- Updated dependencies [[`725ab4684`](https://github.com/firebase/firebase-js-sdk/commit/725ab4684ef0999a12f71e704c204a00fb030e5d)]:
  - @firebase/component@0.5.3

## 0.10.4

### Patch Changes

- Updated dependencies [[`4c4b6aed9`](https://github.com/firebase/firebase-js-sdk/commit/4c4b6aed9757c9a7e75fb698a15e53274f93880b)]:
  - @firebase/component@0.5.2

## 0.10.3

### Patch Changes

- Updated dependencies [[`5fbc5fb01`](https://github.com/firebase/firebase-js-sdk/commit/5fbc5fb0140d7da980fd7ebbfbae810f8c64ae19)]:
  - @firebase/component@0.5.1

## 0.10.2

### Patch Changes

- [`2a5039ee3`](https://github.com/firebase/firebase-js-sdk/commit/2a5039ee3242fb4109da9dee36ac978d78519334) [#4796](https://github.com/firebase/firebase-js-sdk/pull/4796) - Fix `index not defined` errors for orderByChild get requests

## 0.10.1

### Patch Changes

- [`5b202f852`](https://github.com/firebase/firebase-js-sdk/commit/5b202f852ca68b35b06b0ea17e4b6b8c446c651c) [#4864](https://github.com/firebase/firebase-js-sdk/pull/4864) - Fixed an issue that could cause `once()` to fire more than once if the value was modified inside its callback.

## 0.10.0

### Minor Changes

- [`ac4ad08a2`](https://github.com/firebase/firebase-js-sdk/commit/ac4ad08a284397ec966e991dd388bb1fba857467) [#4792](https://github.com/firebase/firebase-js-sdk/pull/4792) - Add mockUserToken support for database emulator.

### Patch Changes

- Updated dependencies [[`c34ac7a92`](https://github.com/firebase/firebase-js-sdk/commit/c34ac7a92a616915f38d192654db7770d81747ae), [`ac4ad08a2`](https://github.com/firebase/firebase-js-sdk/commit/ac4ad08a284397ec966e991dd388bb1fba857467)]:
  - @firebase/component@0.5.0
  - @firebase/util@1.1.0

## 0.9.12

### Patch Changes

- [`8d63eacf9`](https://github.com/firebase/firebase-js-sdk/commit/8d63eacf964c6e6b3b8ffe06bf682844ee430fbc) [#4832](https://github.com/firebase/firebase-js-sdk/pull/4832) (fixes [#4818](https://github.com/firebase/firebase-js-sdk/issues/4818)) - Fixes an issue that prevented the SDK from firing cancel events for Rules violations.

* [`d422436d1`](https://github.com/firebase/firebase-js-sdk/commit/d422436d1d83f82aee8028e3a24c8e18d9d7c098) [#4828](https://github.com/firebase/firebase-js-sdk/pull/4828) (fixes [#4811](https://github.com/firebase/firebase-js-sdk/issues/4811)) - Fixes a regression introduced with 8.4.1 that broke `useEmulator()`.

## 0.9.11

### Patch Changes

- [`191184eb4`](https://github.com/firebase/firebase-js-sdk/commit/191184eb454109bff9198274fc416664b126d7ec) [#4801](https://github.com/firebase/firebase-js-sdk/pull/4801) - Fixes an internal conflict when using v8 and v9 SDKs in the same package.

- Updated dependencies [[`3f370215a`](https://github.com/firebase/firebase-js-sdk/commit/3f370215aa571db6b41b92a7d8a9aaad2ea0ecd0)]:
  - @firebase/auth-interop-types@0.1.6

## 0.9.10

### Patch Changes

- [`74fa5064a`](https://github.com/firebase/firebase-js-sdk/commit/74fa5064ae6a183b229975dc858c5ee0f567d0d4) [#4777](https://github.com/firebase/firebase-js-sdk/pull/4777) - Fix a build issue that caused SDK breakage.

## 0.9.9

### Patch Changes

- [`7354a0ed4`](https://github.com/firebase/firebase-js-sdk/commit/7354a0ed438f4e3df6577e4927e8c8f8f1fbbfda) [#4720](https://github.com/firebase/firebase-js-sdk/pull/4720) - Internal changes to Database and Validation APIs.

- Updated dependencies [[`e46ebb743`](https://github.com/firebase/firebase-js-sdk/commit/e46ebb743f670f3b7d2160164addeddf918fb0cb), [`7354a0ed4`](https://github.com/firebase/firebase-js-sdk/commit/7354a0ed438f4e3df6577e4927e8c8f8f1fbbfda)]:
  - @firebase/database-types@0.7.2
  - @firebase/util@1.0.0
  - @firebase/component@0.4.1

## 0.9.8

### Patch Changes

- Updated dependencies [[`f24d8961b`](https://github.com/firebase/firebase-js-sdk/commit/f24d8961b3b87821413297688803fc85113086b3)]:
  - @firebase/component@0.4.0
  - @firebase/database-types@0.7.1

## 0.9.7

### Patch Changes

- Updated dependencies [[`de5f90501`](https://github.com/firebase/firebase-js-sdk/commit/de5f9050137acc9ed1490082e5aa429b5de3cb2a)]:
  - @firebase/util@0.4.1
  - @firebase/component@0.3.1

## 0.9.6

### Patch Changes

- [`5c1a83ed7`](https://github.com/firebase/firebase-js-sdk/commit/5c1a83ed70bae979322bd8751c0885d683ce4bf3) [#4595](https://github.com/firebase/firebase-js-sdk/pull/4595) - Component facotry now takes an options object. And added `Provider.initialize()` that can be used to pass an options object to the component factory.

- Updated dependencies [[`5c1a83ed7`](https://github.com/firebase/firebase-js-sdk/commit/5c1a83ed70bae979322bd8751c0885d683ce4bf3)]:
  - @firebase/component@0.3.0

## 0.9.5

### Patch Changes

- Updated dependencies [[`ec95df3d0`](https://github.com/firebase/firebase-js-sdk/commit/ec95df3d07e5f091f2a7f7327e46417f64d04b4e)]:
  - @firebase/util@0.4.0
  - @firebase/component@0.2.1

## 0.9.4

### Patch Changes

- Updated dependencies [[`6afe42613`](https://github.com/firebase/firebase-js-sdk/commit/6afe42613ed3d7a842d378dc1a09a795811db2ac)]:
  - @firebase/component@0.2.0

## 0.9.3

### Patch Changes

- [`318af5471`](https://github.com/firebase/firebase-js-sdk/commit/318af54715dc61a09897b144dd8841fec1abd8a3) [#4408](https://github.com/firebase/firebase-js-sdk/pull/4408) - Fixed an issue with `Query.get()` where Query filters are not applied to data in some cases.

* [`05614aa86`](https://github.com/firebase/firebase-js-sdk/commit/05614aa86614994b69df154bd6ce34861fae37a5) [#4427](https://github.com/firebase/firebase-js-sdk/pull/4427) - Add `startAfter()` and `endBefore()` to the Realtime Database TypeScript definitions.

* Updated dependencies [[`05614aa86`](https://github.com/firebase/firebase-js-sdk/commit/05614aa86614994b69df154bd6ce34861fae37a5)]:
  - @firebase/database-types@0.7.0

## 0.9.2

### Patch Changes

- [`0af2bdfc6`](https://github.com/firebase/firebase-js-sdk/commit/0af2bdfc6b8be3f362cd630e2a917c5a070c568e) [#4363](https://github.com/firebase/firebase-js-sdk/pull/4363) - Fixed an issue with startAfter/endBefore when used in orderByKey queries

## 0.9.1

### Patch Changes

- [`04a0fea9e`](https://github.com/firebase/firebase-js-sdk/commit/04a0fea9ef291a7da244665289a1aed32e4e7a3b) [#4299](https://github.com/firebase/firebase-js-sdk/pull/4299) - get()s issued for queries that are being listened to no longer send backend requests.

## 0.9.0

### Minor Changes

- [`cb835e723`](https://github.com/firebase/firebase-js-sdk/commit/cb835e723fab2a85a4e073a3f09354e3e6520dd1) [#4232](https://github.com/firebase/firebase-js-sdk/pull/4232) - Add `startAfter` and `endBefore` filters for paginating RTDB queries.

## 0.8.3

### Patch Changes

- [`50abe6c4d`](https://github.com/firebase/firebase-js-sdk/commit/50abe6c4d455693ef6a3a3c1bc8ef6ab5b8bd9ea) [#4199](https://github.com/firebase/firebase-js-sdk/pull/4199) - Fixes an issue that caused `refFromUrl()` to reject production database URLs when `useEmulator()` was used.

## 0.8.2

### Patch Changes

- [`487f8e1d2`](https://github.com/firebase/firebase-js-sdk/commit/487f8e1d2c6bd1a54305f2b0f148b4985f3cea8e) [#4247](https://github.com/firebase/firebase-js-sdk/pull/4247) (fixes [#3681](https://github.com/firebase/firebase-js-sdk/issues/3681)) - Fix issue with multiple database instances when using Realtime Database emulator (#3681)

## 0.8.1

### Patch Changes

- Updated dependencies [[`4f6313262`](https://github.com/firebase/firebase-js-sdk/commit/4f63132622fa46ca7373ab93440c76bcb1822620)]:
  - @firebase/database-types@0.6.1

## 0.8.0

### Minor Changes

- [`34973cde2`](https://github.com/firebase/firebase-js-sdk/commit/34973cde218e570baccd235d5bb6c6146559f80b) [#3812](https://github.com/firebase/firebase-js-sdk/pull/3812) - Add a `get` method for database queries that returns server result when connected

## 0.7.1

### Patch Changes

- Updated dependencies [[`9cf727fcc`](https://github.com/firebase/firebase-js-sdk/commit/9cf727fcc3d049551b16ae0698ac33dc2fe45ada)]:
  - @firebase/util@0.3.4
  - @firebase/component@0.1.21

## 0.7.0

### Minor Changes

- [`ef33328f7`](https://github.com/firebase/firebase-js-sdk/commit/ef33328f7cb7d585a1304ed39649f5b69a111b3c) [#3904](https://github.com/firebase/firebase-js-sdk/pull/3904) - Add a useEmulator(host, port) method to Realtime Database

### Patch Changes

- [`a5768b0aa`](https://github.com/firebase/firebase-js-sdk/commit/a5768b0aa7d7ce732279931aa436e988c9f36487) [#3932](https://github.com/firebase/firebase-js-sdk/pull/3932) - Point browser field to esm build. Now you need to use default import instead of namespace import to import firebase.

  Before this change

  ```
  import * as firebase from 'firebase/app';
  ```

  After this change

  ```
  import firebase from 'firebase/app';
  ```

* [`602ec18e9`](https://github.com/firebase/firebase-js-sdk/commit/602ec18e92fd365a3a6432ff3a5f6a31013eb1f5) [#3968](https://github.com/firebase/firebase-js-sdk/pull/3968) - Updated the type definition for `ThenableReference` to only implement `then` and `catch`, which matches the implementation.

* Updated dependencies [[`ef33328f7`](https://github.com/firebase/firebase-js-sdk/commit/ef33328f7cb7d585a1304ed39649f5b69a111b3c), [`a5768b0aa`](https://github.com/firebase/firebase-js-sdk/commit/a5768b0aa7d7ce732279931aa436e988c9f36487), [`7d916d905`](https://github.com/firebase/firebase-js-sdk/commit/7d916d905ba16816ac8ac7c8748c83831ff614ce), [`602ec18e9`](https://github.com/firebase/firebase-js-sdk/commit/602ec18e92fd365a3a6432ff3a5f6a31013eb1f5)]:
  - @firebase/database-types@0.6.0
  - @firebase/component@0.1.20
  - @firebase/util@0.3.3

## 0.6.13

### Patch Changes

- [`3d9b5a595`](https://github.com/firebase/firebase-js-sdk/commit/3d9b5a595813b6c4f7f6ef4e3625ae8856a9fa23) [#3736](https://github.com/firebase/firebase-js-sdk/pull/3736) - Fix detection of admin context in Realtime Database SDK

## 0.6.12

### Patch Changes

- [`d347c6ca1`](https://github.com/firebase/firebase-js-sdk/commit/d347c6ca1bcb7cd48ab2e4f7954cabafe761aea7) [#3650](https://github.com/firebase/firebase-js-sdk/pull/3650) - The SDK can now infer a default database URL if none is provided in the config.

- Updated dependencies [[`da1c7df79`](https://github.com/firebase/firebase-js-sdk/commit/da1c7df7982b08bbef82fcc8d93255f3e2d23cca), [`fb3b095e4`](https://github.com/firebase/firebase-js-sdk/commit/fb3b095e4b7c8f57fdb3172bc039c84576abf290)]:
  - @firebase/component@0.1.19
  - @firebase/util@0.3.2

## 0.6.11

### Patch Changes

- Updated dependencies [[`d4ca3da0`](https://github.com/firebase/firebase-js-sdk/commit/d4ca3da0a59fcea1261ba69d7eb663bba38d3089)]:
  - @firebase/util@0.3.1
  - @firebase/component@0.1.18

## 0.6.10

### Patch Changes

- [`ef348fed`](https://github.com/firebase/firebase-js-sdk/commit/ef348fed291338351706a697cbb9fb17a9d06ff4) [#3511](https://github.com/firebase/firebase-js-sdk/pull/3511) - Added interface `Database` which is implemented by `FirebaseDatabase`. This allows consumer SDKs (such as the Firebase Admin SDK) to export the database types as an interface.

- Updated dependencies [[`ef348fed`](https://github.com/firebase/firebase-js-sdk/commit/ef348fed291338351706a697cbb9fb17a9d06ff4)]:
  - @firebase/database-types@0.5.2

## 0.6.9

### Patch Changes

- Updated dependencies [[`a87676b8`](https://github.com/firebase/firebase-js-sdk/commit/a87676b84b78ccc2f057a22eb947a5d13402949c)]:
  - @firebase/util@0.3.0
  - @firebase/component@0.1.17

## 0.6.8

### Patch Changes

- [`c2b737b2`](https://github.com/firebase/firebase-js-sdk/commit/c2b737b2187cb525af4d926ca477102db7835420) [#3228](https://github.com/firebase/firebase-js-sdk/pull/3228) Thanks [@schmidt-sebastian](https://github.com/schmidt-sebastian)! - [fix] Instead of using production auth, the SDK will use test credentials
  to connect to the Emulator when the RTDB SDK is used via the Firebase
  Admin SDK.

## 0.6.7

### Patch Changes

- [`a754645e`](https://github.com/firebase/firebase-js-sdk/commit/a754645ec2be1b8c205f25f510196eee298b0d6e) [#3297](https://github.com/firebase/firebase-js-sdk/pull/3297) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependency typescript to v3.9.5

- Updated dependencies [[`a754645e`](https://github.com/firebase/firebase-js-sdk/commit/a754645ec2be1b8c205f25f510196eee298b0d6e)]:
  - @firebase/component@0.1.16
  - @firebase/logger@0.2.6
- [changed] Added internal HTTP header to the WebSocket connection.
- [feature] Added ServerValue.increment() to support atomic field value increments
  without transactions.
- [fixed] Fixed Realtime Database URL parsing bug to support domains with more than 3 components.

## 0.5.6

- [fixed] Fixed an issue that caused large numeric values with leading zeros to
  not always be sorted correctly.

## 0.5.3

- [changed] Internal cleanup to Node.JS support.

## 0.5.0

- [fixed] Fixed an issue that caused `.info/serverTimeOffset` events not to fire (#2043).
- [changed] Treat `ns` url query parameter as the default Realtime Database
  namespace name.

## 0.4.11

- [fixed] Fixed an issue where multi-byte UTF-8 characters would not be written correctly when using `firebase.js` or `firebase-database.js` (#2035).

## 0.4.0

- [changed] Improved consistency between the type annotations for `Query.on`/`Reference.on`,
  `Query.off`/`Reference.off` and `Query.once`/`Reference.once` (#1188, #1204).
