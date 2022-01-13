import { __awaiter, __generator } from "tslib";
export var deserializerMiddleware = function (options, deserializer) { return function (next, context) { return function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var response, parsed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, next(args)];
            case 1:
                response = (_a.sent()).response;
                return [4 /*yield*/, deserializer(response, options)];
            case 2:
                parsed = _a.sent();
                return [2 /*return*/, {
                        response: response,
                        output: parsed,
                    }];
        }
    });
}); }; }; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzZXJpYWxpemVyTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZXNlcmlhbGl6ZXJNaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFTQSxNQUFNLENBQUMsSUFBTSxzQkFBc0IsR0FBRyxVQUNwQyxPQUFxQixFQUNyQixZQUEwRCxJQUNqQixPQUFBLFVBQ3pDLElBQXVDLEVBQ3ZDLE9BQWdDLElBQ00sT0FBQSxVQUN0QyxJQUF3Qzs7OztvQkFFbkIscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFBOztnQkFBN0IsUUFBUSxHQUFLLENBQUEsU0FBZ0IsQ0FBQSxTQUFyQjtnQkFDRCxxQkFBTSxZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFBOztnQkFBOUMsTUFBTSxHQUFHLFNBQXFDO2dCQUNwRCxzQkFBTzt3QkFDTCxRQUFRLFVBQUE7d0JBQ1IsTUFBTSxFQUFFLE1BQWdCO3FCQUN6QixFQUFDOzs7S0FDSCxFQVR1QyxDQVN2QyxFQVowQyxDQVkxQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGVzZXJpYWxpemVIYW5kbGVyLFxuICBEZXNlcmlhbGl6ZUhhbmRsZXJBcmd1bWVudHMsXG4gIERlc2VyaWFsaXplSGFuZGxlck91dHB1dCxcbiAgRGVzZXJpYWxpemVNaWRkbGV3YXJlLFxuICBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dCxcbiAgUmVzcG9uc2VEZXNlcmlhbGl6ZXIsXG59IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgZGVzZXJpYWxpemVyTWlkZGxld2FyZSA9IDxJbnB1dCBleHRlbmRzIG9iamVjdCwgT3V0cHV0IGV4dGVuZHMgb2JqZWN0LCBSdW50aW1lVXRpbHMgPSBhbnk+KFxuICBvcHRpb25zOiBSdW50aW1lVXRpbHMsXG4gIGRlc2VyaWFsaXplcjogUmVzcG9uc2VEZXNlcmlhbGl6ZXI8YW55LCBhbnksIFJ1bnRpbWVVdGlscz5cbik6IERlc2VyaWFsaXplTWlkZGxld2FyZTxJbnB1dCwgT3V0cHV0PiA9PiAoXG4gIG5leHQ6IERlc2VyaWFsaXplSGFuZGxlcjxJbnB1dCwgT3V0cHV0PixcbiAgY29udGV4dDogSGFuZGxlckV4ZWN1dGlvbkNvbnRleHRcbik6IERlc2VyaWFsaXplSGFuZGxlcjxJbnB1dCwgT3V0cHV0PiA9PiBhc3luYyAoXG4gIGFyZ3M6IERlc2VyaWFsaXplSGFuZGxlckFyZ3VtZW50czxJbnB1dD5cbik6IFByb21pc2U8RGVzZXJpYWxpemVIYW5kbGVyT3V0cHV0PE91dHB1dD4+ID0+IHtcbiAgY29uc3QgeyByZXNwb25zZSB9ID0gYXdhaXQgbmV4dChhcmdzKTtcbiAgY29uc3QgcGFyc2VkID0gYXdhaXQgZGVzZXJpYWxpemVyKHJlc3BvbnNlLCBvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICByZXNwb25zZSxcbiAgICBvdXRwdXQ6IHBhcnNlZCBhcyBPdXRwdXQsXG4gIH07XG59O1xuIl19