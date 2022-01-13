import { HttpRequest } from "@aws-sdk/types";

import { cloneRequest } from "./cloneRequest";
import { GENERATED_HEADERS } from "./constants";

/**
 * @internal
 */
export function prepareRequest(request: HttpRequest): HttpRequest {
  // Create a clone of the request object that does not clone the body
  request = typeof (request as any).clone === "function" ? (request as any).clone() : cloneRequest(request);

  for (const headerName of Object.keys(request.headers)) {
    if (GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) {
      delete request.headers[headerName];
    }
  }

  return request;
}
