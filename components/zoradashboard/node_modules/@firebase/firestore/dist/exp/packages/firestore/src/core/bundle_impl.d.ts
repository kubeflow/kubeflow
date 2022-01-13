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
import { LocalStore } from '../local/local_store';
import { MutableDocument } from '../model/document';
import { DocumentKey } from '../model/document_key';
import { BundleMetadata as ProtoBundleMetadata } from '../protos/firestore_bundle_proto';
import { Timestamp as ApiTimestamp } from '../protos/firestore_proto_api';
import { JsonProtoSerializer } from '../remote/serializer';
import { SizedBundleElement } from '../util/bundle_reader';
import { BundleConverter, BundledDocument, BundleLoadResult } from './bundle';
import { SnapshotVersion } from './snapshot_version';
/**
 * Helper to convert objects from bundles to model objects in the SDK.
 */
export declare class BundleConverterImpl implements BundleConverter {
    private readonly serializer;
    constructor(serializer: JsonProtoSerializer);
    toDocumentKey(name: string): DocumentKey;
    /**
     * Converts a BundleDocument to a MutableDocument.
     */
    toMutableDocument(bundledDoc: BundledDocument): MutableDocument;
    toSnapshotVersion(time: ApiTimestamp): SnapshotVersion;
}
/**
 * A class to process the elements from a bundle, load them into local
 * storage and provide progress update while loading.
 */
export declare class BundleLoader {
    private bundleMetadata;
    private localStore;
    private serializer;
    /** The current progress of loading */
    private progress;
    /** Batched queries to be saved into storage */
    private queries;
    /** Batched documents to be saved into storage */
    private documents;
    constructor(bundleMetadata: ProtoBundleMetadata, localStore: LocalStore, serializer: JsonProtoSerializer);
    /**
     * Adds an element from the bundle to the loader.
     *
     * Returns a new progress if adding the element leads to a new progress,
     * otherwise returns null.
     */
    addSizedElement(element: SizedBundleElement): LoadBundleTaskProgress | null;
    private getQueryDocumentMapping;
    /**
     * Update the progress to 'Success' and return the updated progress.
     */
    complete(): Promise<BundleLoadResult>;
}
/**
 * Returns a `LoadBundleTaskProgress` representing the initial progress of
 * loading a bundle.
 */
export declare function bundleInitialProgress(metadata: ProtoBundleMetadata): LoadBundleTaskProgress;
/**
 * Returns a `LoadBundleTaskProgress` representing the progress that the loading
 * has succeeded.
 */
export declare function bundleSuccessProgress(metadata: ProtoBundleMetadata): LoadBundleTaskProgress;
