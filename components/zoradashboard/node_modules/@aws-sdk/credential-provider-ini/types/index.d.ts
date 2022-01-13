import { ParsedIniData, SharedConfigFiles, SharedConfigInit } from "@aws-sdk/shared-ini-file-loader";
import { CredentialProvider, Credentials } from "@aws-sdk/types";
export declare const ENV_PROFILE = "AWS_PROFILE";
/**
 * @see http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/STS.html#assumeRole-property
 * TODO update the above to link to V3 docs
 */
export interface AssumeRoleParams {
    /**
     * The identifier of the role to be assumed.
     */
    RoleArn: string;
    /**
     * A name for the assumed role session.
     */
    RoleSessionName: string;
    /**
     * A unique identifier that is used by third parties when assuming roles in
     * their customers' accounts.
     */
    ExternalId?: string;
    /**
     * The identification number of the MFA device that is associated with the
     * user who is making the `AssumeRole` call.
     */
    SerialNumber?: string;
    /**
     * The value provided by the MFA device.
     */
    TokenCode?: string;
}
export interface SourceProfileInit extends SharedConfigInit {
    /**
     * The configuration profile to use.
     */
    profile?: string;
    /**
     * A promise that will be resolved with loaded and parsed credentials files.
     * Used to avoid loading shared config files multiple times.
     *
     * @internal
     */
    loadedConfig?: Promise<SharedConfigFiles>;
}
export interface FromIniInit extends SourceProfileInit {
    /**
     * A function that returna a promise fulfilled with an MFA token code for
     * the provided MFA Serial code. If a profile requires an MFA code and
     * `mfaCodeProvider` is not a valid function, the credential provider
     * promise will be rejected.
     *
     * @param mfaSerial The serial code of the MFA device specified.
     */
    mfaCodeProvider?: (mfaSerial: string) => Promise<string>;
    /**
     * A function that assumes a role and returns a promise fulfilled with
     * credentials for the assumed role.
     *
     * @param sourceCreds The credentials with which to assume a role.
     * @param params
     */
    roleAssumer?: (sourceCreds: Credentials, params: AssumeRoleParams) => Promise<Credentials>;
}
/**
 * Creates a credential provider that will read from ini files and supports
 * role assumption and multi-factor authentication.
 */
export declare const fromIni: (init?: FromIniInit) => CredentialProvider;
/**
 * Load profiles from credentials and config INI files and normalize them into a
 * single profile list.
 *
 * @internal
 */
export declare const parseKnownFiles: (init: SourceProfileInit) => Promise<ParsedIniData>;
/**
 * @internal
 */
export declare const getMasterProfileName: (init: {
    profile?: string;
}) => string;
