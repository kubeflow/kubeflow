export declare function isPlainObject(item: unknown): item is Record<keyof any, unknown>;
export interface DeepmergeOptions {
    clone?: boolean;
}
export default function deepmerge<T>(target: T, source: unknown, options?: DeepmergeOptions): T;
