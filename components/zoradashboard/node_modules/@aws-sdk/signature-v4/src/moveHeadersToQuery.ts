import { HttpRequest, QueryParameterBag } from "@aws-sdk/types";

import { cloneRequest } from "./cloneRequest";

/**
 * @internal
 */
export function moveHeadersToQuery(
  request: HttpRequest,
  options: { unhoistableHeaders?: Set<string> } = {}
): HttpRequest & { query: QueryParameterBag } {
  const { headers, query = {} as QueryParameterBag } =
    typeof (request as any).clone === "function" ? (request as any).clone() : cloneRequest(request);
  for (const name of Object.keys(headers)) {
    const lname = name.toLowerCase();
    if (lname.substr(0, 6) === "x-amz-" && !options.unhoistableHeaders?.has(lname)) {
      query[name] = headers[name];
      delete headers[name];
    }
  }

  return {
    ...request,
    headers,
    query,
  };
}
