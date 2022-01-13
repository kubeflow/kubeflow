import { __assign, __awaiter, __generator } from "tslib";
export var serializerMiddleware = function (options, serializer) { return function (next, context) { return function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var request;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, serializer(args.input, options)];
            case 1:
                request = _a.sent();
                return [2 /*return*/, next(__assign(__assign({}, args), { request: request }))];
        }
    });
}); }; }; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplck1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VyaWFsaXplck1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVVBLE1BQU0sQ0FBQyxJQUFNLG9CQUFvQixHQUFHLFVBQ2xDLE9BQXFCLEVBQ3JCLFVBQWdELElBQ1QsT0FBQSxVQUN2QyxJQUFxQyxFQUNyQyxPQUFnQyxJQUNJLE9BQUEsVUFDcEMsSUFBc0M7Ozs7b0JBRXRCLHFCQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUFBOztnQkFBL0MsT0FBTyxHQUFHLFNBQXFDO2dCQUNyRCxzQkFBTyxJQUFJLHVCQUNOLElBQUksS0FDUCxPQUFPLFNBQUEsSUFDUCxFQUFDOzs7S0FDSixFQVJxQyxDQVFyQyxFQVh3QyxDQVd4QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRW5kcG9pbnRCZWFyZXIsXG4gIEhhbmRsZXJFeGVjdXRpb25Db250ZXh0LFxuICBSZXF1ZXN0U2VyaWFsaXplcixcbiAgU2VyaWFsaXplSGFuZGxlcixcbiAgU2VyaWFsaXplSGFuZGxlckFyZ3VtZW50cyxcbiAgU2VyaWFsaXplSGFuZGxlck91dHB1dCxcbiAgU2VyaWFsaXplTWlkZGxld2FyZSxcbn0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBzZXJpYWxpemVyTWlkZGxld2FyZSA9IDxJbnB1dCBleHRlbmRzIG9iamVjdCwgT3V0cHV0IGV4dGVuZHMgb2JqZWN0LCBSdW50aW1lVXRpbHMgZXh0ZW5kcyBFbmRwb2ludEJlYXJlcj4oXG4gIG9wdGlvbnM6IFJ1bnRpbWVVdGlscyxcbiAgc2VyaWFsaXplcjogUmVxdWVzdFNlcmlhbGl6ZXI8YW55LCBSdW50aW1lVXRpbHM+XG4pOiBTZXJpYWxpemVNaWRkbGV3YXJlPElucHV0LCBPdXRwdXQ+ID0+IChcbiAgbmV4dDogU2VyaWFsaXplSGFuZGxlcjxJbnB1dCwgT3V0cHV0PixcbiAgY29udGV4dDogSGFuZGxlckV4ZWN1dGlvbkNvbnRleHRcbik6IFNlcmlhbGl6ZUhhbmRsZXI8SW5wdXQsIE91dHB1dD4gPT4gYXN5bmMgKFxuICBhcmdzOiBTZXJpYWxpemVIYW5kbGVyQXJndW1lbnRzPElucHV0PlxuKTogUHJvbWlzZTxTZXJpYWxpemVIYW5kbGVyT3V0cHV0PE91dHB1dD4+ID0+IHtcbiAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IHNlcmlhbGl6ZXIoYXJncy5pbnB1dCwgb3B0aW9ucyk7XG4gIHJldHVybiBuZXh0KHtcbiAgICAuLi5hcmdzLFxuICAgIHJlcXVlc3QsXG4gIH0pO1xufTtcbiJdfQ==