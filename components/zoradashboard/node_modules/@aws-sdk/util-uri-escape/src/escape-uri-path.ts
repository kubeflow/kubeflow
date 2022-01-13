import { escapeUri } from "./escape-uri";

export const escapeUriPath = (uri: string): string => uri.split("/").map(escapeUri).join("/");
