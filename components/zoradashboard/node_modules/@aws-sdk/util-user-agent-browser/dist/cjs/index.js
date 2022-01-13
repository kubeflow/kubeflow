"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultUserAgent = void 0;
const tslib_1 = require("tslib");
const bowser_1 = tslib_1.__importDefault(require("bowser"));
/**
 * Default provider to the user agent in browsers. It's a best effort to infer
 * the device information. It uses bowser library to detect the browser and virsion
 */
const defaultUserAgent = ({ serviceId, clientVersion, }) => async () => {
    var _a, _b, _c, _d, _e, _f, _g;
    const parsedUA = ((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) ? bowser_1.default.parse(window.navigator.userAgent) : undefined;
    const sections = [
        // sdk-metadata
        ["aws-sdk-js", clientVersion],
        // os-metadata
        [`os/${((_b = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.os) === null || _b === void 0 ? void 0 : _b.name) || "other"}`, (_c = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.os) === null || _c === void 0 ? void 0 : _c.version],
        // language-metadata
        // ECMAScript edition doesn't matter in JS.
        ["lang/js"],
        // browser vendor and version.
        ["md/browser", `${(_e = (_d = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.browser) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : "unknown"}_${(_g = (_f = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.browser) === null || _f === void 0 ? void 0 : _f.version) !== null && _g !== void 0 ? _g : "unknown"}`],
    ];
    if (serviceId) {
        // api-metadata
        // service Id may not appear in non-AWS clients
        sections.push([`api/${serviceId}`, clientVersion]);
    }
    return sections;
};
exports.defaultUserAgent = defaultUserAgent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLDREQUE0QjtBQUk1Qjs7O0dBR0c7QUFDSSxNQUFNLGdCQUFnQixHQUFHLENBQUMsRUFDL0IsU0FBUyxFQUNULGFBQWEsR0FDVyxFQUF1QixFQUFFLENBQUMsS0FBSyxJQUFJLEVBQUU7O0lBQzdELE1BQU0sUUFBUSxHQUFHLE9BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFNBQVMsMENBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDckcsTUFBTSxRQUFRLEdBQWM7UUFDMUIsZUFBZTtRQUNmLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztRQUM3QixjQUFjO1FBQ2QsQ0FBQyxNQUFNLE9BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEVBQUUsMENBQUUsSUFBSSxLQUFJLE9BQU8sRUFBRSxRQUFFLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxFQUFFLDBDQUFFLE9BQU8sQ0FBQztRQUM5RCxvQkFBb0I7UUFDcEIsMkNBQTJDO1FBQzNDLENBQUMsU0FBUyxDQUFDO1FBQ1gsOEJBQThCO1FBQzlCLENBQUMsWUFBWSxFQUFFLEdBQUcsWUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTywwQ0FBRSxJQUFJLG1DQUFJLFNBQVMsSUFBSSxZQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLDBDQUFFLE9BQU8sbUNBQUksU0FBUyxFQUFFLENBQUM7S0FDckcsQ0FBQztJQUVGLElBQUksU0FBUyxFQUFFO1FBQ2IsZUFBZTtRQUNmLCtDQUErQztRQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxTQUFTLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0tBQ3BEO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFDO0FBeEJXLFFBQUEsZ0JBQWdCLG9CQXdCM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlciwgVXNlckFnZW50IH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgYm93c2VyIGZyb20gXCJib3dzZXJcIjtcblxuaW1wb3J0IHsgRGVmYXVsdFVzZXJBZ2VudE9wdGlvbnMgfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uc1wiO1xuXG4vKipcbiAqIERlZmF1bHQgcHJvdmlkZXIgdG8gdGhlIHVzZXIgYWdlbnQgaW4gYnJvd3NlcnMuIEl0J3MgYSBiZXN0IGVmZm9ydCB0byBpbmZlclxuICogdGhlIGRldmljZSBpbmZvcm1hdGlvbi4gSXQgdXNlcyBib3dzZXIgbGlicmFyeSB0byBkZXRlY3QgdGhlIGJyb3dzZXIgYW5kIHZpcnNpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRVc2VyQWdlbnQgPSAoe1xuICBzZXJ2aWNlSWQsXG4gIGNsaWVudFZlcnNpb24sXG59OiBEZWZhdWx0VXNlckFnZW50T3B0aW9ucyk6IFByb3ZpZGVyPFVzZXJBZ2VudD4gPT4gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBwYXJzZWRVQSA9IHdpbmRvdz8ubmF2aWdhdG9yPy51c2VyQWdlbnQgPyBib3dzZXIucGFyc2Uod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpIDogdW5kZWZpbmVkO1xuICBjb25zdCBzZWN0aW9uczogVXNlckFnZW50ID0gW1xuICAgIC8vIHNkay1tZXRhZGF0YVxuICAgIFtcImF3cy1zZGstanNcIiwgY2xpZW50VmVyc2lvbl0sXG4gICAgLy8gb3MtbWV0YWRhdGFcbiAgICBbYG9zLyR7cGFyc2VkVUE/Lm9zPy5uYW1lIHx8IFwib3RoZXJcIn1gLCBwYXJzZWRVQT8ub3M/LnZlcnNpb25dLFxuICAgIC8vIGxhbmd1YWdlLW1ldGFkYXRhXG4gICAgLy8gRUNNQVNjcmlwdCBlZGl0aW9uIGRvZXNuJ3QgbWF0dGVyIGluIEpTLlxuICAgIFtcImxhbmcvanNcIl0sXG4gICAgLy8gYnJvd3NlciB2ZW5kb3IgYW5kIHZlcnNpb24uXG4gICAgW1wibWQvYnJvd3NlclwiLCBgJHtwYXJzZWRVQT8uYnJvd3Nlcj8ubmFtZSA/PyBcInVua25vd25cIn1fJHtwYXJzZWRVQT8uYnJvd3Nlcj8udmVyc2lvbiA/PyBcInVua25vd25cIn1gXSxcbiAgXTtcblxuICBpZiAoc2VydmljZUlkKSB7XG4gICAgLy8gYXBpLW1ldGFkYXRhXG4gICAgLy8gc2VydmljZSBJZCBtYXkgbm90IGFwcGVhciBpbiBub24tQVdTIGNsaWVudHNcbiAgICBzZWN0aW9ucy5wdXNoKFtgYXBpLyR7c2VydmljZUlkfWAsIGNsaWVudFZlcnNpb25dKTtcbiAgfVxuXG4gIHJldHVybiBzZWN0aW9ucztcbn07XG4iXX0=