"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __importDefault(require("@aws-amplify/api"));
var auth_1 = require("@aws-amplify/auth");
var core_1 = require("@aws-amplify/core");
var datastore_1 = require("@aws-amplify/datastore");
// ! We have to use this exact reference, since it gets mutated with Amplify.Auth
var index_1 = require("./index");
var requiredModules = [
    // API cannot function without Auth
    auth_1.Auth,
    // Auth cannot function without Credentials
    core_1.Credentials,
];
// These modules have been tested with SSR
var defaultModules = [api_1.default, auth_1.Auth, datastore_1.DataStore];
function withSSRContext(context) {
    if (context === void 0) { context = {}; }
    var _a = context.modules, modules = _a === void 0 ? defaultModules : _a, req = context.req;
    var previousConfig = index_1.Amplify.configure();
    var amplify = new core_1.AmplifyClass();
    var storage = new core_1.UniversalStorage({ req: req });
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
exports.withSSRContext = withSSRContext;
//# sourceMappingURL=withSSRContext.js.map