import { __assign, __awaiter, __generator } from "tslib";
import { ProviderError } from "@aws-sdk/property-provider";
import { loadSharedConfigFiles, } from "@aws-sdk/shared-ini-file-loader";
var DEFAULT_PROFILE = "default";
export var ENV_PROFILE = "AWS_PROFILE";
var isStaticCredsProfile = function (arg) {
    return Boolean(arg) &&
        typeof arg === "object" &&
        typeof arg.aws_access_key_id === "string" &&
        typeof arg.aws_secret_access_key === "string" &&
        ["undefined", "string"].indexOf(typeof arg.aws_session_token) > -1;
};
var isAssumeRoleProfile = function (arg) {
    return Boolean(arg) &&
        typeof arg === "object" &&
        typeof arg.role_arn === "string" &&
        typeof arg.source_profile === "string" &&
        ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1 &&
        ["undefined", "string"].indexOf(typeof arg.external_id) > -1 &&
        ["undefined", "string"].indexOf(typeof arg.mfa_serial) > -1;
};
/**
 * Creates a credential provider that will read from ini files and supports
 * role assumption and multi-factor authentication.
 */
export var fromIni = function (init) {
    if (init === void 0) { init = {}; }
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var profiles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parseKnownFiles(init)];
                case 1:
                    profiles = _a.sent();
                    return [2 /*return*/, resolveProfileData(getMasterProfileName(init), profiles, init)];
            }
        });
    }); };
};
/**
 * Load profiles from credentials and config INI files and normalize them into a
 * single profile list.
 *
 * @internal
 */
export var parseKnownFiles = function (init) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, loadedConfig, parsedFiles;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = init.loadedConfig, loadedConfig = _a === void 0 ? loadSharedConfigFiles(init) : _a;
                return [4 /*yield*/, loadedConfig];
            case 1:
                parsedFiles = _b.sent();
                return [2 /*return*/, __assign(__assign({}, parsedFiles.configFile), parsedFiles.credentialsFile)];
        }
    });
}); };
/**
 * @internal
 */
