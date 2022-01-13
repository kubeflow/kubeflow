export const escapeUri = (uri: string): string =>
  // AWS percent-encodes some extra non-standard characters in a URI
  encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode);

const hexEncode = (c: string) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`;
