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
import { ParsedSetData, ParsedUpdateData } from '../lite/user_data_reader';
import { Document } from '../model/document';
import { DocumentKey } from '../model/document_key';
import { Datastore } from '../remote/datastore';
/**
 * Internal transaction object responsible for accumulating the mutations to
 * perform and the base versions for any documents read.
 */
export declare class Transaction {
    private datastore;
    private readVersions;
    private mutations;
    private committed;
    /**
     * A deferred usage error that occurred previously in this transaction that
     * will cause the transaction to fail once it actually commits.
     */
    private lastWriteError;
    /**
     * Set of documents that have been written in the transaction.
     *
     * When there's more than one write to the same key in a transaction, any
     * writes after the first are handled differently.
     */
    private writtenDocs;
    constructor(datastore: Datastore);
    lookup(keys: DocumentKey[]): Promise<Document[]>;
    set(key: DocumentKey, data: ParsedSetData): void;
    update(key: DocumentKey, data: ParsedUpdateData): void;
    delete(key: DocumentKey): void;
    commit(): Promise<void>;
    private recordVersion;
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */
    private precondition;
    /**
     * Returns the precondition for a document if the operation is an update.
     */
    private preconditionForUpdate;
    private write;
    private ensureCommitNotCalled;
}
