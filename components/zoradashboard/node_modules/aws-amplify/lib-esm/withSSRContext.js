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
import API from '@aws-amplify/api';
import { Auth } from '@aws-amplify/auth';
import { AmplifyClass, Credentials, UniversalStorage } from '@aws-amplify/core';
import { DataStore } from '@aws-amplify/datastore';
// ! We have to use this exact reference, since it gets mutated with Amplify.Auth
import { Amplify } from './index';
var requiredModules = [
    // API cannot function without Auth
    Auth,
    // Auth cannot function without Credentials
    Credentials,
];
// These modules have been tested with SSR
var defaultModules = [API, Auth, DataStore];
export function withSSRContext(context) {
    if (context === void 0) { context = {}; }
    var _a = context.modules, modules = _a === void 0 ? defaultModules : _a, req = context.req;
    var previousConfig = Amplify.configure();
    var amplify = new AmplifyClass();
    var storage = new UniversalStorage({ req: req });
    requiredModules.forEach(function (m) {
        if (!modules.includes(m)) {
            // @ts-ignore This expression is not constructable.
            // Type 'Function' has no construct signatures.ts(2351)
            amplify.register(new m.constructor());
        }
    });
    // Associate new module instances with this amplify
    modules.forEach(function (m) {
        amplify.register(new m.constructor());
    });
    // Configure new Amplify instances with previous configuration
    amplify.configure(__assign(__assign({}, previousConfig), { storage: storage }));
    return amplify;
}
//# sourceMappingURL=withSSRContext.js.map