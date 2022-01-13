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
import { ActiveTargets } from './lru_garbage_collector';
import { Persistence } from './persistence';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction } from './persistence_transaction';
import { TargetCache } from './target_cache';
import { TargetData } from './target_data';
export declare class MemoryTargetCache implements TargetCache {
    private readonly persistence;
    /**
     * Maps a target to the data about that target
     */
    private targets;
    /** The last received snapshot version. */
    private lastRemoteSnapshotVersion;
    /** The highest numbered target ID encountered. */
    private highestTargetId;
    /** The highest sequence number encountered. */
    private highestSequenceNumber;
    /**
     * A ordered bidirectional mapping between documents and the remote target
     * IDs.
     */
    private references;
    private targetCount;
    private targetIdGenerator;
    constructor(persistence: Persistence);
    forEachTarget(txn: PersistenceTransaction, f: (q: TargetData) => void): PersistencePromise<void>;
    getLastRemoteSnapshotVersion(transaction: PersistenceTransaction): PersistencePromise<SnapshotVersion>;
    getHighestSequenceNumber(transaction: PersistenceTransaction): PersistencePromise<ListenSequenceNumber>;
    allocateTargetId(transaction: PersistenceTransaction): PersistencePromise<TargetId>;
    setTargetsMetadata(transaction: PersistenceTransaction, highestListenSequenceNumber: number, lastRemoteSnapshotVersion?: SnapshotVersion): PersistencePromise<void>;
    private saveTargetData;
    addTargetData(transaction: PersistenceTransaction, targetData: TargetData): PersistencePromise<void>;
    updateTargetData(transaction: PersistenceTransaction, targetData: TargetData): PersistencePromise<void>;
    removeTargetData(transaction: PersistenceTransaction, targetData: TargetData): PersistencePromise<void>;
    removeTargets(transaction: PersistenceTransaction, upperBound: ListenSequenceNumber, activeTargetIds: ActiveTargets): PersistencePromise<number>;
    getTargetCount(transaction: PersistenceTransaction): PersistencePromise<number>;
    getTargetData(transaction: PersistenceTransaction, target: Target): PersistencePromise<TargetData | null>;
    addMatchingKeys(txn: PersistenceTransaction, keys: DocumentKeySet, targetId: TargetId): PersistencePromise<void>;
    removeMatchingKeys(txn: PersistenceTransaction, keys: DocumentKeySet, targetId: TargetId): PersistencePromise<void>;
    removeMatchingKeysForTargetId(txn: PersistenceTransaction, targetId: TargetId): PersistencePromise<void>;
    getMatchingKeysForTargetId(txn: PersistenceTransaction, targetId: TargetId): PersistencePromise<DocumentKeySet>;
    containsKey(txn: PersistenceTransaction, key: DocumentKey): PersistencePromise<boolean>;
}
