/**
 * @ignore
 */
const dedupe = (arr: string[]) => Array.from(new Set(arr));

/**
 * @ignore
 */
export const getUniqueScopes = (...scopes: string[]) => {
  return dedupe(scopes.join(' ').trim().split(/\s+/)).join(' ');
};
