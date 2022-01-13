import { __assign, __awaiter, __generator } from "tslib";
import { HttpRequest } from "@aws-sdk/protocol-http";
var isClockSkewed = function (newServerTime, systemClockOffset) {
    return Math.abs(getSkewCorrectedDate(systemClockOffset).getTime() - newServerTime) >= 300000;
};
var getSkewCorrectedDate = function (systemClockOffset) { return new Date(Date.now() + systemClockOffset); };
export function awsAuthMiddleware(options) {
    return function (next, context) {
        return function (args) {
            return __awaiter(this, void 0, void 0, function () {
                var signer, _a, output, _b, _c, headers, dateHeader, serverTime;
                var _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (!HttpRequest.isInstance(args.request))
                                return [2 /*return*/, next(args)];
                            if (!(typeof options.signer === "function")) return [3 /*break*/, 2];
                            return [4 /*yield*/, options.signer()];
                        case 1:
                            _a = _e.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = options.signer;
                            _e.label = 3;
                        case 3:
                            signer = _a;
                            _b = next;
                            _c = [__assign({}, args)];
                            _d = {};
                            return [4 /*yield*/, signer.sign(args.request, {
                                    signingDate: new Date(Date.now() + options.systemClockOffset),
                                    signingRegion: context["signing_region"],
                                    signingService: context["signing_service"],
                                })];
                        case 4: return [4 /*yield*/, _b.apply(void 0, [__assign.apply(void 0, _c.concat([(_d.request = _e.sent(), _d)]))])];
                        case 5:
                            output = _e.sent();
                            headers = output.response.headers;
                            dateHeader = headers && (headers.date || headers.Date);
                            if (dateHeader) {
                                serverTime = Date.parse(dateHeader);
                                if (isClockSkewed(serverTime, options.systemClockOffset)) {
                                    options.systemClockOffset = serverTime - Date.now();
                                }
                            }
                            return [2 /*return*/, output];
                    }
                });
            });
        };
    };
}
export var awsAuthMiddlewareOptions = {
    name: "awsAuthMiddleware",
    tags: ["SIGNATURE", "AWSAUTH"],
    relation: "after",
    toMiddleware: "retryMiddleware",
    override: true,
};
export var getAwsAuthPlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.addRelativeTo(awsAuthMiddleware(options), awsAuthMiddlewareOptions);
    },
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFhckQsSUFBTSxhQUFhLEdBQUcsVUFBQyxhQUFxQixFQUFFLGlCQUF5QjtJQUNyRSxPQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxhQUFhLENBQUMsSUFBSSxNQUFNO0FBQXJGLENBQXFGLENBQUM7QUFFeEYsSUFBTSxvQkFBb0IsR0FBRyxVQUFDLGlCQUF5QixJQUFLLE9BQUEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLGlCQUFpQixDQUFDLEVBQXhDLENBQXdDLENBQUM7QUFFckcsTUFBTSxVQUFVLGlCQUFpQixDQUMvQixPQUE4QjtJQUU5QixPQUFPLFVBQUMsSUFBb0MsRUFBRSxPQUFnQztRQUM1RSxPQUFBLFVBQWdCLElBQXFDOzs7Ozs7OzRCQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUFFLHNCQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztpQ0FDOUMsQ0FBQSxPQUFPLE9BQU8sQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFBLEVBQXBDLHdCQUFvQzs0QkFBRyxxQkFBTSxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUE7OzRCQUF0QixLQUFBLFNBQXNCLENBQUE7Ozs0QkFBRyxLQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUE7Ozs0QkFBdkYsTUFBTSxLQUFpRjs0QkFDeEUsS0FBQSxJQUFJLENBQUE7K0NBQ3BCLElBQUk7OzRCQUNFLHFCQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQ0FDdkMsV0FBVyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7b0NBQzdELGFBQWEsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLENBQUM7b0NBQ3hDLGNBQWMsRUFBRSxPQUFPLENBQUMsaUJBQWlCLENBQUM7aUNBQzNDLENBQUMsRUFBQTtnQ0FOVyxxQkFBTSxxREFFbkIsVUFBTyxHQUFFLFNBSVAsVUFDRixFQUFBOzs0QkFQSSxNQUFNLEdBQUcsU0FPYjs0QkFFTSxPQUFPLEdBQUssTUFBTSxDQUFDLFFBQWUsUUFBM0IsQ0FBNEI7NEJBQ3JDLFVBQVUsR0FBRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDN0QsSUFBSSxVQUFVLEVBQUU7Z0NBQ1IsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Z0NBQzFDLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRTtvQ0FDeEQsT0FBTyxDQUFDLGlCQUFpQixHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7aUNBQ3JEOzZCQUNGOzRCQUVELHNCQUFPLE1BQU0sRUFBQzs7OztTQUNmO0lBdEJELENBc0JDLENBQUM7QUFDTixDQUFDO0FBRUQsTUFBTSxDQUFDLElBQU0sd0JBQXdCLEdBQThCO0lBQ2pFLElBQUksRUFBRSxtQkFBbUI7SUFDekIsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQztJQUM5QixRQUFRLEVBQUUsT0FBTztJQUNqQixZQUFZLEVBQUUsaUJBQWlCO0lBQy9CLFFBQVEsRUFBRSxJQUFJO0NBQ2YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLGdCQUFnQixHQUFHLFVBQUMsT0FBOEIsSUFBMEIsT0FBQSxDQUFDO0lBQ3hGLFlBQVksRUFBRSxVQUFDLFdBQVc7UUFDeEIsV0FBVyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7Q0FDRixDQUFDLEVBSnVGLENBSXZGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVxdWVzdCB9IGZyb20gXCJAYXdzLXNkay9wcm90b2NvbC1odHRwXCI7XG5pbXBvcnQge1xuICBGaW5hbGl6ZUhhbmRsZXIsXG4gIEZpbmFsaXplSGFuZGxlckFyZ3VtZW50cyxcbiAgRmluYWxpemVIYW5kbGVyT3V0cHV0LFxuICBGaW5hbGl6ZVJlcXVlc3RNaWRkbGV3YXJlLFxuICBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dCxcbiAgUGx1Z2dhYmxlLFxuICBSZWxhdGl2ZU1pZGRsZXdhcmVPcHRpb25zLFxufSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuaW1wb3J0IHsgQXdzQXV0aFJlc29sdmVkQ29uZmlnIH0gZnJvbSBcIi4vY29uZmlndXJhdGlvbnNcIjtcblxuY29uc3QgaXNDbG9ja1NrZXdlZCA9IChuZXdTZXJ2ZXJUaW1lOiBudW1iZXIsIHN5c3RlbUNsb2NrT2Zmc2V0OiBudW1iZXIpID0+XG4gIE1hdGguYWJzKGdldFNrZXdDb3JyZWN0ZWREYXRlKHN5c3RlbUNsb2NrT2Zmc2V0KS5nZXRUaW1lKCkgLSBuZXdTZXJ2ZXJUaW1lKSA+PSAzMDAwMDA7XG5cbmNvbnN0IGdldFNrZXdDb3JyZWN0ZWREYXRlID0gKHN5c3RlbUNsb2NrT2Zmc2V0OiBudW1iZXIpID0+IG5ldyBEYXRlKERhdGUubm93KCkgKyBzeXN0ZW1DbG9ja09mZnNldCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhd3NBdXRoTWlkZGxld2FyZTxJbnB1dCBleHRlbmRzIG9iamVjdCwgT3V0cHV0IGV4dGVuZHMgb2JqZWN0PihcbiAgb3B0aW9uczogQXdzQXV0aFJlc29sdmVkQ29uZmlnXG4pOiBGaW5hbGl6ZVJlcXVlc3RNaWRkbGV3YXJlPElucHV0LCBPdXRwdXQ+IHtcbiAgcmV0dXJuIChuZXh0OiBGaW5hbGl6ZUhhbmRsZXI8SW5wdXQsIE91dHB1dD4sIGNvbnRleHQ6IEhhbmRsZXJFeGVjdXRpb25Db250ZXh0KTogRmluYWxpemVIYW5kbGVyPElucHV0LCBPdXRwdXQ+ID0+XG4gICAgYXN5bmMgZnVuY3Rpb24gKGFyZ3M6IEZpbmFsaXplSGFuZGxlckFyZ3VtZW50czxJbnB1dD4pOiBQcm9taXNlPEZpbmFsaXplSGFuZGxlck91dHB1dDxPdXRwdXQ+PiB7XG4gICAgICBpZiAoIUh0dHBSZXF1ZXN0LmlzSW5zdGFuY2UoYXJncy5yZXF1ZXN0KSkgcmV0dXJuIG5leHQoYXJncyk7XG4gICAgICBjb25zdCBzaWduZXIgPSB0eXBlb2Ygb3B0aW9ucy5zaWduZXIgPT09IFwiZnVuY3Rpb25cIiA/IGF3YWl0IG9wdGlvbnMuc2lnbmVyKCkgOiBvcHRpb25zLnNpZ25lcjtcbiAgICAgIGNvbnN0IG91dHB1dCA9IGF3YWl0IG5leHQoe1xuICAgICAgICAuLi5hcmdzLFxuICAgICAgICByZXF1ZXN0OiBhd2FpdCBzaWduZXIuc2lnbihhcmdzLnJlcXVlc3QsIHtcbiAgICAgICAgICBzaWduaW5nRGF0ZTogbmV3IERhdGUoRGF0ZS5ub3coKSArIG9wdGlvbnMuc3lzdGVtQ2xvY2tPZmZzZXQpLFxuICAgICAgICAgIHNpZ25pbmdSZWdpb246IGNvbnRleHRbXCJzaWduaW5nX3JlZ2lvblwiXSxcbiAgICAgICAgICBzaWduaW5nU2VydmljZTogY29udGV4dFtcInNpZ25pbmdfc2VydmljZVwiXSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgeyBoZWFkZXJzIH0gPSBvdXRwdXQucmVzcG9uc2UgYXMgYW55O1xuICAgICAgY29uc3QgZGF0ZUhlYWRlciA9IGhlYWRlcnMgJiYgKGhlYWRlcnMuZGF0ZSB8fCBoZWFkZXJzLkRhdGUpO1xuICAgICAgaWYgKGRhdGVIZWFkZXIpIHtcbiAgICAgICAgY29uc3Qgc2VydmVyVGltZSA9IERhdGUucGFyc2UoZGF0ZUhlYWRlcik7XG4gICAgICAgIGlmIChpc0Nsb2NrU2tld2VkKHNlcnZlclRpbWUsIG9wdGlvbnMuc3lzdGVtQ2xvY2tPZmZzZXQpKSB7XG4gICAgICAgICAgb3B0aW9ucy5zeXN0ZW1DbG9ja09mZnNldCA9IHNlcnZlclRpbWUgLSBEYXRlLm5vdygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGF3c0F1dGhNaWRkbGV3YXJlT3B0aW9uczogUmVsYXRpdmVNaWRkbGV3YXJlT3B0aW9ucyA9IHtcbiAgbmFtZTogXCJhd3NBdXRoTWlkZGxld2FyZVwiLFxuICB0YWdzOiBbXCJTSUdOQVRVUkVcIiwgXCJBV1NBVVRIXCJdLFxuICByZWxhdGlvbjogXCJhZnRlclwiLFxuICB0b01pZGRsZXdhcmU6IFwicmV0cnlNaWRkbGV3YXJlXCIsXG4gIG92ZXJyaWRlOiB0cnVlLFxufTtcblxuZXhwb3J0IGNvbnN0IGdldEF3c0F1dGhQbHVnaW4gPSAob3B0aW9uczogQXdzQXV0aFJlc29sdmVkQ29uZmlnKTogUGx1Z2dhYmxlPGFueSwgYW55PiA9PiAoe1xuICBhcHBseVRvU3RhY2s6IChjbGllbnRTdGFjaykgPT4ge1xuICAgIGNsaWVudFN0YWNrLmFkZFJlbGF0aXZlVG8oYXdzQXV0aE1pZGRsZXdhcmUob3B0aW9ucyksIGF3c0F1dGhNaWRkbGV3YXJlT3B0aW9ucyk7XG4gIH0sXG59KTtcbiJdfQ==