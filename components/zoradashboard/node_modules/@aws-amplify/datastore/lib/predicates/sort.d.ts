import { PersistentModel, SchemaModel, SortPredicate, ProducerSortPredicate, SortPredicatesGroup } from '../types';
export declare class ModelSortPredicateCreator {
    private static sortPredicateGroupsMap;
    private static createPredicateBuilder;
    static isValidPredicate<T extends PersistentModel>(predicate: any): predicate is SortPredicate<T>;
    static getPredicates<T extends PersistentModel>(predicate: SortPredicate<T>, throwOnInvalid?: boolean): SortPredicatesGroup<T>;
    static createFromExisting<T extends PersistentModel>(modelDefinition: SchemaModel, existing: ProducerSortPredicate<T>): SortPredicate<T>;
}
