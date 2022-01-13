/**
 * @license
 * Copyright 2017 Google LLC
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
import { BatchId, TargetId } from '../core/types';
import { ResourcePath } from '../model/path';
import { BundledQuery } from '../protos/firestore_bundle_proto';
import { Document as ProtoDocument, DocumentsTarget as ProtoDocumentsTarget, QueryTarget as ProtoQueryTarget, Write as ProtoWrite } from '../protos/firestore_proto_api';
import { EncodedResourcePath } from './encoded_resource_path';
/**
 * Schema Version for the Web client:
 * 1.  Initial version including Mutation Queue, Query Cache, and Remote
 *     Document Cache
 * 2.  Used to ensure a targetGlobal object exists and add targetCount to it. No
 *     longer required because migration 3 unconditionally clears it.
 * 3.  Dropped and re-created Query Cache to deal with cache corruption related
 *     to limbo resolution. Addresses
 *     https://github.com/firebase/firebase-ios-sdk/issues/1548
 * 4.  Multi-Tab Support.
 * 5.  Removal of held write acks.
 * 6.  Create document global for tracking document cache size.
 * 7.  Ensure every cached document has a sentinel row with a sequence number.
 * 8.  Add collection-parent index for Collection Group queries.
 * 9.  Change RemoteDocumentChanges store to be keyed by readTime rather than
 *     an auto-incrementing ID. This is required for Index-Free queries.
 * 10. Rewrite the canonical IDs to the explicit Protobuf-based format.
 * 11. Add bundles and named_queries for bundle support.
 */
export declare const SCHEMA_VERSION = 11;
/**
 * Wrapper class to store timestamps (seconds and nanos) in IndexedDb objects.
 */
export declare class DbTimestamp {
    seconds: number;
    nanoseconds: number;
    constructor(seconds: number, nanoseconds: number);
}
/** A timestamp type that can be used in IndexedDb keys. */
export declare type DbTimestampKey = [/* seconds */ number, /* nanos */ number];
export declare type DbPrimaryClientKey = typeof DbPrimaryClient.key;
/**
 * A singleton object to be stored in the 'owner' store in IndexedDb.
 *
 * A given database can have a single primary tab assigned at a given time. That
 * tab must validate that it is still holding the primary lease before every
 * operation that requires locked access. The primary tab should regularly
 * write an updated timestamp to this lease to prevent other tabs from
 * "stealing" the primary lease
 */
export declare class DbPrimaryClient {
    ownerId: string;
    /** Whether to allow shared access from multiple tabs. */
    allowTabSynchronization: boolean;
    leaseTimestampMs: number;
    /**
     * Name of the IndexedDb object store.
     *
     * Note that the name 'owner' is chosen to ensure backwards compatibility with
     * older clients that only supported single locked access to the persistence
     * layer.
     */
    static store: string;
    /**
     * The key string used for the single object that exists in the
     * DbPrimaryClient store.
     */
    static key: string;
    constructor(ownerId: string, 
    /** Whether to allow shared access from multiple tabs. */
    allowTabSynchronization: boolean, leaseTimestampMs: number);
}
/** Object keys in the 'mutationQueues' store are userId strings. */
export declare type DbMutationQueueKey = string;
/**
 * An object to be stored in the 'mutationQueues' store in IndexedDb.
 *
 * Each user gets a single queue of MutationBatches to apply to the server.
 * DbMutationQueue tracks the metadata about the queue.
 */