export var getMasterProfileName = function (init) {
    return init.profile || process.env[ENV_PROFILE] || DEFAULT_PROFILE;
};
var resolveProfileData = function (profileName, profiles, options, visitedProfiles) {
    if (visitedProfiles === void 0) { visitedProfiles = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var data, ExternalId, mfa_serial, RoleArn, _a, RoleSessionName, source_profile, sourceCreds, params, _b, _c, _d;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    data = profiles[profileName];
                    // If this is not the first profile visited, static credentials should be
                    // preferred over role assumption metadata. This special treatment of
                    // second and subsequent hops is to ensure compatibility with the AWS CLI.
                    if (Object.keys(visitedProfiles).length > 0 && isStaticCredsProfile(data)) {
                        return [2 /*return*/, resolveStaticCredentials(data)];
                    }
                    if (!isAssumeRoleProfile(data)) return [3 /*break*/, 4];
                    ExternalId = data.external_id, mfa_serial = data.mfa_serial, RoleArn = data.role_arn, _a = data.role_session_name, RoleSessionName = _a === void 0 ? "aws-sdk-js-" + Date.now() : _a, source_profile = data.source_profile;
                    if (!options.roleAssumer) {
                        throw new ProviderError("Profile " + profileName + " requires a role to be assumed, but no" + " role assumption callback was provided.", false);
                    }
                    if (source_profile in visitedProfiles) {
                        throw new ProviderError("Detected a cycle attempting to resolve credentials for profile" +
                            (" " + getMasterProfileName(options) + ". Profiles visited: ") +
                            Object.keys(visitedProfiles).join(", "), false);
                    }
                    sourceCreds = resolveProfileData(source_profile, profiles, options, __assign(__assign({}, visitedProfiles), (_e = {}, _e[source_profile] = true, _e)));
                    params = { RoleArn: RoleArn, RoleSessionName: RoleSessionName, ExternalId: ExternalId };
                    if (!mfa_serial) return [3 /*break*/, 2];
                    if (!options.mfaCodeProvider) {
                        throw new ProviderError("Profile " + profileName + " requires multi-factor authentication," + " but no MFA code callback was provided.", false);
                    }
                    params.SerialNumber = mfa_serial;
                    _b = params;
                    return [4 /*yield*/, options.mfaCodeProvider(mfa_serial)];
                case 1:
                    _b.TokenCode = _f.sent();
                    _f.label = 2;
                case 2:
                    _d = (_c = options).roleAssumer;
                    return [4 /*yield*/, sourceCreds];
                case 3: return [2 /*return*/, _d.apply(_c, [_f.sent(), params])];
                case 4:
                    // If no role assumption metadata is present, attempt to load static
                    // credentials from the selected profile.
                    if (isStaticCredsProfile(data)) {
                        return [2 /*return*/, resolveStaticCredentials(data)];
                    }
                    // If the profile cannot be parsed or contains neither static credentials
                    // nor role assumption metadata, throw an error. This should be considered a
                    // terminal resolution error if a profile has been specified by the user
                    // (whether via a parameter, an environment variable, or another profile's
                    // `source_profile` key).
                    throw new ProviderError("Profile " + profileName + " could not be found or parsed in shared" + " credentials file.");
            }
        });
    });
};
var resolveStaticCredentials = function (profile) {
    return Promise.resolve({
        accessKeyId: profile.aws_access_key_id,
        secretAccessKey: profile.aws_secret_access_key,
        sessionToken: profile.aws_session_token,
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQ0wscUJBQXFCLEdBS3RCLE1BQU0saUNBQWlDLENBQUM7QUFHekMsSUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBQ2xDLE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxhQUFhLENBQUM7QUE2RXpDLElBQU0sb0JBQW9CLEdBQUcsVUFBQyxHQUFRO0lBQ3BDLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNaLE9BQU8sR0FBRyxLQUFLLFFBQVE7UUFDdkIsT0FBTyxHQUFHLENBQUMsaUJBQWlCLEtBQUssUUFBUTtRQUN6QyxPQUFPLEdBQUcsQ0FBQyxxQkFBcUIsS0FBSyxRQUFRO1FBQzdDLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUpsRSxDQUlrRSxDQUFDO0FBT3JFLElBQU0sbUJBQW1CLEdBQUcsVUFBQyxHQUFRO0lBQ25DLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNaLE9BQU8sR0FBRyxLQUFLLFFBQVE7UUFDdkIsT0FBTyxHQUFHLENBQUMsUUFBUSxLQUFLLFFBQVE7UUFDaEMsT0FBTyxHQUFHLENBQUMsY0FBYyxLQUFLLFFBQVE7UUFDdEMsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQU4zRCxDQU0yRCxDQUFDO0FBRTlEOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBRyxVQUFDLElBQXNCO0lBQXRCLHFCQUFBLEVBQUEsU0FBc0I7SUFBeUIsT0FBQTs7Ozt3QkFDcEQscUJBQU0sZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFBOztvQkFBdEMsUUFBUSxHQUFHLFNBQTJCO29CQUM1QyxzQkFBTyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUM7OztTQUN2RTtBQUhzRSxDQUd0RSxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsSUFBTSxlQUFlLEdBQUcsVUFBTyxJQUF1Qjs7Ozs7Z0JBQ25ELEtBQStDLElBQUksYUFBVCxFQUExQyxZQUFZLG1CQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFBLENBQVU7Z0JBRXhDLHFCQUFNLFlBQVksRUFBQTs7Z0JBQWhDLFdBQVcsR0FBRyxTQUFrQjtnQkFDdEMsNENBQ0ssV0FBVyxDQUFDLFVBQVUsR0FDdEIsV0FBVyxDQUFDLGVBQWUsR0FDOUI7OztLQUNILENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sQ0FBQyxJQUFNLG9CQUFvQixHQUFHLFVBQUMsSUFBMEI7SUFDN0QsT0FBQSxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksZUFBZTtBQUEzRCxDQUEyRCxDQUFDO0FBRTlELElBQU0sa0JBQWtCLEdBQUcsVUFDekIsV0FBbUIsRUFDbkIsUUFBdUIsRUFDdkIsT0FBb0IsRUFDcEIsZUFBcUQ7SUFBckQsZ0NBQUEsRUFBQSxvQkFBcUQ7Ozs7Ozs7b0JBRS9DLElBQUksR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBRW5DLHlFQUF5RTtvQkFDekUscUVBQXFFO29CQUNyRSwwRUFBMEU7b0JBQzFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUN6RSxzQkFBTyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsRUFBQztxQkFDdkM7eUJBSUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQXpCLHdCQUF5QjtvQkFFWixVQUFVLEdBS3JCLElBQUksWUFMaUIsRUFDdkIsVUFBVSxHQUlSLElBQUksV0FKSSxFQUNBLE9BQU8sR0FHZixJQUFJLFNBSFcsRUFDakIsS0FFRSxJQUFJLGtCQUZ5RCxFQUE1QyxlQUFlLG1CQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUEsRUFDL0QsY0FBYyxHQUNaLElBQUksZUFEUSxDQUNQO29CQUVULElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO3dCQUN4QixNQUFNLElBQUksYUFBYSxDQUNyQixhQUFXLFdBQVcsMkNBQXdDLEdBQUcseUNBQXlDLEVBQzFHLEtBQUssQ0FDTixDQUFDO3FCQUNIO29CQUVELElBQUksY0FBYyxJQUFJLGVBQWUsRUFBRTt3QkFDckMsTUFBTSxJQUFJLGFBQWEsQ0FDckIsZ0VBQWdFOzZCQUM5RCxNQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyx5QkFBc0IsQ0FBQTs0QkFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQ3pDLEtBQUssQ0FDTixDQUFDO3FCQUNIO29CQUVLLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLE9BQU8sd0JBQ25FLGVBQWUsZ0JBQ2pCLGNBQWMsSUFBRyxJQUFJLE9BQ3RCLENBQUM7b0JBQ0csTUFBTSxHQUFxQixFQUFFLE9BQU8sU0FBQSxFQUFFLGVBQWUsaUJBQUEsRUFBRSxVQUFVLFlBQUEsRUFBRSxDQUFDO3lCQUN0RSxVQUFVLEVBQVYsd0JBQVU7b0JBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUU7d0JBQzVCLE1BQU0sSUFBSSxhQUFhLENBQ3JCLGFBQVcsV0FBVywyQ0FBd0MsR0FBRyx5Q0FBeUMsRUFDMUcsS0FBSyxDQUNOLENBQUM7cUJBQ0g7b0JBQ0QsTUFBTSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7b0JBQ2pDLEtBQUEsTUFBTSxDQUFBO29CQUFhLHFCQUFNLE9BQU8sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUE7O29CQUE1RCxHQUFPLFNBQVMsR0FBRyxTQUF5QyxDQUFDOzs7b0JBR3hELEtBQUEsQ0FBQSxLQUFBLE9BQU8sQ0FBQSxDQUFDLFdBQVcsQ0FBQTtvQkFBQyxxQkFBTSxXQUFXLEVBQUE7d0JBQTVDLHNCQUFPLGNBQW9CLFNBQWlCLEVBQUUsTUFBTSxFQUFDLEVBQUM7O29CQUd4RCxvRUFBb0U7b0JBQ3BFLHlDQUF5QztvQkFDekMsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDOUIsc0JBQU8sd0JBQXdCLENBQUMsSUFBSSxDQUFDLEVBQUM7cUJBQ3ZDO29CQUVELHlFQUF5RTtvQkFDekUsNEVBQTRFO29CQUM1RSx3RUFBd0U7b0JBQ3hFLDBFQUEwRTtvQkFDMUUseUJBQXlCO29CQUN6QixNQUFNLElBQUksYUFBYSxDQUFDLGFBQVcsV0FBVyw0Q0FBeUMsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDOzs7O0NBQ2pILENBQUM7QUFFRixJQUFNLHdCQUF3QixHQUFHLFVBQUMsT0FBMkI7SUFDM0QsT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ2QsV0FBVyxFQUFFLE9BQU8sQ0FBQyxpQkFBaUI7UUFDdEMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxxQkFBcUI7UUFDOUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxpQkFBaUI7S0FDeEMsQ0FBQztBQUpGLENBSUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyRXJyb3IgfSBmcm9tIFwiQGF3cy1zZGsvcHJvcGVydHktcHJvdmlkZXJcIjtcbmltcG9ydCB7XG4gIGxvYWRTaGFyZWRDb25maWdGaWxlcyxcbiAgUGFyc2VkSW5pRGF0YSxcbiAgUHJvZmlsZSxcbiAgU2hhcmVkQ29uZmlnRmlsZXMsXG4gIFNoYXJlZENvbmZpZ0luaXQsXG59IGZyb20gXCJAYXdzLXNkay9zaGFyZWQtaW5pLWZpbGUtbG9hZGVyXCI7XG5pbXBvcnQgeyBDcmVkZW50aWFsUHJvdmlkZXIsIENyZWRlbnRpYWxzIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmNvbnN0IERFRkFVTFRfUFJPRklMRSA9IFwiZGVmYXVsdFwiO1xuZXhwb3J0IGNvbnN0IEVOVl9QUk9GSUxFID0gXCJBV1NfUFJPRklMRVwiO1xuXG4vKipcbiAqIEBzZWUgaHR0cDovL2RvY3MuYXdzLmFtYXpvbi5jb20vQVdTSmF2YVNjcmlwdFNESy9sYXRlc3QvQVdTL1NUUy5odG1sI2Fzc3VtZVJvbGUtcHJvcGVydHlcbiAqIFRPRE8gdXBkYXRlIHRoZSBhYm92ZSB0byBsaW5rIHRvIFYzIGRvY3NcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBc3N1bWVSb2xlUGFyYW1zIHtcbiAgLyoqXG4gICAqIFRoZSBpZGVudGlmaWVyIG9mIHRoZSByb2xlIHRvIGJlIGFzc3VtZWQuXG4gICAqL1xuICBSb2xlQXJuOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgbmFtZSBmb3IgdGhlIGFzc3VtZWQgcm9sZSBzZXNzaW9uLlxuICAgKi9cbiAgUm9sZVNlc3Npb25OYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgdW5pcXVlIGlkZW50aWZpZXIgdGhhdCBpcyB1c2VkIGJ5IHRoaXJkIHBhcnRpZXMgd2hlbiBhc3N1bWluZyByb2xlcyBpblxuICAgKiB0aGVpciBjdXN0b21lcnMnIGFjY291bnRzLlxuICAgKi9cbiAgRXh0ZXJuYWxJZD86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGlkZW50aWZpY2F0aW9uIG51bWJlciBvZiB0aGUgTUZBIGRldmljZSB0aGF0IGlzIGFzc29jaWF0ZWQgd2l0aCB0aGVcbiAgICogdXNlciB3aG8gaXMgbWFraW5nIHRoZSBgQXNzdW1lUm9sZWAgY2FsbC5cbiAgICovXG4gIFNlcmlhbE51bWJlcj86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHZhbHVlIHByb3ZpZGVkIGJ5IHRoZSBNRkEgZGV2aWNlLlxuICAgKi9cbiAgVG9rZW5Db2RlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNvdXJjZVByb2ZpbGVJbml0IGV4dGVuZHMgU2hhcmVkQ29uZmlnSW5pdCB7XG4gIC8qKlxuICAgKiBUaGUgY29uZmlndXJhdGlvbiBwcm9maWxlIHRvIHVzZS5cbiAgICovXG4gIHByb2ZpbGU/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgcHJvbWlzZSB0aGF0IHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCBsb2FkZWQgYW5kIHBhcnNlZCBjcmVkZW50aWFscyBmaWxlcy5cbiAgICogVXNlZCB0byBhdm9pZCBsb2FkaW5nIHNoYXJlZCBjb25maWcgZmlsZXMgbXVsdGlwbGUgdGltZXMuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgbG9hZGVkQ29uZmlnPzogUHJvbWlzZTxTaGFyZWRDb25maWdGaWxlcz47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRnJvbUluaUluaXQgZXh0ZW5kcyBTb3VyY2VQcm9maWxlSW5pdCB7XG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJuYSBhIHByb21pc2UgZnVsZmlsbGVkIHdpdGggYW4gTUZBIHRva2VuIGNvZGUgZm9yXG4gICAqIHRoZSBwcm92aWRlZCBNRkEgU2VyaWFsIGNvZGUuIElmIGEgcHJvZmlsZSByZXF1aXJlcyBhbiBNRkEgY29kZSBhbmRcbiAgICogYG1mYUNvZGVQcm92aWRlcmAgaXMgbm90IGEgdmFsaWQgZnVuY3Rpb24sIHRoZSBjcmVkZW50aWFsIHByb3ZpZGVyXG4gICAqIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZC5cbiAgICpcbiAgICogQHBhcmFtIG1mYVNlcmlhbCBUaGUgc2VyaWFsIGNvZGUgb2YgdGhlIE1GQSBkZXZpY2Ugc3BlY2lmaWVkLlxuICAgKi9cbiAgbWZhQ29kZVByb3ZpZGVyPzogKG1mYVNlcmlhbDogc3RyaW5nKSA9PiBQcm9taXNlPHN0cmluZz47XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBhc3N1bWVzIGEgcm9sZSBhbmQgcmV0dXJucyBhIHByb21pc2UgZnVsZmlsbGVkIHdpdGhcbiAgICogY3JlZGVudGlhbHMgZm9yIHRoZSBhc3N1bWVkIHJvbGUuXG4gICAqXG4gICAqIEBwYXJhbSBzb3VyY2VDcmVkcyBUaGUgY3JlZGVudGlhbHMgd2l0aCB3aGljaCB0byBhc3N1bWUgYSByb2xlLlxuICAgKiBAcGFyYW0gcGFyYW1zXG4gICAqL1xuICByb2xlQXNzdW1lcj86IChzb3VyY2VDcmVkczogQ3JlZGVudGlhbHMsIHBhcmFtczogQXNzdW1lUm9sZVBhcmFtcykgPT4gUHJvbWlzZTxDcmVkZW50aWFscz47XG59XG5cbmludGVyZmFjZSBTdGF0aWNDcmVkc1Byb2ZpbGUgZXh0ZW5kcyBQcm9maWxlIHtcbiAgYXdzX2FjY2Vzc19rZXlfaWQ6IHN0cmluZztcbiAgYXdzX3NlY3JldF9hY2Nlc3Nfa2V5OiBzdHJpbmc7XG4gIGF3c19zZXNzaW9uX3Rva2VuPzogc3RyaW5nO1xufVxuXG5jb25zdCBpc1N0YXRpY0NyZWRzUHJvZmlsZSA9IChhcmc6IGFueSk6IGFyZyBpcyBTdGF0aWNDcmVkc1Byb2ZpbGUgPT5cbiAgQm9vbGVhbihhcmcpICYmXG4gIHR5cGVvZiBhcmcgPT09IFwib2JqZWN0XCIgJiZcbiAgdHlwZW9mIGFyZy5hd3NfYWNjZXNzX2tleV9pZCA9PT0gXCJzdHJpbmdcIiAmJlxuICB0eXBlb2YgYXJnLmF3c19zZWNyZXRfYWNjZXNzX2tleSA9PT0gXCJzdHJpbmdcIiAmJlxuICBbXCJ1bmRlZmluZWRcIiwgXCJzdHJpbmdcIl0uaW5kZXhPZih0eXBlb2YgYXJnLmF3c19zZXNzaW9uX3Rva2VuKSA+IC0xO1xuXG5pbnRlcmZhY2UgQXNzdW1lUm9sZVByb2ZpbGUgZXh0ZW5kcyBQcm9maWxlIHtcbiAgcm9sZV9hcm46IHN0cmluZztcbiAgc291cmNlX3Byb2ZpbGU6IHN0cmluZztcbn1cblxuY29uc3QgaXNBc3N1bWVSb2xlUHJvZmlsZSA9IChhcmc6IGFueSk6IGFyZyBpcyBBc3N1bWVSb2xlUHJvZmlsZSA9PlxuICBCb29sZWFuKGFyZykgJiZcbiAgdHlwZW9mIGFyZyA9PT0gXCJvYmplY3RcIiAmJlxuICB0eXBlb2YgYXJnLnJvbGVfYXJuID09PSBcInN0cmluZ1wiICYmXG4gIHR5cGVvZiBhcmcuc291cmNlX3Byb2ZpbGUgPT09IFwic3RyaW5nXCIgJiZcbiAgW1widW5kZWZpbmVkXCIsIFwic3RyaW5nXCJdLmluZGV4T2YodHlwZW9mIGFyZy5yb2xlX3Nlc3Npb25fbmFtZSkgPiAtMSAmJlxuICBbXCJ1bmRlZmluZWRcIiwgXCJzdHJpbmdcIl0uaW5kZXhPZih0eXBlb2YgYXJnLmV4dGVybmFsX2lkKSA+IC0xICYmXG4gIFtcInVuZGVmaW5lZFwiLCBcInN0cmluZ1wiXS5pbmRleE9mKHR5cGVvZiBhcmcubWZhX3NlcmlhbCkgPiAtMTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY3JlZGVudGlhbCBwcm92aWRlciB0aGF0IHdpbGwgcmVhZCBmcm9tIGluaSBmaWxlcyBhbmQgc3VwcG9ydHNcbiAqIHJvbGUgYXNzdW1wdGlvbiBhbmQgbXVsdGktZmFjdG9yIGF1dGhlbnRpY2F0aW9uLlxuICovXG5leHBvcnQgY29uc3QgZnJvbUluaSA9IChpbml0OiBGcm9tSW5pSW5pdCA9IHt9KTogQ3JlZGVudGlhbFByb3ZpZGVyID0+IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcHJvZmlsZXMgPSBhd2FpdCBwYXJzZUtub3duRmlsZXMoaW5pdCk7XG4gIHJldHVybiByZXNvbHZlUHJvZmlsZURhdGEoZ2V0TWFzdGVyUHJvZmlsZU5hbWUoaW5pdCksIHByb2ZpbGVzLCBpbml0KTtcbn07XG5cbi8qKlxuICogTG9hZCBwcm9maWxlcyBmcm9tIGNyZWRlbnRpYWxzIGFuZCBjb25maWcgSU5JIGZpbGVzIGFuZCBub3JtYWxpemUgdGhlbSBpbnRvIGFcbiAqIHNpbmdsZSBwcm9maWxlIGxpc3QuXG4gKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBwYXJzZUtub3duRmlsZXMgPSBhc3luYyAoaW5pdDogU291cmNlUHJvZmlsZUluaXQpOiBQcm9taXNlPFBhcnNlZEluaURhdGE+ID0+IHtcbiAgY29uc3QgeyBsb2FkZWRDb25maWcgPSBsb2FkU2hhcmVkQ29uZmlnRmlsZXMoaW5pdCkgfSA9IGluaXQ7XG5cbiAgY29uc3QgcGFyc2VkRmlsZXMgPSBhd2FpdCBsb2FkZWRDb25maWc7XG4gIHJldHVybiB7XG4gICAgLi4ucGFyc2VkRmlsZXMuY29uZmlnRmlsZSxcbiAgICAuLi5wYXJzZWRGaWxlcy5jcmVkZW50aWFsc0ZpbGUsXG4gIH07XG59O1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgZ2V0TWFzdGVyUHJvZmlsZU5hbWUgPSAoaW5pdDogeyBwcm9maWxlPzogc3RyaW5nIH0pOiBzdHJpbmcgPT5cbiAgaW5pdC5wcm9maWxlIHx8IHByb2Nlc3MuZW52W0VOVl9QUk9GSUxFXSB8fCBERUZBVUxUX1BST0ZJTEU7XG5cbmNvbnN0IHJlc29sdmVQcm9maWxlRGF0YSA9IGFzeW5jIChcbiAgcHJvZmlsZU5hbWU6IHN0cmluZyxcbiAgcHJvZmlsZXM6IFBhcnNlZEluaURhdGEsXG4gIG9wdGlvbnM6IEZyb21JbmlJbml0LFxuICB2aXNpdGVkUHJvZmlsZXM6IHsgW3Byb2ZpbGVOYW1lOiBzdHJpbmddOiB0cnVlIH0gPSB7fVxuKTogUHJvbWlzZTxDcmVkZW50aWFscz4gPT4ge1xuICBjb25zdCBkYXRhID0gcHJvZmlsZXNbcHJvZmlsZU5hbWVdO1xuXG4gIC8vIElmIHRoaXMgaXMgbm90IHRoZSBmaXJzdCBwcm9maWxlIHZpc2l0ZWQsIHN0YXRpYyBjcmVkZW50aWFscyBzaG91bGQgYmVcbiAgLy8gcHJlZmVycmVkIG92ZXIgcm9sZSBhc3N1bXB0aW9uIG1ldGFkYXRhLiBUaGlzIHNwZWNpYWwgdHJlYXRtZW50IG9mXG4gIC8vIHNlY29uZCBhbmQgc3Vic2VxdWVudCBob3BzIGlzIHRvIGVuc3VyZSBjb21wYXRpYmlsaXR5IHdpdGggdGhlIEFXUyBDTEkuXG4gIGlmIChPYmplY3Qua2V5cyh2aXNpdGVkUHJvZmlsZXMpLmxlbmd0aCA+IDAgJiYgaXNTdGF0aWNDcmVkc1Byb2ZpbGUoZGF0YSkpIHtcbiAgICByZXR1cm4gcmVzb2x2ZVN0YXRpY0NyZWRlbnRpYWxzKGRhdGEpO1xuICB9XG5cbiAgLy8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgcHJvZmlsZSB2aXNpdGVkLCByb2xlIGFzc3VtcHRpb24ga2V5cyBzaG91bGQgYmVcbiAgLy8gZ2l2ZW4gcHJlY2VkZW5jZSBvdmVyIHN0YXRpYyBjcmVkZW50aWFscy5cbiAgaWYgKGlzQXNzdW1lUm9sZVByb2ZpbGUoZGF0YSkpIHtcbiAgICBjb25zdCB7XG4gICAgICBleHRlcm5hbF9pZDogRXh0ZXJuYWxJZCxcbiAgICAgIG1mYV9zZXJpYWwsXG4gICAgICByb2xlX2FybjogUm9sZUFybixcbiAgICAgIHJvbGVfc2Vzc2lvbl9uYW1lOiBSb2xlU2Vzc2lvbk5hbWUgPSBcImF3cy1zZGstanMtXCIgKyBEYXRlLm5vdygpLFxuICAgICAgc291cmNlX3Byb2ZpbGUsXG4gICAgfSA9IGRhdGE7XG5cbiAgICBpZiAoIW9wdGlvbnMucm9sZUFzc3VtZXIpIHtcbiAgICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKFxuICAgICAgICBgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSByZXF1aXJlcyBhIHJvbGUgdG8gYmUgYXNzdW1lZCwgYnV0IG5vYCArIGAgcm9sZSBhc3N1bXB0aW9uIGNhbGxiYWNrIHdhcyBwcm92aWRlZC5gLFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlX3Byb2ZpbGUgaW4gdmlzaXRlZFByb2ZpbGVzKSB7XG4gICAgICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihcbiAgICAgICAgYERldGVjdGVkIGEgY3ljbGUgYXR0ZW1wdGluZyB0byByZXNvbHZlIGNyZWRlbnRpYWxzIGZvciBwcm9maWxlYCArXG4gICAgICAgICAgYCAke2dldE1hc3RlclByb2ZpbGVOYW1lKG9wdGlvbnMpfS4gUHJvZmlsZXMgdmlzaXRlZDogYCArXG4gICAgICAgICAgT2JqZWN0LmtleXModmlzaXRlZFByb2ZpbGVzKS5qb2luKFwiLCBcIiksXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZUNyZWRzID0gcmVzb2x2ZVByb2ZpbGVEYXRhKHNvdXJjZV9wcm9maWxlLCBwcm9maWxlcywgb3B0aW9ucywge1xuICAgICAgLi4udmlzaXRlZFByb2ZpbGVzLFxuICAgICAgW3NvdXJjZV9wcm9maWxlXTogdHJ1ZSxcbiAgICB9KTtcbiAgICBjb25zdCBwYXJhbXM6IEFzc3VtZVJvbGVQYXJhbXMgPSB7IFJvbGVBcm4sIFJvbGVTZXNzaW9uTmFtZSwgRXh0ZXJuYWxJZCB9O1xuICAgIGlmIChtZmFfc2VyaWFsKSB7XG4gICAgICBpZiAoIW9wdGlvbnMubWZhQ29kZVByb3ZpZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKFxuICAgICAgICAgIGBQcm9maWxlICR7cHJvZmlsZU5hbWV9IHJlcXVpcmVzIG11bHRpLWZhY3RvciBhdXRoZW50aWNhdGlvbixgICsgYCBidXQgbm8gTUZBIGNvZGUgY2FsbGJhY2sgd2FzIHByb3ZpZGVkLmAsXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHBhcmFtcy5TZXJpYWxOdW1iZXIgPSBtZmFfc2VyaWFsO1xuICAgICAgcGFyYW1zLlRva2VuQ29kZSA9IGF3YWl0IG9wdGlvbnMubWZhQ29kZVByb3ZpZGVyKG1mYV9zZXJpYWwpO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zLnJvbGVBc3N1bWVyKGF3YWl0IHNvdXJjZUNyZWRzLCBwYXJhbXMpO1xuICB9XG5cbiAgLy8gSWYgbm8gcm9sZSBhc3N1bXB0aW9uIG1ldGFkYXRhIGlzIHByZXNlbnQsIGF0dGVtcHQgdG8gbG9hZCBzdGF0aWNcbiAgLy8gY3JlZGVudGlhbHMgZnJvbSB0aGUgc2VsZWN0ZWQgcHJvZmlsZS5cbiAgaWYgKGlzU3RhdGljQ3JlZHNQcm9maWxlKGRhdGEpKSB7XG4gICAgcmV0dXJuIHJlc29sdmVTdGF0aWNDcmVkZW50aWFscyhkYXRhKTtcbiAgfVxuXG4gIC8vIElmIHRoZSBwcm9maWxlIGNhbm5vdCBiZSBwYXJzZWQgb3IgY29udGFpbnMgbmVpdGhlciBzdGF0aWMgY3JlZGVudGlhbHNcbiAgLy8gbm9yIHJvbGUgYXNzdW1wdGlvbiBtZXRhZGF0YSwgdGhyb3cgYW4gZXJyb3IuIFRoaXMgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYVxuICAvLyB0ZXJtaW5hbCByZXNvbHV0aW9uIGVycm9yIGlmIGEgcHJvZmlsZSBoYXMgYmVlbiBzcGVjaWZpZWQgYnkgdGhlIHVzZXJcbiAgLy8gKHdoZXRoZXIgdmlhIGEgcGFyYW1ldGVyLCBhbiBlbnZpcm9ubWVudCB2YXJpYWJsZSwgb3IgYW5vdGhlciBwcm9maWxlJ3NcbiAgLy8gYHNvdXJjZV9wcm9maWxlYCBrZXkpLlxuICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBjb3VsZCBub3QgYmUgZm91bmQgb3IgcGFyc2VkIGluIHNoYXJlZGAgKyBgIGNyZWRlbnRpYWxzIGZpbGUuYCk7XG59O1xuXG5jb25zdCByZXNvbHZlU3RhdGljQ3JlZGVudGlhbHMgPSAocHJvZmlsZTogU3RhdGljQ3JlZHNQcm9maWxlKTogUHJvbWlzZTxDcmVkZW50aWFscz4gPT5cbiAgUHJvbWlzZS5yZXNvbHZlKHtcbiAgICBhY2Nlc3NLZXlJZDogcHJvZmlsZS5hd3NfYWNjZXNzX2tleV9pZCxcbiAgICBzZWNyZXRBY2Nlc3NLZXk6IHByb2ZpbGUuYXdzX3NlY3JldF9hY2Nlc3Nfa2V5LFxuICAgIHNlc3Npb25Ub2tlbjogcHJvZmlsZS5hd3Nfc2Vzc2lvbl90b2tlbixcbiAgfSk7XG4iXX0=