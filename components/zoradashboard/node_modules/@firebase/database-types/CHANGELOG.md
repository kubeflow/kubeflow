# @firebase/database-types

## 0.7.2

### Patch Changes

- [`e46ebb743`](https://github.com/firebase/firebase-js-sdk/commit/e46ebb743f670f3b7d2160164addeddf918fb0cb) [#4765](https://github.com/firebase/firebase-js-sdk/pull/4765) - Update types to be consistent with the main index.d.ts

## 0.7.1

### Patch Changes

- Updated dependencies [[`f24d8961b`](https://github.com/firebase/firebase-js-sdk/commit/f24d8961b3b87821413297688803fc85113086b3)]:
  - @firebase/app-types@0.6.2

## 0.7.0

### Minor Changes

- [`05614aa86`](https://github.com/firebase/firebase-js-sdk/commit/05614aa86614994b69df154bd6ce34861fae37a5) [#4427](https://github.com/firebase/firebase-js-sdk/pull/4427) - Add `startAfter()` and `endBefore()` to the Realtime Database TypeScript definitions.

## 0.6.1

### Patch Changes

- [`4f6313262`](https://github.com/firebase/firebase-js-sdk/commit/4f63132622fa46ca7373ab93440c76bcb1822620) [#4096](https://github.com/firebase/firebase-js-sdk/pull/4096) - Add the missing type definition for 'Query.get()' for RTDB

## 0.6.0

### Minor Changes

- [`ef33328f7`](https://github.com/firebase/firebase-js-sdk/commit/ef33328f7cb7d585a1304ed39649f5b69a111b3c) [#3904](https://github.com/firebase/firebase-js-sdk/pull/3904) - Add a useEmulator(host, port) method to Realtime Database

### Patch Changes

- [`602ec18e9`](https://github.com/firebase/firebase-js-sdk/commit/602ec18e92fd365a3a6432ff3a5f6a31013eb1f5) [#3968](https://github.com/firebase/firebase-js-sdk/pull/3968) - Updated the type definition for `ThenableReference` to only implement `then` and `catch`, which matches the implementation.

## 0.5.2

### Patch Changes

- [`ef348fed`](https://github.com/firebase/firebase-js-sdk/commit/ef348fed291338351706a697cbb9fb17a9d06ff4) [#3511](https://github.com/firebase/firebase-js-sdk/pull/3511) - Added interface `Database` which is implemented by `FirebaseDatabase`. This allows consumer SDKs (such as the Firebase Admin SDK) to export the database types as an interface.
