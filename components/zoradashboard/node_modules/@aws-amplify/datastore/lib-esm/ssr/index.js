// Helper for converting JSON back into DataStore models (while respecting IDs)
export function deserializeModel(Model, init) {
    if (Array.isArray(init)) {
        return init.map(function (init) { return deserializeModel(Model, init); });
    }
    // `fromJSON` is intentionally hidden from types as a "private" method (though it exists on the instance)
    // @ts-ignore Property 'fromJSON' does not exist on type 'PersistentModelConstructor<T>'.ts(2339)
    return Model.fromJSON(init);
}
// Helper for converting DataStore models to JSON
export function serializeModel(model) {
    return JSON.parse(JSON.stringify(model));
}
//# sourceMappingURL=index.js.map