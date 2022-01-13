import { __assign, __awaiter, __generator } from "tslib";
export var resolveEndpointsConfig = function (input) {
    var _a;
    return (__assign(__assign({}, input), { tls: (_a = input.tls) !== null && _a !== void 0 ? _a : true, endpoint: input.endpoint ? normalizeEndpoint(input) : function () { return getEndPointFromRegion(input); }, isCustomEndpoint: input.endpoint ? true : false }));
};
var normalizeEndpoint = function (input) {
    var endpoint = input.endpoint, urlParser = input.urlParser;
    if (typeof endpoint === "string") {
        var promisified_1 = Promise.resolve(urlParser(endpoint));
        return function () { return promisified_1; };
    }
    else if (typeof endpoint === "object") {
        var promisified_2 = Promise.resolve(endpoint);
        return function () { return promisified_2; };
    }
    return endpoint;
};
var getEndPointFromRegion = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, tls, region, dnsHostRegex, hostname;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = input.tls, tls = _a === void 0 ? true : _a;
                return [4 /*yield*/, input.region()];
            case 1:
                region = _c.sent();
                dnsHostRegex = new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/);
                if (!dnsHostRegex.test(region)) {
                    throw new Error("Invalid region in client config");
                }
                return [4 /*yield*/, input.regionInfoProvider(region)];
            case 2:
                hostname = ((_b = (_c.sent())) !== null && _b !== void 0 ? _b : {}).hostname;
                if (!hostname) {
                    throw new Error("Cannot resolve hostname from client config");
                }
                return [2 /*return*/, input.urlParser((tls ? "https:" : "http:") + "//" + hostname)];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5kcG9pbnRzQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0VuZHBvaW50c0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBeUJBLE1BQU0sQ0FBQyxJQUFNLHNCQUFzQixHQUFHLFVBQ3BDLEtBQW9EOztJQUNwQixPQUFBLHVCQUM3QixLQUFLLEtBQ1IsR0FBRyxRQUFFLEtBQUssQ0FBQyxHQUFHLG1DQUFJLElBQUksRUFDdEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFNLE9BQUEscUJBQXFCLENBQUMsS0FBSyxDQUFDLEVBQTVCLENBQTRCLEVBQ3hGLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUMvQyxDQUFBO0NBQUEsQ0FBQztBQUVILElBQU0saUJBQWlCLEdBQUcsVUFBQyxLQUFnRDtJQUNqRSxJQUFBLFFBQVEsR0FBZ0IsS0FBSyxTQUFyQixFQUFFLFNBQVMsR0FBSyxLQUFLLFVBQVYsQ0FBVztJQUN0QyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUNoQyxJQUFNLGFBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3pELE9BQU8sY0FBTSxPQUFBLGFBQVcsRUFBWCxDQUFXLENBQUM7S0FDMUI7U0FBTSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUN2QyxJQUFNLGFBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sY0FBTSxPQUFBLGFBQVcsRUFBWCxDQUFXLENBQUM7S0FDMUI7SUFDRCxPQUFPLFFBQVMsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFFRixJQUFNLHFCQUFxQixHQUFHLFVBQU8sS0FBZ0Q7Ozs7OztnQkFDM0UsS0FBZSxLQUFLLElBQVYsRUFBVixHQUFHLG1CQUFHLElBQUksS0FBQSxDQUFXO2dCQUNkLHFCQUFNLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBQTs7Z0JBQTdCLE1BQU0sR0FBRyxTQUFvQjtnQkFFN0IsWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLDBEQUEwRCxDQUFDLENBQUM7Z0JBQzVGLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7aUJBQ3BEO2dCQUVxQixxQkFBTSxLQUFLLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQUE7O2dCQUFwRCxRQUFRLFVBQUssQ0FBQyxTQUFzQyxDQUFDLG1DQUFJLEVBQUUsVUFBbkQ7Z0JBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO2lCQUMvRDtnQkFFRCxzQkFBTyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sV0FBSyxRQUFVLENBQUMsRUFBQzs7O0tBQ3BFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbmRwb2ludCwgUHJvdmlkZXIsIFJlZ2lvbkluZm9Qcm92aWRlciwgVXJsUGFyc2VyIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRzSW5wdXRDb25maWcge1xuICAvKipcbiAgICogVGhlIGZ1bGx5IHF1YWxpZmllZCBlbmRwb2ludCBvZiB0aGUgd2Vic2VydmljZS4gVGhpcyBpcyBvbmx5IHJlcXVpcmVkIHdoZW4gdXNpbmcgYSBjdXN0b20gZW5kcG9pbnQgKGZvciBleGFtcGxlLCB3aGVuIHVzaW5nIGEgbG9jYWwgdmVyc2lvbiBvZiBTMykuXG4gICAqL1xuICBlbmRwb2ludD86IHN0cmluZyB8IEVuZHBvaW50IHwgUHJvdmlkZXI8RW5kcG9pbnQ+O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIFRMUyBpcyBlbmFibGVkIGZvciByZXF1ZXN0cy5cbiAgICovXG4gIHRscz86IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBQcmV2aW91c2x5UmVzb2x2ZWQge1xuICByZWdpb25JbmZvUHJvdmlkZXI6IFJlZ2lvbkluZm9Qcm92aWRlcjtcbiAgdXJsUGFyc2VyOiBVcmxQYXJzZXI7XG4gIHJlZ2lvbjogUHJvdmlkZXI8c3RyaW5nPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludHNSZXNvbHZlZENvbmZpZyBleHRlbmRzIFJlcXVpcmVkPEVuZHBvaW50c0lucHV0Q29uZmlnPiB7XG4gIGVuZHBvaW50OiBQcm92aWRlcjxFbmRwb2ludD47XG4gIGlzQ3VzdG9tRW5kcG9pbnQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlRW5kcG9pbnRzQ29uZmlnID0gPFQ+KFxuICBpbnB1dDogVCAmIEVuZHBvaW50c0lucHV0Q29uZmlnICYgUHJldmlvdXNseVJlc29sdmVkXG4pOiBUICYgRW5kcG9pbnRzUmVzb2x2ZWRDb25maWcgPT4gKHtcbiAgLi4uaW5wdXQsXG4gIHRsczogaW5wdXQudGxzID8/IHRydWUsXG4gIGVuZHBvaW50OiBpbnB1dC5lbmRwb2ludCA/IG5vcm1hbGl6ZUVuZHBvaW50KGlucHV0KSA6ICgpID0+IGdldEVuZFBvaW50RnJvbVJlZ2lvbihpbnB1dCksXG4gIGlzQ3VzdG9tRW5kcG9pbnQ6IGlucHV0LmVuZHBvaW50ID8gdHJ1ZSA6IGZhbHNlLFxufSk7XG5cbmNvbnN0IG5vcm1hbGl6ZUVuZHBvaW50ID0gKGlucHV0OiBFbmRwb2ludHNJbnB1dENvbmZpZyAmIFByZXZpb3VzbHlSZXNvbHZlZCk6IFByb3ZpZGVyPEVuZHBvaW50PiA9PiB7XG4gIGNvbnN0IHsgZW5kcG9pbnQsIHVybFBhcnNlciB9ID0gaW5wdXQ7XG4gIGlmICh0eXBlb2YgZW5kcG9pbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCBwcm9taXNpZmllZCA9IFByb21pc2UucmVzb2x2ZSh1cmxQYXJzZXIoZW5kcG9pbnQpKTtcbiAgICByZXR1cm4gKCkgPT4gcHJvbWlzaWZpZWQ7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVuZHBvaW50ID09PSBcIm9iamVjdFwiKSB7XG4gICAgY29uc3QgcHJvbWlzaWZpZWQgPSBQcm9taXNlLnJlc29sdmUoZW5kcG9pbnQpO1xuICAgIHJldHVybiAoKSA9PiBwcm9taXNpZmllZDtcbiAgfVxuICByZXR1cm4gZW5kcG9pbnQhO1xufTtcblxuY29uc3QgZ2V0RW5kUG9pbnRGcm9tUmVnaW9uID0gYXN5bmMgKGlucHV0OiBFbmRwb2ludHNJbnB1dENvbmZpZyAmIFByZXZpb3VzbHlSZXNvbHZlZCkgPT4ge1xuICBjb25zdCB7IHRscyA9IHRydWUgfSA9IGlucHV0O1xuICBjb25zdCByZWdpb24gPSBhd2FpdCBpbnB1dC5yZWdpb24oKTtcblxuICBjb25zdCBkbnNIb3N0UmVnZXggPSBuZXcgUmVnRXhwKC9eKFthLXpBLVowLTldfFthLXpBLVowLTldW2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pJC8pO1xuICBpZiAoIWRuc0hvc3RSZWdleC50ZXN0KHJlZ2lvbikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHJlZ2lvbiBpbiBjbGllbnQgY29uZmlnXCIpO1xuICB9XG5cbiAgY29uc3QgeyBob3N0bmFtZSB9ID0gKGF3YWl0IGlucHV0LnJlZ2lvbkluZm9Qcm92aWRlcihyZWdpb24pKSA/PyB7fTtcbiAgaWYgKCFob3N0bmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCByZXNvbHZlIGhvc3RuYW1lIGZyb20gY2xpZW50IGNvbmZpZ1wiKTtcbiAgfVxuXG4gIHJldHVybiBpbnB1dC51cmxQYXJzZXIoYCR7dGxzID8gXCJodHRwczpcIiA6IFwiaHR0cDpcIn0vLyR7aG9zdG5hbWV9YCk7XG59O1xuIl19