"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var behavior = require("./behavior");
var behaviors = require("./default-behaviors");
var hasOwnProperty = require("@sinonjs/commons").prototypes.object.hasOwnProperty;
var isNonExistentOwnProperty = require("./util/core/is-non-existent-own-property");
var spy = require("./spy");
var extend = require("./util/core/extend");
var functionToString = require("./util/core/function-to-string");
var getPropertyDescriptor = require("./util/core/get-property-descriptor");
var isEsModule = require("./util/core/is-es-module");
var wrapMethod = require("./util/core/wrap-method");
var stubEntireObject = require("./stub-entire-object");
var throwOnFalsyObject = require("./throw-on-falsy-object");
var valueToString = require("@sinonjs/commons").valueToString;

var forEach = arrayProto.forEach;
var pop = arrayProto.pop;
var slice = arrayProto.slice;
var sort = arrayProto.sort;

function stub(object, property) {
    if (arguments.length > 2) {
        throw new TypeError("stub(obj, 'meth', fn) has been removed, see documentation");
    }

    if (isEsModule(object)) {
        throw new TypeError("ES Modules cannot be stubbed");
    }

    throwOnFalsyObject.apply(null, arguments);

    if (isNonExistentOwnProperty(object, property)) {
        throw new TypeError("Cannot stub non-existent own property " + valueToString(property));
    }

    var actualDescriptor = getPropertyDescriptor(object, property);
    var isObjectOrFunction = typeof object === "object" || typeof object === "function";
    var isStubbingEntireObject = typeof property === "undefined" && isObjectOrFunction;
    var isCreatingNewStub = !object && typeof property === "undefined";
    var isStubbingNonFuncProperty =
        isObjectOrFunction &&
        typeof property !== "undefined" &&
        (typeof actualDescriptor === "undefined" || typeof actualDescriptor.value !== "function") &&
        typeof descriptor === "undefined";
    var isStubbingExistingMethod =
        typeof object === "object" &&
        typeof actualDescriptor !== "undefined" &&
        typeof actualDescriptor.value === "function";
    var arity = isStubbingExistingMethod ? object[property].length : 0;

    if (isStubbingEntireObject) {
        return stubEntireObject(stub, object);
    }

    if (isCreatingNewStub) {
        return stub.create();
    }

    var s = stub.create(arity);

    extend.nonEnum(s, {
        rootObj: object,
        propName: property,
        restore: function restore() {
            if (actualDescriptor !== undefined) {
                Object.defineProperty(object, property, actualDescriptor);
                return;
            }

            delete object[property];
        }
    });

    return isStubbingNonFuncProperty ? s : wrapMethod(object, property, s);
}

stub.createStubInstance = function(constructor, overrides) {
    if (typeof constructor !== "function") {
        throw new TypeError("The constructor should be a function.");
    }

    var stubbedObject = stub(Object.create(constructor.prototype));

    forEach(Object.keys(overrides || {}), function(propertyName) {
        if (propertyName in stubbedObject) {
            var value = overrides[propertyName];
            if (value && value.createStubInstance) {
                stubbedObject[propertyName] = value;
            } else {
                stubbedObject[propertyName].returns(value);
            }
        } else {
            throw new Error("Cannot stub " + propertyName + ". Property does not exist!");
        }
    });
    return stubbedObject;
};

/*eslint-disable no-use-before-define*/
function getParentBehaviour(stubInstance) {
    return stubInstance.parent && getCurrentBehavior(stubInstance.parent);
}

function getDefaultBehavior(stubInstance) {
    return stubInstance.defaultBehavior || getParentBehaviour(stubInstance) || behavior.create(stubInstance);
}

function getCurrentBehavior(stubInstance) {
    var currentBehavior = stubInstance.behaviors[stubInstance.callCount - 1];
    return currentBehavior && currentBehavior.isPresent() ? currentBehavior : getDefaultBehavior(stubInstance);
}
/*eslint-enable no-use-before-define*/

var uuid = 0;

var proto = {
    create: function create(stubLength) {
        var functionStub = function() {
            var args = slice(arguments);
            var matchings = functionStub.matchingFakes(args);

            var fnStub =
                pop(
                    sort(matchings, function(a, b) {
                        return a.matchingArguments.length - b.matchingArguments.length;
                    })
                ) || functionStub;
            return getCurrentBehavior(fnStub).invoke(this, arguments);
        };

        var orig = functionStub;
        functionStub = spy.create(functionStub, stubLength);

        extend.nonEnum(functionStub, {
            id: "stub#" + uuid++,
            func: orig
        });

        extend(functionStub, stub);

        extend.nonEnum(functionStub, {
            instantiateFake: stub.create,
            displayName: "stub",
            toString: functionToString,

            defaultBehavior: null,
            behaviors: []
        });

        return functionStub;
    },

    resetBehavior: function() {
        var fakes = this.fakes || [];

        this.defaultBehavior = null;
        this.behaviors = [];

        delete this.returnValue;
        delete this.returnArgAt;
        delete this.throwArgAt;
        delete this.resolveArgAt;
        delete this.fakeFn;
        this.returnThis = false;
        this.resolveThis = false;

        forEach(fakes, function(fake) {
            fake.resetBehavior();
        });
    },

    resetHistory: spy.resetHistory,

    reset: function() {
        this.resetHistory();
        this.resetBehavior();
    },

    onCall: function onCall(index) {
        if (!this.behaviors[index]) {
            this.behaviors[index] = behavior.create(this);
        }

        return this.behaviors[index];
    },

    onFirstCall: function onFirstCall() {
        return this.onCall(0);
    },

    onSecondCall: function onSecondCall() {
        return this.onCall(1);
    },

    onThirdCall: function onThirdCall() {
        return this.onCall(2);
    }
};

forEach(Object.keys(behavior), function(method) {
    if (
        hasOwnProperty(behavior, method) &&
        !hasOwnProperty(proto, method) &&
        method !== "create" &&
        method !== "withArgs" &&
        method !== "invoke"
    ) {
        proto[method] = behavior.createBehavior(method);
    }
});

forEach(Object.keys(behaviors), function(method) {
    if (hasOwnProperty(behaviors, method) && !hasOwnProperty(proto, method)) {
        behavior.addBehavior(stub, method, behaviors[method]);
    }
});

extend(stub, proto);
module.exports = stub;
