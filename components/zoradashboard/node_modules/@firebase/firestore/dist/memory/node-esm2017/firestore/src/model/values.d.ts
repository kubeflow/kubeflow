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
import { ArrayValue, MapValue, Value } from '../protos/firestore_proto_api';
import { DocumentKey } from './document_key';
import { TypeOrder } from './type_order';
/** Extracts the backend's type order for the provided value. */
export declare function typeOrder(value: Value): TypeOrder;
/** Tests `left` and `right` for equality based on the backend semantics. */
export declare function valueEquals(left: Value, right: Value): boolean;
export declare function numberEquals(left: Value, right: Value): boolean;
/** Returns true if the ArrayValue contains the specified element. */
export declare function arrayValueContains(haystack: ArrayValue, needle: Value): boolean;
export declare function valueCompare(left: Value, right: Value): number;
/**
 * Generates the canonical ID for the provided field value (as used in Target
 * serialization).
 */
export declare function canonicalId(value: Value): string;
/**
 * Returns an approximate (and wildly inaccurate) in-memory size for the field
 * value.
 *
 * The memory size takes into account only the actual user data as it resides
 * in memory and ignores object overhead.
 */
export declare function estimateByteSize(value: Value): number;
/** Returns a reference value for the provided database and key. */
export declare function refValue(databaseId: DatabaseId, key: DocumentKey): Value;
/** Returns true if `value` is an IntegerValue . */
export declare function isInteger(value?: Value | null): value is {
    integerValue: string | number;
};
/** Returns true if `value` is a DoubleValue. */
export declare function isDouble(value?: Value | null): value is {
    doubleValue: string | number;
};
/** Returns true if `value` is either an IntegerValue or a DoubleValue. */
export declare function isNumber(value?: Value | null): boolean;
/** Returns true if `value` is an ArrayValue. */
export declare function isArray(value?: Value | null): value is {
    arrayValue: ArrayValue;
};
/** Returns true if `value` is a ReferenceValue. */
export declare function isReferenceValue(value?: Value | null): value is {
    referenceValue: string;
};
/** Returns true if `value` is a NullValue. */
export declare function isNullValue(value?: Value | null): value is {
    nullValue: 'NULL_VALUE';
};
/** Returns true if `value` is NaN. */
export declare function isNanValue(value?: Value | null): value is {
    doubleValue: 'NaN' | number;
};
/** Returns true if `value` is a MapValue. */
export declare function isMapValue(value?: Value | null): value is {
    mapValue: MapValue;
};
/** Creates a deep copy of `source`. */
export declare function deepClone(source: Value): Value;
