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
import { BundleMetadata, NamedQuery } from '../core/bundle';
import { BundleMetadata as ProtoBundleMetadata, NamedQuery as ProtoNamedQuery } from '../protos/firestore_bundle_proto';
import { BundleCache } from './bundle_cache';
import { PersistencePromise } from './persistence_promise';
import { PersistenceTransaction } from './persistence_transaction';
export declare class IndexedDbBundleCache implements BundleCache {
    getBundleMetadata(transaction: PersistenceTransaction, bundleId: string): PersistencePromise<BundleMetadata | undefined>;
    saveBundleMetadata(transaction: PersistenceTransaction, bundleMetadata: ProtoBundleMetadata): PersistencePromise<void>;
    getNamedQuery(transaction: PersistenceTransaction, queryName: string): PersistencePromise<NamedQuery | undefined>;
    saveNamedQuery(transaction: PersistenceTransaction, query: ProtoNamedQuery): PersistencePromise<void>;
}
