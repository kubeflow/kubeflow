import { chain, fromStatic, memoize } from "@aws-sdk/property-provider";
import { Profile } from "@aws-sdk/shared-ini-file-loader/src";

import { loadConfig } from "./configLoader";
import { fromEnv } from "./fromEnv";
import { fromSharedConfigFiles, SharedConfigInit } from "./fromSharedConfigFiles";

jest.mock("./fromEnv");
jest.mock("./fromSharedConfigFiles");
jest.mock("@aws-sdk/property-provider");

describe("loadConfig", () => {
  const configuration: SharedConfigInit = {
    profile: "profile",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("passes fromEnv(), fromSharedConfigFiles() and fromStatic() to chain", () => {
    const mockFromEnvReturn = "mockFromEnvReturn";
    (fromEnv as jest.Mock).mockReturnValueOnce(mockFromEnvReturn);
    const mockFromSharedConfigFilesReturn = "mockFromSharedConfigFilesReturn";
    (fromSharedConfigFiles as jest.Mock).mockReturnValueOnce(mockFromSharedConfigFilesReturn);
    const mockFromStatic = "mockFromStatic";
    (fromStatic as jest.Mock).mockReturnValueOnce(mockFromStatic);
    const envVarSelector = (env: NodeJS.ProcessEnv) => env["AWS_CONFIG_FOO"];
    const configKey = (profile: Profile) => profile["aws_config_foo"];
    const defaultValue = "foo-value";
    loadConfig(
      {
        environmentVariableSelector: envVarSelector,
        configFileSelector: configKey,
        default: defaultValue,
      },
      configuration
    );
    expect(fromEnv).toHaveBeenCalledTimes(1);
    expect(fromEnv).toHaveBeenCalledWith(envVarSelector);
    expect(fromSharedConfigFiles).toHaveBeenCalledTimes(1);
    expect(fromSharedConfigFiles).toHaveBeenCalledWith(configKey, configuration);
    expect(fromStatic).toHaveBeenCalledTimes(1);
    expect(fromStatic).toHaveBeenCalledWith(defaultValue);
    expect(chain).toHaveBeenCalledTimes(1);
    expect(chain).toHaveBeenCalledWith(mockFromEnvReturn, mockFromSharedConfigFilesReturn, mockFromStatic);
  });

  it("passes output of chain to memoize", () => {
    const mockChainReturn = "mockChainReturn";
    (chain as jest.Mock).mockReturnValueOnce(mockChainReturn);
    loadConfig({} as any);
    expect(chain).toHaveBeenCalledTimes(1);
    expect(memoize).toHaveBeenCalledTimes(1);
    expect(memoize).toHaveBeenCalledWith(mockChainReturn);
  });

  it("returns output memoize", () => {
    const mockMemoizeReturn = "mockMemoizeReturn";
    (memoize as jest.Mock).mockReturnValueOnce(mockMemoizeReturn);
    expect(loadConfig({} as any)).toEqual(mockMemoizeReturn);
  });
});
