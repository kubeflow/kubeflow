import Observable from 'zen-observable-ts';
import { InternalSchema, PersistentModel, SchemaModel, ModelPredicate, AuthModeStrategy } from '../../types';
import { TransformerMutationType } from '../utils';
export declare enum CONTROL_MSG {
    CONNECTED = "CONNECTED"
}
export declare enum USER_CREDENTIALS {
    'none' = 0,
    'unauth' = 1,
    'auth' = 2
}
declare class SubscriptionProcessor {
    private readonly schema;
    private readonly syncPredicates;
    private readonly amplifyConfig;
    private readonly authModeStrategy;
    private readonly typeQuery;
    private buffer;
    private dataObserver;
    constructor(schema: InternalSchema, syncPredicates: WeakMap<SchemaModel, ModelPredicate<any>>, amplifyConfig: Record<string, any>, authModeStrategy: AuthModeStrategy);
    private buildSubscription;
    private getAuthorizationInfo;
    private hubQueryCompletionListener;
    start(): [Observable<CONTROL_MSG>, Observable<[TransformerMutationType, SchemaModel, PersistentModel]>];
    private passesPredicateValidation;
    private pushToBuffer;
    private drainBuffer;
}
export { SubscriptionProcessor };
