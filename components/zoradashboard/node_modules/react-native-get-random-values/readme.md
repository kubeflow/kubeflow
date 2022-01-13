# `crypto.getRandomValues` for React Native

A small implementation of `crypto.getRandomValues` for React Native. This is useful to polyfill for libraries like [uuid](https://www.npmjs.com/package/uuid) that depend on it.

## Installation

```sh
npm install --save react-native-get-random-values
npx pod-install
```

> 💡 If you use the Expo managed workflow you will see "CocoaPods is not supported in this project" - this is fine, it's not necessary.

## Usage

This library works as a polyfill for the global `crypto.getRandomValues`.

```javascript
// Add this line to your `index.js`
import 'react-native-get-random-values'
```

Now you can use `uuid` or other libraries that assume `crypto.getRandomValues` is available.

```javascript
import { v4 as uuid } from 'uuid'

console.log(uuid())
```

## API

### `crypto.getRandomValues(typedArray)`

The `crypto.getRandomValues()` method lets you get cryptographically strong random values. The array given as the parameter is filled with random numbers (random in its cryptographic meaning).

To guarantee enough performance, implementations are not using a truly random number generator, but they are using a pseudo-random number generator *seeded* with a value with enough entropy. The PRNG used differs from one implementation to the other but is suitable for cryptographic usages. Implementations are also required to use a seed with enough entropy, like a system-level entropy source.

- `typedArray` - Is an integer-based TypedArray, that is an `Int8Array`, a `Uint8Array`, an `Int16Array`, a `Uint16Array`, an `Int32Array`, or a `Uint32Array`. All elements in the array are going to be overridden with random numbers.

Returns the typed array that was passed in.
