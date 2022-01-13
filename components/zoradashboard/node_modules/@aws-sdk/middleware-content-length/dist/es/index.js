import { __assign, __awaiter, __generator } from "tslib";
import { HttpRequest } from "@aws-sdk/protocol-http";
var CONTENT_LENGTH_HEADER = "content-length";
export function contentLengthMiddleware(bodyLengthChecker) {
    var _this = this;
    return function (next) { return function (args) { return __awaiter(_this, void 0, void 0, function () {
        var request, body, headers, length;
        var _a;
        return __generator(this, function (_b) {
            request = args.request;
            if (HttpRequest.isInstance(request)) {
                body = request.body, headers = request.headers;
                if (body &&
                    Object.keys(headers)
                        .map(function (str) { return str.toLowerCase(); })
                        .indexOf(CONTENT_LENGTH_HEADER) === -1) {
                    length = bodyLengthChecker(body);
                    if (length !== undefined) {
                        request.headers = __assign(__assign({}, request.headers), (_a = {}, _a[CONTENT_LENGTH_HEADER] = String(length), _a));
                    }
                }
            }
            return [2 /*return*/, next(__assign(__assign({}, args), { request: request }))];
        });
    }); }; };
}
export var contentLengthMiddlewareOptions = {
    step: "build",
    tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
    name: "contentLengthMiddleware",
    override: true,
};
export var getContentLengthPlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
    },
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQVlyRCxJQUFNLHFCQUFxQixHQUFHLGdCQUFnQixDQUFDO0FBRS9DLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxpQkFBdUM7SUFBL0UsaUJBNEJDO0lBM0JDLE9BQU8sVUFBZ0MsSUFBK0IsSUFBZ0MsT0FBQSxVQUNwRyxJQUFnQzs7OztZQUUxQixPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUM3QixJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksR0FBYyxPQUFPLEtBQXJCLEVBQUUsT0FBTyxHQUFLLE9BQU8sUUFBWixDQUFhO2dCQUNsQyxJQUNFLElBQUk7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ2pCLEdBQUcsQ0FBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQzt5QkFDL0IsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ3hDO29CQUNNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO3dCQUN4QixPQUFPLENBQUMsT0FBTyx5QkFDVixPQUFPLENBQUMsT0FBTyxnQkFDakIscUJBQXFCLElBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUN4QyxDQUFDO3FCQUNIO2lCQUNGO2FBQ0Y7WUFFRCxzQkFBTyxJQUFJLHVCQUNOLElBQUksS0FDUCxPQUFPLFNBQUEsSUFDUCxFQUFDOztTQUNKLEVBMUJxRyxDQTBCckcsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLENBQUMsSUFBTSw4QkFBOEIsR0FBd0I7SUFDakUsSUFBSSxFQUFFLE9BQU87SUFDYixJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQztJQUM5QyxJQUFJLEVBQUUseUJBQXlCO0lBQy9CLFFBQVEsRUFBRSxJQUFJO0NBQ2YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLHNCQUFzQixHQUFHLFVBQUMsT0FBb0QsSUFBMEIsT0FBQSxDQUFDO0lBQ3BILFlBQVksRUFBRSxVQUFDLFdBQVc7UUFDeEIsV0FBVyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0lBQ3RHLENBQUM7Q0FDRixDQUFDLEVBSm1ILENBSW5ILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVxdWVzdCB9IGZyb20gXCJAYXdzLXNkay9wcm90b2NvbC1odHRwXCI7XG5pbXBvcnQge1xuICBCb2R5TGVuZ3RoQ2FsY3VsYXRvcixcbiAgQnVpbGRIYW5kbGVyLFxuICBCdWlsZEhhbmRsZXJBcmd1bWVudHMsXG4gIEJ1aWxkSGFuZGxlck9wdGlvbnMsXG4gIEJ1aWxkSGFuZGxlck91dHB1dCxcbiAgQnVpbGRNaWRkbGV3YXJlLFxuICBNZXRhZGF0YUJlYXJlcixcbiAgUGx1Z2dhYmxlLFxufSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuY29uc3QgQ09OVEVOVF9MRU5HVEhfSEVBREVSID0gXCJjb250ZW50LWxlbmd0aFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udGVudExlbmd0aE1pZGRsZXdhcmUoYm9keUxlbmd0aENoZWNrZXI6IEJvZHlMZW5ndGhDYWxjdWxhdG9yKTogQnVpbGRNaWRkbGV3YXJlPGFueSwgYW55PiB7XG4gIHJldHVybiA8T3V0cHV0IGV4dGVuZHMgTWV0YWRhdGFCZWFyZXI+KG5leHQ6IEJ1aWxkSGFuZGxlcjxhbnksIE91dHB1dD4pOiBCdWlsZEhhbmRsZXI8YW55LCBPdXRwdXQ+ID0+IGFzeW5jIChcbiAgICBhcmdzOiBCdWlsZEhhbmRsZXJBcmd1bWVudHM8YW55PlxuICApOiBQcm9taXNlPEJ1aWxkSGFuZGxlck91dHB1dDxPdXRwdXQ+PiA9PiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGFyZ3MucmVxdWVzdDtcbiAgICBpZiAoSHR0cFJlcXVlc3QuaXNJbnN0YW5jZShyZXF1ZXN0KSkge1xuICAgICAgY29uc3QgeyBib2R5LCBoZWFkZXJzIH0gPSByZXF1ZXN0O1xuICAgICAgaWYgKFxuICAgICAgICBib2R5ICYmXG4gICAgICAgIE9iamVjdC5rZXlzKGhlYWRlcnMpXG4gICAgICAgICAgLm1hcCgoc3RyKSA9PiBzdHIudG9Mb3dlckNhc2UoKSlcbiAgICAgICAgICAuaW5kZXhPZihDT05URU5UX0xFTkdUSF9IRUFERVIpID09PSAtMVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IGJvZHlMZW5ndGhDaGVja2VyKGJvZHkpO1xuICAgICAgICBpZiAobGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMgPSB7XG4gICAgICAgICAgICAuLi5yZXF1ZXN0LmhlYWRlcnMsXG4gICAgICAgICAgICBbQ09OVEVOVF9MRU5HVEhfSEVBREVSXTogU3RyaW5nKGxlbmd0aCksXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXh0KHtcbiAgICAgIC4uLmFyZ3MsXG4gICAgICByZXF1ZXN0LFxuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgY29uc3QgY29udGVudExlbmd0aE1pZGRsZXdhcmVPcHRpb25zOiBCdWlsZEhhbmRsZXJPcHRpb25zID0ge1xuICBzdGVwOiBcImJ1aWxkXCIsXG4gIHRhZ3M6IFtcIlNFVF9DT05URU5UX0xFTkdUSFwiLCBcIkNPTlRFTlRfTEVOR1RIXCJdLFxuICBuYW1lOiBcImNvbnRlbnRMZW5ndGhNaWRkbGV3YXJlXCIsXG4gIG92ZXJyaWRlOiB0cnVlLFxufTtcblxuZXhwb3J0IGNvbnN0IGdldENvbnRlbnRMZW5ndGhQbHVnaW4gPSAob3B0aW9uczogeyBib2R5TGVuZ3RoQ2hlY2tlcjogQm9keUxlbmd0aENhbGN1bGF0b3IgfSk6IFBsdWdnYWJsZTxhbnksIGFueT4gPT4gKHtcbiAgYXBwbHlUb1N0YWNrOiAoY2xpZW50U3RhY2spID0+IHtcbiAgICBjbGllbnRTdGFjay5hZGQoY29udGVudExlbmd0aE1pZGRsZXdhcmUob3B0aW9ucy5ib2R5TGVuZ3RoQ2hlY2tlciksIGNvbnRlbnRMZW5ndGhNaWRkbGV3YXJlT3B0aW9ucyk7XG4gIH0sXG59KTtcbiJdfQ==