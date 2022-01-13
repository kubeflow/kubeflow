/**
 * @license
 * Copyright 2018 Google LLC
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
import { BatchId, ListenSequenceNumber, MutationBatchState, OnlineState, TargetId } from '../core/types';
import { TargetIdSet } from '../model/collections';
import { AsyncQueue } from '../util/async_queue';
import { FirestoreError } from '../util/error';
import { SortedSet } from '../util/sorted_set';
import { WindowLike } from '../util/types';
import { QueryTargetState, SharedClientStateSyncer } from './shared_client_state_syncer';
/**
 * A randomly-generated key assigned to each Firestore instance at startup.
 */
export declare type ClientId = string;
/**
 * A `SharedClientState` keeps track of the global state of the mutations
 * and query targets for all active clients with the same persistence key (i.e.
 * project ID and FirebaseApp name). It relays local changes to other clients
 * and updates its local state as new state is observed.
 *
 * `SharedClientState` is primarily used for synchronization in Multi-Tab
 * environments. Each tab is responsible for registering its active query
 * targets and mutations. `SharedClientState` will then notify the listener
 * assigned to `.syncEngine` for updates to mutations and queries that
 * originated in other clients.
 *
 * To receive notifications, `.syncEngine` and `.onlineStateHandler` has to be
 * assigned before calling `start()`.
 */
export interface SharedClientState {
    onlineStateHandler: ((onlineState: OnlineState) => void) | null;
    sequenceNumberHandler: ((sequenceNumber: ListenSequenceNumber) => void) | null;
    /** Registers the Mutation Batch ID of a newly pending mutation. */
    addPendingMutation(batchId: BatchId): void;
    /**
     * Records that a pending mutation has been acknowledged or rejected.
     * Called by the primary client to notify secondary clients of mutation
     * results as they come back from the backend.
     */
    updateMutationState(batchId: BatchId, state: 'acknowledged' | 'rejected', error?: FirestoreError): void;
    /**
     * Associates a new Query Target ID with the local Firestore client. Returns
     * the new query state for the query (which can be 'current' if the query is
     * already associated with another tab).
     *
     * If the target id is already associated with local client, the method simply
     * returns its `QueryTargetState`.
     */
    addLocalQueryTarget(targetId: TargetId): QueryTargetState;
    /** Removes the Query Target ID association from the local client. */
    removeLocalQueryTarget(targetId: TargetId): void;
    /** Checks whether the target is associated with the local client. */
    isLocalQueryTarget(targetId: TargetId): boolean;
    /**
     * Processes an update to a query target.
     *
     * Called by the primary client to notify secondary clients of document
     * changes or state transitions that affect the provided query target.
     */
    updateQueryState(targetId: TargetId, state: QueryTargetState, error?: FirestoreError): void;
    /**
     * Removes the target's metadata entry.
     *
     * Called by the primary client when all clients stopped listening to a query
     * target.
     */
    clearQueryState(targetId: TargetId): void;
    /**
     * Gets the active Query Targets IDs for all active clients.
     *
     * The implementation for this may require O(n) runtime, where 'n' is the size
     * of the result set.
     */
    getAllActiveQueryTargets(): SortedSet<TargetId>;
    /**
     * Checks whether the provided target ID is currently being listened to by
     * any of the active clients.
     *
     * The implementation may require O(n*log m) runtime, where 'n' is the number
     * of clients and 'm' the number of targets.
     */
    isActiveQueryTarget(targetId: TargetId): boolean;
    /**
     * Starts the SharedClientState, reads existing client data and registers
     * listeners for updates to new and existing clients.
     */
    start(): Promise<void>;
    /** Shuts down the `SharedClientState` and its listeners. */
    shutdown(): void;
    /**
     * Changes the active user and removes all existing user-specific data. The
     * user change does not call back into SyncEngine (for example, no mutations
     * will be marked as removed).
     */
    handleUserChange(user: User, removedBatchIds: BatchId[], addedBatchIds: BatchId[]): void;
    /** Changes the shared online state of all clients. */
    setOnlineState(onlineState: OnlineState): void;
    writeSequenceNumber(sequenceNumber: ListenSequenceNumber): void;
    /**
     * Notifies other clients when remote documents have changed due to loading
     * a bundle.
     */
    notifyBundleLoaded(): void;
}
/**
 * Holds the state of a mutation batch, including its user ID, batch ID and
 * whether the batch is 'pending', 'acknowledged' or 'rejected'.
 */
