import { PersistentModel, PersistentModelConstructor } from '@aws-amplify/datastore';
export declare function deserializeModel<T extends PersistentModel>(Model: PersistentModelConstructor<T>, init: T | T[]): any;
export declare function serializeModel<T extends PersistentModel>(model: T | T[]): JSON;
