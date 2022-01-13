import { Credentials, HashConstructor, SourceData } from "@aws-sdk/types";
import { toHex } from "@aws-sdk/util-hex-encoding";

import { KEY_TYPE_IDENTIFIER, MAX_CACHE_SIZE } from "./constants";

const signingKeyCache: { [key: string]: Uint8Array } = {};
const cacheQueue: Array<string> = [];

/**
 * Create a string describing the scope of credentials used to sign a request.
 *
 * @param shortDate The current calendar date in the form YYYYMMDD.
 * @param region    The AWS region in which the service resides.
 * @param service   The service to which the signed request is being sent.
 */
export function createScope(shortDate: string, region: string, service: string): string {
  return `${shortDate}/${region}/${service}/${KEY_TYPE_IDENTIFIER}`;
}

/**
 * Derive a signing key from its composite parts
 *
 * @param sha256Constructor A constructor function that can instantiate SHA-256
 *                          hash objects.
 * @param credentials       The credentials with which the request will be
 *                          signed.
 * @param shortDate         The current calendar date in the form YYYYMMDD.
 * @param region            The AWS region in which the service resides.
 * @param service           The service to which the signed request is being
 *                          sent.
 */
export const getSigningKey = async (
  sha256Constructor: HashConstructor,
  credentials: Credentials,
  shortDate: string,
  region: string,
  service: string
): Promise<Uint8Array> => {
  const credsHash = await hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId);
  const cacheKey = `${shortDate}:${region}:${service}:${toHex(credsHash)}:${credentials.sessionToken}`;
  if (cacheKey in signingKeyCache) {
    return signingKeyCache[cacheKey];
  }

  cacheQueue.push(cacheKey);
  while (cacheQueue.length > MAX_CACHE_SIZE) {
    delete signingKeyCache[cacheQueue.shift() as string];
  }

  let key: SourceData = `AWS4${credentials.secretAccessKey}`;
  for (const signable of [shortDate, region, service, KEY_TYPE_IDENTIFIER]) {
    key = await hmac(sha256Constructor, key, signable);
  }
  return (signingKeyCache[cacheKey] = key as Uint8Array);
};

/**
 * @internal
 */
export function clearCredentialCache(): void {
  cacheQueue.length = 0;
  Object.keys(signingKeyCache).forEach((cacheKey) => {
    delete signingKeyCache[cacheKey];
  });
}

function hmac(ctor: HashConstructor, secret: SourceData, data: SourceData): Promise<Uint8Array> {
  const hash = new ctor(secret);
  hash.update(data);
  return hash.digest();
}
