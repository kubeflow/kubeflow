"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelSortPredicateCreator = /** @class */ (function () {
    function ModelSortPredicateCreator() {
    }
    ModelSortPredicateCreator.createPredicateBuilder = function (modelDefinition) {
        var modelName = modelDefinition.name;
        var fieldNames = new Set(Object.keys(modelDefinition.fields));
        var handler;
        var predicate = new Proxy({}, (handler = {
            get: function (_target, propertyKey, receiver) {
                var field = propertyKey;
                if (!fieldNames.has(field)) {
                    throw new Error("Invalid field for model. field: " + field + ", model: " + modelName);
                }
                var result = function (sortDirection) {
                    ModelSortPredicateCreator.sortPredicateGroupsMap
                        .get(receiver)
                        .push({ field: field, sortDirection: sortDirection });
                    return receiver;
                };
                return result;
            },
        }));
        ModelSortPredicateCreator.sortPredicateGroupsMap.set(predicate, []);
        return predicate;
    };
    ModelSortPredicateCreator.isValidPredicate = function (predicate) {
        return ModelSortPredicateCreator.sortPredicateGroupsMap.has(predicate);
    };
    ModelSortPredicateCreator.getPredicates = function (predicate, throwOnInvalid) {
        if (throwOnInvalid === void 0) { throwOnInvalid = true; }
        if (throwOnInvalid &&
            !ModelSortPredicateCreator.isValidPredicate(predicate)) {
            throw new Error('The predicate is not valid');
        }
        return ModelSortPredicateCreator.sortPredicateGroupsMap.get(predicate);
    };
    // transforms cb-style predicate into Proxy
    ModelSortPredicateCreator.createFromExisting = function (modelDefinition, existing) {
        if (!existing || !modelDefinition) {
            return undefined;
        }
        return existing(ModelSortPredicateCreator.createPredicateBuilder(modelDefinition));
    };
    ModelSortPredicateCreator.sortPredicateGroupsMap = new WeakMap();
    return ModelSortPredicateCreator;
}());
exports.ModelSortPredicateCreator = ModelSortPredicateCreator;
//# sourceMappingURL=sort.js.map