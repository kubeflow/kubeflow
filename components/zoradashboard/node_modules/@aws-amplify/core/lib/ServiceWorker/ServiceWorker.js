"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
var Logger_1 = require("../Logger");
var JS_1 = require("../JS");
var Amplify_1 = require("../Amplify");
/**
 * Provides a means to registering a service worker in the browser
 * and communicating with it via postMessage events.
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/
 *
 * postMessage events are currently not supported in all browsers. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 *
 * At the minmum this class will register the service worker and listen
 * and attempt to dispatch messages on state change and record analytics
 * events based on the service worker lifecycle.
 */
var ServiceWorkerClass = /** @class */ (function () {
    function ServiceWorkerClass() {
        // The AWS Amplify logger
        this._logger = new Logger_1.ConsoleLogger('ServiceWorker');
    }
    Object.defineProperty(ServiceWorkerClass.prototype, "serviceWorker", {
        /**
         * Get the currently active service worker
         */
        get: function () {
            return this._serviceWorker;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Register the service-worker.js file in the browser
     * Make sure the service-worker.js is part of the build
     * for example with Angular, modify the angular-cli.json file
     * and add to "assets" array "service-worker.js"
     * @param {string} - (optional) Service worker file. Defaults to "/service-worker.js"
     * @param {string} - (optional) The service worker scope. Defaults to "/"
     *  - API Doc: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register
     * @returns {Promise}
     *	- resolve(ServiceWorkerRegistration)
     *	- reject(Error)
     **/
    ServiceWorkerClass.prototype.register = function (filePath, scope) {
        var _this = this;
        if (filePath === void 0) { filePath = '/service-worker.js'; }
        if (scope === void 0) { scope = '/'; }
        this._logger.debug("registering " + filePath);
        this._logger.debug("registering service worker with scope " + scope);
        return new Promise(function (resolve, reject) {
            if (navigator && 'serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register(filePath, {
                    scope: scope,
                })
                    .then(function (registration) {
                    if (registration.installing) {
                        _this._serviceWorker = registration.installing;
                    }
                    else if (registration.waiting) {
                        _this._serviceWorker = registration.waiting;
                    }
                    else if (registration.active) {
                        _this._serviceWorker = registration.active;
                    }
                    _this._registration = registration;
                    _this._setupListeners();
                    _this._logger.debug("Service Worker Registration Success: " + registration);
                    return resolve(registration);
                })
                    .catch(function (error) {
                    _this._logger.debug("Service Worker Registration Failed " + error);
                    return reject(error);
                });
            }
            else {
                return reject(new Error('Service Worker not available'));
            }
        });
    };
    /**
     * Enable web push notifications. If not subscribed, a new subscription will
     * be created and registered.
     * 	Test Push Server: https://web-push-codelab.glitch.me/
     * 	Push Server Libraries: https://github.com/web-push-libs/
     * 	API Doc: https://developers.google.com/web/fundamentals/codelabs/push-notifications/
     * @param publicKey
     * @returns {Promise}
     * 	- resolve(PushSubscription)
     *  - reject(Error)
     */
    ServiceWorkerClass.prototype.enablePush = function (publicKey) {
        var _this = this;
        if (!this._registration)
            throw new Error('Service Worker not registered');
        this._publicKey = publicKey;
        return new Promise(function (resolve, reject) {
            if (JS_1.browserOrNode().isBrowser) {
                _this._registration.pushManager.getSubscription().then(function (subscription) {
                    if (subscription) {
                        _this._subscription = subscription;
                        _this._logger.debug("User is subscribed to push: " + JSON.stringify(subscription));
                        resolve(subscription);
                    }
                    else {
                        _this._logger.debug("User is NOT subscribed to push");
                        return _this._registration.pushManager
                            .subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: _this._urlB64ToUint8Array(publicKey),
                        })
                            .then(function (subscription) {
                            _this._subscription = subscription;
                            _this._logger.debug("User subscribed: " + JSON.stringify(subscription));
                            resolve(subscription);
                        })
                            .catch(function (error) {
                            _this._logger.error(error);
                        });
                    }
                });
            }
            else {
                return reject(new Error('Service Worker not available'));
            }
        });
    };
    /**
     * Convert a base64 encoded string to a Uint8 array for the push server key
     * @param base64String
     */
    ServiceWorkerClass.prototype._urlB64ToUint8Array = function (base64String) {
        var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);
        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };
    /**
     * Send a message to the service worker. The service worker needs
     * to implement `self.addEventListener('message') to handle the
     * message. This ***currently*** does not work in Safari or IE.
     * @param {object | string} - An arbitrary JSON object or string message to send to the service worker
     *	- see: https://developer.mozilla.org/en-US/docs/Web/API/Transferable
     * @returns {Promise}
     **/
    ServiceWorkerClass.prototype.send = function (message) {
        if (this._serviceWorker) {
            this._serviceWorker.postMessage(typeof message === 'object' ? JSON.stringify(message) : message);
        }
    };
    /**
     * Listen for service worker state change and message events
     * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker/state
     **/
    ServiceWorkerClass.prototype._setupListeners = function () {
        var _this = this;
        this._serviceWorker.addEventListener('statechange', function (event) {
            var currentState = _this._serviceWorker.state;
            _this._logger.debug("ServiceWorker statechange: " + currentState);
            if (Amplify_1.Amplify.Analytics && typeof Amplify_1.Amplify.Analytics.record === 'function') {
                Amplify_1.Amplify.Analytics.record({
                    name: 'ServiceWorker',
                    attributes: {
                        state: currentState,
                    },
                });
            }
        });
        this._serviceWorker.addEventListener('message', function (event) {
            _this._logger.debug("ServiceWorker message event: " + event);
        });
    };
    return ServiceWorkerClass;
}());
exports.ServiceWorkerClass = ServiceWorkerClass;
/**
 * @deprecated use named import
 */
exports.default = ServiceWorkerClass;
//# sourceMappingURL=ServiceWorker.js.map