export declare class MutationMetadata {
    readonly user: User;
    readonly batchId: BatchId;
    readonly state: MutationBatchState;
    readonly error?: FirestoreError | undefined;
    constructor(user: User, batchId: BatchId, state: MutationBatchState, error?: FirestoreError | undefined);
    /**
     * Parses a MutationMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */
    static fromWebStorageEntry(user: User, batchId: BatchId, value: string): MutationMetadata | null;
    toWebStorageJSON(): string;
}
/**
 * Holds the state of a query target, including its target ID and whether the
 * target is 'not-current', 'current' or 'rejected'.
 */
export declare class QueryTargetMetadata {
    readonly targetId: TargetId;
    readonly state: QueryTargetState;
    readonly error?: FirestoreError | undefined;
    constructor(targetId: TargetId, state: QueryTargetState, error?: FirestoreError | undefined);
    /**
     * Parses a QueryTargetMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */
    static fromWebStorageEntry(targetId: TargetId, value: string): QueryTargetMetadata | null;
    toWebStorageJSON(): string;
}
/**
 * Metadata state of a single client denoting the query targets it is actively
 * listening to.
 */
export interface ClientState {
    readonly activeTargetIds: TargetIdSet;
}
/**
 * This class represents the online state for all clients participating in
 * multi-tab. The online state is only written to by the primary client, and
 * used in secondary clients to update their query views.
 */
export declare class SharedOnlineState {
    readonly clientId: string;
    readonly onlineState: OnlineState;
    constructor(clientId: string, onlineState: OnlineState);
    /**
     * Parses a SharedOnlineState from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */
    static fromWebStorageEntry(value: string): SharedOnlineState | null;
}
/**
 * Metadata state of the local client. Unlike `RemoteClientState`, this class is
 * mutable and keeps track of all pending mutations, which allows us to
 * update the range of pending mutation batch IDs as new mutations are added or
 * removed.
 *
 * The data in `LocalClientState` is not read from WebStorage and instead
 * updated via its instance methods. The updated state can be serialized via
 * `toWebStorageJSON()`.
 */
export declare class LocalClientState implements ClientState {
    activeTargetIds: SortedSet<number>;
    addQueryTarget(targetId: TargetId): void;
    removeQueryTarget(targetId: TargetId): void;
    /**
     * Converts this entry into a JSON-encoded format we can use for WebStorage.
     * Does not encode `clientId` as it is part of the key in WebStorage.
     */
    toWebStorageJSON(): string;
}
/**
 * `WebStorageSharedClientState` uses WebStorage (window.localStorage) as the
 * backing store for the SharedClientState. It keeps track of all active
 * clients and supports modifications of the local client's data.
 */
