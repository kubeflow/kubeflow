"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Helper for converting JSON back into DataStore models (while respecting IDs)
function deserializeModel(Model, init) {
    if (Array.isArray(init)) {
        return init.map(function (init) { return deserializeModel(Model, init); });
    }
    // `fromJSON` is intentionally hidden from types as a "private" method (though it exists on the instance)
    // @ts-ignore Property 'fromJSON' does not exist on type 'PersistentModelConstructor<T>'.ts(2339)
    return Model.fromJSON(init);
}
exports.deserializeModel = deserializeModel;
// Helper for converting DataStore models to JSON
function serializeModel(model) {
    return JSON.parse(JSON.stringify(model));
}
exports.serializeModel = serializeModel;
//# sourceMappingURL=index.js.map