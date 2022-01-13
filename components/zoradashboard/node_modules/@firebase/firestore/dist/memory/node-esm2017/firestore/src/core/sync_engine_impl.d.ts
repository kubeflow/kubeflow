/**
 * @license
 * Copyright 2020 Google LLC
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
import { LoadBundleTask } from '../exp/bundle';
import { LocalStore } from '../local/local_store';
import { ReferenceSet } from '../local/reference_set';
import { ClientId, SharedClientState } from '../local/shared_client_state';
import { QueryTargetState } from '../local/shared_client_state_syncer';
import { DocumentKeySet, DocumentMap } from '../model/collections';
import { DocumentKey } from '../model/document_key';
import { Mutation } from '../model/mutation';
import { MutationBatchResult } from '../model/mutation_batch';
import { RemoteEvent } from '../remote/remote_event';
import { RemoteStore } from '../remote/remote_store';
import { BundleReader } from '../util/bundle_reader';
import { FirestoreError } from '../util/error';
import { ObjectMap } from '../util/obj_map';
import { Deferred } from '../util/promise';
import { SortedMap } from '../util/sorted_map';
import { EventManager } from './event_manager';
import { Query } from './query';
import { SyncEngine } from './sync_engine';
import { TargetIdGenerator } from './target_id_generator';
import { BatchId, MutationBatchState, OnlineState, OnlineStateSource, TargetId } from './types';
import { View } from './view';
import { ViewSnapshot } from './view_snapshot';
/**
 * QueryView contains all of the data that SyncEngine needs to keep track of for
 * a particular query.
 */
declare class QueryView {
    /**
     * The query itself.
     */
    query: Query;
    /**
     * The target number created by the client that is used in the watch
     * stream to identify this query.
     */
    targetId: TargetId;
    /**
     * The view is responsible for computing the final merged truth of what
     * docs are in the query. It gets notified of local and remote changes,
     * and applies the query filters and limits to determine the most correct
     * possible results.
     */
    view: View;
    constructor(
    /**
     * The query itself.
     */
    query: Query, 
    /**
     * The target number created by the client that is used in the watch
     * stream to identify this query.
     */
    targetId: TargetId, 
    /**
     * The view is responsible for computing the final merged truth of what
     * docs are in the query. It gets notified of local and remote changes,
     * and applies the query filters and limits to determine the most correct
     * possible results.
     */
    view: View);
}
/** Tracks a limbo resolution. */
declare class LimboResolution {
    key: DocumentKey;
    constructor(key: DocumentKey);
    /**
     * Set to true once we've received a document. This is used in
     * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
     * decide whether it needs to manufacture a delete event for the target once
     * the target is CURRENT.
     */
    receivedDocument: boolean;
}
/**
 * A function that updates a QueryView with a set of document changes (and a
 * remote event if applicable).
 */
declare type ApplyDocChangesHandler = (queryView: QueryView, changes: DocumentMap, remoteEvent?: RemoteEvent) => Promise<ViewSnapshot | undefined>;
/**
 * Callbacks implemented by EventManager to handle notifications from
 * SyncEngine.
 */
interface SyncEngineListener {
    /** Handles new view snapshots. */
    onWatchChange?(snapshots: ViewSnapshot[]): void;
    /** Handles the failure of a query. */
    onWatchError?(query: Query, error: FirestoreError): void;
}
/**
 * An implementation of `SyncEngine` coordinating with other parts of SDK.
 *
 * The parts of SyncEngine that act as a callback to RemoteStore need to be
 * registered individually. This is done in `syncEngineWrite()` and
 * `syncEngineListen()` (as well as `applyPrimaryState()`) as these methods
 * serve as entry points to RemoteStore's functionality.
 *
 * Note: some field defined in this class might have public access level, but
 * the class is not exported so they are only accessible from this module.
 * This is useful to implement optional features (like bundles) in free
 * functions, such that they are tree-shakeable.
 */
