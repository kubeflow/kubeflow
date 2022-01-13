"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@aws-amplify/core");
var netinfo_1 = __importDefault(require("@react-native-community/netinfo"));
exports.ReachabilityMonitor = new core_1.Reachability().networkMonitor(netinfo_1.default);
//# sourceMappingURL=index.native.js.map