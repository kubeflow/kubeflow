import { ProviderError } from "@aws-sdk/property-provider";
import {
  loadSharedConfigFiles,
  ParsedIniData,
  Profile,
  SharedConfigFiles,
  SharedConfigInit,
} from "@aws-sdk/shared-ini-file-loader";
import { CredentialProvider, Credentials } from "@aws-sdk/types";

const DEFAULT_PROFILE = "default";
export const ENV_PROFILE = "AWS_PROFILE";

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

interface StaticCredsProfile extends Profile {
  aws_access_key_id: string;
  aws_secret_access_key: string;
  aws_session_token?: string;
}

const isStaticCredsProfile = (arg: any): arg is StaticCredsProfile =>
  Boolean(arg) &&
  typeof arg === "object" &&
  typeof arg.aws_access_key_id === "string" &&
  typeof arg.aws_secret_access_key === "string" &&
  ["undefined", "string"].indexOf(typeof arg.aws_session_token) > -1;

interface AssumeRoleProfile extends Profile {
  role_arn: string;
  source_profile: string;
}

const isAssumeRoleProfile = (arg: any): arg is AssumeRoleProfile =>
  Boolean(arg) &&
  typeof arg === "object" &&
  typeof arg.role_arn === "string" &&
  typeof arg.source_profile === "string" &&
  ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1 &&
  ["undefined", "string"].indexOf(typeof arg.external_id) > -1 &&
  ["undefined", "string"].indexOf(typeof arg.mfa_serial) > -1;

/**
 * Creates a credential provider that will read from ini files and supports
 * role assumption and multi-factor authentication.
 */
export const fromIni = (init: FromIniInit = {}): CredentialProvider => async () => {
  const profiles = await parseKnownFiles(init);
  return resolveProfileData(getMasterProfileName(init), profiles, init);
};

/**
 * Load profiles from credentials and config INI files and normalize them into a
 * single profile list.
 *
 * @internal
 */
export const parseKnownFiles = async (init: SourceProfileInit): Promise<ParsedIniData> => {
  const { loadedConfig = loadSharedConfigFiles(init) } = init;

  const parsedFiles = await loadedConfig;
  return {
    ...parsedFiles.configFile,
    ...parsedFiles.credentialsFile,
  };
};

/**
 * @internal
 */
export const getMasterProfileName = (init: { profile?: string }): string =>
  init.profile || process.env[ENV_PROFILE] || DEFAULT_PROFILE;

const resolveProfileData = async (
  profileName: string,
  profiles: ParsedIniData,
  options: FromIniInit,
  visitedProfiles: { [profileName: string]: true } = {}
): Promise<Credentials> => {
  const data = profiles[profileName];

  // If this is not the first profile visited, static credentials should be
  // preferred over role assumption metadata. This special treatment of
  // second and subsequent hops is to ensure compatibility with the AWS CLI.
  if (Object.keys(visitedProfiles).length > 0 && isStaticCredsProfile(data)) {
    return resolveStaticCredentials(data);
  }

  // If this is the first profile visited, role assumption keys should be
  // given precedence over static credentials.
  if (isAssumeRoleProfile(data)) {
    const {
      external_id: ExternalId,
      mfa_serial,
      role_arn: RoleArn,
      role_session_name: RoleSessionName = "aws-sdk-js-" + Date.now(),
      source_profile,
    } = data;

    if (!options.roleAssumer) {
      throw new ProviderError(
        `Profile ${profileName} requires a role to be assumed, but no` + ` role assumption callback was provided.`,
        false
      );
    }

    if (source_profile in visitedProfiles) {
      throw new ProviderError(
        `Detected a cycle attempting to resolve credentials for profile` +
          ` ${getMasterProfileName(options)}. Profiles visited: ` +
          Object.keys(visitedProfiles).join(", "),
        false
      );
    }

    const sourceCreds = resolveProfileData(source_profile, profiles, options, {
      ...visitedProfiles,
      [source_profile]: true,
    });
    const params: AssumeRoleParams = { RoleArn, RoleSessionName, ExternalId };
    if (mfa_serial) {
      if (!options.mfaCodeProvider) {
        throw new ProviderError(
          `Profile ${profileName} requires multi-factor authentication,` + ` but no MFA code callback was provided.`,
          false
        );
      }
      params.SerialNumber = mfa_serial;
      params.TokenCode = await options.mfaCodeProvider(mfa_serial);
    }

    return options.roleAssumer(await sourceCreds, params);
  }

  // If no role assumption metadata is present, attempt to load static
  // credentials from the selected profile.
  if (isStaticCredsProfile(data)) {
    return resolveStaticCredentials(data);
  }

  // If the profile cannot be parsed or contains neither static credentials
  // nor role assumption metadata, throw an error. This should be considered a
  // terminal resolution error if a profile has been specified by the user
  // (whether via a parameter, an environment variable, or another profile's
  // `source_profile` key).
  throw new ProviderError(`Profile ${profileName} could not be found or parsed in shared` + ` credentials file.`);
};

const resolveStaticCredentials = (profile: StaticCredsProfile): Promise<Credentials> =>
  Promise.resolve({
    accessKeyId: profile.aws_access_key_id,
    secretAccessKey: profile.aws_secret_access_key,
    sessionToken: profile.aws_session_token,
  });
