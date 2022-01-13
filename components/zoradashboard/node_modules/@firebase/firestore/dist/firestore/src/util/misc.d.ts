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
export declare type EventHandler<E> = (value: E) => void;
export interface Indexable {
    [k: string]: unknown;
}
export declare class AutoId {
    static newId(): string;
}
export declare function primitiveComparator<T>(left: T, right: T): number;
export interface Equatable<T> {
    isEqual(other: T): boolean;
}
/** Helper to compare arrays using isEqual(). */
export declare function arrayEquals<T>(left: T[], right: T[], comparator: (l: T, r: T) => boolean): boolean;
/**
 * Returns the immediate lexicographically-following string. This is useful to
 * construct an inclusive range for indexeddb iterators.
 */
export declare function immediateSuccessor(s: string): string;
