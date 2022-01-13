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
import { BundleConverter, BundledDocuments, NamedQuery } from '../core/bundle';
import { Query } from '../core/query';
import { SnapshotVersion } from '../core/snapshot_version';
import { Target } from '../core/target';
import { BatchId, TargetId } from '../core/types';
import { DocumentKeySet, DocumentMap } from '../model/collections';
import { Document } from '../model/document';
import { DocumentKey } from '../model/document_key';
import { Mutation } from '../model/mutation';
import { MutationBatch, MutationBatchResult } from '../model/mutation_batch';
import { BundleMetadata, NamedQuery as ProtoNamedQuery } from '../protos/firestore_bundle_proto';
import { RemoteEvent } from '../remote/remote_event';
import { JsonProtoSerializer } from '../remote/serializer';
import { LocalStore } from './local_store';
import { LocalViewChanges } from './local_view_changes';
import { Persistence } from './persistence';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction } from './persistence_transaction';
import { QueryEngine } from './query_engine';
import { ClientId } from './shared_client_state';
import { TargetData } from './target_data';
export declare const LOG_TAG = "LocalStore";
/** The result of a write to the local store. */
export interface LocalWriteResult {
    batchId: BatchId;
    changes: DocumentMap;
}
/** The result of a user-change operation in the local store. */
export interface UserChangeResult {
    readonly affectedDocuments: DocumentMap;
    readonly removedBatchIds: BatchId[];
    readonly addedBatchIds: BatchId[];
}
/** The result of executing a query against the local store. */
export interface QueryResult {
    readonly documents: DocumentMap;
    readonly remoteKeys: DocumentKeySet;
}
export declare function newLocalStore(
/** Manages our in-memory or durable persistence. */
persistence: Persistence, queryEngine: QueryEngine, initialUser: User, serializer: JsonProtoSerializer): LocalStore;
/**
 * Tells the LocalStore that the currently authenticated user has changed.
 *
 * In response the local store switches the mutation queue to the new user and
 * returns any resulting document changes.
 */
export declare function localStoreHandleUserChange(localStore: LocalStore, user: User): Promise<UserChangeResult>;
export declare function localStoreWriteLocally(localStore: LocalStore, mutations: Mutation[]): Promise<LocalWriteResult>;
/**
 * Acknowledges the given batch.
 *
 * On the happy path when a batch is acknowledged, the local store will
 *
 *  + remove the batch from the mutation queue;
 *  + apply the changes to the remote document cache;
 *  + recalculate the latency compensated view implied by those changes (there
 *    may be mutations in the queue that affect the documents but haven't been
 *    acknowledged yet); and
 *  + give the changed documents back the sync engine
 *
 * @returns The resulting (modified) documents.
 */
export declare function localStoreAcknowledgeBatch(localStore: LocalStore, batchResult: MutationBatchResult): Promise<DocumentMap>;
/**
 * Removes mutations from the MutationQueue for the specified batch;
 * LocalDocuments will be recalculated.
 *
 * @returns The resulting modified documents.
 */
export declare function localStoreRejectBatch(localStore: LocalStore, batchId: BatchId): Promise<DocumentMap>;
/**
 * Returns the largest (latest) batch id in mutation queue that is pending
 * server response.
 *
 * Returns `BATCHID_UNKNOWN` if the queue is empty.
 */
export declare function localStoreGetHighestUnacknowledgedBatchId(localStore: LocalStore): Promise<BatchId>;
/**
 * Returns the last consistent snapshot processed (used by the RemoteStore to
 * determine whether to buffer incoming snapshots from the backend).
 */
export declare function localStoreGetLastRemoteSnapshotVersion(localStore: LocalStore): Promise<SnapshotVersion>;
/**
 * Updates the "ground-state" (remote) documents. We assume that the remote
 * event reflects any write batches that have been acknowledged or rejected
 * (i.e. we do not re-apply local mutations to updates from this event).
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */
export declare function localStoreApplyRemoteEventToLocalCache(localStore: LocalStore, remoteEvent: RemoteEvent): Promise<DocumentMap>;
/**
 * Notifies local store of the changed views to locally pin documents.
 */
