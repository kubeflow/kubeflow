import { parseQueryString } from "@aws-sdk/querystring-parser";
import { Endpoint, QueryParameterBag, UrlParser } from "@aws-sdk/types";

export const parseUrl: UrlParser = (url: string): Endpoint => {
  const { hostname, pathname, port, protocol, search } = new URL(url);

  let query: QueryParameterBag | undefined;
  if (search) {
    query = parseQueryString(search);
  }

  return {
    hostname,
    port: port ? parseInt(port) : undefined,
    protocol,
    path: pathname,
    query,
  };
};
