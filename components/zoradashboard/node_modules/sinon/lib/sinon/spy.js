"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var createBehavior = require("./behavior").create;
var extend = require("./util/core/extend");
var functionName = require("@sinonjs/commons").functionName;
var functionToString = require("./util/core/function-to-string");
var getPropertyDescriptor = require("./util/core/get-property-descriptor");
var deepEqual = require("@sinonjs/samsam").deepEqual;
var isEsModule = require("./util/core/is-es-module");
var spyCall = require("./call");
var spyEntireObject = require("./spy-entire-object");
var wrapMethod = require("./util/core/wrap-method");
var sinonFormat = require("./util/core/format");
var valueToString = require("@sinonjs/commons").valueToString;

/* cache references to library methods so that they also can be stubbed without problems */
var concat = arrayProto.concat;
var forEach = arrayProto.forEach;
var pop = arrayProto.pop;
var push = arrayProto.push;
var slice = arrayProto.slice;
var filter = Array.prototype.filter;
var ErrorConstructor = Error.prototype.constructor;
var bind = Function.prototype.bind;

var callId = 0;

function spy(object, property, types) {
    var descriptor, methodDesc;

    if (isEsModule(object)) {
        throw new TypeError("ES Modules cannot be spied");
    }

    if (!property && typeof object === "function") {
        return spy.create(object);
    }

    if (!property && typeof object === "object") {
        return spyEntireObject(spy, object);
    }

    if (!object && !property) {
        return spy.create(function() {
            return;
        });
    }

    if (!types) {
        return wrapMethod(object, property, spy.create(object[property]));
    }

    descriptor = {};
    methodDesc = getPropertyDescriptor(object, property);

    forEach(types, function(type) {
        descriptor[type] = spy.create(methodDesc[type]);
    });

    return wrapMethod(object, property, descriptor);
}

function incrementCallCount() {
    this.called = true;
    this.callCount += 1;
    this.notCalled = false;
    this.calledOnce = this.callCount === 1;
    this.calledTwice = this.callCount === 2;
    this.calledThrice = this.callCount === 3;
}

function createCallProperties() {
    this.firstCall = this.getCall(0);
    this.secondCall = this.getCall(1);
    this.thirdCall = this.getCall(2);
    this.lastCall = this.getCall(this.callCount - 1);
}

function createProxy(func, proxyLength) {
    // Retain the function length:
    var p;
    if (proxyLength) {
        // Do not change this to use an eval. Projects that depend on sinon block the use of eval.
        // ref: https://github.com/sinonjs/sinon/issues/710
        switch (proxyLength) {
            /*eslint-disable no-unused-vars, max-len*/
            case 1:
                p = function proxy(a) {
                    return p.invoke(func, this, slice(arguments));
                };
                break;
            case 2:
                p = function proxy(a, b) {
                    return p.invoke(func, this, slice(arguments));
                };
                break;
            case 3:
                p = function proxy(a, b, c) {
                    return p.invoke(func, this, slice(arguments));
                };
                break;
            case 4:
                p = function proxy(a, b, c, d) {
                    return p.invoke(func, this, slice(arguments));
                };
                break;
            case 5:
                p = function proxy(a, b, c, d, e) {
                    return p.invoke(func, this, slice(arguments));
                };
                break;
            case 6:
                p = function proxy(a, b, c, d, e, f) {
                    return p.invoke(func, this, slice(arguments));
                };
                break;
            case 7:
                p = function proxy(a, b, c, d, e, f, g) {
                    return p.invoke(func, this, slice(arguments));
                };
                break;
            case 8:
                p = function proxy(a, b, c, d, e, f, g, h) {
                    return p.invoke(func, this, slice(arguments));
                };
                break;
            case 9:
                p = function proxy(a, b, c, d, e, f, g, h, i) {
                    return p.invoke(func, this, slice(arguments));
                };
                break;
            case 10:
                p = function proxy(a, b, c, d, e, f, g, h, i, j) {
                    return p.invoke(func, this, slice(arguments));
                };
                break;
            case 11:
                p = function proxy(a, b, c, d, e, f, g, h, i, j, k) {
                    return p.invoke(func, this, slice(arguments));
                };
                break;
            case 12:
                p = function proxy(a, b, c, d, e, f, g, h, i, j, k, l) {
                    return p.invoke(func, this, slice(arguments));
                };
                break;
            default:
                p = function proxy() {
                    return p.invoke(func, this, slice(arguments));
                };
                break;
            /*eslint-enable*/
        }
    } else {
        p = function proxy() {
            return p.invoke(func, this, slice(arguments));
        };
    }
    var nameDescriptor = Object.getOwnPropertyDescriptor(func, "name");
    if (nameDescriptor && nameDescriptor.configurable) {
        // IE 11 functions don't have a name.
        // Safari 9 has names that are not configurable.
        Object.defineProperty(p, "name", nameDescriptor);
    }
    extend.nonEnum(p, {
        isSinonProxy: true,

        called: false,
        notCalled: true,
        calledOnce: false,
        calledTwice: false,
        calledThrice: false,
        callCount: 0,
        firstCall: null,
        secondCall: null,
        thirdCall: null,
        lastCall: null,
        args: [],
        returnValues: [],
        thisValues: [],
        exceptions: [],
        callIds: [],
        errorsWithCallStack: []
    });
    return p;
}

