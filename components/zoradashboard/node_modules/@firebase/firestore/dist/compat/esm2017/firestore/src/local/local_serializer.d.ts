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
import { BundleMetadata, NamedQuery } from '../core/bundle';
import { Query } from '../core/query';
import { SnapshotVersion } from '../core/snapshot_version';
import { MutableDocument } from '../model/document';
import { MutationBatch } from '../model/mutation_batch';
import { BundleMetadata as ProtoBundleMetadata, NamedQuery as ProtoNamedQuery, BundledQuery as ProtoBundledQuery } from '../protos/firestore_bundle_proto';
import { JsonProtoSerializer } from '../remote/serializer';
import { DbBundle, DbMutationBatch, DbNamedQuery, DbRemoteDocument, DbTarget, DbTimestampKey } from './indexeddb_schema';
import { TargetData } from './target_data';
/** Serializer for values stored in the LocalStore. */
export declare class LocalSerializer {
    readonly remoteSerializer: JsonProtoSerializer;
    constructor(remoteSerializer: JsonProtoSerializer);
}
/** Decodes a remote document from storage locally to a Document. */
export declare function fromDbRemoteDocument(localSerializer: LocalSerializer, remoteDoc: DbRemoteDocument): MutableDocument;
/** Encodes a document for storage locally. */
export declare function toDbRemoteDocument(localSerializer: LocalSerializer, document: MutableDocument, readTime: SnapshotVersion): DbRemoteDocument;
export declare function toDbTimestampKey(snapshotVersion: SnapshotVersion): DbTimestampKey;
export declare function fromDbTimestampKey(dbTimestampKey: DbTimestampKey): SnapshotVersion;
/** Encodes a batch of mutations into a DbMutationBatch for local storage. */
export declare function toDbMutationBatch(localSerializer: LocalSerializer, userId: string, batch: MutationBatch): DbMutationBatch;
/** Decodes a DbMutationBatch into a MutationBatch */
export declare function fromDbMutationBatch(localSerializer: LocalSerializer, dbBatch: DbMutationBatch): MutationBatch;
/** Decodes a DbTarget into TargetData */
export declare function fromDbTarget(dbTarget: DbTarget): TargetData;
/** Encodes TargetData into a DbTarget for storage locally. */
export declare function toDbTarget(localSerializer: LocalSerializer, targetData: TargetData): DbTarget;
/** Encodes a DbBundle to a BundleMetadata object. */
export declare function fromDbBundle(dbBundle: DbBundle): BundleMetadata;
/** Encodes a BundleMetadata to a DbBundle. */
export declare function toDbBundle(metadata: ProtoBundleMetadata): DbBundle;
/** Encodes a DbNamedQuery to a NamedQuery. */
export declare function fromDbNamedQuery(dbNamedQuery: DbNamedQuery): NamedQuery;
/** Encodes a NamedQuery from a bundle proto to a DbNamedQuery. */
export declare function toDbNamedQuery(query: ProtoNamedQuery): DbNamedQuery;
/**
 * Encodes a `BundledQuery` from bundle proto to a Query object.
 *
 * This reconstructs the original query used to build the bundle being loaded,
 * including features exists only in SDKs (for example: limit-to-last).
 */
export declare function fromBundledQuery(bundledQuery: ProtoBundledQuery): Query;
/** Encodes a NamedQuery proto object to a NamedQuery model object. */
export declare function fromProtoNamedQuery(namedQuery: ProtoNamedQuery): NamedQuery;
/** Decodes a BundleMetadata proto into a BundleMetadata object. */
export declare function fromBundleMetadata(metadata: ProtoBundleMetadata): BundleMetadata;
