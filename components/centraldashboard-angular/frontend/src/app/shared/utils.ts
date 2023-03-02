/**
 * We treat URLs with or without a trailing slash as the same
 * URL. Thus, in order to compare URLs, we need to use
 * appendBackslash for both URLS to avoid false statements
 * in cases where they only differ in the trailing slash.
 */
export function equalUrlPaths(firstUrl: string, secondUrl: string | undefined) {
  if (!firstUrl || !secondUrl) {
    return false;
  }
  firstUrl = appendBackslash(firstUrl);
  secondUrl = appendBackslash(secondUrl);
  return firstUrl === secondUrl;
}

/**
 * Appends a trailing slash either at the end of the URL
 * or at the end of path, just before query parameters
 */
export function appendBackslash(url: string): string {
  const urlObject = new URL(url, window.location.origin);

  let urlPath = urlObject.pathname;
  urlPath += urlPath?.endsWith('/') ? '' : '/';
  /**
   * We need an empty string as a default value because in case
   * of undefined strings, Javascript will go ahead and append the
   * string 'undefined' in string additions/concats
   */
  const urlParams = urlObject.search || '';
  const urlFragment = urlObject.hash || '';

  return urlPath + urlParams + urlFragment;
}

export function removePrefixFrom(url: string) {
  return url.includes('/_') ? url.slice(2) : url;
}
