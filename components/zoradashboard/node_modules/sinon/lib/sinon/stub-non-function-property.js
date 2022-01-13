"use strict";

var valueToString = require("@sinonjs/commons").valueToString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function stubNonFunctionProperty(object, property) {
    var original = object[property];

    if (!hasOwnProperty.call(object, property)) {
        throw new TypeError("Cannot stub non-existent own property " + valueToString(property));
    }

    return {
        restore: function restore() {
            object[property] = original;
        }
    };
}

module.exports = stubNonFunctionProperty;
