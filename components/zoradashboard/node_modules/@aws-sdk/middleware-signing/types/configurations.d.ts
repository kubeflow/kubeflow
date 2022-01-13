import { Credentials, HashConstructor, Provider, RegionInfoProvider, RequestSigner } from "@aws-sdk/types";
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
export declare function resolveAwsAuthConfig<T>(input: T & AwsAuthInputConfig & PreviouslyResolved): T & AwsAuthResolvedConfig;
export {};
