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
import { Document } from '../model/document';
import { DocumentKey } from '../model/document_key';
import { IndexManager } from './index_manager';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction } from './persistence_transaction';
import { RemoteDocumentCache } from './remote_document_cache';
export declare type DocumentSizer = (doc: Document) => number;
export interface MemoryRemoteDocumentCache extends RemoteDocumentCache {
    forEachDocumentKey(transaction: PersistenceTransaction, f: (key: DocumentKey) => PersistencePromise<void>): PersistencePromise<void>;
}
/**
 * Creates a new memory-only RemoteDocumentCache.
 *
 * @param indexManager - A class that manages collection group indices.
 * @param sizer - Used to assess the size of a document. For eager GC, this is
 * expected to just return 0 to avoid unnecessarily doing the work of
 * calculating the size.
 */
export declare function newMemoryRemoteDocumentCache(indexManager: IndexManager, sizer: DocumentSizer): MemoryRemoteDocumentCache;
