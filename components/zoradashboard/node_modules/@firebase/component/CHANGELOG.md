# @firebase/component

## 0.5.4

### Patch Changes

- [`56a6a9d4a`](https://github.com/firebase/firebase-js-sdk/commit/56a6a9d4af2766154584a0f66d3c4d8024d74ba5) [#5071](https://github.com/firebase/firebase-js-sdk/pull/5071) (fixes [#4932](https://github.com/firebase/firebase-js-sdk/issues/4932)) - Auto initialize `auth-internal` after `auth` has been initialized.

## 0.5.3

### Patch Changes

- [`725ab4684`](https://github.com/firebase/firebase-js-sdk/commit/725ab4684ef0999a12f71e704c204a00fb030e5d) [#5023](https://github.com/firebase/firebase-js-sdk/pull/5023) (fixes [#5018](https://github.com/firebase/firebase-js-sdk/issues/5018)) - Pass the instance to onInit callback

## 0.5.2

### Patch Changes

- [`4c4b6aed9`](https://github.com/firebase/firebase-js-sdk/commit/4c4b6aed9757c9a7e75fb698a15e53274f93880b) [#4971](https://github.com/firebase/firebase-js-sdk/pull/4971) - Fixes a regression that prevented Firestore from detecting Auth during its initial initialization, which could cause some writes to not be send.

## 0.5.1

### Patch Changes

- [`5fbc5fb01`](https://github.com/firebase/firebase-js-sdk/commit/5fbc5fb0140d7da980fd7ebbfbae810f8c64ae19) [#4911](https://github.com/firebase/firebase-js-sdk/pull/4911) - handle `undefined` correctly from input.

## 0.5.0

### Minor Changes

- [`c34ac7a92`](https://github.com/firebase/firebase-js-sdk/commit/c34ac7a92a616915f38d192654db7770d81747ae) [#4866](https://github.com/firebase/firebase-js-sdk/pull/4866) - Support onInit callback in provider

### Patch Changes

- Updated dependencies [[`ac4ad08a2`](https://github.com/firebase/firebase-js-sdk/commit/ac4ad08a284397ec966e991dd388bb1fba857467)]:
  - @firebase/util@1.1.0

## 0.4.1

### Patch Changes

- Updated dependencies [[`7354a0ed4`](https://github.com/firebase/firebase-js-sdk/commit/7354a0ed438f4e3df6577e4927e8c8f8f1fbbfda)]:
  - @firebase/util@1.0.0

## 0.4.0

### Minor Changes

- [`f24d8961b`](https://github.com/firebase/firebase-js-sdk/commit/f24d8961b3b87821413297688803fc85113086b3) [#4714](https://github.com/firebase/firebase-js-sdk/pull/4714) - Support new instantiation mode `EXPLICIT`

## 0.3.1

### Patch Changes

- Updated dependencies [[`de5f90501`](https://github.com/firebase/firebase-js-sdk/commit/de5f9050137acc9ed1490082e5aa429b5de3cb2a)]:
  - @firebase/util@0.4.1

## 0.3.0

### Minor Changes

- [`5c1a83ed7`](https://github.com/firebase/firebase-js-sdk/commit/5c1a83ed70bae979322bd8751c0885d683ce4bf3) [#4595](https://github.com/firebase/firebase-js-sdk/pull/4595) - Component facotry now takes an options object. And added `Provider.initialize()` that can be used to pass an options object to the component factory.

## 0.2.1

### Patch Changes

- Updated dependencies [[`ec95df3d0`](https://github.com/firebase/firebase-js-sdk/commit/ec95df3d07e5f091f2a7f7327e46417f64d04b4e)]:
  - @firebase/util@0.4.0

## 0.2.0

### Minor Changes

- [`6afe42613`](https://github.com/firebase/firebase-js-sdk/commit/6afe42613ed3d7a842d378dc1a09a795811db2ac) [#4495](https://github.com/firebase/firebase-js-sdk/pull/4495) - Added isInitialized() method to Provider

## 0.1.21

### Patch Changes

- Updated dependencies [[`9cf727fcc`](https://github.com/firebase/firebase-js-sdk/commit/9cf727fcc3d049551b16ae0698ac33dc2fe45ada)]:
  - @firebase/util@0.3.4

## 0.1.20

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

- Updated dependencies [[`a5768b0aa`](https://github.com/firebase/firebase-js-sdk/commit/a5768b0aa7d7ce732279931aa436e988c9f36487), [`7d916d905`](https://github.com/firebase/firebase-js-sdk/commit/7d916d905ba16816ac8ac7c8748c83831ff614ce)]:
  - @firebase/util@0.3.3

## 0.1.19

### Patch Changes

- [`da1c7df79`](https://github.com/firebase/firebase-js-sdk/commit/da1c7df7982b08bbef82fcc8d93255f3e2d23cca) [#3601](https://github.com/firebase/firebase-js-sdk/pull/3601) - Correctly delete services created by modular SDKs when calling provider.delete()

- Updated dependencies [[`fb3b095e4`](https://github.com/firebase/firebase-js-sdk/commit/fb3b095e4b7c8f57fdb3172bc039c84576abf290)]:
  - @firebase/util@0.3.2

## 0.1.18

### Patch Changes

- Updated dependencies [[`d4ca3da0`](https://github.com/firebase/firebase-js-sdk/commit/d4ca3da0a59fcea1261ba69d7eb663bba38d3089)]:
  - @firebase/util@0.3.1

## 0.1.17

### Patch Changes

- Updated dependencies [[`a87676b8`](https://github.com/firebase/firebase-js-sdk/commit/a87676b84b78ccc2f057a22eb947a5d13402949c)]:
  - @firebase/util@0.3.0

## 0.1.16

### Patch Changes

- [`a754645e`](https://github.com/firebase/firebase-js-sdk/commit/a754645ec2be1b8c205f25f510196eee298b0d6e) [#3297](https://github.com/firebase/firebase-js-sdk/pull/3297) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependency typescript to v3.9.5
