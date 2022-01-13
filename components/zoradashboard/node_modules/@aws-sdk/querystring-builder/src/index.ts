import { QueryParameterBag } from "@aws-sdk/types";
import { escapeUri } from "@aws-sdk/util-uri-escape";

export function buildQueryString(query: QueryParameterBag): string {
  const parts: string[] = [];
  for (let key of Object.keys(query).sort()) {
    const value = query[key];
    key = escapeUri(key);
    if (Array.isArray(value)) {
      for (let i = 0, iLen = value.length; i < iLen; i++) {
        parts.push(`${key}=${escapeUri(value[i])}`);
      }
    } else {
      let qsEntry = key;
      if (value || typeof value === "string") {
        qsEntry += `=${escapeUri(value)}`;
      }
      parts.push(qsEntry);
    }
  }

  return parts.join("&");
}
