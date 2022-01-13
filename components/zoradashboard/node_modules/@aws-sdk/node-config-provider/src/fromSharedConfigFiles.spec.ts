import { ProviderError } from "@aws-sdk/property-provider";
import { loadSharedConfigFiles, ParsedIniData, Profile } from "@aws-sdk/shared-ini-file-loader";

import { ENV_PROFILE, fromSharedConfigFiles, GetterFromConfig, SharedConfigInit } from "./fromSharedConfigFiles";

jest.mock("@aws-sdk/shared-ini-file-loader", () => ({
  loadSharedConfigFiles: jest.fn(),
}));

describe("fromSharedConfigFiles", () => {
  const envProfile = process.env[ENV_PROFILE];
  const configKey = "config_key";
  const configGetter: GetterFromConfig<string> = (profile: Profile) => profile[configKey];

  beforeEach(() => {
    delete process.env[ENV_PROFILE];
  });

  afterAll(() => {
    process.env[ENV_PROFILE] = envProfile;
  });

  const getProviderError = (profile: string, getter: GetterFromConfig<string>) =>
    new ProviderError(`Cannot load config for profile ${profile} in SDK configuration files with getter: ${getter}`);

  describe("loadedConfig", () => {
    const mockConfigAnswer = "mockConfigAnswer";
    const mockConfigNotAnswer = "mockConfigNotAnswer";
    const mockCredentialsAnswer = "mockCredentialsAnswer";
    const mockCredentialsNotAnswer = "mockCredentialsNotAnswer";

    type LoadedConfigTestData = {
      message: string;
      iniDataInConfig: ParsedIniData;
      iniDataInCredentials: ParsedIniData;
    } & SharedConfigInit;

    const loadedConfigResolves: (LoadedConfigTestData & {
      configValueToVerify: string;
    })[] = [
      {
        message: "returns configValue from default profile",
        iniDataInConfig: {
          default: { [configKey]: mockConfigAnswer },
        },
        iniDataInCredentials: {
          default: { [configKey]: mockCredentialsNotAnswer },
        },
        configValueToVerify: mockConfigAnswer,
      },
      {
        message: "returns configValue from designated profile",
        iniDataInConfig: {
          default: { [configKey]: mockConfigNotAnswer },
          foo: { [configKey]: mockConfigAnswer },
        },
        iniDataInCredentials: {
          foo: { [configKey]: mockCredentialsNotAnswer },
        },
        profile: "foo",
        configValueToVerify: mockConfigAnswer,
      },
      {
        message: "returns configValue from credentials file if preferred",
        iniDataInConfig: {
          default: { [configKey]: mockConfigNotAnswer },
          foo: { [configKey]: mockConfigNotAnswer },
        },
        iniDataInCredentials: {
          foo: { [configKey]: mockCredentialsAnswer },
        },
        profile: "foo",
        preferredFile: "credentials",
        configValueToVerify: mockCredentialsAnswer,
      },
      {
        message: "returns configValue from config file if preferred credentials file doesn't contain config",
        iniDataInConfig: {
          foo: { [configKey]: mockConfigAnswer },
        },
        iniDataInCredentials: {},
        configValueToVerify: mockConfigAnswer,
        preferredFile: "credentials",
        profile: "foo",
      },
      {
        message: "returns configValue from credential file if preferred config file doesn't contain config",
        iniDataInConfig: {},
        iniDataInCredentials: {
          foo: { [configKey]: mockCredentialsAnswer },
        },
        configValueToVerify: mockCredentialsAnswer,
        profile: "foo",
      },
    ];

    const loadedConfigRejects: LoadedConfigTestData[] = [
      {
        message: "rejects if default profile is not present and profile value is not passed",
        iniDataInConfig: {
          foo: { [configKey]: mockConfigNotAnswer },
        },
        iniDataInCredentials: {},
      },
      {
        message: "rejects if designated profile is not present",
        iniDataInConfig: {
          default: { [configKey]: mockConfigNotAnswer },
        },
        iniDataInCredentials: {},
        profile: "foo",
      },
    ];

    describe("uses the shared ini file loader if pre-loaded config is not supplied", () => {
      loadedConfigResolves.forEach(
        ({ message, iniDataInConfig, iniDataInCredentials, configValueToVerify, profile, preferredFile }) => {
          it(message, () => {
            (loadSharedConfigFiles as jest.Mock).mockResolvedValueOnce({
              configFile: iniDataInConfig,
              credentialsFile: iniDataInCredentials,
            });
            return expect(fromSharedConfigFiles(configGetter, { profile, preferredFile })()).resolves.toBe(
              configValueToVerify
            );
          });
        }
      );

      loadedConfigRejects.forEach(({ message, iniDataInConfig, iniDataInCredentials, profile, preferredFile }) => {
        it(message, () => {
          (loadSharedConfigFiles as jest.Mock).mockResolvedValueOnce({
            configFile: iniDataInConfig,
            credentialsFile: iniDataInCredentials,
          });
          return expect(fromSharedConfigFiles(configGetter, { profile, preferredFile })()).rejects.toMatchObject(
            getProviderError(profile ?? "default", configGetter)
          );
        });
      });
    });

    describe("uses pre-loaded config if supplied", () => {
      loadedConfigResolves.forEach(
        ({ message, iniDataInConfig, iniDataInCredentials, configValueToVerify, profile, preferredFile }) => {
          it(`${message} from config file`, () => {
            const loadedConfig = Promise.resolve({
              configFile: iniDataInConfig,
              credentialsFile: iniDataInCredentials,
            });
            return expect(
              fromSharedConfigFiles(configGetter, { loadedConfig, profile, preferredFile })()
            ).resolves.toBe(configValueToVerify);
          });
        }
      );

      loadedConfigRejects.forEach(({ message, iniDataInConfig, iniDataInCredentials, profile, preferredFile }) => {
        it(message, () => {
          const loadedConfig = Promise.resolve({
            configFile: iniDataInConfig,
            credentialsFile: iniDataInCredentials,
          });
          return expect(
            fromSharedConfigFiles(configGetter, { loadedConfig, profile, preferredFile })()
          ).rejects.toMatchObject(getProviderError(profile ?? "default", configGetter));
        });
      });
    });

    it("rejects if getter throws", () => {
      const message = "Cannot load config";
      const failGetter = () => {
        throw new Error(message);
      };
      (loadSharedConfigFiles as jest.Mock).mockResolvedValueOnce({
        configFile: {},
        credentialsFile: {},
      });
      return expect(fromSharedConfigFiles(failGetter)()).rejects.toMatchObject(new ProviderError(message));
    });
  });

  describe("profile", () => {
    const loadedConfigData = {
      configFile: {
        default: { [configKey]: "configFileDefault" },
        foo: { [configKey]: "configFileFoo" },
      },
      credentialsFile: {
        default: { [configKey]: "credentialsFileDefault" },
      },
    };
    const loadedConfig = Promise.resolve(loadedConfigData);

    describe("when profile is not defined", () => {
      it(`returns configValue from value in '${ENV_PROFILE}' env var if it is set`, () => {
        const profile = "foo";
        process.env[ENV_PROFILE] = profile;
        return expect(fromSharedConfigFiles(configGetter, { loadedConfig })()).resolves.toBe(
          loadedConfigData.configFile[profile][configKey]
        );
      });

      it(`returns configValue from default profile if '${ENV_PROFILE}' env var is not set`, () => {
        return expect(fromSharedConfigFiles(configGetter, { loadedConfig })()).resolves.toBe(
          loadedConfigData.configFile.default[configKey]
        );
      });
    });
  });
});
