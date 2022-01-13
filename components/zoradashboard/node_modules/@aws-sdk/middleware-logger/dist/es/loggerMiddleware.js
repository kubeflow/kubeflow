import { __awaiter, __generator, __rest } from "tslib";
export var loggerMiddleware = function () { return function (next, context) { return function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var clientName, commandName, inputFilterSensitiveLog, logger, outputFilterSensitiveLog, response, _a, $metadata, outputWithoutMetadata;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                clientName = context.clientName, commandName = context.commandName, inputFilterSensitiveLog = context.inputFilterSensitiveLog, logger = context.logger, outputFilterSensitiveLog = context.outputFilterSensitiveLog;
                return [4 /*yield*/, next(args)];
            case 1:
                response = _b.sent();
                if (!logger) {
                    return [2 /*return*/, response];
                }
                if (typeof logger.info === "function") {
                    _a = response.output, $metadata = _a.$metadata, outputWithoutMetadata = __rest(_a, ["$metadata"]);
                    logger.info({
                        clientName: clientName,
                        commandName: commandName,
                        input: inputFilterSensitiveLog(args.input),
                        output: outputFilterSensitiveLog(outputWithoutMetadata),
                        metadata: $metadata,
                    });
                }
                return [2 /*return*/, response];
        }
    });
}); }; }; };
export var loggerMiddlewareOptions = {
    name: "loggerMiddleware",
    tags: ["LOGGER"],
    step: "initialize",
    override: true,
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getLoggerPlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
    },
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dnZXJNaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFZQSxNQUFNLENBQUMsSUFBTSxnQkFBZ0IsR0FBRyxjQUFNLE9BQUEsVUFDcEMsSUFBb0MsRUFDcEMsT0FBZ0MsSUFDRyxPQUFBLFVBQ25DLElBQXFDOzs7OztnQkFFN0IsVUFBVSxHQUE2RSxPQUFPLFdBQXBGLEVBQUUsV0FBVyxHQUFnRSxPQUFPLFlBQXZFLEVBQUUsdUJBQXVCLEdBQXVDLE9BQU8sd0JBQTlDLEVBQUUsTUFBTSxHQUErQixPQUFPLE9BQXRDLEVBQUUsd0JBQXdCLEdBQUssT0FBTyx5QkFBWixDQUFhO2dCQUV0RixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUE7O2dCQUEzQixRQUFRLEdBQUcsU0FBZ0I7Z0JBRWpDLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1gsc0JBQU8sUUFBUSxFQUFDO2lCQUNqQjtnQkFFRCxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7b0JBQy9CLEtBQTBDLFFBQVEsQ0FBQyxNQUFNLEVBQXZELFNBQVMsZUFBQSxFQUFLLHFCQUFxQixjQUFyQyxhQUF1QyxDQUFGLENBQXFCO29CQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNWLFVBQVUsWUFBQTt3QkFDVixXQUFXLGFBQUE7d0JBQ1gsS0FBSyxFQUFFLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQzFDLE1BQU0sRUFBRSx3QkFBd0IsQ0FBQyxxQkFBcUIsQ0FBQzt3QkFDdkQsUUFBUSxFQUFFLFNBQVM7cUJBQ3BCLENBQUMsQ0FBQztpQkFDSjtnQkFFRCxzQkFBTyxRQUFRLEVBQUM7OztLQUNqQixFQXZCb0MsQ0F1QnBDLEVBMUJxQyxDQTBCckMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLHVCQUF1QixHQUFnRDtJQUNsRixJQUFJLEVBQUUsa0JBQWtCO0lBQ3hCLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUNoQixJQUFJLEVBQUUsWUFBWTtJQUNsQixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUM7QUFFRiw2REFBNkQ7QUFDN0QsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFHLFVBQUMsT0FBWSxJQUEwQixPQUFBLENBQUM7SUFDckUsWUFBWSxFQUFFLFVBQUMsV0FBVztRQUN4QixXQUFXLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0YsQ0FBQyxFQUpvRSxDQUlwRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3RvY29sLWh0dHBcIjtcbmltcG9ydCB7XG4gIEFic29sdXRlTG9jYXRpb24sXG4gIEhhbmRsZXJFeGVjdXRpb25Db250ZXh0LFxuICBJbml0aWFsaXplSGFuZGxlcixcbiAgSW5pdGlhbGl6ZUhhbmRsZXJBcmd1bWVudHMsXG4gIEluaXRpYWxpemVIYW5kbGVyT3B0aW9ucyxcbiAgSW5pdGlhbGl6ZUhhbmRsZXJPdXRwdXQsXG4gIE1ldGFkYXRhQmVhcmVyLFxuICBQbHVnZ2FibGUsXG59IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgbG9nZ2VyTWlkZGxld2FyZSA9ICgpID0+IDxPdXRwdXQgZXh0ZW5kcyBNZXRhZGF0YUJlYXJlciA9IE1ldGFkYXRhQmVhcmVyPihcbiAgbmV4dDogSW5pdGlhbGl6ZUhhbmRsZXI8YW55LCBPdXRwdXQ+LFxuICBjb250ZXh0OiBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dFxuKTogSW5pdGlhbGl6ZUhhbmRsZXI8YW55LCBPdXRwdXQ+ID0+IGFzeW5jIChcbiAgYXJnczogSW5pdGlhbGl6ZUhhbmRsZXJBcmd1bWVudHM8YW55PlxuKTogUHJvbWlzZTxJbml0aWFsaXplSGFuZGxlck91dHB1dDxPdXRwdXQ+PiA9PiB7XG4gIGNvbnN0IHsgY2xpZW50TmFtZSwgY29tbWFuZE5hbWUsIGlucHV0RmlsdGVyU2Vuc2l0aXZlTG9nLCBsb2dnZXIsIG91dHB1dEZpbHRlclNlbnNpdGl2ZUxvZyB9ID0gY29udGV4dDtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG5leHQoYXJncyk7XG5cbiAgaWYgKCFsb2dnZXIpIHtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIGxvZ2dlci5pbmZvID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjb25zdCB7ICRtZXRhZGF0YSwgLi4ub3V0cHV0V2l0aG91dE1ldGFkYXRhIH0gPSByZXNwb25zZS5vdXRwdXQ7XG4gICAgbG9nZ2VyLmluZm8oe1xuICAgICAgY2xpZW50TmFtZSxcbiAgICAgIGNvbW1hbmROYW1lLFxuICAgICAgaW5wdXQ6IGlucHV0RmlsdGVyU2Vuc2l0aXZlTG9nKGFyZ3MuaW5wdXQpLFxuICAgICAgb3V0cHV0OiBvdXRwdXRGaWx0ZXJTZW5zaXRpdmVMb2cob3V0cHV0V2l0aG91dE1ldGFkYXRhKSxcbiAgICAgIG1ldGFkYXRhOiAkbWV0YWRhdGEsXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gcmVzcG9uc2U7XG59O1xuXG5leHBvcnQgY29uc3QgbG9nZ2VyTWlkZGxld2FyZU9wdGlvbnM6IEluaXRpYWxpemVIYW5kbGVyT3B0aW9ucyAmIEFic29sdXRlTG9jYXRpb24gPSB7XG4gIG5hbWU6IFwibG9nZ2VyTWlkZGxld2FyZVwiLFxuICB0YWdzOiBbXCJMT0dHRVJcIl0sXG4gIHN0ZXA6IFwiaW5pdGlhbGl6ZVwiLFxuICBvdmVycmlkZTogdHJ1ZSxcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbmV4cG9ydCBjb25zdCBnZXRMb2dnZXJQbHVnaW4gPSAob3B0aW9uczogYW55KTogUGx1Z2dhYmxlPGFueSwgYW55PiA9PiAoe1xuICBhcHBseVRvU3RhY2s6IChjbGllbnRTdGFjaykgPT4ge1xuICAgIGNsaWVudFN0YWNrLmFkZChsb2dnZXJNaWRkbGV3YXJlKCksIGxvZ2dlck1pZGRsZXdhcmVPcHRpb25zKTtcbiAgfSxcbn0pO1xuIl19