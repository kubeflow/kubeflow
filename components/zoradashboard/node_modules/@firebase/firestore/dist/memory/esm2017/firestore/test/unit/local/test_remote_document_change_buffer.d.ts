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
import { SnapshotVersion } from '../../../src/core/snapshot_version';
import { Persistence } from '../../../src/local/persistence';
import { RemoteDocumentChangeBuffer } from '../../../src/local/remote_document_change_buffer';
import { MutableDocument } from '../../../src/model/document';
import { DocumentKey } from '../../../src/model/document_key';
/**
 * A wrapper around a RemoteDocumentChangeBuffer that automatically creates a
 * transaction around operations to reduce test boilerplate.
 */
export declare class TestRemoteDocumentChangeBuffer {
    persistence: Persistence;
    buffer: RemoteDocumentChangeBuffer;
    constructor(persistence: Persistence, buffer: RemoteDocumentChangeBuffer);
    addEntry(document: MutableDocument, readTime: SnapshotVersion): void;
    removeEntry(key: DocumentKey): void;
    getEntry(documentKey: DocumentKey): Promise<MutableDocument>;
    apply(): Promise<void>;
}
