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
import { User } from '../../../src/auth/user';
import { DatabaseId } from '../../../src/core/database_info';
import { SequenceNumberSyncer } from '../../../src/core/listen_sequence';
import { BatchId, TargetId } from '../../../src/core/types';
import { IndexedDbPersistence } from '../../../src/local/indexeddb_persistence';
import { LocalSerializer } from '../../../src/local/local_serializer';
import { LruParams } from '../../../src/local/lru_garbage_collector';
import { MemoryPersistence } from '../../../src/local/memory_persistence';
import { ClientId } from '../../../src/local/shared_client_state';
import { JsonProtoSerializer } from '../../../src/remote/serializer';
import { AsyncQueue } from '../../../src/util/async_queue';
import { WindowLike } from '../../../src/util/types';
export declare const MOCK_SEQUENCE_NUMBER_SYNCER: SequenceNumberSyncer;
/** The Database ID used by most tests that use a serializer. */
export declare const TEST_PROJECT = "test-project";
export declare const TEST_DATABASE_ID: DatabaseId;
export declare const TEST_PERSISTENCE_KEY = "[PersistenceTestHelpers]";
export declare const TEST_APP_ID = "test-app-id";
/** The persistence prefix used for testing in IndexedBD and LocalStorage. */
export declare const TEST_PERSISTENCE_PREFIX: string;
/**
 * The database name used by tests that access IndexedDb. To be used in
 * conjunction with `TEST_DATABASE_INFO` and
 * `TEST_DATABASE_ID`.
 */
export declare const INDEXEDDB_TEST_DATABASE_NAME: string;
export declare const JSON_SERIALIZER: JsonProtoSerializer;
/**
 * IndexedDb serializer that uses `TEST_DATABASE_ID` as its database
 * id.
 */
export declare const TEST_SERIALIZER: LocalSerializer;
/**
 * Creates and starts an IndexedDbPersistence instance for testing, destroying
 * any previous contents if they existed.
 */
export declare function testIndexedDbPersistence(options?: {
    dontPurgeData?: boolean;
    synchronizeTabs?: boolean;
    queue?: AsyncQueue;
}, lruParams?: LruParams): Promise<IndexedDbPersistence>;
/** Creates and starts a MemoryPersistence instance for testing. */
export declare function testMemoryEagerPersistence(): Promise<MemoryPersistence>;
export declare function testMemoryLruPersistence(params?: LruParams): Promise<MemoryPersistence>;
/** Clears the persistence in tests */
export declare function clearTestPersistence(): Promise<void>;
/**
 * Populates Web Storage with instance data from a pre-existing client.
 */
export declare function populateWebStorage(user: User, window: WindowLike, existingClientId: ClientId, existingMutationBatchIds: BatchId[], existingQueryTargetIds: TargetId[]): Promise<void>;
