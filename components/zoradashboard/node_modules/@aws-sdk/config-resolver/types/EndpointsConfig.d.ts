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
export declare const resolveEndpointsConfig: <T>(input: T & EndpointsInputConfig & PreviouslyResolved) => T & EndpointsResolvedConfig;
export {};
