import { Adapter } from './index';
import { ModelInstanceCreator } from '../../datastore/datastore';
import { InternalSchema, ModelInstanceMetadata, ModelPredicate, NamespaceResolver, OpType, PaginationInput, PersistentModel, PersistentModelConstructor, QueryOne } from '../../types';
export declare class AsyncStorageAdapter implements Adapter {
    private schema;
    private namespaceResolver;
    private modelInstanceCreator;
    private getModelConstructorByModelName;
    private db;
    private initPromise;
    private resolve;
    private reject;
    private getStorenameForModel;
    private getStorename;
    setUp(theSchema: InternalSchema, namespaceResolver: NamespaceResolver, modelInstanceCreator: ModelInstanceCreator, getModelConstructorByModelName: (namsespaceName: string, modelName: string) => PersistentModelConstructor<any>): Promise<void>;
    save<T extends PersistentModel>(model: T, condition?: ModelPredicate<T>): Promise<[T, OpType.INSERT | OpType.UPDATE][]>;
    private load;
    query<T extends PersistentModel>(modelConstructor: PersistentModelConstructor<T>, predicate?: ModelPredicate<T>, pagination?: PaginationInput<T>): Promise<T[]>;
    private getById;
    private getAll;
    private idFromPredicate;
    private filterOnPredicate;
    private inMemoryPagination;
    queryOne<T extends PersistentModel>(modelConstructor: PersistentModelConstructor<T>, firstOrLast?: QueryOne): Promise<T | undefined>;
    delete<T extends PersistentModel>(modelOrModelConstructor: T | PersistentModelConstructor<T>, condition?: ModelPredicate<T>): Promise<[T[], T[]]>;
    private deleteItem;
    /**
     * Populates the delete Queue with all the items to delete
     * @param relations
     * @param models
     * @param srcModel
     * @param nameSpace
     * @param deleteQueue
     */
    private deleteTraverse;
    clear(): Promise<void>;
    batchSave<T extends PersistentModel>(modelConstructor: PersistentModelConstructor<any>, items: ModelInstanceMetadata[]): Promise<[T, OpType][]>;
}
declare const _default: AsyncStorageAdapter;
export default _default;
