import { LoadedConfigSelectors, LocalConfigOptions } from "@aws-sdk/node-config-provider";
import { Provider } from "@aws-sdk/types";
export declare const REGION_ENV_NAME = "AWS_REGION";
export declare const REGION_INI_NAME = "region";
export declare const NODE_REGION_CONFIG_OPTIONS: LoadedConfigSelectors<string>;
export declare const NODE_REGION_CONFIG_FILE_OPTIONS: LocalConfigOptions;
export interface RegionInputConfig {
    /**
     * The AWS region to which this client will send requests
     */
    region?: string | Provider<string>;
}
interface PreviouslyResolved {
}
export interface RegionResolvedConfig {
    region: Provider<string>;
}
export declare const resolveRegionConfig: <T>(input: T & RegionInputConfig & PreviouslyResolved) => T & RegionResolvedConfig;
export {};
