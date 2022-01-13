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
var obj = {};
export var setState = function (state) {
    obj.oauth_state = state;
};
export var getState = function () {
    var oauth_state = obj.oauth_state;
    obj.oauth_state = undefined;
    return oauth_state;
};
export var setPKCE = function (private_key) {
    obj.ouath_pkce_key = private_key;
};
export var getPKCE = function () {
    var ouath_pkce_key = obj.ouath_pkce_key;
    obj.ouath_pkce_key = undefined;
    return ouath_pkce_key;
};
export var clearAll = function () {
    obj.ouath_pkce_key = undefined;
    obj.oauth_state = undefined;
};
//# sourceMappingURL=oauthStorage.native.js.map