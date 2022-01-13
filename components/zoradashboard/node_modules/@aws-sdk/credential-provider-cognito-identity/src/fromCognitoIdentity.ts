import { GetCredentialsForIdentityCommand } from "@aws-sdk/client-cognito-identity";
import { ProviderError } from "@aws-sdk/property-provider";
import { CredentialProvider, Credentials } from "@aws-sdk/types";

import { CognitoProviderParameters } from "./CognitoProviderParameters";
import { resolveLogins } from "./resolveLogins";

export interface CognitoIdentityCredentials extends Credentials {
  /**
   * The Cognito ID returned by the last call to AWS.CognitoIdentity.getOpenIdToken().
   */
  identityId: string;
}

/**
 * Retrieves temporary AWS credentials using Amazon Cognito's
 * `GetCredentialsForIdentity` operation.
 *
 * Results from this function call are not cached internally.
 */
export function fromCognitoIdentity(parameters: FromCognitoIdentityParameters): CredentialProvider {
  return async (): Promise<CognitoIdentityCredentials> => {
    const {
      Credentials: {
        AccessKeyId = throwOnMissingAccessKeyId(),
        Expiration,
        SecretKey = throwOnMissingSecretKey(),
        SessionToken,
      } = throwOnMissingCredentials(),
    } = await parameters.client.send(
      new GetCredentialsForIdentityCommand({
        CustomRoleArn: parameters.customRoleArn,
        IdentityId: parameters.identityId,
        Logins: parameters.logins ? await resolveLogins(parameters.logins) : undefined,
      })
    );

    return {
      identityId: parameters.identityId,
      accessKeyId: AccessKeyId,
      secretAccessKey: SecretKey,
      sessionToken: SessionToken,
      expiration: Expiration,
    };
  };
}

export interface FromCognitoIdentityParameters extends CognitoProviderParameters {
  /**
   * The unique identifier for the identity against which credentials will be
   * issued.
   */
  identityId: string;
}

function throwOnMissingAccessKeyId(): never {
  throw new ProviderError("Response from Amazon Cognito contained no access key ID");
}

function throwOnMissingCredentials(): never {
  throw new ProviderError("Response from Amazon Cognito contained no credentials");
}

function throwOnMissingSecretKey(): never {
  throw new ProviderError("Response from Amazon Cognito contained no secret key");
}