export declare class WebStorageSharedClientState implements SharedClientState {
    private readonly window;
    private readonly queue;
    private readonly persistenceKey;
    private readonly localClientId;
    syncEngine: SharedClientStateSyncer | null;
    onlineStateHandler: ((onlineState: OnlineState) => void) | null;
    sequenceNumberHandler: ((sequenceNumber: ListenSequenceNumber) => void) | null;
    private readonly storage;
    private readonly localClientStorageKey;
    private readonly sequenceNumberKey;
    private readonly storageListener;
    private readonly onlineStateKey;
    private readonly bundleLoadedKey;
    private readonly clientStateKeyRe;
    private readonly mutationBatchKeyRe;
    private readonly queryTargetKeyRe;
    private activeClients;
    private started;
    private currentUser;
    /**
     * Captures WebStorage events that occur before `start()` is called. These
     * events are replayed once `WebStorageSharedClientState` is started.
     */
    private earlyEvents;
    constructor(window: WindowLike, queue: AsyncQueue, persistenceKey: string, localClientId: ClientId, initialUser: User);
    /** Returns 'true' if WebStorage is available in the current environment. */
    static isAvailable(window: WindowLike | null): window is WindowLike;
    start(): Promise<void>;
    writeSequenceNumber(sequenceNumber: ListenSequenceNumber): void;
    getAllActiveQueryTargets(): TargetIdSet;
    isActiveQueryTarget(targetId: TargetId): boolean;
    addPendingMutation(batchId: BatchId): void;
    updateMutationState(batchId: BatchId, state: 'acknowledged' | 'rejected', error?: FirestoreError): void;
    addLocalQueryTarget(targetId: TargetId): QueryTargetState;
    removeLocalQueryTarget(targetId: TargetId): void;
    isLocalQueryTarget(targetId: TargetId): boolean;
    clearQueryState(targetId: TargetId): void;
    updateQueryState(targetId: TargetId, state: QueryTargetState, error?: FirestoreError): void;
    handleUserChange(user: User, removedBatchIds: BatchId[], addedBatchIds: BatchId[]): void;
    setOnlineState(onlineState: OnlineState): void;
    notifyBundleLoaded(): void;
    shutdown(): void;
    private getItem;
    private setItem;
    private removeItem;
    private handleWebStorageEvent;
    private get localClientState();
    private persistClientState;
    private persistMutationState;
    private removeMutationState;
    private persistOnlineState;
    private persistQueryTargetState;
    private persistBundleLoadedState;
    /**
     * Parses a client state key in WebStorage. Returns null if the key does not
     * match the expected key format.
     */
    private fromWebStorageClientStateKey;
    /**
     * Parses a client state in WebStorage. Returns 'null' if the value could not
     * be parsed.
     */
    private fromWebStorageClientState;
    /**
     * Parses a mutation batch state in WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    private fromWebStorageMutationMetadata;
    /**
     * Parses a query target state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    private fromWebStorageQueryTargetMetadata;
    /**
     * Parses an online state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    private fromWebStorageOnlineState;
    private handleMutationBatchEvent;
    private handleQueryTargetEvent;
    private handleClientStateEvent;
    private handleOnlineStateEvent;
    private extractActiveQueryTargets;
}
/**
 * `MemorySharedClientState` is a simple implementation of SharedClientState for
 * clients using memory persistence. The state in this class remains fully
 * isolated and no synchronization is performed.
 */
export declare class MemorySharedClientState implements SharedClientState {
    private localState;
    private queryState;
    onlineStateHandler: ((onlineState: OnlineState) => void) | null;
    sequenceNumberHandler: ((sequenceNumber: ListenSequenceNumber) => void) | null;
    addPendingMutation(batchId: BatchId): void;
    updateMutationState(batchId: BatchId, state: 'acknowledged' | 'rejected', error?: FirestoreError): void;
    addLocalQueryTarget(targetId: TargetId): QueryTargetState;
    updateQueryState(targetId: TargetId, state: QueryTargetState, error?: FirestoreError): void;
    removeLocalQueryTarget(targetId: TargetId): void;
    isLocalQueryTarget(targetId: TargetId): boolean;
    clearQueryState(targetId: TargetId): void;
    getAllActiveQueryTargets(): TargetIdSet;
    isActiveQueryTarget(targetId: TargetId): boolean;
    start(): Promise<void>;
    handleUserChange(user: User, removedBatchIds: BatchId[], addedBatchIds: BatchId[]): void;
    setOnlineState(onlineState: OnlineState): void;
    shutdown(): void;
    writeSequenceNumber(sequenceNumber: ListenSequenceNumber): void;
    notifyBundleLoaded(): void;
}
