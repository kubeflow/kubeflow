[![Build](https://api.travis-ci.org/samthor/fast-text-encoding.svg?branch=master)](https://travis-ci.org/samthor/fast-text-encoding)

This is a fast polyfill for [`TextEncoder`][1] and [`TextDecoder`][2], which let you encode and decode JavaScript strings into UTF-8 bytes.

It is fast partially as it does not support any encodings aside UTF-8 (and note that natively, only `TextDecoder` supports alternative encodings anyway).
See [some benchmarks](https://github.com/samthor/fast-text-encoding/tree/master/bench).

[1]: https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
[2]: https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder

# Usage

Install as "fast-text-encoding" via your favourite package manager.

You only need this polyfill if you're supporting older browsers like IE, legacy Edge, ancient Chrome and Firefox, or Node before v11.

## Browser

Include the minified code inside a `script` tag or as an ES6 Module for its side effects.
It will create `TextEncoder` and `TextDecoder` if the symbols are missing on `window` or `global.`

```html
<script src="node_modules/fast-text-encoding/text.min.js"></script>
<script type="module">
  import './node_modules/fast-text-encoding/text.min.js';
  import 'fast-text-encoding';  // or perhaps this
  // confidently do something with TextEncoder or TextDecoder \o/
</script>
```

⚠️ You'll probably want to depend on `text.min.js`, as it's compiled to ES5 for older environments.

## Node

You only need this polyfill in Node before v11.
However, you can use `Buffer` to provide the same functionality (but not conforming to any spec) in versions even older than that.

```js
require('fast-text-encoding');  // just require me before use

const buffer = new TextEncoder().encode('Turn me into UTF-8!');
// buffer is now a Uint8Array of [84, 117, 114, 110, ...]
```

In Node v5.1 and above, this polyfill uses `Buffer` to implement `TextDecoder`.

# Release

Compile code with [Closure Compiler](https://closure-compiler.appspot.com/home).

```
// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name text.min.js
// ==/ClosureCompiler==

// code here
```
