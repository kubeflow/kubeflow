import { LoadedConfigSelectors, LocalConfigOptions } from "@aws-sdk/node-config-provider";
import { Provider } from "@aws-sdk/types";

export const REGION_ENV_NAME = "AWS_REGION";
export const REGION_INI_NAME = "region";

export const NODE_REGION_CONFIG_OPTIONS: LoadedConfigSelectors<string> = {
  environmentVariableSelector: (env) => env[REGION_ENV_NAME],
  configFileSelector: (profile) => profile[REGION_INI_NAME],
  default: () => {
    throw new Error("Region is missing");
  },
};

export const NODE_REGION_CONFIG_FILE_OPTIONS: LocalConfigOptions = {
  preferredFile: "credentials",
};

export interface RegionInputConfig {
  /**
   * The AWS region to which this client will send requests
   */
  region?: string | Provider<string>;
}

interface PreviouslyResolved {}

export interface RegionResolvedConfig {
  region: Provider<string>;
}

export const resolveRegionConfig = <T>(input: T & RegionInputConfig & PreviouslyResolved): T & RegionResolvedConfig => {
  if (!input.region) {
    throw new Error("Region is missing");
  }
  return {
    ...input,
    region: normalizeRegion(input.region!),
  };
};

const normalizeRegion = (region: string | Provider<string>): Provider<string> => {
  if (typeof region === "string") {
    const promisified = Promise.resolve(region);
    return () => promisified;
  }
  return region as Provider<string>;
};
