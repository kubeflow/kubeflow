"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
// the session tracker for react native
var core_1 = require("@aws-amplify/core");
var react_native_1 = require("react-native");
var logger = new core_1.ConsoleLogger('SessionTracker');
var defaultOpts = {
    enable: false,
    provider: 'AWSPinpoint',
};
var initialEventSent = false;
var SessionTracker = /** @class */ (function () {
    function SessionTracker(tracker, opts) {
        this._config = Object.assign({}, defaultOpts, opts);
        this._tracker = tracker;
        this._hasEnabled = false;
        this._trackFunc = this._trackFunc.bind(this);
        this._currentState = react_native_1.AppState.currentState;
        this.configure(this._config);
    }
    SessionTracker.prototype._envCheck = function () {
        if (!react_native_1.AppState) {
            logger.debug('not in the supported react native environment');
            return false;
        }
        return true;
    };
    SessionTracker.prototype._trackFunc = function (nextAppState) {
        return __awaiter(this, void 0, void 0, function () {
            var customAttrs, _a, attributes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof this._config.attributes === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._config.attributes()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = this._config.attributes;
                        _b.label = 3;
                    case 3:
                        customAttrs = _a;
                        attributes = Object.assign({}, customAttrs);
                        if (this._currentState.match(/inactive|background/) &&
                            nextAppState === 'active') {
                            logger.debug('App has come to the foreground, recording start session');
                            this._tracker({
                                name: '_session.start',
                                attributes: attributes,
                                immediate: false,
                            }, this._config.provider).catch(function (e) {
                                logger.debug('record session start event failed.', e);
                            });
                        }
                        if (this._currentState.match(/active/) &&
                            nextAppState.match(/inactive|background/)) {
                            logger.debug('App has come to inactive/background, recording stop session');
                            this._tracker({
                                name: '_session.stop',
                                attributes: attributes,
                                immediate: false,
                            }, this._config.provider).catch(function (e) {
                                logger.debug('record session stop event failed.', e);
                            });
                        }
                        this._currentState = nextAppState;
                        return [2 /*return*/];
                }
            });
        });
    };
    // to keep configure a synchronized function
    SessionTracker.prototype._sendInitialEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var customAttrs, _a, attributes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (initialEventSent) {
                            logger.debug('the start session has been sent when the page is loaded');
                            return [2 /*return*/];
                        }
                        else {
                            initialEventSent = true;
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
                        customAttrs = _a;
                        attributes = Object.assign({}, customAttrs);
                        this._tracker({
                            name: '_session.start',
                            attributes: attributes,
                            immediate: false,
                        }, this._config.provider).catch(function (e) {
                            logger.debug('record session start event failed.', e);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionTracker.prototype.configure = function (opts) {
        if (!this._envCheck()) {
            return this._config;
        }
        Object.assign(this._config, opts);
        if (this._config.enable && !this._hasEnabled) {
            // send a start session as soon as it's enabled
            this._sendInitialEvent();
            // listen on events
            react_native_1.AppState.addEventListener('change', this._trackFunc, false);
            this._hasEnabled = true;
        }
        else if (!this._config.enable && this._hasEnabled) {
            react_native_1.AppState.removeEventListener('change', this._trackFunc, false);
            this._hasEnabled = false;
        }
        return this._config;
    };
    return SessionTracker;
}());
exports.SessionTracker = SessionTracker;
/**
 * @deprecated use named import
 */
exports.default = SessionTracker;
//# sourceMappingURL=SessionTracker-rn.js.map