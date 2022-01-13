import { ProviderError } from "@aws-sdk/property-provider";
import { loadSharedConfigFiles } from "@aws-sdk/shared-ini-file-loader";
import { ENV_PROFILE, fromSharedConfigFiles } from "./fromSharedConfigFiles";
jest.mock("@aws-sdk/shared-ini-file-loader", function () { return ({
    loadSharedConfigFiles: jest.fn(),
}); });
describe("fromSharedConfigFiles", function () {
    var envProfile = process.env[ENV_PROFILE];
    var configKey = "config_key";
    var configGetter = function (profile) { return profile[configKey]; };
    beforeEach(function () {
        delete process.env[ENV_PROFILE];
    });
    afterAll(function () {
        process.env[ENV_PROFILE] = envProfile;
    });
    var getProviderError = function (profile, getter) {
        return new ProviderError("Cannot load config for profile " + profile + " in SDK configuration files with getter: " + getter);
    };
    describe("loadedConfig", function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var mockConfigAnswer = "mockConfigAnswer";
        var mockConfigNotAnswer = "mockConfigNotAnswer";
        var mockCredentialsAnswer = "mockCredentialsAnswer";
        var mockCredentialsNotAnswer = "mockCredentialsNotAnswer";
        var loadedConfigResolves = [
            {
                message: "returns configValue from default profile",
                iniDataInConfig: {
                    default: (_a = {}, _a[configKey] = mockConfigAnswer, _a),
                },
                iniDataInCredentials: {
                    default: (_b = {}, _b[configKey] = mockCredentialsNotAnswer, _b),
                },
                configValueToVerify: mockConfigAnswer,
            },
            {
                message: "returns configValue from designated profile",
                iniDataInConfig: {
                    default: (_c = {}, _c[configKey] = mockConfigNotAnswer, _c),
                    foo: (_d = {}, _d[configKey] = mockConfigAnswer, _d),
                },
                iniDataInCredentials: {
                    foo: (_e = {}, _e[configKey] = mockCredentialsNotAnswer, _e),
                },
                profile: "foo",
                configValueToVerify: mockConfigAnswer,
            },
            {
                message: "returns configValue from credentials file if preferred",
                iniDataInConfig: {
                    default: (_f = {}, _f[configKey] = mockConfigNotAnswer, _f),
                    foo: (_g = {}, _g[configKey] = mockConfigNotAnswer, _g),
                },
                iniDataInCredentials: {
                    foo: (_h = {}, _h[configKey] = mockCredentialsAnswer, _h),
                },
                profile: "foo",
                preferredFile: "credentials",
                configValueToVerify: mockCredentialsAnswer,
            },
            {
                message: "returns configValue from config file if preferred credentials file doesn't contain config",
                iniDataInConfig: {
                    foo: (_j = {}, _j[configKey] = mockConfigAnswer, _j),
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
                    foo: (_k = {}, _k[configKey] = mockCredentialsAnswer, _k),
                },
                configValueToVerify: mockCredentialsAnswer,
                profile: "foo",
            },
        ];
        var loadedConfigRejects = [
            {
                message: "rejects if default profile is not present and profile value is not passed",
                iniDataInConfig: {
                    foo: (_l = {}, _l[configKey] = mockConfigNotAnswer, _l),
                },
                iniDataInCredentials: {},
            },
            {
                message: "rejects if designated profile is not present",
                iniDataInConfig: {
                    default: (_m = {}, _m[configKey] = mockConfigNotAnswer, _m),
                },
                iniDataInCredentials: {},
                profile: "foo",
            },
        ];
        describe("uses the shared ini file loader if pre-loaded config is not supplied", function () {
            loadedConfigResolves.forEach(function (_a) {
                var message = _a.message, iniDataInConfig = _a.iniDataInConfig, iniDataInCredentials = _a.iniDataInCredentials, configValueToVerify = _a.configValueToVerify, profile = _a.profile, preferredFile = _a.preferredFile;
                it(message, function () {
                    loadSharedConfigFiles.mockResolvedValueOnce({
                        configFile: iniDataInConfig,
                        credentialsFile: iniDataInCredentials,
                    });
                    return expect(fromSharedConfigFiles(configGetter, { profile: profile, preferredFile: preferredFile })()).resolves.toBe(configValueToVerify);
                });
            });
            loadedConfigRejects.forEach(function (_a) {
                var message = _a.message, iniDataInConfig = _a.iniDataInConfig, iniDataInCredentials = _a.iniDataInCredentials, profile = _a.profile, preferredFile = _a.preferredFile;
                it(message, function () {
                    loadSharedConfigFiles.mockResolvedValueOnce({
                        configFile: iniDataInConfig,
                        credentialsFile: iniDataInCredentials,
                    });
                    return expect(fromSharedConfigFiles(configGetter, { profile: profile, preferredFile: preferredFile })()).rejects.toMatchObject(getProviderError(profile !== null && profile !== void 0 ? profile : "default", configGetter));
                });
            });
        });
        describe("uses pre-loaded config if supplied", function () {
            loadedConfigResolves.forEach(function (_a) {
                var message = _a.message, iniDataInConfig = _a.iniDataInConfig, iniDataInCredentials = _a.iniDataInCredentials, configValueToVerify = _a.configValueToVerify, profile = _a.profile, preferredFile = _a.preferredFile;
                it(message + " from config file", function () {
                    var loadedConfig = Promise.resolve({
                        configFile: iniDataInConfig,
                        credentialsFile: iniDataInCredentials,
                    });
                    return expect(fromSharedConfigFiles(configGetter, { loadedConfig: loadedConfig, profile: profile, preferredFile: preferredFile })()).resolves.toBe(configValueToVerify);
                });
            });
            loadedConfigRejects.forEach(function (_a) {
                var message = _a.message, iniDataInConfig = _a.iniDataInConfig, iniDataInCredentials = _a.iniDataInCredentials, profile = _a.profile, preferredFile = _a.preferredFile;
                it(message, function () {
                    var loadedConfig = Promise.resolve({
                        configFile: iniDataInConfig,
                        credentialsFile: iniDataInCredentials,
                    });
                    return expect(fromSharedConfigFiles(configGetter, { loadedConfig: loadedConfig, profile: profile, preferredFile: preferredFile })()).rejects.toMatchObject(getProviderError(profile !== null && profile !== void 0 ? profile : "default", configGetter));
                });
            });
        });
        it("rejects if getter throws", function () {
            var message = "Cannot load config";
            var failGetter = function () {
                throw new Error(message);
            };
            loadSharedConfigFiles.mockResolvedValueOnce({
                configFile: {},
                credentialsFile: {},
            });
            return expect(fromSharedConfigFiles(failGetter)()).rejects.toMatchObject(new ProviderError(message));
        });
    });
    describe("profile", function () {
        var _a, _b, _c;
        var loadedConfigData = {
            configFile: {
                default: (_a = {}, _a[configKey] = "configFileDefault", _a),
                foo: (_b = {}, _b[configKey] = "configFileFoo", _b),
            },
            credentialsFile: {
                default: (_c = {}, _c[configKey] = "credentialsFileDefault", _c),
            },
        };
        var loadedConfig = Promise.resolve(loadedConfigData);
        describe("when profile is not defined", function () {
            it("returns configValue from value in '" + ENV_PROFILE + "' env var if it is set", function () {
                var profile = "foo";
                process.env[ENV_PROFILE] = profile;
                return expect(fromSharedConfigFiles(configGetter, { loadedConfig: loadedConfig })()).resolves.toBe(loadedConfigData.configFile[profile][configKey]);
            });
            it("returns configValue from default profile if '" + ENV_PROFILE + "' env var is not set", function () {
                return expect(fromSharedConfigFiles(configGetter, { loadedConfig: loadedConfig })()).resolves.toBe(loadedConfigData.configFile.default[configKey]);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVNoYXJlZENvbmZpZ0ZpbGVzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnJvbVNoYXJlZENvbmZpZ0ZpbGVzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxxQkFBcUIsRUFBMEIsTUFBTSxpQ0FBaUMsQ0FBQztBQUVoRyxPQUFPLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFzQyxNQUFNLHlCQUF5QixDQUFDO0FBRWpILElBQUksQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsY0FBTSxPQUFBLENBQUM7SUFDbEQscUJBQXFCLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtDQUNqQyxDQUFDLEVBRmlELENBRWpELENBQUMsQ0FBQztBQUVKLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtJQUNoQyxJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVDLElBQU0sU0FBUyxHQUFHLFlBQVksQ0FBQztJQUMvQixJQUFNLFlBQVksR0FBNkIsVUFBQyxPQUFnQixJQUFLLE9BQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFsQixDQUFrQixDQUFDO0lBRXhGLFVBQVUsQ0FBQztRQUNULE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQztRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLE9BQWUsRUFBRSxNQUFnQztRQUN6RSxPQUFBLElBQUksYUFBYSxDQUFDLG9DQUFrQyxPQUFPLGlEQUE0QyxNQUFRLENBQUM7SUFBaEgsQ0FBZ0gsQ0FBQztJQUVuSCxRQUFR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Z0IsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQ2hELENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxrREFBZ0QsV0FBVyx5QkFBc0IsRUFBRTtnQkFDcEYsT0FBTyxNQUFNLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNsRixnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUMvQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlckVycm9yIH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3BlcnR5LXByb3ZpZGVyXCI7XG5pbXBvcnQgeyBsb2FkU2hhcmVkQ29uZmlnRmlsZXMsIFBhcnNlZEluaURhdGEsIFByb2ZpbGUgfSBmcm9tIFwiQGF3cy1zZGsvc2hhcmVkLWluaS1maWxlLWxvYWRlclwiO1xuXG5pbXBvcnQgeyBFTlZfUFJPRklMRSwgZnJvbVNoYXJlZENvbmZpZ0ZpbGVzLCBHZXR0ZXJGcm9tQ29uZmlnLCBTaGFyZWRDb25maWdJbml0IH0gZnJvbSBcIi4vZnJvbVNoYXJlZENvbmZpZ0ZpbGVzXCI7XG5cbmplc3QubW9jayhcIkBhd3Mtc2RrL3NoYXJlZC1pbmktZmlsZS1sb2FkZXJcIiwgKCkgPT4gKHtcbiAgbG9hZFNoYXJlZENvbmZpZ0ZpbGVzOiBqZXN0LmZuKCksXG59KSk7XG5cbmRlc2NyaWJlKFwiZnJvbVNoYXJlZENvbmZpZ0ZpbGVzXCIsICgpID0+IHtcbiAgY29uc3QgZW52UHJvZmlsZSA9IHByb2Nlc3MuZW52W0VOVl9QUk9GSUxFXTtcbiAgY29uc3QgY29uZmlnS2V5ID0gXCJjb25maWdfa2V5XCI7XG4gIGNvbnN0IGNvbmZpZ0dldHRlcjogR2V0dGVyRnJvbUNvbmZpZzxzdHJpbmc+ID0gKHByb2ZpbGU6IFByb2ZpbGUpID0+IHByb2ZpbGVbY29uZmlnS2V5XTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBkZWxldGUgcHJvY2Vzcy5lbnZbRU5WX1BST0ZJTEVdO1xuICB9KTtcblxuICBhZnRlckFsbCgoKSA9PiB7XG4gICAgcHJvY2Vzcy5lbnZbRU5WX1BST0ZJTEVdID0gZW52UHJvZmlsZTtcbiAgfSk7XG5cbiAgY29uc3QgZ2V0UHJvdmlkZXJFcnJvciA9IChwcm9maWxlOiBzdHJpbmcsIGdldHRlcjogR2V0dGVyRnJvbUNvbmZpZzxzdHJpbmc+KSA9PlxuICAgIG5ldyBQcm92aWRlckVycm9yKGBDYW5ub3QgbG9hZCBjb25maWcgZm9yIHByb2ZpbGUgJHtwcm9maWxlfSBpbiBTREsgY29uZmlndXJhdGlvbiBmaWxlcyB3aXRoIGdldHRlcjogJHtnZXR0ZXJ9YCk7XG5cbiAgZGVzY3JpYmUoXCJsb2FkZWRDb25maWdcIiwgKCkgPT4ge1xuICAgIGNvbnN0IG1vY2tDb25maWdBbnN3ZXIgPSBcIm1vY2tDb25maWdBbnN3ZXJcIjtcbiAgICBjb25zdCBtb2NrQ29uZmlnTm90QW5zd2VyID0gXCJtb2NrQ29uZmlnTm90QW5zd2VyXCI7XG4gICAgY29uc3QgbW9ja0NyZWRlbnRpYWxzQW5zd2VyID0gXCJtb2NrQ3JlZGVudGlhbHNBbnN3ZXJcIjtcbiAgICBjb25zdCBtb2NrQ3JlZGVudGlhbHNOb3RBbnN3ZXIgPSBcIm1vY2tDcmVkZW50aWFsc05vdEFuc3dlclwiO1xuXG4gICAgdHlwZSBMb2FkZWRDb25maWdUZXN0RGF0YSA9IHtcbiAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgIGluaURhdGFJbkNvbmZpZzogUGFyc2VkSW5pRGF0YTtcbiAgICAgIGluaURhdGFJbkNyZWRlbnRpYWxzOiBQYXJzZWRJbmlEYXRhO1xuICAgIH0gJiBTaGFyZWRDb25maWdJbml0O1xuXG4gICAgY29uc3QgbG9hZGVkQ29uZmlnUmVzb2x2ZXM6IChMb2FkZWRDb25maWdUZXN0RGF0YSAmIHtcbiAgICAgIGNvbmZpZ1ZhbHVlVG9WZXJpZnk6IHN0cmluZztcbiAgICB9KVtdID0gW1xuICAgICAge1xuICAgICAgICBtZXNzYWdlOiBcInJldHVybnMgY29uZmlnVmFsdWUgZnJvbSBkZWZhdWx0IHByb2ZpbGVcIixcbiAgICAgICAgaW5pRGF0YUluQ29uZmlnOiB7XG4gICAgICAgICAgZGVmYXVsdDogeyBbY29uZmlnS2V5XTogbW9ja0NvbmZpZ0Fuc3dlciB9LFxuICAgICAgICB9LFxuICAgICAgICBpbmlEYXRhSW5DcmVkZW50aWFsczoge1xuICAgICAgICAgIGRlZmF1bHQ6IHsgW2NvbmZpZ0tleV06IG1vY2tDcmVkZW50aWFsc05vdEFuc3dlciB9LFxuICAgICAgICB9LFxuICAgICAgICBjb25maWdWYWx1ZVRvVmVyaWZ5OiBtb2NrQ29uZmlnQW5zd2VyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbWVzc2FnZTogXCJyZXR1cm5zIGNvbmZpZ1ZhbHVlIGZyb20gZGVzaWduYXRlZCBwcm9maWxlXCIsXG4gICAgICAgIGluaURhdGFJbkNvbmZpZzoge1xuICAgICAgICAgIGRlZmF1bHQ6IHsgW2NvbmZpZ0tleV06IG1vY2tDb25maWdOb3RBbnN3ZXIgfSxcbiAgICAgICAgICBmb286IHsgW2NvbmZpZ0tleV06IG1vY2tDb25maWdBbnN3ZXIgfSxcbiAgICAgICAgfSxcbiAgICAgICAgaW5pRGF0YUluQ3JlZGVudGlhbHM6IHtcbiAgICAgICAgICBmb286IHsgW2NvbmZpZ0tleV06IG1vY2tDcmVkZW50aWFsc05vdEFuc3dlciB9LFxuICAgICAgICB9LFxuICAgICAgICBwcm9maWxlOiBcImZvb1wiLFxuICAgICAgICBjb25maWdWYWx1ZVRvVmVyaWZ5OiBtb2NrQ29uZmlnQW5zd2VyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbWVzc2FnZTogXCJyZXR1cm5zIGNvbmZpZ1ZhbHVlIGZyb20gY3JlZGVudGlhbHMgZmlsZSBpZiBwcmVmZXJyZWRcIixcbiAgICAgICAgaW5pRGF0YUluQ29uZmlnOiB7XG4gICAgICAgICAgZGVmYXVsdDogeyBbY29uZmlnS2V5XTogbW9ja0NvbmZpZ05vdEFuc3dlciB9LFxuICAgICAgICAgIGZvbzogeyBbY29uZmlnS2V5XTogbW9ja0NvbmZpZ05vdEFuc3dlciB9LFxuICAgICAgICB9LFxuICAgICAgICBpbmlEYXRhSW5DcmVkZW50aWFsczoge1xuICAgICAgICAgIGZvbzogeyBbY29uZmlnS2V5XTogbW9ja0NyZWRlbnRpYWxzQW5zd2VyIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHByb2ZpbGU6IFwiZm9vXCIsXG4gICAgICAgIHByZWZlcnJlZEZpbGU6IFwiY3JlZGVudGlhbHNcIixcbiAgICAgICAgY29uZmlnVmFsdWVUb1ZlcmlmeTogbW9ja0NyZWRlbnRpYWxzQW5zd2VyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbWVzc2FnZTogXCJyZXR1cm5zIGNvbmZpZ1ZhbHVlIGZyb20gY29uZmlnIGZpbGUgaWYgcHJlZmVycmVkIGNyZWRlbnRpYWxzIGZpbGUgZG9lc24ndCBjb250YWluIGNvbmZpZ1wiLFxuICAgICAgICBpbmlEYXRhSW5Db25maWc6IHtcbiAgICAgICAgICBmb286IHsgW2NvbmZpZ0tleV06IG1vY2tDb25maWdBbnN3ZXIgfSxcbiAgICAgICAgfSxcbiAgICAgICAgaW5pRGF0YUluQ3JlZGVudGlhbHM6IHt9LFxuICAgICAgICBjb25maWdWYWx1ZVRvVmVyaWZ5OiBtb2NrQ29uZmlnQW5zd2VyLFxuICAgICAgICBwcmVmZXJyZWRGaWxlOiBcImNyZWRlbnRpYWxzXCIsXG4gICAgICAgIHByb2ZpbGU6IFwiZm9vXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBtZXNzYWdlOiBcInJldHVybnMgY29uZmlnVmFsdWUgZnJvbSBjcmVkZW50aWFsIGZpbGUgaWYgcHJlZmVycmVkIGNvbmZpZyBmaWxlIGRvZXNuJ3QgY29udGFpbiBjb25maWdcIixcbiAgICAgICAgaW5pRGF0YUluQ29uZmlnOiB7fSxcbiAgICAgICAgaW5pRGF0YUluQ3JlZGVudGlhbHM6IHtcbiAgICAgICAgICBmb286IHsgW2NvbmZpZ0tleV06IG1vY2tDcmVkZW50aWFsc0Fuc3dlciB9LFxuICAgICAgICB9LFxuICAgICAgICBjb25maWdWYWx1ZVRvVmVyaWZ5OiBtb2NrQ3JlZGVudGlhbHNBbnN3ZXIsXG4gICAgICAgIHByb2ZpbGU6IFwiZm9vXCIsXG4gICAgICB9LFxuICAgIF07XG5cbiAgICBjb25zdCBsb2FkZWRDb25maWdSZWplY3RzOiBMb2FkZWRDb25maWdUZXN0RGF0YVtdID0gW1xuICAgICAge1xuICAgICAgICBtZXNzYWdlOiBcInJlamVjdHMgaWYgZGVmYXVsdCBwcm9maWxlIGlzIG5vdCBwcmVzZW50IGFuZCBwcm9maWxlIHZhbHVlIGlzIG5vdCBwYXNzZWRcIixcbiAgICAgICAgaW5pRGF0YUluQ29uZmlnOiB7XG4gICAgICAgICAgZm9vOiB7IFtjb25maWdLZXldOiBtb2NrQ29uZmlnTm90QW5zd2VyIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGluaURhdGFJbkNyZWRlbnRpYWxzOiB7fSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG1lc3NhZ2U6IFwicmVqZWN0cyBpZiBkZXNpZ25hdGVkIHByb2ZpbGUgaXMgbm90IHByZXNlbnRcIixcbiAgICAgICAgaW5pRGF0YUluQ29uZmlnOiB7XG4gICAgICAgICAgZGVmYXVsdDogeyBbY29uZmlnS2V5XTogbW9ja0NvbmZpZ05vdEFuc3dlciB9LFxuICAgICAgICB9LFxuICAgICAgICBpbmlEYXRhSW5DcmVkZW50aWFsczoge30sXG4gICAgICAgIHByb2ZpbGU6IFwiZm9vXCIsXG4gICAgICB9LFxuICAgIF07XG5cbiAgICBkZXNjcmliZShcInVzZXMgdGhlIHNoYXJlZCBpbmkgZmlsZSBsb2FkZXIgaWYgcHJlLWxvYWRlZCBjb25maWcgaXMgbm90IHN1cHBsaWVkXCIsICgpID0+IHtcbiAgICAgIGxvYWRlZENvbmZpZ1Jlc29sdmVzLmZvckVhY2goXG4gICAgICAgICh7IG1lc3NhZ2UsIGluaURhdGFJbkNvbmZpZywgaW5pRGF0YUluQ3JlZGVudGlhbHMsIGNvbmZpZ1ZhbHVlVG9WZXJpZnksIHByb2ZpbGUsIHByZWZlcnJlZEZpbGUgfSkgPT4ge1xuICAgICAgICAgIGl0KG1lc3NhZ2UsICgpID0+IHtcbiAgICAgICAgICAgIChsb2FkU2hhcmVkQ29uZmlnRmlsZXMgYXMgamVzdC5Nb2NrKS5tb2NrUmVzb2x2ZWRWYWx1ZU9uY2Uoe1xuICAgICAgICAgICAgICBjb25maWdGaWxlOiBpbmlEYXRhSW5Db25maWcsXG4gICAgICAgICAgICAgIGNyZWRlbnRpYWxzRmlsZTogaW5pRGF0YUluQ3JlZGVudGlhbHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBleHBlY3QoZnJvbVNoYXJlZENvbmZpZ0ZpbGVzKGNvbmZpZ0dldHRlciwgeyBwcm9maWxlLCBwcmVmZXJyZWRGaWxlIH0pKCkpLnJlc29sdmVzLnRvQmUoXG4gICAgICAgICAgICAgIGNvbmZpZ1ZhbHVlVG9WZXJpZnlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIGxvYWRlZENvbmZpZ1JlamVjdHMuZm9yRWFjaCgoeyBtZXNzYWdlLCBpbmlEYXRhSW5Db25maWcsIGluaURhdGFJbkNyZWRlbnRpYWxzLCBwcm9maWxlLCBwcmVmZXJyZWRGaWxlIH0pID0+IHtcbiAgICAgICAgaXQobWVzc2FnZSwgKCkgPT4ge1xuICAgICAgICAgIChsb2FkU2hhcmVkQ29uZmlnRmlsZXMgYXMgamVzdC5Nb2NrKS5tb2NrUmVzb2x2ZWRWYWx1ZU9uY2Uoe1xuICAgICAgICAgICAgY29uZmlnRmlsZTogaW5pRGF0YUluQ29uZmlnLFxuICAgICAgICAgICAgY3JlZGVudGlhbHNGaWxlOiBpbmlEYXRhSW5DcmVkZW50aWFscyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gZXhwZWN0KGZyb21TaGFyZWRDb25maWdGaWxlcyhjb25maWdHZXR0ZXIsIHsgcHJvZmlsZSwgcHJlZmVycmVkRmlsZSB9KSgpKS5yZWplY3RzLnRvTWF0Y2hPYmplY3QoXG4gICAgICAgICAgICBnZXRQcm92aWRlckVycm9yKHByb2ZpbGUgPz8gXCJkZWZhdWx0XCIsIGNvbmZpZ0dldHRlcilcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoXCJ1c2VzIHByZS1sb2FkZWQgY29uZmlnIGlmIHN1cHBsaWVkXCIsICgpID0+IHtcbiAgICAgIGxvYWRlZENvbmZpZ1Jlc29sdmVzLmZvckVhY2goXG4gICAgICAgICh7IG1lc3NhZ2UsIGluaURhdGFJbkNvbmZpZywgaW5pRGF0YUluQ3JlZGVudGlhbHMsIGNvbmZpZ1ZhbHVlVG9WZXJpZnksIHByb2ZpbGUsIHByZWZlcnJlZEZpbGUgfSkgPT4ge1xuICAgICAgICAgIGl0KGAke21lc3NhZ2V9IGZyb20gY29uZmlnIGZpbGVgLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsb2FkZWRDb25maWcgPSBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICAgICAgICBjb25maWdGaWxlOiBpbmlEYXRhSW5Db25maWcsXG4gICAgICAgICAgICAgIGNyZWRlbnRpYWxzRmlsZTogaW5pRGF0YUluQ3JlZGVudGlhbHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBleHBlY3QoXG4gICAgICAgICAgICAgIGZyb21TaGFyZWRDb25maWdGaWxlcyhjb25maWdHZXR0ZXIsIHsgbG9hZGVkQ29uZmlnLCBwcm9maWxlLCBwcmVmZXJyZWRGaWxlIH0pKClcbiAgICAgICAgICAgICkucmVzb2x2ZXMudG9CZShjb25maWdWYWx1ZVRvVmVyaWZ5KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgbG9hZGVkQ29uZmlnUmVqZWN0cy5mb3JFYWNoKCh7IG1lc3NhZ2UsIGluaURhdGFJbkNvbmZpZywgaW5pRGF0YUluQ3JlZGVudGlhbHMsIHByb2ZpbGUsIHByZWZlcnJlZEZpbGUgfSkgPT4ge1xuICAgICAgICBpdChtZXNzYWdlLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgbG9hZGVkQ29uZmlnID0gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICAgIGNvbmZpZ0ZpbGU6IGluaURhdGFJbkNvbmZpZyxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzRmlsZTogaW5pRGF0YUluQ3JlZGVudGlhbHMsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGV4cGVjdChcbiAgICAgICAgICAgIGZyb21TaGFyZWRDb25maWdGaWxlcyhjb25maWdHZXR0ZXIsIHsgbG9hZGVkQ29uZmlnLCBwcm9maWxlLCBwcmVmZXJyZWRGaWxlIH0pKClcbiAgICAgICAgICApLnJlamVjdHMudG9NYXRjaE9iamVjdChnZXRQcm92aWRlckVycm9yKHByb2ZpbGUgPz8gXCJkZWZhdWx0XCIsIGNvbmZpZ0dldHRlcikpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoXCJyZWplY3RzIGlmIGdldHRlciB0aHJvd3NcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IFwiQ2Fubm90IGxvYWQgY29uZmlnXCI7XG4gICAgICBjb25zdCBmYWlsR2V0dGVyID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9O1xuICAgICAgKGxvYWRTaGFyZWRDb25maWdGaWxlcyBhcyBqZXN0Lk1vY2spLm1vY2tSZXNvbHZlZFZhbHVlT25jZSh7XG4gICAgICAgIGNvbmZpZ0ZpbGU6IHt9LFxuICAgICAgICBjcmVkZW50aWFsc0ZpbGU6IHt9LFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZXhwZWN0KGZyb21TaGFyZWRDb25maWdGaWxlcyhmYWlsR2V0dGVyKSgpKS5yZWplY3RzLnRvTWF0Y2hPYmplY3QobmV3IFByb3ZpZGVyRXJyb3IobWVzc2FnZSkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZShcInByb2ZpbGVcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGxvYWRlZENvbmZpZ0RhdGEgPSB7XG4gICAgICBjb25maWdGaWxlOiB7XG4gICAgICAgIGRlZmF1bHQ6IHsgW2NvbmZpZ0tleV06IFwiY29uZmlnRmlsZURlZmF1bHRcIiB9LFxuICAgICAgICBmb286IHsgW2NvbmZpZ0tleV06IFwiY29uZmlnRmlsZUZvb1wiIH0sXG4gICAgICB9LFxuICAgICAgY3JlZGVudGlhbHNGaWxlOiB7XG4gICAgICAgIGRlZmF1bHQ6IHsgW2NvbmZpZ0tleV06IFwiY3JlZGVudGlhbHNGaWxlRGVmYXVsdFwiIH0sXG4gICAgICB9LFxuICAgIH07XG4gICAgY29uc3QgbG9hZGVkQ29uZmlnID0gUHJvbWlzZS5yZXNvbHZlKGxvYWRlZENvbmZpZ0RhdGEpO1xuXG4gICAgZGVzY3JpYmUoXCJ3aGVuIHByb2ZpbGUgaXMgbm90IGRlZmluZWRcIiwgKCkgPT4ge1xuICAgICAgaXQoYHJldHVybnMgY29uZmlnVmFsdWUgZnJvbSB2YWx1ZSBpbiAnJHtFTlZfUFJPRklMRX0nIGVudiB2YXIgaWYgaXQgaXMgc2V0YCwgKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9maWxlID0gXCJmb29cIjtcbiAgICAgICAgcHJvY2Vzcy5lbnZbRU5WX1BST0ZJTEVdID0gcHJvZmlsZTtcbiAgICAgICAgcmV0dXJuIGV4cGVjdChmcm9tU2hhcmVkQ29uZmlnRmlsZXMoY29uZmlnR2V0dGVyLCB7IGxvYWRlZENvbmZpZyB9KSgpKS5yZXNvbHZlcy50b0JlKFxuICAgICAgICAgIGxvYWRlZENvbmZpZ0RhdGEuY29uZmlnRmlsZVtwcm9maWxlXVtjb25maWdLZXldXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoYHJldHVybnMgY29uZmlnVmFsdWUgZnJvbSBkZWZhdWx0IHByb2ZpbGUgaWYgJyR7RU5WX1BST0ZJTEV9JyBlbnYgdmFyIGlzIG5vdCBzZXRgLCAoKSA9PiB7XG4gICAgICAgIHJldHVybiBleHBlY3QoZnJvbVNoYXJlZENvbmZpZ0ZpbGVzKGNvbmZpZ0dldHRlciwgeyBsb2FkZWRDb25maWcgfSkoKSkucmVzb2x2ZXMudG9CZShcbiAgICAgICAgICBsb2FkZWRDb25maWdEYXRhLmNvbmZpZ0ZpbGUuZGVmYXVsdFtjb25maWdLZXldXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==