export declare class DbMutationQueue {
    /**
     * The normalized user ID to which this queue belongs.
     */
    userId: string;
    /**
     * An identifier for the highest numbered batch that has been acknowledged
     * by the server. All MutationBatches in this queue with batchIds less
     * than or equal to this value are considered to have been acknowledged by
     * the server.
     *
     * NOTE: this is deprecated and no longer used by the code.
     */
    lastAcknowledgedBatchId: number;
    /**
     * A stream token that was previously sent by the server.
     *
     * See StreamingWriteRequest in datastore.proto for more details about
     * usage.
     *
     * After sending this token, earlier tokens may not be used anymore so
     * only a single stream token is retained.
     *
     * NOTE: this is deprecated and no longer used by the code.
     */
    lastStreamToken: string;
    /** Name of the IndexedDb object store.  */
    static store: string;
    /** Keys are automatically assigned via the userId property. */
    static keyPath: string;
    constructor(
    /**
     * The normalized user ID to which this queue belongs.
     */
    userId: string, 
    /**
     * An identifier for the highest numbered batch that has been acknowledged
     * by the server. All MutationBatches in this queue with batchIds less
     * than or equal to this value are considered to have been acknowledged by
     * the server.
     *
     * NOTE: this is deprecated and no longer used by the code.
     */
    lastAcknowledgedBatchId: number, 
    /**
     * A stream token that was previously sent by the server.
     *
     * See StreamingWriteRequest in datastore.proto for more details about
     * usage.
     *
     * After sending this token, earlier tokens may not be used anymore so
     * only a single stream token is retained.
     *
     * NOTE: this is deprecated and no longer used by the code.
     */
    lastStreamToken: string);
}
/** The 'mutations' store  is keyed by batch ID. */
export declare type DbMutationBatchKey = BatchId;
/**
 * An object to be stored in the 'mutations' store in IndexedDb.
 *
 * Represents a batch of user-level mutations intended to be sent to the server
 * in a single write. Each user-level batch gets a separate DbMutationBatch
 * with a new batchId.
 */
export declare class DbMutationBatch {
    /**
     * The normalized user ID to which this batch belongs.
     */
    userId: string;
    /**
     * An identifier for this batch, allocated using an auto-generated key.
     */
    batchId: BatchId;
    /**
     * The local write time of the batch, stored as milliseconds since the
     * epoch.
     */
    localWriteTimeMs: number;
    /**
     * A list of "mutations" that represent a partial base state from when this
     * write batch was initially created. During local application of the write
     * batch, these baseMutations are applied prior to the real writes in order
     * to override certain document fields from the remote document cache. This
     * is necessary in the case of non-idempotent writes (e.g. `increment()`
     * transforms) to make sure that the local view of the modified documents
     * doesn't flicker if the remote document cache receives the result of the
     * non-idempotent write before the write is removed from the queue.
     *
     * These mutations are never sent to the backend.
     */
    baseMutations: ProtoWrite[] | undefined;
    /**
     * A list of mutations to apply. All mutations will be applied atomically.
     *
     * Mutations are serialized via toMutation().
     */
    mutations: ProtoWrite[];
    /** Name of the IndexedDb object store.  */
    static store: string;
    /** Keys are automatically assigned via the userId, batchId properties. */
    static keyPath: string;
    /** The index name for lookup of mutations by user. */
    static userMutationsIndex: string;
    /** The user mutations index is keyed by [userId, batchId] pairs. */
    static userMutationsKeyPath: string[];
    constructor(
    /**
     * The normalized user ID to which this batch belongs.
     */
    userId: string, 
    /**
     * An identifier for this batch, allocated using an auto-generated key.
     */
    batchId: BatchId, 
    /**
     * The local write time of the batch, stored as milliseconds since the
     * epoch.
     */
    localWriteTimeMs: number, 
    /**
     * A list of "mutations" that represent a partial base state from when this
     * write batch was initially created. During local application of the write
     * batch, these baseMutations are applied prior to the real writes in order
     * to override certain document fields from the remote document cache. This
     * is necessary in the case of non-idempotent writes (e.g. `increment()`
     * transforms) to make sure that the local view of the modified documents
     * doesn't flicker if the remote document cache receives the result of the
     * non-idempotent write before the write is removed from the queue.
     *
     * These mutations are never sent to the backend.
     */
    baseMutations: ProtoWrite[] | undefined, 
    /**
     * A list of mutations to apply. All mutations will be applied atomically.
     *
     * Mutations are serialized via toMutation().
     */
    mutations: ProtoWrite[]);
}
/**
 * The key for a db document mutation, which is made up of a userID, path, and
 * batchId. Note that the path must be serialized into a form that indexedDB can
 * sort.
 */
