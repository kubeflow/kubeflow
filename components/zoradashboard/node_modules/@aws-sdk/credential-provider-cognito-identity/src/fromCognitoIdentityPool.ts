import { GetIdCommand } from "@aws-sdk/client-cognito-identity";
import { ProviderError } from "@aws-sdk/property-provider";
import { CredentialProvider } from "@aws-sdk/types";

import { CognitoProviderParameters } from "./CognitoProviderParameters";
import { fromCognitoIdentity } from "./fromCognitoIdentity";
import { localStorage } from "./localStorage";
import { resolveLogins } from "./resolveLogins";
import { Storage } from "./Storage";

/**
 * Retrieves or generates a unique identifier using Amazon Cognito's `GetId`
 * operation, then generates temporary AWS credentials using Amazon Cognito's
 * `GetCredentialsForIdentity` operation.
 *
 * Results from `GetId` are cached internally, but results from
 * `GetCredentialsForIdentity` are not.
 */
export function fromCognitoIdentityPool({
  accountId,
  cache = localStorage(),
  client,
  customRoleArn,
  identityPoolId,
  logins,
  userIdentifier = !logins || Object.keys(logins).length === 0 ? "ANONYMOUS" : undefined,
}: FromCognitoIdentityPoolParameters): CredentialProvider {
  const cacheKey = userIdentifier ? `aws:cognito-identity-credentials:${identityPoolId}:${userIdentifier}` : undefined;

  let provider: CredentialProvider = async () => {
    let identityId = cacheKey && (await cache.getItem(cacheKey));
    if (!identityId) {
      const { IdentityId = throwOnMissingId() } = await client.send(
        new GetIdCommand({
          AccountId: accountId,
          IdentityPoolId: identityPoolId,
          Logins: logins ? await resolveLogins(logins) : undefined,
        })
      );
      identityId = IdentityId;
      if (cacheKey) {
        Promise.resolve(cache.setItem(cacheKey, identityId)).catch(() => {});
      }
    }

    provider = fromCognitoIdentity({
      client,
      customRoleArn,
      logins,
      identityId,
    });

    return provider();
  };

  return () =>
    provider().catch(async (err) => {
      if (cacheKey) {
        Promise.resolve(cache.removeItem(cacheKey)).catch(() => {});
      }

      throw err;
    });
}

export interface FromCognitoIdentityPoolParameters extends CognitoProviderParameters {
  /**
   * A standard AWS account ID (9+ digits).
   */
  accountId?: string;

  /**
   * A cache in which to store resolved Cognito IdentityIds. If not supplied,
   * the credential provider will attempt to store IdentityIds in one of the
   * following (in order of preference):
   *   1. IndexedDB
   *   2. LocalStorage
   *   3. An in-memory cache object that will not persist between pages.
   *
   * IndexedDB is preferred to maximize data sharing between top-level
   * browsing contexts and web workers.
   *
   * The provider will not cache IdentityIds of authenticated users unless a
   * separate `userIdentitifer` parameter is supplied.
   */
  cache?: Storage;

  /**
   * The unique identifier for the identity pool from which an identity should
   * be retrieved or generated.
   */
  identityPoolId: string;

  /**
   * A unique identifier for the user. This is distinct from a Cognito
   * IdentityId and should instead be an identifier meaningful to your
   * application. Used to cache Cognito IdentityIds on a per-user basis.
   */
  userIdentifier?: string;
}

function throwOnMissingId(): never {
  throw new ProviderError("Response from Amazon Cognito contained no identity ID");
}
