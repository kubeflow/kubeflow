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
import { DatabaseId } from '../../../src/core/database_info';
import { Query } from '../../../src/core/query';
import { DocumentKey } from '../../../src/model/document_key';
import { BundleElement } from '../../../src/protos/firestore_bundle_proto';
import * as api from '../../../src/protos/firestore_proto_api';
import { Value } from '../../../src/protos/firestore_proto_api';
export declare const encoder: TextEncoder;
export declare class TestBundleBuilder {
    private databaseId;
    readonly elements: BundleElement[];
    private serializer;
    constructor(databaseId: DatabaseId);
    addDocumentMetadata(docKey: DocumentKey, readTime: api.Timestamp, exists: boolean): TestBundleBuilder;
    addDocument(docKey: DocumentKey, createTime: api.Timestamp, updateTime: api.Timestamp, fields: api.ApiClientObjectMap<Value>): TestBundleBuilder;
    addNamedQuery(name: string, readTime: api.Timestamp, query: Query): TestBundleBuilder;
    getMetadataElement(id: string, createTime: api.Timestamp, version?: number): BundleElement;
    build(id: string, createTime: api.Timestamp, version?: number): string;
}
export declare const meta: BundleElement;
export declare const metaString: string;
export declare const doc1Meta: BundleElement;
export declare const doc1MetaString: string;
export declare const doc1: BundleElement;
export declare const doc1String: string;
export declare const doc2Meta: BundleElement;
export declare const doc2MetaString: string;
export declare const doc2: BundleElement;
export declare const doc2String: string;
export declare const noDocMeta: BundleElement;
export declare const noDocMetaString: string;
export declare const limitQuery: BundleElement;
export declare const limitQueryString: string;
export declare const limitToLastQuery: BundleElement;
export declare const limitToLastQueryString: string;
