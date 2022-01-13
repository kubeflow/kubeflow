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
import { DatabaseId } from '../core/database_info';
import { DocumentKey } from '../model/document_key';
import { Value as ProtoValue } from '../protos/firestore_proto_api';
import { ByteString } from '../util/byte_string';
export declare type ServerTimestampBehavior = 'estimate' | 'previous' | 'none';
/**
 * Converts Firestore's internal types to the JavaScript types that we expose
 * to the user.
 *
 * @internal
 */
export declare abstract class AbstractUserDataWriter {
    convertValue(value: ProtoValue, serverTimestampBehavior?: ServerTimestampBehavior): unknown;
    private convertObject;
    private convertGeoPoint;
    private convertArray;
    private convertServerTimestamp;
    private convertTimestamp;
    protected convertDocumentKey(name: string, expectedDatabaseId: DatabaseId): DocumentKey;
    protected abstract convertReference(name: string): unknown;
    protected abstract convertBytes(bytes: ByteString): unknown;
}
