/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { delegate } from '../vendor/dom-utils';
import { ConsoleLogger as Logger, JS } from '@aws-amplify/core';
var logger = new Logger('EventTracker');
var defaultOpts = {
    enable: false,
    events: ['click'],
    selectorPrefix: 'data-amplify-analytics-',
    provider: 'AWSPinpoint',
};
var EventTracker = /** @class */ (function () {
    function EventTracker(tracker, opts) {
        if (!JS.browserOrNode().isBrowser || !window.addEventListener) {
            logger.debug('not in the supported web environment');
            return;
        }
        this._config = Object.assign({}, defaultOpts, opts);
        this._tracker = tracker;
        this._delegates = {};
        this._trackFunc = this._trackFunc.bind(this);
        logger.debug('initialize pageview tracker with opts', this._config);
        this.configure(this._config);
    }
    EventTracker.prototype.configure = function (opts) {
        var _this = this;
        Object.assign(this._config, opts);
        if (!this._config.enable) {
            Object.keys(this._delegates).forEach(function (key) {
                if (typeof _this._delegates[key].destroy === 'function')
                    _this._delegates[key].destroy();
            });
            this._delegates = {};
        }
        else if (this._config.enable &&
            Object.keys(this._delegates).length === 0) {
            var selector_1 = '[' + this._config.selectorPrefix + 'on]';
            this._config.events.forEach(function (evt) {
                _this._delegates[evt] = delegate(document, evt, selector_1, _this._trackFunc, { composed: true, useCapture: true });
            });
        }
        return this._config;
    };
    EventTracker.prototype._trackFunc = function (event, element) {
        return __awaiter(this, void 0, void 0, function () {
            var customAttrs, events, eventName, attrs, defaultAttrs, _a, attributes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        customAttrs = {};
                        events = element
                            .getAttribute(this._config.selectorPrefix + 'on')
                            .split(/\s*,\s*/);
                        eventName = element.getAttribute(this._config.selectorPrefix + 'name');
                        attrs = element.getAttribute(this._config.selectorPrefix + 'attrs');
                        if (attrs) {
                            attrs.split(/\s*,\s*/).forEach(function (attr) {
                                var tmp = attr.trim().split(/\s*:\s*/);
                                customAttrs[tmp[0]] = tmp[1];
                            });
                        }
                        if (!(typeof this._config.attributes === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._config.attributes()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = this._config.attributes;
                        _b.label = 3;
                    case 3:
                        defaultAttrs = _a;
                        attributes = Object.assign({
                            type: event.type,
                            target: event.target.localName + " with id " + event.target.id,
                        }, defaultAttrs, customAttrs);
                        logger.debug('events needed to be recorded', events);
                        logger.debug('attributes needed to be attached', customAttrs);
                        if (events.indexOf(event.type) < 0) {
                            logger.debug("event " + event.type + " is not selected to be recorded");
                            return [2 /*return*/];
                        }
                        this._tracker({
                            name: eventName || 'event',
                            attributes: attributes,
                        }, this._config.provider).catch(function (e) {
                            logger.debug("Failed to record the " + event.type + " event', " + e);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return EventTracker;
}());
export { EventTracker };
/**
 * @deprecated use named import
 */
export default EventTracker;
//# sourceMappingURL=EventTracker.js.map