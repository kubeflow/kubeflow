import { __assign, __awaiter, __generator, __read, __spread } from "tslib";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { SPACE, UA_ESCAPE_REGEX, USER_AGENT, X_AMZ_USER_AGENT } from "./constants";
/**
 * Build user agent header sections from:
 * 1. runtime-specific default user agent provider;
 * 2. custom user agent from `customUserAgent` client config;
 * 3. handler execution context set by internal SDK components;
 * The built user agent will be set to `x-amz-user-agent` header for ALL the
 * runtimes.
 * Please note that any override to the `user-agent` or `x-amz-user-agent` header
 * in the HTTP request is discouraged. Please use `customUserAgent` client
 * config or middleware setting the `userAgent` context to generate desired user
 * agent.
 */
export var userAgentMiddleware = function (options) { return function (next, context) { return function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var request, headers, userAgent, defaultUserAgent, customUserAgent, normalUAValue;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                request = args.request;
                if (!HttpRequest.isInstance(request))
                    return [2 /*return*/, next(args)];
                headers = request.headers;
                userAgent = ((_a = context === null || context === void 0 ? void 0 : context.userAgent) === null || _a === void 0 ? void 0 : _a.map(escapeUserAgent)) || [];
                return [4 /*yield*/, options.defaultUserAgentProvider()];
            case 1:
                defaultUserAgent = (_c.sent()).map(escapeUserAgent);
                customUserAgent = ((_b = options === null || options === void 0 ? void 0 : options.customUserAgent) === null || _b === void 0 ? void 0 : _b.map(escapeUserAgent)) || [];
                // Set value to AWS-specific user agent header
                headers[X_AMZ_USER_AGENT] = __spread(defaultUserAgent, userAgent, customUserAgent).join(SPACE);
                normalUAValue = __spread(defaultUserAgent.filter(function (section) { return section.startsWith("aws-sdk-"); }), customUserAgent).join(SPACE);
                if (options.runtime !== "browser" && normalUAValue) {
                    headers[USER_AGENT] = headers[USER_AGENT] ? headers[USER_AGENT] + " " + normalUAValue : normalUAValue;
                }
                return [2 /*return*/, next(__assign(__assign({}, args), { request: request }))];
        }
    });
}); }; }; };
/**
 * Escape the each pair according to https://tools.ietf.org/html/rfc5234 and join the pair with pattern `name/version`.
 * User agent name may include prefix like `md/`, `api/`, `os/` etc., we should not escape the `/` after the prefix.
 * @private
 */
