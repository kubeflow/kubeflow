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
import { Timestamp } from '../lite/timestamp';
import { Value as ProtoValue } from '../protos/firestore_proto_api';
export declare function isServerTimestamp(value: ProtoValue | null): boolean;
/**
 * Creates a new ServerTimestamp proto value (using the internal format).
 */
export declare function serverTimestamp(localWriteTime: Timestamp, previousValue: ProtoValue | null): ProtoValue;
/**
 * Returns the value of the field before this ServerTimestamp was set.
 *
 * Preserving the previous values allows the user to display the last resoled
 * value until the backend responds with the timestamp.
 */
export declare function getPreviousValue(value: ProtoValue): ProtoValue | null;
/**
 * Returns the local time at which this timestamp was first set.
 */
export declare function getLocalWriteTime(value: ProtoValue): Timestamp;
