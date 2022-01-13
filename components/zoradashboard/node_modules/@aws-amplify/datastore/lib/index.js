"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var datastore_1 = require("./datastore/datastore");
exports.DataStore = datastore_1.DataStore;
exports.DataStoreClass = datastore_1.DataStoreClass;
exports.initSchema = datastore_1.initSchema;
var predicates_1 = require("./predicates");
exports.Predicates = predicates_1.Predicates;
__export(require("./types"));
//# sourceMappingURL=index.js.map