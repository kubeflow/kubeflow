/**
 * @param {string|string[]} files
 * @param {string} context
 * @returns {string[]}
 */
export function parseFiles(files: string | string[], context: string): string[];
/**
 * @param {string|string[]} patterns
 * @param {string|string[]} extensions
 * @returns {string[]}
 */
export function parseFoldersToGlobs(
  patterns: string | string[],
  extensions?: string | string[]
): string[];
export function jsonStringifyReplacerSortKeys(_: string, value: any): any;
