import Reference from '../Reference';
export default class ReferenceSet {
    list: Set<unknown>;
    refs: Map<string, Reference>;
    constructor();
    get size(): number;
    describe(): unknown[];
    toArray(): unknown[];
    add(value: unknown): void;
    delete(value: unknown): void;
    has(value: unknown, resolve: (v: unknown) => unknown): boolean;
    clone(): ReferenceSet;
    merge(newItems: ReferenceSet, removeItems: ReferenceSet): ReferenceSet;
}
