(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nise = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

// cache a reference to setTimeout, so that our reference won't be stubbed out
// when using fake timers and errors will still get logged
// https://github.com/cjohansen/Sinon.JS/issues/381
var realSetTimeout = setTimeout;

function configureLogger(config) {
    config = config || {};
    // Function which prints errors.
    if (!config.hasOwnProperty("logger")) {
        config.logger = function () { };
    }
    // When set to true, any errors logged will be thrown immediately;
    // If set to false, the errors will be thrown in separate execution frame.
    if (!config.hasOwnProperty("useImmediateExceptions")) {
        config.useImmediateExceptions = true;
    }
    // wrap realSetTimeout with something we can stub in tests
    if (!config.hasOwnProperty("setTimeout")) {
        config.setTimeout = realSetTimeout;
    }

    return function logError(label, e) {
        var msg = label + " threw exception: ";
        var err = { name: e.name || label, message: e.message || e.toString(), stack: e.stack };

        function throwLoggedError() {
            err.message = msg + err.message;
            throw err;
        }

        config.logger(msg + "[" + err.name + "] " + err.message);

        if (err.stack) {
            config.logger(err.stack);
        }

        if (config.useImmediateExceptions) {
            throwLoggedError();
        } else {
            config.setTimeout(throwLoggedError, 0);
        }
    };
}

module.exports = configureLogger;

},{}],2:[function(require,module,exports){
"use strict";

var Event = require("./event");

function CustomEvent(type, customData, target) {
    this.initEvent(type, false, false, target);
    this.detail = customData.detail || null;
}

CustomEvent.prototype = new Event();

CustomEvent.prototype.constructor = CustomEvent;

module.exports = CustomEvent;

},{"./event":4}],3:[function(require,module,exports){
"use strict";

function flattenOptions(options) {
    if (options !== Object(options)) {
        return {
            capture: Boolean(options),
            once: false,
            passive: false
        };
    }
    return {
        capture: Boolean(options.capture),
        once: Boolean(options.once),
        passive: Boolean(options.passive)
    };
}
function not(fn) {
    return function () {
        return !fn.apply(this, arguments);
    };
}
function hasListenerFilter(listener, capture) {
    return function (listenerSpec) {
        return listenerSpec.capture === capture
            && listenerSpec.listener === listener;
    };
}

var EventTarget = {
    // https://dom.spec.whatwg.org/#dom-eventtarget-addeventlistener
    addEventListener: function addEventListener(event, listener, providedOptions) {
        // 3. Let capture, passive, and once be the result of flattening more options.
        // Flatten property before executing step 2,
        // feture detection is usually based on registering handler with options object,
        // that has getter defined
        // addEventListener("load", () => {}, {
        //    get once() { supportsOnce = true; }
        // });
        var options = flattenOptions(providedOptions);

        // 2. If callback is null, then return.
        if (listener == null) {
            return;
        }

        this.eventListeners = this.eventListeners || {};
        this.eventListeners[event] = this.eventListeners[event] || [];

        // 4. If context object’s associated list of event listener
        //    does not contain an event listener whose type is type,
        //    callback is callback, and capture is capture, then append
        //    a new event listener to it, whose type is type, callback is
        //    callback, capture is capture, passive is passive, and once is once.
        if (!this.eventListeners[event].some(hasListenerFilter(listener, options.capture))) {
            this.eventListeners[event].push({
                listener: listener,
                capture: options.capture,
                once: options.once
            });
        }
    },

    // https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
    removeEventListener: function removeEventListener(event, listener, providedOptions) {
        if (!this.eventListeners || !this.eventListeners[event]) {
            return;
        }

        // 2. Let capture be the result of flattening options.
        var options = flattenOptions(providedOptions);

        // 3. If there is an event listener in the associated list of
        //    event listeners whose type is type, callback is callback,
        //    and capture is capture, then set that event listener’s
        //    removed to true and remove it from the associated list of event listeners.
        this.eventListeners[event] = this.eventListeners[event]
            .filter(not(hasListenerFilter(listener, options.capture)));
    },

    dispatchEvent: function dispatchEvent(event) {
        if (!this.eventListeners || !this.eventListeners[event.type]) {
            return Boolean(event.defaultPrevented);
        }

        var self = this;
        var type = event.type;
        var listeners = self.eventListeners[type];

        // Remove listeners, that should be dispatched once
        // before running dispatch loop to avoid nested dispatch issues
        self.eventListeners[type] = listeners.filter(function (listenerSpec) {
            return !listenerSpec.once;
        });
        listeners.forEach(function (listenerSpec) {
            var listener = listenerSpec.listener;
            if (typeof listener === "function") {
                listener.call(self, event);
            } else {
                listener.handleEvent(event);
            }
        });

        return Boolean(event.defaultPrevented);
    }
};

module.exports = EventTarget;

},{}],4:[function(require,module,exports){
"use strict";

function Event(type, bubbles, cancelable, target) {
    this.initEvent(type, bubbles, cancelable, target);
}

Event.prototype = {
    initEvent: function (type, bubbles, cancelable, target) {
        this.type = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
        this.target = target;
        this.currentTarget = target;
    },

    stopPropagation: function () {},

    preventDefault: function () {
        this.defaultPrevented = true;
    }
};

module.exports = Event;

},{}],5:[function(require,module,exports){
"use strict";

module.exports = {
    Event: require("./event"),
    ProgressEvent: require("./progress-event"),
    CustomEvent: require("./custom-event"),
    EventTarget: require("./event-target")
};

},{"./custom-event":2,"./event":4,"./event-target":3,"./progress-event":6}],6:[function(require,module,exports){
"use strict";

var Event = require("./event");

function ProgressEvent(type, progressEventRaw, target) {
    this.initEvent(type, false, false, target);
    this.loaded = typeof progressEventRaw.loaded === "number" ? progressEventRaw.loaded : null;
    this.total = typeof progressEventRaw.total === "number" ? progressEventRaw.total : null;
    this.lengthComputable = !!progressEventRaw.total;
}

ProgressEvent.prototype = new Event();

ProgressEvent.prototype.constructor = ProgressEvent;

module.exports = ProgressEvent;

},{"./event":4}],7:[function(require,module,exports){
"use strict";

var lolex = require("lolex");
var fakeServer = require("./index");

function Server() {}
Server.prototype = fakeServer;

var fakeServerWithClock = new Server();

fakeServerWithClock.addRequest = function addRequest(xhr) {
    if (xhr.async) {
        if (typeof setTimeout.clock === "object") {
            this.clock = setTimeout.clock;
        } else {
            this.clock = lolex.install();
            this.resetClock = true;
        }

        if (!this.longestTimeout) {
            var clockSetTimeout = this.clock.setTimeout;
            var clockSetInterval = this.clock.setInterval;
            var server = this;

            this.clock.setTimeout = function (fn, timeout) {
                server.longestTimeout = Math.max(timeout, server.longestTimeout || 0);

                return clockSetTimeout.apply(this, arguments);
            };

            this.clock.setInterval = function (fn, timeout) {
                server.longestTimeout = Math.max(timeout, server.longestTimeout || 0);

                return clockSetInterval.apply(this, arguments);
            };
        }
    }

    return fakeServer.addRequest.call(this, xhr);
};

fakeServerWithClock.respond = function respond() {
    var returnVal = fakeServer.respond.apply(this, arguments);

    if (this.clock) {
        this.clock.tick(this.longestTimeout || 0);
        this.longestTimeout = 0;

        if (this.resetClock) {
            this.clock.uninstall();
            this.resetClock = false;
        }
    }

    return returnVal;
};

fakeServerWithClock.restore = function restore() {
    if (this.clock) {
        this.clock.uninstall();
    }

    return fakeServer.restore.apply(this, arguments);
};

module.exports = fakeServerWithClock;

},{"./index":9,"lolex":45}],8:[function(require,module,exports){
"use strict";

var formatio = require("@sinonjs/formatio");

var formatter = formatio.configure({
    quoteStrings: false,
    limitChildrenCount: 250
});

module.exports = function format() {
    return formatter.ascii.apply(formatter, arguments);
};

},{"@sinonjs/formatio":24}],9:[function(require,module,exports){
"use strict";

var fakeXhr = require("../fake-xhr");
var push = [].push;
var format = require("./format");
var configureLogError = require("../configure-logger");
var pathToRegexp = require("path-to-regexp");

var supportsArrayBuffer = typeof ArrayBuffer !== "undefined";

function responseArray(handler) {
    var response = handler;

    if (Object.prototype.toString.call(handler) !== "[object Array]") {
        response = [200, {}, handler];
    }

    if (typeof response[2] !== "string") {
        if (!supportsArrayBuffer) {
            throw new TypeError("Fake server response body should be a string, but was " +
                                typeof response[2]);
        }
        else if (!(response[2] instanceof ArrayBuffer)) {
            throw new TypeError("Fake server response body should be a string or ArrayBuffer, but was " +
                                typeof response[2]);
        }
    }

    return response;
}

function getDefaultWindowLocation() {
    return { "host": "localhost", "protocol": "http" };
}

function getWindowLocation() {
    if (typeof window === "undefined") {
        // Fallback
        return getDefaultWindowLocation();
    }

    if (typeof window.location !== "undefined") {
        // Browsers place location on window
        return window.location;
    }

    if ((typeof window.window !== "undefined") && (typeof window.window.location !== "undefined")) {
        // React Native on Android places location on window.window
        return window.window.location;
    }

    return getDefaultWindowLocation();
}

function matchOne(response, reqMethod, reqUrl) {
    var rmeth = response.method;
    var matchMethod = !rmeth || rmeth.toLowerCase() === reqMethod.toLowerCase();
    var url = response.url;
    var matchUrl = !url || url === reqUrl || (typeof url.test === "function" && url.test(reqUrl));

    return matchMethod && matchUrl;
}

function match(response, request) {
    var wloc = getWindowLocation();

    var rCurrLoc = new RegExp("^" + wloc.protocol + "//" + wloc.host);

    var requestUrl = request.url;

    if (!/^https?:\/\//.test(requestUrl) || rCurrLoc.test(requestUrl)) {
        requestUrl = requestUrl.replace(rCurrLoc, "");
    }

    if (matchOne(response, this.getHTTPMethod(request), requestUrl)) {
        if (typeof response.response === "function") {
            var ru = response.url;
            var args = [request].concat(ru && typeof ru.exec === "function" ? ru.exec(requestUrl).slice(1) : []);
            return response.response.apply(response, args);
        }

        return true;
    }

    return false;
}

function incrementRequestCount() {
    var count = ++this.requestCount;

    this.requested = true;

    this.requestedOnce = count === 1;
    this.requestedTwice = count === 2;
    this.requestedThrice = count === 3;

    this.firstRequest = this.getRequest(0);
    this.secondRequest = this.getRequest(1);
    this.thirdRequest = this.getRequest(2);

    this.lastRequest = this.getRequest(count - 1);
}

var fakeServer = {
    create: function (config) {
        var server = Object.create(this);
        server.configure(config);
        this.xhr = fakeXhr.useFakeXMLHttpRequest();
        server.requests = [];
        server.requestCount = 0;
        server.queue = [];
        server.responses = [];


        this.xhr.onCreate = function (xhrObj) {
            xhrObj.unsafeHeadersEnabled = function () {
                return !(server.unsafeHeadersEnabled === false);
            };
            server.addRequest(xhrObj);
        };

        return server;
    },

    configure: function (config) {
        var self = this;
        var whitelist = {
            "autoRespond": true,
            "autoRespondAfter": true,
            "respondImmediately": true,
            "fakeHTTPMethods": true,
            "logger": true,
            "unsafeHeadersEnabled": true
        };

        config = config || {};

        Object.keys(config).forEach(function (setting) {
            if (setting in whitelist) {
                self[setting] = config[setting];
            }
        });

        self.logError = configureLogError(config);
    },

    addRequest: function addRequest(xhrObj) {
        var server = this;
        push.call(this.requests, xhrObj);

        incrementRequestCount.call(this);

        xhrObj.onSend = function () {
            server.handleRequest(this);

            if (server.respondImmediately) {
                server.respond();
            } else if (server.autoRespond && !server.responding) {
                setTimeout(function () {
                    server.responding = false;
                    server.respond();
                }, server.autoRespondAfter || 10);

                server.responding = true;
            }
        };
    },

    getHTTPMethod: function getHTTPMethod(request) {
        if (this.fakeHTTPMethods && /post/i.test(request.method)) {
            var matches = (request.requestBody || "").match(/_method=([^\b;]+)/);
            return matches ? matches[1] : request.method;
        }

        return request.method;
    },

    handleRequest: function handleRequest(xhr) {
        if (xhr.async) {
            push.call(this.queue, xhr);
        } else {
            this.processRequest(xhr);
        }
    },

    logger: function () {
        // no-op; override via configure()
    },

    logError: configureLogError({}),

    log: function log(response, request) {
        var str;

        str = "Request:\n" + format(request) + "\n\n";
        str += "Response:\n" + format(response) + "\n\n";

        if (typeof this.logger === "function") {
            this.logger(str);
        }
    },

    respondWith: function respondWith(method, url, body) {
        if (arguments.length === 1 && typeof method !== "function") {
            this.response = responseArray(method);
            return;
        }

        if (arguments.length === 1) {
            body = method;
            url = method = null;
        }

        if (arguments.length === 2) {
            body = url;
            url = method;
            method = null;
        }

        push.call(this.responses, {
            method: method,
            url: typeof url === "string" && url !== "" ? pathToRegexp(url) : url,
            response: typeof body === "function" ? body : responseArray(body)
        });
    },

    respond: function respond() {
        if (arguments.length > 0) {
            this.respondWith.apply(this, arguments);
        }

        var queue = this.queue || [];
        var requests = queue.splice(0, queue.length);
        var self = this;

        requests.forEach(function (request) {
            self.processRequest(request);
        });
    },

    respondAll: function respondAll() {
        if (this.respondImmediately) {
            return;
        }

        this.queue = this.requests.slice(0);

        var request;
        while ((request = this.queue.shift())) {
            this.processRequest(request);
        }
    },

    processRequest: function processRequest(request) {
        try {
            if (request.aborted) {
                return;
            }

            var response = this.response || [404, {}, ""];

            if (this.responses) {
                for (var l = this.responses.length, i = l - 1; i >= 0; i--) {
                    if (match.call(this, this.responses[i], request)) {
                        response = this.responses[i].response;
                        break;
                    }
                }
            }

            if (request.readyState !== 4) {
                this.log(response, request);

                request.respond(response[0], response[1], response[2]);
            }
        } catch (e) {
            this.logError("Fake server request processing", e);
        }
    },

    restore: function restore() {
        return this.xhr.restore && this.xhr.restore.apply(this.xhr, arguments);
    },

    getRequest: function getRequest(index) {
        return this.requests[index] || null;
    },

    reset: function reset() {
        this.resetBehavior();
        this.resetHistory();
    },

    resetBehavior: function resetBehavior() {
        this.responses.length = this.queue.length = 0;
    },

    resetHistory: function resetHistory() {
        this.requests.length = this.requestCount = 0;

        this.requestedOnce = this.requestedTwice = this.requestedThrice = this.requested = false;

        this.firstRequest = this.secondRequest = this.thirdRequest = this.lastRequest = null;
    }
};

module.exports = fakeServer;

},{"../configure-logger":1,"../fake-xhr":11,"./format":8,"path-to-regexp":46}],10:[function(require,module,exports){
"use strict";

exports.isSupported = (function () {
    try {
        return !!new Blob();
    } catch (e) {
        return false;
    }
}());

},{}],11:[function(require,module,exports){
"use strict";

var GlobalTextEncoder = typeof TextEncoder !== "undefined"
    ? TextEncoder
    : require("@sinonjs/text-encoding").TextEncoder;

var configureLogError = require("../configure-logger");
var sinonEvent = require("../event");
var extend = require("just-extend");

var supportsProgress = typeof ProgressEvent !== "undefined";
var supportsCustomEvent = typeof CustomEvent !== "undefined";
var supportsFormData = typeof FormData !== "undefined";
var supportsArrayBuffer = typeof ArrayBuffer !== "undefined";
var supportsBlob = require("./blob").isSupported;

function getWorkingXHR(globalScope) {
    var supportsXHR = typeof globalScope.XMLHttpRequest !== "undefined";
    if (supportsXHR) {
        return globalScope.XMLHttpRequest;
    }

    var supportsActiveX = typeof globalScope.ActiveXObject !== "undefined";
    if (supportsActiveX) {
        return function () {
            return new globalScope.ActiveXObject("MSXML2.XMLHTTP.3.0");
        };
    }

    return false;
}

// Ref: https://fetch.spec.whatwg.org/#forbidden-header-name
var unsafeHeaders = {
    "Accept-Charset": true,
    "Access-Control-Request-Headers": true,
    "Access-Control-Request-Method": true,
    "Accept-Encoding": true,
    "Connection": true,
    "Content-Length": true,
    "Cookie": true,
    "Cookie2": true,
    "Content-Transfer-Encoding": true,
    "Date": true,
    "DNT": true,
    "Expect": true,
    "Host": true,
    "Keep-Alive": true,
    "Origin": true,
    "Referer": true,
    "TE": true,
    "Trailer": true,
    "Transfer-Encoding": true,
    "Upgrade": true,
    "User-Agent": true,
    "Via": true
};

function EventTargetHandler() {
    var self = this;
    var events = ["loadstart", "progress", "abort", "error", "load", "timeout", "loadend"];

    function addEventListener(eventName) {
        self.addEventListener(eventName, function (event) {
            var listener = self["on" + eventName];

            if (listener && typeof listener === "function") {
                listener.call(this, event);
            }
        });
    }

    events.forEach(addEventListener);
}

EventTargetHandler.prototype = sinonEvent.EventTarget;

function normalizeHeaderValue(value) {
    // Ref: https://fetch.spec.whatwg.org/#http-whitespace-bytes
    /*eslint no-control-regex: "off"*/
    return value.replace(/^[\x09\x0A\x0D\x20]+|[\x09\x0A\x0D\x20]+$/g, "");
}

function getHeader(headers, header) {
    var foundHeader = Object.keys(headers).filter(function (h) {
        return h.toLowerCase() === header.toLowerCase();
    });

    return foundHeader[0] || null;
}

function excludeSetCookie2Header(header) {
    return !/^Set-Cookie2?$/i.test(header);
}

function verifyResponseBodyType(body, responseType) {
    var error = null;
    var isString = typeof body === "string";

    if (responseType === "arraybuffer") {

        if (!isString && !(body instanceof ArrayBuffer)) {
            error = new Error("Attempted to respond to fake XMLHttpRequest with " +
                            body + ", which is not a string or ArrayBuffer.");
            error.name = "InvalidBodyException";
        }
    }
    else if (!isString) {
        error = new Error("Attempted to respond to fake XMLHttpRequest with " +
                        body + ", which is not a string.");
        error.name = "InvalidBodyException";
    }

    if (error) {
        throw error;
    }
}

function convertToArrayBuffer(body, encoding) {
    if (body instanceof ArrayBuffer) {
        return body;
    }

    return new GlobalTextEncoder(encoding || "utf-8").encode(body).buffer;
}

function isXmlContentType(contentType) {
    return !contentType || /(text\/xml)|(application\/xml)|(\+xml)/.test(contentType);
}

function clearResponse(xhr) {
    if (xhr.responseType === "" || xhr.responseType === "text") {
        xhr.response = xhr.responseText = "";
    } else {
        xhr.response = xhr.responseText = null;
    }
    xhr.responseXML = null;
}

function fakeXMLHttpRequestFor(globalScope) {
    var isReactNative = globalScope.navigator && globalScope.navigator.product === "ReactNative";
    var sinonXhr = { XMLHttpRequest: globalScope.XMLHttpRequest };
    sinonXhr.GlobalXMLHttpRequest = globalScope.XMLHttpRequest;
    sinonXhr.GlobalActiveXObject = globalScope.ActiveXObject;
    sinonXhr.supportsActiveX = typeof sinonXhr.GlobalActiveXObject !== "undefined";
    sinonXhr.supportsXHR = typeof sinonXhr.GlobalXMLHttpRequest !== "undefined";
    sinonXhr.workingXHR = getWorkingXHR(globalScope);
    sinonXhr.supportsTimeout =
        (sinonXhr.supportsXHR && "timeout" in (new sinonXhr.GlobalXMLHttpRequest()));
    sinonXhr.supportsCORS = isReactNative ||
        (sinonXhr.supportsXHR && "withCredentials" in (new sinonXhr.GlobalXMLHttpRequest()));

    // Note that for FakeXMLHttpRequest to work pre ES5
    // we lose some of the alignment with the spec.
    // To ensure as close a match as possible,
    // set responseType before calling open, send or respond;
    function FakeXMLHttpRequest(config) {
        EventTargetHandler.call(this);
        this.readyState = FakeXMLHttpRequest.UNSENT;
        this.requestHeaders = {};
        this.requestBody = null;
        this.status = 0;
        this.statusText = "";
        this.upload = new EventTargetHandler();
        this.responseType = "";
        this.response = "";
        this.logError = configureLogError(config);

        if (sinonXhr.supportsTimeout) {
            this.timeout = 0;
        }

        if (sinonXhr.supportsCORS) {
            this.withCredentials = false;
        }

        if (typeof FakeXMLHttpRequest.onCreate === "function") {
            FakeXMLHttpRequest.onCreate(this);
        }
    }

    function verifyState(xhr) {
        if (xhr.readyState !== FakeXMLHttpRequest.OPENED) {
            throw new Error("INVALID_STATE_ERR");
        }

        if (xhr.sendFlag) {
            throw new Error("INVALID_STATE_ERR");
        }
    }

    // largest arity in XHR is 5 - XHR#open
    var apply = function (obj, method, args) {
        switch (args.length) {
            case 0: return obj[method]();
            case 1: return obj[method](args[0]);
            case 2: return obj[method](args[0], args[1]);
            case 3: return obj[method](args[0], args[1], args[2]);
            case 4: return obj[method](args[0], args[1], args[2], args[3]);
            case 5: return obj[method](args[0], args[1], args[2], args[3], args[4]);
            default: throw new Error("Unhandled case");
        }
    };

    FakeXMLHttpRequest.filters = [];
    FakeXMLHttpRequest.addFilter = function addFilter(fn) {
        this.filters.push(fn);
    };
    FakeXMLHttpRequest.defake = function defake(fakeXhr, xhrArgs) {
        var xhr = new sinonXhr.workingXHR(); // eslint-disable-line new-cap

        [
            "open",
            "setRequestHeader",
            "abort",
            "getResponseHeader",
            "getAllResponseHeaders",
            "addEventListener",
            "overrideMimeType",
            "removeEventListener"
        ].forEach(function (method) {
            fakeXhr[method] = function () {
                return apply(xhr, method, arguments);
            };
        });

        fakeXhr.send = function () {
            // Ref: https://xhr.spec.whatwg.org/#the-responsetype-attribute
            if (xhr.responseType !== fakeXhr.responseType) {
                xhr.responseType = fakeXhr.responseType;
            }
            return apply(xhr, "send", arguments);
        };

        var copyAttrs = function (args) {
            args.forEach(function (attr) {
                fakeXhr[attr] = xhr[attr];
            });
        };

        var stateChangeStart = function () {
            fakeXhr.readyState = xhr.readyState;
            if (xhr.readyState >= FakeXMLHttpRequest.HEADERS_RECEIVED) {
                copyAttrs(["status", "statusText"]);
            }
            if (xhr.readyState >= FakeXMLHttpRequest.LOADING) {
                copyAttrs(["response"]);
                if (xhr.responseType === "" || xhr.responseType === "text") {
                    copyAttrs(["responseText"]);
                }
            }
            if (
                xhr.readyState === FakeXMLHttpRequest.DONE &&
                (xhr.responseType === "" || xhr.responseType === "document")
            ) {
                copyAttrs(["responseXML"]);
            }
        };

        var stateChangeEnd = function () {
            if (fakeXhr.onreadystatechange) {
                fakeXhr.onreadystatechange.call(fakeXhr, { target: fakeXhr, currentTarget: fakeXhr });
            }
        };

        var stateChange = function stateChange() {
            stateChangeStart();
            stateChangeEnd();
        };

        if (xhr.addEventListener) {
            xhr.addEventListener("readystatechange", stateChangeStart);

            Object.keys(fakeXhr.eventListeners).forEach(function (event) {
                /*eslint-disable no-loop-func*/
                fakeXhr.eventListeners[event].forEach(function (handler) {
                    xhr.addEventListener(event, handler.listener, {
                        capture: handler.capture,
                        once: handler.once
                    });
                });
                /*eslint-enable no-loop-func*/
            });

            xhr.addEventListener("readystatechange", stateChangeEnd);
        } else {
            xhr.onreadystatechange = stateChange;
        }
        apply(xhr, "open", xhrArgs);
    };
    FakeXMLHttpRequest.useFilters = false;

    function verifyRequestOpened(xhr) {
        if (xhr.readyState !== FakeXMLHttpRequest.OPENED) {
            throw new Error("INVALID_STATE_ERR - " + xhr.readyState);
        }
    }

    function verifyRequestSent(xhr) {
        if (xhr.readyState === FakeXMLHttpRequest.DONE) {
            throw new Error("Request done");
        }
    }

    function verifyHeadersReceived(xhr) {
        if (xhr.async && xhr.readyState !== FakeXMLHttpRequest.HEADERS_RECEIVED) {
            throw new Error("No headers received");
        }
    }

    function convertResponseBody(responseType, contentType, body) {
        if (responseType === "" || responseType === "text") {
            return body;
        } else if (supportsArrayBuffer && responseType === "arraybuffer") {
            return convertToArrayBuffer(body);
        } else if (responseType === "json") {
            try {
                return JSON.parse(body);
            } catch (e) {
                // Return parsing failure as null
                return null;
            }
        } else if (supportsBlob && responseType === "blob") {
            var blobOptions = {};
            if (contentType) {
                blobOptions.type = contentType;
            }
            return new Blob([convertToArrayBuffer(body)], blobOptions);
        } else if (responseType === "document") {
            if (isXmlContentType(contentType)) {
                return FakeXMLHttpRequest.parseXML(body);
            }
            return null;
        }
        throw new Error("Invalid responseType " + responseType);
    }

    /**
     * Steps to follow when there is an error, according to:
     * https://xhr.spec.whatwg.org/#request-error-steps
     */
    function requestErrorSteps(xhr) {
        clearResponse(xhr);
        xhr.errorFlag = true;
        xhr.requestHeaders = {};
        xhr.responseHeaders = {};

        if (xhr.readyState !== FakeXMLHttpRequest.UNSENT && xhr.sendFlag
            && xhr.readyState !== FakeXMLHttpRequest.DONE) {
            xhr.readyStateChange(FakeXMLHttpRequest.DONE);
            xhr.sendFlag = false;
        }
    }

    FakeXMLHttpRequest.parseXML = function parseXML(text) {
        // Treat empty string as parsing failure
        if (text !== "") {
            try {
                if (typeof DOMParser !== "undefined") {
                    var parser = new DOMParser();
                    var parsererrorNS = "";

                    try {
                        var parsererrors = parser
                            .parseFromString("INVALID", "text/xml")
                            .getElementsByTagName("parsererror");
                        if (parsererrors.length) {
                            parsererrorNS = parsererrors[0].namespaceURI;
                        }
                    } catch (e) {
                        // passing invalid XML makes IE11 throw
                        // so no namespace needs to be determined
                    }

                    var result;
                    try {
                        result = parser.parseFromString(text, "text/xml");
                    } catch (err) {
                        return null;
                    }

                    return result.getElementsByTagNameNS(parsererrorNS, "parsererror").length
                        ? null : result;
                }
                var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = "false";
                xmlDoc.loadXML(text);
                return xmlDoc.parseError.errorCode !== 0
                    ? null : xmlDoc;
            } catch (e) {
                // Unable to parse XML - no biggie
            }
        }

        return null;
    };

    FakeXMLHttpRequest.statusCodes = {
        100: "Continue",
        101: "Switching Protocols",
        200: "OK",
        201: "Created",
        202: "Accepted",
        203: "Non-Authoritative Information",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        207: "Multi-Status",
        300: "Multiple Choice",
        301: "Moved Permanently",
        302: "Found",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        307: "Temporary Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Timeout",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Request Entity Too Large",
        414: "Request-URI Too Long",
        415: "Unsupported Media Type",
        416: "Requested Range Not Satisfiable",
        417: "Expectation Failed",
        422: "Unprocessable Entity",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout",
        505: "HTTP Version Not Supported"
    };

    extend(FakeXMLHttpRequest.prototype, sinonEvent.EventTarget, {
        async: true,

        open: function open(method, url, async, username, password) {
            this.method = method;
            this.url = url;
            this.async = typeof async === "boolean" ? async : true;
            this.username = username;
            this.password = password;
            clearResponse(this);
            this.requestHeaders = {};
            this.sendFlag = false;

            if (FakeXMLHttpRequest.useFilters === true) {
                var xhrArgs = arguments;
                var defake = FakeXMLHttpRequest.filters.some(function (filter) {
                    return filter.apply(this, xhrArgs);
                });
                if (defake) {
                    FakeXMLHttpRequest.defake(this, arguments);
                    return;
                }
            }
            this.readyStateChange(FakeXMLHttpRequest.OPENED);
        },

        readyStateChange: function readyStateChange(state) {
            this.readyState = state;

            var readyStateChangeEvent = new sinonEvent.Event("readystatechange", false, false, this);
            var event, progress;

            if (typeof this.onreadystatechange === "function") {
                try {
                    this.onreadystatechange(readyStateChangeEvent);
                } catch (e) {
                    this.logError("Fake XHR onreadystatechange handler", e);
                }
            }

            if (this.readyState === FakeXMLHttpRequest.DONE) {
                if (this.timedOut || this.aborted || this.status === 0) {
                    progress = {loaded: 0, total: 0};
                    event = (this.timedOut && "timeout") || (this.aborted && "abort") || "error";
                } else {
                    progress = {loaded: 100, total: 100};
                    event = "load";
                }

                if (supportsProgress) {
                    this.upload.dispatchEvent(new sinonEvent.ProgressEvent("progress", progress, this));
                    this.upload.dispatchEvent(new sinonEvent.ProgressEvent(event, progress, this));
                    this.upload.dispatchEvent(new sinonEvent.ProgressEvent("loadend", progress, this));
                }

                this.dispatchEvent(new sinonEvent.ProgressEvent("progress", progress, this));
                this.dispatchEvent(new sinonEvent.ProgressEvent(event, progress, this));
                this.dispatchEvent(new sinonEvent.ProgressEvent("loadend", progress, this));
            }

            this.dispatchEvent(readyStateChangeEvent);
        },

        // Ref https://xhr.spec.whatwg.org/#the-setrequestheader()-method
        setRequestHeader: function setRequestHeader(header, value) {
            if (typeof value !== "string") {
                throw new TypeError("By RFC7230, section 3.2.4, header values should be strings. Got " + typeof value);
            }
            verifyState(this);

            var checkUnsafeHeaders = true;
            if (typeof this.unsafeHeadersEnabled === "function") {
                checkUnsafeHeaders = this.unsafeHeadersEnabled();
            }

            if (checkUnsafeHeaders && (getHeader(unsafeHeaders, header) !== null || /^(Sec-|Proxy-)/i.test(header))) {
                throw new Error("Refused to set unsafe header \"" + header + "\"");
            }

            value = normalizeHeaderValue(value);

            var existingHeader = getHeader(this.requestHeaders, header);
            if (existingHeader) {
                this.requestHeaders[existingHeader] += ", " + value;
            } else {
                this.requestHeaders[header] = value;
            }
        },

        setStatus: function setStatus(status) {
            var sanitizedStatus = typeof status === "number" ? status : 200;

            verifyRequestOpened(this);
            this.status = sanitizedStatus;
            this.statusText = FakeXMLHttpRequest.statusCodes[sanitizedStatus];
        },

        // Helps testing
        setResponseHeaders: function setResponseHeaders(headers) {
            verifyRequestOpened(this);

            var responseHeaders = this.responseHeaders = {};

            Object.keys(headers).forEach(function (header) {
                responseHeaders[header] = headers[header];
            });

            if (this.async) {
                this.readyStateChange(FakeXMLHttpRequest.HEADERS_RECEIVED);
            } else {
                this.readyState = FakeXMLHttpRequest.HEADERS_RECEIVED;
            }
        },

        // Currently treats ALL data as a DOMString (i.e. no Document)
        send: function send(data) {
            verifyState(this);

            if (!/^(head)$/i.test(this.method)) {
                var contentType = getHeader(this.requestHeaders, "Content-Type");
                if (this.requestHeaders[contentType]) {
                    var value = this.requestHeaders[contentType].split(";");
                    this.requestHeaders[contentType] = value[0] + ";charset=utf-8";
                } else if (supportsFormData && !(data instanceof FormData)) {
                    this.requestHeaders["Content-Type"] = "text/plain;charset=utf-8";
                }

                this.requestBody = data;
            }

            this.errorFlag = false;
            this.sendFlag = this.async;
            clearResponse(this);

            if (typeof this.onSend === "function") {
                this.onSend(this);
            }

            // Only listen if setInterval and Date are a stubbed.
            if (sinonXhr.supportsTimeout && typeof setInterval.clock === "object" && typeof Date.clock === "object") {
                var initiatedTime = Date.now();
                var self = this;

                // Listen to any possible tick by fake timers and check to see if timeout has
                // been exceeded. It's important to note that timeout can be changed while a request
                // is in flight, so we must check anytime the end user forces a clock tick to make
                // sure timeout hasn't changed.
                // https://xhr.spec.whatwg.org/#dfnReturnLink-2
                var clearIntervalId = setInterval(function () {
                    // Check if the readyState has been reset or is done. If this is the case, there
                    // should be no timeout. This will also prevent aborted requests and
                    // fakeServerWithClock from triggering unnecessary responses.
                    if (self.readyState === FakeXMLHttpRequest.UNSENT
                    || self.readyState === FakeXMLHttpRequest.DONE) {
                        clearInterval(clearIntervalId);
                    } else if (typeof self.timeout === "number" && self.timeout > 0) {
                        if (Date.now() >= (initiatedTime + self.timeout)) {
                            self.triggerTimeout();
                            clearInterval(clearIntervalId);
                        }
                    }
                }, 1);
            }

            this.dispatchEvent(new sinonEvent.Event("loadstart", false, false, this));
        },

        abort: function abort() {
            this.aborted = true;
            requestErrorSteps(this);
            this.readyState = FakeXMLHttpRequest.UNSENT;
        },

        error: function () {
            clearResponse(this);
            this.errorFlag = true;
            this.requestHeaders = {};
            this.responseHeaders = {};

            this.readyStateChange(FakeXMLHttpRequest.DONE);
        },

        triggerTimeout: function triggerTimeout() {
            if (sinonXhr.supportsTimeout) {
                this.timedOut = true;
                requestErrorSteps(this);
            }
        },

        getResponseHeader: function getResponseHeader(header) {
            if (this.readyState < FakeXMLHttpRequest.HEADERS_RECEIVED) {
                return null;
            }

            if (/^Set-Cookie2?$/i.test(header)) {
                return null;
            }

            header = getHeader(this.responseHeaders, header);

            return this.responseHeaders[header] || null;
        },

        getAllResponseHeaders: function getAllResponseHeaders() {
            if (this.readyState < FakeXMLHttpRequest.HEADERS_RECEIVED) {
                return "";
            }

            var responseHeaders = this.responseHeaders;
            var headers = Object.keys(responseHeaders)
                .filter(excludeSetCookie2Header)
                .reduce(function (prev, header) {
                    var value = responseHeaders[header];

                    return prev + (header + ": " + value + "\r\n");
                }, "");

            return headers;
        },

        setResponseBody: function setResponseBody(body) {
            verifyRequestSent(this);
            verifyHeadersReceived(this);
            verifyResponseBodyType(body, this.responseType);
            var contentType = this.overriddenMimeType || this.getResponseHeader("Content-Type");

            var isTextResponse = this.responseType === "" || this.responseType === "text";
            clearResponse(this);
            if (this.async) {
                var chunkSize = this.chunkSize || 10;
                var index = 0;

                do {
                    this.readyStateChange(FakeXMLHttpRequest.LOADING);

                    if (isTextResponse) {
                        this.responseText = this.response += body.substring(index, index + chunkSize);
                    }
                    index += chunkSize;
                } while (index < body.length);
            }

            this.response = convertResponseBody(this.responseType, contentType, body);
            if (isTextResponse) {
                this.responseText = this.response;
            }

            if (this.responseType === "document") {
                this.responseXML = this.response;
            } else if (this.responseType === "" && isXmlContentType(contentType)) {
                this.responseXML = FakeXMLHttpRequest.parseXML(this.responseText);
            }
            this.readyStateChange(FakeXMLHttpRequest.DONE);
        },

        respond: function respond(status, headers, body) {
            this.setStatus(status);
            this.setResponseHeaders(headers || {});
            this.setResponseBody(body || "");
        },

        uploadProgress: function uploadProgress(progressEventRaw) {
            if (supportsProgress) {
                this.upload.dispatchEvent(new sinonEvent.ProgressEvent("progress", progressEventRaw, this.upload));
            }
        },

        downloadProgress: function downloadProgress(progressEventRaw) {
            if (supportsProgress) {
                this.dispatchEvent(new sinonEvent.ProgressEvent("progress", progressEventRaw, this));
            }
        },

        uploadError: function uploadError(error) {
            if (supportsCustomEvent) {
                this.upload.dispatchEvent(new sinonEvent.CustomEvent("error", {detail: error}));
            }
        },

        overrideMimeType: function overrideMimeType(type) {
            if (this.readyState >= FakeXMLHttpRequest.LOADING) {
                throw new Error("INVALID_STATE_ERR");
            }
            this.overriddenMimeType = type;
        }
    });

    var states = {
        UNSENT: 0,
        OPENED: 1,
        HEADERS_RECEIVED: 2,
        LOADING: 3,
        DONE: 4
    };

    extend(FakeXMLHttpRequest, states);
    extend(FakeXMLHttpRequest.prototype, states);

    function useFakeXMLHttpRequest() {
        FakeXMLHttpRequest.restore = function restore(keepOnCreate) {
            if (sinonXhr.supportsXHR) {
                globalScope.XMLHttpRequest = sinonXhr.GlobalXMLHttpRequest;
            }

            if (sinonXhr.supportsActiveX) {
                globalScope.ActiveXObject = sinonXhr.GlobalActiveXObject;
            }

            delete FakeXMLHttpRequest.restore;

            if (keepOnCreate !== true) {
                delete FakeXMLHttpRequest.onCreate;
            }
        };
        if (sinonXhr.supportsXHR) {
            globalScope.XMLHttpRequest = FakeXMLHttpRequest;
        }

        if (sinonXhr.supportsActiveX) {
            globalScope.ActiveXObject = function ActiveXObject(objId) {
                if (objId === "Microsoft.XMLHTTP" || /^Msxml2\.XMLHTTP/i.test(objId)) {

                    return new FakeXMLHttpRequest();
                }

                return new sinonXhr.GlobalActiveXObject(objId);
            };
        }

        return FakeXMLHttpRequest;
    }

    return {
        xhr: sinonXhr,
        FakeXMLHttpRequest: FakeXMLHttpRequest,
        useFakeXMLHttpRequest: useFakeXMLHttpRequest
    };
}

var globalObject = typeof global !== "undefined" ? global : window;
module.exports = extend(fakeXMLHttpRequestFor(globalObject), {
    fakeXMLHttpRequestFor: fakeXMLHttpRequestFor
});

},{"../configure-logger":1,"../event":5,"./blob":10,"@sinonjs/text-encoding":41,"just-extend":43}],12:[function(require,module,exports){
"use strict";

module.exports = {
    fakeServer: require("./fake-server"),
    fakeServerWithClock: require("./fake-server/fake-server-with-clock"),
    fakeXhr: require("./fake-xhr")
};

},{"./fake-server":9,"./fake-server/fake-server-with-clock":7,"./fake-xhr":11}],13:[function(require,module,exports){
"use strict";

// This is an `every` implementation that works for all iterables
module.exports = function every(obj, fn) {
    var pass = true;

    try {
        /* eslint-disable-next-line local-rules/no-prototype-methods */
        obj.forEach(function() {
            if (!fn.apply(this, arguments)) {
                // Throwing an error is the only way to break `forEach`
                throw new Error();
            }
        });
    } catch (e) {
        pass = false;
    }

    return pass;
};

},{}],14:[function(require,module,exports){
"use strict";

module.exports = function functionName(func) {
    return (
        func.displayName ||
        func.name ||
        // Use function decomposition as a last resort to get function
        // name. Does not rely on function decomposition to work - if it
        // doesn't debugging will be slightly less informative
        // (i.e. toString will say 'spy' rather than 'myFunc').
        (String(func).match(/function ([^\s\(]+)/) || [])[1]
    );
};

},{}],15:[function(require,module,exports){
"use strict";

module.exports = {
    every: require("./every"),
    functionName: require("./function-name"),
    prototypes: require("./prototypes"),
    typeOf: require("./type-of"),
    valueToString: require("./value-to-string")
};

},{"./every":13,"./function-name":14,"./prototypes":19,"./type-of":22,"./value-to-string":23}],16:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype");

module.exports = copyPrototype(Array.prototype);

},{"./copy-prototype":17}],17:[function(require,module,exports){
"use strict";

var call = Function.call;

module.exports = function copyPrototypeMethods(prototype) {
    /* eslint-disable local-rules/no-prototype-methods */
    return Object.getOwnPropertyNames(prototype).reduce(function(result, name) {
        // ignore size because it throws from Map
        if (
            name !== "size" &&
            name !== "caller" &&
            name !== "callee" &&
            name !== "arguments" &&
            typeof prototype[name] === "function"
        ) {
            result[name] = call.bind(prototype[name]);
        }

        return result;
    }, Object.create(null));
};

},{}],18:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype");

