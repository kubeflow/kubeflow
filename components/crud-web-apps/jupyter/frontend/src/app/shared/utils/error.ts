export function getErrorCode(error: string): number {
  // Extract error code from the first square brackets
  // [] of the string
  const matches = error.match(/\[(.*?)\]/);
  const code = parseInt(matches[1], 10);
  return code;
}
