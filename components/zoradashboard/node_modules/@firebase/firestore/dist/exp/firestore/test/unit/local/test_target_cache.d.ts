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
import { SnapshotVersion } from '../../../src/core/snapshot_version';
import { Target } from '../../../src/core/target';
import { ListenSequenceNumber, TargetId } from '../../../src/core/types';
import { Persistence } from '../../../src/local/persistence';
import { TargetCache } from '../../../src/local/target_cache';
import { TargetData } from '../../../src/local/target_data';
import { DocumentKey } from '../../../src/model/document_key';
/**
 * A wrapper around a TargetCache that automatically creates a
 * transaction around every operation to reduce test boilerplate.
 */
export declare class TestTargetCache {
    persistence: Persistence;
    cache: TargetCache;
    constructor(persistence: Persistence, cache: TargetCache);
    addTargetData(targetData: TargetData): Promise<void>;
    updateTargetData(targetData: TargetData): Promise<void>;
    getTargetCount(): Promise<number>;
    removeTargetData(targetData: TargetData): Promise<void>;
    getTargetData(target: Target): Promise<TargetData | null>;
    getLastRemoteSnapshotVersion(): Promise<SnapshotVersion>;
    getHighestSequenceNumber(): Promise<ListenSequenceNumber>;
    allocateTargetId(): Promise<TargetId>;
    addMatchingKeys(keys: DocumentKey[], targetId: TargetId): Promise<void>;
    removeMatchingKeys(keys: DocumentKey[], targetId: TargetId): Promise<void>;
    getMatchingKeysForTargetId(targetId: TargetId): Promise<DocumentKey[]>;
    removeMatchingKeysForTargetId(targetId: TargetId): Promise<void>;
    containsKey(key: DocumentKey): Promise<boolean>;
    setTargetsMetadata(highestListenSequenceNumber: ListenSequenceNumber, lastRemoteSnapshotVersion?: SnapshotVersion): Promise<void>;
}
