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
import { SetOptions } from '@firebase/firestore-types';
import { ResourcePath } from '../model/path';
/** Types accepted by validateType() and related methods for validation. */
export declare type ValidationType = 'undefined' | 'object' | 'function' | 'boolean' | 'number' | 'string' | 'non-empty string';
export declare function validateNonEmptyArgument(functionName: string, argumentName: string, argument?: string): asserts argument is string;
export declare function validateSetOptions(methodName: string, options: SetOptions | undefined): SetOptions;
/**
 * Validates that two boolean options are not set at the same time.
 */
export declare function validateIsNotUsedTogether(optionName1: string, argument1: boolean | undefined, optionName2: string, argument2: boolean | undefined): void;
/**
 * Validates that `path` refers to a document (indicated by the fact it contains
 * an even numbers of segments).
 */
export declare function validateDocumentPath(path: ResourcePath): void;
/**
 * Validates that `path` refers to a collection (indicated by the fact it
 * contains an odd numbers of segments).
 */
export declare function validateCollectionPath(path: ResourcePath): void;
/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */
export declare function isPlainObject(input: unknown): boolean;
/** Returns a string describing the type / value of the provided input. */
export declare function valueDescription(input: unknown): string;
/** Hacky method to try to get the constructor name for an object. */
export declare function tryGetCustomObjectType(input: object): string | null;
/**
 * Casts `obj` to `T`, optionally unwrapping Compat types to expose the
 * underlying instance. Throws if  `obj` is not an instance of `T`.
 *
 * This cast is used in the Lite and Full SDK to verify instance types for
 * arguments passed to the public API.
 */
export declare function cast<T>(obj: object, constructor: {
    new (...args: any[]): T;
}): T | never;
export declare function validatePositiveNumber(functionName: string, n: number): void;
