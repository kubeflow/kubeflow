# Fast Base64 Decoding

A fast Base64 decoder with a low level API. If you want a high level API, look at [base64-js](https://github.com/beatgammit/base64-js).

## Installation

```sh
npm install --save fast-base64-decode
```

## Usage

```js
const base64Decode = require('fast-base64-decode')

// You need to know the length of the decoded data
const result = new Uint8Array(13)

// Pass the string to decode, and a `UInt8Array` where the bytes will be written
base64Decode('SGVsbG8sIFdvcmxkIQ==', result)
```
