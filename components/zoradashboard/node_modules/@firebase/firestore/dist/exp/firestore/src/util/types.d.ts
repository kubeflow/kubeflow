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
/** Sentinel value that sorts before any Mutation Batch ID. */
export declare const BATCHID_UNKNOWN = -1;
export interface StringMap {
    [key: string]: string;
}
/**
 * Returns whether a variable is either undefined or null.
 */
export declare function isNullOrUndefined(value: unknown): value is null | undefined;
/** Returns whether the value represents -0. */
export declare function isNegativeZero(value: number): boolean;
/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value - The value to test for being an integer and in the safe range
 */
export declare function isSafeInteger(value: unknown): boolean;
/** The subset of the browser's Window interface used by the SDK. */
export interface WindowLike {
    readonly localStorage: Storage;
    readonly indexedDB: IDBFactory | null;
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
}
/** The subset of the browser's Document interface used by the SDK. */
export interface DocumentLike {
    readonly visibilityState: VisibilityState;
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
}