export declare type DbDocumentMutationKey = [string, EncodedResourcePath, BatchId];
/**
 * An object to be stored in the 'documentMutations' store in IndexedDb.
 *
 * A manually maintained index of all the mutation batches that affect a given
 * document key. The rows in this table are references based on the contents of
 * DbMutationBatch.mutations.
 */
export declare class DbDocumentMutation {
    static store: string;
    /**
     * Creates a [userId] key for use in the DbDocumentMutations index to iterate
     * over all of a user's document mutations.
     */
    static prefixForUser(userId: string): [string];
    /**
     * Creates a [userId, encodedPath] key for use in the DbDocumentMutations
     * index to iterate over all at document mutations for a given path or lower.
     */
    static prefixForPath(userId: string, path: ResourcePath): [string, EncodedResourcePath];
    /**
     * Creates a full index key of [userId, encodedPath, batchId] for inserting
     * and deleting into the DbDocumentMutations index.
     */
    static key(userId: string, path: ResourcePath, batchId: BatchId): DbDocumentMutationKey;
    /**
     * Because we store all the useful information for this store in the key,
     * there is no useful information to store as the value. The raw (unencoded)
     * path cannot be stored because IndexedDb doesn't store prototype
     * information.
     */
    static PLACEHOLDER: DbDocumentMutation;
    private constructor();
}
/**
 * A key in the 'remoteDocuments' object store is a string array containing the
 * segments that make up the path.
 */
export declare type DbRemoteDocumentKey = string[];
/**
 * Represents the known absence of a document at a particular version.
 * Stored in IndexedDb as part of a DbRemoteDocument object.
 */
export declare class DbNoDocument {
    path: string[];
    readTime: DbTimestamp;
    constructor(path: string[], readTime: DbTimestamp);
}
/**
 * Represents a document that is known to exist but whose data is unknown.
 * Stored in IndexedDb as part of a DbRemoteDocument object.
 */
export declare class DbUnknownDocument {
    path: string[];
    version: DbTimestamp;
    constructor(path: string[], version: DbTimestamp);
}
/**
 * An object to be stored in the 'remoteDocuments' store in IndexedDb.
 * It represents either:
 *
 * - A complete document.
 * - A "no document" representing a document that is known not to exist (at
 * some version).
 * - An "unknown document" representing a document that is known to exist (at
 * some version) but whose contents are unknown.
 *
 * Note: This is the persisted equivalent of a MaybeDocument and could perhaps
 * be made more general if necessary.
 */
