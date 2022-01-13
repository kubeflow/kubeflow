import { __awaiter, __generator } from "tslib";
export function createRequest(client, command) {
    return __awaiter(this, void 0, void 0, function () {
        var interceptMiddleware, clientStack, handler;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    interceptMiddleware = function (next) { return function (args) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, { output: { request: args.request }, response: undefined }];
                        });
                    }); }; };
                    clientStack = client.middlewareStack.clone();
                    // @ts-ignore: add middleware to the last of 'build' step
                    clientStack.add(interceptMiddleware, {
                        step: "build",
                        priority: "low",
                    });
                    handler = command.resolveMiddleware(clientStack, client.config, undefined);
                    return [4 /*yield*/, handler(command).then(function (output) { return output.output.request; })];
                case 1: 
                // @ts-ignore
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE1BQU0sVUFBZ0IsYUFBYSxDQUtqQyxNQUF5RCxFQUN6RCxPQUE2RTs7Ozs7OztvQkFHdkUsbUJBQW1CLEdBQTJDLFVBQUMsSUFBSSxJQUFLLE9BQUEsVUFBTyxJQUFJOzs0QkFDdkYsc0JBQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsRUFBQzs7eUJBQzFFLEVBRjZFLENBRTdFLENBQUM7b0JBQ0ksV0FBVyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRW5ELHlEQUF5RDtvQkFDekQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRTt3QkFDbkMsSUFBSSxFQUFFLE9BQU87d0JBQ2IsUUFBUSxFQUFFLEtBQUs7cUJBQ2hCLENBQUMsQ0FBQztvQkFFRyxPQUFPLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUcxRSxxQkFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQXJCLENBQXFCLENBQUMsRUFBQTs7Z0JBRHJFLGFBQWE7Z0JBQ2Isc0JBQU8sU0FBOEQsRUFBQzs7OztDQUN2RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsaWVudCwgQ29tbWFuZCB9IGZyb20gXCJAYXdzLXNkay9zbWl0aHktY2xpZW50XCI7XG5pbXBvcnQgeyBCdWlsZE1pZGRsZXdhcmUsIEh0dHBSZXF1ZXN0LCBNZXRhZGF0YUJlYXJlciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlUmVxdWVzdDxcbiAgSW5wdXRUeXBlc1VuaW9uIGV4dGVuZHMgb2JqZWN0LFxuICBJbnB1dFR5cGUgZXh0ZW5kcyBJbnB1dFR5cGVzVW5pb24sXG4gIE91dHB1dFR5cGUgZXh0ZW5kcyBNZXRhZGF0YUJlYXJlciA9IE1ldGFkYXRhQmVhcmVyXG4+KFxuICBjbGllbnQ6IENsaWVudDxhbnksIElucHV0VHlwZXNVbmlvbiwgTWV0YWRhdGFCZWFyZXIsIGFueT4sXG4gIGNvbW1hbmQ6IENvbW1hbmQ8SW5wdXRUeXBlLCBPdXRwdXRUeXBlLCBhbnksIElucHV0VHlwZXNVbmlvbiwgTWV0YWRhdGFCZWFyZXI+XG4pOiBQcm9taXNlPEh0dHBSZXF1ZXN0PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgY29uc3QgaW50ZXJjZXB0TWlkZGxld2FyZTogQnVpbGRNaWRkbGV3YXJlPElucHV0VHlwZSwgT3V0cHV0VHlwZT4gPSAobmV4dCkgPT4gYXN5bmMgKGFyZ3MpID0+IHtcbiAgICByZXR1cm4geyBvdXRwdXQ6IHsgcmVxdWVzdDogYXJncy5yZXF1ZXN0IH0gYXMgYW55LCByZXNwb25zZTogdW5kZWZpbmVkIH07XG4gIH07XG4gIGNvbnN0IGNsaWVudFN0YWNrID0gY2xpZW50Lm1pZGRsZXdhcmVTdGFjay5jbG9uZSgpO1xuXG4gIC8vIEB0cy1pZ25vcmU6IGFkZCBtaWRkbGV3YXJlIHRvIHRoZSBsYXN0IG9mICdidWlsZCcgc3RlcFxuICBjbGllbnRTdGFjay5hZGQoaW50ZXJjZXB0TWlkZGxld2FyZSwge1xuICAgIHN0ZXA6IFwiYnVpbGRcIixcbiAgICBwcmlvcml0eTogXCJsb3dcIixcbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlciA9IGNvbW1hbmQucmVzb2x2ZU1pZGRsZXdhcmUoY2xpZW50U3RhY2ssIGNsaWVudC5jb25maWcsIHVuZGVmaW5lZCk7XG5cbiAgLy8gQHRzLWlnbm9yZVxuICByZXR1cm4gYXdhaXQgaGFuZGxlcihjb21tYW5kKS50aGVuKChvdXRwdXQpID0+IG91dHB1dC5vdXRwdXQucmVxdWVzdCk7XG59XG4iXX0=