var uuid = 0;

// Public API
var spyApi = {
    formatters: require("./spy-formatters"),

    resetHistory: function() {
        if (this.invoking) {
            var err = new Error(
                "Cannot reset Sinon function while invoking it. " +
                    "Move the call to .resetHistory outside of the callback."
            );
            err.name = "InvalidResetException";
            throw err;
        }

        this.called = false;
        this.notCalled = true;
        this.calledOnce = false;
        this.calledTwice = false;
        this.calledThrice = false;
        this.callCount = 0;
        this.firstCall = null;
        this.secondCall = null;
        this.thirdCall = null;
        this.lastCall = null;
        this.args = [];
        this.returnValues = [];
        this.thisValues = [];
        this.exceptions = [];
        this.callIds = [];
        this.errorsWithCallStack = [];

        if (this.fakes) {
            forEach(this.fakes, function(fake) {
                if (fake.resetHistory) {
                    fake.resetHistory();
                } else {
                    fake.reset();
                }
            });
        }

        return this;
    },

    create: function create(func, spyLength) {
        var name;
        var funk = func;

        if (typeof funk !== "function") {
            funk = function() {
                return;
            };
        } else {
            name = functionName(funk);
        }

        var length = spyLength || funk.length;
        var proxy = createProxy(funk, length);

        extend.nonEnum(proxy, spy);
        delete proxy.create;
        extend(proxy, funk);

        proxy.resetHistory();
        proxy.prototype = funk.prototype;

        extend.nonEnum(proxy, {
            displayName: name || "spy",
            toString: functionToString,
            instantiateFake: spy.create,
            id: "spy#" + uuid++
        });

        return proxy;
    },

    invoke: function invoke(func, thisValue, args) {
        var matchings = this.matchingFakes(args);
        var currentCallId = callId++;
        var exception, returnValue;

        incrementCallCount.call(this);
        push(this.thisValues, thisValue);
        push(this.args, args);
        push(this.callIds, currentCallId);
        forEach(matchings, function(matching) {
            incrementCallCount.call(matching);
            push(matching.thisValues, thisValue);
            push(matching.args, args);
            push(matching.callIds, currentCallId);
        });

        // Make call properties available from within the spied function:
        createCallProperties.call(this);
        forEach(matchings, function(matching) {
            createCallProperties.call(matching);
        });

        try {
            this.invoking = true;

            var thisCall = this.getCall(this.callCount - 1);

            if (thisCall.calledWithNew()) {
                // Call through with `new`
                returnValue = new (bind.apply(this.func || func, concat([thisValue], args)))();

                if (typeof returnValue !== "object") {
                    returnValue = thisValue;
                }
            } else {
                returnValue = (this.func || func).apply(thisValue, args);
            }
        } catch (e) {
            exception = e;
        } finally {
            delete this.invoking;
        }

        push(this.exceptions, exception);
        push(this.returnValues, returnValue);
        forEach(matchings, function(matching) {
            push(matching.exceptions, exception);
            push(matching.returnValues, returnValue);
        });

        var err = new ErrorConstructor();
        // 1. Please do not get stack at this point. It may be so very slow, and not actually used
        // 2. PhantomJS does not serialize the stack trace until the error has been thrown:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Stack
        try {
            throw err;
        } catch (e) {
            /* empty */
        }
        push(this.errorsWithCallStack, err);
        forEach(matchings, function(matching) {
            push(matching.errorsWithCallStack, err);
        });

        // Make return value and exception available in the calls:
        createCallProperties.call(this);
        forEach(matchings, function(matching) {
            createCallProperties.call(matching);
        });

        if (exception !== undefined) {
            throw exception;
        }

        return returnValue;
    },

    named: function named(name) {
        this.displayName = name;
        var nameDescriptor = Object.getOwnPropertyDescriptor(this, "name");
        if (nameDescriptor && nameDescriptor.configurable) {
            // IE 11 functions don't have a name.
            // Safari 9 has names that are not configurable.
            nameDescriptor.value = name;
            Object.defineProperty(this, "name", nameDescriptor);
        }
        return this;
    },

    getCall: function getCall(i) {
        if (i < 0 || i >= this.callCount) {
            return null;
        }

        return spyCall(
            this,
            this.thisValues[i],
            this.args[i],
            this.returnValues[i],
            this.exceptions[i],
            this.callIds[i],
            this.errorsWithCallStack[i]
        );
    },

    getCalls: function() {
        var calls = [];
        var i;

        for (i = 0; i < this.callCount; i++) {
            push(calls, this.getCall(i));
        }

        return calls;
    },

    calledBefore: function calledBefore(spyFn) {
        if (!this.called) {
            return false;
        }

        if (!spyFn.called) {
            return true;
        }

        return this.callIds[0] < spyFn.callIds[spyFn.callIds.length - 1];
    },

    calledAfter: function calledAfter(spyFn) {
        if (!this.called || !spyFn.called) {
            return false;
        }

        return this.callIds[this.callCount - 1] > spyFn.callIds[0];
    },

    calledImmediatelyBefore: function calledImmediatelyBefore(spyFn) {
        if (!this.called || !spyFn.called) {
            return false;
        }

        return this.callIds[this.callCount - 1] === spyFn.callIds[spyFn.callCount - 1] - 1;
    },

    calledImmediatelyAfter: function calledImmediatelyAfter(spyFn) {
        if (!this.called || !spyFn.called) {
            return false;
        }

        return this.callIds[this.callCount - 1] === spyFn.callIds[spyFn.callCount - 1] + 1;
    },

    withArgs: function() {
        var args = slice(arguments);

        if (this.fakes) {
            var matching = pop(this.matchingFakes(args, true));

            if (matching) {
                return matching;
            }
        } else {
            extend.nonEnum(this, { fakes: [] });
        }

        var original = this;
        var fake = this.instantiateFake();
        fake.matchingArguments = args;
        fake.parent = this;
        push(this.fakes, fake);

        if (original.defaultBehavior && original.defaultBehavior.promiseLibrary) {
            fake.defaultBehavior = fake.defaultBehavior || createBehavior(fake);
            fake.defaultBehavior.promiseLibrary = original.defaultBehavior.promiseLibrary;
        }

        fake.withArgs = function() {
            return original.withArgs.apply(original, arguments);
        };

        forEach(original.args, function(arg, i) {
            if (!fake.matches(arg)) {
                return;
            }

            incrementCallCount.call(fake);
            push(fake.thisValues, original.thisValues[i]);
            push(fake.args, arg);
            push(fake.returnValues, original.returnValues[i]);
            push(fake.exceptions, original.exceptions[i]);
            push(fake.callIds, original.callIds[i]);
        });

        createCallProperties.call(fake);

        return fake;
    },

    matchingFakes: function(args, strict) {
        return filter.call(this.fakes || [], function(fake) {
            return fake.matches(args, strict);
        });
    },

    matches: function(args, strict) {
        var margs = this.matchingArguments;

        if (margs.length <= args.length && deepEqual(slice(args, 0, margs.length), margs)) {
            return !strict || margs.length === args.length;
        }

        return undefined;
    },

    printf: function(format) {
        var spyInstance = this;
        var args = slice(arguments, 1);
        var formatter;

        return (format || "").replace(/%(.)/g, function(match, specifyer) {
            formatter = spyApi.formatters[specifyer];

            if (typeof formatter === "function") {
                return String(formatter(spyInstance, args));
            } else if (!isNaN(parseInt(specifyer, 10))) {
                return sinonFormat(args[specifyer - 1]);
            }

            return "%" + specifyer;
        });
    }
};

