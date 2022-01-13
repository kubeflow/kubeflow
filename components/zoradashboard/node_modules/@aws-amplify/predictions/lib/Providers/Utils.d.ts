/**
 * Changes object keys to camel case. If optional parameter `keys` is given, then we extract only the
 * keys specified in `keys`.
 */
export declare function makeCamelCase(obj: object, keys?: string[]): {};
/**
 * Given an array of object, call makeCamelCase(...) on each option.
 */
export declare function makeCamelCaseArray(objArr: object[], keys?: string[]): {}[];
/**
 * Converts blob to array buffer
 */
export declare function blobToArrayBuffer(blob: Blob): Promise<Uint8Array>;
