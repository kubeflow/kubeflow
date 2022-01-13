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
import * as firestore from '@firebase/firestore-types';
import { CredentialChangeListener, CredentialsProvider, EmptyCredentialsProvider } from '../../../src/api/credentials';
import { User } from '../../../src/auth/user';
import { DatabaseInfo } from '../../../src/core/database_info';
import { Datastore } from '../../../src/remote/datastore';
import { AsyncQueue } from '../../../src/util/async_queue';
import { AsyncQueueImpl } from '../../../src/util/async_queue_impl';
export declare function asyncQueue(db: firestore.FirebaseFirestore): AsyncQueueImpl;
export declare function getDefaultDatabaseInfo(): DatabaseInfo;
export declare function withTestDatastore(fn: (datastore: Datastore) => Promise<void>, credentialsProvider?: CredentialsProvider): Promise<void>;
export declare class MockCredentialsProvider extends EmptyCredentialsProvider {
    private listener;
    private asyncQueue;
    triggerUserChange(newUser: User): void;
    setChangeListener(asyncQueue: AsyncQueue, listener: CredentialChangeListener): void;
}
export declare function withMockCredentialProviderTestDb(persistence: boolean, fn: (db: firestore.FirebaseFirestore, mockCredential: MockCredentialsProvider) => Promise<void>): Promise<void>;
