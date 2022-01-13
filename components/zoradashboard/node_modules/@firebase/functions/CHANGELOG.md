# @firebase/functions

## 0.6.13

### Patch Changes

- Updated dependencies [[`56a6a9d4a`](https://github.com/firebase/firebase-js-sdk/commit/56a6a9d4af2766154584a0f66d3c4d8024d74ba5)]:
  - @firebase/component@0.5.4

## 0.6.12

### Patch Changes

- Updated dependencies [[`725ab4684`](https://github.com/firebase/firebase-js-sdk/commit/725ab4684ef0999a12f71e704c204a00fb030e5d)]:
  - @firebase/component@0.5.3

## 0.6.11

### Patch Changes

- Updated dependencies [[`4c4b6aed9`](https://github.com/firebase/firebase-js-sdk/commit/4c4b6aed9757c9a7e75fb698a15e53274f93880b)]:
  - @firebase/component@0.5.2

## 0.6.10

### Patch Changes

- [`92e4e8d29`](https://github.com/firebase/firebase-js-sdk/commit/92e4e8d2996c690837a203a868b0d26bf6e3ad84) [#4887](https://github.com/firebase/firebase-js-sdk/pull/4887) (fixes [#683](https://github.com/firebase/firebase-js-sdk/issues/683)) - Fix functions to convert Date objects to an ISO string instead of an empty object.

- Updated dependencies [[`5fbc5fb01`](https://github.com/firebase/firebase-js-sdk/commit/5fbc5fb0140d7da980fd7ebbfbae810f8c64ae19)]:
  - @firebase/component@0.5.1

## 0.6.9

### Patch Changes

- [`997040ace`](https://github.com/firebase/firebase-js-sdk/commit/997040ace70de0891c9dea78b6da89e4886163b9) [#4924](https://github.com/firebase/firebase-js-sdk/pull/4924) - Fixed a bug in `httpsCallable()` when used in the same project as Firebase Messaging.

## 0.6.8

### Patch Changes

- Updated dependencies [[`c34ac7a92`](https://github.com/firebase/firebase-js-sdk/commit/c34ac7a92a616915f38d192654db7770d81747ae)]:
  - @firebase/component@0.5.0

## 0.6.7

### Patch Changes

- Updated dependencies []:
  - @firebase/component@0.4.1

## 0.6.6

### Patch Changes

- Updated dependencies [[`f24d8961b`](https://github.com/firebase/firebase-js-sdk/commit/f24d8961b3b87821413297688803fc85113086b3)]:
  - @firebase/component@0.4.0

## 0.6.5

### Patch Changes

- Updated dependencies []:
  - @firebase/component@0.3.1

## 0.6.4

### Patch Changes

- [`5c1a83ed7`](https://github.com/firebase/firebase-js-sdk/commit/5c1a83ed70bae979322bd8751c0885d683ce4bf3) [#4595](https://github.com/firebase/firebase-js-sdk/pull/4595) - Component facotry now takes an options object. And added `Provider.initialize()` that can be used to pass an options object to the component factory.

- Updated dependencies [[`5c1a83ed7`](https://github.com/firebase/firebase-js-sdk/commit/5c1a83ed70bae979322bd8751c0885d683ce4bf3)]:
  - @firebase/component@0.3.0

## 0.6.3

### Patch Changes

- Updated dependencies []:
  - @firebase/component@0.2.1

## 0.6.2

### Patch Changes

- Updated dependencies [[`6afe42613`](https://github.com/firebase/firebase-js-sdk/commit/6afe42613ed3d7a842d378dc1a09a795811db2ac)]:
  - @firebase/component@0.2.0

## 0.6.1

### Patch Changes

- Updated dependencies []:
  - @firebase/component@0.1.21

## 0.6.0

### Minor Changes

- [`0322c1bda`](https://github.com/firebase/firebase-js-sdk/commit/0322c1bda93b2885b995e3df2b63b48314546961) [#3906](https://github.com/firebase/firebase-js-sdk/pull/3906) - Add a useEmulator(host, port) method to Cloud Functions

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

- Updated dependencies [[`a5768b0aa`](https://github.com/firebase/firebase-js-sdk/commit/a5768b0aa7d7ce732279931aa436e988c9f36487), [`0322c1bda`](https://github.com/firebase/firebase-js-sdk/commit/0322c1bda93b2885b995e3df2b63b48314546961)]:
  - @firebase/component@0.1.20
  - @firebase/functions-types@0.4.0

## 0.5.1

### Patch Changes

- [`b6b1fd95c`](https://github.com/firebase/firebase-js-sdk/commit/b6b1fd95cbeeabc38daa574ce7cf0b7dd34cf550) - Fixes a bug introduced in #3782 that causes callable functions to throw an error in browser extensions.

## 0.5.0

### Minor Changes

- [`a6af7c279`](https://github.com/firebase/firebase-js-sdk/commit/a6af7c27925da47fa62ee3b7b0a267a272c52220) [#3825](https://github.com/firebase/firebase-js-sdk/pull/3825) - Allow setting a custom domain for callable Cloud Functions.

## 0.4.51

### Patch Changes

- Updated dependencies [[`da1c7df79`](https://github.com/firebase/firebase-js-sdk/commit/da1c7df7982b08bbef82fcc8d93255f3e2d23cca)]:
  - @firebase/component@0.1.19

## 0.4.50

### Patch Changes

- Updated dependencies [[`29327b21`](https://github.com/firebase/firebase-js-sdk/commit/29327b2198391a9f1e545bcd1172a4b3e12a522c)]:
  - @firebase/messaging-types@0.5.0
  - @firebase/component@0.1.18

## 0.4.49

### Patch Changes

- Updated dependencies []:
  - @firebase/component@0.1.17

## 0.4.48

### Patch Changes

- [`a754645e`](https://github.com/firebase/firebase-js-sdk/commit/a754645ec2be1b8c205f25f510196eee298b0d6e) [#3297](https://github.com/firebase/firebase-js-sdk/pull/3297) Thanks [@renovate](https://github.com/apps/renovate)! - Update dependency typescript to v3.9.5

* [`bb740836`](https://github.com/firebase/firebase-js-sdk/commit/bb7408361519aa9a58c8256ae01914cf2830e118) [#3330](https://github.com/firebase/firebase-js-sdk/pull/3330) Thanks [@Feiyang1](https://github.com/Feiyang1)! - Clear timeout after a successful response or after the request is canceled. Fixes [issue 3289](https://github.com/firebase/firebase-js-sdk/issues/3289).

* Updated dependencies [[`a754645e`](https://github.com/firebase/firebase-js-sdk/commit/a754645ec2be1b8c205f25f510196eee298b0d6e)]:
  - @firebase/component@0.1.16
