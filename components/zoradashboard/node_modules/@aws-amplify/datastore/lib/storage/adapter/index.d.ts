import { ModelInstanceMetadata, ModelPredicate, OpType, PaginationInput, PersistentModel, PersistentModelConstructor, QueryOne, SystemComponent } from '../../types';
export interface Adapter extends SystemComponent {
    clear(): Promise<void>;
    save<T extends PersistentModel>(model: T, condition?: ModelPredicate<T>): Promise<[T, OpType.INSERT | OpType.UPDATE][]>;
    delete: <T extends PersistentModel>(modelOrModelConstructor: T | PersistentModelConstructor<T>, condition?: ModelPredicate<T>) => Promise<[T[], T[]]>;
    query<T extends PersistentModel>(modelConstructor: PersistentModelConstructor<T>, predicate?: ModelPredicate<T>, pagination?: PaginationInput<T>): Promise<T[]>;
    queryOne<T extends PersistentModel>(modelConstructor: PersistentModelConstructor<T>, firstOrLast: QueryOne): Promise<T | undefined>;
    batchSave<T extends PersistentModel>(modelConstructor: PersistentModelConstructor<any>, items: ModelInstanceMetadata[]): Promise<[T, OpType][]>;
}
