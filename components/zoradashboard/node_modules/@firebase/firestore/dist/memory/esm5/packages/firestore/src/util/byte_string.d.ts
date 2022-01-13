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
/**
 * Immutable class that represents a "proto" byte string.
 *
 * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
 * sent on the wire. This class abstracts away this differentiation by holding
 * the proto byte string in a common class that must be converted into a string
 * before being sent as a proto.
 */
export declare class ByteString {
    private readonly binaryString;
    static readonly EMPTY_BYTE_STRING: ByteString;
    private constructor();
    static fromBase64String(base64: string): ByteString;
    static fromUint8Array(array: Uint8Array): ByteString;
    toBase64(): string;
    toUint8Array(): Uint8Array;
    approximateByteSize(): number;
    compareTo(other: ByteString): number;
    isEqual(other: ByteString): boolean;
}
/**
 * Helper function to convert an Uint8array to a binary string.
 */
export declare function binaryStringFromUint8Array(array: Uint8Array): string;
/**
 * Helper function to convert a binary string to an Uint8Array.
 */
export declare function uint8ArrayFromBinaryString(binaryString: string): Uint8Array;
