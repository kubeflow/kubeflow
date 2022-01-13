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
import { IndexedDbLruDelegate } from './indexeddb_lru_delegate';
import { DbTargetDocument, DbTargetDocumentKey } from './indexeddb_schema';
import { LocalSerializer } from './local_serializer';
import { ActiveTargets } from './lru_garbage_collector';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction } from './persistence_transaction';
import { SimpleDbStore } from './simple_db';
import { TargetCache } from './target_cache';
import { TargetData } from './target_data';
export declare class IndexedDbTargetCache implements TargetCache {
    private readonly referenceDelegate;
    private serializer;
    constructor(referenceDelegate: IndexedDbLruDelegate, serializer: LocalSerializer);
    allocateTargetId(transaction: PersistenceTransaction): PersistencePromise<TargetId>;
    getLastRemoteSnapshotVersion(transaction: PersistenceTransaction): PersistencePromise<SnapshotVersion>;
    getHighestSequenceNumber(transaction: PersistenceTransaction): PersistencePromise<ListenSequenceNumber>;
    setTargetsMetadata(transaction: PersistenceTransaction, highestListenSequenceNumber: number, lastRemoteSnapshotVersion?: SnapshotVersion): PersistencePromise<void>;
    addTargetData(transaction: PersistenceTransaction, targetData: TargetData): PersistencePromise<void>;
    updateTargetData(transaction: PersistenceTransaction, targetData: TargetData): PersistencePromise<void>;
    removeTargetData(transaction: PersistenceTransaction, targetData: TargetData): PersistencePromise<void>;
    /**
     * Drops any targets with sequence number less than or equal to the upper bound, excepting those
     * present in `activeTargetIds`. Document associations for the removed targets are also removed.
     * Returns the number of targets removed.
     */
    removeTargets(txn: PersistenceTransaction, upperBound: ListenSequenceNumber, activeTargetIds: ActiveTargets): PersistencePromise<number>;
    /**
     * Call provided function with each `TargetData` that we have cached.
     */
    forEachTarget(txn: PersistenceTransaction, f: (q: TargetData) => void): PersistencePromise<void>;
    private retrieveMetadata;
    private saveMetadata;
    private saveTargetData;
    /**
     * In-place updates the provided metadata to account for values in the given
     * TargetData. Saving is done separately. Returns true if there were any
     * changes to the metadata.
     */
    private updateMetadataFromTargetData;
    getTargetCount(transaction: PersistenceTransaction): PersistencePromise<number>;
    getTargetData(transaction: PersistenceTransaction, target: Target): PersistencePromise<TargetData | null>;
    addMatchingKeys(txn: PersistenceTransaction, keys: DocumentKeySet, targetId: TargetId): PersistencePromise<void>;
    removeMatchingKeys(txn: PersistenceTransaction, keys: DocumentKeySet, targetId: TargetId): PersistencePromise<void>;
    removeMatchingKeysForTargetId(txn: PersistenceTransaction, targetId: TargetId): PersistencePromise<void>;
    getMatchingKeysForTargetId(txn: PersistenceTransaction, targetId: TargetId): PersistencePromise<DocumentKeySet>;
    containsKey(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<boolean>;
    /**
     * Looks up a TargetData entry by target ID.
     *
     * @param targetId - The target ID of the TargetData entry to look up.
     * @returns The cached TargetData entry, or null if the cache has no entry for
     * the target.
     */
    getTargetDataForTarget(transaction: PersistenceTransaction, targetId: TargetId): PersistencePromise<TargetData | null>;
}
/**
 * Helper to get a typed SimpleDbStore for the document target object store.
 */
export declare function documentTargetStore(txn: PersistenceTransaction): SimpleDbStore<DbTargetDocumentKey, DbTargetDocument>;
