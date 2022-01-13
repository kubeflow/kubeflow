import { getMasterProfileName, parseKnownFiles, SourceProfileInit } from "@aws-sdk/credential-provider-ini";
import { ProviderError } from "@aws-sdk/property-provider";
import { ParsedIniData } from "@aws-sdk/shared-ini-file-loader";
import { CredentialProvider, Credentials } from "@aws-sdk/types";
import { exec } from "child_process";

/**
 * @internal
 */
export const ENV_PROFILE = "AWS_PROFILE";

export interface FromProcessInit extends SourceProfileInit {}

/**
 * Creates a credential provider that will read from a credential_process specified
 * in ini files.
 */
export const fromProcess = (init: FromProcessInit = {}): CredentialProvider => async () => {
  const profiles = await parseKnownFiles(init);
  return resolveProcessCredentials(getMasterProfileName(init), profiles);
};

const resolveProcessCredentials = async (profileName: string, profiles: ParsedIniData): Promise<Credentials> => {
  const profile = profiles[profileName];

  if (profiles[profileName]) {
    const credentialProcess = profile["credential_process"];
    if (credentialProcess !== undefined) {
      return await execPromise(credentialProcess)
        .then((processResult: any) => {
          let data;
          try {
            data = JSON.parse(processResult);
          } catch {
            throw Error(`Profile ${profileName} credential_process returned invalid JSON.`);
          }

          const {
            Version: version,
            AccessKeyId: accessKeyId,
            SecretAccessKey: secretAccessKey,
            SessionToken: sessionToken,
            Expiration: expiration,
          } = data;

          if (version !== 1) {
            throw Error(`Profile ${profileName} credential_process did not return Version 1.`);
          }

          if (accessKeyId === undefined || secretAccessKey === undefined) {
            throw Error(`Profile ${profileName} credential_process returned invalid credentials.`);
          }

          let expirationUnix;

          if (expiration) {
            const currentTime = new Date();
            const expireTime = new Date(expiration);
            if (expireTime < currentTime) {
              throw Error(`Profile ${profileName} credential_process returned expired credentials.`);
            }
            expirationUnix = Math.floor(new Date(expiration).valueOf() / 1000);
          }

          return {
            accessKeyId,
            secretAccessKey,
            sessionToken,
            expirationUnix,
          };
        })
        .catch((error: Error) => {
          throw new ProviderError(error.message);
        });
    } else {
      throw new ProviderError(`Profile ${profileName} did not contain credential_process.`);
    }
  } else {
    // If the profile cannot be parsed or does not contain the default or
    // specified profile throw an error. This should be considered a terminal
    // resolution error if a profile has been specified by the user (whether via
    // a parameter, anenvironment variable, or another profile's `source_profile` key).
    throw new ProviderError(`Profile ${profileName} could not be found in shared credentials file.`);
  }
};

const execPromise = (command: string) =>
  new Promise(function (resolve, reject) {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stdout.trim());
    });
  });
