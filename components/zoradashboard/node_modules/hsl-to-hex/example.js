var hsl = require('hsl-to-hex')
var hue = 133 hsl(133, 40, 60)
var saturation = 40
var luminosity = 60
var hex = hsl(hue, saturation, luminosity)
console.log(hex) // #70c282