"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_provider_1 = require("@aws-sdk/property-provider");
const shared_ini_file_loader_1 = require("@aws-sdk/shared-ini-file-loader");
const fromSharedConfigFiles_1 = require("./fromSharedConfigFiles");
jest.mock("@aws-sdk/shared-ini-file-loader", () => ({
    loadSharedConfigFiles: jest.fn(),
}));
describe("fromSharedConfigFiles", () => {
    const envProfile = process.env[fromSharedConfigFiles_1.ENV_PROFILE];
    const configKey = "config_key";
    const configGetter = (profile) => profile[configKey];
    beforeEach(() => {
        delete process.env[fromSharedConfigFiles_1.ENV_PROFILE];
    });
    afterAll(() => {
        process.env[fromSharedConfigFiles_1.ENV_PROFILE] = envProfile;
    });
    const getProviderError = (profile, getter) => new property_provider_1.ProviderError(`Cannot load config for profile ${profile} in SDK configuration files with getter: ${getter}`);
    describe("loadedConfig", () => {
        const mockConfigAnswer = "mockConfigAnswer";
        const mockConfigNotAnswer = "mockConfigNotAnswer";
        const mockCredentialsAnswer = "mockCredentialsAnswer";
        const mockCredentialsNotAnswer = "mockCredentialsNotAnswer";
        const loadedConfigResolves = [
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
        const loadedConfigRejects = [
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
            loadedConfigResolves.forEach(({ message, iniDataInConfig, iniDataInCredentials, configValueToVerify, profile, preferredFile }) => {
                it(message, () => {
                    shared_ini_file_loader_1.loadSharedConfigFiles.mockResolvedValueOnce({
                        configFile: iniDataInConfig,
                        credentialsFile: iniDataInCredentials,
                    });
                    return expect(fromSharedConfigFiles_1.fromSharedConfigFiles(configGetter, { profile, preferredFile })()).resolves.toBe(configValueToVerify);
                });
            });
            loadedConfigRejects.forEach(({ message, iniDataInConfig, iniDataInCredentials, profile, preferredFile }) => {
                it(message, () => {
                    shared_ini_file_loader_1.loadSharedConfigFiles.mockResolvedValueOnce({
                        configFile: iniDataInConfig,
                        credentialsFile: iniDataInCredentials,
                    });
                    return expect(fromSharedConfigFiles_1.fromSharedConfigFiles(configGetter, { profile, preferredFile })()).rejects.toMatchObject(getProviderError(profile !== null && profile !== void 0 ? profile : "default", configGetter));
                });
            });
        });
        describe("uses pre-loaded config if supplied", () => {
            loadedConfigResolves.forEach(({ message, iniDataInConfig, iniDataInCredentials, configValueToVerify, profile, preferredFile }) => {
                it(`${message} from config file`, () => {
                    const loadedConfig = Promise.resolve({
                        configFile: iniDataInConfig,
                        credentialsFile: iniDataInCredentials,
                    });
                    return expect(fromSharedConfigFiles_1.fromSharedConfigFiles(configGetter, { loadedConfig, profile, preferredFile })()).resolves.toBe(configValueToVerify);
                });
            });
            loadedConfigRejects.forEach(({ message, iniDataInConfig, iniDataInCredentials, profile, preferredFile }) => {
                it(message, () => {
                    const loadedConfig = Promise.resolve({
                        configFile: iniDataInConfig,
                        credentialsFile: iniDataInCredentials,
                    });
                    return expect(fromSharedConfigFiles_1.fromSharedConfigFiles(configGetter, { loadedConfig, profile, preferredFile })()).rejects.toMatchObject(getProviderError(profile !== null && profile !== void 0 ? profile : "default", configGetter));
                });
            });
        });
        it("rejects if getter throws", () => {
            const message = "Cannot load config";
            const failGetter = () => {
                throw new Error(message);
            };
            shared_ini_file_loader_1.loadSharedConfigFiles.mockResolvedValueOnce({
                configFile: {},
                credentialsFile: {},
            });
            return expect(fromSharedConfigFiles_1.fromSharedConfigFiles(failGetter)()).rejects.toMatchObject(new property_provider_1.ProviderError(message));
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
            it(`returns configValue from value in '${fromSharedConfigFiles_1.ENV_PROFILE}' env var if it is set`, () => {
                const profile = "foo";
                process.env[fromSharedConfigFiles_1.ENV_PROFILE] = profile;
                return expect(fromSharedConfigFiles_1.fromSharedConfigFiles(configGetter, { loadedConfig })()).resolves.toBe(loadedConfigData.configFile[profile][configKey]);
            });
            it(`returns configValue from default profile if '${fromSharedConfigFiles_1.ENV_PROFILE}' env var is not set`, () => {
                return expect(fromSharedConfigFiles_1.fromSharedConfigFiles(configGetter, { loadedConfig })()).resolves.toBe(loadedConfigData.configFile.default[configKey]);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVNoYXJlZENvbmZpZ0ZpbGVzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnJvbVNoYXJlZENvbmZpZ0ZpbGVzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrRUFBMkQ7QUFDM0QsNEVBQWdHO0FBRWhHLG1FQUFpSDtBQUVqSCxJQUFJLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbEQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtDQUNqQyxDQUFDLENBQUMsQ0FBQztBQUVKLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLEVBQUU7SUFDckMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBVyxDQUFDLENBQUM7SUFDNUMsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDO0lBQy9CLE1BQU0sWUFBWSxHQUE2QixDQUFDLE9BQWdCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUV4RixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFXLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFXLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLGdCQUFnQixHQUFHLENBQUMsT0FBZSxFQUFFLE1BQWdDLEVBQUUsRUFBRSxDQUM3RSxJQUFJLGlDQUFhLENBQUMsa0NBQWtDLE9BQU8sNENBQTRDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFFbkgsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7UUFDNUIsTUFBTSxnQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM1QyxNQUFNLG1CQUFtQixHQUFHLHFC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QUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNsRixnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQ2hELENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxnREFBZ0QsbUNBQVcsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO2dCQUN6RixPQUFPLE1BQU0sQ0FBQyw2Q0FBcUIsQ0FBQyxZQUFZLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNsRixnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUMvQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlckVycm9yIH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3BlcnR5LXByb3ZpZGVyXCI7XG5pbXBvcnQgeyBsb2FkU2hhcmVkQ29uZmlnRmlsZXMsIFBhcnNlZEluaURhdGEsIFByb2ZpbGUgfSBmcm9tIFwiQGF3cy1zZGsvc2hhcmVkLWluaS1maWxlLWxvYWRlclwiO1xuXG5pbXBvcnQgeyBFTlZfUFJPRklMRSwgZnJvbVNoYXJlZENvbmZpZ0ZpbGVzLCBHZXR0ZXJGcm9tQ29uZmlnLCBTaGFyZWRDb25maWdJbml0IH0gZnJvbSBcIi4vZnJvbVNoYXJlZENvbmZpZ0ZpbGVzXCI7XG5cbmplc3QubW9jayhcIkBhd3Mtc2RrL3NoYXJlZC1pbmktZmlsZS1sb2FkZXJcIiwgKCkgPT4gKHtcbiAgbG9hZFNoYXJlZENvbmZpZ0ZpbGVzOiBqZXN0LmZuKCksXG59KSk7XG5cbmRlc2NyaWJlKFwiZnJvbVNoYXJlZENvbmZpZ0ZpbGVzXCIsICgpID0+IHtcbiAgY29uc3QgZW52UHJvZmlsZSA9IHByb2Nlc3MuZW52W0VOVl9QUk9GSUxFXTtcbiAgY29uc3QgY29uZmlnS2V5ID0gXCJjb25maWdfa2V5XCI7XG4gIGNvbnN0IGNvbmZpZ0dldHRlcjogR2V0dGVyRnJvbUNvbmZpZzxzdHJpbmc+ID0gKHByb2ZpbGU6IFByb2ZpbGUpID0+IHByb2ZpbGVbY29uZmlnS2V5XTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBkZWxldGUgcHJvY2Vzcy5lbnZbRU5WX1BST0ZJTEVdO1xuICB9KTtcblxuICBhZnRlckFsbCgoKSA9PiB7XG4gICAgcHJvY2Vzcy5lbnZbRU5WX1BST0ZJTEVdID0gZW52UHJvZmlsZTtcbiAgfSk7XG5cbiAgY29uc3QgZ2V0UHJvdmlkZXJFcnJvciA9IChwcm9maWxlOiBzdHJpbmcsIGdldHRlcjogR2V0dGVyRnJvbUNvbmZpZzxzdHJpbmc+KSA9PlxuICAgIG5ldyBQcm92aWRlckVycm9yKGBDYW5ub3QgbG9hZCBjb25maWcgZm9yIHByb2ZpbGUgJHtwcm9maWxlfSBpbiBTREsgY29uZmlndXJhdGlvbiBmaWxlcyB3aXRoIGdldHRlcjogJHtnZXR0ZXJ9YCk7XG5cbiAgZGVzY3JpYmUoXCJsb2FkZWRDb25maWdcIiwgKCkgPT4ge1xuICAgIGNvbnN0IG1vY2tDb25maWdBbnN3ZXIgPSBcIm1vY2tDb25maWdBbnN3ZXJcIjtcbiAgICBjb25zdCBtb2NrQ29uZmlnTm90QW5zd2VyID0gXCJtb2NrQ29uZmlnTm90QW5zd2VyXCI7XG4gICAgY29uc3QgbW9ja0NyZWRlbnRpYWxzQW5zd2VyID0gXCJtb2NrQ3JlZGVudGlhbHNBbnN3ZXJcIjtcbiAgICBjb25zdCBtb2NrQ3JlZGVudGlhbHNOb3RBbnN3ZXIgPSBcIm1vY2tDcmVkZW50aWFsc05vdEFuc3dlclwiO1xuXG4gICAgdHlwZSBMb2FkZWRDb25maWdUZXN0RGF0YSA9IHtcbiAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgIGluaURhdGFJbkNvbmZpZzogUGFyc2VkSW5pRGF0YTtcbiAgICAgIGluaURhdGFJbkNyZWRlbnRpYWxzOiBQYXJzZWRJbmlEYXRhO1xuICAgIH0gJiBTaGFyZWRDb25maWdJbml0O1xuXG4gICAgY29uc3QgbG9hZGVkQ29uZmlnUmVzb2x2ZXM6IChMb2FkZWRDb25maWdUZXN0RGF0YSAmIHtcbiAgICAgIGNvbmZpZ1ZhbHVlVG9WZXJpZnk6IHN0cmluZztcbiAgICB9KVtdID0gW1xuICAgICAge1xuICAgICAgICBtZXNzYWdlOiBcInJldHVybnMgY29uZmlnVmFsdWUgZnJvbSBkZWZhdWx0IHByb2ZpbGVcIixcbiAgICAgICAgaW5pRGF0YUluQ29uZmlnOiB7XG4gICAgICAgICAgZGVmYXVsdDogeyBbY29uZmlnS2V5XTogbW9ja0NvbmZpZ0Fuc3dlciB9LFxuICAgICAgICB9LFxuICAgICAgICBpbmlEYXRhSW5DcmVkZW50aWFsczoge1xuICAgICAgICAgIGRlZmF1bHQ6IHsgW2NvbmZpZ0tleV06IG1vY2tDcmVkZW50aWFsc05vdEFuc3dlciB9LFxuICAgICAgICB9LFxuICAgICAgICBjb25maWdWYWx1ZVRvVmVyaWZ5OiBtb2NrQ29uZmlnQW5zd2VyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbWVzc2FnZTogXCJyZXR1cm5zIGNvbmZpZ1ZhbHVlIGZyb20gZGVzaWduYXRlZCBwcm9maWxlXCIsXG4gICAgICAgIGluaURhdGFJbkNvbmZpZzoge1xuICAgICAgICAgIGRlZmF1bHQ6IHsgW2NvbmZpZ0tleV06IG1vY2tDb25maWdOb3RBbnN3ZXIgfSxcbiAgICAgICAgICBmb286IHsgW2NvbmZpZ0tleV06IG1vY2tDb25maWdBbnN3ZXIgfSxcbiAgICAgICAgfSxcbiAgICAgICAgaW5pRGF0YUluQ3JlZGVudGlhbHM6IHtcbiAgICAgICAgICBmb286IHsgW2NvbmZpZ0tleV06IG1vY2tDcmVkZW50aWFsc05vdEFuc3dlciB9LFxuICAgICAgICB9LFxuICAgICAgICBwcm9maWxlOiBcImZvb1wiLFxuICAgICAgICBjb25maWdWYWx1ZVRvVmVyaWZ5OiBtb2NrQ29uZmlnQW5zd2VyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbWVzc2FnZTogXCJyZXR1cm5zIGNvbmZpZ1ZhbHVlIGZyb20gY3JlZGVudGlhbHMgZmlsZSBpZiBwcmVmZXJyZWRcIixcbiAgICAgICAgaW5pRGF0YUluQ29uZmlnOiB7XG4gICAgICAgICAgZGVmYXVsdDogeyBbY29uZmlnS2V5XTogbW9ja0NvbmZpZ05vdEFuc3dlciB9LFxuICAgICAgICAgIGZvbzogeyBbY29uZmlnS2V5XTogbW9ja0NvbmZpZ05vdEFuc3dlciB9LFxuICAgICAgICB9LFxuICAgICAgICBpbmlEYXRhSW5DcmVkZW50aWFsczoge1xuICAgICAgICAgIGZvbzogeyBbY29uZmlnS2V5XTogbW9ja0NyZWRlbnRpYWxzQW5zd2VyIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHByb2ZpbGU6IFwiZm9vXCIsXG4gICAgICAgIHByZWZlcnJlZEZpbGU6IFwiY3JlZGVudGlhbHNcIixcbiAgICAgICAgY29uZmlnVmFsdWVUb1ZlcmlmeTogbW9ja0NyZWRlbnRpYWxzQW5zd2VyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbWVzc2FnZTogXCJyZXR1cm5zIGNvbmZpZ1ZhbHVlIGZyb20gY29uZmlnIGZpbGUgaWYgcHJlZmVycmVkIGNyZWRlbnRpYWxzIGZpbGUgZG9lc24ndCBjb250YWluIGNvbmZpZ1wiLFxuICAgICAgICBpbmlEYXRhSW5Db25maWc6IHtcbiAgICAgICAgICBmb286IHsgW2NvbmZpZ0tleV06IG1vY2tDb25maWdBbnN3ZXIgfSxcbiAgICAgICAgfSxcbiAgICAgICAgaW5pRGF0YUluQ3JlZGVudGlhbHM6IHt9LFxuICAgICAgICBjb25maWdWYWx1ZVRvVmVyaWZ5OiBtb2NrQ29uZmlnQW5zd2VyLFxuICAgICAgICBwcmVmZXJyZWRGaWxlOiBcImNyZWRlbnRpYWxzXCIsXG4gICAgICAgIHByb2ZpbGU6IFwiZm9vXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBtZXNzYWdlOiBcInJldHVybnMgY29uZmlnVmFsdWUgZnJvbSBjcmVkZW50aWFsIGZpbGUgaWYgcHJlZmVycmVkIGNvbmZpZyBmaWxlIGRvZXNuJ3QgY29udGFpbiBjb25maWdcIixcbiAgICAgICAgaW5pRGF0YUluQ29uZmlnOiB7fSxcbiAgICAgICAgaW5pRGF0YUluQ3JlZGVudGlhbHM6IHtcbiAgICAgICAgICBmb286IHsgW2NvbmZpZ0tleV06IG1vY2tDcmVkZW50aWFsc0Fuc3dlciB9LFxuICAgICAgICB9LFxuICAgICAgICBjb25maWdWYWx1ZVRvVmVyaWZ5OiBtb2NrQ3JlZGVudGlhbHNBbnN3ZXIsXG4gICAgICAgIHByb2ZpbGU6IFwiZm9vXCIsXG4gICAgICB9LFxuICAgIF07XG5cbiAgICBjb25zdCBsb2FkZWRDb25maWdSZWplY3RzOiBMb2FkZWRDb25maWdUZXN0RGF0YVtdID0gW1xuICAgICAge1xuICAgICAgICBtZXNzYWdlOiBcInJlamVjdHMgaWYgZGVmYXVsdCBwcm9maWxlIGlzIG5vdCBwcmVzZW50IGFuZCBwcm9maWxlIHZhbHVlIGlzIG5vdCBwYXNzZWRcIixcbiAgICAgICAgaW5pRGF0YUluQ29uZmlnOiB7XG4gICAgICAgICAgZm9vOiB7IFtjb25maWdLZXldOiBtb2NrQ29uZmlnTm90QW5zd2VyIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGluaURhdGFJbkNyZWRlbnRpYWxzOiB7fSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG1lc3NhZ2U6IFwicmVqZWN0cyBpZiBkZXNpZ25hdGVkIHByb2ZpbGUgaXMgbm90IHByZXNlbnRcIixcbiAgICAgICAgaW5pRGF0YUluQ29uZmlnOiB7XG4gICAgICAgICAgZGVmYXVsdDogeyBbY29uZmlnS2V5XTogbW9ja0NvbmZpZ05vdEFuc3dlciB9LFxuICAgICAgICB9LFxuICAgICAgICBpbmlEYXRhSW5DcmVkZW50aWFsczoge30sXG4gICAgICAgIHByb2ZpbGU6IFwiZm9vXCIsXG4gICAgICB9LFxuICAgIF07XG5cbiAgICBkZXNjcmliZShcInVzZXMgdGhlIHNoYXJlZCBpbmkgZmlsZSBsb2FkZXIgaWYgcHJlLWxvYWRlZCBjb25maWcgaXMgbm90IHN1cHBsaWVkXCIsICgpID0+IHtcbiAgICAgIGxvYWRlZENvbmZpZ1Jlc29sdmVzLmZvckVhY2goXG4gICAgICAgICh7IG1lc3NhZ2UsIGluaURhdGFJbkNvbmZpZywgaW5pRGF0YUluQ3JlZGVudGlhbHMsIGNvbmZpZ1ZhbHVlVG9WZXJpZnksIHByb2ZpbGUsIHByZWZlcnJlZEZpbGUgfSkgPT4ge1xuICAgICAgICAgIGl0KG1lc3NhZ2UsICgpID0+IHtcbiAgICAgICAgICAgIChsb2FkU2hhcmVkQ29uZmlnRmlsZXMgYXMgamVzdC5Nb2NrKS5tb2NrUmVzb2x2ZWRWYWx1ZU9uY2Uoe1xuICAgICAgICAgICAgICBjb25maWdGaWxlOiBpbmlEYXRhSW5Db25maWcsXG4gICAgICAgICAgICAgIGNyZWRlbnRpYWxzRmlsZTogaW5pRGF0YUluQ3JlZGVudGlhbHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBleHBlY3QoZnJvbVNoYXJlZENvbmZpZ0ZpbGVzKGNvbmZpZ0dldHRlciwgeyBwcm9maWxlLCBwcmVmZXJyZWRGaWxlIH0pKCkpLnJlc29sdmVzLnRvQmUoXG4gICAgICAgICAgICAgIGNvbmZpZ1ZhbHVlVG9WZXJpZnlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIGxvYWRlZENvbmZpZ1JlamVjdHMuZm9yRWFjaCgoeyBtZXNzYWdlLCBpbmlEYXRhSW5Db25maWcsIGluaURhdGFJbkNyZWRlbnRpYWxzLCBwcm9maWxlLCBwcmVmZXJyZWRGaWxlIH0pID0+IHtcbiAgICAgICAgaXQobWVzc2FnZSwgKCkgPT4ge1xuICAgICAgICAgIChsb2FkU2hhcmVkQ29uZmlnRmlsZXMgYXMgamVzdC5Nb2NrKS5tb2NrUmVzb2x2ZWRWYWx1ZU9uY2Uoe1xuICAgICAgICAgICAgY29uZmlnRmlsZTogaW5pRGF0YUluQ29uZmlnLFxuICAgICAgICAgICAgY3JlZGVudGlhbHNGaWxlOiBpbmlEYXRhSW5DcmVkZW50aWFscyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gZXhwZWN0KGZyb21TaGFyZWRDb25maWdGaWxlcyhjb25maWdHZXR0ZXIsIHsgcHJvZmlsZSwgcHJlZmVycmVkRmlsZSB9KSgpKS5yZWplY3RzLnRvTWF0Y2hPYmplY3QoXG4gICAgICAgICAgICBnZXRQcm92aWRlckVycm9yKHByb2ZpbGUgPz8gXCJkZWZhdWx0XCIsIGNvbmZpZ0dldHRlcilcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoXCJ1c2VzIHByZS1sb2FkZWQgY29uZmlnIGlmIHN1cHBsaWVkXCIsICgpID0+IHtcbiAgICAgIGxvYWRlZENvbmZpZ1Jlc29sdmVzLmZvckVhY2goXG4gICAgICAgICh7IG1lc3NhZ2UsIGluaURhdGFJbkNvbmZpZywgaW5pRGF0YUluQ3JlZGVudGlhbHMsIGNvbmZpZ1ZhbHVlVG9WZXJpZnksIHByb2ZpbGUsIHByZWZlcnJlZEZpbGUgfSkgPT4ge1xuICAgICAgICAgIGl0KGAke21lc3NhZ2V9IGZyb20gY29uZmlnIGZpbGVgLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsb2FkZWRDb25maWcgPSBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICAgICAgICBjb25maWdGaWxlOiBpbmlEYXRhSW5Db25maWcsXG4gICAgICAgICAgICAgIGNyZWRlbnRpYWxzRmlsZTogaW5pRGF0YUluQ3JlZGVudGlhbHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBleHBlY3QoXG4gICAgICAgICAgICAgIGZyb21TaGFyZWRDb25maWdGaWxlcyhjb25maWdHZXR0ZXIsIHsgbG9hZGVkQ29uZmlnLCBwcm9maWxlLCBwcmVmZXJyZWRGaWxlIH0pKClcbiAgICAgICAgICAgICkucmVzb2x2ZXMudG9CZShjb25maWdWYWx1ZVRvVmVyaWZ5KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgbG9hZGVkQ29uZmlnUmVqZWN0cy5mb3JFYWNoKCh7IG1lc3NhZ2UsIGluaURhdGFJbkNvbmZpZywgaW5pRGF0YUluQ3JlZGVudGlhbHMsIHByb2ZpbGUsIHByZWZlcnJlZEZpbGUgfSkgPT4ge1xuICAgICAgICBpdChtZXNzYWdlLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgbG9hZGVkQ29uZmlnID0gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICAgIGNvbmZpZ0ZpbGU6IGluaURhdGFJbkNvbmZpZyxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzRmlsZTogaW5pRGF0YUluQ3JlZGVudGlhbHMsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGV4cGVjdChcbiAgICAgICAgICAgIGZyb21TaGFyZWRDb25maWdGaWxlcyhjb25maWdHZXR0ZXIsIHsgbG9hZGVkQ29uZmlnLCBwcm9maWxlLCBwcmVmZXJyZWRGaWxlIH0pKClcbiAgICAgICAgICApLnJlamVjdHMudG9NYXRjaE9iamVjdChnZXRQcm92aWRlckVycm9yKHByb2ZpbGUgPz8gXCJkZWZhdWx0XCIsIGNvbmZpZ0dldHRlcikpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoXCJyZWplY3RzIGlmIGdldHRlciB0aHJvd3NcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IFwiQ2Fubm90IGxvYWQgY29uZmlnXCI7XG4gICAgICBjb25zdCBmYWlsR2V0dGVyID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9O1xuICAgICAgKGxvYWRTaGFyZWRDb25maWdGaWxlcyBhcyBqZXN0Lk1vY2spLm1vY2tSZXNvbHZlZFZhbHVlT25jZSh7XG4gICAgICAgIGNvbmZpZ0ZpbGU6IHt9LFxuICAgICAgICBjcmVkZW50aWFsc0ZpbGU6IHt9LFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZXhwZWN0KGZyb21TaGFyZWRDb25maWdGaWxlcyhmYWlsR2V0dGVyKSgpKS5yZWplY3RzLnRvTWF0Y2hPYmplY3QobmV3IFByb3ZpZGVyRXJyb3IobWVzc2FnZSkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZShcInByb2ZpbGVcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGxvYWRlZENvbmZpZ0RhdGEgPSB7XG4gICAgICBjb25maWdGaWxlOiB7XG4gICAgICAgIGRlZmF1bHQ6IHsgW2NvbmZpZ0tleV06IFwiY29uZmlnRmlsZURlZmF1bHRcIiB9LFxuICAgICAgICBmb286IHsgW2NvbmZpZ0tleV06IFwiY29uZmlnRmlsZUZvb1wiIH0sXG4gICAgICB9LFxuICAgICAgY3JlZGVudGlhbHNGaWxlOiB7XG4gICAgICAgIGRlZmF1bHQ6IHsgW2NvbmZpZ0tleV06IFwiY3JlZGVudGlhbHNGaWxlRGVmYXVsdFwiIH0sXG4gICAgICB9LFxuICAgIH07XG4gICAgY29uc3QgbG9hZGVkQ29uZmlnID0gUHJvbWlzZS5yZXNvbHZlKGxvYWRlZENvbmZpZ0RhdGEpO1xuXG4gICAgZGVzY3JpYmUoXCJ3aGVuIHByb2ZpbGUgaXMgbm90IGRlZmluZWRcIiwgKCkgPT4ge1xuICAgICAgaXQoYHJldHVybnMgY29uZmlnVmFsdWUgZnJvbSB2YWx1ZSBpbiAnJHtFTlZfUFJPRklMRX0nIGVudiB2YXIgaWYgaXQgaXMgc2V0YCwgKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9maWxlID0gXCJmb29cIjtcbiAgICAgICAgcHJvY2Vzcy5lbnZbRU5WX1BST0ZJTEVdID0gcHJvZmlsZTtcbiAgICAgICAgcmV0dXJuIGV4cGVjdChmcm9tU2hhcmVkQ29uZmlnRmlsZXMoY29uZmlnR2V0dGVyLCB7IGxvYWRlZENvbmZpZyB9KSgpKS5yZXNvbHZlcy50b0JlKFxuICAgICAgICAgIGxvYWRlZENvbmZpZ0RhdGEuY29uZmlnRmlsZVtwcm9maWxlXVtjb25maWdLZXldXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoYHJldHVybnMgY29uZmlnVmFsdWUgZnJvbSBkZWZhdWx0IHByb2ZpbGUgaWYgJyR7RU5WX1BST0ZJTEV9JyBlbnYgdmFyIGlzIG5vdCBzZXRgLCAoKSA9PiB7XG4gICAgICAgIHJldHVybiBleHBlY3QoZnJvbVNoYXJlZENvbmZpZ0ZpbGVzKGNvbmZpZ0dldHRlciwgeyBsb2FkZWRDb25maWcgfSkoKSkucmVzb2x2ZXMudG9CZShcbiAgICAgICAgICBsb2FkZWRDb25maWdEYXRhLmNvbmZpZ0ZpbGUuZGVmYXVsdFtjb25maWdLZXldXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==