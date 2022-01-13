"use strict";

var extend = require("./core/extend");
var llx = require("lolex");

function createClock(config, globalCtx) {
    var llxCtx = llx;
    if (globalCtx !== null && typeof globalCtx === "object") {
        llxCtx = llx.withGlobal(globalCtx);
    }
    var clock = llxCtx.install(config);
    clock.restore = clock.uninstall;
    return clock;
}

/**
 * @param {number|Date|Object} dateOrConfig The unix epoch value to install with (default 0)
 * @returns {Object} Returns a lolex clock instance
 */
exports.useFakeTimers = function(dateOrConfig) {
    var hasArguments = typeof dateOrConfig !== "undefined";
    var argumentIsDateLike =
        (typeof dateOrConfig === "number" || dateOrConfig instanceof Date) && arguments.length === 1;
    var argumentIsObject = dateOrConfig !== null && typeof dateOrConfig === "object" && arguments.length === 1;

    if (!hasArguments) {
        return createClock({
            now: 0
        });
    }

    if (argumentIsDateLike) {
        return createClock({
            now: dateOrConfig
        });
    }

    if (argumentIsObject) {
        var config = extend.nonEnum({}, dateOrConfig);
        var globalCtx = config.global;
        delete config.global;
        return createClock(config, globalCtx);
    }

    throw new TypeError("useFakeTimers expected epoch or config object. See https://github.com/sinonjs/sinon");
};

exports.clock = {
    create: function(now) {
        return llx.createClock(now);
    }
};

exports.timers = {
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setImmediate: typeof setImmediate !== "undefined" ? setImmediate : undefined,
    clearImmediate: typeof clearImmediate !== "undefined" ? clearImmediate : undefined,
    setInterval: setInterval,
    clearInterval: clearInterval,
    Date: Date
};
