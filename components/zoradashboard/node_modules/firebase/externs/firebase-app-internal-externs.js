/**
 * @license Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Firebase namespace and Firebase App API - INTERNAL methods.
 * @externs
 */

/**
 * @param {!Object} component
 */
firebase.INTERNAL.registerComponent = function (component) {};

/** @param {!Object} props */
firebase.INTERNAL.extendNamespace = function (props) {};

firebase.INTERNAL.resetNamespace = function () {};

/** @typedef {function(*): void} */
firebase.NextFn;

/** @typedef {function(!Error): void} */
firebase.ErrorFn;

/**
 * @typedef {function((firebase.NextFn|firebase.Observer)=,
 *                    firebase.ErrorFn=,
 *                    firebase.CompleteFn=): firebase.Unsubscribe}
 */
firebase.Subscribe;

/**
 * @param {function (!firebase.Observer): void} executor
 * @param {(function (!firebase.Observer): void)=} onNoObservers
 * @return {!firebase.Subscribe}
 */
firebase.INTERNAL.createSubscribe = function (executor, onNoObservers) {};

/**
 * @param {*} target
 * @param {*} source
 */
firebase.INTERNAL.deepExtend = function (target, source) {};

/** @param {string} name */
firebase.INTERNAL.removeApp = function (name) {};

/**
 * @type {!Object<string,
 *                function(!firebase.app.App,
 *                         (function(!Object): void)=,
 *                         string=): firebase.Service>}
 */
firebase.INTERNAL.factories = {};

/**
 * @param {!firebase.app.App} app
 * @param {string} serviceName
 * @return {string|null}
 */
firebase.INTERNAL.useAsService = function (app, serviceName) {};

/**
 * @constructor
 * @param {string} service All lowercase service code (e.g., 'auth')
 * @param {string} serviceName Display service name (e.g., 'Auth')
 * @param {!Object<string, string>} errors
 */
firebase.INTERNAL.ErrorFactory = function (service, serviceName, errors) {};

/**
 * @param {string} code
 * @param {Object=} data
 * @return {!firebase.FirebaseError}
 */
firebase.INTERNAL.ErrorFactory.prototype.create = function (code, data) {};

/** @interface */
firebase.Service = function () {};

/** @type {!firebase.app.App} */
firebase.Service.prototype.app;

/** @type {!Object} */
firebase.Service.prototype.INTERNAL;

/** @return {firebase.Promise<void>} */
firebase.Service.prototype.INTERNAL.delete = function () {};

/**
 * @typedef {function(!firebase.app.App,
 *                    !function(!Object): void,
 *                    string=): !firebase.Service}
 */
firebase.ServiceFactory;

/** @interface */
firebase.ServiceNamespace = function () {};

/**
 * Given an (optional) app, return the instance of the service
 * associated with that app.
 *
 * @param {firebase.app.App=} app
 * @return {!firebase.Service}
 */
firebase.ServiceNamespace.prototype.app = function (app) {};

/**
 * Firebase App.INTERNAL methods - default implementations in firebase-app,
 * replaced by Auth ...
 */

/**
 * Listener for an access token.
 *
 * Should pass null when the user current user is no longer value (signed
 * out or credentials become invalid).
 *
 * Firebear does not currently auto-refresh tokens, BTW - but this interface
 * would support that in the future.
 *
 * @typedef {function(?string): void}
 */
firebase.AuthTokenListener;

/**
 * Returned from app.INTERNAL.getToken().
 *
 * @typedef {{
 *   accessToken: (string)
 * }}
 */
firebase.AuthTokenData;

/** @type {!Object} */
firebase.app.App.prototype.INTERNAL;

/**
 * app.INTERNAL.getUid()
 *
 * @return {?string}
 */
firebase.app.App.prototype.INTERNAL.getUid = function () {};

/**
 * app.INTERNAL.getToken()
 *
 * @param {boolean=} forceRefresh Whether to force sts token refresh.
 * @return {!Promise<?firebase.AuthTokenData>}
 */
firebase.app.App.prototype.INTERNAL.getToken = function (forceRefresh) {};

/**
 * Adds an auth state listener.
 *
 * @param {!firebase.AuthTokenListener} listener The auth state listener.
 */
firebase.app.App.prototype.INTERNAL.addAuthTokenListener = function (
  listener
) {};

/**
 * Removes an auth state listener.
 *
 * @param {!firebase.AuthTokenListener} listener The auth state listener.
 */
firebase.app.App.prototype.INTERNAL.removeAuthTokenListener = function (
  listener
) {};
