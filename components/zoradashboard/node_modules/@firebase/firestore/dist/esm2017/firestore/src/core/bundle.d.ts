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
import { LoadBundleTaskProgress } from '@firebase/firestore-types';
import { DocumentMap } from '../model/collections';
import { MutableDocument } from '../model/document';
import { DocumentKey } from '../model/document_key';
import { BundledDocumentMetadata as ProtoBundledDocumentMetadata } from '../protos/firestore_bundle_proto';
import { Document as ApiDocument, Timestamp as ApiTimestamp } from '../protos/firestore_proto_api';
import { Query } from './query';
import { SnapshotVersion } from './snapshot_version';
/**
 * Represents a bundled document, including the metadata and the document
 * itself, if it exists.
 */
export interface BundledDocument {
    metadata: ProtoBundledDocumentMetadata;
    document?: ApiDocument;
}
/**
 * An array of `BundledDocument`.
 */
export declare type BundledDocuments = BundledDocument[];
export declare class BundleLoadResult {
    readonly progress: LoadBundleTaskProgress;
    readonly changedDocs: DocumentMap;
    constructor(progress: LoadBundleTaskProgress, changedDocs: DocumentMap);
}
/**
 * Represents a Firestore bundle saved by the SDK in its local storage.
 */
export interface BundleMetadata {
    /**
     * Id of the bundle. It is used together with `createTime` to determine if a
     * bundle has been loaded by the SDK.
     */
    readonly id: string;
    /** Schema version of the bundle. */
    readonly version: number;
    /**
     * Set to the snapshot version of the bundle if created by the Server SDKs.
     * Otherwise set to SnapshotVersion.MIN.
     */
    readonly createTime: SnapshotVersion;
}
/**
 * Represents a Query saved by the SDK in its local storage.
 */
export interface NamedQuery {
    /** The name of the query. */
    readonly name: string;
    /** The underlying query associated with `name`. */
    readonly query: Query;
    /** The time at which the results for this query were read. */
    readonly readTime: SnapshotVersion;
}
/**
 * Helper to convert objects from bundles to model objects in the SDK.
 */
export interface BundleConverter {
    toDocumentKey(name: string): DocumentKey;
    /**
     * Converts a BundleDocument to a MutableDocument.
     */
    toMutableDocument(bundledDoc: BundledDocument): MutableDocument;
    toSnapshotVersion(time: ApiTimestamp): SnapshotVersion;
}
