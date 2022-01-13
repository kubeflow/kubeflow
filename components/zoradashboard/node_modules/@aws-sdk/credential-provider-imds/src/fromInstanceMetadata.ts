import { ProviderError } from "@aws-sdk/property-provider";
import { CredentialProvider, Credentials } from "@aws-sdk/types";
import { RequestOptions } from "http";

import { httpRequest } from "./remoteProvider/httpRequest";
import { fromImdsCredentials, isImdsCredentials } from "./remoteProvider/ImdsCredentials";
import { providerConfigFromInit, RemoteProviderInit } from "./remoteProvider/RemoteProviderInit";
import { retry } from "./remoteProvider/retry";

const IMDS_IP = "169.254.169.254";
const IMDS_PATH = "/latest/meta-data/iam/security-credentials/";
const IMDS_TOKEN_PATH = "/latest/api/token";

/**
 * Creates a credential provider that will source credentials from the EC2
 * Instance Metadata Service
 */
export const fromInstanceMetadata = (init: RemoteProviderInit = {}): CredentialProvider => {
  // when set to true, metadata service will not fetch token
  let disableFetchToken = false;
  const { timeout, maxRetries } = providerConfigFromInit(init);

  const getCredentials = async (maxRetries: number, options: RequestOptions) => {
    const profile = (
      await retry<string>(async () => {
        let profile: string;
        try {
          profile = await getProfile(options);
        } catch (err) {
          if (err.statusCode === 401) {
            disableFetchToken = false;
          }
          throw err;
        }
        return profile;
      }, maxRetries)
    ).trim();

    return retry(async () => {
      let creds: Credentials;
      try {
        creds = await getCredentialsFromProfile(profile, options);
      } catch (err) {
        if (err.statusCode === 401) {
          disableFetchToken = false;
        }
        throw err;
      }
      return creds;
    }, maxRetries);
  };

  return async () => {
    if (disableFetchToken) {
      return getCredentials(maxRetries, { timeout });
    } else {
      let token: string;
      try {
        token = (await getMetadataToken({ timeout })).toString();
      } catch (error) {
        if (error?.statusCode === 400) {
          throw Object.assign(error, {
            message: "EC2 Metadata token request returned error",
          });
        } else if (error.message === "TimeoutError" || [403, 404, 405].includes(error.statusCode)) {
          disableFetchToken = true;
        }
        return getCredentials(maxRetries, { timeout });
      }
      return getCredentials(maxRetries, {
        timeout,
        headers: {
          "x-aws-ec2-metadata-token": token,
        },
      });
    }
  };
};

const getMetadataToken = async (options: RequestOptions) =>
  httpRequest({
    ...options,
    host: IMDS_IP,
    path: IMDS_TOKEN_PATH,
    method: "PUT",
    headers: {
      "x-aws-ec2-metadata-token-ttl-seconds": "21600",
    },
  });

const getProfile = async (options: RequestOptions) =>
  (await httpRequest({ ...options, host: IMDS_IP, path: IMDS_PATH })).toString();

const getCredentialsFromProfile = async (profile: string, options: RequestOptions) => {
  const credsResponse = JSON.parse(
    (
      await httpRequest({
        ...options,
        host: IMDS_IP,
        path: IMDS_PATH + profile,
      })
    ).toString()
  );

  if (!isImdsCredentials(credsResponse)) {
    throw new ProviderError("Invalid response received from instance metadata service.");
  }

  return fromImdsCredentials(credsResponse);
};
