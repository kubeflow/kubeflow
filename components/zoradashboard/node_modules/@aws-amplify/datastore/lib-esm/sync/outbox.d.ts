import { MutationEvent } from './index';
import { ExclusiveStorage as Storage, StorageFacade, Storage as StorageClass } from '../storage/storage';
import { ModelInstanceCreator } from '../datastore/datastore';
import { InternalSchema, PersistentModel, PersistentModelConstructor } from '../types';
import { TransformerMutationType } from './utils';
declare class MutationEventOutbox {
    private readonly schema;
    private readonly MutationEvent;
    private readonly modelInstanceCreator;
    private readonly ownSymbol;
    private inProgressMutationEventId;
    constructor(schema: InternalSchema, MutationEvent: PersistentModelConstructor<MutationEvent>, modelInstanceCreator: ModelInstanceCreator, ownSymbol: Symbol);
    enqueue(storage: Storage, mutationEvent: MutationEvent): Promise<void>;
    dequeue(storage: StorageClass, record?: PersistentModel, recordOp?: TransformerMutationType): Promise<MutationEvent>;
    /**
     * Doing a peek() implies that the mutation goes "inProgress"
     *
     * @param storage
     */
    peek(storage: StorageFacade): Promise<MutationEvent>;
    getForModel<T extends PersistentModel>(storage: StorageFacade, model: T): Promise<MutationEvent[]>;
    getModelIds(storage: StorageFacade): Promise<Set<string>>;
    private syncOutboxVersionsOnDequeue;
    private mergeUserFields;
}
export { MutationEventOutbox };
