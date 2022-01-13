"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var isAppInForeground = function () {
    return react_native_1.AppState.currentState === 'active';
};
exports.isAppInForeground = isAppInForeground;
//# sourceMappingURL=AppUtils.native.js.map