declare class SyncEngineImpl implements SyncEngine {
    readonly localStore: LocalStore;
    readonly remoteStore: RemoteStore;
    readonly eventManager: EventManager;
    readonly sharedClientState: SharedClientState;
    currentUser: User;
    readonly maxConcurrentLimboResolutions: number;
    syncEngineListener: SyncEngineListener;
    /**
     * A callback that updates the QueryView based on the provided change.
     *
     * PORTING NOTE: On other platforms, this logic lives in
     * `emitNewSnapshotsAndNotifyLocalStore()`, but on Web it is extracted to
     *  ensure that all view logic only exists in bundles that include views.
     */
    applyDocChanges?: ApplyDocChangesHandler;
    queryViewsByQuery: ObjectMap<Query, QueryView>;
    queriesByTarget: Map<number, Query[]>;
    /**
     * The keys of documents that are in limbo for which we haven't yet started a
     * limbo resolution query. The strings in this set are the result of calling
     * `key.path.canonicalString()` where `key` is a `DocumentKey` object.
     *
     * The `Set` type was chosen because it provides efficient lookup and removal
     * of arbitrary elements and it also maintains insertion order, providing the
     * desired queue-like FIFO semantics.
     */
    enqueuedLimboResolutions: Set<string>;
    /**
     * Keeps track of the target ID for each document that is in limbo with an
     * active target.
     */
    activeLimboTargetsByKey: SortedMap<DocumentKey, number>;
    /**
     * Keeps track of the information about an active limbo resolution for each
     * active target ID that was started for the purpose of limbo resolution.
     */
    activeLimboResolutionsByTarget: Map<number, LimboResolution>;
    limboDocumentRefs: ReferenceSet;
    /** Stores user completion handlers, indexed by User and BatchId. */
    mutationUserCallbacks: {
        [uidKey: string]: SortedMap<number, Deferred<void>>;
    };
    /** Stores user callbacks waiting for all pending writes to be acknowledged. */
    pendingWritesCallbacks: Map<number, Deferred<void>[]>;
    limboTargetIdGenerator: TargetIdGenerator;
    onlineState: OnlineState;
    _isPrimaryClient: undefined | boolean;
    constructor(localStore: LocalStore, remoteStore: RemoteStore, eventManager: EventManager, sharedClientState: SharedClientState, currentUser: User, maxConcurrentLimboResolutions: number);
    get isPrimaryClient(): boolean;
}
export declare function newSyncEngine(localStore: LocalStore, remoteStore: RemoteStore, eventManager: EventManager, sharedClientState: SharedClientState, currentUser: User, maxConcurrentLimboResolutions: number, isPrimary: boolean): SyncEngine;
/**
 * Initiates the new listen, resolves promise when listen enqueued to the
 * server. All the subsequent view snapshots or errors are sent to the
 * subscribed handlers. Returns the initial snapshot.
 */
export declare function syncEngineListen(syncEngine: SyncEngine, query: Query): Promise<ViewSnapshot>;
/** Stops listening to the query. */
export declare function syncEngineUnlisten(syncEngine: SyncEngine, query: Query): Promise<void>;
/**
 * Initiates the write of local mutation batch which involves adding the
 * writes to the mutation queue, notifying the remote store about new
 * mutations and raising events for any changes this write caused.
 *
 * The promise returned by this call is resolved when the above steps
 * have completed, *not* when the write was acked by the backend. The
 * userCallback is resolved once the write was acked/rejected by the
 * backend (or failed locally for any other reason).
 */
export declare function syncEngineWrite(syncEngine: SyncEngine, batch: Mutation[], userCallback: Deferred<void>): Promise<void>;
/**
 * Applies one remote event to the sync engine, notifying any views of the
 * changes, and releasing any pending mutation batches that would become
 * visible because of the snapshot version the remote event contains.
 */