function delegateToCalls(method, matchAny, actual, returnsValues, notCalled, totalCallCount) {
    spyApi[method] = function() {
        if (!this.called) {
            if (notCalled) {
                return notCalled.apply(this, arguments);
            }
            return false;
        }

        if (totalCallCount !== undefined && this.callCount !== totalCallCount) {
            return false;
        }

        var currentCall;
        var matches = 0;
        var returnValues = [];

        for (var i = 0, l = this.callCount; i < l; i += 1) {
            currentCall = this.getCall(i);
            var returnValue = currentCall[actual || method].apply(currentCall, arguments);
            push(returnValues, returnValue);
            if (returnValue) {
                matches += 1;

                if (matchAny) {
                    return true;
                }
            }
        }

        if (returnsValues) {
            return returnValues;
        }
        return matches === this.callCount;
    };
}

delegateToCalls("calledOn", true);
delegateToCalls("alwaysCalledOn", false, "calledOn");
delegateToCalls("calledWith", true);
delegateToCalls("calledOnceWith", true, "calledWith", false, undefined, 1);
delegateToCalls("calledWithMatch", true);
delegateToCalls("alwaysCalledWith", false, "calledWith");
delegateToCalls("alwaysCalledWithMatch", false, "calledWithMatch");
delegateToCalls("calledWithExactly", true);
delegateToCalls("calledOnceWithExactly", true, "calledWithExactly", false, undefined, 1);
delegateToCalls("alwaysCalledWithExactly", false, "calledWithExactly");
delegateToCalls("neverCalledWith", false, "notCalledWith", false, function() {
    return true;
});
delegateToCalls("neverCalledWithMatch", false, "notCalledWithMatch", false, function() {
    return true;
});
delegateToCalls("threw", true);
delegateToCalls("alwaysThrew", false, "threw");
delegateToCalls("returned", true);
delegateToCalls("alwaysReturned", false, "returned");
delegateToCalls("calledWithNew", true);
delegateToCalls("alwaysCalledWithNew", false, "calledWithNew");
/* eslint-disable local-rules/no-prototype-methods */
delegateToCalls("callArg", false, "callArgWith", true, function() {
    throw new Error(this.toString() + " cannot call arg since it was not yet invoked.");
});
spyApi.callArgWith = spyApi.callArg;
delegateToCalls("callArgOn", false, "callArgOnWith", true, function() {
    throw new Error(this.toString() + " cannot call arg since it was not yet invoked.");
});
spyApi.callArgOnWith = spyApi.callArgOn;
delegateToCalls("throwArg", false, "throwArg", false, function() {
    throw new Error(this.toString() + " cannot throw arg since it was not yet invoked.");
});
delegateToCalls("yield", false, "yield", true, function() {
    throw new Error(this.toString() + " cannot yield since it was not yet invoked.");
});
// "invokeCallback" is an alias for "yield" since "yield" is invalid in strict mode.
spyApi.invokeCallback = spyApi.yield;
delegateToCalls("yieldOn", false, "yieldOn", true, function() {
    throw new Error(this.toString() + " cannot yield since it was not yet invoked.");
});
delegateToCalls("yieldTo", false, "yieldTo", true, function(property) {
    throw new Error(
        this.toString() + " cannot yield to '" + valueToString(property) + "' since it was not yet invoked."
    );
});
delegateToCalls("yieldToOn", false, "yieldToOn", true, function(property) {
    throw new Error(
        this.toString() + " cannot yield to '" + valueToString(property) + "' since it was not yet invoked."
    );
});
/* eslint-enable local-rules/no-prototype-methods */

extend(spy, spyApi);
spy.spyCall = spyCall;
module.exports = spy;
