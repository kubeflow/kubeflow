"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@aws-amplify/core");
var getDefaultAdapter = function () {
    var isBrowser = core_1.browserOrNode().isBrowser;
    if ((isBrowser && window.indexedDB) || (core_1.isWebWorker() && self.indexedDB)) {
        return require('../IndexedDBAdapter').default;
    }
    var AsyncStorageAdapter = require('../AsyncStorageAdapter').AsyncStorageAdapter;
    return new AsyncStorageAdapter();
};
exports.default = getDefaultAdapter;
//# sourceMappingURL=index.js.map