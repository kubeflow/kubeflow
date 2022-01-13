import Observable from 'zen-observable-ts';
import { MutationEvent } from '../';
import { ModelInstanceCreator } from '../../datastore/datastore';
import { ExclusiveStorage as Storage } from '../../storage/storage';
import { AuthModeStrategy, ConflictHandler, ErrorHandler, InternalSchema, PersistentModel, PersistentModelConstructor, SchemaModel, TypeConstructorMap } from '../../types';
import { MutationEventOutbox } from '../outbox';
import { TransformerMutationType } from '../utils';
declare type MutationProcessorEvent = {
    operation: TransformerMutationType;
    modelDefinition: SchemaModel;
    model: PersistentModel;
    hasMore: boolean;
};
declare class MutationProcessor {
    private readonly schema;
    private readonly storage;
    private readonly userClasses;
    private readonly outbox;
    private readonly modelInstanceCreator;
    private readonly MutationEvent;
    private readonly amplifyConfig;
    private readonly authModeStrategy;
    private readonly conflictHandler?;
    private readonly errorHandler?;
    private observer;
    private readonly typeQuery;
    private processing;
    constructor(schema: InternalSchema, storage: Storage, userClasses: TypeConstructorMap, outbox: MutationEventOutbox, modelInstanceCreator: ModelInstanceCreator, MutationEvent: PersistentModelConstructor<MutationEvent>, amplifyConfig: Record<string, any>, authModeStrategy: AuthModeStrategy, conflictHandler?: ConflictHandler, errorHandler?: ErrorHandler);
    private generateQueries;
    private isReady;
    start(): Observable<MutationProcessorEvent>;
    resume(): Promise<void>;
    private jitteredRetry;
    private createQueryVariables;
    private opTypeFromTransformerOperation;
    pause(): void;
}
export { MutationProcessor };