export declare function syncEngineApplyRemoteEvent(syncEngine: SyncEngine, remoteEvent: RemoteEvent): Promise<void>;
/**
 * Applies an OnlineState change to the sync engine and notifies any views of
 * the change.
 */
export declare function syncEngineApplyOnlineStateChange(syncEngine: SyncEngine, onlineState: OnlineState, source: OnlineStateSource): void;
/**
 * Rejects the listen for the given targetID. This can be triggered by the
 * backend for any active target.
 *
 * @param syncEngine - The sync engine implementation.
 * @param targetId - The targetID corresponds to one previously initiated by the
 * user as part of TargetData passed to listen() on RemoteStore.
 * @param err - A description of the condition that has forced the rejection.
 * Nearly always this will be an indication that the user is no longer
 * authorized to see the data matching the target.
 */
export declare function syncEngineRejectListen(syncEngine: SyncEngine, targetId: TargetId, err: FirestoreError): Promise<void>;
export declare function syncEngineApplySuccessfulWrite(syncEngine: SyncEngine, mutationBatchResult: MutationBatchResult): Promise<void>;
export declare function syncEngineRejectFailedWrite(syncEngine: SyncEngine, batchId: BatchId, error: FirestoreError): Promise<void>;
/**
 * Registers a user callback that resolves when all pending mutations at the moment of calling
 * are acknowledged .
 */
export declare function syncEngineRegisterPendingWritesCallback(syncEngine: SyncEngine, callback: Deferred<void>): Promise<void>;
export declare function syncEngineGetActiveLimboDocumentResolutions(syncEngine: SyncEngine): SortedMap<DocumentKey, TargetId>;
export declare function syncEngineGetEnqueuedLimboDocumentResolutions(syncEngine: SyncEngine): Set<string>;
export declare function syncEngineEmitNewSnapsAndNotifyLocalStore(syncEngine: SyncEngine, changes: DocumentMap, remoteEvent?: RemoteEvent): Promise<void>;
export declare function syncEngineHandleCredentialChange(syncEngine: SyncEngine, user: User): Promise<void>;
export declare function syncEngineGetRemoteKeysForTarget(syncEngine: SyncEngine, targetId: TargetId): DocumentKeySet;
/**
 * Retrieves newly changed documents from remote document cache and raises
 * snapshots if needed.
 */
export declare function syncEngineSynchronizeWithChangedDocuments(syncEngine: SyncEngine): Promise<void>;
/** Applies a mutation state to an existing batch.  */
export declare function syncEngineApplyBatchState(syncEngine: SyncEngine, batchId: BatchId, batchState: MutationBatchState, error?: FirestoreError): Promise<void>;
/** Applies a query target change from a different tab. */
export declare function syncEngineApplyPrimaryState(syncEngine: SyncEngine, isPrimary: boolean): Promise<void>;
/** Returns the IDs of the clients that are currently active. */
export declare function syncEngineGetActiveClients(syncEngine: SyncEngine): Promise<ClientId[]>;
/** Applies a query target change from a different tab. */
export declare function syncEngineApplyTargetState(syncEngine: SyncEngine, targetId: TargetId, state: QueryTargetState, error?: FirestoreError): Promise<void>;
/** Adds or removes Watch targets for queries from different tabs. */
export declare function syncEngineApplyActiveTargetsChange(syncEngine: SyncEngine, added: TargetId[], removed: TargetId[]): Promise<void>;
export declare function syncEngineEnsureWriteCallbacks(syncEngine: SyncEngine): SyncEngineImpl;
/**
 * Loads a Firestore bundle into the SDK. The returned promise resolves when
 * the bundle finished loading.
 *
 * @param syncEngine - SyncEngine to use.
 * @param bundleReader - Bundle to load into the SDK.
 * @param task - LoadBundleTask used to update the loading progress to public API.
 */
export declare function syncEngineLoadBundle(syncEngine: SyncEngine, bundleReader: BundleReader, task: LoadBundleTask): void;
export {};