export declare function localStoreNotifyLocalViewChanges(localStore: LocalStore, viewChanges: LocalViewChanges[]): Promise<void>;
/**
 * Gets the mutation batch after the passed in batchId in the mutation queue
 * or null if empty.
 * @param afterBatchId - If provided, the batch to search after.
 * @returns The next mutation or null if there wasn't one.
 */
export declare function localStoreGetNextMutationBatch(localStore: LocalStore, afterBatchId?: BatchId): Promise<MutationBatch | null>;
/**
 * Reads the current value of a Document with a given key or null if not
 * found - used for testing.
 */
export declare function localStoreReadDocument(localStore: LocalStore, key: DocumentKey): Promise<Document>;
/**
 * Assigns the given target an internal ID so that its results can be pinned so
 * they don't get GC'd. A target must be allocated in the local store before
 * the store can be used to manage its view.
 *
 * Allocating an already allocated `Target` will return the existing `TargetData`
 * for that `Target`.
 */
export declare function localStoreAllocateTarget(localStore: LocalStore, target: Target): Promise<TargetData>;
/**
 * Returns the TargetData as seen by the LocalStore, including updates that may
 * have not yet been persisted to the TargetCache.
 */
export declare function localStoreGetTargetData(localStore: LocalStore, transaction: PersistenceTransaction, target: Target): PersistencePromise<TargetData | null>;
/**
 * Unpins all the documents associated with the given target. If
 * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
 * directly removes the associated target data from the target cache.
 *
 * Releasing a non-existing `Target` is a no-op.
 */
export declare function localStoreReleaseTarget(localStore: LocalStore, targetId: number, keepPersistedTargetData: boolean): Promise<void>;
/**
 * Runs the specified query against the local store and returns the results,
 * potentially taking advantage of query data from previous executions (such
 * as the set of remote keys).
 *
 * @param usePreviousResults - Whether results from previous executions can
 * be used to optimize this query execution.
 */
export declare function localStoreExecuteQuery(localStore: LocalStore, query: Query, usePreviousResults: boolean): Promise<QueryResult>;
/** Returns the local view of the documents affected by a mutation batch. */
export declare function localStoreLookupMutationDocuments(localStore: LocalStore, batchId: BatchId): Promise<DocumentMap | null>;
export declare function localStoreRemoveCachedMutationBatchMetadata(localStore: LocalStore, batchId: BatchId): void;
export declare function localStoreGetActiveClients(localStore: LocalStore): Promise<ClientId[]>;
export declare function localStoreGetCachedTarget(localStore: LocalStore, targetId: TargetId): Promise<Target | null>;
/**
 * Returns the set of documents that have been updated since the last call.
 * If this is the first call, returns the set of changes since client
 * initialization. Further invocations will return document that have changed
 * since the prior call.
 */
export declare function localStoreGetNewDocumentChanges(localStore: LocalStore): Promise<DocumentMap>;
/**
 * Reads the newest document change from persistence and moves the internal
 * synchronization marker forward so that calls to `getNewDocumentChanges()`
 * only return changes that happened after client initialization.
 */
export declare function localStoreSynchronizeLastDocumentChangeReadTime(localStore: LocalStore): Promise<void>;
/**
 * Applies the documents from a bundle to the "ground-state" (remote)
 * documents.
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */
export declare function localStoreApplyBundledDocuments(localStore: LocalStore, bundleConverter: BundleConverter, documents: BundledDocuments, bundleName: string): Promise<DocumentMap>;
/**
 * Returns a promise of a boolean to indicate if the given bundle has already
 * been loaded and the create time is newer than the current loading bundle.
 */
export declare function localStoreHasNewerBundle(localStore: LocalStore, bundleMetadata: BundleMetadata): Promise<boolean>;
/**
 * Saves the given `BundleMetadata` to local persistence.
 */
export declare function localStoreSaveBundle(localStore: LocalStore, bundleMetadata: BundleMetadata): Promise<void>;
/**
 * Returns a promise of a `NamedQuery` associated with given query name. Promise
 * resolves to undefined if no persisted data can be found.
 */
export declare function localStoreGetNamedQuery(localStore: LocalStore, queryName: string): Promise<NamedQuery | undefined>;
/**
 * Saves the given `NamedQuery` to local persistence.
 */
export declare function localStoreSaveNamedQuery(localStore: LocalStore, query: ProtoNamedQuery, documents?: DocumentKeySet): Promise<void>;