module.exports = copyPrototype(Function.prototype);

},{"./copy-prototype":17}],19:[function(require,module,exports){
"use strict";

module.exports = {
    array: require("./array"),
    function: require("./function"),
    object: require("./object"),
    string: require("./string")
};

},{"./array":16,"./function":18,"./object":20,"./string":21}],20:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype");

module.exports = copyPrototype(Object.prototype);

},{"./copy-prototype":17}],21:[function(require,module,exports){
"use strict";

var copyPrototype = require("./copy-prototype");

module.exports = copyPrototype(String.prototype);

},{"./copy-prototype":17}],22:[function(require,module,exports){
"use strict";

var type = require("type-detect");

module.exports = function typeOf(value) {
    return type(value).toLowerCase();
};

},{"type-detect":47}],23:[function(require,module,exports){
"use strict";

function valueToString(value) {
    if (value && value.toString) {
        /* eslint-disable-next-line local-rules/no-prototype-methods */
        return value.toString();
    }
    return String(value);
}

module.exports = valueToString;

},{}],24:[function(require,module,exports){
"use strict";

var samsam = require("@sinonjs/samsam");
var formatio = {
    excludeConstructors: ["Object", /^.$/],
    quoteStrings: true,
    limitChildrenCount: 0
};

var specialObjects = [];
if (typeof global !== "undefined") {
    specialObjects.push({ object: global, value: "[object global]" });
}
if (typeof document !== "undefined") {
    specialObjects.push({
        object: document,
        value: "[object HTMLDocument]"
    });
}
if (typeof window !== "undefined") {
    specialObjects.push({ object: window, value: "[object Window]" });
}

function functionName(func) {
    if (!func) { return ""; }
    if (func.displayName) { return func.displayName; }
    if (func.name) { return func.name; }
    var matches = func.toString().match(/function\s+([^\(]+)/m);
    return (matches && matches[1]) || "";
}

function constructorName(f, object) {
    var name = functionName(object && object.constructor);
    var excludes = f.excludeConstructors ||
            formatio.excludeConstructors || [];

    var i, l;
    for (i = 0, l = excludes.length; i < l; ++i) {
        if (typeof excludes[i] === "string" && excludes[i] === name) {
            return "";
        } else if (excludes[i].test && excludes[i].test(name)) {
            return "";
        }
    }

    return name;
}

function isCircular(object, objects) {
    if (typeof object !== "object") { return false; }
    var i, l;
    for (i = 0, l = objects.length; i < l; ++i) {
        if (objects[i] === object) { return true; }
    }
    return false;
}

function ascii(f, object, processed, indent) {
    if (typeof object === "string") {
        if (object.length === 0) { return "(empty string)"; }
        var qs = f.quoteStrings;
        var quote = typeof qs !== "boolean" || qs;
        return processed || quote ? "\"" + object + "\"" : object;
    }

    if (typeof object === "function" && !(object instanceof RegExp)) {
        return ascii.func(object);
    }

    processed = processed || [];

    if (isCircular(object, processed)) { return "[Circular]"; }

    if (Object.prototype.toString.call(object) === "[object Array]") {
        return ascii.array.call(f, object, processed);
    }

    if (!object) { return String((1 / object) === -Infinity ? "-0" : object); }
    if (samsam.isElement(object)) { return ascii.element(object); }

    if (typeof object.toString === "function" &&
            object.toString !== Object.prototype.toString) {
        return object.toString();
    }

    var i, l;
    for (i = 0, l = specialObjects.length; i < l; i++) {
        if (object === specialObjects[i].object) {
            return specialObjects[i].value;
        }
    }

    if (typeof Set !== "undefined" && object instanceof Set) {
        return ascii.set.call(f, object, processed);
    }

    return ascii.object.call(f, object, processed, indent);
}

ascii.func = function (func) {
    return "function " + functionName(func) + "() {}";
};

function delimit(str, delimiters) {
    delimiters = delimiters || ["[", "]"];
    return delimiters[0] + str + delimiters[1];
}

ascii.array = function (array, processed, delimiters) {
    processed = processed || [];
    processed.push(array);
    var pieces = [];
    var i, l;
    l = (this.limitChildrenCount > 0) ?
        Math.min(this.limitChildrenCount, array.length) : array.length;

    for (i = 0; i < l; ++i) {
        pieces.push(ascii(this, array[i], processed));
    }

    if (l < array.length) {
        pieces.push("[... " + (array.length - l) + " more elements]");
    }

    return delimit(pieces.join(", "), delimiters);
};

ascii.set = function (set, processed) {
    return ascii.array.call(this, Array.from(set), processed, ["Set {", "}"]);
};

ascii.object = function (object, processed, indent) {
    processed = processed || [];
    processed.push(object);
    indent = indent || 0;
    var pieces = [];
    var properties = Object.keys(object).sort();
    var length = 3;
    var prop, str, obj, i, k, l;
    l = (this.limitChildrenCount > 0) ?
        Math.min(this.limitChildrenCount, properties.length) : properties.length;

    for (i = 0; i < l; ++i) {
        prop = properties[i];
        obj = object[prop];

        if (isCircular(obj, processed)) {
            str = "[Circular]";
        } else {
            str = ascii(this, obj, processed, indent + 2);
        }

        str = (/\s/.test(prop) ? "\"" + prop + "\"" : prop) + ": " + str;
        length += str.length;
        pieces.push(str);
    }

    var cons = constructorName(this, object);
    var prefix = cons ? "[" + cons + "] " : "";
    var is = "";
    for (i = 0, k = indent; i < k; ++i) { is += " "; }

    if (l < properties.length)
    {pieces.push("[... " + (properties.length - l) + " more elements]");}

    if (length + indent > 80) {
        return prefix + "{\n  " + is + pieces.join(",\n  " + is) + "\n" +
            is + "}";
    }
    return prefix + "{ " + pieces.join(", ") + " }";
};

ascii.element = function (element) {
    var tagName = element.tagName.toLowerCase();
    var attrs = element.attributes;
    var pairs = [];
    var attr, attrName, i, l, val;

    for (i = 0, l = attrs.length; i < l; ++i) {
        attr = attrs.item(i);
        attrName = attr.nodeName.toLowerCase().replace("html:", "");
        val = attr.nodeValue;
        if (attrName !== "contenteditable" || val !== "inherit") {
            if (val) { pairs.push(attrName + "=\"" + val + "\""); }
        }
    }

    var formatted = "<" + tagName + (pairs.length > 0 ? " " : "");
    // SVG elements have undefined innerHTML
    var content = element.innerHTML || "";

    if (content.length > 20) {
        content = content.substr(0, 20) + "[...]";
    }

    var res = formatted + pairs.join(" ") + ">" + content +
            "</" + tagName + ">";

    return res.replace(/ contentEditable="inherit"/, "");
};

function Formatio(options) {
    // eslint-disable-next-line guard-for-in
    for (var opt in options) {
        this[opt] = options[opt];
    }
}

Formatio.prototype = {
    functionName: functionName,

    configure: function (options) {
        return new Formatio(options);
    },

    constructorName: function (object) {
        return constructorName(this, object);
    },

    ascii: function (object, processed, indent) {
        return ascii(this, object, processed, indent);
    }
};

module.exports = Formatio.prototype;

},{"@sinonjs/samsam":40}],25:[function(require,module,exports){
"use strict";

var getClass = require("./get-class");
var identical = require("./identical");
var isArguments = require("./is-arguments");
var isDate = require("./is-date");
var isElement = require("./is-element");
var isNaN = require("./is-nan");
var isObject = require("./is-object");
var isSet = require("./is-set");
var isSubset = require("./is-subset");
var getClassName = require("./get-class-name");

var every = Array.prototype.every;
var getTime = Date.prototype.getTime;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var indexOf = Array.prototype.indexOf;
var keys = Object.keys;

/**
 * @name samsam.deepEqual
 * @param Object first
 * @param Object second
 *
 * Deep equal comparison. Two values are "deep equal" if:
 *
 *   - They are equal, according to samsam.identical
 *   - They are both date objects representing the same time
 *   - They are both arrays containing elements that are all deepEqual
 *   - They are objects with the same set of properties, and each property
 *     in ``first`` is deepEqual to the corresponding property in ``second``
 *
 * Supports cyclic objects.
 */
function deepEqualCyclic(first, second, match) {
    // used for cyclic comparison
    // contain already visited objects
    var objects1 = [];
    var objects2 = [];
    // contain pathes (position in the object structure)
    // of the already visited objects
    // indexes same as in objects arrays
    var paths1 = [];
    var paths2 = [];
    // contains combinations of already compared objects
    // in the manner: { "$1['ref']$2['ref']": true }
    var compared = {};

    // does the recursion for the deep equal check
    return (function deepEqual(obj1, obj2, path1, path2) {
        // If both are matchers they must be the same instance in order to be
        // considered equal If we didn't do that we would end up running one
        // matcher against the other
        if (match && match.isMatcher(obj2)) {
            if (match.isMatcher(obj1)) {
                return obj1 === obj2;
            }
            return obj2.test(obj1);
        }

        var type1 = typeof obj1;
        var type2 = typeof obj2;

        // == null also matches undefined
        if (
            obj1 === obj2 ||
            isNaN(obj1) ||
            isNaN(obj2) ||
            obj1 == null ||
            obj2 == null ||
            type1 !== "object" ||
            type2 !== "object"
        ) {
            return identical(obj1, obj2);
        }

        // Elements are only equal if identical(expected, actual)
        if (isElement(obj1) || isElement(obj2)) {
            return false;
        }

        var isDate1 = isDate(obj1);
        var isDate2 = isDate(obj2);
        if (isDate1 || isDate2) {
            if (
                !isDate1 ||
                !isDate2 ||
                getTime.call(obj1) !== getTime.call(obj2)
            ) {
                return false;
            }
        }

        if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
            if (obj1.toString() !== obj2.toString()) {
                return false;
            }
        }

        if (obj1 instanceof Error && obj2 instanceof Error) {
            if (
                obj1.constructor !== obj2.constructor ||
                obj1.message !== obj2.message ||
                obj1.stack !== obj2.stack
            ) {
                return false;
            }
        }

        var class1 = getClass(obj1);
        var class2 = getClass(obj2);
        var keys1 = keys(obj1);
        var keys2 = keys(obj2);
        var name1 = getClassName(obj1);
        var name2 = getClassName(obj2);

        if (isArguments(obj1) || isArguments(obj2)) {
            if (obj1.length !== obj2.length) {
                return false;
            }
        } else {
            if (
                type1 !== type2 ||
                class1 !== class2 ||
                keys1.length !== keys2.length ||
                (name1 && name2 && name1 !== name2)
            ) {
                return false;
            }
        }

        if (isSet(obj1) || isSet(obj2)) {
            if (!isSet(obj1) || !isSet(obj2) || obj1.size !== obj2.size) {
                return false;
            }

            return isSubset(obj1, obj2, deepEqual);
        }

        return every.call(keys1, function(key) {
            if (!hasOwnProperty.call(obj2, key)) {
                return false;
            }

            var value1 = obj1[key];
            var value2 = obj2[key];
            var isObject1 = isObject(value1);
            var isObject2 = isObject(value2);
            // determines, if the objects were already visited
            // (it's faster to check for isObject first, than to
            // get -1 from getIndex for non objects)
            var index1 = isObject1 ? indexOf.call(objects1, value1) : -1;
            var index2 = isObject2 ? indexOf.call(objects2, value2) : -1;
            // determines the new paths of the objects
            // - for non cyclic objects the current path will be extended
            //   by current property name
            // - for cyclic objects the stored path is taken
            var newPath1 =
                index1 !== -1
                    ? paths1[index1]
                    : path1 + "[" + JSON.stringify(key) + "]";
            var newPath2 =
                index2 !== -1
                    ? paths2[index2]
                    : path2 + "[" + JSON.stringify(key) + "]";
            var combinedPath = newPath1 + newPath2;

            // stop recursion if current objects are already compared
            if (compared[combinedPath]) {
                return true;
            }

            // remember the current objects and their paths
            if (index1 === -1 && isObject1) {
                objects1.push(value1);
                paths1.push(newPath1);
            }
            if (index2 === -1 && isObject2) {
                objects2.push(value2);
                paths2.push(newPath2);
            }

            // remember that the current objects are already compared
            if (isObject1 && isObject2) {
                compared[combinedPath] = true;
            }

            // End of cyclic logic

            // neither value1 nor value2 is a cycle
            // continue with next level
            return deepEqual(value1, value2, newPath1, newPath2);
        });
    })(first, second, "$1", "$2");
}

deepEqualCyclic.use = function(match) {
    return function(a, b) {
        return deepEqualCyclic(a, b, match);
    };
};

module.exports = deepEqualCyclic;

},{"./get-class":27,"./get-class-name":26,"./identical":28,"./is-arguments":29,"./is-date":30,"./is-element":31,"./is-nan":32,"./is-object":34,"./is-set":35,"./is-subset":36}],26:[function(require,module,exports){
"use strict";

var re = /function (\w+)\s*\(/;

function getClassName(value) {
    if (value.constructor && "name" in value.constructor) {
        return value.constructor.name;
    }

    if (typeof value.constructor === "function") {
        var match = value.constructor.toString().match(re);
        if (match.length > 1) {
            return match[1];
        }
    }

    return null;
}

module.exports = getClassName;

},{}],27:[function(require,module,exports){
"use strict";

var o = Object.prototype;

function getClass(value) {
    // Returns the internal [[Class]] by calling Object.prototype.toString
    // with the provided value as this. Return value is a string, naming the
    // internal class, e.g. "Array"
    return o.toString.call(value).split(/[ \]]/)[1];
}

module.exports = getClass;

},{}],28:[function(require,module,exports){
"use strict";

var isNaN = require("./is-nan");
var isNegZero = require("./is-neg-zero");

/**
 * @name samsam.equal
 * @param Object obj1
 * @param Object obj2
 *
 * Returns ``true`` if two objects are strictly equal. Compared to
 * ``===`` there are two exceptions:
 *
 *   - NaN is considered equal to NaN
 *   - -0 and +0 are not considered equal
 */
function identical(obj1, obj2) {
    if (obj1 === obj2 || (isNaN(obj1) && isNaN(obj2))) {
        return obj1 !== 0 || isNegZero(obj1) === isNegZero(obj2);
    }

    return false;
}

module.exports = identical;

},{"./is-nan":32,"./is-neg-zero":33}],29:[function(require,module,exports){
"use strict";

var getClass = require("./get-class");

/**
 * @name samsam.isArguments
 * @param Object object
 *
 * Returns ``true`` if ``object`` is an ``arguments`` object,
 * ``false`` otherwise.
 */
function isArguments(object) {
    if (getClass(object) === "Arguments") {
        return true;
    }
    if (
        typeof object !== "object" ||
        typeof object.length !== "number" ||
        getClass(object) === "Array"
    ) {
        return false;
    }
    if (typeof object.callee === "function") {
        return true;
    }
    try {
        object[object.length] = 6;
        delete object[object.length];
    } catch (e) {
        return true;
    }
    return false;
}

module.exports = isArguments;

},{"./get-class":27}],30:[function(require,module,exports){
"use strict";

function isDate(value) {
    return value instanceof Date;
}

module.exports = isDate;

},{}],31:[function(require,module,exports){
"use strict";

var div = typeof document !== "undefined" && document.createElement("div");

/**
 * @name samsam.isElement
 * @param Object object
 *
 * Returns ``true`` if ``object`` is a DOM element node. Unlike
 * Underscore.js/lodash, this function will return ``false`` if ``object``
 * is an *element-like* object, i.e. a regular object with a ``nodeType``
 * property that holds the value ``1``.
 */
function isElement(object) {
    if (!object || object.nodeType !== 1 || !div) {
        return false;
    }
    try {
        object.appendChild(div);
        object.removeChild(div);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = isElement;

},{}],32:[function(require,module,exports){
"use strict";

function isNaN(value) {
    // Unlike global isNaN, this avoids type coercion
    // typeof check avoids IE host object issues, hat tip to
    // lodash
    var val = value; // JsLint thinks value !== value is "weird"
    return typeof value === "number" && value !== val;
}

module.exports = isNaN;

},{}],33:[function(require,module,exports){
"use strict";

/**
 * @name samsam.isNegZero
 * @param Object value
 *
 * Returns ``true`` if ``value`` is ``-0``.
 */
function isNegZero(value) {
    return value === 0 && 1 / value === -Infinity;
}

module.exports = isNegZero;

},{}],34:[function(require,module,exports){
"use strict";

// Returns true when the value is a regular Object and not a specialized Object
//
// This helps speeding up deepEqual cyclic checks
// The premise is that only Objects are stored in the visited array.
// So if this function returns false, we don't have to do the
// expensive operation of searching for the value in the the array of already
// visited objects
function isObject(value) {
    return (
        typeof value === "object" &&
        value !== null &&
        // none of these are collection objects, so we can return false
        !(value instanceof Boolean) &&
        !(value instanceof Date) &&
        !(value instanceof Error) &&
        !(value instanceof Number) &&
        !(value instanceof RegExp) &&
        !(value instanceof String)
    );
}

module.exports = isObject;

},{}],35:[function(require,module,exports){
"use strict";

function isSet(val) {
    return (typeof Set !== "undefined" && val instanceof Set) || false;
}

module.exports = isSet;

},{}],36:[function(require,module,exports){
"use strict";

function isSubset(s1, s2, compare) {
    var allContained = true;
    s1.forEach(function(v1) {
        var includes = false;
        s2.forEach(function(v2) {
            if (compare(v2, v1)) {
                includes = true;
            }
        });
        allContained = allContained && includes;
    });

    return allContained;
}

module.exports = isSubset;

},{}],37:[function(require,module,exports){
"use strict";

var slice = require("@sinonjs/commons").prototypes.string.slice;
var typeOf = require("@sinonjs/commons").typeOf;

module.exports = function iterableToString(obj) {
    var representation = "";

    function stringify(item) {
        return typeof item === "string" ? "'" + item + "'" : String(item);
    }

    function mapToString(map) {
        /* eslint-disable-next-line local-rules/no-prototype-methods */
        map.forEach(function(value, key) {
            representation +=
                "[" + stringify(key) + "," + stringify(value) + "],";
        });

        representation = slice(representation, 0, -1);
        return representation;
    }

    function genericIterableToString(iterable) {
        /* eslint-disable-next-line local-rules/no-prototype-methods */
        iterable.forEach(function(value) {
            representation += stringify(value) + ",";
        });

        representation = slice(representation, 0, -1);
        return representation;
    }

    if (typeOf(obj) === "map") {
        return mapToString(obj);
    }

    return genericIterableToString(obj);
};

},{"@sinonjs/commons":15}],38:[function(require,module,exports){
"use strict";

var deepEqual = require("./deep-equal").use(match); // eslint-disable-line no-use-before-define
var getClass = require("./get-class");
var isDate = require("./is-date");
var isSet = require("./is-set");
var isSubset = require("./is-subset");
var createMatcher = require("./matcher");

function arrayContains(array, subset, compare) {
    if (subset.length === 0) {
        return true;
    }
    var i, l, j, k;
    for (i = 0, l = array.length; i < l; ++i) {
        if (compare(array[i], subset[0])) {
            for (j = 0, k = subset.length; j < k; ++j) {
                if (i + j >= l) {
                    return false;
                }
                if (!compare(array[i + j], subset[j])) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}

/**
 * @name samsam.match
 * @param Object object
 * @param Object matcher
 *
 * Compare arbitrary value ``object`` with matcher.
 */
function match(object, matcher) {
    if (matcher && typeof matcher.test === "function") {
        return matcher.test(object);
    }

    if (typeof matcher === "function") {
        return matcher(object) === true;
    }

    if (typeof matcher === "string") {
        matcher = matcher.toLowerCase();
        var notNull = typeof object === "string" || !!object;
        return (
            notNull &&
            String(object)
                .toLowerCase()
                .indexOf(matcher) >= 0
        );
    }

    if (typeof matcher === "number") {
        return matcher === object;
    }

    if (typeof matcher === "boolean") {
        return matcher === object;
    }

    if (typeof matcher === "undefined") {
        return typeof object === "undefined";
    }

    if (matcher === null) {
        return object === null;
    }

    if (object === null) {
        return false;
    }

    if (isSet(object)) {
        return isSubset(matcher, object, match);
    }

    if (getClass(object) === "Array" && getClass(matcher) === "Array") {
        return arrayContains(object, matcher, match);
    }

    if (isDate(matcher)) {
        return isDate(object) && object.getTime() === matcher.getTime();
    }

    if (matcher && typeof matcher === "object") {
        if (matcher === object) {
            return true;
        }
        if (typeof object !== "object") {
            return false;
        }
        var prop;
        // eslint-disable-next-line guard-for-in
        for (prop in matcher) {
            var value = object[prop];
            if (
                typeof value === "undefined" &&
                typeof object.getAttribute === "function"
            ) {
                value = object.getAttribute(prop);
            }
            if (
                matcher[prop] === null ||
                typeof matcher[prop] === "undefined"
            ) {
                if (value !== matcher[prop]) {
                    return false;
                }
            } else if (
                typeof value === "undefined" ||
                !deepEqual(value, matcher[prop])
            ) {
                return false;
            }
        }
        return true;
    }

    throw new Error(
        "Matcher was not a string, a number, a " +
            "function, a boolean or an object"
    );
}

Object.keys(createMatcher).forEach(function(key) {
    match[key] = createMatcher[key];
});

module.exports = match;

},{"./deep-equal":25,"./get-class":27,"./is-date":30,"./is-set":35,"./is-subset":36,"./matcher":39}],39:[function(require,module,exports){
"use strict";

var arrayProto = require("@sinonjs/commons").prototypes.array;
var deepEqual = require("./deep-equal").use(match); // eslint-disable-line no-use-before-define
var every = require("@sinonjs/commons").every;
var functionName = require("@sinonjs/commons").functionName;
var get = require("lodash.get");
var iterableToString = require("./iterable-to-string");
var objectProto = require("@sinonjs/commons").prototypes.object;
var stringProto = require("@sinonjs/commons").prototypes.string;
var typeOf = require("@sinonjs/commons").typeOf;
var valueToString = require("@sinonjs/commons").valueToString;

var arrayIndexOf = arrayProto.indexOf;
var arrayEvery = arrayProto.every;
var join = arrayProto.join;
var map = arrayProto.map;
var some = arrayProto.some;

var hasOwnProperty = objectProto.hasOwnProperty;
var isPrototypeOf = objectProto.isPrototypeOf;

var stringIndexOf = stringProto.indexOf;

function assertType(value, type, name) {
    var actual = typeOf(value);
    if (actual !== type) {
        throw new TypeError(
            "Expected type of " +
                name +
                " to be " +
                type +
                ", but was " +
                actual
        );
    }
}

function assertMethodExists(value, method, name, methodPath) {
    if (value[method] == null) {
        throw new TypeError(
            "Expected " + name + " to have method " + methodPath
        );
    }
}

var matcher = {
    toString: function() {
        return this.message;
    }
};

function isMatcher(object) {
    return isPrototypeOf(matcher, object);
}

function matchObject(actual, expectation) {
    if (actual === null || actual === undefined) {
        return false;
    }

    return arrayEvery(Object.keys(expectation), function(key) {
        var exp = expectation[key];
        var act = actual[key];

        if (isMatcher(exp)) {
            if (!exp.test(act)) {
                return false;
            }
        } else if (typeOf(exp) === "object") {
            if (!matchObject(act, exp)) {
                return false;
            }
        } else if (!deepEqual(act, exp)) {
            return false;
        }

        return true;
    });
}

var TYPE_MAP = {
    function: function(m, expectation, message) {
        m.test = expectation;
        m.message = message || "match(" + functionName(expectation) + ")";
    },
    number: function(m, expectation) {
        m.test = function(actual) {
            // we need type coercion here
            return expectation == actual; // eslint-disable-line eqeqeq
        };
    },
    object: function(m, expectation) {
        var array = [];

        if (typeof expectation.test === "function") {
            m.test = function(actual) {
                return expectation.test(actual) === true;
            };
            m.message = "match(" + functionName(expectation.test) + ")";
            return m;
        }

        array = map(Object.keys(expectation), function(key) {
            return key + ": " + valueToString(expectation[key]);
        });

        m.test = function(actual) {
            return matchObject(actual, expectation);
        };
        m.message = "match(" + join(array, ", ") + ")";

        return m;
    },
    regexp: function(m, expectation) {
        m.test = function(actual) {
            return typeof actual === "string" && expectation.test(actual);
        };
    },
    string: function(m, expectation) {
        m.test = function(actual) {
            return (
                typeof actual === "string" &&
                stringIndexOf(actual, expectation) !== -1
            );
        };
        m.message = 'match("' + expectation + '")';
    }
};

function match(expectation, message) {
    var m = Object.create(matcher);
    var type = typeOf(expectation);

    if (type in TYPE_MAP) {
        TYPE_MAP[type](m, expectation, message);
    } else {
        m.test = function(actual) {
            return deepEqual(actual, expectation);
        };
    }

    if (!m.message) {
        m.message = "match(" + valueToString(expectation) + ")";
    }

    return m;
}

matcher.or = function(m2) {
    if (!arguments.length) {
        throw new TypeError("Matcher expected");
    } else if (!isMatcher(m2)) {
        m2 = match(m2);
    }
    var m1 = this;
    var or = Object.create(matcher);
    or.test = function(actual) {
        return m1.test(actual) || m2.test(actual);
    };
    or.message = m1.message + ".or(" + m2.message + ")";
    return or;
};

matcher.and = function(m2) {
    if (!arguments.length) {
        throw new TypeError("Matcher expected");
    } else if (!isMatcher(m2)) {
        m2 = match(m2);
    }
    var m1 = this;
    var and = Object.create(matcher);
    and.test = function(actual) {
        return m1.test(actual) && m2.test(actual);
    };
    and.message = m1.message + ".and(" + m2.message + ")";
    return and;
};

match.isMatcher = isMatcher;

match.any = match(function() {
    return true;
}, "any");

match.defined = match(function(actual) {
    return actual !== null && actual !== undefined;
}, "defined");

match.truthy = match(function(actual) {
    return !!actual;
}, "truthy");

match.falsy = match(function(actual) {
    return !actual;
}, "falsy");

match.same = function(expectation) {
    return match(function(actual) {
        return expectation === actual;
    }, "same(" + valueToString(expectation) + ")");
};

match.in = function(arrayOfExpectations) {
    if (!Array.isArray(arrayOfExpectations)) {
        throw new TypeError("array expected");
    }

    return match(function(actual) {
        return some(arrayOfExpectations, function(expectation) {
            return expectation === actual;
        });
    }, "in(" + valueToString(arrayOfExpectations) + ")");
};

match.typeOf = function(type) {
    assertType(type, "string", "type");
    return match(function(actual) {
        return typeOf(actual) === type;
    }, 'typeOf("' + type + '")');
};

match.instanceOf = function(type) {
    if (
        typeof Symbol === "undefined" ||
        typeof Symbol.hasInstance === "undefined"
    ) {
        assertType(type, "function", "type");
    } else {
        assertMethodExists(
            type,
            Symbol.hasInstance,
            "type",
            "[Symbol.hasInstance]"
        );
    }
    return match(function(actual) {
        return actual instanceof type;
    }, "instanceOf(" +
        (functionName(type) || Object.prototype.toString.call(type)) +
        ")");
};

function createPropertyMatcher(propertyTest, messagePrefix) {
    return function(property, value) {
        assertType(property, "string", "property");
        var onlyProperty = arguments.length === 1;
        var message = messagePrefix + '("' + property + '"';
        if (!onlyProperty) {
            message += ", " + valueToString(value);
        }
        message += ")";
        return match(function(actual) {
            if (
                actual === undefined ||
                actual === null ||
                !propertyTest(actual, property)
            ) {
                return false;
            }
            return onlyProperty || deepEqual(actual[property], value);
        }, message);
    };
}

match.has = createPropertyMatcher(function(actual, property) {
    if (typeof actual === "object") {
        return property in actual;
    }
    return actual[property] !== undefined;
}, "has");

match.hasOwn = createPropertyMatcher(function(actual, property) {
    return hasOwnProperty(actual, property);
}, "hasOwn");

match.hasNested = function(property, value) {
    assertType(property, "string", "property");
    var onlyProperty = arguments.length === 1;
    var message = 'hasNested("' + property + '"';
    if (!onlyProperty) {
        message += ", " + valueToString(value);
    }
    message += ")";
    return match(function(actual) {
        if (
            actual === undefined ||
            actual === null ||
            get(actual, property) === undefined
        ) {
            return false;
        }
        return onlyProperty || deepEqual(get(actual, property), value);
    }, message);
};

match.every = function(predicate) {
    if (!isMatcher(predicate)) {
        throw new TypeError("Matcher expected");
    }

    return match(function(actual) {
        if (typeOf(actual) === "object") {
            return every(Object.keys(actual), function(key) {
                return predicate.test(actual[key]);
            });
        }

        return (
            !!actual &&
            typeOf(actual.forEach) === "function" &&
            every(actual, function(element) {
                return predicate.test(element);
            })
        );
    }, "every(" + predicate.message + ")");
};

match.some = function(predicate) {
    if (!isMatcher(predicate)) {
        throw new TypeError("Matcher expected");
    }

    return match(function(actual) {
        if (typeOf(actual) === "object") {
            return !every(Object.keys(actual), function(key) {
                return !predicate.test(actual[key]);
            });
        }

        return (
            !!actual &&
            typeOf(actual.forEach) === "function" &&
            !every(actual, function(element) {
                return !predicate.test(element);
            })
        );
    }, "some(" + predicate.message + ")");
};

match.array = match.typeOf("array");

match.array.deepEquals = function(expectation) {
    return match(function(actual) {
        // Comparing lengths is the fastest way to spot a difference before iterating through every item
        var sameLength = actual.length === expectation.length;
        return (
            typeOf(actual) === "array" &&
            sameLength &&
            every(actual, function(element, index) {
                return expectation[index] === element;
            })
        );
    }, "deepEquals([" + iterableToString(expectation) + "])");
};

match.array.startsWith = function(expectation) {
    return match(function(actual) {
        return (
            typeOf(actual) === "array" &&
            every(expectation, function(expectedElement, index) {
                return actual[index] === expectedElement;
            })
        );
    }, "startsWith([" + iterableToString(expectation) + "])");
};

match.array.endsWith = function(expectation) {
    return match(function(actual) {
        // This indicates the index in which we should start matching
        var offset = actual.length - expectation.length;

        return (
            typeOf(actual) === "array" &&
            every(expectation, function(expectedElement, index) {
                return actual[offset + index] === expectedElement;
            })
        );
    }, "endsWith([" + iterableToString(expectation) + "])");
};

match.array.contains = function(expectation) {
    return match(function(actual) {
        return (
            typeOf(actual) === "array" &&
            every(expectation, function(expectedElement) {
                return arrayIndexOf(actual, expectedElement) !== -1;
            })
        );
    }, "contains([" + iterableToString(expectation) + "])");
};

match.map = match.typeOf("map");

match.map.deepEquals = function mapDeepEquals(expectation) {
    return match(function(actual) {
        // Comparing lengths is the fastest way to spot a difference before iterating through every item
        var sameLength = actual.size === expectation.size;
        return (
            typeOf(actual) === "map" &&
            sameLength &&
            every(actual, function(element, key) {
                return expectation.has(key) && expectation.get(key) === element;
            })
        );
    }, "deepEquals(Map[" + iterableToString(expectation) + "])");
};

match.map.contains = function mapContains(expectation) {
    return match(function(actual) {
        return (
            typeOf(actual) === "map" &&
            every(expectation, function(element, key) {
                return actual.has(key) && actual.get(key) === element;
            })
        );
    }, "contains(Map[" + iterableToString(expectation) + "])");
};

match.set = match.typeOf("set");

match.set.deepEquals = function setDeepEquals(expectation) {
    return match(function(actual) {
        // Comparing lengths is the fastest way to spot a difference before iterating through every item
        var sameLength = actual.size === expectation.size;
        return (
            typeOf(actual) === "set" &&
            sameLength &&
            every(actual, function(element) {
                return expectation.has(element);
            })
        );
    }, "deepEquals(Set[" + iterableToString(expectation) + "])");
};

match.set.contains = function setContains(expectation) {
    return match(function(actual) {
        return (
            typeOf(actual) === "set" &&
            every(expectation, function(element) {
                return actual.has(element);
            })
        );
    }, "contains(Set[" + iterableToString(expectation) + "])");
};

match.bool = match.typeOf("boolean");
match.number = match.typeOf("number");
match.string = match.typeOf("string");
match.object = match.typeOf("object");
match.func = match.typeOf("function");
match.regexp = match.typeOf("regexp");
match.date = match.typeOf("date");
match.symbol = match.typeOf("symbol");

module.exports = match;

},{"./deep-equal":25,"./iterable-to-string":37,"@sinonjs/commons":15,"lodash.get":44}],40:[function(require,module,exports){
"use strict";

var identical = require("./identical");
var isArguments = require("./is-arguments");
var isElement = require("./is-element");
var isNegZero = require("./is-neg-zero");
var match = require("./match");
var deepEqualCyclic = require("./deep-equal").use(match);
var createMatcher = require("./matcher");

module.exports = {
    createMatcher: createMatcher,
    deepEqual: deepEqualCyclic,
    isArguments: isArguments,
    isElement: isElement,
    isNegZero: isNegZero,
    identical: identical,
    match: match
};

},{"./deep-equal":25,"./identical":28,"./is-arguments":29,"./is-element":31,"./is-neg-zero":33,"./match":38,"./matcher":39}],41:[function(require,module,exports){

},{}],42:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],43:[function(require,module,exports){
module.exports = extend;

/*
  var obj = {a: 3, b: 5};
  extend(obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 4, b: 5, c: 8}

  var obj = {a: 3, b: 5};
  extend({}, obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
  obj; // {a: 3, b: 5}

  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  extend(obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3, 4]}

  var arr = [1, 2, 3];
  var obj = {a: 3, b: 5};
  extend(true, obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
  arr.push(4);
  obj; // {a: 3, b: 5, c: [1, 2, 3]}

  extend({a: 4, b: 5}); // {a: 4, b: 5}
  extend({a: 4, b: 5}, 3); {a: 4, b: 5}
  extend({a: 4, b: 5}, true); {a: 4, b: 5}
  extend('hello', {a: 4, b: 5}); // throws
  extend(3, {a: 4, b: 5}); // throws
*/

function extend(/* [deep], obj1, obj2, [objn] */) {
  var args = [].slice.call(arguments);
  var deep = false;
  if (typeof args[0] == 'boolean') {
    deep = args.shift();
  }
  var result = args[0];
  if (!result || (typeof result != 'object' && typeof result != 'function')) {
    throw new Error('extendee must be an object');
  }
  var extenders = args.slice(1);
  var len = extenders.length;
  for (var i = 0; i < len; i++) {
    var extender = extenders[i];
    for (var key in extender) {
      if (extender.hasOwnProperty(key)) {
        var value = extender[key];
        if (deep && isCloneable(value)) {
          var base = Array.isArray(value) ? [] : {};
          result[key] = extend(true, result.hasOwnProperty(key) ? result[key] : base, value);
        } else {
          result[key] = value;
        }
      }
    }
  }
  return result;
}

function isCloneable(obj) {
  return Array.isArray(obj) || {}.toString.call(obj) == '[object Object]';
}

},{}],44:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{}],45:[function(require,module,exports){
"use strict";

var userAgent = global.navigator && global.navigator.userAgent;
var isRunningInIE = userAgent && userAgent.indexOf("MSIE ") > -1;
var maxTimeout = Math.pow(2, 31) - 1; //see https://heycam.github.io/webidl/#abstract-opdef-converttoint

// Make properties writable in IE, as per
// http://www.adequatelygood.com/Replacing-setTimeout-Globally.html
if (isRunningInIE) {
    global.setTimeout = global.setTimeout;
    global.clearTimeout = global.clearTimeout;
    global.setInterval = global.setInterval;
    global.clearInterval = global.clearInterval;
    global.Date = global.Date;
}

// setImmediate is not a standard function
// avoid adding the prop to the window object if not present
if (global.setImmediate !== undefined) {
    global.setImmediate = global.setImmediate;
    global.clearImmediate = global.clearImmediate;
}

// node expects setTimeout/setInterval to return a fn object w/ .ref()/.unref()
// browsers, a number.
// see https://github.com/cjohansen/Sinon.JS/pull/436

var NOOP = function () { return undefined; };
var timeoutResult = setTimeout(NOOP, 0);
var addTimerReturnsObject = typeof timeoutResult === "object";
var hrtimePresent = (global.process && typeof global.process.hrtime === "function");
var nextTickPresent = (global.process && typeof global.process.nextTick === "function");
var performancePresent = (global.performance && typeof global.performance.now === "function");
var requestAnimationFramePresent = (global.requestAnimationFrame && typeof global.requestAnimationFrame === "function");
var cancelAnimationFramePresent = (global.cancelAnimationFrame && typeof global.cancelAnimationFrame === "function");

clearTimeout(timeoutResult);

var NativeDate = Date;
var uniqueTimerId = 1;

/**
 * Parse strings like "01:10:00" (meaning 1 hour, 10 minutes, 0 seconds) into
 * number of milliseconds. This is used to support human-readable strings passed
 * to clock.tick()
 */
function parseTime(str) {
    if (!str) {
        return 0;
    }

    var strings = str.split(":");
    var l = strings.length;
    var i = l;
    var ms = 0;
    var parsed;

    if (l > 3 || !/^(\d\d:){0,2}\d\d?$/.test(str)) {
        throw new Error("tick only understands numbers, 'm:s' and 'h:m:s'. Each part must be two digits");
    }

    while (i--) {
        parsed = parseInt(strings[i], 10);

        if (parsed >= 60) {
            throw new Error("Invalid time " + str);
        }

        ms += parsed * Math.pow(60, (l - i - 1));
    }

    return ms * 1000;
}

/**
 * Floor function that also works for negative numbers
 */
function fixedFloor(n) {
    return (n >= 0 ? Math.floor(n) : Math.ceil(n));
}

/**
 * % operator that also works for negative numbers
 */
function fixedModulo(n, m) {
    return ((n % m) + m) % m;
}

/**
 * Used to grok the `now` parameter to createClock.
 * @param epoch {Date|number} the system time
 */
function getEpoch(epoch) {
    if (!epoch) { return 0; }
    if (typeof epoch.getTime === "function") { return epoch.getTime(); }
    if (typeof epoch === "number") { return epoch; }
    throw new TypeError("now should be milliseconds since UNIX epoch");
}

function inRange(from, to, timer) {
    return timer && timer.callAt >= from && timer.callAt <= to;
}

function mirrorDateProperties(target, source) {
    var prop;
    for (prop in source) {
        if (source.hasOwnProperty(prop)) {
            target[prop] = source[prop];
        }
    }

    // set special now implementation
    if (source.now) {
        target.now = function now() {
            return target.clock.now;
        };
    } else {
        delete target.now;
    }

    // set special toSource implementation
    if (source.toSource) {
        target.toSource = function toSource() {
            return source.toSource();
        };
    } else {
        delete target.toSource;
    }

    // set special toString implementation
    target.toString = function toString() {
        return source.toString();
    };

    target.prototype = source.prototype;
    target.parse = source.parse;
    target.UTC = source.UTC;
    target.prototype.toUTCString = source.prototype.toUTCString;

    return target;
}

function createDate() {
    function ClockDate(year, month, date, hour, minute, second, ms) {
        // Defensive and verbose to avoid potential harm in passing
        // explicit undefined when user does not pass argument
        switch (arguments.length) {
            case 0:
                return new NativeDate(ClockDate.clock.now);
            case 1:
                return new NativeDate(year);
            case 2:
                return new NativeDate(year, month);
            case 3:
                return new NativeDate(year, month, date);
            case 4:
                return new NativeDate(year, month, date, hour);
            case 5:
                return new NativeDate(year, month, date, hour, minute);
            case 6:
                return new NativeDate(year, month, date, hour, minute, second);
            default:
                return new NativeDate(year, month, date, hour, minute, second, ms);
        }
    }

    return mirrorDateProperties(ClockDate, NativeDate);
}


function enqueueJob(clock, job) {
    // enqueues a microtick-deferred task - ecma262/#sec-enqueuejob
    if (!clock.jobs) {
        clock.jobs = [];
    }
    clock.jobs.push(job);
}

function runJobs(clock) {
    // runs all microtick-deferred tasks - ecma262/#sec-runjobs
    if (!clock.jobs) {
        return;
    }
    for (var i = 0; i < clock.jobs.length; i++) {
        var job = clock.jobs[i];
        job.func.apply(null, job.args);
    }
    clock.jobs = [];
}

function addTimer(clock, timer) {
    if (timer.func === undefined) {
        throw new Error("Callback must be provided to timer calls");
    }

    timer.type = timer.immediate ? "Immediate" : "Timeout";

    if (timer.hasOwnProperty("delay")) {
        timer.delay = timer.delay > maxTimeout ? 1 : timer.delay;
        timer.delay = Math.max(0, timer.delay);
    }

    if (timer.hasOwnProperty("interval")) {
        timer.type = "Interval";
        timer.interval = timer.interval > maxTimeout ? 1 : timer.interval;
    }

    if (timer.hasOwnProperty("animation")) {
        timer.type = "AnimationFrame";
        timer.animation = true;
    }

    if (!clock.timers) {
        clock.timers = {};
    }

    timer.id = uniqueTimerId++;
    timer.createdAt = clock.now;
    timer.callAt = clock.now + (parseInt(timer.delay) || (clock.duringTick ? 1 : 0));

    clock.timers[timer.id] = timer;

    if (addTimerReturnsObject) {
        return {
            id: timer.id,
            ref: NOOP,
            unref: NOOP
        };
    }

    return timer.id;
}


/* eslint consistent-return: "off" */
function compareTimers(a, b) {
    // Sort first by absolute timing
    if (a.callAt < b.callAt) {
        return -1;
    }
    if (a.callAt > b.callAt) {
        return 1;
    }

    // Sort next by immediate, immediate timers take precedence
    if (a.immediate && !b.immediate) {
        return -1;
    }
    if (!a.immediate && b.immediate) {
        return 1;
    }

    // Sort next by creation time, earlier-created timers take precedence
    if (a.createdAt < b.createdAt) {
        return -1;
    }
    if (a.createdAt > b.createdAt) {
        return 1;
    }

    // Sort next by id, lower-id timers take precedence
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }

    // As timer ids are unique, no fallback `0` is necessary
}

function firstTimerInRange(clock, from, to) {
    var timers = clock.timers;
    var timer = null;
    var id, isInRange;

    for (id in timers) {
        if (timers.hasOwnProperty(id)) {
            isInRange = inRange(from, to, timers[id]);

            if (isInRange && (!timer || compareTimers(timer, timers[id]) === 1)) {
                timer = timers[id];
            }
        }
    }

    return timer;
}

function firstTimer(clock) {
    var timers = clock.timers;
    var timer = null;
    var id;

    for (id in timers) {
        if (timers.hasOwnProperty(id)) {
            if (!timer || compareTimers(timer, timers[id]) === 1) {
                timer = timers[id];
            }
        }
    }

    return timer;
}

function lastTimer(clock) {
    var timers = clock.timers;
    var timer = null;
    var id;

    for (id in timers) {
        if (timers.hasOwnProperty(id)) {
            if (!timer || compareTimers(timer, timers[id]) === -1) {
                timer = timers[id];
            }
        }
    }

    return timer;
}

function callTimer(clock, timer) {
    if (typeof timer.interval === "number") {
        clock.timers[timer.id].callAt += timer.interval;
    } else {
        delete clock.timers[timer.id];
    }

    if (typeof timer.func === "function") {
        timer.func.apply(null, timer.args);
    } else {
        /* eslint no-eval: "off" */
        eval(timer.func);
    }
}

function clearTimer(clock, timerId, ttype) {
    if (!timerId) {
        // null appears to be allowed in most browsers, and appears to be
        // relied upon by some libraries, like Bootstrap carousel
        return;
    }

    if (!clock.timers) {
        clock.timers = [];
    }

    // in Node, timerId is an object with .ref()/.unref(), and
    // its .id field is the actual timer id.
    if (typeof timerId === "object") {
        timerId = timerId.id;
    }

    if (clock.timers.hasOwnProperty(timerId)) {
        // check that the ID matches a timer of the correct type
        var timer = clock.timers[timerId];
        if (timer.type === ttype) {
            delete clock.timers[timerId];
        } else {
            var clear = ttype === "AnimationFrame" ? "cancelAnimationFrame" : "clear" + ttype;
            var schedule = timer.type === "AnimationFrame" ? "requestAnimationFrame" : "set" + timer.type;
            throw new Error("Cannot clear timer: timer created with " + schedule
                            + "() but cleared with " + clear + "()");
        }
    }
}

function uninstall(clock, target, config) {
    var method,
        i,
        l;
    var installedHrTime = "_hrtime";
    var installedNextTick = "_nextTick";

    for (i = 0, l = clock.methods.length; i < l; i++) {
        method = clock.methods[i];
        if (method === "hrtime" && target.process) {
            target.process.hrtime = clock[installedHrTime];
        } else if (method === "nextTick" && target.process) {
            target.process.nextTick = clock[installedNextTick];
        } else {
            if (target[method] && target[method].hadOwnProperty) {
                target[method] = clock["_" + method];
                if (method === "clearInterval" && config.shouldAdvanceTime === true) {
                    target[method](clock.attachedInterval);
                }
            } else {
                try {
                    delete target[method];
                } catch (ignore) { /* eslint empty-block: "off" */ }
            }
        }
    }

    // Prevent multiple executions which will completely remove these props
    clock.methods = [];

    // return pending timers, to enable checking what timers remained on uninstall
    if (!clock.timers) {
        return [];
    }
    return Object.keys(clock.timers).map(function mapper(key) {
        return clock.timers[key];
    });
}

function hijackMethod(target, method, clock) {
    var prop;
    clock[method].hadOwnProperty = Object.prototype.hasOwnProperty.call(target, method);
    clock["_" + method] = target[method];

    if (method === "Date") {
        var date = mirrorDateProperties(clock[method], target[method]);
        target[method] = date;
    } else {
        target[method] = function () {
            return clock[method].apply(clock, arguments);
        };

        for (prop in clock[method]) {
            if (clock[method].hasOwnProperty(prop)) {
                target[method][prop] = clock[method][prop];
            }
        }
    }

    target[method].clock = clock;
}

function doIntervalTick(clock, advanceTimeDelta) {
    clock.tick(advanceTimeDelta);
}

var timers = {
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setImmediate: global.setImmediate,
    clearImmediate: global.clearImmediate,
    setInterval: setInterval,
    clearInterval: clearInterval,
    Date: Date
};

if (hrtimePresent) {
    timers.hrtime = global.process.hrtime;
}

if (nextTickPresent) {
    timers.nextTick = global.process.nextTick;
}

if (performancePresent) {
    timers.performance = global.performance;
}

if (requestAnimationFramePresent) {
    timers.requestAnimationFrame = global.requestAnimationFrame;
}

if (cancelAnimationFramePresent) {
    timers.cancelAnimationFrame = global.cancelAnimationFrame;
}

var keys = Object.keys || function (obj) {
    var ks = [];
    var key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            ks.push(key);
        }
    }

    return ks;
};

exports.timers = timers;

/**
 * @param start {Date|number} the system time
 * @param loopLimit {number}  maximum number of timers that will be run when calling runAll()
 */
function createClock(start, loopLimit) {
    start = start || 0;
    loopLimit = loopLimit || 1000;

    var clock = {
        now: getEpoch(start),
        hrNow: 0,
        timeouts: {},
        Date: createDate(),
        loopLimit: loopLimit
    };

    clock.Date.clock = clock;

    function getTimeToNextFrame() {
        return 16 - ((clock.now - start) % 16);
    }

    clock.setTimeout = function setTimeout(func, timeout) {
        return addTimer(clock, {
            func: func,
            args: Array.prototype.slice.call(arguments, 2),
            delay: timeout
        });
    };

    clock.clearTimeout = function clearTimeout(timerId) {
        return clearTimer(clock, timerId, "Timeout");
    };
    clock.nextTick = function nextTick(func) {
        return enqueueJob(clock, {
            func: func,
            args: Array.prototype.slice.call(arguments, 1)
        });
    };
    clock.setInterval = function setInterval(func, timeout) {
        return addTimer(clock, {
            func: func,
            args: Array.prototype.slice.call(arguments, 2),
            delay: timeout,
            interval: timeout
        });
    };

    clock.clearInterval = function clearInterval(timerId) {
        return clearTimer(clock, timerId, "Interval");
    };

    clock.setImmediate = function setImmediate(func) {
        return addTimer(clock, {
            func: func,
            args: Array.prototype.slice.call(arguments, 1),
            immediate: true
        });
    };

    clock.clearImmediate = function clearImmediate(timerId) {
        return clearTimer(clock, timerId, "Immediate");
    };

    clock.requestAnimationFrame = function requestAnimationFrame(func) {
        var result = addTimer(clock, {
            func: func,
            delay: getTimeToNextFrame(),
            args: [clock.now + getTimeToNextFrame()],
            animation: true
        });

        return result.id || result;
    };

    clock.cancelAnimationFrame = function cancelAnimationFrame(timerId) {
        return clearTimer(clock, timerId, "AnimationFrame");
    };

    function updateHrTime(newNow) {
        clock.hrNow += (newNow - clock.now);
    }

    clock.tick = function tick(ms) {
        ms = typeof ms === "number" ? ms : parseTime(ms);
        var tickFrom = clock.now;
        var tickTo = clock.now + ms;
        var previous = clock.now;
        var timer, firstException, oldNow;

        clock.duringTick = true;

        // perform process.nextTick()s
        oldNow = clock.now;
        runJobs(clock);
        if (oldNow !== clock.now) {
            // compensate for any setSystemTime() call during process.nextTick() callback
            tickFrom += clock.now - oldNow;
            tickTo += clock.now - oldNow;
        }

        // perform each timer in the requested range
        timer = firstTimerInRange(clock, tickFrom, tickTo);
        while (timer && tickFrom <= tickTo) {
            if (clock.timers[timer.id]) {
                updateHrTime(timer.callAt);
                tickFrom = timer.callAt;
                clock.now = timer.callAt;
                oldNow = clock.now;
                try {
                    runJobs(clock);
                    callTimer(clock, timer);
                } catch (e) {
                    firstException = firstException || e;
                }

                // compensate for any setSystemTime() call during timer callback
                if (oldNow !== clock.now) {
                    tickFrom += clock.now - oldNow;
                    tickTo += clock.now - oldNow;
                    previous += clock.now - oldNow;
                }
            }

            timer = firstTimerInRange(clock, previous, tickTo);
            previous = tickFrom;
        }

        // perform process.nextTick()s again
        oldNow = clock.now;
        runJobs(clock);
        if (oldNow !== clock.now) {
            // compensate for any setSystemTime() call during process.nextTick() callback
            tickFrom += clock.now - oldNow;
            tickTo += clock.now - oldNow;
        }
        clock.duringTick = false;

        // corner case: during runJobs, new timers were scheduled which could be in the range [clock.now, tickTo]
        timer = firstTimerInRange(clock, tickFrom, tickTo);
        if (timer) {
            try {
                clock.tick(tickTo - clock.now); // do it all again - for the remainder of the requested range
            } catch (e) {
                firstException = firstException || e;
            }
        } else {
            // no timers remaining in the requested range: move the clock all the way to the end
            updateHrTime(tickTo);
            clock.now = tickTo;
        }
        if (firstException) {
            throw firstException;
        }
        return clock.now;
    };

    clock.next = function next() {
        runJobs(clock);
        var timer = firstTimer(clock);
        if (!timer) {
            return clock.now;
        }

        clock.duringTick = true;
        try {
            updateHrTime(timer.callAt);
            clock.now = timer.callAt;
            callTimer(clock, timer);
            runJobs(clock);
            return clock.now;
        } finally {
            clock.duringTick = false;
        }
    };

    clock.runAll = function runAll() {
        var numTimers, i;
        runJobs(clock);
        for (i = 0; i < clock.loopLimit; i++) {
            if (!clock.timers) {
                return clock.now;
            }

            numTimers = keys(clock.timers).length;
            if (numTimers === 0) {
                return clock.now;
            }

            clock.next();
        }

        throw new Error("Aborting after running " + clock.loopLimit + " timers, assuming an infinite loop!");
    };

    clock.runToFrame = function runToFrame() {
        return clock.tick(getTimeToNextFrame());
    };

    clock.runToLast = function runToLast() {
        var timer = lastTimer(clock);
        if (!timer) {
            runJobs(clock);
            return clock.now;
        }

        return clock.tick(timer.callAt);
    };

    clock.reset = function reset() {
        clock.timers = {};
    };

    clock.setSystemTime = function setSystemTime(systemTime) {
        // determine time difference
        var newNow = getEpoch(systemTime);
        var difference = newNow - clock.now;
        var id, timer;

        // update 'system clock'
        clock.now = newNow;

        // update timers and intervals to keep them stable
        for (id in clock.timers) {
            if (clock.timers.hasOwnProperty(id)) {
                timer = clock.timers[id];
                timer.createdAt += difference;
                timer.callAt += difference;
            }
        }
    };

    if (performancePresent) {
        clock.performance = Object.create(global.performance);
        clock.performance.now = function lolexNow() {
            return clock.hrNow;
        };
    }
    if (hrtimePresent) {
        clock.hrtime = function (prev) {
            if (Array.isArray(prev)) {
                var oldSecs = (prev[0] + prev[1] / 1e9);
                var newSecs = (clock.hrNow / 1000);
                var difference = (newSecs - oldSecs);
                var secs = fixedFloor(difference);
                var nanosecs = fixedModulo(difference * 1e9, 1e9);
                return [
                    secs,
                    nanosecs
                ];
            }
            return [
                fixedFloor(clock.hrNow / 1000),
                fixedModulo(clock.hrNow * 1e6, 1e9)
            ];
        };
    }

    return clock;
}
exports.createClock = createClock;

/**
 * @param config {Object} optional config
 * @param config.target {Object} the target to install timers in (default `window`)
 * @param config.now {number|Date}  a number (in milliseconds) or a Date object (default epoch)
 * @param config.toFake {string[]} names of the methods that should be faked.
 * @param config.loopLimit {number} the maximum number of timers that will be run when calling runAll()
 * @param config.shouldAdvanceTime {Boolean} tells lolex to increment mocked time automatically (default false)
 * @param config.advanceTimeDelta {Number} increment mocked time every <<advanceTimeDelta>> ms (default: 20ms)
 */
exports.install = function install(config) {
    if ( arguments.length > 1 || config instanceof Date || Array.isArray(config) || typeof config === "number") {
        throw new TypeError("lolex.install called with " + String(config) +
            " lolex 2.0+ requires an object parameter - see https://github.com/sinonjs/lolex");
    }
    config = typeof config !== "undefined" ? config : {};
    config.shouldAdvanceTime = config.shouldAdvanceTime || false;
    config.advanceTimeDelta = config.advanceTimeDelta || 20;

    var i, l;
    var target = config.target || global;
    var clock = createClock(config.now, config.loopLimit);

    clock.uninstall = function () {
        return uninstall(clock, target, config);
    };

    clock.methods = config.toFake || [];

    if (clock.methods.length === 0) {
        // do not fake nextTick by default - GitHub#126
        clock.methods = keys(timers).filter(function (key) {return key !== "nextTick";});
    }

    for (i = 0, l = clock.methods.length; i < l; i++) {
        if (clock.methods[i] === "hrtime") {
            if (target.process && typeof target.process.hrtime === "function") {
                hijackMethod(target.process, clock.methods[i], clock);
            }
        } else if (clock.methods[i] === "nextTick") {
            if (target.process && typeof target.process.nextTick === "function") {
                hijackMethod(target.process, clock.methods[i], clock);
            }
        } else {
            if (clock.methods[i] === "setInterval" && config.shouldAdvanceTime === true) {
                var intervalTick = doIntervalTick.bind(null, clock, config.advanceTimeDelta);
                var intervalId = target[clock.methods[i]](
                    intervalTick,
                    config.advanceTimeDelta);
                clock.attachedInterval = intervalId;
            }
            hijackMethod(target, clock.methods[i], clock);
        }
    }

    return clock;
};

},{}],46:[function(require,module,exports){
var isarray = require('isarray')

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = options && options.delimiter || '/'
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      keys.push(token)

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  var delimiter = escapeString(options.delimiter || '/')
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

},{"isarray":42}],47:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.typeDetect = factory());
}(this, (function () { 'use strict';

/* !
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var promiseExists = typeof Promise === 'function';

/* eslint-disable no-undef */
var globalObject = typeof self === 'object' ? self : global; // eslint-disable-line id-blacklist

var symbolExists = typeof Symbol !== 'undefined';
var mapExists = typeof Map !== 'undefined';
var setExists = typeof Set !== 'undefined';
var weakMapExists = typeof WeakMap !== 'undefined';
var weakSetExists = typeof WeakSet !== 'undefined';
var dataViewExists = typeof DataView !== 'undefined';
var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
var toStringLeftSliceLength = 8;
var toStringRightSliceLength = -1;
/**
 * ### typeOf (obj)
 *
 * Uses `Object.prototype.toString` to determine the type of an object,
 * normalising behaviour across engine versions & well optimised.
 *
 * @param {Mixed} object
 * @return {String} object type
 * @api public
 */
function typeDetect(obj) {
  /* ! Speed optimisation
   * Pre:
   *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
   *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
   *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
   *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
   *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
   * Post:
   *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
   *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
   *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
   *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
   *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
   */
  var typeofObj = typeof obj;
  if (typeofObj !== 'object') {
    return typeofObj;
  }

  /* ! Speed optimisation
   * Pre:
   *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
   * Post:
   *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
   */
  if (obj === null) {
    return 'null';
  }

  /* ! Spec Conformance
   * Test: `Object.prototype.toString.call(window)``
   *  - Node === "[object global]"
   *  - Chrome === "[object global]"
   *  - Firefox === "[object Window]"
   *  - PhantomJS === "[object Window]"
   *  - Safari === "[object Window]"
   *  - IE 11 === "[object Window]"
   *  - IE Edge === "[object Window]"
   * Test: `Object.prototype.toString.call(this)``
   *  - Chrome Worker === "[object global]"
   *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
   *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
   *  - IE 11 Worker === "[object WorkerGlobalScope]"
   *  - IE Edge Worker === "[object WorkerGlobalScope]"
   */
  if (obj === globalObject) {
    return 'global';
  }

  /* ! Speed optimisation
   * Pre:
   *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
   * Post:
   *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
   */
  if (
    Array.isArray(obj) &&
    (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))
  ) {
    return 'Array';
  }

  // Not caching existence of `window` and related properties due to potential
  // for `window` to be unset before tests in quasi-browser environments.
  if (typeof window === 'object' && window !== null) {
    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/browsers.html#location)
     * WhatWG HTML$7.7.3 - The `Location` interface
     * Test: `Object.prototype.toString.call(window.location)``
     *  - IE <=11 === "[object Object]"
     *  - IE Edge <=13 === "[object Object]"
     */
    if (typeof window.location === 'object' && obj === window.location) {
      return 'Location';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/#document)
     * WhatWG HTML$3.1.1 - The `Document` object
     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
     *       which suggests that browsers should use HTMLTableCellElement for
     *       both TD and TH elements. WhatWG separates these.
     *       WhatWG HTML states:
     *         > For historical reasons, Window objects must also have a
     *         > writable, configurable, non-enumerable property named
     *         > HTMLDocument whose value is the Document interface object.
     * Test: `Object.prototype.toString.call(document)``
     *  - Chrome === "[object HTMLDocument]"
     *  - Firefox === "[object HTMLDocument]"
     *  - Safari === "[object HTMLDocument]"
     *  - IE <=10 === "[object Document]"
     *  - IE 11 === "[object HTMLDocument]"
     *  - IE Edge <=13 === "[object HTMLDocument]"
     */
    if (typeof window.document === 'object' && obj === window.document) {
      return 'Document';
    }

    if (typeof window.navigator === 'object') {
      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
       * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
       *  - IE <=10 === "[object MSMimeTypesCollection]"
       */
      if (typeof window.navigator.mimeTypes === 'object' &&
          obj === window.navigator.mimeTypes) {
        return 'MimeTypeArray';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
       * Test: `Object.prototype.toString.call(navigator.plugins)``
       *  - IE <=10 === "[object MSPluginsCollection]"
       */
      if (typeof window.navigator.plugins === 'object' &&
          obj === window.navigator.plugins) {
        return 'PluginArray';
      }
    }

    if ((typeof window.HTMLElement === 'function' ||
        typeof window.HTMLElement === 'object') &&
        obj instanceof window.HTMLElement) {
      /* ! Spec Conformance
      * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
      * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
      * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
      *  - IE <=10 === "[object HTMLBlockElement]"
      */
      if (obj.tagName === 'BLOCKQUOTE') {
        return 'HTMLQuoteElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltabledatacellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('td'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TD') {
        return 'HTMLTableDataCellElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltableheadercellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('th'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TH') {
        return 'HTMLTableHeaderCellElement';
      }
    }
  }

  /* ! Speed optimisation
  * Pre:
  *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
  *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
  *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
  *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
  *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
  *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
  *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
  *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
  *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
  * Post:
  *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
  *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
  *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
  *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
  *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
  *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
  *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
  *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
  *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
  */
  var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
  if (typeof stringTag === 'string') {
    return stringTag;
  }

  var objPrototype = Object.getPrototypeOf(obj);
  /* ! Speed optimisation
  * Pre:
  *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
  *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
  * Post:
  *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
  *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
  */
  if (objPrototype === RegExp.prototype) {
    return 'RegExp';
  }

  /* ! Speed optimisation
  * Pre:
  *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
  * Post:
  *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
  */
  if (objPrototype === Date.prototype) {
    return 'Date';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
   * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
   * Test: `Object.prototype.toString.call(Promise.resolve())``
   *  - Chrome <=47 === "[object Object]"
   *  - Edge <=20 === "[object Object]"
   *  - Firefox 29-Latest === "[object Promise]"
   *  - Safari 7.1-Latest === "[object Promise]"
   */
  if (promiseExists && objPrototype === Promise.prototype) {
    return 'Promise';
  }

  /* ! Speed optimisation
  * Pre:
  *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
  * Post:
  *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
  */
  if (setExists && objPrototype === Set.prototype) {
    return 'Set';
  }

  /* ! Speed optimisation
  * Pre:
  *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
  * Post:
  *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
  */
  if (mapExists && objPrototype === Map.prototype) {
    return 'Map';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
  * Post:
  *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
  */
  if (weakSetExists && objPrototype === WeakSet.prototype) {
    return 'WeakSet';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
  * Post:
  *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
  */
  if (weakMapExists && objPrototype === WeakMap.prototype) {
    return 'WeakMap';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
   * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
   * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
   *  - Edge <=13 === "[object Object]"
   */
  if (dataViewExists && objPrototype === DataView.prototype) {
    return 'DataView';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
   * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
   * Test: `Object.prototype.toString.call(new Map().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (mapExists && objPrototype === mapIteratorPrototype) {
    return 'Map Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
   * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
   * Test: `Object.prototype.toString.call(new Set().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (setExists && objPrototype === setIteratorPrototype) {
    return 'Set Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
   * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
   * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
    return 'Array Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
   * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
   * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
    return 'String Iterator';
  }

  /* ! Speed optimisation
  * Pre:
  *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
  * Post:
  *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
  */
  if (objPrototype === null) {
    return 'Object';
  }

  return Object
    .prototype
    .toString
    .call(obj)
    .slice(toStringLeftSliceLength, toStringRightSliceLength);
}

return typeDetect;

})));

},{}]},{},[12])(12)
});