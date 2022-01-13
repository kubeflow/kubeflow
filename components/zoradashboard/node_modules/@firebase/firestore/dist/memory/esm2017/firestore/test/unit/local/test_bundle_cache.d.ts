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
import { BundleMetadata, NamedQuery } from '../../../src/core/bundle';
import { Persistence } from '../../../src/local/persistence';
import { NamedQuery as ProtoNamedQuery, BundleMetadata as ProtoBundleMetadata } from '../../../src/protos/firestore_bundle_proto';
/**
 * A wrapper around a BundleCache that automatically creates a
 * transaction around every operation to reduce test boilerplate.
 */
export declare class TestBundleCache {
    private readonly persistence;
    private readonly cache;
    constructor(persistence: Persistence);
    getBundleMetadata(bundleId: string): Promise<BundleMetadata | undefined>;
    saveBundleMetadata(metadata: ProtoBundleMetadata): Promise<void>;
    getNamedQuery(name: string): Promise<NamedQuery | undefined>;
    setNamedQuery(query: ProtoNamedQuery): Promise<void>;
}
