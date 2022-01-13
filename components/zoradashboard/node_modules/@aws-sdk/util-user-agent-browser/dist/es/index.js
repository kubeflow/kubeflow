import { __awaiter, __generator } from "tslib";
import bowser from "bowser";
/**
 * Default provider to the user agent in browsers. It's a best effort to infer
 * the device information. It uses bowser library to detect the browser and virsion
 */
export var defaultUserAgent = function (_a) {
    var serviceId = _a.serviceId, clientVersion = _a.clientVersion;
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var parsedUA, sections;
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            parsedUA = ((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) ? bowser.parse(window.navigator.userAgent) : undefined;
            sections = [
                // sdk-metadata
                ["aws-sdk-js", clientVersion],
                // os-metadata
                ["os/" + (((_b = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.os) === null || _b === void 0 ? void 0 : _b.name) || "other"), (_c = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.os) === null || _c === void 0 ? void 0 : _c.version],
                // language-metadata
                // ECMAScript edition doesn't matter in JS.
                ["lang/js"],
                // browser vendor and version.
                ["md/browser", ((_e = (_d = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.browser) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : "unknown") + "_" + ((_g = (_f = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.browser) === null || _f === void 0 ? void 0 : _f.version) !== null && _g !== void 0 ? _g : "unknown")],
            ];
            if (serviceId) {
                // api-metadata
                // service Id may not appear in non-AWS clients
                sections.push(["api/" + serviceId, clientVersion]);
            }
            return [2 /*return*/, sections];
        });
    }); };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUk1Qjs7O0dBR0c7QUFDSCxNQUFNLENBQUMsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLEVBR1A7UUFGeEIsU0FBUyxlQUFBLEVBQ1QsYUFBYSxtQkFBQTtJQUNxQyxPQUFBOzs7O1lBQzVDLFFBQVEsR0FBRyxPQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxTQUFTLDBDQUFFLFNBQVMsRUFBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDL0YsUUFBUSxHQUFjO2dCQUMxQixlQUFlO2dCQUNmLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztnQkFDN0IsY0FBYztnQkFDZCxDQUFDLFNBQU0sT0FBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsRUFBRSwwQ0FBRSxJQUFJLEtBQUksT0FBTyxDQUFFLFFBQUUsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEVBQUUsMENBQUUsT0FBTyxDQUFDO2dCQUM5RCxvQkFBb0I7Z0JBQ3BCLDJDQUEyQztnQkFDM0MsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsOEJBQThCO2dCQUM5QixDQUFDLFlBQVksRUFBRSxhQUFHLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLDBDQUFFLElBQUksbUNBQUksU0FBUyx1QkFBSSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTywwQ0FBRSxPQUFPLG1DQUFJLFNBQVMsQ0FBRSxDQUFDO2FBQ3JHLENBQUM7WUFFRixJQUFJLFNBQVMsRUFBRTtnQkFDYixlQUFlO2dCQUNmLCtDQUErQztnQkFDL0MsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQU8sU0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7WUFFRCxzQkFBTyxRQUFRLEVBQUM7O1NBQ2pCO0FBckJtRCxDQXFCbkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyLCBVc2VyQWdlbnQgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcbmltcG9ydCBib3dzZXIgZnJvbSBcImJvd3NlclwiO1xuXG5pbXBvcnQgeyBEZWZhdWx0VXNlckFnZW50T3B0aW9ucyB9IGZyb20gXCIuL2NvbmZpZ3VyYXRpb25zXCI7XG5cbi8qKlxuICogRGVmYXVsdCBwcm92aWRlciB0byB0aGUgdXNlciBhZ2VudCBpbiBicm93c2Vycy4gSXQncyBhIGJlc3QgZWZmb3J0IHRvIGluZmVyXG4gKiB0aGUgZGV2aWNlIGluZm9ybWF0aW9uLiBJdCB1c2VzIGJvd3NlciBsaWJyYXJ5IHRvIGRldGVjdCB0aGUgYnJvd3NlciBhbmQgdmlyc2lvblxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFVzZXJBZ2VudCA9ICh7XG4gIHNlcnZpY2VJZCxcbiAgY2xpZW50VmVyc2lvbixcbn06IERlZmF1bHRVc2VyQWdlbnRPcHRpb25zKTogUHJvdmlkZXI8VXNlckFnZW50PiA9PiBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHBhcnNlZFVBID0gd2luZG93Py5uYXZpZ2F0b3I/LnVzZXJBZ2VudCA/IGJvd3Nlci5wYXJzZSh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IHNlY3Rpb25zOiBVc2VyQWdlbnQgPSBbXG4gICAgLy8gc2RrLW1ldGFkYXRhXG4gICAgW1wiYXdzLXNkay1qc1wiLCBjbGllbnRWZXJzaW9uXSxcbiAgICAvLyBvcy1tZXRhZGF0YVxuICAgIFtgb3MvJHtwYXJzZWRVQT8ub3M/Lm5hbWUgfHwgXCJvdGhlclwifWAsIHBhcnNlZFVBPy5vcz8udmVyc2lvbl0sXG4gICAgLy8gbGFuZ3VhZ2UtbWV0YWRhdGFcbiAgICAvLyBFQ01BU2NyaXB0IGVkaXRpb24gZG9lc24ndCBtYXR0ZXIgaW4gSlMuXG4gICAgW1wibGFuZy9qc1wiXSxcbiAgICAvLyBicm93c2VyIHZlbmRvciBhbmQgdmVyc2lvbi5cbiAgICBbXCJtZC9icm93c2VyXCIsIGAke3BhcnNlZFVBPy5icm93c2VyPy5uYW1lID8/IFwidW5rbm93blwifV8ke3BhcnNlZFVBPy5icm93c2VyPy52ZXJzaW9uID8/IFwidW5rbm93blwifWBdLFxuICBdO1xuXG4gIGlmIChzZXJ2aWNlSWQpIHtcbiAgICAvLyBhcGktbWV0YWRhdGFcbiAgICAvLyBzZXJ2aWNlIElkIG1heSBub3QgYXBwZWFyIGluIG5vbi1BV1MgY2xpZW50c1xuICAgIHNlY3Rpb25zLnB1c2goW2BhcGkvJHtzZXJ2aWNlSWR9YCwgY2xpZW50VmVyc2lvbl0pO1xuICB9XG5cbiAgcmV0dXJuIHNlY3Rpb25zO1xufTtcbiJdfQ==