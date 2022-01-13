"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
// See: https://react-native-async-storage.github.io/async-storage/
function createInMemoryStore() {
    return async_storage_1.default;
}
exports.createInMemoryStore = createInMemoryStore;
//# sourceMappingURL=InMemoryStore.native.js.map