export declare class DbRemoteDocument {
    /**
     * Set to an instance of DbUnknownDocument if the data for a document is
     * not known, but it is known that a document exists at the specified
     * version (e.g. it had a successful update applied to it)
     */
    unknownDocument: DbUnknownDocument | null | undefined;
    /**
     * Set to an instance of a DbNoDocument if it is known that no document
     * exists.
     */
    noDocument: DbNoDocument | null;
    /**
     * Set to an instance of a Document if there's a cached version of the
     * document.
     */
    document: ProtoDocument | null;
    /**
     * Documents that were written to the remote document store based on
     * a write acknowledgment are marked with `hasCommittedMutations`. These
     * documents are potentially inconsistent with the backend's copy and use
     * the write's commit version as their document version.
     */
    hasCommittedMutations: boolean | undefined;
    /**
     * When the document was read from the backend. Undefined for data written
     * prior to schema version 9.
     */
    readTime: DbTimestampKey | undefined;
    /**
     * The path of the collection this document is part of. Undefined for data
     * written prior to schema version 9.
     */
    parentPath: string[] | undefined;
    static store: string;
    /**
     * An index that provides access to all entries sorted by read time (which
     * corresponds to the last modification time of each row).
     *
     * This index is used to provide a changelog for Multi-Tab.
     */
    static readTimeIndex: string;
    static readTimeIndexPath: string;
    /**
     * An index that provides access to documents in a collection sorted by read
     * time.
     *
     * This index is used to allow the RemoteDocumentCache to fetch newly changed
     * documents in a collection.
     */
    static collectionReadTimeIndex: string;
    static collectionReadTimeIndexPath: string[];
    constructor(
    /**
     * Set to an instance of DbUnknownDocument if the data for a document is
     * not known, but it is known that a document exists at the specified
     * version (e.g. it had a successful update applied to it)
     */
    unknownDocument: DbUnknownDocument | null | undefined, 
    /**
     * Set to an instance of a DbNoDocument if it is known that no document
     * exists.
     */
    noDocument: DbNoDocument | null, 
    /**
     * Set to an instance of a Document if there's a cached version of the
     * document.
     */
    document: ProtoDocument | null, 
    /**
     * Documents that were written to the remote document store based on
     * a write acknowledgment are marked with `hasCommittedMutations`. These
     * documents are potentially inconsistent with the backend's copy and use
     * the write's commit version as their document version.
     */
    hasCommittedMutations: boolean | undefined, 
    /**
     * When the document was read from the backend. Undefined for data written
     * prior to schema version 9.
     */
    readTime: DbTimestampKey | undefined, 
    /**
     * The path of the collection this document is part of. Undefined for data
     * written prior to schema version 9.
     */
    parentPath: string[] | undefined);
}
/**
 * Contains a single entry that has metadata about the remote document cache.
 */
export declare class DbRemoteDocumentGlobal {
    byteSize: number;
    static store: string;
    static key: string;
    /**
     * @param byteSize - Approximately the total size in bytes of all the
     * documents in the document cache.
     */
    constructor(byteSize: number);
}
export declare type DbRemoteDocumentGlobalKey = typeof DbRemoteDocumentGlobal.key;
/**
 * A key in the 'targets' object store is a targetId of the query.
 */
export declare type DbTargetKey = TargetId;
/**
 * The persisted type for a query nested with in the 'targets' store in
 * IndexedDb. We use the proto definitions for these two kinds of queries in
 * order to avoid writing extra serialization logic.
 */
export declare type DbQuery = ProtoQueryTarget | ProtoDocumentsTarget;
/**
 * An object to be stored in the 'targets' store in IndexedDb.
 *
 * This is based on and should be kept in sync with the proto used in the iOS
 * client.
 *
 * Each query the client listens to against the server is tracked on disk so
 * that the query can be efficiently resumed on restart.
 */
