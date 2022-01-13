"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAgentPlugin = exports.getUserAgentMiddlewareOptions = exports.userAgentMiddleware = void 0;
const protocol_http_1 = require("@aws-sdk/protocol-http");
const constants_1 = require("./constants");
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
const userAgentMiddleware = (options) => (next, context) => async (args) => {
    var _a, _b;
    const { request } = args;
    if (!protocol_http_1.HttpRequest.isInstance(request))
        return next(args);
    const { headers } = request;
    const userAgent = ((_a = context === null || context === void 0 ? void 0 : context.userAgent) === null || _a === void 0 ? void 0 : _a.map(escapeUserAgent)) || [];
    const defaultUserAgent = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
    const customUserAgent = ((_b = options === null || options === void 0 ? void 0 : options.customUserAgent) === null || _b === void 0 ? void 0 : _b.map(escapeUserAgent)) || [];
    // Set value to AWS-specific user agent header
    headers[constants_1.X_AMZ_USER_AGENT] = [...defaultUserAgent, ...userAgent, ...customUserAgent].join(constants_1.SPACE);
    // Get value to be sent with non-AWS-specific user agent header.
    const normalUAValue = [
        ...defaultUserAgent.filter((section) => section.startsWith("aws-sdk-")),
        ...customUserAgent,
    ].join(constants_1.SPACE);
    if (options.runtime !== "browser" && normalUAValue) {
        headers[constants_1.USER_AGENT] = headers[constants_1.USER_AGENT] ? `${headers[constants_1.USER_AGENT]} ${normalUAValue}` : normalUAValue;
    }
    return next({
        ...args,
        request,
    });
};
exports.userAgentMiddleware = userAgentMiddleware;
/**
 * Escape the each pair according to https://tools.ietf.org/html/rfc5234 and join the pair with pattern `name/version`.
 * User agent name may include prefix like `md/`, `api/`, `os/` etc., we should not escape the `/` after the prefix.
 * @private
 */
