"use strict";

var getPropertyDescriptor = require("./util/core/get-property-descriptor");
var walk = require("./util/core/walk");

function spyEntireObject(spy, object) {
    walk(object || {}, function(prop, propOwner) {
        // we don't want to spy things like toString(), valueOf(), etc. so we only spy if the object
        // is not Object.prototype
        if (
            propOwner !== Object.prototype &&
            prop !== "constructor" &&
            typeof getPropertyDescriptor(propOwner, prop).value === "function"
        ) {
            spy(object, prop);
        }
    });

    return object;
}

module.exports = spyEntireObject;
