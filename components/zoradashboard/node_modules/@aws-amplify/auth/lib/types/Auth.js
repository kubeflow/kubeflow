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
Object.defineProperty(exports, "__esModule", { value: true });
var CognitoHostedUIIdentityProvider;
(function (CognitoHostedUIIdentityProvider) {
    CognitoHostedUIIdentityProvider["Cognito"] = "COGNITO";
    CognitoHostedUIIdentityProvider["Google"] = "Google";
    CognitoHostedUIIdentityProvider["Facebook"] = "Facebook";
    CognitoHostedUIIdentityProvider["Amazon"] = "LoginWithAmazon";
    CognitoHostedUIIdentityProvider["Apple"] = "SignInWithApple";
})(CognitoHostedUIIdentityProvider = exports.CognitoHostedUIIdentityProvider || (exports.CognitoHostedUIIdentityProvider = {}));
function isFederatedSignInOptions(obj) {
    var keys = ['provider'];
    return obj && !!keys.find(function (k) { return obj.hasOwnProperty(k); });
}
exports.isFederatedSignInOptions = isFederatedSignInOptions;
function isFederatedSignInOptionsCustom(obj) {
    var keys = ['customProvider'];
    return obj && !!keys.find(function (k) { return obj.hasOwnProperty(k); });
}
exports.isFederatedSignInOptionsCustom = isFederatedSignInOptionsCustom;
function hasCustomState(obj) {
    var keys = ['customState'];
    return obj && !!keys.find(function (k) { return obj.hasOwnProperty(k); });
}
exports.hasCustomState = hasCustomState;
function isCognitoHostedOpts(oauth) {
    return oauth.redirectSignIn !== undefined;
}
exports.isCognitoHostedOpts = isCognitoHostedOpts;
var AuthErrorTypes;
(function (AuthErrorTypes) {
    AuthErrorTypes["NoConfig"] = "noConfig";
    AuthErrorTypes["MissingAuthConfig"] = "missingAuthConfig";
    AuthErrorTypes["EmptyUsername"] = "emptyUsername";
    AuthErrorTypes["InvalidUsername"] = "invalidUsername";
    AuthErrorTypes["EmptyPassword"] = "emptyPassword";
    AuthErrorTypes["EmptyCode"] = "emptyCode";
    AuthErrorTypes["SignUpError"] = "signUpError";
    AuthErrorTypes["NoMFA"] = "noMFA";
    AuthErrorTypes["InvalidMFA"] = "invalidMFA";
    AuthErrorTypes["EmptyChallengeResponse"] = "emptyChallengeResponse";
    AuthErrorTypes["NoUserSession"] = "noUserSession";
    AuthErrorTypes["Default"] = "default";
    AuthErrorTypes["DeviceConfig"] = "deviceConfig";
    AuthErrorTypes["NetworkError"] = "networkError";
})(AuthErrorTypes = exports.AuthErrorTypes || (exports.AuthErrorTypes = {}));
function isUsernamePasswordOpts(obj) {
    return !!obj.username;
}
exports.isUsernamePasswordOpts = isUsernamePasswordOpts;
//# sourceMappingURL=Auth.js.map