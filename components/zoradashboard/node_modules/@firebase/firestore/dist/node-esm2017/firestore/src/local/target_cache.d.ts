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
import { Target } from '../core/target';
import { ListenSequenceNumber, TargetId } from '../core/types';
import { DocumentKeySet } from '../model/collections';
import { DocumentKey } from '../model/document_key';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction } from './persistence_transaction';
import { TargetData } from './target_data';
/**
 * Represents cached targets received from the remote backend.
 *
 * The cache is keyed by `Target` and entries in the cache are `TargetData`
 * instances.
 */
export interface TargetCache {
    /**
     * A global snapshot version representing the last consistent snapshot we
     * received from the backend. This is monotonically increasing and any
     * snapshots received from the backend prior to this version (e.g. for targets
     * resumed with a resume_token) should be suppressed (buffered) until the
     * backend has caught up to this snapshot version again. This prevents our
     * cache from ever going backwards in time.
     *
     * This is updated whenever our we get a TargetChange with a read_time and
     * empty target_ids.
     */
    getLastRemoteSnapshotVersion(transaction: PersistenceTransaction): PersistencePromise<SnapshotVersion>;
    /**
     * @returns The highest sequence number observed, including any that might be
     *         persisted on-disk.
     */
    getHighestSequenceNumber(transaction: PersistenceTransaction): PersistencePromise<ListenSequenceNumber>;
    /**
     * Call provided function with each `TargetData` that we have cached.
     */
    forEachTarget(txn: PersistenceTransaction, f: (q: TargetData) => void): PersistencePromise<void>;
    /**
     * Set the highest listen sequence number and optionally updates the
     * snapshot version of the last consistent snapshot received from the backend
     * (see getLastRemoteSnapshotVersion() for more details).
     *
     * @param highestListenSequenceNumber - The new maximum listen sequence number.
     * @param lastRemoteSnapshotVersion - The new snapshot version. Optional.
     */
    setTargetsMetadata(transaction: PersistenceTransaction, highestListenSequenceNumber: number, lastRemoteSnapshotVersion?: SnapshotVersion): PersistencePromise<void>;
    /**
     * Adds an entry in the cache.
     *
     * The cache key is extracted from `targetData.target`. The key must not already
     * exist in the cache.
     *
     * @param targetData - A TargetData instance to put in the cache.
     */
    addTargetData(transaction: PersistenceTransaction, targetData: TargetData): PersistencePromise<void>;
    /**
     * Updates an entry in the cache.
     *
     * The cache key is extracted from `targetData.target`. The entry must already
     * exist in the cache, and it will be replaced.
     * @param targetData - The TargetData to be replaced into the cache.
     */
    updateTargetData(transaction: PersistenceTransaction, targetData: TargetData): PersistencePromise<void>;
    /**
     * Removes the cached entry for the given target data. It is an error to remove
     * a target data that does not exist.
     *
     * Multi-Tab Note: This operation should only be called by the primary client.
     */
    removeTargetData(transaction: PersistenceTransaction, targetData: TargetData): PersistencePromise<void>;
    /**
     * The number of targets currently in the cache.
     */
    getTargetCount(transaction: PersistenceTransaction): PersistencePromise<number>;
    /**
     * Looks up a TargetData entry by target.
     *
     * @param target - The query target corresponding to the entry to look up.
     * @returns The cached TargetData entry, or null if the cache has no entry for
     * the target.
     */
    getTargetData(transaction: PersistenceTransaction, target: Target): PersistencePromise<TargetData | null>;
    /**
     * Adds the given document keys to cached query results of the given target
     * ID.
     *
     * Multi-Tab Note: This operation should only be called by the primary client.
     */
    addMatchingKeys(transaction: PersistenceTransaction, keys: DocumentKeySet, targetId: TargetId): PersistencePromise<void>;
    /**
     * Removes the given document keys from the cached query results of the
     * given target ID.
     *
     * Multi-Tab Note: This operation should only be called by the primary client.
     */
    removeMatchingKeys(transaction: PersistenceTransaction, keys: DocumentKeySet, targetId: TargetId): PersistencePromise<void>;
    /**
     * Removes all the keys in the query results of the given target ID.
     *
     * Multi-Tab Note: This operation should only be called by the primary client.
     */
    removeMatchingKeysForTargetId(transaction: PersistenceTransaction, targetId: TargetId): PersistencePromise<void>;
    /**
     * Returns the document keys that match the provided target ID.
     */
    getMatchingKeysForTargetId(transaction: PersistenceTransaction, targetId: TargetId): PersistencePromise<DocumentKeySet>;
    /**
     * Returns a new target ID that is higher than any query in the cache. If
     * there are no queries in the cache, returns the first valid target ID.
     * Allocated target IDs are persisted and `allocateTargetId()` will never
     * return the same ID twice.
     */
    allocateTargetId(transaction: PersistenceTransaction): PersistencePromise<TargetId>;
    containsKey(transaction: PersistenceTransaction, key: DocumentKey): PersistencePromise<boolean>;
}