var escapeUserAgent = function (_a) {
    var _b = __read(_a, 2), name = _b[0], version = _b[1];
    var prefixSeparatorIndex = name.indexOf("/");
    var prefix = name.substring(0, prefixSeparatorIndex); // If no prefix, prefix is just ""
    var uaName = name.substring(prefixSeparatorIndex + 1);
    if (prefix === "api") {
        uaName = uaName.toLowerCase();
    }
    return [prefix, uaName, version]
        .filter(function (item) { return item && item.length > 0; })
        .map(function (item) { return item === null || item === void 0 ? void 0 : item.replace(UA_ESCAPE_REGEX, "_"); })
        .join("/");
};
export var getUserAgentMiddlewareOptions = {
    name: "getUserAgentMiddleware",
    step: "build",
    priority: "low",
    tags: ["SET_USER_AGENT", "USER_AGENT"],
    override: true,
};
export var getUserAgentPlugin = function (config) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
    },
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hZ2VudC1taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VzZXItYWdlbnQtbWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBY3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVuRjs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sQ0FBQyxJQUFNLG1CQUFtQixHQUFHLFVBQUMsT0FBZ0MsSUFBSyxPQUFBLFVBQ3ZFLElBQTRCLEVBQzVCLE9BQWdDLElBQ0wsT0FBQSxVQUFPLElBQWdDOzs7Ozs7Z0JBQzFELE9BQU8sR0FBSyxJQUFJLFFBQVQsQ0FBVTtnQkFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO29CQUFFLHNCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztnQkFDaEQsT0FBTyxHQUFLLE9BQU8sUUFBWixDQUFhO2dCQUN0QixTQUFTLEdBQUcsT0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsU0FBUywwQ0FBRSxHQUFHLENBQUMsZUFBZSxNQUFLLEVBQUUsQ0FBQztnQkFDdkMscUJBQU0sT0FBTyxDQUFDLHdCQUF3QixFQUFFLEVBQUE7O2dCQUE1RCxnQkFBZ0IsR0FBRyxDQUFDLFNBQXdDLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2dCQUNsRixlQUFlLEdBQUcsT0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsZUFBZSwwQ0FBRSxHQUFHLENBQUMsZUFBZSxNQUFLLEVBQUUsQ0FBQztnQkFDN0UsOENBQThDO2dCQUM5QyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxTQUFJLGdCQUFnQixFQUFLLFNBQVMsRUFBSyxlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUUxRixhQUFhLEdBQUcsU0FDakIsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyxFQUNwRSxlQUFlLEVBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDZCxJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssU0FBUyxJQUFJLGFBQWEsRUFBRTtvQkFDbEQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFJLGFBQWUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO2lCQUN2RztnQkFFRCxzQkFBTyxJQUFJLHVCQUNOLElBQUksS0FDUCxPQUFPLFNBQUEsSUFDUCxFQUFDOzs7S0FDSixFQXRCNEIsQ0FzQjVCLEVBekJ3RSxDQXlCeEUsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxJQUFNLGVBQWUsR0FBRyxVQUFDLEVBQThCO1FBQTlCLEtBQUEsYUFBOEIsRUFBN0IsSUFBSSxRQUFBLEVBQUUsT0FBTyxRQUFBO0lBQ3JDLElBQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsa0NBQWtDO0lBQzFGLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEQsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQ3BCLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDL0I7SUFDRCxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7U0FDN0IsTUFBTSxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUF2QixDQUF1QixDQUFDO1NBQ3pDLEdBQUcsQ0FBQyxVQUFDLElBQUksV0FBSyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsT0FBTyxDQUFDLGVBQWUsRUFBRSxHQUFHLElBQUMsQ0FBQztTQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDZixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsSUFBTSw2QkFBNkIsR0FBMkM7SUFDbkYsSUFBSSxFQUFFLHdCQUF3QjtJQUM5QixJQUFJLEVBQUUsT0FBTztJQUNiLFFBQVEsRUFBRSxLQUFLO0lBQ2YsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDO0lBQ3RDLFFBQVEsRUFBRSxJQUFJO0NBQ2YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLGtCQUFrQixHQUFHLFVBQUMsTUFBK0IsSUFBMEIsT0FBQSxDQUFDO0lBQzNGLFlBQVksRUFBRSxVQUFDLFdBQVc7UUFDeEIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FDRixDQUFDLEVBSjBGLENBSTFGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVxdWVzdCB9IGZyb20gXCJAYXdzLXNkay9wcm90b2NvbC1odHRwXCI7XG5pbXBvcnQge1xuICBBYnNvbHV0ZUxvY2F0aW9uLFxuICBCdWlsZEhhbmRsZXIsXG4gIEJ1aWxkSGFuZGxlckFyZ3VtZW50cyxcbiAgQnVpbGRIYW5kbGVyT3B0aW9ucyxcbiAgQnVpbGRIYW5kbGVyT3V0cHV0LFxuICBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dCxcbiAgTWV0YWRhdGFCZWFyZXIsXG4gIFBsdWdnYWJsZSxcbiAgVXNlckFnZW50UGFpcixcbn0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmltcG9ydCB7IFVzZXJBZ2VudFJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4vY29uZmlndXJhdGlvbnNcIjtcbmltcG9ydCB7IFNQQUNFLCBVQV9FU0NBUEVfUkVHRVgsIFVTRVJfQUdFTlQsIFhfQU1aX1VTRVJfQUdFTlQgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBCdWlsZCB1c2VyIGFnZW50IGhlYWRlciBzZWN0aW9ucyBmcm9tOlxuICogMS4gcnVudGltZS1zcGVjaWZpYyBkZWZhdWx0IHVzZXIgYWdlbnQgcHJvdmlkZXI7XG4gKiAyLiBjdXN0b20gdXNlciBhZ2VudCBmcm9tIGBjdXN0b21Vc2VyQWdlbnRgIGNsaWVudCBjb25maWc7XG4gKiAzLiBoYW5kbGVyIGV4ZWN1dGlvbiBjb250ZXh0IHNldCBieSBpbnRlcm5hbCBTREsgY29tcG9uZW50cztcbiAqIFRoZSBidWlsdCB1c2VyIGFnZW50IHdpbGwgYmUgc2V0IHRvIGB4LWFtei11c2VyLWFnZW50YCBoZWFkZXIgZm9yIEFMTCB0aGVcbiAqIHJ1bnRpbWVzLlxuICogUGxlYXNlIG5vdGUgdGhhdCBhbnkgb3ZlcnJpZGUgdG8gdGhlIGB1c2VyLWFnZW50YCBvciBgeC1hbXotdXNlci1hZ2VudGAgaGVhZGVyXG4gKiBpbiB0aGUgSFRUUCByZXF1ZXN0IGlzIGRpc2NvdXJhZ2VkLiBQbGVhc2UgdXNlIGBjdXN0b21Vc2VyQWdlbnRgIGNsaWVudFxuICogY29uZmlnIG9yIG1pZGRsZXdhcmUgc2V0dGluZyB0aGUgYHVzZXJBZ2VudGAgY29udGV4dCB0byBnZW5lcmF0ZSBkZXNpcmVkIHVzZXJcbiAqIGFnZW50LlxuICovXG5leHBvcnQgY29uc3QgdXNlckFnZW50TWlkZGxld2FyZSA9IChvcHRpb25zOiBVc2VyQWdlbnRSZXNvbHZlZENvbmZpZykgPT4gPE91dHB1dCBleHRlbmRzIE1ldGFkYXRhQmVhcmVyPihcbiAgbmV4dDogQnVpbGRIYW5kbGVyPGFueSwgYW55PixcbiAgY29udGV4dDogSGFuZGxlckV4ZWN1dGlvbkNvbnRleHRcbik6IEJ1aWxkSGFuZGxlcjxhbnksIGFueT4gPT4gYXN5bmMgKGFyZ3M6IEJ1aWxkSGFuZGxlckFyZ3VtZW50czxhbnk+KTogUHJvbWlzZTxCdWlsZEhhbmRsZXJPdXRwdXQ8T3V0cHV0Pj4gPT4ge1xuICBjb25zdCB7IHJlcXVlc3QgfSA9IGFyZ3M7XG4gIGlmICghSHR0cFJlcXVlc3QuaXNJbnN0YW5jZShyZXF1ZXN0KSkgcmV0dXJuIG5leHQoYXJncyk7XG4gIGNvbnN0IHsgaGVhZGVycyB9ID0gcmVxdWVzdDtcbiAgY29uc3QgdXNlckFnZW50ID0gY29udGV4dD8udXNlckFnZW50Py5tYXAoZXNjYXBlVXNlckFnZW50KSB8fCBbXTtcbiAgY29uc3QgZGVmYXVsdFVzZXJBZ2VudCA9IChhd2FpdCBvcHRpb25zLmRlZmF1bHRVc2VyQWdlbnRQcm92aWRlcigpKS5tYXAoZXNjYXBlVXNlckFnZW50KTtcbiAgY29uc3QgY3VzdG9tVXNlckFnZW50ID0gb3B0aW9ucz8uY3VzdG9tVXNlckFnZW50Py5tYXAoZXNjYXBlVXNlckFnZW50KSB8fCBbXTtcbiAgLy8gU2V0IHZhbHVlIHRvIEFXUy1zcGVjaWZpYyB1c2VyIGFnZW50IGhlYWRlclxuICBoZWFkZXJzW1hfQU1aX1VTRVJfQUdFTlRdID0gWy4uLmRlZmF1bHRVc2VyQWdlbnQsIC4uLnVzZXJBZ2VudCwgLi4uY3VzdG9tVXNlckFnZW50XS5qb2luKFNQQUNFKTtcbiAgLy8gR2V0IHZhbHVlIHRvIGJlIHNlbnQgd2l0aCBub24tQVdTLXNwZWNpZmljIHVzZXIgYWdlbnQgaGVhZGVyLlxuICBjb25zdCBub3JtYWxVQVZhbHVlID0gW1xuICAgIC4uLmRlZmF1bHRVc2VyQWdlbnQuZmlsdGVyKChzZWN0aW9uKSA9PiBzZWN0aW9uLnN0YXJ0c1dpdGgoXCJhd3Mtc2RrLVwiKSksXG4gICAgLi4uY3VzdG9tVXNlckFnZW50LFxuICBdLmpvaW4oU1BBQ0UpO1xuICBpZiAob3B0aW9ucy5ydW50aW1lICE9PSBcImJyb3dzZXJcIiAmJiBub3JtYWxVQVZhbHVlKSB7XG4gICAgaGVhZGVyc1tVU0VSX0FHRU5UXSA9IGhlYWRlcnNbVVNFUl9BR0VOVF0gPyBgJHtoZWFkZXJzW1VTRVJfQUdFTlRdfSAke25vcm1hbFVBVmFsdWV9YCA6IG5vcm1hbFVBVmFsdWU7XG4gIH1cblxuICByZXR1cm4gbmV4dCh7XG4gICAgLi4uYXJncyxcbiAgICByZXF1ZXN0LFxuICB9KTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBlYWNoIHBhaXIgYWNjb3JkaW5nIHRvIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM1MjM0IGFuZCBqb2luIHRoZSBwYWlyIHdpdGggcGF0dGVybiBgbmFtZS92ZXJzaW9uYC5cbiAqIFVzZXIgYWdlbnQgbmFtZSBtYXkgaW5jbHVkZSBwcmVmaXggbGlrZSBgbWQvYCwgYGFwaS9gLCBgb3MvYCBldGMuLCB3ZSBzaG91bGQgbm90IGVzY2FwZSB0aGUgYC9gIGFmdGVyIHRoZSBwcmVmaXguXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBlc2NhcGVVc2VyQWdlbnQgPSAoW25hbWUsIHZlcnNpb25dOiBVc2VyQWdlbnRQYWlyKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcHJlZml4U2VwYXJhdG9ySW5kZXggPSBuYW1lLmluZGV4T2YoXCIvXCIpO1xuICBjb25zdCBwcmVmaXggPSBuYW1lLnN1YnN0cmluZygwLCBwcmVmaXhTZXBhcmF0b3JJbmRleCk7IC8vIElmIG5vIHByZWZpeCwgcHJlZml4IGlzIGp1c3QgXCJcIlxuICBsZXQgdWFOYW1lID0gbmFtZS5zdWJzdHJpbmcocHJlZml4U2VwYXJhdG9ySW5kZXggKyAxKTtcbiAgaWYgKHByZWZpeCA9PT0gXCJhcGlcIikge1xuICAgIHVhTmFtZSA9IHVhTmFtZS50b0xvd2VyQ2FzZSgpO1xuICB9XG4gIHJldHVybiBbcHJlZml4LCB1YU5hbWUsIHZlcnNpb25dXG4gICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAmJiBpdGVtLmxlbmd0aCA+IDApXG4gICAgLm1hcCgoaXRlbSkgPT4gaXRlbT8ucmVwbGFjZShVQV9FU0NBUEVfUkVHRVgsIFwiX1wiKSlcbiAgICAuam9pbihcIi9cIik7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VXNlckFnZW50TWlkZGxld2FyZU9wdGlvbnM6IEJ1aWxkSGFuZGxlck9wdGlvbnMgJiBBYnNvbHV0ZUxvY2F0aW9uID0ge1xuICBuYW1lOiBcImdldFVzZXJBZ2VudE1pZGRsZXdhcmVcIixcbiAgc3RlcDogXCJidWlsZFwiLFxuICBwcmlvcml0eTogXCJsb3dcIixcbiAgdGFnczogW1wiU0VUX1VTRVJfQUdFTlRcIiwgXCJVU0VSX0FHRU5UXCJdLFxuICBvdmVycmlkZTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyQWdlbnRQbHVnaW4gPSAoY29uZmlnOiBVc2VyQWdlbnRSZXNvbHZlZENvbmZpZyk6IFBsdWdnYWJsZTxhbnksIGFueT4gPT4gKHtcbiAgYXBwbHlUb1N0YWNrOiAoY2xpZW50U3RhY2spID0+IHtcbiAgICBjbGllbnRTdGFjay5hZGQodXNlckFnZW50TWlkZGxld2FyZShjb25maWcpLCBnZXRVc2VyQWdlbnRNaWRkbGV3YXJlT3B0aW9ucyk7XG4gIH0sXG59KTtcbiJdfQ==