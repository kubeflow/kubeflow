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
import { LocalSerializer } from './local_serializer';
import { PersistencePromise } from './persistence_promise';
import { SimpleDbSchemaConverter } from './simple_db';
/** Performs database creation and schema upgrades. */
export declare class SchemaConverter implements SimpleDbSchemaConverter {
    private readonly serializer;
    constructor(serializer: LocalSerializer);
    /**
     * Performs database creation and schema upgrades.
     *
     * Note that in production, this method is only ever used to upgrade the schema
     * to SCHEMA_VERSION. Different values of toVersion are only used for testing
     * and local feature development.
     */
    createOrUpgrade(db: IDBDatabase, txn: IDBTransaction, fromVersion: number, toVersion: number): PersistencePromise<void>;
    private addDocumentGlobal;
    private removeAcknowledgedMutations;
    /**
     * Ensures that every document in the remote document cache has a corresponding sentinel row
     * with a sequence number. Missing rows are given the most recently used sequence number.
     */
    private ensureSequenceNumbers;
    private createCollectionParentIndex;
    private rewriteCanonicalIds;
}
