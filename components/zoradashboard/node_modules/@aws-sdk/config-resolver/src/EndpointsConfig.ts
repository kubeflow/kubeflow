import { Endpoint, Provider, RegionInfoProvider, UrlParser } from "@aws-sdk/types";

export interface EndpointsInputConfig {
  /**
   * The fully qualified endpoint of the webservice. This is only required when using a custom endpoint (for example, when using a local version of S3).
   */
  endpoint?: string | Endpoint | Provider<Endpoint>;

  /**
   * Whether TLS is enabled for requests.
   */
  tls?: boolean;
}

interface PreviouslyResolved {
  regionInfoProvider: RegionInfoProvider;
  urlParser: UrlParser;
  region: Provider<string>;
}

export interface EndpointsResolvedConfig extends Required<EndpointsInputConfig> {
  endpoint: Provider<Endpoint>;
  isCustomEndpoint: boolean;
}

export const resolveEndpointsConfig = <T>(
  input: T & EndpointsInputConfig & PreviouslyResolved
): T & EndpointsResolvedConfig => ({
  ...input,
  tls: input.tls ?? true,
  endpoint: input.endpoint ? normalizeEndpoint(input) : () => getEndPointFromRegion(input),
  isCustomEndpoint: input.endpoint ? true : false,
});

const normalizeEndpoint = (input: EndpointsInputConfig & PreviouslyResolved): Provider<Endpoint> => {
  const { endpoint, urlParser } = input;
  if (typeof endpoint === "string") {
    const promisified = Promise.resolve(urlParser(endpoint));
    return () => promisified;
  } else if (typeof endpoint === "object") {
    const promisified = Promise.resolve(endpoint);
    return () => promisified;
  }
  return endpoint!;
};

const getEndPointFromRegion = async (input: EndpointsInputConfig & PreviouslyResolved) => {
  const { tls = true } = input;
  const region = await input.region();

  const dnsHostRegex = new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/);
  if (!dnsHostRegex.test(region)) {
    throw new Error("Invalid region in client config");
  }

  const { hostname } = (await input.regionInfoProvider(region)) ?? {};
  if (!hostname) {
    throw new Error("Cannot resolve hostname from client config");
  }

  return input.urlParser(`${tls ? "https:" : "http:"}//${hostname}`);
};
