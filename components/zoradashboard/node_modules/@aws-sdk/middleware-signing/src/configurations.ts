import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Credentials, HashConstructor, Provider, RegionInfo, RegionInfoProvider, RequestSigner } from "@aws-sdk/types";

export interface AwsAuthInputConfig {
  /**
   * The credentials used to sign requests.
   */
  credentials?: Credentials | Provider<Credentials>;

  /**
   * The signer to use when signing requests.
   */
  signer?: RequestSigner | Provider<RequestSigner>;

  /**
   * Whether to escape request path when signing the request.
   */
  signingEscapePath?: boolean;

  /**
   * An offset value in milliseconds to apply to all signing times.
   */
  systemClockOffset?: number;

  /**
   * The region where you want to sign your request against. This
   * can be different to the region in the endpoint.
   */
  signingRegion?: string;
}
interface PreviouslyResolved {
  credentialDefaultProvider: (input: any) => Provider<Credentials>;
  region: string | Provider<string>;
  regionInfoProvider: RegionInfoProvider;
  signingName?: string;
  serviceId: string;
  sha256: HashConstructor;
}
export interface AwsAuthResolvedConfig {
  credentials: Provider<Credentials>;
  signer: Provider<RequestSigner>;
  signingEscapePath: boolean;
  systemClockOffset: number;
}
export function resolveAwsAuthConfig<T>(input: T & AwsAuthInputConfig & PreviouslyResolved): T & AwsAuthResolvedConfig {
  const credentials = input.credentials || input.credentialDefaultProvider(input as any);
  const normalizedCreds = normalizeProvider(credentials);
  const { signingEscapePath = true, systemClockOffset = input.systemClockOffset || 0, sha256 } = input;
  let signer: Provider<RequestSigner>;
  if (input.signer) {
    //if signer is supplied by user, normalize it to a function returning a promise for signer.
    signer = normalizeProvider(input.signer);
  } else {
    //construct a provider inferring signing from region.
    signer = () =>
      normalizeProvider(input.region)()
        .then(async (region) => [(await input.regionInfoProvider(region)) || {}, region] as [RegionInfo, string])
        .then(([regionInfo, region]) => {
          const { signingRegion, signingService } = regionInfo;
          //update client's singing region and signing service config if they are resolved.
          //signing region resolving order: user supplied signingRegion -> endpoints.json inferred region -> client region
          input.signingRegion = input.signingRegion || signingRegion || region;
          //signing name resolving order:
          //user supplied signingName -> endpoints.json inferred (credential scope -> model arnNamespace) -> model service id
          input.signingName = input.signingName || signingService || input.serviceId;

          return new SignatureV4({
            credentials: normalizedCreds,
            region: input.signingRegion,
            service: input.signingName,
            sha256,
            uriEscapePath: signingEscapePath,
          });
        });
  }

  return {
    ...input,
    systemClockOffset,
    signingEscapePath,
    credentials: normalizedCreds,
    signer,
  };
}

function normalizeProvider<T>(input: T | Provider<T>): Provider<T> {
  if (typeof input === "object") {
    const promisified = Promise.resolve(input);
    return () => promisified;
  }
  return input as Provider<T>;
}
