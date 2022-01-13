import { Storage } from '../storage/storage';
import { ModelInstanceMetadata, OpType, PersistentModelConstructor } from '../types';
import { MutationEventOutbox } from './outbox';
declare class ModelMerger {
    private readonly outbox;
    private readonly ownSymbol;
    constructor(outbox: MutationEventOutbox, ownSymbol: Symbol);
    merge<T extends ModelInstanceMetadata>(storage: Storage, model: T): Promise<OpType>;
    mergePage(storage: Storage, modelConstructor: PersistentModelConstructor<any>, items: ModelInstanceMetadata[]): Promise<[ModelInstanceMetadata, OpType][]>;
}
export { ModelMerger };
