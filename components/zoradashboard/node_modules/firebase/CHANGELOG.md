# firebase

## 8.8.0

### Minor Changes

- [`b3caa5158`](https://github.com/firebase/firebase-js-sdk/commit/b3caa515846d2bfcf4a95dedff69f08d503cbfc2) [#5149](https://github.com/firebase/firebase-js-sdk/pull/5149) - Add NodeJS support to Cloud Storage for Firebase. This release changes the `main` field in package.json to point to a Node specific build. If you are building a bundle for borwser usage, please make sure that your bundler uses the `browser` field (the default).

* [`02586c975`](https://github.com/firebase/firebase-js-sdk/commit/02586c9754318b01a0051561d2c7c4906059b5af) [#5070](https://github.com/firebase/firebase-js-sdk/pull/5070) - Add `firebase_screen` and `firebase_screen_class` to `logEvent()` overload for `screen_view` events.

### Patch Changes

- [`2cd9d7c39`](https://github.com/firebase/firebase-js-sdk/commit/2cd9d7c394dd0c84f285fbcfa4b0a5d79509451f) [#5147](https://github.com/firebase/firebase-js-sdk/pull/5147) (fixes [#5047](https://github.com/firebase/firebase-js-sdk/issues/5047)) - Fixed an issue that prevented Timestamps from being used via `update()` when connected to the Emulator

- Updated dependencies [[`b3caa5158`](https://github.com/firebase/firebase-js-sdk/commit/b3caa515846d2bfcf4a95dedff69f08d503cbfc2), [`b51be1da3`](https://github.com/firebase/firebase-js-sdk/commit/b51be1da318a8f79ff159bcb8be9797d192519fd), [`2cd9d7c39`](https://github.com/firebase/firebase-js-sdk/commit/2cd9d7c394dd0c84f285fbcfa4b0a5d79509451f), [`fb3e35965`](https://github.com/firebase/firebase-js-sdk/commit/fb3e35965b23f88e318dd877fabade16cdcb6385)]:
  - @firebase/storage@0.6.0
  - @firebase/firestore@2.3.9
  - @firebase/database@0.10.8
  - @firebase/analytics@0.6.15

## 8.7.1

### Patch Changes

- Updated dependencies [[`99414a51c`](https://github.com/firebase/firebase-js-sdk/commit/99414a51ca5cd25f69a96e4c9949ad5b84e3f64e)]:
  - @firebase/database@0.10.7

## 8.7.0

### Minor Changes

- [`870dd5e35`](https://github.com/firebase/firebase-js-sdk/commit/870dd5e3594f5b588bdc2801c60c6d984d1d08cc) [#5033](https://github.com/firebase/firebase-js-sdk/pull/5033) - Added `getToken()` and `onTokenChanged` methods to App Check.

### Patch Changes

- Updated dependencies [[`870dd5e35`](https://github.com/firebase/firebase-js-sdk/commit/870dd5e3594f5b588bdc2801c60c6d984d1d08cc), [`5d007b8fb`](https://github.com/firebase/firebase-js-sdk/commit/5d007b8fb64ac26c2f82704398965e9f3deda58a), [`5d31e2192`](https://github.com/firebase/firebase-js-sdk/commit/5d31e2192d0ea68a768bc7826ad5aa830c2bc36c), [`56a6a9d4a`](https://github.com/firebase/firebase-js-sdk/commit/56a6a9d4af2766154584a0f66d3c4d8024d74ba5)]:
  - @firebase/app-check@0.2.0
  - @firebase/auth@0.16.8
  - @firebase/firestore@2.3.8
  - @firebase/storage@0.5.6
  - @firebase/analytics@0.6.14
  - @firebase/app@0.6.28
  - @firebase/database@0.10.6
  - @firebase/functions@0.6.13
  - @firebase/installations@0.4.30
  - @firebase/messaging@0.7.14
  - @firebase/performance@0.4.16
  - @firebase/remote-config@0.1.41

## 8.6.8

### Patch Changes

- Updated dependencies [[`c81cf82fa`](https://github.com/firebase/firebase-js-sdk/commit/c81cf82fac14cbfaebc0e440235c3fb38af22d38)]:
  - @firebase/auth@0.16.7
  - @firebase/storage@0.5.5
  - @firebase/analytics@0.6.13
  - @firebase/app@0.6.27
  - @firebase/app-check@0.1.4
  - @firebase/database@0.10.5
  - @firebase/firestore@2.3.7
  - @firebase/functions@0.6.12
  - @firebase/installations@0.4.29
  - @firebase/messaging@0.7.13
  - @firebase/performance@0.4.15
  - @firebase/remote-config@0.1.40

## 8.6.7

### Patch Changes

- Updated dependencies [[`1d54447ca`](https://github.com/firebase/firebase-js-sdk/commit/1d54447ca928ab50228600858978bb3b341c0507)]:
  - @firebase/app@0.6.26
  - @firebase/firestore@2.3.6

## 8.6.6

### Patch Changes

- Updated dependencies [[`4c4b6aed9`](https://github.com/firebase/firebase-js-sdk/commit/4c4b6aed9757c9a7e75fb698a15e53274f93880b)]:
  - @firebase/firestore@2.3.5
  - @firebase/analytics@0.6.12
  - @firebase/app@0.6.25
  - @firebase/app-check@0.1.3
  - @firebase/database@0.10.4
  - @firebase/functions@0.6.11
  - @firebase/installations@0.4.28
  - @firebase/messaging@0.7.12
  - @firebase/performance@0.4.14
  - @firebase/remote-config@0.1.39
  - @firebase/storage@0.5.4

## 8.6.5

### Patch Changes

- Updated dependencies []:
  - @firebase/app@0.6.24
  - @firebase/firestore@2.3.4

## 8.6.4

### Patch Changes

- [`b49345d31`](https://github.com/firebase/firebase-js-sdk/commit/b49345d31cdd3dfd42d65768156818dc09c7fa61) [#4283](https://github.com/firebase/firebase-js-sdk/pull/4283) (fixes [#4235](https://github.com/firebase/firebase-js-sdk/issues/4235)) - set firebase.SDK_VERSION to the latest value

- Updated dependencies [[`92e4e8d29`](https://github.com/firebase/firebase-js-sdk/commit/92e4e8d2996c690837a203a868b0d26bf6e3ad84)]:
  - @firebase/functions@0.6.10
  - @firebase/analytics@0.6.11
  - @firebase/app@0.6.23
  - @firebase/app-check@0.1.2
  - @firebase/database@0.10.3
  - @firebase/firestore@2.3.3
  - @firebase/installations@0.4.27
  - @firebase/messaging@0.7.11
  - @firebase/performance@0.4.13
  - @firebase/remote-config@0.1.38
  - @firebase/storage@0.5.3

## 8.6.3

### Patch Changes

- Updated dependencies [[`169174520`](https://github.com/firebase/firebase-js-sdk/commit/169174520f6451f5741fd50e8957d4097895e97a), [`2a5039ee3`](https://github.com/firebase/firebase-js-sdk/commit/2a5039ee3242fb4109da9dee36ac978d78519334)]:
  - @firebase/firestore@2.3.2
  - @firebase/database@0.10.2

## 8.6.2

### Patch Changes

- Updated dependencies [[`de68cdca2`](https://github.com/firebase/firebase-js-sdk/commit/de68cdca21c6ba5a890807857b529c2187e4adba), [`96a47097f`](https://github.com/firebase/firebase-js-sdk/commit/96a47097f36fa33f16b3f63b8cc72d256710e528), [`997040ace`](https://github.com/firebase/firebase-js-sdk/commit/997040ace70de0891c9dea78b6da89e4886163b9)]:
  - @firebase/auth@0.16.6
  - @firebase/firestore@2.3.1
  - @firebase/functions@0.6.9

## 8.6.1

### Patch Changes

- Updated dependencies [[`60e834739`](https://github.com/firebase/firebase-js-sdk/commit/60e83473940e60f8390b1b0f97cf45a1733f66f0), [`5b202f852`](https://github.com/firebase/firebase-js-sdk/commit/5b202f852ca68b35b06b0ea17e4b6b8c446c651c)]:
  - @firebase/app@0.6.22
  - @firebase/app-check@0.1.1
  - @firebase/database@0.10.1

## 8.6.0

### Minor Changes

- [`81c131abe`](https://github.com/firebase/firebase-js-sdk/commit/81c131abea7001c5933156ff6b0f3925f16ff052) [#4860](https://github.com/firebase/firebase-js-sdk/pull/4860) - Release the Firebase App Check package.

### Patch Changes

- [`cc7207e25`](https://github.com/firebase/firebase-js-sdk/commit/cc7207e25f09870c6c718b8e209e694661676d27) [#4870](https://github.com/firebase/firebase-js-sdk/pull/4870) - Fix database.useEmulator typing.

- Updated dependencies [[`81c131abe`](https://github.com/firebase/firebase-js-sdk/commit/81c131abea7001c5933156ff6b0f3925f16ff052)]:
  - @firebase/app-check@0.1.0

## 8.5.0

### Minor Changes

- [`97f61e6f3`](https://github.com/firebase/firebase-js-sdk/commit/97f61e6f3d24e5b4c92ed248bb531233a94b9eaf) [#4837](https://github.com/firebase/firebase-js-sdk/pull/4837) (fixes [#4715](https://github.com/firebase/firebase-js-sdk/issues/4715)) - Add mockUserToken support for Firestore.

* [`ac4ad08a2`](https://github.com/firebase/firebase-js-sdk/commit/ac4ad08a284397ec966e991dd388bb1fba857467) [#4792](https://github.com/firebase/firebase-js-sdk/pull/4792) - Add mockUserToken support for database emulator.

### Patch Changes

- Updated dependencies [[`97f61e6f3`](https://github.com/firebase/firebase-js-sdk/commit/97f61e6f3d24e5b4c92ed248bb531233a94b9eaf), [`e123f241c`](https://github.com/firebase/firebase-js-sdk/commit/e123f241c0cf39a983645582c4e42b7a5bff7bd6), [`ac4ad08a2`](https://github.com/firebase/firebase-js-sdk/commit/ac4ad08a284397ec966e991dd388bb1fba857467)]:
  - @firebase/firestore@2.3.0
  - @firebase/app@0.6.21
  - @firebase/database@0.10.0
  - @firebase/util@1.1.0
  - @firebase/analytics@0.6.10
  - @firebase/functions@0.6.8
  - @firebase/installations@0.4.26
  - @firebase/messaging@0.7.10
  - @firebase/performance@0.4.12
  - @firebase/remote-config@0.1.37
  - @firebase/storage@0.5.2

## 8.4.3

### Patch Changes

- Updated dependencies [[`8d63eacf9`](https://github.com/firebase/firebase-js-sdk/commit/8d63eacf964c6e6b3b8ffe06bf682844ee430fbc), [`d422436d1`](https://github.com/firebase/firebase-js-sdk/commit/d422436d1d83f82aee8028e3a24c8e18d9d7c098)]:
  - @firebase/database@0.9.12

## 8.4.2

### Patch Changes

- Updated dependencies [[`633463e2a`](https://github.com/firebase/firebase-js-sdk/commit/633463e2abfdef7dbb6d9bf5275df21d6a01fcb6), [`c65883680`](https://github.com/firebase/firebase-js-sdk/commit/c658836806e0a5fef11fa61cd68f98960567f31b), [`364e336a0`](https://github.com/firebase/firebase-js-sdk/commit/364e336a04e419d019846d702cf27144aeb8939e), [`191184eb4`](https://github.com/firebase/firebase-js-sdk/commit/191184eb454109bff9198274fc416664b126d7ec)]:
  - @firebase/firestore@2.2.5
  - @firebase/storage@0.5.1
  - @firebase/database@0.9.11
  - @firebase/auth@0.16.5

## 8.4.1

### Patch Changes

- Updated dependencies [[`74fa5064a`](https://github.com/firebase/firebase-js-sdk/commit/74fa5064ae6a183b229975dc858c5ee0f567d0d4)]:
  - @firebase/database@0.9.10

## 8.4.0

### Minor Changes

- [`5ae73656d`](https://github.com/firebase/firebase-js-sdk/commit/5ae73656d976fa724ea6ca86d496e9531c95b29c) [#4346](https://github.com/firebase/firebase-js-sdk/pull/4346) - Add `storage().useEmulator()` method to enable emulator mode for storage, allowing users
  to set a storage emulator host and port.

### Patch Changes

- [`7354a0ed4`](https://github.com/firebase/firebase-js-sdk/commit/7354a0ed438f4e3df6577e4927e8c8f8f1fbbfda) [#4720](https://github.com/firebase/firebase-js-sdk/pull/4720) - Internal changes to Database and Validation APIs.

- Updated dependencies [[`7354a0ed4`](https://github.com/firebase/firebase-js-sdk/commit/7354a0ed438f4e3df6577e4927e8c8f8f1fbbfda), [`6db185be5`](https://github.com/firebase/firebase-js-sdk/commit/6db185be5ed297ba2a8b6c0a098319131da7b552), [`5ae73656d`](https://github.com/firebase/firebase-js-sdk/commit/5ae73656d976fa724ea6ca86d496e9531c95b29c)]:
  - @firebase/util@1.0.0
  - @firebase/database@0.9.9
  - @firebase/firestore@2.2.4
  - @firebase/storage@0.5.0
  - @firebase/analytics@0.6.9
  - @firebase/app@0.6.20
  - @firebase/installations@0.4.25
  - @firebase/messaging@0.7.9
  - @firebase/performance@0.4.11
  - @firebase/remote-config@0.1.36
  - @firebase/functions@0.6.7

## 8.3.3

### Patch Changes

- Updated dependencies [[`f24d8961b`](https://github.com/firebase/firebase-js-sdk/commit/f24d8961b3b87821413297688803fc85113086b3)]:
  - @firebase/app-types@0.6.2
  - @firebase/app@0.6.19
  - @firebase/analytics@0.6.8
  - @firebase/database@0.9.8
  - @firebase/firestore@2.2.3
  - @firebase/functions@0.6.6
  - @firebase/installations@0.4.24
  - @firebase/messaging@0.7.8
  - @firebase/performance@0.4.10
  - @firebase/remote-config@0.1.35
  - @firebase/storage@0.4.7

## 8.3.2

### Patch Changes

- Updated dependencies [[`de5f90501`](https://github.com/firebase/firebase-js-sdk/commit/de5f9050137acc9ed1490082e5aa429b5de3cb2a), [`4cb0945c6`](https://github.com/firebase/firebase-js-sdk/commit/4cb0945c6e7d9ba729d34f893942f039443346aa)]:
  - @firebase/util@0.4.1
  - @firebase/firestore@2.2.2
  - @firebase/analytics@0.6.7
  - @firebase/app@0.6.18
  - @firebase/database@0.9.7
  - @firebase/installations@0.4.23
  - @firebase/messaging@0.7.7
  - @firebase/performance@0.4.9
  - @firebase/remote-config@0.1.34
  - @firebase/storage@0.4.6
  - @firebase/functions@0.6.5

## 8.3.1

### Patch Changes

- Updated dependencies [[`5c1a83ed7`](https://github.com/firebase/firebase-js-sdk/commit/5c1a83ed70bae979322bd8751c0885d683ce4bf3)]:
  - @firebase/database@0.9.6
  - @firebase/firestore@2.2.1
  - @firebase/functions@0.6.4
  - @firebase/remote-config@0.1.33
  - @firebase/storage@0.4.5
  - @firebase/analytics@0.6.6
  - @firebase/app@0.6.17
  - @firebase/installations@0.4.22
  - @firebase/messaging@0.7.6
  - @firebase/performance@0.4.8

## 8.3.0

### Minor Changes

- [`b6080a857`](https://github.com/firebase/firebase-js-sdk/commit/b6080a857b1b56e10db041e6357acd69154e31fb) [#4577](https://github.com/firebase/firebase-js-sdk/pull/4577) - Added support to remove a FirestoreDataConverter on a Firestore reference by calling `withConverter(null)`

### Patch Changes

- Updated dependencies [[`ec95df3d0`](https://github.com/firebase/firebase-js-sdk/commit/ec95df3d07e5f091f2a7f7327e46417f64d04b4e), [`b6080a857`](https://github.com/firebase/firebase-js-sdk/commit/b6080a857b1b56e10db041e6357acd69154e31fb)]:
  - @firebase/util@0.4.0
  - @firebase/firestore@2.2.0
  - @firebase/analytics@0.6.5
  - @firebase/app@0.6.16
  - @firebase/database@0.9.5
  - @firebase/installations@0.4.21
  - @firebase/messaging@0.7.5
  - @firebase/performance@0.4.7
  - @firebase/remote-config@0.1.32
  - @firebase/storage@0.4.4
  - @firebase/functions@0.6.3

## 8.2.10

### Patch Changes

- [`d4ba8daa2`](https://github.com/firebase/firebase-js-sdk/commit/d4ba8daa298ec00f1800374e2bc5c6200575a233) [#4469](https://github.com/firebase/firebase-js-sdk/pull/4469) - Change the `eventParams` argument in the signature of `analytics().logEvent()` to be optional.

## 8.2.9

### Patch Changes

- Updated dependencies []:
  - @firebase/analytics@0.6.4
  - @firebase/app@0.6.15
  - @firebase/database@0.9.4
  - @firebase/firestore@2.1.7
  - @firebase/functions@0.6.2
  - @firebase/installations@0.4.20
  - @firebase/messaging@0.7.4
  - @firebase/performance@0.4.6
  - @firebase/remote-config@0.1.31
  - @firebase/storage@0.4.3

## 8.2.8

### Patch Changes

- Updated dependencies [[`74bf52009`](https://github.com/firebase/firebase-js-sdk/commit/74bf52009b291a62deabfd865084d4e0fcacc483)]:
  - @firebase/analytics@0.6.3
  - @firebase/auth@0.16.4

## 8.2.7

### Patch Changes

- [`05614aa86`](https://github.com/firebase/firebase-js-sdk/commit/05614aa86614994b69df154bd6ce34861fae37a5) [#4427](https://github.com/firebase/firebase-js-sdk/pull/4427) - Add `startAfter()` and `endBefore()` to the Realtime Database TypeScript definitions.

- Updated dependencies [[`a718518e9`](https://github.com/firebase/firebase-js-sdk/commit/a718518e935931709669ea2e88f9711143655e61), [`3d0cd6f33`](https://github.com/firebase/firebase-js-sdk/commit/3d0cd6f33127e75e15aec9b6589eea360827df7a), [`318af5471`](https://github.com/firebase/firebase-js-sdk/commit/318af54715dc61a09897b144dd8841fec1abd8a3), [`05614aa86`](https://github.com/firebase/firebase-js-sdk/commit/05614aa86614994b69df154bd6ce34861fae37a5)]:
  - @firebase/firestore@2.1.6
  - @firebase/database@0.9.3

## 8.2.6

### Patch Changes

- Updated dependencies [[`73bb561e1`](https://github.com/firebase/firebase-js-sdk/commit/73bb561e18ea42286a54d28648636bf1ac7fcfe0), [`9533688b1`](https://github.com/firebase/firebase-js-sdk/commit/9533688b1e39e58a550ec0527a0363270d73c5b5), [`0af2bdfc6`](https://github.com/firebase/firebase-js-sdk/commit/0af2bdfc6b8be3f362cd630e2a917c5a070c568e)]:
  - @firebase/auth@0.16.3
  - @firebase/firestore@2.1.5
  - @firebase/database@0.9.2

## 8.2.5

### Patch Changes

- Updated dependencies [[`749c7f3d9`](https://github.com/firebase/firebase-js-sdk/commit/749c7f3d985f978cd2a204cbc28c3fff09458b5b), [`04a0fea9e`](https://github.com/firebase/firebase-js-sdk/commit/04a0fea9ef291a7da244665289a1aed32e4e7a3b)]:
  - @firebase/app@0.6.14
  - @firebase/firestore@2.1.4
  - @firebase/database@0.9.1

## 8.2.4

### Patch Changes

- [`92a7f4345`](https://github.com/firebase/firebase-js-sdk/commit/92a7f434536051bedd00bc1be7e774174378aa7d) [#4280](https://github.com/firebase/firebase-js-sdk/pull/4280) - Add the `useEmulator()` function and `emulatorConfig` to the `firebase` package externs

- Updated dependencies [[`cb835e723`](https://github.com/firebase/firebase-js-sdk/commit/cb835e723fab2a85a4e073a3f09354e3e6520dd1), [`6ac66baa0`](https://github.com/firebase/firebase-js-sdk/commit/6ac66baa0e7ac8dd90a6d6136a020cdd54710df5), [`92a7f4345`](https://github.com/firebase/firebase-js-sdk/commit/92a7f434536051bedd00bc1be7e774174378aa7d)]:
  - @firebase/database@0.9.0
  - @firebase/firestore@2.1.3
  - @firebase/auth@0.16.2

## 8.2.3

### Patch Changes

- Updated dependencies [[`50abe6c4d`](https://github.com/firebase/firebase-js-sdk/commit/50abe6c4d455693ef6a3a3c1bc8ef6ab5b8bd9ea)]:
  - @firebase/database@0.8.3

## 8.2.2

### Patch Changes

- Updated dependencies [[`487f8e1d2`](https://github.com/firebase/firebase-js-sdk/commit/487f8e1d2c6bd1a54305f2b0f148b4985f3cea8e), [`6069b1d6c`](https://github.com/firebase/firebase-js-sdk/commit/6069b1d6c521d05dde821f21bcc7e02913180ae5), [`ba59a0f90`](https://github.com/firebase/firebase-js-sdk/commit/ba59a0f909a1eb59d23b887bba30b6f86d63c931)]:
  - @firebase/database@0.8.2
  - @firebase/firestore@2.1.2

## 8.2.1

### Patch Changes

- Updated dependencies [[`9fd3f5233`](https://github.com/firebase/firebase-js-sdk/commit/9fd3f5233077b45c5101789c427db51835484ce0), [`44b5251d0`](https://github.com/firebase/firebase-js-sdk/commit/44b5251d0527d1aa768959765ff04093a04dd8ab)]:
  - @firebase/auth@0.16.1
  - @firebase/firestore@2.1.1

## 8.2.0

### Minor Changes

- [`b662f8c0a`](https://github.com/firebase/firebase-js-sdk/commit/b662f8c0a9890cbdcf53cce7fe01c2a8a52d3d2d) [#4168](https://github.com/firebase/firebase-js-sdk/pull/4168) - Release Firestore Bundles (pre-packaged Firestore data). For NPM users, this can
  be enabled via an additional import: 'firebase/firestore/bundle'. For CDN usage,
  it is enabled by default.

* [`c9f379cf7`](https://github.com/firebase/firebase-js-sdk/commit/c9f379cf7ef2c5938512a45b63008bbb135926ed) [#4112](https://github.com/firebase/firebase-js-sdk/pull/4112) - Add option to hide banner in auth when using the emulator

### Patch Changes

- [`6f2c7b7aa`](https://github.com/firebase/firebase-js-sdk/commit/6f2c7b7aae72d7be88c7a477f1a5d38bd5e8dfe4) [#3896](https://github.com/firebase/firebase-js-sdk/pull/3896) - Dispatch up to 1000 events for each network request when collecting performance events.

- Updated dependencies [[`b662f8c0a`](https://github.com/firebase/firebase-js-sdk/commit/b662f8c0a9890cbdcf53cce7fe01c2a8a52d3d2d), [`1b5407372`](https://github.com/firebase/firebase-js-sdk/commit/1b54073726db8cefd994492d0cfba7c5f619f14b), [`6f2c7b7aa`](https://github.com/firebase/firebase-js-sdk/commit/6f2c7b7aae72d7be88c7a477f1a5d38bd5e8dfe4), [`c9f379cf7`](https://github.com/firebase/firebase-js-sdk/commit/c9f379cf7ef2c5938512a45b63008bbb135926ed)]:
  - @firebase/firestore@2.1.0
  - @firebase/performance@0.4.5
  - @firebase/auth@0.16.0

## 8.1.2

### Patch Changes

- [`11563b227`](https://github.com/firebase/firebase-js-sdk/commit/11563b227f30c9282c45e4a8128d5679954dcfd1) [#4146](https://github.com/firebase/firebase-js-sdk/pull/4146) - Fix issue with IndexedDB retry logic causing uncaught errors

- Updated dependencies [[`1849b0d0f`](https://github.com/firebase/firebase-js-sdk/commit/1849b0d0f0bbca56e50bea01979d20ada58040dc), [`8993f16b8`](https://github.com/firebase/firebase-js-sdk/commit/8993f16b81b4b386f2ac5195950235a6a43ed9bc), [`11563b227`](https://github.com/firebase/firebase-js-sdk/commit/11563b227f30c9282c45e4a8128d5679954dcfd1)]:
  - @firebase/firestore@2.0.5
  - @firebase/auth@0.15.3

## 8.1.1

### Patch Changes

- [`4f6313262`](https://github.com/firebase/firebase-js-sdk/commit/4f63132622fa46ca7373ab93440c76bcb1822620) [#4096](https://github.com/firebase/firebase-js-sdk/pull/4096) - Add the missing type definition for 'Query.get()' for RTDB

- Updated dependencies [[`9822e125c`](https://github.com/firebase/firebase-js-sdk/commit/9822e125c399ae7271d4a9077f82b184a44526e4)]:
  - @firebase/firestore@2.0.4
  - @firebase/database@0.8.1

## 8.1.0

### Minor Changes

- [`34973cde2`](https://github.com/firebase/firebase-js-sdk/commit/34973cde218e570baccd235d5bb6c6146559f80b) [#3812](https://github.com/firebase/firebase-js-sdk/pull/3812) - Add a `get` method for database queries that returns server result when connected

### Patch Changes

- Updated dependencies [[`6c6c49ad6`](https://github.com/firebase/firebase-js-sdk/commit/6c6c49ad6b3c3d66e9ecb8397c4ac39bea256e80), [`e0bf3f70b`](https://github.com/firebase/firebase-js-sdk/commit/e0bf3f70bf82f3587e60ab4484fe37d01cea0051), [`34973cde2`](https://github.com/firebase/firebase-js-sdk/commit/34973cde218e570baccd235d5bb6c6146559f80b)]:
  - @firebase/firestore@2.0.3
  - @firebase/database@0.8.0

## 8.0.2

### Patch Changes

- Updated dependencies [[`d2adf4e3e`](https://github.com/firebase/firebase-js-sdk/commit/d2adf4e3e69da3a4312828137f9721ea84b87fe2), [`c2b215c19`](https://github.com/firebase/firebase-js-sdk/commit/c2b215c1950b2f75abb6a8dd58544a79bda968f6), [`6dffdf2eb`](https://github.com/firebase/firebase-js-sdk/commit/6dffdf2eb1323ec9047af4ed78302a68f7dacce3), [`484e90a1d`](https://github.com/firebase/firebase-js-sdk/commit/484e90a1d8f63e04268ff5bce4e3e0873c56c8e1), [`f9dc50e35`](https://github.com/firebase/firebase-js-sdk/commit/f9dc50e3520d50b70eecd28b81887e0053f9f636)]:
  - @firebase/firestore@2.0.2
  - @firebase/auth@0.15.2
  - @firebase/storage@0.4.2

## 8.0.1

### Patch Changes

- Updated dependencies [[`54a46f89c`](https://github.com/firebase/firebase-js-sdk/commit/54a46f89c1c45435c76412fa2ed296e986c2f6ab), [`9cf727fcc`](https://github.com/firebase/firebase-js-sdk/commit/9cf727fcc3d049551b16ae0698ac33dc2fe45ada), [`007ddd1eb`](https://github.com/firebase/firebase-js-sdk/commit/007ddd1eb6be0a66df7b1c3264d8dff8857d8399)]:
  - @firebase/messaging@0.7.3
  - @firebase/util@0.3.4
  - @firebase/firestore@2.0.1
  - @firebase/functions@0.6.1
  - @firebase/analytics@0.6.2
  - @firebase/app@0.6.13
  - @firebase/database@0.7.1
  - @firebase/installations@0.4.19
  - @firebase/performance@0.4.4
  - @firebase/remote-config@0.1.30
  - @firebase/storage@0.4.1

## 8.0.0

### Major Changes

- [`a5768b0aa`](https://github.com/firebase/firebase-js-sdk/commit/a5768b0aa7d7ce732279931aa436e988c9f36487) [#3932](https://github.com/firebase/firebase-js-sdk/pull/3932) - Point browser field to esm build. Now you need to use default import instead of namespace import to import firebase.

  Before this change

  ```
  import * as firebase from 'firebase/app';
  ```

  After this change

  ```
  import firebase from 'firebase/app';
  ```

* [`8939aeca0`](https://github.com/firebase/firebase-js-sdk/commit/8939aeca02921f9eacf1badb1068de22f670293e) [#3944](https://github.com/firebase/firebase-js-sdk/pull/3944) - Removed the undocumented `Firestore.logLevel` property.

- [`344bd8856`](https://github.com/firebase/firebase-js-sdk/commit/344bd88566e2c42fd7ee92f28bb0f784629b48ee) [#3943](https://github.com/firebase/firebase-js-sdk/pull/3943) - Removed depreacted `experimentalTabSynchronization` settings. To enable multi-tab sychronization, use `synchronizeTabs` instead.

* [`4b540f91d`](https://github.com/firebase/firebase-js-sdk/commit/4b540f91dbad217e8ec04b382b4c724308cb3df1) [#3939](https://github.com/firebase/firebase-js-sdk/pull/3939) - This releases removes all input validation. Please use our TypeScript types to validate API usage.

- [`ffef32e38`](https://github.com/firebase/firebase-js-sdk/commit/ffef32e3837d3ee1098129b237e7a6e2e738182d) [#3897](https://github.com/firebase/firebase-js-sdk/pull/3897) (fixes [#3879](https://github.com/firebase/firebase-js-sdk/issues/3879)) - Removed the `timestampsInSnapshots` option from `FirestoreSettings`. Now, Firestore always returns `Timestamp` values for all timestamp values.

* [`b247ffa76`](https://github.com/firebase/firebase-js-sdk/commit/b247ffa760aec1636de6cfc78851f97a840181ae) [#3967](https://github.com/firebase/firebase-js-sdk/pull/3967) - This releases removes all input validation. Please use our TypeScript types to validate API usage.

### Minor Changes

- [`ef33328f7`](https://github.com/firebase/firebase-js-sdk/commit/ef33328f7cb7d585a1304ed39649f5b69a111b3c) [#3904](https://github.com/firebase/firebase-js-sdk/pull/3904) - Add a useEmulator(host, port) method to Realtime Database

* [`79b049375`](https://github.com/firebase/firebase-js-sdk/commit/79b04937537b90422e051086112f6b43c2880cdb) [#3909](https://github.com/firebase/firebase-js-sdk/pull/3909) - Add a useEmulator(host, port) method to Firestore

- [`0322c1bda`](https://github.com/firebase/firebase-js-sdk/commit/0322c1bda93b2885b995e3df2b63b48314546961) [#3906](https://github.com/firebase/firebase-js-sdk/pull/3906) - Add a useEmulator(host, port) method to Cloud Functions

### Patch Changes

- [`602ec18e9`](https://github.com/firebase/firebase-js-sdk/commit/602ec18e92fd365a3a6432ff3a5f6a31013eb1f5) [#3968](https://github.com/firebase/firebase-js-sdk/pull/3968) - Updated the type definition for `ThenableReference` to only implement `then` and `catch`, which matches the implementation.

- Updated dependencies [[`ef33328f7`](https://github.com/firebase/firebase-js-sdk/commit/ef33328f7cb7d585a1304ed39649f5b69a111b3c), [`a5768b0aa`](https://github.com/firebase/firebase-js-sdk/commit/a5768b0aa7d7ce732279931aa436e988c9f36487), [`8939aeca0`](https://github.com/firebase/firebase-js-sdk/commit/8939aeca02921f9eacf1badb1068de22f670293e), [`79b049375`](https://github.com/firebase/firebase-js-sdk/commit/79b04937537b90422e051086112f6b43c2880cdb), [`344bd8856`](https://github.com/firebase/firebase-js-sdk/commit/344bd88566e2c42fd7ee92f28bb0f784629b48ee), [`0322c1bda`](https://github.com/firebase/firebase-js-sdk/commit/0322c1bda93b2885b995e3df2b63b48314546961), [`4b540f91d`](https://github.com/firebase/firebase-js-sdk/commit/4b540f91dbad217e8ec04b382b4c724308cb3df1), [`ffef32e38`](https://github.com/firebase/firebase-js-sdk/commit/ffef32e3837d3ee1098129b237e7a6e2e738182d), [`7d916d905`](https://github.com/firebase/firebase-js-sdk/commit/7d916d905ba16816ac8ac7c8748c83831ff614ce), [`602ec18e9`](https://github.com/firebase/firebase-js-sdk/commit/602ec18e92fd365a3a6432ff3a5f6a31013eb1f5), [`b247ffa76`](https://github.com/firebase/firebase-js-sdk/commit/b247ffa760aec1636de6cfc78851f97a840181ae), [`9719635fe`](https://github.com/firebase/firebase-js-sdk/commit/9719635fe2ecbb5b981076ce4807d0df775b8332)]:
  - @firebase/database@0.7.0
  - @firebase/app@0.6.12
  - @firebase/auth@0.15.1
  - @firebase/firestore@2.0.0
  - @firebase/functions@0.6.0
  - @firebase/performance@0.4.3
  - @firebase/remote-config@0.1.29
  - @firebase/util@0.3.3
  - @firebase/storage@0.4.0
  - @firebase/analytics@0.6.1
  - @firebase/installations@0.4.18
  - @firebase/messaging@0.7.2

## 7.24.0

### Minor Changes

- [`eeb1dfa4f`](https://github.com/firebase/firebase-js-sdk/commit/eeb1dfa4f629dc5cf328e4b4a224369c0670c312) [#3810](https://github.com/firebase/firebase-js-sdk/pull/3810) - Add ability to configure the SDK to communicate with the Firebase Auth emulator.

* [`4f997bce1`](https://github.com/firebase/firebase-js-sdk/commit/4f997bce102be272b76836b6bcba96ea7de857bc) [#3724](https://github.com/firebase/firebase-js-sdk/pull/3724) - Adds a new `experimentalAutoDetectLongPolling` to FirestoreSettings. When
  enabled, the SDK's underlying transport (WebChannel) automatically detects if
  long-polling should be used. This is very similar to
  `experimentalForceLongPolling`, but only uses long-polling if required.

### Patch Changes

- Updated dependencies [[`eeb1dfa4f`](https://github.com/firebase/firebase-js-sdk/commit/eeb1dfa4f629dc5cf328e4b4a224369c0670c312), [`916770f3c`](https://github.com/firebase/firebase-js-sdk/commit/916770f3cfc0ca9eae92fbf33558b7175cf2cf78), [`2bea0a367`](https://github.com/firebase/firebase-js-sdk/commit/2bea0a367da8de06bae29e1459b7cbe3cdfde540), [`4f997bce1`](https://github.com/firebase/firebase-js-sdk/commit/4f997bce102be272b76836b6bcba96ea7de857bc)]:
  - @firebase/auth@0.15.0
  - @firebase/firestore@1.18.0

## 7.23.0

### Minor Changes

- [`d4db75ff8`](https://github.com/firebase/firebase-js-sdk/commit/d4db75ff81388430489bd561ac2247fe9e0b6eb5) [#3836](https://github.com/firebase/firebase-js-sdk/pull/3836) (fixes [#3573](https://github.com/firebase/firebase-js-sdk/issues/3573)) - Analytics now warns instead of throwing if it detects a browser environment where analytics does not work.

### Patch Changes

- [`48b0b0f7c`](https://github.com/firebase/firebase-js-sdk/commit/48b0b0f7c9137652f438cf04395debddeb3711d0) [#3850](https://github.com/firebase/firebase-js-sdk/pull/3850) - Moved `loggingEnabled` check to wait until performance initialization finishes, thus avoid dropping custom traces right after getting `performance` object.

* [`8728e1a0f`](https://github.com/firebase/firebase-js-sdk/commit/8728e1a0fc9027a21e3b77e4a058a7e8513a4646) [#3866](https://github.com/firebase/firebase-js-sdk/pull/3866) - Throws exception when startTime or duration is not positive value in `trace.record()` API.

* Updated dependencies [[`48b0b0f7c`](https://github.com/firebase/firebase-js-sdk/commit/48b0b0f7c9137652f438cf04395debddeb3711d0), [`a10c18f89`](https://github.com/firebase/firebase-js-sdk/commit/a10c18f8996fc35942779f5fea5690ae5d102bb0), [`d4db75ff8`](https://github.com/firebase/firebase-js-sdk/commit/d4db75ff81388430489bd561ac2247fe9e0b6eb5), [`8728e1a0f`](https://github.com/firebase/firebase-js-sdk/commit/8728e1a0fc9027a21e3b77e4a058a7e8513a4646)]:
  - @firebase/performance@0.4.2
  - @firebase/firestore@1.17.3
  - @firebase/analytics@0.6.0

## 7.22.1

### Patch Changes

- Updated dependencies [[`b6b1fd95c`](https://github.com/firebase/firebase-js-sdk/commit/b6b1fd95cbeeabc38daa574ce7cf0b7dd34cf550)]:
  - @firebase/functions@0.5.1

## 7.22.0

### Minor Changes

- [`a6af7c279`](https://github.com/firebase/firebase-js-sdk/commit/a6af7c27925da47fa62ee3b7b0a267a272c52220) [#3825](https://github.com/firebase/firebase-js-sdk/pull/3825) - Allow setting a custom domain for callable Cloud Functions.

### Patch Changes

- Updated dependencies [[`2be43eadf`](https://github.com/firebase/firebase-js-sdk/commit/2be43eadf756e45da7ad3ae7ba104ac5f0e557fa), [`a6af7c279`](https://github.com/firebase/firebase-js-sdk/commit/a6af7c27925da47fa62ee3b7b0a267a272c52220)]:
  - @firebase/firestore@1.17.2
  - @firebase/functions@0.5.0

## 7.21.1

### Patch Changes

- [`7bf73797d`](https://github.com/firebase/firebase-js-sdk/commit/7bf73797dfe5271b8f380ce4bd2497d8589f05d9) [#3813](https://github.com/firebase/firebase-js-sdk/pull/3813) (fixes [#414](https://github.com/firebase/firebase-js-sdk/issues/414)) - Escape unicodes when generating CDN scripts, so they work correctly in environments that requires UTF-8, for example, in Chrome extension.

- Updated dependencies [[`4dc8817c3`](https://github.com/firebase/firebase-js-sdk/commit/4dc8817c3faf172152a5b1e7778d0ce844510f97), [`16c6ba979`](https://github.com/firebase/firebase-js-sdk/commit/16c6ba9793681f1695f855f22a19a618ceface5f)]:
  - @firebase/firestore@1.17.1

## 7.21.0

### Minor Changes

- [`f9004177e`](https://github.com/firebase/firebase-js-sdk/commit/f9004177e76f00fc484d30c0c0e7b1bc2da033f9) [#3772](https://github.com/firebase/firebase-js-sdk/pull/3772) - [feature] Added `not-in` and `!=` query operators for use with `.where()`. `not-in` finds documents where a specified field’s value is not in a specified array. `!=` finds documents where a specified field's value does not equal the specified value. Neither query operator will match documents where the specified field is not present.

### Patch Changes

- Updated dependencies [[`3d9b5a595`](https://github.com/firebase/firebase-js-sdk/commit/3d9b5a595813b6c4f7f6ef4e3625ae8856a9fa23), [`f9004177e`](https://github.com/firebase/firebase-js-sdk/commit/f9004177e76f00fc484d30c0c0e7b1bc2da033f9), [`e81c429ae`](https://github.com/firebase/firebase-js-sdk/commit/e81c429aec43cd4467089bfed68eafafba6e8ee2), [`a8ff3dbaa`](https://github.com/firebase/firebase-js-sdk/commit/a8ff3dbaacd06371e6652a6d639ef2d9bead612b)]:
  - @firebase/database@0.6.13
  - @firebase/firestore@1.17.0

## 7.20.0

### Minor Changes

- [`fb3b095e4`](https://github.com/firebase/firebase-js-sdk/commit/fb3b095e4b7c8f57fdb3172bc039c84576abf290) [#2800](https://github.com/firebase/firebase-js-sdk/pull/2800) - Analytics now dynamically fetches the app's Measurement ID from the Dynamic Config backend
  instead of depending on the local Firebase config. It will fall back to any `measurementId`
  value found in the local config if the Dynamic Config fetch fails.

### Patch Changes

- Updated dependencies [[`249d40cb6`](https://github.com/firebase/firebase-js-sdk/commit/249d40cb692366f686a50c06c44ec81e4cae23d7), [`d347c6ca1`](https://github.com/firebase/firebase-js-sdk/commit/d347c6ca1bcb7cd48ab2e4f7954cabafe761aea7), [`fb3b095e4`](https://github.com/firebase/firebase-js-sdk/commit/fb3b095e4b7c8f57fdb3172bc039c84576abf290), [`dc9892565`](https://github.com/firebase/firebase-js-sdk/commit/dc989256566b8379f475c722370ccbd8f47527c3), [`fb3b095e4`](https://github.com/firebase/firebase-js-sdk/commit/fb3b095e4b7c8f57fdb3172bc039c84576abf290), [`fb3b095e4`](https://github.com/firebase/firebase-js-sdk/commit/fb3b095e4b7c8f57fdb3172bc039c84576abf290)]:
  - @firebase/firestore@1.16.7
  - @firebase/database@0.6.12
  - @firebase/remote-config@0.1.28
  - @firebase/messaging@0.7.1
  - @firebase/util@0.3.2
  - @firebase/analytics@0.5.0
  - @firebase/app@0.6.11
  - @firebase/functions@0.4.51
  - @firebase/installations@0.4.17
  - @firebase/performance@0.4.1
  - @firebase/storage@0.3.43

## 7.19.1

### Patch Changes

- [`61b4cd31b`](https://github.com/firebase/firebase-js-sdk/commit/61b4cd31b961c90354be38b18af5fbea9da8d5a3) [#3464](https://github.com/firebase/firebase-js-sdk/pull/3464) (fixes [#3354](https://github.com/firebase/firebase-js-sdk/issues/3354)) - feat: Added `merge` option to `firestore.settings()`, which merges the provided settings with
  settings from a previous call. This allows adding settings on top of the settings that were applied
  by `@firebase/testing`.
- Updated dependencies [[`61b4cd31b`](https://github.com/firebase/firebase-js-sdk/commit/61b4cd31b961c90354be38b18af5fbea9da8d5a3)]:
  - @firebase/firestore@1.16.6

## 7.19.0

### Minor Changes

- [`67501b980`](https://github.com/firebase/firebase-js-sdk/commit/67501b9806c7014738080bc0be945b2c0748c17e) [#3424](https://github.com/firebase/firebase-js-sdk/pull/3424) - Issue 2393 - Add environment check to Performance Module

### Patch Changes

- Updated dependencies [[`67501b980`](https://github.com/firebase/firebase-js-sdk/commit/67501b9806c7014738080bc0be945b2c0748c17e), [`960093d5b`](https://github.com/firebase/firebase-js-sdk/commit/960093d5b3ada866709c1a51b4ca175c3a01f1f3), [`b97c7e758`](https://github.com/firebase/firebase-js-sdk/commit/b97c7e758b1e2a370cb72a7aac14c17a54531a36)]:
  - @firebase/performance@0.4.0
  - @firebase/firestore@1.16.5

## 7.18.0

### Minor Changes

- [`29327b21`](https://github.com/firebase/firebase-js-sdk/commit/29327b2198391a9f1e545bcd1172a4b3e12a522c) [#3234](https://github.com/firebase/firebase-js-sdk/pull/3234) - Add `getToken(options:{serviceWorkerRegistration, vapidKey})`,`onBackgroundMessage`.
  Deprecate `setBackgroundMessageHandler`, `onTokenRefresh`, `useVapidKey`, `useServiceWorker`, `getToken`.

  Add Typing `MessagePayload`, `NotificationPayload`, `FcmOptions`.

### Patch Changes

- [`d4ca3da0`](https://github.com/firebase/firebase-js-sdk/commit/d4ca3da0a59fcea1261ba69d7eb663bba38d3089) [#3585](https://github.com/firebase/firebase-js-sdk/pull/3585) - Extended Usage of `isIndexedDBAvailable` to Service Worker

* [`2a0d254f`](https://github.com/firebase/firebase-js-sdk/commit/2a0d254fa58e607842fc0380c8cfa7bbbb69df75) [#3555](https://github.com/firebase/firebase-js-sdk/pull/3555) - Added Browser Extension check for Firebase Analytics. `analytics.isSupported()` will now return `Promise<false>` for extension environments.

* Updated dependencies [[`36be62a8`](https://github.com/firebase/firebase-js-sdk/commit/36be62a85c3cc47c15c9a59f20cdfcd7d0a72ad9), [`d4ca3da0`](https://github.com/firebase/firebase-js-sdk/commit/d4ca3da0a59fcea1261ba69d7eb663bba38d3089), [`2a0d254f`](https://github.com/firebase/firebase-js-sdk/commit/2a0d254fa58e607842fc0380c8cfa7bbbb69df75), [`29327b21`](https://github.com/firebase/firebase-js-sdk/commit/29327b2198391a9f1e545bcd1172a4b3e12a522c), [`68995c24`](https://github.com/firebase/firebase-js-sdk/commit/68995c2422a479d42b9c972bab3da4d544b9f002)]:
  - @firebase/firestore@1.16.4
  - @firebase/util@0.3.1
  - @firebase/analytics@0.4.2
  - @firebase/messaging@0.7.0
  - @firebase/app@0.6.10
  - @firebase/database@0.6.11
  - @firebase/installations@0.4.16
  - @firebase/performance@0.3.11
  - @firebase/remote-config@0.1.27
  - @firebase/storage@0.3.42
  - @firebase/functions@0.4.50

## 7.17.2

### Patch Changes

- Updated dependencies [[`ef348fed`](https://github.com/firebase/firebase-js-sdk/commit/ef348fed291338351706a697cbb9fb17a9d06ff4)]:
  - @firebase/database@0.6.10
  - @firebase/firestore@1.16.3

## 7.17.1

### Patch Changes

- [`a87676b8`](https://github.com/firebase/firebase-js-sdk/commit/a87676b84b78ccc2f057a22eb947a5d13402949c) [#3472](https://github.com/firebase/firebase-js-sdk/pull/3472) - - Fix an error where an analytics PR included a change to `@firebase/util`, but
  the util package was not properly included in the changeset for a patch bump.

  - `@firebase/util` adds environment check methods `isIndexedDBAvailable`
    `validateIndexedDBOpenable`, and `areCookiesEnabled`.

- Updated dependencies [[`a87676b8`](https://github.com/firebase/firebase-js-sdk/commit/a87676b84b78ccc2f057a22eb947a5d13402949c)]:
  - @firebase/analytics@0.4.1
  - @firebase/util@0.3.0
  - @firebase/app@0.6.9
  - @firebase/database@0.6.9
  - @firebase/firestore@1.16.2
  - @firebase/installations@0.4.15
  - @firebase/messaging@0.6.21
  - @firebase/performance@0.3.10
  - @firebase/remote-config@0.1.26
  - @firebase/storage@0.3.41
  - @firebase/functions@0.4.49

## 7.17.0

### Minor Changes

- [`02419ce8`](https://github.com/firebase/firebase-js-sdk/commit/02419ce8470141f012d9ce425a6a4a4aa912e480) [#3165](https://github.com/firebase/firebase-js-sdk/pull/3165) - Issue 2393 fix - analytics module

  - Added a public method `isSupported` to Analytics module which returns true if current browser context supports initialization of analytics module.
  - Added runtime checks to Analytics module that validate if cookie is enabled in current browser and if current browser environment supports indexedDB functionalities.

### Patch Changes

- Updated dependencies [[`02419ce8`](https://github.com/firebase/firebase-js-sdk/commit/02419ce8470141f012d9ce425a6a4a4aa912e480), [`ee33ebf7`](https://github.com/firebase/firebase-js-sdk/commit/ee33ebf726b1dc31ab4817e7a1923f7b2757e17c)]:
  - @firebase/analytics@0.4.0
  - @firebase/storage@0.3.40

## 7.16.1

### Patch Changes

- [`9c409ea7`](https://github.com/firebase/firebase-js-sdk/commit/9c409ea74efd00fe17058c5c8b74450fae67e9ee) [#3224](https://github.com/firebase/firebase-js-sdk/pull/3224) Thanks [@schmidt-sebastian](https://github.com/schmidt-sebastian)! - [fix] Updated the TypeScript types for all APIs using Observers to allow callback omission.

* [`5a355360`](https://github.com/firebase/firebase-js-sdk/commit/5a3553609da893d45f7fe1897387f72eaedf2fe0) [#3162](https://github.com/firebase/firebase-js-sdk/pull/3162) Thanks [@schmidt-sebastian](https://github.com/schmidt-sebastian)! - The SDK no longer crashes if an IndexedDB failure occurs when unsubscribing from a Query.

- [`c2b737b2`](https://github.com/firebase/firebase-js-sdk/commit/c2b737b2187cb525af4d926ca477102db7835420) [#3228](https://github.com/firebase/firebase-js-sdk/pull/3228) Thanks [@schmidt-sebastian](https://github.com/schmidt-sebastian)! - [fix] Instead of using production auth, the SDK will use test credentials
  to connect to the Emulator when the RTDB SDK is used via the Firebase
  Admin SDK.

* [`9a9a81fe`](https://github.com/firebase/firebase-js-sdk/commit/9a9a81fe4f001f23e9fe1db054c2e7159fca3ae3) [#3279](https://github.com/firebase/firebase-js-sdk/pull/3279) Thanks [@schmidt-sebastian](https://github.com/schmidt-sebastian)! - [fixed] Removed a delay that may have prevented Firestore from immediately
  reestablishing a network connection if a connectivity change occurred while
  the app was in the background.
* Updated dependencies [[`b6145466`](https://github.com/firebase/firebase-js-sdk/commit/b6145466835e22495b94d2bcfc45813e81496085), [`9c409ea7`](https://github.com/firebase/firebase-js-sdk/commit/9c409ea74efd00fe17058c5c8b74450fae67e9ee), [`5a355360`](https://github.com/firebase/firebase-js-sdk/commit/5a3553609da893d45f7fe1897387f72eaedf2fe0), [`c2b737b2`](https://github.com/firebase/firebase-js-sdk/commit/c2b737b2187cb525af4d926ca477102db7835420), [`9a9a81fe`](https://github.com/firebase/firebase-js-sdk/commit/9a9a81fe4f001f23e9fe1db054c2e7159fca3ae3)]:
  - @firebase/auth@0.14.9
  - @firebase/storage@0.3.39
  - @firebase/firestore@1.16.1
  - @firebase/database@0.6.8

## 7.16.0

### Minor Changes

- [`39ca8ecf`](https://github.com/firebase/firebase-js-sdk/commit/39ca8ecf940472159d0bc58212f34a70146da60c) [#3254](https://github.com/firebase/firebase-js-sdk/pull/3254) Thanks [@thebrianchen](https://github.com/thebrianchen)! - Added support for `set()` with merge options when using `FirestoreDataConverter`.

* [`877c060c`](https://github.com/firebase/firebase-js-sdk/commit/877c060c47bb29a8efbd2b96d35d3334fd9d9a98) [#3251](https://github.com/firebase/firebase-js-sdk/pull/3251) Thanks [@schmidt-sebastian](https://github.com/schmidt-sebastian)! - Re-adding the ReactNative bundle, which allows Firestore to be used without `btoa`/`atob` Polyfills.

### Patch Changes

- [`a754645e`](https://github.com/firebase/firebase-js-sdk/commit/a754645ec2be1b8c205f25f510196eee298b0d6e) [#3297](https://github.com/firebase/firebase-js-sdk/pull/3297) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependency typescript to v3.9.5

* [`17c628eb`](https://github.com/firebase/firebase-js-sdk/commit/17c628eb228c21ad1d4db83fdae08d1142a2b902) [#3312](https://github.com/firebase/firebase-js-sdk/pull/3312) Thanks [@Feiyang1](https://github.com/Feiyang1)! - Fixed an issue where we try to update token for every getToken() call because we don't save the updated token in the IndexedDB.

- [`bb740836`](https://github.com/firebase/firebase-js-sdk/commit/bb7408361519aa9a58c8256ae01914cf2830e118) [#3330](https://github.com/firebase/firebase-js-sdk/pull/3330) Thanks [@Feiyang1](https://github.com/Feiyang1)! - Clear timeout after a successful response or after the request is canceled. Fixes [issue 3289](https://github.com/firebase/firebase-js-sdk/issues/3289).

* [`e90304c8`](https://github.com/firebase/firebase-js-sdk/commit/e90304c8ac4341d8b23b55da784eb21348b04025) [#3309](https://github.com/firebase/firebase-js-sdk/pull/3309) Thanks [@schmidt-sebastian](https://github.com/schmidt-sebastian)! - Removed internal wrapper around our public API that was meant to prevent incorrect SDK usage for JavaScript users, but caused our SDK to stop working in IE11.

- [`469c8bdf`](https://github.com/firebase/firebase-js-sdk/commit/469c8bdf18c4a22e99d595a9896af2f934df20fd) [#3221](https://github.com/firebase/firebase-js-sdk/pull/3221) Thanks [@zwu52](https://github.com/zwu52)! - Added support for `onMessage` so the internal callback can work with [Subscriber](https://rxjs.dev/api/index/class/Subscriber)

- Updated dependencies [[`a754645e`](https://github.com/firebase/firebase-js-sdk/commit/a754645ec2be1b8c205f25f510196eee298b0d6e), [`17c628eb`](https://github.com/firebase/firebase-js-sdk/commit/17c628eb228c21ad1d4db83fdae08d1142a2b902), [`bb740836`](https://github.com/firebase/firebase-js-sdk/commit/bb7408361519aa9a58c8256ae01914cf2830e118), [`39ca8ecf`](https://github.com/firebase/firebase-js-sdk/commit/39ca8ecf940472159d0bc58212f34a70146da60c), [`877c060c`](https://github.com/firebase/firebase-js-sdk/commit/877c060c47bb29a8efbd2b96d35d3334fd9d9a98), [`e90304c8`](https://github.com/firebase/firebase-js-sdk/commit/e90304c8ac4341d8b23b55da784eb21348b04025), [`469c8bdf`](https://github.com/firebase/firebase-js-sdk/commit/469c8bdf18c4a22e99d595a9896af2f934df20fd)]:
  - @firebase/analytics@0.3.9
  - @firebase/app@0.6.8
  - @firebase/auth@0.14.8
  - @firebase/database@0.6.7
  - @firebase/firestore@1.16.0
  - @firebase/functions@0.4.48
  - @firebase/installations@0.4.14
  - @firebase/messaging@0.6.20
  - @firebase/performance@0.3.9
  - @firebase/remote-config@0.1.25
  - @firebase/storage@0.3.38
