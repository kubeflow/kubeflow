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
export declare function isJustDef<T>(p: T | null | undefined): p is T | null;
export declare function isFunction(p: unknown): p is Function;
export declare function isNonArrayObject(p: unknown): boolean;
export declare function isString(p: unknown): p is string;
export declare function isNativeBlob(p: unknown): p is Blob;
export declare function isNativeBlobDefined(): boolean;
export declare function validateNumber(argument: string, minValue: number, maxValue: number, value: number): void;
