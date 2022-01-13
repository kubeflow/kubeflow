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
import { Timestamp } from '../protos/firestore_proto_api';
import { ByteString } from '../util/byte_string';
/**
 * Converts the possible Proto values for a timestamp value into a "seconds and
 * nanos" representation.
 */
export declare function normalizeTimestamp(date: Timestamp): {
    seconds: number;
    nanos: number;
};
/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */
export declare function normalizeNumber(value: number | string | undefined): number;
/** Converts the possible Proto types for Blobs into a ByteString. */
export declare function normalizeByteString(blob: string | Uint8Array): ByteString;
