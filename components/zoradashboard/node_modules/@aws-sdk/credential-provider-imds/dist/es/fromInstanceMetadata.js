import { __assign, __awaiter, __generator } from "tslib";
import { ProviderError } from "@aws-sdk/property-provider";
import { httpRequest } from "./remoteProvider/httpRequest";
import { fromImdsCredentials, isImdsCredentials } from "./remoteProvider/ImdsCredentials";
import { providerConfigFromInit } from "./remoteProvider/RemoteProviderInit";
import { retry } from "./remoteProvider/retry";
var IMDS_IP = "169.254.169.254";
var IMDS_PATH = "/latest/meta-data/iam/security-credentials/";
var IMDS_TOKEN_PATH = "/latest/api/token";
/**
 * Creates a credential provider that will source credentials from the EC2
 * Instance Metadata Service
 */
export var fromInstanceMetadata = function (init) {
    if (init === void 0) { init = {}; }
    // when set to true, metadata service will not fetch token
    var disableFetchToken = false;
    var _a = providerConfigFromInit(init), timeout = _a.timeout, maxRetries = _a.maxRetries;
    var getCredentials = function (maxRetries, options) { return __awaiter(void 0, void 0, void 0, function () {
        var profile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, retry(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var profile, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, getProfile(options)];
                                case 1:
                                    profile = _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_1 = _a.sent();
                                    if (err_1.statusCode === 401) {
                                        disableFetchToken = false;
                                    }
                                    throw err_1;
                                case 3: return [2 /*return*/, profile];
                            }
                        });
                    }); }, maxRetries)];
                case 1:
                    profile = (_a.sent()).trim();
                    return [2 /*return*/, retry(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var creds, err_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, getCredentialsFromProfile(profile, options)];
                                    case 1:
                                        creds = _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_2 = _a.sent();
                                        if (err_2.statusCode === 401) {
                                            disableFetchToken = false;
                                        }
                                        throw err_2;
                                    case 3: return [2 /*return*/, creds];
                                }
                            });
                        }); }, maxRetries)];
            }
        });
    }); };
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!disableFetchToken) return [3 /*break*/, 1];
                    return [2 /*return*/, getCredentials(maxRetries, { timeout: timeout })];
                case 1:
                    token = void 0;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, getMetadataToken({ timeout: timeout })];
                case 3:
                    token = (_a.sent()).toString();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    if ((error_1 === null || error_1 === void 0 ? void 0 : error_1.statusCode) === 400) {
                        throw Object.assign(error_1, {
                            message: "EC2 Metadata token request returned error",
                        });
                    }
                    else if (error_1.message === "TimeoutError" || [403, 404, 405].includes(error_1.statusCode)) {
                        disableFetchToken = true;
                    }
                    return [2 /*return*/, getCredentials(maxRetries, { timeout: timeout })];
                case 5: return [2 /*return*/, getCredentials(maxRetries, {
                        timeout: timeout,
                        headers: {
                            "x-aws-ec2-metadata-token": token,
                        },
                    })];
            }
        });
    }); };
};
var getMetadataToken = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, httpRequest(__assign(__assign({}, options), { host: IMDS_IP, path: IMDS_TOKEN_PATH, method: "PUT", headers: {
                    "x-aws-ec2-metadata-token-ttl-seconds": "21600",
                } }))];
    });
}); };
var getProfile = function (options) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, httpRequest(__assign(__assign({}, options), { host: IMDS_IP, path: IMDS_PATH }))];
        case 1: return [2 /*return*/, (_a.sent()).toString()];
    }
}); }); };
var getCredentialsFromProfile = function (profile, options) { return __awaiter(void 0, void 0, void 0, function () {
    var credsResponse, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = JSON).parse;
                return [4 /*yield*/, httpRequest(__assign(__assign({}, options), { host: IMDS_IP, path: IMDS_PATH + profile }))];
            case 1:
                credsResponse = _b.apply(_a, [(_c.sent()).toString()]);
                if (!isImdsCredentials(credsResponse)) {
                    throw new ProviderError("Invalid response received from instance metadata service.");
                }
                return [2 /*return*/, fromImdsCredentials(credsResponse)];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbUluc3RhbmNlTWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnJvbUluc3RhbmNlTWV0YWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUkzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDMUYsT0FBTyxFQUFFLHNCQUFzQixFQUFzQixNQUFNLHFDQUFxQyxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUvQyxJQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztBQUNsQyxJQUFNLFNBQVMsR0FBRyw2Q0FBNkMsQ0FBQztBQUNoRSxJQUFNLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQztBQUU1Qzs7O0dBR0c7QUFDSCxNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBRyxVQUFDLElBQTZCO0lBQTdCLHFCQUFBLEVBQUEsU0FBNkI7SUFDaEUsMERBQTBEO0lBQzFELElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLElBQUEsS0FBMEIsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQXBELE9BQU8sYUFBQSxFQUFFLFVBQVUsZ0JBQWlDLENBQUM7SUFFN0QsSUFBTSxjQUFjLEdBQUcsVUFBTyxVQUFrQixFQUFFLE9BQXVCOzs7O3dCQUVyRSxxQkFBTSxLQUFLLENBQVM7Ozs7OztvQ0FHTixxQkFBTSxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUE7O29DQUFuQyxPQUFPLEdBQUcsU0FBeUIsQ0FBQzs7OztvQ0FFcEMsSUFBSSxLQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTt3Q0FDMUIsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO3FDQUMzQjtvQ0FDRCxNQUFNLEtB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REFBMkQsQ0FBQyxDQUFDO2lCQUN0RjtnQkFFRCxzQkFBTyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsRUFBQzs7O0tBQzNDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlckVycm9yIH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3BlcnR5LXByb3ZpZGVyXCI7XG5pbXBvcnQgeyBDcmVkZW50aWFsUHJvdmlkZXIsIENyZWRlbnRpYWxzIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gXCJodHRwXCI7XG5cbmltcG9ydCB7IGh0dHBSZXF1ZXN0IH0gZnJvbSBcIi4vcmVtb3RlUHJvdmlkZXIvaHR0cFJlcXVlc3RcIjtcbmltcG9ydCB7IGZyb21JbWRzQ3JlZGVudGlhbHMsIGlzSW1kc0NyZWRlbnRpYWxzIH0gZnJvbSBcIi4vcmVtb3RlUHJvdmlkZXIvSW1kc0NyZWRlbnRpYWxzXCI7XG5pbXBvcnQgeyBwcm92aWRlckNvbmZpZ0Zyb21Jbml0LCBSZW1vdGVQcm92aWRlckluaXQgfSBmcm9tIFwiLi9yZW1vdGVQcm92aWRlci9SZW1vdGVQcm92aWRlckluaXRcIjtcbmltcG9ydCB7IHJldHJ5IH0gZnJvbSBcIi4vcmVtb3RlUHJvdmlkZXIvcmV0cnlcIjtcblxuY29uc3QgSU1EU19JUCA9IFwiMTY5LjI1NC4xNjkuMjU0XCI7XG5jb25zdCBJTURTX1BBVEggPSBcIi9sYXRlc3QvbWV0YS1kYXRhL2lhbS9zZWN1cml0eS1jcmVkZW50aWFscy9cIjtcbmNvbnN0IElNRFNfVE9LRU5fUEFUSCA9IFwiL2xhdGVzdC9hcGkvdG9rZW5cIjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY3JlZGVudGlhbCBwcm92aWRlciB0aGF0IHdpbGwgc291cmNlIGNyZWRlbnRpYWxzIGZyb20gdGhlIEVDMlxuICogSW5zdGFuY2UgTWV0YWRhdGEgU2VydmljZVxuICovXG5leHBvcnQgY29uc3QgZnJvbUluc3RhbmNlTWV0YWRhdGEgPSAoaW5pdDogUmVtb3RlUHJvdmlkZXJJbml0ID0ge30pOiBDcmVkZW50aWFsUHJvdmlkZXIgPT4ge1xuICAvLyB3aGVuIHNldCB0byB0cnVlLCBtZXRhZGF0YSBzZXJ2aWNlIHdpbGwgbm90IGZldGNoIHRva2VuXG4gIGxldCBkaXNhYmxlRmV0Y2hUb2tlbiA9IGZhbHNlO1xuICBjb25zdCB7IHRpbWVvdXQsIG1heFJldHJpZXMgfSA9IHByb3ZpZGVyQ29uZmlnRnJvbUluaXQoaW5pdCk7XG5cbiAgY29uc3QgZ2V0Q3JlZGVudGlhbHMgPSBhc3luYyAobWF4UmV0cmllczogbnVtYmVyLCBvcHRpb25zOiBSZXF1ZXN0T3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IHByb2ZpbGUgPSAoXG4gICAgICBhd2FpdCByZXRyeTxzdHJpbmc+KGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IHByb2ZpbGU6IHN0cmluZztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwcm9maWxlID0gYXdhaXQgZ2V0UHJvZmlsZShvcHRpb25zKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgaWYgKGVyci5zdGF0dXNDb2RlID09PSA0MDEpIHtcbiAgICAgICAgICAgIGRpc2FibGVGZXRjaFRva2VuID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvZmlsZTtcbiAgICAgIH0sIG1heFJldHJpZXMpXG4gICAgKS50cmltKCk7XG5cbiAgICByZXR1cm4gcmV0cnkoYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGNyZWRzOiBDcmVkZW50aWFscztcbiAgICAgIHRyeSB7XG4gICAgICAgIGNyZWRzID0gYXdhaXQgZ2V0Q3JlZGVudGlhbHNGcm9tUHJvZmlsZShwcm9maWxlLCBvcHRpb25zKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoZXJyLnN0YXR1c0NvZGUgPT09IDQwMSkge1xuICAgICAgICAgIGRpc2FibGVGZXRjaFRva2VuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNyZWRzO1xuICAgIH0sIG1heFJldHJpZXMpO1xuICB9O1xuXG4gIHJldHVybiBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGRpc2FibGVGZXRjaFRva2VuKSB7XG4gICAgICByZXR1cm4gZ2V0Q3JlZGVudGlhbHMobWF4UmV0cmllcywgeyB0aW1lb3V0IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdG9rZW46IHN0cmluZztcbiAgICAgIHRyeSB7XG4gICAgICAgIHRva2VuID0gKGF3YWl0IGdldE1ldGFkYXRhVG9rZW4oeyB0aW1lb3V0IH0pKS50b1N0cmluZygpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yPy5zdGF0dXNDb2RlID09PSA0MDApIHtcbiAgICAgICAgICB0aHJvdyBPYmplY3QuYXNzaWduKGVycm9yLCB7XG4gICAgICAgICAgICBtZXNzYWdlOiBcIkVDMiBNZXRhZGF0YSB0b2tlbiByZXF1ZXN0IHJldHVybmVkIGVycm9yXCIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3IubWVzc2FnZSA9PT0gXCJUaW1lb3V0RXJyb3JcIiB8fCBbNDAzLCA0MDQsIDQwNV0uaW5jbHVkZXMoZXJyb3Iuc3RhdHVzQ29kZSkpIHtcbiAgICAgICAgICBkaXNhYmxlRmV0Y2hUb2tlbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdldENyZWRlbnRpYWxzKG1heFJldHJpZXMsIHsgdGltZW91dCB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRDcmVkZW50aWFscyhtYXhSZXRyaWVzLCB7XG4gICAgICAgIHRpbWVvdXQsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIngtYXdzLWVjMi1tZXRhZGF0YS10b2tlblwiOiB0b2tlbixcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn07XG5cbmNvbnN0IGdldE1ldGFkYXRhVG9rZW4gPSBhc3luYyAob3B0aW9uczogUmVxdWVzdE9wdGlvbnMpID0+XG4gIGh0dHBSZXF1ZXN0KHtcbiAgICAuLi5vcHRpb25zLFxuICAgIGhvc3Q6IElNRFNfSVAsXG4gICAgcGF0aDogSU1EU19UT0tFTl9QQVRILFxuICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIngtYXdzLWVjMi1tZXRhZGF0YS10b2tlbi10dGwtc2Vjb25kc1wiOiBcIjIxNjAwXCIsXG4gICAgfSxcbiAgfSk7XG5cbmNvbnN0IGdldFByb2ZpbGUgPSBhc3luYyAob3B0aW9uczogUmVxdWVzdE9wdGlvbnMpID0+XG4gIChhd2FpdCBodHRwUmVxdWVzdCh7IC4uLm9wdGlvbnMsIGhvc3Q6IElNRFNfSVAsIHBhdGg6IElNRFNfUEFUSCB9KSkudG9TdHJpbmcoKTtcblxuY29uc3QgZ2V0Q3JlZGVudGlhbHNGcm9tUHJvZmlsZSA9IGFzeW5jIChwcm9maWxlOiBzdHJpbmcsIG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zKSA9PiB7XG4gIGNvbnN0IGNyZWRzUmVzcG9uc2UgPSBKU09OLnBhcnNlKFxuICAgIChcbiAgICAgIGF3YWl0IGh0dHBSZXF1ZXN0KHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgaG9zdDogSU1EU19JUCxcbiAgICAgICAgcGF0aDogSU1EU19QQVRIICsgcHJvZmlsZSxcbiAgICAgIH0pXG4gICAgKS50b1N0cmluZygpXG4gICk7XG5cbiAgaWYgKCFpc0ltZHNDcmVkZW50aWFscyhjcmVkc1Jlc3BvbnNlKSkge1xuICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKFwiSW52YWxpZCByZXNwb25zZSByZWNlaXZlZCBmcm9tIGluc3RhbmNlIG1ldGFkYXRhIHNlcnZpY2UuXCIpO1xuICB9XG5cbiAgcmV0dXJuIGZyb21JbWRzQ3JlZGVudGlhbHMoY3JlZHNSZXNwb25zZSk7XG59O1xuIl19