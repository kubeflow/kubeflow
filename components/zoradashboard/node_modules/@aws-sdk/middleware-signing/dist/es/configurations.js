import { __assign, __awaiter, __generator, __read } from "tslib";
import { SignatureV4 } from "@aws-sdk/signature-v4";
export function resolveAwsAuthConfig(input) {
    var _this = this;
    var credentials = input.credentials || input.credentialDefaultProvider(input);
    var normalizedCreds = normalizeProvider(credentials);
    var _a = input.signingEscapePath, signingEscapePath = _a === void 0 ? true : _a, _b = input.systemClockOffset, systemClockOffset = _b === void 0 ? input.systemClockOffset || 0 : _b, sha256 = input.sha256;
    var signer;
    if (input.signer) {
        //if signer is supplied by user, normalize it to a function returning a promise for signer.
        signer = normalizeProvider(input.signer);
    }
    else {
        //construct a provider inferring signing from region.
        signer = function () {
            return normalizeProvider(input.region)()
                .then(function (region) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, input.regionInfoProvider(region)];
                    case 1: return [2 /*return*/, [(_a.sent()) || {}, region]];
                }
            }); }); })
                .then(function (_a) {
                var _b = __read(_a, 2), regionInfo = _b[0], region = _b[1];
                var signingRegion = regionInfo.signingRegion, signingService = regionInfo.signingService;
                //update client's singing region and signing service config if they are resolved.
                //signing region resolving order: user supplied signingRegion -> endpoints.json inferred region -> client region
                input.signingRegion = input.signingRegion || signingRegion || region;
                //signing name resolving order:
                //user supplied signingName -> endpoints.json inferred (credential scope -> model arnNamespace) -> model service id
                input.signingName = input.signingName || signingService || input.serviceId;
                return new SignatureV4({
                    credentials: normalizedCreds,
                    region: input.signingRegion,
                    service: input.signingName,
                    sha256: sha256,
                    uriEscapePath: signingEscapePath,
                });
            });
        };
    }
    return __assign(__assign({}, input), { systemClockOffset: systemClockOffset,
        signingEscapePath: signingEscapePath, credentials: normalizedCreds, signer: signer });
}
function normalizeProvider(input) {
    if (typeof input === "object") {
        var promisified_1 = Promise.resolve(input);
        return function () { return promisified_1; };
    }
    return input;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlndXJhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQTRDcEQsTUFBTSxVQUFVLG9CQUFvQixDQUFJLEtBQWtEO0lBQTFGLGlCQXVDQztJQXRDQyxJQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxLQUFZLENBQUMsQ0FBQztJQUN2RixJQUFNLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQyxJQUFBLEtBQXVGLEtBQUssa0JBQXBFLEVBQXhCLGlCQUFpQixtQkFBRyxJQUFJLEtBQUEsRUFBRSxLQUE2RCxLQUFLLGtCQUFsQixFQUFoRCxpQkFBaUIsbUJBQUcsS0FBSyxDQUFDLGlCQUFpQixJQUFJLENBQUMsS0FBQSxFQUFFLE1BQU0sR0FBSyxLQUFLLE9BQVYsQ0FBVztJQUNyRyxJQUFJLE1BQStCLENBQUM7SUFDcEMsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ2hCLDJGQUEyRjtRQUMzRixNQUFNLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFDO1NBQU07UUFDTCxxREFBcUQ7UUFDckQsTUFBTSxHQUFHO1lBQ1AsT0FBQSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7aUJBQzlCLElBQUksQ0FBQyxVQUFPLE1BQU07OzRCQUFPLHFCQUFNLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsRUFBQTs0QkFBeEMsc0JBQUEsQ0FBQyxDQUFDLFNBQXNDLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxDQUF5QixFQUFBOztxQkFBQSxDQUFDO2lCQUN4RyxJQUFJLENBQUMsVUFBQyxFQUFvQjtvQkFBcEIsS0FBQSxhQUFvQixFQUFuQixVQUFVLFFBQUEsRUFBRSxNQUFNLFFBQUE7Z0JBQ2hCLElBQUEsYUFBYSxHQUFxQixVQUFVLGNBQS9CLEVBQUUsY0FBYyxHQUFLLFVBQVUsZUFBZixDQUFnQjtnQkFDckQsaUZBQWlGO2dCQUNqRixnSEFBZ0g7Z0JBQ2hILEtBQUssQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLGFBQWEsSUFBSSxhQUFhLElBQUksTUFBTSxDQUFDO2dCQUNyRSwrQkFBK0I7Z0JBQy9CLG1IQUFtSDtnQkFDbkgsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxJQUFJLGNBQWMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDO2dCQUUzRSxPQUFPLElBQUksV0FBVyxDQUFDO29CQUNyQixXQUFXLEVBQUUsZUFBZTtvQkFDNUIsTUFBTSxFQUFFLEtBQUssQ0FBQyxhQUFhO29CQUMzQixPQUFPLEVBQUUsS0FBSyxDQUFDLFdBQVc7b0JBQzFCLE1BQU0sUUFBQTtvQkFDTixhQUFhLEVBQUUsaUJBQWlCO2lCQUNqQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUM7UUFsQkosQ0FrQkksQ0FBQztLQUNSO0lBRUQsNkJBQ0ssS0FBSyxLQUNSLGlCQUFpQixtQkFBQTtRQUNqQixpQkFBaUIsbUJBQUEsRUFDakIsV0FBVyxFQUFFLGVBQWUsRUFDNUIsTUFBTSxRQUFBLElBQ047QUFDSixDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBSSxLQUFzQjtJQUNsRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUM3QixJQUFNLGFBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLE9BQU8sY0FBTSxPQUFBLGFBQVcsRUFBWCxDQUFXLENBQUM7S0FDMUI7SUFDRCxPQUFPLEtBQW9CLENBQUM7QUFDOUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpZ25hdHVyZVY0IH0gZnJvbSBcIkBhd3Mtc2RrL3NpZ25hdHVyZS12NFwiO1xuaW1wb3J0IHsgQ3JlZGVudGlhbHMsIEhhc2hDb25zdHJ1Y3RvciwgUHJvdmlkZXIsIFJlZ2lvbkluZm8sIFJlZ2lvbkluZm9Qcm92aWRlciwgUmVxdWVzdFNpZ25lciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEF3c0F1dGhJbnB1dENvbmZpZyB7XG4gIC8qKlxuICAgKiBUaGUgY3JlZGVudGlhbHMgdXNlZCB0byBzaWduIHJlcXVlc3RzLlxuICAgKi9cbiAgY3JlZGVudGlhbHM/OiBDcmVkZW50aWFscyB8IFByb3ZpZGVyPENyZWRlbnRpYWxzPjtcblxuICAvKipcbiAgICogVGhlIHNpZ25lciB0byB1c2Ugd2hlbiBzaWduaW5nIHJlcXVlc3RzLlxuICAgKi9cbiAgc2lnbmVyPzogUmVxdWVzdFNpZ25lciB8IFByb3ZpZGVyPFJlcXVlc3RTaWduZXI+O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGVzY2FwZSByZXF1ZXN0IHBhdGggd2hlbiBzaWduaW5nIHRoZSByZXF1ZXN0LlxuICAgKi9cbiAgc2lnbmluZ0VzY2FwZVBhdGg/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBbiBvZmZzZXQgdmFsdWUgaW4gbWlsbGlzZWNvbmRzIHRvIGFwcGx5IHRvIGFsbCBzaWduaW5nIHRpbWVzLlxuICAgKi9cbiAgc3lzdGVtQ2xvY2tPZmZzZXQ/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSByZWdpb24gd2hlcmUgeW91IHdhbnQgdG8gc2lnbiB5b3VyIHJlcXVlc3QgYWdhaW5zdC4gVGhpc1xuICAgKiBjYW4gYmUgZGlmZmVyZW50IHRvIHRoZSByZWdpb24gaW4gdGhlIGVuZHBvaW50LlxuICAgKi9cbiAgc2lnbmluZ1JlZ2lvbj86IHN0cmluZztcbn1cbmludGVyZmFjZSBQcmV2aW91c2x5UmVzb2x2ZWQge1xuICBjcmVkZW50aWFsRGVmYXVsdFByb3ZpZGVyOiAoaW5wdXQ6IGFueSkgPT4gUHJvdmlkZXI8Q3JlZGVudGlhbHM+O1xuICByZWdpb246IHN0cmluZyB8IFByb3ZpZGVyPHN0cmluZz47XG4gIHJlZ2lvbkluZm9Qcm92aWRlcjogUmVnaW9uSW5mb1Byb3ZpZGVyO1xuICBzaWduaW5nTmFtZT86IHN0cmluZztcbiAgc2VydmljZUlkOiBzdHJpbmc7XG4gIHNoYTI1NjogSGFzaENvbnN0cnVjdG9yO1xufVxuZXhwb3J0IGludGVyZmFjZSBBd3NBdXRoUmVzb2x2ZWRDb25maWcge1xuICBjcmVkZW50aWFsczogUHJvdmlkZXI8Q3JlZGVudGlhbHM+O1xuICBzaWduZXI6IFByb3ZpZGVyPFJlcXVlc3RTaWduZXI+O1xuICBzaWduaW5nRXNjYXBlUGF0aDogYm9vbGVhbjtcbiAgc3lzdGVtQ2xvY2tPZmZzZXQ6IG51bWJlcjtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlQXdzQXV0aENvbmZpZzxUPihpbnB1dDogVCAmIEF3c0F1dGhJbnB1dENvbmZpZyAmIFByZXZpb3VzbHlSZXNvbHZlZCk6IFQgJiBBd3NBdXRoUmVzb2x2ZWRDb25maWcge1xuICBjb25zdCBjcmVkZW50aWFscyA9IGlucHV0LmNyZWRlbnRpYWxzIHx8IGlucHV0LmNyZWRlbnRpYWxEZWZhdWx0UHJvdmlkZXIoaW5wdXQgYXMgYW55KTtcbiAgY29uc3Qgbm9ybWFsaXplZENyZWRzID0gbm9ybWFsaXplUHJvdmlkZXIoY3JlZGVudGlhbHMpO1xuICBjb25zdCB7IHNpZ25pbmdFc2NhcGVQYXRoID0gdHJ1ZSwgc3lzdGVtQ2xvY2tPZmZzZXQgPSBpbnB1dC5zeXN0ZW1DbG9ja09mZnNldCB8fCAwLCBzaGEyNTYgfSA9IGlucHV0O1xuICBsZXQgc2lnbmVyOiBQcm92aWRlcjxSZXF1ZXN0U2lnbmVyPjtcbiAgaWYgKGlucHV0LnNpZ25lcikge1xuICAgIC8vaWYgc2lnbmVyIGlzIHN1cHBsaWVkIGJ5IHVzZXIsIG5vcm1hbGl6ZSBpdCB0byBhIGZ1bmN0aW9uIHJldHVybmluZyBhIHByb21pc2UgZm9yIHNpZ25lci5cbiAgICBzaWduZXIgPSBub3JtYWxpemVQcm92aWRlcihpbnB1dC5zaWduZXIpO1xuICB9IGVsc2Uge1xuICAgIC8vY29uc3RydWN0IGEgcHJvdmlkZXIgaW5mZXJyaW5nIHNpZ25pbmcgZnJvbSByZWdpb24uXG4gICAgc2lnbmVyID0gKCkgPT5cbiAgICAgIG5vcm1hbGl6ZVByb3ZpZGVyKGlucHV0LnJlZ2lvbikoKVxuICAgICAgICAudGhlbihhc3luYyAocmVnaW9uKSA9PiBbKGF3YWl0IGlucHV0LnJlZ2lvbkluZm9Qcm92aWRlcihyZWdpb24pKSB8fCB7fSwgcmVnaW9uXSBhcyBbUmVnaW9uSW5mbywgc3RyaW5nXSlcbiAgICAgICAgLnRoZW4oKFtyZWdpb25JbmZvLCByZWdpb25dKSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBzaWduaW5nUmVnaW9uLCBzaWduaW5nU2VydmljZSB9ID0gcmVnaW9uSW5mbztcbiAgICAgICAgICAvL3VwZGF0ZSBjbGllbnQncyBzaW5naW5nIHJlZ2lvbiBhbmQgc2lnbmluZyBzZXJ2aWNlIGNvbmZpZyBpZiB0aGV5IGFyZSByZXNvbHZlZC5cbiAgICAgICAgICAvL3NpZ25pbmcgcmVnaW9uIHJlc29sdmluZyBvcmRlcjogdXNlciBzdXBwbGllZCBzaWduaW5nUmVnaW9uIC0+IGVuZHBvaW50cy5qc29uIGluZmVycmVkIHJlZ2lvbiAtPiBjbGllbnQgcmVnaW9uXG4gICAgICAgICAgaW5wdXQuc2lnbmluZ1JlZ2lvbiA9IGlucHV0LnNpZ25pbmdSZWdpb24gfHwgc2lnbmluZ1JlZ2lvbiB8fCByZWdpb247XG4gICAgICAgICAgLy9zaWduaW5nIG5hbWUgcmVzb2x2aW5nIG9yZGVyOlxuICAgICAgICAgIC8vdXNlciBzdXBwbGllZCBzaWduaW5nTmFtZSAtPiBlbmRwb2ludHMuanNvbiBpbmZlcnJlZCAoY3JlZGVudGlhbCBzY29wZSAtPiBtb2RlbCBhcm5OYW1lc3BhY2UpIC0+IG1vZGVsIHNlcnZpY2UgaWRcbiAgICAgICAgICBpbnB1dC5zaWduaW5nTmFtZSA9IGlucHV0LnNpZ25pbmdOYW1lIHx8IHNpZ25pbmdTZXJ2aWNlIHx8IGlucHV0LnNlcnZpY2VJZDtcblxuICAgICAgICAgIHJldHVybiBuZXcgU2lnbmF0dXJlVjQoe1xuICAgICAgICAgICAgY3JlZGVudGlhbHM6IG5vcm1hbGl6ZWRDcmVkcyxcbiAgICAgICAgICAgIHJlZ2lvbjogaW5wdXQuc2lnbmluZ1JlZ2lvbixcbiAgICAgICAgICAgIHNlcnZpY2U6IGlucHV0LnNpZ25pbmdOYW1lLFxuICAgICAgICAgICAgc2hhMjU2LFxuICAgICAgICAgICAgdXJpRXNjYXBlUGF0aDogc2lnbmluZ0VzY2FwZVBhdGgsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5pbnB1dCxcbiAgICBzeXN0ZW1DbG9ja09mZnNldCxcbiAgICBzaWduaW5nRXNjYXBlUGF0aCxcbiAgICBjcmVkZW50aWFsczogbm9ybWFsaXplZENyZWRzLFxuICAgIHNpZ25lcixcbiAgfTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplUHJvdmlkZXI8VD4oaW5wdXQ6IFQgfCBQcm92aWRlcjxUPik6IFByb3ZpZGVyPFQ+IHtcbiAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gXCJvYmplY3RcIikge1xuICAgIGNvbnN0IHByb21pc2lmaWVkID0gUHJvbWlzZS5yZXNvbHZlKGlucHV0KTtcbiAgICByZXR1cm4gKCkgPT4gcHJvbWlzaWZpZWQ7XG4gIH1cbiAgcmV0dXJuIGlucHV0IGFzIFByb3ZpZGVyPFQ+O1xufVxuIl19