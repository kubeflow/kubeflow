import Observable from 'zen-observable-ts';
import { InternalSchema, ModelInstanceMetadata, SchemaModel, ModelPredicate, AuthModeStrategy } from '../../types';
declare class SyncProcessor {
    private readonly schema;
    private readonly maxRecordsToSync;
    private readonly syncPageSize;
    private readonly syncPredicates;
    private readonly amplifyConfig;
    private readonly authModeStrategy;
    private readonly typeQuery;
    constructor(schema: InternalSchema, maxRecordsToSync: number, syncPageSize: number, syncPredicates: WeakMap<SchemaModel, ModelPredicate<any>>, amplifyConfig: Record<string, any>, authModeStrategy: AuthModeStrategy);
    private generateQueries;
    private graphqlFilterFromPredicate;
    private retrievePage;
    private partialDataFeatureFlagEnabled;
    private jitteredRetry;
    start(typesLastSync: Map<SchemaModel, [string, number]>): Observable<SyncModelPage>;
}
export declare type SyncModelPage = {
    namespace: string;
    modelDefinition: SchemaModel;
    items: ModelInstanceMetadata[];
    startedAt: number;
    done: boolean;
    isFullSync: boolean;
};
export { SyncProcessor };
