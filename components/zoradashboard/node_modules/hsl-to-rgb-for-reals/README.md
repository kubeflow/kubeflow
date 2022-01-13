# hsl-to-rgb-for-reals

##HSL -> RGB
Convert HSL values (hue, saturation, light) to RGB values (red, green, blue). 
Expected values:
Hue: [0, 360[
Saturation: [0, 1]
Lightness: [0, 1]

## For Reals?
Author forgot to export their function in the hsl-to-rgb module,
there's a PR that's been sitting for over a year (at time of writing).
Let's use `hsl-to-rgb-for-reals` until original author merges. Huzzah!

Funny story - I forgot to module export in v1.0.0 too! Don't use 1.0.0.

Getting started:

```sh
npm install hsl-to-rgb-for-reals --save
```

Use:

```js
var converter = require('hsl-to-rgb-for-reals');

var slateBlue = converter(223, 0.44, 0.56);

console.log(slateBlue);
// logs [93, 121, 192]
```


## Problems

Bug the original author :D 
<https://github.com/kayellpeee/hsl_rgb_converter/issues>

## Acknowledgements

* kayellpeee
* sponsored by [nearForm](http://nearform.com)
