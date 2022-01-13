/**
 * The XML parser will set one K:V for a member that could
 * return multiple entries but only has one.
 */
export const getArrayIfSingleItem = <T>(mayBeArray: T): T | T[] =>
  Array.isArray(mayBeArray) ? mayBeArray : [mayBeArray];