const escapeUserAgent = ([name, version]) => {
    const prefixSeparatorIndex = name.indexOf("/");
    const prefix = name.substring(0, prefixSeparatorIndex); // If no prefix, prefix is just ""
    let uaName = name.substring(prefixSeparatorIndex + 1);
    if (prefix === "api") {
        uaName = uaName.toLowerCase();
    }
    return [prefix, uaName, version]
        .filter((item) => item && item.length > 0)
        .map((item) => item === null || item === void 0 ? void 0 : item.replace(constants_1.UA_ESCAPE_REGEX, "_"))
        .join("/");
};
exports.getUserAgentMiddlewareOptions = {
    name: "getUserAgentMiddleware",
    step: "build",
    priority: "low",
    tags: ["SET_USER_AGENT", "USER_AGENT"],
    override: true,
};
const getUserAgentPlugin = (config) => ({
    applyToStack: (clientStack) => {
        clientStack.add(exports.userAgentMiddleware(config), exports.getUserAgentMiddlewareOptions);
    },
});
exports.getUserAgentPlugin = getUserAgentPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hZ2VudC1taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VzZXItYWdlbnQtbWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBcUQ7QUFjckQsMkNBQW1GO0FBRW5GOzs7Ozs7Ozs7OztHQVdHO0FBQ0ksTUFBTSxtQkFBbUIsR0FBRyxDQUFDLE9BQWdDLEVBQUUsRUFBRSxDQUFDLENBQ3ZFLElBQTRCLEVBQzVCLE9BQWdDLEVBQ1IsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFnQyxFQUF1QyxFQUFFOztJQUMzRyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLElBQUksQ0FBQywyQkFBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RCxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBQzVCLE1BQU0sU0FBUyxHQUFHLE9BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFNBQVMsMENBQUUsR0FBRyxDQUFDLGVBQWUsTUFBSyxFQUFFLENBQUM7SUFDakUsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDekYsTUFBTSxlQUFlLEdBQUcsT0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsZUFBZSwwQ0FBRSxHQUFHLENBQUMsZUFBZSxNQUFLLEVBQUUsQ0FBQztJQUM3RSw4Q0FBOEM7SUFDOUMsT0FBTyxDQUFDLDRCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLEdBQUcsU0FBUyxFQUFFLEdBQUcsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFLLENBQUMsQ0FBQztJQUNoRyxnRUFBZ0U7SUFDaEUsTUFBTSxhQUFhLEdBQUc7UUFDcEIsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkUsR0FBRyxlQUFlO0tBQ25CLENBQUMsSUFBSSxDQUFDLGlCQUFLLENBQUMsQ0FBQztJQUNkLElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxTQUFTLElBQUksYUFBYSxFQUFFO1FBQ2xELE9BQU8sQ0FBQyxzQkFBVSxDQUFDLEdBQUcsT0FBTyxDQUFDLHNCQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsc0JBQVUsQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7S0FDdkc7SUFFRCxPQUFPLElBQUksQ0FBQztRQUNWLEdBQUcsSUFBSTtRQUNQLE9BQU87S0FDUixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUF6QlcsUUFBQSxtQkFBbUIsdUJBeUI5QjtBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLGVBQWUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBZ0IsRUFBVSxFQUFFO0lBQ2pFLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsa0NBQWtDO0lBQzFGLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEQsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQ3BCLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDL0I7SUFDRCxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7U0FDN0IsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDekMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsT0FBTyxDQUFDLDJCQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRVcsUUFBQSw2QkFBNkIsR0FBMkM7SUFDbkYsSUFBSSxFQUFFLHdCQUF3QjtJQUM5QixJQUFJLEVBQUUsT0FBTztJQUNiLFFBQVEsRUFBRSxLQUFLO0lBQ2YsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDO0lBQ3RDLFFBQVEsRUFBRSxJQUFJO0NBQ2YsQ0FBQztBQUVLLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxNQUErQixFQUF1QixFQUFFLENBQUMsQ0FBQztJQUMzRixZQUFZLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUM1QixXQUFXLENBQUMsR0FBRyxDQUFDLDJCQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUFFLHFDQUE2QixDQUFDLENBQUM7SUFDOUUsQ0FBQztDQUNGLENBQUMsQ0FBQztBQUpVLFFBQUEsa0JBQWtCLHNCQUk1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBSZXF1ZXN0IH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3RvY29sLWh0dHBcIjtcbmltcG9ydCB7XG4gIEFic29sdXRlTG9jYXRpb24sXG4gIEJ1aWxkSGFuZGxlcixcbiAgQnVpbGRIYW5kbGVyQXJndW1lbnRzLFxuICBCdWlsZEhhbmRsZXJPcHRpb25zLFxuICBCdWlsZEhhbmRsZXJPdXRwdXQsXG4gIEhhbmRsZXJFeGVjdXRpb25Db250ZXh0LFxuICBNZXRhZGF0YUJlYXJlcixcbiAgUGx1Z2dhYmxlLFxuICBVc2VyQWdlbnRQYWlyLFxufSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuaW1wb3J0IHsgVXNlckFnZW50UmVzb2x2ZWRDb25maWcgfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uc1wiO1xuaW1wb3J0IHsgU1BBQ0UsIFVBX0VTQ0FQRV9SRUdFWCwgVVNFUl9BR0VOVCwgWF9BTVpfVVNFUl9BR0VOVCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEJ1aWxkIHVzZXIgYWdlbnQgaGVhZGVyIHNlY3Rpb25zIGZyb206XG4gKiAxLiBydW50aW1lLXNwZWNpZmljIGRlZmF1bHQgdXNlciBhZ2VudCBwcm92aWRlcjtcbiAqIDIuIGN1c3RvbSB1c2VyIGFnZW50IGZyb20gYGN1c3RvbVVzZXJBZ2VudGAgY2xpZW50IGNvbmZpZztcbiAqIDMuIGhhbmRsZXIgZXhlY3V0aW9uIGNvbnRleHQgc2V0IGJ5IGludGVybmFsIFNESyBjb21wb25lbnRzO1xuICogVGhlIGJ1aWx0IHVzZXIgYWdlbnQgd2lsbCBiZSBzZXQgdG8gYHgtYW16LXVzZXItYWdlbnRgIGhlYWRlciBmb3IgQUxMIHRoZVxuICogcnVudGltZXMuXG4gKiBQbGVhc2Ugbm90ZSB0aGF0IGFueSBvdmVycmlkZSB0byB0aGUgYHVzZXItYWdlbnRgIG9yIGB4LWFtei11c2VyLWFnZW50YCBoZWFkZXJcbiAqIGluIHRoZSBIVFRQIHJlcXVlc3QgaXMgZGlzY291cmFnZWQuIFBsZWFzZSB1c2UgYGN1c3RvbVVzZXJBZ2VudGAgY2xpZW50XG4gKiBjb25maWcgb3IgbWlkZGxld2FyZSBzZXR0aW5nIHRoZSBgdXNlckFnZW50YCBjb250ZXh0IHRvIGdlbmVyYXRlIGRlc2lyZWQgdXNlclxuICogYWdlbnQuXG4gKi9cbmV4cG9ydCBjb25zdCB1c2VyQWdlbnRNaWRkbGV3YXJlID0gKG9wdGlvbnM6IFVzZXJBZ2VudFJlc29sdmVkQ29uZmlnKSA9PiA8T3V0cHV0IGV4dGVuZHMgTWV0YWRhdGFCZWFyZXI+KFxuICBuZXh0OiBCdWlsZEhhbmRsZXI8YW55LCBhbnk+LFxuICBjb250ZXh0OiBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dFxuKTogQnVpbGRIYW5kbGVyPGFueSwgYW55PiA9PiBhc3luYyAoYXJnczogQnVpbGRIYW5kbGVyQXJndW1lbnRzPGFueT4pOiBQcm9taXNlPEJ1aWxkSGFuZGxlck91dHB1dDxPdXRwdXQ+PiA9PiB7XG4gIGNvbnN0IHsgcmVxdWVzdCB9ID0gYXJncztcbiAgaWYgKCFIdHRwUmVxdWVzdC5pc0luc3RhbmNlKHJlcXVlc3QpKSByZXR1cm4gbmV4dChhcmdzKTtcbiAgY29uc3QgeyBoZWFkZXJzIH0gPSByZXF1ZXN0O1xuICBjb25zdCB1c2VyQWdlbnQgPSBjb250ZXh0Py51c2VyQWdlbnQ/Lm1hcChlc2NhcGVVc2VyQWdlbnQpIHx8IFtdO1xuICBjb25zdCBkZWZhdWx0VXNlckFnZW50ID0gKGF3YWl0IG9wdGlvbnMuZGVmYXVsdFVzZXJBZ2VudFByb3ZpZGVyKCkpLm1hcChlc2NhcGVVc2VyQWdlbnQpO1xuICBjb25zdCBjdXN0b21Vc2VyQWdlbnQgPSBvcHRpb25zPy5jdXN0b21Vc2VyQWdlbnQ/Lm1hcChlc2NhcGVVc2VyQWdlbnQpIHx8IFtdO1xuICAvLyBTZXQgdmFsdWUgdG8gQVdTLXNwZWNpZmljIHVzZXIgYWdlbnQgaGVhZGVyXG4gIGhlYWRlcnNbWF9BTVpfVVNFUl9BR0VOVF0gPSBbLi4uZGVmYXVsdFVzZXJBZ2VudCwgLi4udXNlckFnZW50LCAuLi5jdXN0b21Vc2VyQWdlbnRdLmpvaW4oU1BBQ0UpO1xuICAvLyBHZXQgdmFsdWUgdG8gYmUgc2VudCB3aXRoIG5vbi1BV1Mtc3BlY2lmaWMgdXNlciBhZ2VudCBoZWFkZXIuXG4gIGNvbnN0IG5vcm1hbFVBVmFsdWUgPSBbXG4gICAgLi4uZGVmYXVsdFVzZXJBZ2VudC5maWx0ZXIoKHNlY3Rpb24pID0+IHNlY3Rpb24uc3RhcnRzV2l0aChcImF3cy1zZGstXCIpKSxcbiAgICAuLi5jdXN0b21Vc2VyQWdlbnQsXG4gIF0uam9pbihTUEFDRSk7XG4gIGlmIChvcHRpb25zLnJ1bnRpbWUgIT09IFwiYnJvd3NlclwiICYmIG5vcm1hbFVBVmFsdWUpIHtcbiAgICBoZWFkZXJzW1VTRVJfQUdFTlRdID0gaGVhZGVyc1tVU0VSX0FHRU5UXSA/IGAke2hlYWRlcnNbVVNFUl9BR0VOVF19ICR7bm9ybWFsVUFWYWx1ZX1gIDogbm9ybWFsVUFWYWx1ZTtcbiAgfVxuXG4gIHJldHVybiBuZXh0KHtcbiAgICAuLi5hcmdzLFxuICAgIHJlcXVlc3QsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGVhY2ggcGFpciBhY2NvcmRpbmcgdG8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzUyMzQgYW5kIGpvaW4gdGhlIHBhaXIgd2l0aCBwYXR0ZXJuIGBuYW1lL3ZlcnNpb25gLlxuICogVXNlciBhZ2VudCBuYW1lIG1heSBpbmNsdWRlIHByZWZpeCBsaWtlIGBtZC9gLCBgYXBpL2AsIGBvcy9gIGV0Yy4sIHdlIHNob3VsZCBub3QgZXNjYXBlIHRoZSBgL2AgYWZ0ZXIgdGhlIHByZWZpeC5cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGVzY2FwZVVzZXJBZ2VudCA9IChbbmFtZSwgdmVyc2lvbl06IFVzZXJBZ2VudFBhaXIpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBwcmVmaXhTZXBhcmF0b3JJbmRleCA9IG5hbWUuaW5kZXhPZihcIi9cIik7XG4gIGNvbnN0IHByZWZpeCA9IG5hbWUuc3Vic3RyaW5nKDAsIHByZWZpeFNlcGFyYXRvckluZGV4KTsgLy8gSWYgbm8gcHJlZml4LCBwcmVmaXggaXMganVzdCBcIlwiXG4gIGxldCB1YU5hbWUgPSBuYW1lLnN1YnN0cmluZyhwcmVmaXhTZXBhcmF0b3JJbmRleCArIDEpO1xuICBpZiAocHJlZml4ID09PSBcImFwaVwiKSB7XG4gICAgdWFOYW1lID0gdWFOYW1lLnRvTG93ZXJDYXNlKCk7XG4gIH1cbiAgcmV0dXJuIFtwcmVmaXgsIHVhTmFtZSwgdmVyc2lvbl1cbiAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtICYmIGl0ZW0ubGVuZ3RoID4gMClcbiAgICAubWFwKChpdGVtKSA9PiBpdGVtPy5yZXBsYWNlKFVBX0VTQ0FQRV9SRUdFWCwgXCJfXCIpKVxuICAgIC5qb2luKFwiL1wiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyQWdlbnRNaWRkbGV3YXJlT3B0aW9uczogQnVpbGRIYW5kbGVyT3B0aW9ucyAmIEFic29sdXRlTG9jYXRpb24gPSB7XG4gIG5hbWU6IFwiZ2V0VXNlckFnZW50TWlkZGxld2FyZVwiLFxuICBzdGVwOiBcImJ1aWxkXCIsXG4gIHByaW9yaXR5OiBcImxvd1wiLFxuICB0YWdzOiBbXCJTRVRfVVNFUl9BR0VOVFwiLCBcIlVTRVJfQUdFTlRcIl0sXG4gIG92ZXJyaWRlOiB0cnVlLFxufTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJBZ2VudFBsdWdpbiA9IChjb25maWc6IFVzZXJBZ2VudFJlc29sdmVkQ29uZmlnKTogUGx1Z2dhYmxlPGFueSwgYW55PiA9PiAoe1xuICBhcHBseVRvU3RhY2s6IChjbGllbnRTdGFjaykgPT4ge1xuICAgIGNsaWVudFN0YWNrLmFkZCh1c2VyQWdlbnRNaWRkbGV3YXJlKGNvbmZpZyksIGdldFVzZXJBZ2VudE1pZGRsZXdhcmVPcHRpb25zKTtcbiAgfSxcbn0pO1xuIl19