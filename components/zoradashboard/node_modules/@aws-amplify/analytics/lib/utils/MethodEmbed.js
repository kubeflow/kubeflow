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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lists = [];
var MethodEmbed = /** @class */ (function () {
    function MethodEmbed(context, methodName) {
        this.context = context;
        this.methodName = methodName;
        this._originalMethod = context[methodName].bind(context);
    }
    MethodEmbed.add = function (context, methodName, methodOverride) {
        getInstance(context, methodName).set(methodOverride);
    };
    MethodEmbed.remove = function (context, methodName) {
        getInstance(context, methodName).remove();
    };
    MethodEmbed.prototype.set = function (methodOverride) {
        var _this = this;
        this.context[this.methodName] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return methodOverride(_this._originalMethod.apply(_this, __spread(args)));
        };
    };
    MethodEmbed.prototype.remove = function () {
        this.context[this.methodName] = this._originalMethod;
    };
    return MethodEmbed;
}());
exports.MethodEmbed = MethodEmbed;
function getInstance(context, methodName) {
    var instance = lists.filter(function (h) { return h.context === context && h.methodName === methodName; })[0];
    if (!instance) {
        instance = new MethodEmbed(context, methodName);
        lists.push(instance);
    }
    return instance;
}
/**
 * @deprecated use named import
 */
exports.default = MethodEmbed;
//# sourceMappingURL=MethodEmbed.js.map