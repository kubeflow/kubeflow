import { __awaiter, __generator } from "tslib";
import { loadConfig } from "@aws-sdk/node-config-provider";
import { platform, release } from "os";
import { env, versions } from "process";
export var UA_APP_ID_ENV_NAME = "AWS_SDK_UA_APP_ID";
export var UA_APP_ID_INI_NAME = "sdk-ua-app-id";
/**
 * Collect metrics from runtime to put into user agent.
 */
export var defaultUserAgent = function (_a) {
    var serviceId = _a.serviceId, clientVersion = _a.clientVersion;
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var sections, appId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sections = [
                        // sdk-metadata
                        ["aws-sdk-js", clientVersion],
                        // os-metadata
                        ["os/" + platform(), release()],
                        // language-metadata
                        // ECMAScript edition doesn't matter in JS, so no version needed.
                        ["lang/js"],
                        ["md/nodejs", "" + versions.node],
                    ];
                    if (serviceId) {
                        // api-metadata
                        // service Id may not appear in non-AWS clients
                        sections.push(["api/" + serviceId, clientVersion]);
                    }
                    if (env.AWS_EXECUTION_ENV) {
                        // env-metadata
                        sections.push(["exec-env/" + env.AWS_EXECUTION_ENV]);
                    }
                    return [4 /*yield*/, loadConfig({
                            environmentVariableSelector: function (env) { return env[UA_APP_ID_ENV_NAME]; },
                            configFileSelector: function (profile) { return profile[UA_APP_ID_INI_NAME]; },
                            default: undefined,
                        })()];
                case 1:
                    appId = _a.sent();
                    if (appId) {
                        sections.push(["app/" + appId]);
                    }
                    return [2 /*return*/, sections];
            }
        });
    }); };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQztBQUN2QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV4QyxNQUFNLENBQUMsSUFBTSxrQkFBa0IsR0FBRyxtQkFBbUIsQ0FBQztBQUN0RCxNQUFNLENBQUMsSUFBTSxrQkFBa0IsR0FBRyxlQUFlLENBQUM7QUFPbEQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLEVBR1A7UUFGeEIsU0FBUyxlQUFBLEVBQ1QsYUFBYSxtQkFBQTtJQUNxQyxPQUFBOzs7OztvQkFDNUMsUUFBUSxHQUFjO3dCQUMxQixlQUFlO3dCQUNmLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQzt3QkFDN0IsY0FBYzt3QkFDZCxDQUFDLFFBQU0sUUFBUSxFQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7d0JBQy9CLG9CQUFvQjt3QkFDcEIsaUVBQWlFO3dCQUNqRSxDQUFDLFNBQVMsQ0FBQzt3QkFDWCxDQUFDLFdBQVcsRUFBRSxLQUFHLFFBQVEsQ0FBQyxJQUFNLENBQUM7cUJBQ2xDLENBQUM7b0JBRUYsSUFBSSxTQUFTLEVBQUU7d0JBQ2IsZUFBZTt3QkFDZiwrQ0FBK0M7d0JBQy9DLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFPLFNBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO3FCQUNwRDtvQkFFRCxJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRTt3QkFDekIsZUFBZTt3QkFDZixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBWSxHQUFHLENBQUMsaUJBQW1CLENBQUMsQ0FBQyxDQUFDO3FCQUN0RDtvQkFFYSxxQkFBTSxVQUFVLENBQXFCOzRCQUNqRCwyQkFBMkIsRUFBRSxVQUFDLEdBQUcsSUFBSyxPQUFBLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUF2QixDQUF1Qjs0QkFDN0Qsa0JBQWtCLEVBQUUsVUFBQyxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBM0IsQ0FBMkI7NEJBQzVELE9BQU8sRUFBRSxTQUFTO3lCQUNuQixDQUFDLEVBQUUsRUFBQTs7b0JBSkUsS0FBSyxHQUFHLFNBSVY7b0JBQ0osSUFBSSxLQUFLLEVBQUU7d0JBQ1QsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQU8sS0FBTyxDQUFDLENBQUMsQ0FBQztxQkFDakM7b0JBRUQsc0JBQU8sUUFBUSxFQUFDOzs7U0FDakI7QUFqQ21ELENBaUNuRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbG9hZENvbmZpZyB9IGZyb20gXCJAYXdzLXNkay9ub2RlLWNvbmZpZy1wcm92aWRlclwiO1xuaW1wb3J0IHsgUHJvdmlkZXIsIFVzZXJBZ2VudCB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuaW1wb3J0IHsgcGxhdGZvcm0sIHJlbGVhc2UgfSBmcm9tIFwib3NcIjtcbmltcG9ydCB7IGVudiwgdmVyc2lvbnMgfSBmcm9tIFwicHJvY2Vzc1wiO1xuXG5leHBvcnQgY29uc3QgVUFfQVBQX0lEX0VOVl9OQU1FID0gXCJBV1NfU0RLX1VBX0FQUF9JRFwiO1xuZXhwb3J0IGNvbnN0IFVBX0FQUF9JRF9JTklfTkFNRSA9IFwic2RrLXVhLWFwcC1pZFwiO1xuXG5pbnRlcmZhY2UgRGVmYXVsdFVzZXJBZ2VudE9wdGlvbnMge1xuICBzZXJ2aWNlSWQ/OiBzdHJpbmc7XG4gIGNsaWVudFZlcnNpb246IHN0cmluZztcbn1cblxuLyoqXG4gKiBDb2xsZWN0IG1ldHJpY3MgZnJvbSBydW50aW1lIHRvIHB1dCBpbnRvIHVzZXIgYWdlbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0VXNlckFnZW50ID0gKHtcbiAgc2VydmljZUlkLFxuICBjbGllbnRWZXJzaW9uLFxufTogRGVmYXVsdFVzZXJBZ2VudE9wdGlvbnMpOiBQcm92aWRlcjxVc2VyQWdlbnQ+ID0+IGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc2VjdGlvbnM6IFVzZXJBZ2VudCA9IFtcbiAgICAvLyBzZGstbWV0YWRhdGFcbiAgICBbXCJhd3Mtc2RrLWpzXCIsIGNsaWVudFZlcnNpb25dLFxuICAgIC8vIG9zLW1ldGFkYXRhXG4gICAgW2Bvcy8ke3BsYXRmb3JtKCl9YCwgcmVsZWFzZSgpXSxcbiAgICAvLyBsYW5ndWFnZS1tZXRhZGF0YVxuICAgIC8vIEVDTUFTY3JpcHQgZWRpdGlvbiBkb2Vzbid0IG1hdHRlciBpbiBKUywgc28gbm8gdmVyc2lvbiBuZWVkZWQuXG4gICAgW1wibGFuZy9qc1wiXSxcbiAgICBbXCJtZC9ub2RlanNcIiwgYCR7dmVyc2lvbnMubm9kZX1gXSxcbiAgXTtcblxuICBpZiAoc2VydmljZUlkKSB7XG4gICAgLy8gYXBpLW1ldGFkYXRhXG4gICAgLy8gc2VydmljZSBJZCBtYXkgbm90IGFwcGVhciBpbiBub24tQVdTIGNsaWVudHNcbiAgICBzZWN0aW9ucy5wdXNoKFtgYXBpLyR7c2VydmljZUlkfWAsIGNsaWVudFZlcnNpb25dKTtcbiAgfVxuXG4gIGlmIChlbnYuQVdTX0VYRUNVVElPTl9FTlYpIHtcbiAgICAvLyBlbnYtbWV0YWRhdGFcbiAgICBzZWN0aW9ucy5wdXNoKFtgZXhlYy1lbnYvJHtlbnYuQVdTX0VYRUNVVElPTl9FTlZ9YF0pO1xuICB9XG5cbiAgY29uc3QgYXBwSWQgPSBhd2FpdCBsb2FkQ29uZmlnPHN0cmluZyB8IHVuZGVmaW5lZD4oe1xuICAgIGVudmlyb25tZW50VmFyaWFibGVTZWxlY3RvcjogKGVudikgPT4gZW52W1VBX0FQUF9JRF9FTlZfTkFNRV0sXG4gICAgY29uZmlnRmlsZVNlbGVjdG9yOiAocHJvZmlsZSkgPT4gcHJvZmlsZVtVQV9BUFBfSURfSU5JX05BTUVdLFxuICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgfSkoKTtcbiAgaWYgKGFwcElkKSB7XG4gICAgc2VjdGlvbnMucHVzaChbYGFwcC8ke2FwcElkfWBdKTtcbiAgfVxuXG4gIHJldHVybiBzZWN0aW9ucztcbn07XG4iXX0=