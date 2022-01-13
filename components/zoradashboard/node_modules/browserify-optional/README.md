# browserify-optional

It is a common pattern in Node to support optional dependencies via requires in try..catch blocks.
Browserify doesn't support this by default and throws a compile time error when it cannot find a 
module. You can solve the problem by using browserify's exclude option, but this works globally
instead of at a per-module level. This transform fixes the problem by moving the compile time 
error to a runtime error for requires of missing modules inside try..catch blocks.

## Example

The transform would transform the following code such that requiring `missing-module` would throw
a runtime error instead of a compile time error, making the code work as expected.

```javascript
try {
  var x = require('missing-module');
} catch (e) {
  var x = require('replacement-module');
}
```

To set it up in browserify, add this to your package.json:

```json
"browserify": {
  "transform": ["browserify-optional"]
}
```

## License

MIT
