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
import { DocumentKey } from '../model/document_key';
import { DbRemoteDocument } from './indexeddb_schema';
import { PersistencePromise } from './persistence_promise';
import { SimpleDbTransaction } from './simple_db';
/**
 * Delete a mutation batch and the associated document mutations.
 * @returns A PersistencePromise of the document mutations that were removed.
 */
export declare function removeMutationBatch(txn: SimpleDbTransaction, userId: string, batch: {
    batchId: number;
    mutations: Array<{
        key: DocumentKey;
    }>;
}): PersistencePromise<DocumentKey[]>;
/**
 * Returns an approximate size for the given document.
 */
export declare function dbDocumentSize(doc: DbRemoteDocument | null): number;
