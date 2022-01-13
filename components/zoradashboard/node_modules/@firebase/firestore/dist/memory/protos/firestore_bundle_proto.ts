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

import { StructuredQuery, Timestamp, Document } from './firestore_proto_api';

/** Properties of a BundledQuery. */
export interface BundledQuery {
  /** BundledQuery parent */
  parent?: string | null;

  /** BundledQuery structuredQuery */
  structuredQuery?: StructuredQuery | null;

  /** BundledQuery limitType */
  limitType?: LimitType | null;
}

/** LimitType enum. */
export type LimitType = 'FIRST' | 'LAST';

/** Properties of a NamedQuery. */
export interface NamedQuery {
  /** NamedQuery name */
  name?: string | null;

  /** NamedQuery bundledQuery */
  bundledQuery?: BundledQuery | null;

  /** NamedQuery readTime */
  readTime?: Timestamp | null;
}

/** Properties of a BundledDocumentMetadata. */
export interface BundledDocumentMetadata {
  /** BundledDocumentMetadata name */
  name?: string | null;

  /** BundledDocumentMetadata readTime */
  readTime?: Timestamp | null;

  /** BundledDocumentMetadata exists */
  exists?: boolean | null;

  /** The names of the queries in this bundle that this document matches to. */
  queries?: string[];
}

/** Properties of a BundleMetadata. */
export interface BundleMetadata {
  /** BundleMetadata id */
  id?: string | null;

  /** BundleMetadata createTime */
  createTime?: Timestamp | null;

  /** BundleMetadata version */
  version?: number | null;

  /** BundleMetadata totalDocuments */
  totalDocuments?: number | null;

  /** BundleMetadata totalBytes */
  totalBytes?: number | null;
}

/** Properties of a BundleElement. */
export interface BundleElement {
  /** BundleElement metadata */
  metadata?: BundleMetadata | null;

  /** BundleElement namedQuery */
  namedQuery?: NamedQuery | null;

  /** BundleElement documentMetadata */
  documentMetadata?: BundledDocumentMetadata | null;

  /** BundleElement document */
  document?: Document | null;
}
