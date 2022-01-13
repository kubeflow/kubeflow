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
export declare const DOCUMENT_KEY_NAME = "__name__";
/**
 * Path represents an ordered sequence of string segments.
 */
declare abstract class BasePath<B extends BasePath<B>> {
    private segments;
    private offset;
    private len;
    constructor(segments: string[], offset?: number, length?: number);
    /**
     * Abstract constructor method to construct an instance of B with the given
     * parameters.
     */
    protected abstract construct(segments: string[], offset?: number, length?: number): B;
    /**
     * Returns a String representation.
     *
     * Implementing classes are required to provide deterministic implementations as
     * the String representation is used to obtain canonical Query IDs.
     */
    abstract toString(): string;
    get length(): number;
    isEqual(other: B): boolean;
    child(nameOrPath: string | B): B;
    /** The index of one past the last segment of the path. */
    private limit;
    popFirst(size?: number): B;
    popLast(): B;
    firstSegment(): string;
    lastSegment(): string;
    get(index: number): string;
    isEmpty(): boolean;
    isPrefixOf(other: this): boolean;
    isImmediateParentOf(potentialChild: this): boolean;
    forEach(fn: (segment: string) => void): void;
    toArray(): string[];
    static comparator<T extends BasePath<T>>(p1: BasePath<T>, p2: BasePath<T>): number;
}
/**
 * A slash-separated path for navigating resources (documents and collections)
 * within Firestore.
 */
export declare class ResourcePath extends BasePath<ResourcePath> {
    protected construct(segments: string[], offset?: number, length?: number): ResourcePath;
    canonicalString(): string;
    toString(): string;
    /**
     * Creates a resource path from the given slash-delimited string. If multiple
     * arguments are provided, all components are combined. Leading and trailing
     * slashes from all components are ignored.
     */
    static fromString(...pathComponents: string[]): ResourcePath;
    static emptyPath(): ResourcePath;
}
/** A dot-separated path for navigating sub-objects within a document. */
export declare class FieldPath extends BasePath<FieldPath> {
    protected construct(segments: string[], offset?: number, length?: number): FieldPath;
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */
    private static isValidIdentifier;
    canonicalString(): string;
    toString(): string;
    /**
     * Returns true if this field references the key of a document.
     */
    isKeyField(): boolean;
    /**
     * The field designating the key of a document.
     */
    static keyField(): FieldPath;
    /**
     * Parses a field string from the given server-formatted string.
     *
     * - Splitting the empty string is not allowed (for now at least).
     * - Empty segments within the string (e.g. if there are two consecutive
     *   separators) are not allowed.
     *
     * TODO(b/37244157): we should make this more strict. Right now, it allows
     * non-identifier path components, even if they aren't escaped.
     */
    static fromServerFormat(path: string): FieldPath;
    static emptyPath(): FieldPath;
}
export {};
