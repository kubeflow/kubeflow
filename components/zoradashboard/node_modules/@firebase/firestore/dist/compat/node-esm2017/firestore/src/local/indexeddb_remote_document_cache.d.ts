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
import { SnapshotVersion } from '../core/snapshot_version';
import { MutableDocumentMap } from '../model/collections';
import { IndexManager } from './index_manager';
import { LocalSerializer } from './local_serializer';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction } from './persistence_transaction';
import { RemoteDocumentCache } from './remote_document_cache';
export interface IndexedDbRemoteDocumentCache extends RemoteDocumentCache {
}
/**
 * Creates a new IndexedDbRemoteDocumentCache.
 *
 * @param serializer - The document serializer.
 * @param indexManager - The query indexes that need to be maintained.
 */
export declare function newIndexedDbRemoteDocumentCache(serializer: LocalSerializer, indexManager: IndexManager): IndexedDbRemoteDocumentCache;
/**
 * Returns the set of documents that have changed since the specified read
 * time.
 */
export declare function remoteDocumentCacheGetNewDocumentChanges(remoteDocumentCache: IndexedDbRemoteDocumentCache, transaction: PersistenceTransaction, sinceReadTime: SnapshotVersion): PersistencePromise<{
    changedDocs: MutableDocumentMap;
    readTime: SnapshotVersion;
}>;
/**
 * Returns the read time of the most recently read document in the cache, or
 * SnapshotVersion.min() if not available.
 */
export declare function remoteDocumentCacheGetLastReadTime(transaction: PersistenceTransaction): PersistencePromise<SnapshotVersion>;
