/**
 * @license
 * Copyright 2019 Google LLC
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
import { Document } from '../model/document';
import { FieldPath, ResourcePath } from '../model/path';
import { Value as ProtoValue } from '../protos/firestore_proto_api';
/**
 * A Target represents the WatchTarget representation of a Query, which is used
 * by the LocalStore and the RemoteStore to keep track of and to execute
 * backend queries. While a Query can represent multiple Targets, each Targets
 * maps to a single WatchTarget in RemoteStore and a single TargetData entry
 * in persistence.
 */
export interface Target {
    readonly path: ResourcePath;
    readonly collectionGroup: string | null;
    readonly orderBy: OrderBy[];
    readonly filters: Filter[];
    readonly limit: number | null;
    readonly startAt: Bound | null;
    readonly endAt: Bound | null;
}
export declare class TargetImpl implements Target {
    readonly path: ResourcePath;
    readonly collectionGroup: string | null;
    readonly orderBy: OrderBy[];
    readonly filters: Filter[];
    readonly limit: number | null;
    readonly startAt: Bound | null;
    readonly endAt: Bound | null;
    memoizedCanonicalId: string | null;
    constructor(path: ResourcePath, collectionGroup?: string | null, orderBy?: OrderBy[], filters?: Filter[], limit?: number | null, startAt?: Bound | null, endAt?: Bound | null);
}
/**
 * Initializes a Target with a path and optional additional query constraints.
 * Path must currently be empty if this is a collection group query.
 *
 * NOTE: you should always construct `Target` from `Query.toTarget` instead of
 * using this factory method, because `Query` provides an implicit `orderBy`
 * property.
 */
export declare function newTarget(path: ResourcePath, collectionGroup?: string | null, orderBy?: OrderBy[], filters?: Filter[], limit?: number | null, startAt?: Bound | null, endAt?: Bound | null): Target;
export declare function canonifyTarget(target: Target): string;
export declare function stringifyTarget(target: Target): string;
export declare function targetEquals(left: Target, right: Target): boolean;
export declare function isDocumentTarget(target: Target): boolean;
export declare abstract class Filter {
    abstract matches(doc: Document): boolean;
}
export declare const enum Operator {
    LESS_THAN = "<",
    LESS_THAN_OR_EQUAL = "<=",
    EQUAL = "==",
    NOT_EQUAL = "!=",
    GREATER_THAN = ">",
    GREATER_THAN_OR_EQUAL = ">=",
    ARRAY_CONTAINS = "array-contains",
    IN = "in",
    NOT_IN = "not-in",
    ARRAY_CONTAINS_ANY = "array-contains-any"
}
/**
 * The direction of sorting in an order by.
 */
export declare const enum Direction {
    ASCENDING = "asc",
    DESCENDING = "desc"
}
export declare class FieldFilter extends Filter {
    field: FieldPath;
    op: Operator;
    value: ProtoValue;
    protected constructor(field: FieldPath, op: Operator, value: ProtoValue);
    /**
     * Creates a filter based on the provided arguments.
     */
    static create(field: FieldPath, op: Operator, value: ProtoValue): FieldFilter;
    private static createKeyFieldInFilter;
    matches(doc: Document): boolean;
    protected matchesComparison(comparison: number): boolean;
    isInequality(): boolean;
}
export declare function canonifyFilter(filter: Filter): string;
export declare function filterEquals(f1: Filter, f2: Filter): boolean;
/** Returns a debug description for `filter`. */
export declare function stringifyFilter(filter: Filter): string;
/** Filter that matches on key fields (i.e. '__name__'). */
export declare class KeyFieldFilter extends FieldFilter {
    private readonly key;
    constructor(field: FieldPath, op: Operator, value: ProtoValue);
    matches(doc: Document): boolean;
}
/** Filter that matches on key fields within an array. */
export declare class KeyFieldInFilter extends FieldFilter {
    private readonly keys;
    constructor(field: FieldPath, value: ProtoValue);
    matches(doc: Document): boolean;
}
/** Filter that matches on key fields not present within an array. */
export declare class KeyFieldNotInFilter extends FieldFilter {
    private readonly keys;
    constructor(field: FieldPath, value: ProtoValue);
    matches(doc: Document): boolean;
}
/** A Filter that implements the array-contains operator. */
export declare class ArrayContainsFilter extends FieldFilter {
    constructor(field: FieldPath, value: ProtoValue);
    matches(doc: Document): boolean;
}
/** A Filter that implements the IN operator. */
export declare class InFilter extends FieldFilter {
    constructor(field: FieldPath, value: ProtoValue);
    matches(doc: Document): boolean;
}
/** A Filter that implements the not-in operator. */
export declare class NotInFilter extends FieldFilter {
    constructor(field: FieldPath, value: ProtoValue);
    matches(doc: Document): boolean;
}
/** A Filter that implements the array-contains-any operator. */
export declare class ArrayContainsAnyFilter extends FieldFilter {
    constructor(field: FieldPath, value: ProtoValue);
    matches(doc: Document): boolean;
}
/**
 * Represents a bound of a query.
 *
 * The bound is specified with the given components representing a position and
 * whether it's just before or just after the position (relative to whatever the
 * query order is).
 *
 * The position represents a logical index position for a query. It's a prefix
 * of values for the (potentially implicit) order by clauses of a query.
 *
 * Bound provides a function to determine whether a document comes before or
 * after a bound. This is influenced by whether the position is just before or
 * just after the provided values.
 */
export declare class Bound {
    readonly position: ProtoValue[];
    readonly before: boolean;
    constructor(position: ProtoValue[], before: boolean);
}
export declare function canonifyBound(bound: Bound): string;
/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */
export declare class OrderBy {
    readonly field: FieldPath;
    readonly dir: Direction;
    constructor(field: FieldPath, dir?: Direction);
}
export declare function canonifyOrderBy(orderBy: OrderBy): string;
export declare function stringifyOrderBy(orderBy: OrderBy): string;
export declare function orderByEquals(left: OrderBy, right: OrderBy): boolean;
/**
 * Returns true if a document sorts before a bound using the provided sort
 * order.
 */
export declare function sortsBeforeDocument(bound: Bound, orderBy: OrderBy[], doc: Document): boolean;
export declare function boundEquals(left: Bound | null, right: Bound | null): boolean;
