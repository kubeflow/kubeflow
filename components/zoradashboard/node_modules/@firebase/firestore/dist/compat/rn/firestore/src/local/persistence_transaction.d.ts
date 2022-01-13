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
export declare const PRIMARY_LEASE_LOST_ERROR_MSG: string;
/** The different modes supported by `Persistence.runTransaction()`. */
export declare type PersistenceTransactionMode = 'readonly' | 'readwrite' | 'readwrite-primary';
/**
 * A base class representing a persistence transaction, encapsulating both the
 * transaction's sequence numbers as well as a list of onCommitted listeners.
 *
 * When you call Persistence.runTransaction(), it will create a transaction and
 * pass it to your callback. You then pass it to any method that operates
 * on persistence.
 */
export declare abstract class PersistenceTransaction {
    private readonly onCommittedListeners;
    abstract readonly currentSequenceNumber: ListenSequenceNumber;
    addOnCommittedListener(listener: () => void): void;
    raiseOnCommittedEvent(): void;
}
