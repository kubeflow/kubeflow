/**
 * Returns the Object resulting from parsing the given JSON, or null if the
 * given string does not represent a JSON object.
 */
export declare function jsonObjectOrNull(s: string): {
    [name: string]: unknown;
} | null;
