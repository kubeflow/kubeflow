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
import { ListenSequenceNumber } from '../core/types';
import { PersistenceTransaction } from './persistence_transaction';
import { SimpleDbStore, SimpleDbTransaction } from './simple_db';
export declare class IndexedDbTransaction extends PersistenceTransaction {
    readonly simpleDbTransaction: SimpleDbTransaction;
    readonly currentSequenceNumber: ListenSequenceNumber;
    constructor(simpleDbTransaction: SimpleDbTransaction, currentSequenceNumber: ListenSequenceNumber);
}
export declare function getStore<Key extends IDBValidKey, Value>(txn: PersistenceTransaction, store: string): SimpleDbStore<Key, Value>;
