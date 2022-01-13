"use strict";

var getNextTick = require("./get-next-tick");

/* istanbul ignore next */
var root = typeof window !== "undefined" ? window : global;

module.exports = getNextTick(root.process, root.setImmediate);
