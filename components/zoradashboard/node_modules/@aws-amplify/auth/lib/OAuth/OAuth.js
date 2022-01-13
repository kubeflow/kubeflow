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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url"); // Used for OAuth parsing of Cognito Hosted UI
var urlOpener_1 = require("./urlOpener");
var oAuthStorage = __importStar(require("./oauthStorage"));
var Auth_1 = require("../types/Auth");
var core_1 = require("@aws-amplify/core");
var sha256_1 = __importDefault(require("crypto-js/sha256"));
var enc_base64_1 = __importDefault(require("crypto-js/enc-base64"));
var AMPLIFY_SYMBOL = (typeof Symbol !== 'undefined' &&
    typeof Symbol.for === 'function'
    ? Symbol.for('amplify_default')
    : '@@amplify_default');
var dispatchAuthEvent = function (event, data, message) {
    core_1.Hub.dispatch('auth', { event: event, data: data, message: message }, 'Auth', AMPLIFY_SYMBOL);
};
var logger = new core_1.ConsoleLogger('OAuth');
var OAuth = /** @class */ (function () {
    function OAuth(_a) {
        var config = _a.config, cognitoClientId = _a.cognitoClientId, _b = _a.scopes, scopes = _b === void 0 ? [] : _b;
        this._urlOpener = config.urlOpener || urlOpener_1.launchUri;
        this._config = config;
        this._cognitoClientId = cognitoClientId;
        if (!this.isValidScopes(scopes))
            throw Error('scopes must be a String Array');
        this._scopes = scopes;
    }
    OAuth.prototype.isValidScopes = function (scopes) {
        return (Array.isArray(scopes) && scopes.every(function (scope) { return typeof scope === 'string'; }));
    };
    OAuth.prototype.oauthSignIn = function (responseType, domain, redirectSignIn, clientId, provider, customState) {
        if (responseType === void 0) { responseType = 'code'; }
        if (provider === void 0) { provider = Auth_1.CognitoHostedUIIdentityProvider.Cognito; }
        var generatedState = this._generateState(32);
        /* encodeURIComponent is not URL safe, use urlSafeEncode instead. Cognito
        single-encodes/decodes url on first sign in and double-encodes/decodes url
        when user already signed in. Using encodeURIComponent, Base32, Base64 add
        characters % or = which on further encoding becomes unsafe. '=' create issue
        for parsing query params.
        Refer: https://github.com/aws-amplify/amplify-js/issues/5218 */
        var state = customState
            ? generatedState + "-" + core_1.urlSafeEncode(customState)
            : generatedState;
        oAuthStorage.setState(state);
        var pkce_key = this._generateRandom(128);
        oAuthStorage.setPKCE(pkce_key);
        var code_challenge = this._generateChallenge(pkce_key);
        var code_challenge_method = 'S256';
        var scopesString = this._scopes.join(' ');
        var queryString = Object.entries(__assign(__assign({ redirect_uri: redirectSignIn, response_type: responseType, client_id: clientId, identity_provider: provider, scope: scopesString, state: state }, (responseType === 'code' ? { code_challenge: code_challenge } : {})), (responseType === 'code' ? { code_challenge_method: code_challenge_method } : {})))
            .map(function (_a) {
            var _b = __read(_a, 2), k = _b[0], v = _b[1];
            return encodeURIComponent(k) + "=" + encodeURIComponent(v);
        })
            .join('&');
        var URL = "https://" + domain + "/oauth2/authorize?" + queryString;
        logger.debug("Redirecting to " + URL);
        this._urlOpener(URL, redirectSignIn);
    };
    OAuth.prototype._handleCodeFlow = function (currentUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var code, currentUrlPathname, redirectSignInPathname, oAuthTokenEndpoint, client_id, redirect_uri, code_verifier, oAuthTokenBody, body, _a, access_token, refresh_token, id_token, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        code = (url_1.parse(currentUrl).query || '')
                            .split('&')
                            .map(function (pairings) { return pairings.split('='); })
                            .reduce(function (accum, _a) {
                            var _b;
                            var _c = __read(_a, 2), k = _c[0], v = _c[1];
                            return (__assign(__assign({}, accum), (_b = {}, _b[k] = v, _b)));
                        }, { code: undefined }).code;
                        currentUrlPathname = url_1.parse(currentUrl).pathname || '/';
                        redirectSignInPathname = url_1.parse(this._config.redirectSignIn).pathname || '/';
                        if (!code || currentUrlPathname !== redirectSignInPathname) {
                            return [2 /*return*/];
                        }
                        oAuthTokenEndpoint = 'https://' + this._config.domain + '/oauth2/token';
                        dispatchAuthEvent('codeFlow', {}, "Retrieving tokens from " + oAuthTokenEndpoint);
                        client_id = Auth_1.isCognitoHostedOpts(this._config)
                            ? this._cognitoClientId
                            : this._config.clientID;
                        redirect_uri = Auth_1.isCognitoHostedOpts(this._config)
                            ? this._config.redirectSignIn
                            : this._config.redirectUri;
                        code_verifier = oAuthStorage.getPKCE();
                        oAuthTokenBody = __assign({ grant_type: 'authorization_code', code: code,
                            client_id: client_id,
                            redirect_uri: redirect_uri }, (code_verifier ? { code_verifier: code_verifier } : {}));
                        logger.debug("Calling token endpoint: " + oAuthTokenEndpoint + " with", oAuthTokenBody);
                        body = Object.entries(oAuthTokenBody)
                            .map(function (_a) {
                            var _b = __read(_a, 2), k = _b[0], v = _b[1];
                            return encodeURIComponent(k) + "=" + encodeURIComponent(v);
                        })
                            .join('&');
                        return [4 /*yield*/, fetch(oAuthTokenEndpoint, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: body,
                            })];
                    case 1: return [4 /*yield*/, (_b.sent()).json()];
                    case 2:
                        _a = _b.sent(), access_token = _a.access_token, refresh_token = _a.refresh_token, id_token = _a.id_token, error = _a.error;
                        if (error) {
                            throw new Error(error);
                        }
                        return [2 /*return*/, {
                                accessToken: access_token,
                                refreshToken: refresh_token,
                                idToken: id_token,
                            }];
                }
            });
        });
    };
    OAuth.prototype._handleImplicitFlow = function (currentUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id_token, access_token;
            return __generator(this, function (_b) {
                _a = (url_1.parse(currentUrl).hash || '#')
                    .substr(1) // Remove # from returned code
                    .split('&')
                    .map(function (pairings) { return pairings.split('='); })
                    .reduce(function (accum, _a) {
                    var _b;
                    var _c = __read(_a, 2), k = _c[0], v = _c[1];
                    return (__assign(__assign({}, accum), (_b = {}, _b[k] = v, _b)));
                }, {
                    id_token: undefined,
                    access_token: undefined,
                }), id_token = _a.id_token, access_token = _a.access_token;
                dispatchAuthEvent('implicitFlow', {}, "Got tokens from " + currentUrl);
                logger.debug("Retrieving implicit tokens from " + currentUrl + " with");
                return [2 /*return*/, {
                        accessToken: access_token,
                        idToken: id_token,
                        refreshToken: null,
                    }];
            });
        });
    };
    OAuth.prototype.handleAuthResponse = function (currentUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var urlParams, error, error_description, state, _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        urlParams = currentUrl
                            ? __assign(__assign({}, (url_1.parse(currentUrl).hash || '#')
                                .substr(1)
                                .split('&')
                                .map(function (entry) { return entry.split('='); })
                                .reduce(function (acc, _a) {
                                var _b = __read(_a, 2), k = _b[0], v = _b[1];
                                return ((acc[k] = v), acc);
                            }, {})), (url_1.parse(currentUrl).query || '')
                                .split('&')
                                .map(function (entry) { return entry.split('='); })
                                .reduce(function (acc, _a) {
                                var _b = __read(_a, 2), k = _b[0], v = _b[1];
                                return ((acc[k] = v), acc);
                            }, {}))
                            : {};
                        error = urlParams.error, error_description = urlParams.error_description;
                        if (error) {
                            throw new Error(error_description);
                        }
                        state = this._validateState(urlParams);
                        logger.debug("Starting " + this._config.responseType + " flow with " + currentUrl);
                        if (!(this._config.responseType === 'code')) return [3 /*break*/, 2];
                        _a = [{}];
                        return [4 /*yield*/, this._handleCodeFlow(currentUrl)];
                    case 1: return [2 /*return*/, __assign.apply(void 0, [__assign.apply(void 0, _a.concat([(_c.sent())])), { state: state }])];
                    case 2:
                        _b = [{}];
                        return [4 /*yield*/, this._handleImplicitFlow(currentUrl)];
                    case 3: return [2 /*return*/, __assign.apply(void 0, [__assign.apply(void 0, _b.concat([(_c.sent())])), { state: state }])];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _c.sent();
                        logger.error("Error handling auth response.", e_1);
                        throw e_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OAuth.prototype._validateState = function (urlParams) {
        if (!urlParams) {
            return;
        }
        var savedState = oAuthStorage.getState();
        var returnedState = urlParams.state;
        // This is because savedState only exists if the flow was initiated by Amplify
        if (savedState && savedState !== returnedState) {
            throw new Error('Invalid state in OAuth flow');
        }
        return returnedState;
    };
    OAuth.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oAuthLogoutEndpoint, client_id, signout_uri;
            return __generator(this, function (_a) {
                oAuthLogoutEndpoint = 'https://' + this._config.domain + '/logout?';
                client_id = Auth_1.isCognitoHostedOpts(this._config)
                    ? this._cognitoClientId
                    : this._config.oauth.clientID;
                signout_uri = Auth_1.isCognitoHostedOpts(this._config)
                    ? this._config.redirectSignOut
                    : this._config.returnTo;
                oAuthLogoutEndpoint += Object.entries({
                    client_id: client_id,
                    logout_uri: encodeURIComponent(signout_uri),
                })
                    .map(function (_a) {
                    var _b = __read(_a, 2), k = _b[0], v = _b[1];
                    return k + "=" + v;
                })
                    .join('&');
                dispatchAuthEvent('oAuthSignOut', { oAuth: 'signOut' }, "Signing out from " + oAuthLogoutEndpoint);
                logger.debug("Signing out from " + oAuthLogoutEndpoint);
                return [2 /*return*/, this._urlOpener(oAuthLogoutEndpoint)];
            });
        });
    };
    OAuth.prototype._generateState = function (length) {
        var result = '';
        var i = length;
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (; i > 0; --i)
            result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    };
    OAuth.prototype._generateChallenge = function (code) {
        return this._base64URL(sha256_1.default(code));
    };
    OAuth.prototype._base64URL = function (string) {
        return string
            .toString(enc_base64_1.default)
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    };
    OAuth.prototype._generateRandom = function (size) {
        var CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
        var buffer = new Uint8Array(size);
        if (typeof window !== 'undefined' && !!window.crypto) {
            window.crypto.getRandomValues(buffer);
        }
        else {
            for (var i = 0; i < size; i += 1) {
                buffer[i] = (Math.random() * CHARSET.length) | 0;
            }
        }
        return this._bufferToString(buffer);
    };
    OAuth.prototype._bufferToString = function (buffer) {
        var CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var state = [];
        for (var i = 0; i < buffer.byteLength; i += 1) {
            var index = buffer[i] % CHARSET.length;
            state.push(CHARSET[index]);
        }
        return state.join('');
    };
    return OAuth;
}());
exports.default = OAuth;
//# sourceMappingURL=OAuth.js.map