export declare class DbTarget {
    /**
     * An auto-generated sequential numeric identifier for the query.
     *
     * Queries are stored using their canonicalId as the key, but these
     * canonicalIds can be quite long so we additionally assign a unique
     * queryId which can be used by referenced data structures (e.g.
     * indexes) to minimize the on-disk cost.
     */
    targetId: TargetId;
    /**
     * The canonical string representing this query. This is not unique.
     */
    canonicalId: string;
    /**
     * The last readTime received from the Watch Service for this query.
     *
     * This is the same value as TargetChange.read_time in the protos.
     */
    readTime: DbTimestamp;
    /**
     * An opaque, server-assigned token that allows watching a query to be
     * resumed after disconnecting without retransmitting all the data
     * that matches the query. The resume token essentially identifies a
     * point in time from which the server should resume sending results.
     *
     * This is related to the snapshotVersion in that the resumeToken
     * effectively also encodes that value, but the resumeToken is opaque
     * and sometimes encodes additional information.
     *
     * A consequence of this is that the resumeToken should be used when
     * asking the server to reason about where this client is in the watch
     * stream, but the client should use the snapshotVersion for its own
     * purposes.
     *
     * This is the same value as TargetChange.resume_token in the protos.
     */
    resumeToken: string;
    /**
     * A sequence number representing the last time this query was
     * listened to, used for garbage collection purposes.
     *
     * Conventionally this would be a timestamp value, but device-local
     * clocks are unreliable and they must be able to create new listens
     * even while disconnected. Instead this should be a monotonically
     * increasing number that's incremented on each listen call.
     *
     * This is different from the queryId since the queryId is an
     * immutable identifier assigned to the Query on first use while
     * lastListenSequenceNumber is updated every time the query is
     * listened to.
     */
    lastListenSequenceNumber: number;
    /**
     * Denotes the maximum snapshot version at which the associated query view
     * contained no limbo documents.  Undefined for data written prior to
     * schema version 9.
     */
    lastLimboFreeSnapshotVersion: DbTimestamp | undefined;
    /**
     * The query for this target.
     *
     * Because canonical ids are not unique we must store the actual query. We
     * use the proto to have an object we can persist without having to
     * duplicate translation logic to and from a `Query` object.
     */
    query: DbQuery;
    static store: string;
    /** Keys are automatically assigned via the targetId property. */
    static keyPath: string;
    /** The name of the queryTargets index. */
    static queryTargetsIndexName: string;
    /**
     * The index of all canonicalIds to the targets that they match. This is not
     * a unique mapping because canonicalId does not promise a unique name for all
     * possible queries, so we append the targetId to make the mapping unique.
     */
    static queryTargetsKeyPath: string[];
    constructor(
    /**
     * An auto-generated sequential numeric identifier for the query.
     *
     * Queries are stored using their canonicalId as the key, but these
     * canonicalIds can be quite long so we additionally assign a unique
     * queryId which can be used by referenced data structures (e.g.
     * indexes) to minimize the on-disk cost.
     */
    targetId: TargetId, 
    /**
     * The canonical string representing this query. This is not unique.
     */
    canonicalId: string, 
    /**
     * The last readTime received from the Watch Service for this query.
     *
     * This is the same value as TargetChange.read_time in the protos.
     */
    readTime: DbTimestamp, 
    /**
     * An opaque, server-assigned token that allows watching a query to be
     * resumed after disconnecting without retransmitting all the data
     * that matches the query. The resume token essentially identifies a
     * point in time from which the server should resume sending results.
     *
     * This is related to the snapshotVersion in that the resumeToken
     * effectively also encodes that value, but the resumeToken is opaque
     * and sometimes encodes additional information.
     *
     * A consequence of this is that the resumeToken should be used when
     * asking the server to reason about where this client is in the watch
     * stream, but the client should use the snapshotVersion for its own
     * purposes.
     *
     * This is the same value as TargetChange.resume_token in the protos.
     */
    resumeToken: string, 
    /**
     * A sequence number representing the last time this query was
     * listened to, used for garbage collection purposes.
     *
     * Conventionally this would be a timestamp value, but device-local
     * clocks are unreliable and they must be able to create new listens
     * even while disconnected. Instead this should be a monotonically
     * increasing number that's incremented on each listen call.
     *
     * This is different from the queryId since the queryId is an
     * immutable identifier assigned to the Query on first use while
     * lastListenSequenceNumber is updated every time the query is
     * listened to.
     */
    lastListenSequenceNumber: number, 
    /**
     * Denotes the maximum snapshot version at which the associated query view
     * contained no limbo documents.  Undefined for data written prior to
     * schema version 9.
     */
    lastLimboFreeSnapshotVersion: DbTimestamp | undefined, 
    /**
     * The query for this target.
     *
     * Because canonical ids are not unique we must store the actual query. We
     * use the proto to have an object we can persist without having to
     * duplicate translation logic to and from a `Query` object.
     */
    query: DbQuery);
}
/**
 * The key for a DbTargetDocument, containing a targetId and an encoded resource
 * path.
 */
