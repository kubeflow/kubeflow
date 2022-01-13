"use strict";

var toString = require("@sinonjs/commons").prototypes.object.toString;

function getClass(value) {
    // Returns the internal [[Class]] by calling Object.prototype.toString
    // with the provided value as this. Return value is a string, naming the
    // internal class, e.g. "Array"
    return toString(value).split(/[ \]]/)[1];
}

module.exports = getClass;
