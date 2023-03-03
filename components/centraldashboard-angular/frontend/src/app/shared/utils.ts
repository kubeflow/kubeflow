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
  let firstUrlObject = new URL(firstUrl, window.location.origin);
  let secondUrlObject = new URL(secondUrl, window.location.origin);
  /*
   * Remove namespace parameter in order to avoid iframe reloading
   * when two URLs differ only in their namespace query parameter.
   */
  firstUrlObject = removeNamespaceParam(firstUrlObject);
  secondUrlObject = removeNamespaceParam(secondUrlObject);
  return (
    firstUrlObject.pathname === secondUrlObject.pathname &&
    firstUrlObject.search === secondUrlObject.search &&
    firstUrlObject.hash === secondUrlObject.hash
  );
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

function removeNamespaceParam(url: URL): URL {
  const queryParams = getQueryParams(url.search);
  if (queryParams.ns) {
    delete queryParams.ns;
  }
  const search = convertQueryParamsToString(queryParams);
  url.search = search;
  return url;
}

function convertQueryParamsToString(params: { [key: string]: string }): string {
  const result = '?' + new URLSearchParams(params).toString();
  return result;
}

export function removePrefixFrom(url: string) {
  return url.includes('/_') ? url.slice(2) : url;
}

/*
 * Accepts a string with all the query parameters of the URL
 * and returns them in the form
 * of a dictionary
 */
export function getQueryParams(locationSearch: string | undefined): {
  [key: string]: string;
} {
  const searchParams = new URLSearchParams(locationSearch);
  const queryParams: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });
  return queryParams;
}

export function getUrlFragment(url: string): string {
  const fragment = url.split('#')[1];
  return fragment;
}
