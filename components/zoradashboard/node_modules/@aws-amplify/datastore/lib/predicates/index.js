"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var sort_1 = require("./sort");
exports.ModelSortPredicateCreator = sort_1.ModelSortPredicateCreator;
var predicatesAllSet = new WeakSet();
function isPredicatesAll(predicate) {
    return predicatesAllSet.has(predicate);
}
exports.isPredicatesAll = isPredicatesAll;
// This symbol is not used at runtime, only its type (unique symbol)
exports.PredicateAll = Symbol('A predicate that matches all records');
var Predicates = /** @class */ (function () {
    function Predicates() {
    }
    Object.defineProperty(Predicates, "ALL", {
        get: function () {
            var predicate = (function (c) { return c; });
            predicatesAllSet.add(predicate);
            return predicate;
        },
        enumerable: true,
        configurable: true
    });
    return Predicates;
}());
exports.Predicates = Predicates;
var ModelPredicateCreator = /** @class */ (function () {
    function ModelPredicateCreator() {
    }
    ModelPredicateCreator.createPredicateBuilder = function (modelDefinition) {
        var modelName = modelDefinition.name;
        var fieldNames = new Set(Object.keys(modelDefinition.fields));
        var handler;
        var predicate = new Proxy({}, (handler = {
            get: function (_target, propertyKey, receiver) {
                var groupType = propertyKey;
                switch (groupType) {
                    case 'and':
                    case 'or':
                    case 'not':
                        var result_1 = function (newPredicate) {
                            var group = {
                                type: groupType,
                                predicates: [],
                            };
                            // Create a new recorder
                            var tmpPredicateRecorder = new Proxy({}, handler);
                            // Set the recorder group
                            ModelPredicateCreator.predicateGroupsMap.set(tmpPredicateRecorder, group);
                            // Apply the predicates to the recorder (this is the step that records the changes)
                            newPredicate(tmpPredicateRecorder);
                            // Push the group to the top-level recorder
                            ModelPredicateCreator.predicateGroupsMap
                                .get(receiver)
                                .predicates.push(group);
                            return receiver;
                        };
                        return result_1;
                    default:
                        util_1.exhaustiveCheck(groupType, false);
                }
                var field = propertyKey;
                if (!fieldNames.has(field)) {
                    throw new Error("Invalid field for model. field: " + field + ", model: " + modelName);
                }
                var result = function (operator, operand) {
                    ModelPredicateCreator.predicateGroupsMap
                        .get(receiver)
                        .predicates.push({ field: field, operator: operator, operand: operand });
                    return receiver;
                };
                return result;
            },
        }));
        var group = {
            type: 'and',
            predicates: [],
        };
        ModelPredicateCreator.predicateGroupsMap.set(predicate, group);
        return predicate;
    };
    ModelPredicateCreator.isValidPredicate = function (predicate) {
        return ModelPredicateCreator.predicateGroupsMap.has(predicate);
    };
    ModelPredicateCreator.getPredicates = function (predicate, throwOnInvalid) {
        if (throwOnInvalid === void 0) { throwOnInvalid = true; }
        if (throwOnInvalid && !ModelPredicateCreator.isValidPredicate(predicate)) {
            throw new Error('The predicate is not valid');
        }
        return ModelPredicateCreator.predicateGroupsMap.get(predicate);
    };
    // transforms cb-style predicate into Proxy
    ModelPredicateCreator.createFromExisting = function (modelDefinition, existing) {
        if (!existing || !modelDefinition) {
            return undefined;
        }
        return existing(ModelPredicateCreator.createPredicateBuilder(modelDefinition));
    };
    ModelPredicateCreator.createForId = function (modelDefinition, id) {
        return ModelPredicateCreator.createPredicateBuilder(modelDefinition).id('eq', id);
    };
    ModelPredicateCreator.predicateGroupsMap = new WeakMap();
    return ModelPredicateCreator;
}());
exports.ModelPredicateCreator = ModelPredicateCreator;
//# sourceMappingURL=index.js.map