import Observable from 'zen-observable-ts';
import { ModelInstanceCreator } from '../datastore/datastore';
import { ExclusiveStorage as Storage } from '../storage/storage';
import { ConflictHandler, ControlMessageType, ErrorHandler, InternalSchema, ModelInit, MutableModel, NamespaceResolver, SchemaModel, SchemaNamespace, TypeConstructorMap, ModelPredicate, AuthModeStrategy } from '../types';
import { TransformerMutationType } from './utils';
declare type StartParams = {
    fullSyncInterval: number;
};
export declare class MutationEvent {
    constructor(init: ModelInit<MutationEvent>);
    static copyOf(src: MutationEvent, mutator: (draft: MutableModel<MutationEvent>) => void | MutationEvent): MutationEvent;
    readonly id: string;
    readonly model: string;
    readonly operation: TransformerMutationType;
    readonly modelId: string;
    readonly condition: string;
    data: string;
}
export declare enum ControlMessage {
    SYNC_ENGINE_STORAGE_SUBSCRIBED = "storageSubscribed",
    SYNC_ENGINE_SUBSCRIPTIONS_ESTABLISHED = "subscriptionsEstablished",
    SYNC_ENGINE_SYNC_QUERIES_STARTED = "syncQueriesStarted",
    SYNC_ENGINE_SYNC_QUERIES_READY = "syncQueriesReady",
    SYNC_ENGINE_MODEL_SYNCED = "modelSynced",
    SYNC_ENGINE_OUTBOX_MUTATION_ENQUEUED = "outboxMutationEnqueued",
    SYNC_ENGINE_OUTBOX_MUTATION_PROCESSED = "outboxMutationProcessed",
    SYNC_ENGINE_OUTBOX_STATUS = "outboxStatus",
    SYNC_ENGINE_NETWORK_STATUS = "networkStatus",
    SYNC_ENGINE_READY = "ready"
}
export declare class SyncEngine {
    private readonly schema;
    private readonly namespaceResolver;
    private readonly modelClasses;
    private readonly userModelClasses;
    private readonly storage;
    private readonly modelInstanceCreator;
    private readonly maxRecordsToSync;
    private readonly syncPageSize;
    private readonly syncPredicates;
    private readonly amplifyConfig;
    private readonly authModeStrategy;
    private online;
    private readonly syncQueriesProcessor;
    private readonly subscriptionsProcessor;
    private readonly mutationsProcessor;
    private readonly modelMerger;
    private readonly outbox;
    private readonly datastoreConnectivity;
    constructor(schema: InternalSchema, namespaceResolver: NamespaceResolver, modelClasses: TypeConstructorMap, userModelClasses: TypeConstructorMap, storage: Storage, modelInstanceCreator: ModelInstanceCreator, maxRecordsToSync: number, syncPageSize: number, conflictHandler: ConflictHandler, errorHandler: ErrorHandler, syncPredicates: WeakMap<SchemaModel, ModelPredicate<any>>, amplifyConfig: Record<string, any>, authModeStrategy: AuthModeStrategy);
    start(params: StartParams): Observable<ControlMessageType<ControlMessage>>;
    private getModelsMetadataWithNextFullSync;
    private syncQueriesObservable;
    private disconnectionHandler;
    unsubscribeConnectivity(): void;
    private setupModels;
    private getModelsMetadata;
    private getModelMetadata;
    private getModelDefinition;
    static getNamespace(): SchemaNamespace;
}
export {};