export declare type DbTargetDocumentKey = [TargetId, EncodedResourcePath];
/**
 * An object representing an association between a target and a document, or a
 * sentinel row marking the last sequence number at which a document was used.
 * Each document cached must have a corresponding sentinel row before lru
 * garbage collection is enabled.
 *
 * The target associations and sentinel rows are co-located so that orphaned
 * documents and their sequence numbers can be identified efficiently via a scan
 * of this store.
 */
export declare class DbTargetDocument {
    /**
     * The targetId identifying a target or 0 for a sentinel row.
     */
    targetId: TargetId;
    /**
     * The path to the document, as encoded in the key.
     */
    path: EncodedResourcePath;
    /**
     * If this is a sentinel row, this should be the sequence number of the last
     * time the document specified by `path` was used. Otherwise, it should be
     * `undefined`.
     */
    sequenceNumber?: number | undefined;
    /** Name of the IndexedDb object store.  */
    static store: string;
    /** Keys are automatically assigned via the targetId, path properties. */
    static keyPath: string[];
    /** The index name for the reverse index. */
    static documentTargetsIndex: string;
    /** We also need to create the reverse index for these properties. */
    static documentTargetsKeyPath: string[];
    constructor(
    /**
     * The targetId identifying a target or 0 for a sentinel row.
     */
    targetId: TargetId, 
    /**
     * The path to the document, as encoded in the key.
     */
    path: EncodedResourcePath, 
    /**
     * If this is a sentinel row, this should be the sequence number of the last
     * time the document specified by `path` was used. Otherwise, it should be
     * `undefined`.
     */
    sequenceNumber?: number | undefined);
}
/**
 * The type to represent the single allowed key for the DbTargetGlobal store.
 */
export declare type DbTargetGlobalKey = typeof DbTargetGlobal.key;
/**
 * A record of global state tracked across all Targets, tracked separately
 * to avoid the need for extra indexes.
 *
 * This should be kept in-sync with the proto used in the iOS client.
 */
export declare class DbTargetGlobal {
    /**
     * The highest numbered target id across all targets.
     *
     * See DbTarget.targetId.
     */
    highestTargetId: TargetId;
    /**
     * The highest numbered lastListenSequenceNumber across all targets.
     *
     * See DbTarget.lastListenSequenceNumber.
     */
    highestListenSequenceNumber: number;
    /**
     * A global snapshot version representing the last consistent snapshot we
     * received from the backend. This is monotonically increasing and any
     * snapshots received from the backend prior to this version (e.g. for
     * targets resumed with a resumeToken) should be suppressed (buffered)
     * until the backend has caught up to this snapshot version again. This
     * prevents our cache from ever going backwards in time.
     */
    lastRemoteSnapshotVersion: DbTimestamp;
    /**
     * The number of targets persisted.
     */
    targetCount: number;
    /**
     * The key string used for the single object that exists in the
     * DbTargetGlobal store.
     */
    static key: string;
    static store: string;
    constructor(
    /**
     * The highest numbered target id across all targets.
     *
     * See DbTarget.targetId.
     */
    highestTargetId: TargetId, 
    /**
     * The highest numbered lastListenSequenceNumber across all targets.
     *
     * See DbTarget.lastListenSequenceNumber.
     */
    highestListenSequenceNumber: number, 
    /**
     * A global snapshot version representing the last consistent snapshot we
     * received from the backend. This is monotonically increasing and any
     * snapshots received from the backend prior to this version (e.g. for
     * targets resumed with a resumeToken) should be suppressed (buffered)
     * until the backend has caught up to this snapshot version again. This
     * prevents our cache from ever going backwards in time.
     */
    lastRemoteSnapshotVersion: DbTimestamp, 
    /**
     * The number of targets persisted.
     */
    targetCount: number);
}
/**
 * The key for a DbCollectionParent entry, containing the collection ID
 * and the parent path that contains it. Note that the parent path will be an
 * empty path in the case of root-level collections.
 */
