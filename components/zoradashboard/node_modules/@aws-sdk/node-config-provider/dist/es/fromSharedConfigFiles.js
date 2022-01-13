import { __assign, __awaiter, __generator, __rest } from "tslib";
import { ProviderError } from "@aws-sdk/property-provider";
import { loadSharedConfigFiles, } from "@aws-sdk/shared-ini-file-loader";
var DEFAULT_PROFILE = "default";
export var ENV_PROFILE = "AWS_PROFILE";
/**
 * Get config value from the shared config files with inferred profile name.
 */
export var fromSharedConfigFiles = function (configSelector, _a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.preferredFile, preferredFile = _b === void 0 ? "config" : _b, init = __rest(_a, ["preferredFile"]);
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, loadedConfig, _b, profile, _c, configFile, credentialsFile, profileFromCredentials, profileFromConfig, mergedProfile, configValue;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = init.loadedConfig, loadedConfig = _a === void 0 ? loadSharedConfigFiles(init) : _a, _b = init.profile, profile = _b === void 0 ? process.env[ENV_PROFILE] || DEFAULT_PROFILE : _b;
                    return [4 /*yield*/, loadedConfig];
                case 1:
                    _c = _d.sent(), configFile = _c.configFile, credentialsFile = _c.credentialsFile;
                    profileFromCredentials = credentialsFile[profile] || {};
                    profileFromConfig = configFile[profile] || {};
                    mergedProfile = preferredFile === "config"
                        ? __assign(__assign({}, profileFromCredentials), profileFromConfig) : __assign(__assign({}, profileFromConfig), profileFromCredentials);
                    try {
                        configValue = configSelector(mergedProfile);
                        if (configValue === undefined) {
                            throw new Error();
                        }
                        return [2 /*return*/, configValue];
                    }
                    catch (e) {
                        throw new ProviderError(e.message || "Cannot load config for profile " + profile + " in SDK configuration files with getter: " + configSelector);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVNoYXJlZENvbmZpZ0ZpbGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Zyb21TaGFyZWRDb25maWdGaWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFDTCxxQkFBcUIsR0FJdEIsTUFBTSxpQ0FBaUMsQ0FBQztBQUd6QyxJQUFNLGVBQWUsR0FBRyxTQUFTLENBQUM7QUFDbEMsTUFBTSxDQUFDLElBQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQztBQTBCekM7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FBRyxVQUNuQyxjQUFtQyxFQUNuQyxFQUE0RDtJQUE1RCxtQkFBQSxFQUFBLE9BQTREO0lBQTFELElBQUEscUJBQXdCLEVBQXhCLGFBQWEsbUJBQUcsUUFBUSxLQUFBLEVBQUssSUFBSSxjQUFuQyxpQkFBcUMsQ0FBRjtJQUNuQixPQUFBOzs7OztvQkFDUixLQUFzRyxJQUFJLGFBQWhFLEVBQTFDLFlBQVksbUJBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUEsRUFBRSxLQUEwRCxJQUFJLFFBQVQsRUFBckQsT0FBTyxtQkFBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLGVBQWUsS0FBQSxDQUFVO29CQUUzRSxxQkFBTSxZQUFZLEVBQUE7O29CQUFwRCxLQUFrQyxTQUFrQixFQUFsRCxVQUFVLGdCQUFBLEVBQUUsZUFBZSxxQkFBQTtvQkFFN0Isc0JBQXNCLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDeEQsaUJBQWlCLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDOUMsYUFBYSxHQUNqQixhQUFhLEtBQUssUUFBUTt3QkFDeEIsQ0FBQyx1QkFBTSxzQkFBc0IsR0FBSyxpQkFBaUIsRUFDbkQsQ0FBQyx1QkFBTSxpQkFBaUIsR0FBSyxzQkFBc0IsQ0FBRSxDQUFDO29CQUUxRCxJQUFJO3dCQUNJLFdBQVcsR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ2xELElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTs0QkFDN0IsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO3lCQUNuQjt3QkFDRCxzQkFBTyxXQUFXLEVBQUM7cUJBQ3BCO29CQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNWLE1BQU0sSUFBSSxhQUFhLENBQ3JCLENBQUMsQ0FBQyxPQUFPLElBQUksb0NBQWtDLE9BQU8saURBQTRDLGNBQWdCLENBQ25ILENBQUM7cUJBQ0g7Ozs7U0FDRixDQUFBO0NBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyRXJyb3IgfSBmcm9tIFwiQGF3cy1zZGsvcHJvcGVydHktcHJvdmlkZXJcIjtcbmltcG9ydCB7XG4gIGxvYWRTaGFyZWRDb25maWdGaWxlcyxcbiAgUHJvZmlsZSxcbiAgU2hhcmVkQ29uZmlnRmlsZXMsXG4gIFNoYXJlZENvbmZpZ0luaXQgYXMgQmFzZVNoYXJlZENvbmZpZ0luaXQsXG59IGZyb20gXCJAYXdzLXNkay9zaGFyZWQtaW5pLWZpbGUtbG9hZGVyXCI7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5jb25zdCBERUZBVUxUX1BST0ZJTEUgPSBcImRlZmF1bHRcIjtcbmV4cG9ydCBjb25zdCBFTlZfUFJPRklMRSA9IFwiQVdTX1BST0ZJTEVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTaGFyZWRDb25maWdJbml0IGV4dGVuZHMgQmFzZVNoYXJlZENvbmZpZ0luaXQge1xuICAvKipcbiAgICogVGhlIGNvbmZpZ3VyYXRpb24gcHJvZmlsZSB0byB1c2UuXG4gICAqL1xuICBwcm9maWxlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgcHJlZmVycmVkIHNoYXJlZCBpbmkgZmlsZSB0byBsb2FkIHRoZSBjb25maWcuIFwiY29uZmlnXCIgb3B0aW9uIHJlZmVycyB0b1xuICAgKiB0aGUgc2hhcmVkIGNvbmZpZyBmaWxlKGRlZmF1bHRzIHRvIGB+Ly5hd3MvY29uZmlnYCkuIFwiY3JlZGVudGlhbHNcIiBvcHRpb25cbiAgICogcmVmZXJzIHRvIHRoZSBzaGFyZWQgY3JlZGVudGlhbHMgZmlsZShkZWZhdWx0cyB0byBgfi8uYXdzL2NyZWRlbnRpYWxzYClcbiAgICovXG4gIHByZWZlcnJlZEZpbGU/OiBcImNvbmZpZ1wiIHwgXCJjcmVkZW50aWFsc1wiO1xuXG4gIC8qKlxuICAgKiBBIHByb21pc2UgdGhhdCB3aWxsIGJlIHJlc29sdmVkIHdpdGggbG9hZGVkIGFuZCBwYXJzZWQgY3JlZGVudGlhbHMgZmlsZXMuXG4gICAqIFVzZWQgdG8gYXZvaWQgbG9hZGluZyBzaGFyZWQgY29uZmlnIGZpbGVzIG11bHRpcGxlIHRpbWVzLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGxvYWRlZENvbmZpZz86IFByb21pc2U8U2hhcmVkQ29uZmlnRmlsZXM+O1xufVxuXG5leHBvcnQgdHlwZSBHZXR0ZXJGcm9tQ29uZmlnPFQ+ID0gKHByb2ZpbGU6IFByb2ZpbGUpID0+IFQgfCB1bmRlZmluZWQ7XG5cbi8qKlxuICogR2V0IGNvbmZpZyB2YWx1ZSBmcm9tIHRoZSBzaGFyZWQgY29uZmlnIGZpbGVzIHdpdGggaW5mZXJyZWQgcHJvZmlsZSBuYW1lLlxuICovXG5leHBvcnQgY29uc3QgZnJvbVNoYXJlZENvbmZpZ0ZpbGVzID0gPFQgPSBzdHJpbmc+KFxuICBjb25maWdTZWxlY3RvcjogR2V0dGVyRnJvbUNvbmZpZzxUPixcbiAgeyBwcmVmZXJyZWRGaWxlID0gXCJjb25maWdcIiwgLi4uaW5pdCB9OiBTaGFyZWRDb25maWdJbml0ID0ge31cbik6IFByb3ZpZGVyPFQ+ID0+IGFzeW5jICgpID0+IHtcbiAgY29uc3QgeyBsb2FkZWRDb25maWcgPSBsb2FkU2hhcmVkQ29uZmlnRmlsZXMoaW5pdCksIHByb2ZpbGUgPSBwcm9jZXNzLmVudltFTlZfUFJPRklMRV0gfHwgREVGQVVMVF9QUk9GSUxFIH0gPSBpbml0O1xuXG4gIGNvbnN0IHsgY29uZmlnRmlsZSwgY3JlZGVudGlhbHNGaWxlIH0gPSBhd2FpdCBsb2FkZWRDb25maWc7XG5cbiAgY29uc3QgcHJvZmlsZUZyb21DcmVkZW50aWFscyA9IGNyZWRlbnRpYWxzRmlsZVtwcm9maWxlXSB8fCB7fTtcbiAgY29uc3QgcHJvZmlsZUZyb21Db25maWcgPSBjb25maWdGaWxlW3Byb2ZpbGVdIHx8IHt9O1xuICBjb25zdCBtZXJnZWRQcm9maWxlID1cbiAgICBwcmVmZXJyZWRGaWxlID09PSBcImNvbmZpZ1wiXG4gICAgICA/IHsgLi4ucHJvZmlsZUZyb21DcmVkZW50aWFscywgLi4ucHJvZmlsZUZyb21Db25maWcgfVxuICAgICAgOiB7IC4uLnByb2ZpbGVGcm9tQ29uZmlnLCAuLi5wcm9maWxlRnJvbUNyZWRlbnRpYWxzIH07XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IGNvbmZpZ1NlbGVjdG9yKG1lcmdlZFByb2ZpbGUpO1xuICAgIGlmIChjb25maWdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZ1ZhbHVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IFByb3ZpZGVyRXJyb3IoXG4gICAgICBlLm1lc3NhZ2UgfHwgYENhbm5vdCBsb2FkIGNvbmZpZyBmb3IgcHJvZmlsZSAke3Byb2ZpbGV9IGluIFNESyBjb25maWd1cmF0aW9uIGZpbGVzIHdpdGggZ2V0dGVyOiAke2NvbmZpZ1NlbGVjdG9yfWBcbiAgICApO1xuICB9XG59O1xuIl19