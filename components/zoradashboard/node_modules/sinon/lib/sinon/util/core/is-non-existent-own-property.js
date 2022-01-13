"use strict";

function isNonExistentOwnProperty(object, property) {
    return object && typeof property !== "undefined" && !(property in object);
}

module.exports = isNonExistentOwnProperty;
