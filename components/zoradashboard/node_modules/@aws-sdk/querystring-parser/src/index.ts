import { QueryParameterBag } from "@aws-sdk/types";

export function parseQueryString(querystring: string): QueryParameterBag {
  const query: QueryParameterBag = {};
  querystring = querystring.replace(/^\?/, "");

  if (querystring) {
    for (const pair of querystring.split("&")) {
      let [key, value = null] = pair.split("=");
      key = decodeURIComponent(key);
      if (value) {
        value = decodeURIComponent(value);
      }
      if (!(key in query)) {
        query[key] = value;
      } else if (Array.isArray(query[key])) {
        (query[key] as Array<string>).push(value as string);
      } else {
        query[key] = [query[key] as string, value as string];
      }
    }
  }

  return query;
}
