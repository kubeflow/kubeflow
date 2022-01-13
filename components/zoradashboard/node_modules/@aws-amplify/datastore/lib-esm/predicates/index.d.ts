import { ModelPredicate, PersistentModel, PredicatesGroup, ProducerModelPredicate, SchemaModel } from '../types';
export { ModelSortPredicateCreator } from './sort';
export declare function isPredicatesAll(predicate: any): predicate is typeof PredicateAll;
export declare const PredicateAll: unique symbol;
export declare class Predicates {
    static get ALL(): typeof PredicateAll;
}
export declare class ModelPredicateCreator {
    private static predicateGroupsMap;
    private static createPredicateBuilder;
    static isValidPredicate<T extends PersistentModel>(predicate: any): predicate is ModelPredicate<T>;
    static getPredicates<T extends PersistentModel>(predicate: ModelPredicate<T>, throwOnInvalid?: boolean): PredicatesGroup<any>;
    static createFromExisting<T extends PersistentModel>(modelDefinition: SchemaModel, existing: ProducerModelPredicate<T>): ModelPredicate<T>;
    static createForId<T extends PersistentModel>(modelDefinition: SchemaModel, id: string): ModelPredicate<T>;
}
