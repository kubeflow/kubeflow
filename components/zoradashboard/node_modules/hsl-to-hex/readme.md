# hsl-to-hex

Convert HSL colors to RGB colors in hex format.

## API

```
require('hsl-to-hex') => Function
hsl(hue, saturation, luminosity)` => String
```

## Example

```js
var hsl = require('hsl-to-hex')
var hue = 133 hsl(133, 40, 60)
var saturation = 40
var luminosity = 60
var hex = hsl(hue, saturation, luminosity)
console.log(hex) // #70c282
```

## License

ISC