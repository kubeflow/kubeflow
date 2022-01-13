import { SourceProfileInit } from "@aws-sdk/credential-provider-ini";
import { CredentialProvider } from "@aws-sdk/types";
/**
 * @internal
 */
export declare const ENV_PROFILE = "AWS_PROFILE";
export interface FromProcessInit extends SourceProfileInit {
}
/**
 * Creates a credential provider that will read from a credential_process specified
 * in ini files.
 */
export declare const fromProcess: (init?: FromProcessInit) => CredentialProvider;