export declare type DbCollectionParentKey = [string, EncodedResourcePath];
/**
 * An object representing an association between a Collection id (e.g. 'messages')
 * to a parent path (e.g. '/chats/123') that contains it as a (sub)collection.
 * This is used to efficiently find all collections to query when performing
 * a Collection Group query.
 */
export declare class DbCollectionParent {
    /**
     * The collectionId (e.g. 'messages')
     */
    collectionId: string;
    /**
     * The path to the parent (either a document location or an empty path for
     * a root-level collection).
     */
    parent: EncodedResourcePath;
    /** Name of the IndexedDb object store. */
    static store: string;
    /** Keys are automatically assigned via the collectionId, parent properties. */
    static keyPath: string[];
    constructor(
    /**
     * The collectionId (e.g. 'messages')
     */
    collectionId: string, 
    /**
     * The path to the parent (either a document location or an empty path for
     * a root-level collection).
     */
    parent: EncodedResourcePath);
}
/**
 * A record of the metadata state of each client.
 *
 * PORTING NOTE: This is used to synchronize multi-tab state and does not need
 * to be ported to iOS or Android.
 */
export declare class DbClientMetadata {
    /** The auto-generated client id assigned at client startup. */
    clientId: string;
    /** The last time this state was updated. */
    updateTimeMs: number;
    /** Whether the client's network connection is enabled. */
    networkEnabled: boolean;
    /** Whether this client is running in a foreground tab. */
    inForeground: boolean;
    /** Name of the IndexedDb object store. */
    static store: string;
    /** Keys are automatically assigned via the clientId properties. */
    static keyPath: string;
    constructor(
    /** The auto-generated client id assigned at client startup. */
    clientId: string, 
    /** The last time this state was updated. */
    updateTimeMs: number, 
    /** Whether the client's network connection is enabled. */
    networkEnabled: boolean, 
    /** Whether this client is running in a foreground tab. */
    inForeground: boolean);
}
/** Object keys in the 'clientMetadata' store are clientId strings. */
export declare type DbClientMetadataKey = string;
export declare type DbBundlesKey = string;
/**
 * A object representing a bundle loaded by the SDK.
 */
export declare class DbBundle {
    /** The ID of the loaded bundle. */
    bundleId: string;
    /** The create time of the loaded bundle. */
    createTime: DbTimestamp;
    /** The schema version of the loaded bundle. */
    version: number;
    /** Name of the IndexedDb object store. */
    static store: string;
    static keyPath: string;
    constructor(
    /** The ID of the loaded bundle. */
    bundleId: string, 
    /** The create time of the loaded bundle. */
    createTime: DbTimestamp, 
    /** The schema version of the loaded bundle. */
    version: number);
}
export declare type DbNamedQueriesKey = string;
/**
 * A object representing a named query loaded by the SDK via a bundle.
 */
export declare class DbNamedQuery {
    /** The name of the query. */
    name: string;
    /** The read time of the results saved in the bundle from the named query. */
    readTime: DbTimestamp;
    /** The query saved in the bundle. */
    bundledQuery: BundledQuery;
    /** Name of the IndexedDb object store. */
    static store: string;
    static keyPath: string;
    constructor(
    /** The name of the query. */
    name: string, 
    /** The read time of the results saved in the bundle from the named query. */
    readTime: DbTimestamp, 
    /** The query saved in the bundle. */
    bundledQuery: BundledQuery);
}
export declare const V1_STORES: string[];
export declare const V3_STORES: string[];
export declare const V4_STORES: string[];
export declare const V6_STORES: string[];
export declare const V8_STORES: string[];
export declare const V11_STORES: string[];
/**
 * The list of all default IndexedDB stores used throughout the SDK. This is
 * used when creating transactions so that access across all stores is done
 * atomically.
 */
export declare const ALL_STORES: string[];
