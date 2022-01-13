/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { User } from '../auth/user';
import { BatchId, MutationBatchState, TargetId } from '../core/types';
import { ClientId } from './shared_client_state';
import { QueryTargetState } from './shared_client_state_syncer';
export declare const CLIENT_STATE_KEY_PREFIX = "firestore_clients";
/** Assembles the key for a client state in WebStorage */
export declare function createWebStorageClientStateKey(persistenceKey: string, clientId: ClientId): string;
/**
 * The JSON representation of a clients's metadata as used during WebStorage
 * serialization. The ClientId is omitted here as it is encoded as part of the
 * key.
 */
export interface ClientStateSchema {
    activeTargetIds: number[];
    updateTimeMs: number;
}
export declare const MUTATION_BATCH_KEY_PREFIX = "firestore_mutations";
/** Assembles the key for a mutation batch in WebStorage */
export declare function createWebStorageMutationBatchKey(persistenceKey: string, user: User, batchId: BatchId): string;
/**
 * The JSON representation of a mutation batch's metadata as used during
 * WebStorage serialization. The UserId and BatchId is omitted as it is
 * encoded as part of the key.
 */
export interface MutationMetadataSchema {
    state: MutationBatchState;
    error?: {
        code: string;
        message: string;
    };
    updateTimeMs: number;
}
export declare const QUERY_TARGET_KEY_PREFIX = "firestore_targets";
/** Assembles the key for a query state in WebStorage */
export declare function createWebStorageQueryTargetMetadataKey(persistenceKey: string, targetId: TargetId): string;
/**
 * The JSON representation of a query target's state as used during WebStorage
 * serialization. The TargetId is omitted as it is encoded as part of the key.
 */
export interface QueryTargetStateSchema {
    state: QueryTargetState;
    error?: {
        code: string;
        message: string;
    };
    updateTimeMs: number;
}
export declare const ONLINE_STATE_KEY_PREFIX = "firestore_online_state";
/** Assembles the key for the online state of the primary tab. */
export declare function createWebStorageOnlineStateKey(persistenceKey: string): string;
export declare const BUNDLE_LOADED_KEY_PREFIX = "firestore_bundle_loaded";
export declare function createBundleLoadedKey(persistenceKey: string): string;
/**
 * The JSON representation of the system's online state, as written by the
 * primary client.
 */
export interface SharedOnlineStateSchema {
    /**
     * The clientId of the client that wrote this onlineState value. Tracked so
     * that on startup, clients can check if this client is still active when
     * determining whether to apply this value or not.
     */
    readonly clientId: string;
    readonly onlineState: string;
}
export declare const SEQUENCE_NUMBER_KEY_PREFIX = "firestore_sequence_number";
/** Assembles the key for the current sequence number. */
export declare function createWebStorageSequenceNumberKey(persistenceKey: string): string;
