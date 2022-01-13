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
import { Query } from '../../../src/core/query';
import { BatchId } from '../../../src/core/types';
import { MutationQueue } from '../../../src/local/mutation_queue';
import { Persistence } from '../../../src/local/persistence';
import { DocumentKeySet } from '../../../src/model/collections';
import { DocumentKey } from '../../../src/model/document_key';
import { Mutation } from '../../../src/model/mutation';
import { MutationBatch } from '../../../src/model/mutation_batch';
/**
 * A wrapper around a MutationQueue that automatically creates a
 * transaction around every operation to reduce test boilerplate.
 */
export declare class TestMutationQueue {
    persistence: Persistence;
    queue: MutationQueue;
    constructor(persistence: Persistence, queue: MutationQueue);
    checkEmpty(): Promise<boolean>;
    countBatches(): Promise<number>;
    addMutationBatch(mutations: Mutation[]): Promise<MutationBatch>;
    lookupMutationBatch(batchId: BatchId): Promise<MutationBatch | null>;
    getNextMutationBatchAfterBatchId(batchId: BatchId): Promise<MutationBatch | null>;
    getAllMutationBatches(): Promise<MutationBatch[]>;
    getAllMutationBatchesAffectingDocumentKey(documentKey: DocumentKey): Promise<MutationBatch[]>;
    getAllMutationBatchesAffectingDocumentKeys(documentKeys: DocumentKeySet): Promise<MutationBatch[]>;
    getAllMutationBatchesAffectingQuery(query: Query): Promise<MutationBatch[]>;
    removeMutationBatch(batch: MutationBatch): Promise<void>;
}
