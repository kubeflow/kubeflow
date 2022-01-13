"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AsyncStorageAdapter_1 = __importDefault(require("../AsyncStorageAdapter"));
var getDefaultAdapter = function () {
    return AsyncStorageAdapter_1.default;
};
exports.default = getDefaultAdapter;
//# sourceMappingURL=index.native.js.map