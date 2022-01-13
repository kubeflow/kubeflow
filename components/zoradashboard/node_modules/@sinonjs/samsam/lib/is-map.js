"use strict";

function isMap(value) {
    return typeof Map !== "undefined" && value instanceof Map;
}

module.exports = isMap;
