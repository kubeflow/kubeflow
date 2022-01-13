import { __assign, __awaiter, __generator, __rest } from "tslib";
import { getLoggerPlugin, loggerMiddleware, loggerMiddlewareOptions } from "./loggerMiddleware";
describe("getLoggerPlugin", function () {
    var mockClientStack = {
        add: jest.fn(),
    };
    afterEach(function () {
        jest.clearAllMocks();
    });
    it("adds loggerMiddleware", function () {
        getLoggerPlugin({}).applyToStack(mockClientStack);
        expect(mockClientStack.add).toHaveBeenCalledTimes(1);
        expect(mockClientStack.add.mock.calls[0][1]).toEqual(loggerMiddlewareOptions);
    });
});
describe("loggerMiddleware", function () {
    var mockNext = jest.fn();
    var mockArgs = {
        input: {
            inputKey: "inputValue",
        },
        request: {
            method: "GET",
            headers: {},
        },
    };
    var mockOutput = {
        $metadata: {
            statusCode: 200,
            requestId: "requestId",
            attempts: 2,
            totalRetryDelay: 350,
        },
        outputKey: "outputValue",
    };
    var mockResponse = {
        response: {
            statusCode: 200,
            headers: {
                "x-amzn-requestid": "requestId",
                "x-amz-id-2": "extendedRequestId",
                "x-amz-cf-id": "cfId",
            },
        },
        output: mockOutput,
    };
    afterEach(function () {
        jest.clearAllMocks();
    });
    it("returns without logging if context.logger is not defined", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockNext.mockResolvedValueOnce(mockResponse);
                    return [4 /*yield*/, loggerMiddleware()(mockNext, {})(mockArgs)];
                case 1:
                    response = _a.sent();
                    expect(mockNext).toHaveBeenCalledTimes(1);
                    expect(response).toStrictEqual(mockResponse);
                    return [2 /*return*/];
            }
        });
    }); });
    it("returns without logging if context.logger doesn't have info function", function () { return __awaiter(void 0, void 0, void 0, function () {
        var logger, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockNext.mockResolvedValueOnce(mockResponse);
                    logger = {};
                    return [4 /*yield*/, loggerMiddleware()(mockNext, { logger: logger })(mockArgs)];
                case 1:
                    response = _a.sent();
                    expect(mockNext).toHaveBeenCalledTimes(1);
                    expect(response).toStrictEqual(mockResponse);
                    return [2 /*return*/];
            }
        });
    }); });
    describe("logs if context.logger has info function", function () {
        it("success case with clientName, commandName, input, metadata", function () { return __awaiter(void 0, void 0, void 0, function () {
            var logger, clientName, commandName, mockInputLog, inputFilterSensitiveLog, mockOutputLog, outputFilterSensitiveLog, context, response, $metadata, outputWithoutMetadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockNext.mockResolvedValueOnce(mockResponse);
                        logger = { info: jest.fn() };
                        clientName = "mockClientName";
                        commandName = "mockCommandName";
                        mockInputLog = { inputKey: "inputKey", inputSensitiveKey: "SENSITIVE_VALUE" };
                        inputFilterSensitiveLog = jest.fn().mockReturnValueOnce(mockInputLog);
                        mockOutputLog = { outputKey: "outputKey", outputSensitiveKey: "SENSITIVE_VALUE" };
                        outputFilterSensitiveLog = jest.fn().mockReturnValueOnce(mockOutputLog);
                        context = {
                            logger: logger,
                            clientName: clientName,
                            commandName: commandName,
                            inputFilterSensitiveLog: inputFilterSensitiveLog,
                            outputFilterSensitiveLog: outputFilterSensitiveLog,
                        };
                        return [4 /*yield*/, loggerMiddleware()(mockNext, context)(mockArgs)];
                    case 1:
                        response = _a.sent();
                        expect(mockNext).toHaveBeenCalledTimes(1);
                        expect(response).toStrictEqual(mockResponse);
                        expect(inputFilterSensitiveLog).toHaveBeenCalledTimes(1);
                        expect(inputFilterSensitiveLog).toHaveBeenCalledWith(mockArgs.input);
                        $metadata = mockOutput.$metadata, outputWithoutMetadata = __rest(mockOutput, ["$metadata"]);
                        expect(outputFilterSensitiveLog).toHaveBeenCalledTimes(1);
                        expect(outputFilterSensitiveLog).toHaveBeenCalledWith(outputWithoutMetadata);
                        expect(logger.info).toHaveBeenCalledTimes(1);
                        expect(logger.info).toHaveBeenCalledWith({
                            clientName: clientName,
                            commandName: commandName,
                            input: mockInputLog,
                            output: mockOutputLog,
                            metadata: $metadata,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("header x-amzn-request-id as requestId if x-amzn-requestid is not present", function () { return __awaiter(void 0, void 0, void 0, function () {
            var requestIdBackup, customResponse, logger, inputFilterSensitiveLog, outputFilterSensitiveLog, context, response, $metadata, outputWithoutMetadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestIdBackup = "requestIdBackup";
                        customResponse = __assign(__assign({}, mockResponse), { response: __assign(__assign({}, mockResponse.response), { headers: {
                                    "x-amzn-request-id": requestIdBackup,
                                } }) });
                        mockNext.mockResolvedValueOnce(customResponse);
                        logger = { info: jest.fn() };
                        inputFilterSensitiveLog = jest.fn().mockImplementationOnce(function (input) { return input; });
                        outputFilterSensitiveLog = jest.fn().mockImplementationOnce(function (output) { return output; });
                        context = {
                            logger: logger,
                            inputFilterSensitiveLog: inputFilterSensitiveLog,
                            outputFilterSensitiveLog: outputFilterSensitiveLog,
                        };
                        return [4 /*yield*/, loggerMiddleware()(mockNext, context)(mockArgs)];
                    case 1:
                        response = _a.sent();
                        expect(mockNext).toHaveBeenCalledTimes(1);
                        expect(response).toStrictEqual(customResponse);
                        $metadata = mockOutput.$metadata, outputWithoutMetadata = __rest(mockOutput, ["$metadata"]);
                        expect(logger.info).toHaveBeenCalledTimes(1);
                        expect(logger.info).toHaveBeenCalledWith({
                            input: mockArgs.input,
                            output: outputWithoutMetadata,
                            metadata: $metadata,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyTWlkZGxld2FyZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZ2dlck1pZGRsZXdhcmUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWhHLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtJQUMxQixJQUFNLGVBQWUsR0FBRztRQUN0QixHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtLQUNmLENBQUM7SUFFRixTQUFTLENBQUM7UUFDUixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsdUJBQXVCLEVBQUU7UUFDMUIsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBRSxlQUF3RCxDQUFDLENBQUM7UUFDNUYsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDaEYsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtJQUMzQixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFFM0IsSUFBTSxRQUFRLEdBQUc7UUFDZixLQUFLLEVBQUU7WUFDTCxRQUFRLEVBQUUsWUFBWTtTQUN2QjtRQUNELE9BQU8sRUFBRTtZQUNQLE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFLEVBQUU7U0FDWjtLQUNGLENBQUM7SUFFRixJQUFNLFVBQVUsR0FBRztR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b2dnZXIsIE1pZGRsZXdhcmVTdGFjayB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5pbXBvcnQgeyBnZXRMb2dnZXJQbHVnaW4sIGxvZ2dlck1pZGRsZXdhcmUsIGxvZ2dlck1pZGRsZXdhcmVPcHRpb25zIH0gZnJvbSBcIi4vbG9nZ2VyTWlkZGxld2FyZVwiO1xuXG5kZXNjcmliZShcImdldExvZ2dlclBsdWdpblwiLCAoKSA9PiB7XG4gIGNvbnN0IG1vY2tDbGllbnRTdGFjayA9IHtcbiAgICBhZGQ6IGplc3QuZm4oKSxcbiAgfTtcblxuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIGplc3QuY2xlYXJBbGxNb2NrcygpO1xuICB9KTtcblxuICBpdChcImFkZHMgbG9nZ2VyTWlkZGxld2FyZVwiLCAoKSA9PiB7XG4gICAgZ2V0TG9nZ2VyUGx1Z2luKHt9KS5hcHBseVRvU3RhY2soKG1vY2tDbGllbnRTdGFjayBhcyB1bmtub3duKSBhcyBNaWRkbGV3YXJlU3RhY2s8YW55LCBhbnk+KTtcbiAgICBleHBlY3QobW9ja0NsaWVudFN0YWNrLmFkZCkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgIGV4cGVjdChtb2NrQ2xpZW50U3RhY2suYWRkLm1vY2suY2FsbHNbMF1bMV0pLnRvRXF1YWwobG9nZ2VyTWlkZGxld2FyZU9wdGlvbnMpO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZShcImxvZ2dlck1pZGRsZXdhcmVcIiwgKCkgPT4ge1xuICBjb25zdCBtb2NrTmV4dCA9IGplc3QuZm4oKTtcblxuICBjb25zdCBtb2NrQXJncyA9IHtcbiAgICBpbnB1dDoge1xuICAgICAgaW5wdXRLZXk6IFwiaW5wdXRWYWx1ZVwiLFxuICAgIH0sXG4gICAgcmVxdWVzdDoge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBtb2NrT3V0cHV0ID0ge1xuICAgICRtZXRhZGF0YToge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgcmVxdWVzdElkOiBcInJlcXVlc3RJZFwiLFxuICAgICAgYXR0ZW1wdHM6IDIsXG4gICAgICB0b3RhbFJldHJ5RGVsYXk6IDM1MCxcbiAgICB9LFxuICAgIG91dHB1dEtleTogXCJvdXRwdXRWYWx1ZVwiLFxuICB9O1xuXG4gIGNvbnN0IG1vY2tSZXNwb25zZSA9IHtcbiAgICByZXNwb25zZToge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIngtYW16bi1yZXF1ZXN0aWRcIjogXCJyZXF1ZXN0SWRcIixcbiAgICAgICAgXCJ4LWFtei1pZC0yXCI6IFwiZXh0ZW5kZWRSZXF1ZXN0SWRcIixcbiAgICAgICAgXCJ4LWFtei1jZi1pZFwiOiBcImNmSWRcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICBvdXRwdXQ6IG1vY2tPdXRwdXQsXG4gIH07XG5cbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBqZXN0LmNsZWFyQWxsTW9ja3MoKTtcbiAgfSk7XG5cbiAgaXQoXCJyZXR1cm5zIHdpdGhvdXQgbG9nZ2luZyBpZiBjb250ZXh0LmxvZ2dlciBpcyBub3QgZGVmaW5lZFwiLCBhc3luYyAoKSA9PiB7XG4gICAgbW9ja05leHQubW9ja1Jlc29sdmVkVmFsdWVPbmNlKG1vY2tSZXNwb25zZSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBsb2dnZXJNaWRkbGV3YXJlKCkobW9ja05leHQsIHt9KShtb2NrQXJncyk7XG4gICAgZXhwZWN0KG1vY2tOZXh0KS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgZXhwZWN0KHJlc3BvbnNlKS50b1N0cmljdEVxdWFsKG1vY2tSZXNwb25zZSk7XG4gIH0pO1xuXG4gIGl0KFwicmV0dXJucyB3aXRob3V0IGxvZ2dpbmcgaWYgY29udGV4dC5sb2dnZXIgZG9lc24ndCBoYXZlIGluZm8gZnVuY3Rpb25cIiwgYXN5bmMgKCkgPT4ge1xuICAgIG1vY2tOZXh0Lm1vY2tSZXNvbHZlZFZhbHVlT25jZShtb2NrUmVzcG9uc2UpO1xuICAgIGNvbnN0IGxvZ2dlciA9IHt9IGFzIExvZ2dlcjtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGxvZ2dlck1pZGRsZXdhcmUoKShtb2NrTmV4dCwgeyBsb2dnZXIgfSkobW9ja0FyZ3MpO1xuICAgIGV4cGVjdChtb2NrTmV4dCkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgIGV4cGVjdChyZXNwb25zZSkudG9TdHJpY3RFcXVhbChtb2NrUmVzcG9uc2UpO1xuICB9KTtcblxuICBkZXNjcmliZShcImxvZ3MgaWYgY29udGV4dC5sb2dnZXIgaGFzIGluZm8gZnVuY3Rpb25cIiwgKCkgPT4ge1xuICAgIGl0KFwic3VjY2VzcyBjYXNlIHdpdGggY2xpZW50TmFtZSwgY29tbWFuZE5hbWUsIGlucHV0LCBtZXRhZGF0YVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2NrTmV4dC5tb2NrUmVzb2x2ZWRWYWx1ZU9uY2UobW9ja1Jlc3BvbnNlKTtcblxuICAgICAgY29uc3QgbG9nZ2VyID0gKHsgaW5mbzogamVzdC5mbigpIH0gYXMgdW5rbm93bikgYXMgTG9nZ2VyO1xuICAgICAgY29uc3QgY2xpZW50TmFtZSA9IFwibW9ja0NsaWVudE5hbWVcIjtcbiAgICAgIGNvbnN0IGNvbW1hbmROYW1lID0gXCJtb2NrQ29tbWFuZE5hbWVcIjtcblxuICAgICAgY29uc3QgbW9ja0lucHV0TG9nID0geyBpbnB1dEtleTogXCJpbnB1dEtleVwiLCBpbnB1dFNlbnNpdGl2ZUtleTogXCJTRU5TSVRJVkVfVkFMVUVcIiB9O1xuICAgICAgY29uc3QgaW5wdXRGaWx0ZXJTZW5zaXRpdmVMb2cgPSBqZXN0LmZuKCkubW9ja1JldHVyblZhbHVlT25jZShtb2NrSW5wdXRMb2cpO1xuICAgICAgY29uc3QgbW9ja091dHB1dExvZyA9IHsgb3V0cHV0S2V5OiBcIm91dHB1dEtleVwiLCBvdXRwdXRTZW5zaXRpdmVLZXk6IFwiU0VOU0lUSVZFX1ZBTFVFXCIgfTtcbiAgICAgIGNvbnN0IG91dHB1dEZpbHRlclNlbnNpdGl2ZUxvZyA9IGplc3QuZm4oKS5tb2NrUmV0dXJuVmFsdWVPbmNlKG1vY2tPdXRwdXRMb2cpO1xuXG4gICAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgICBsb2dnZXIsXG4gICAgICAgIGNsaWVudE5hbWUsXG4gICAgICAgIGNvbW1hbmROYW1lLFxuICAgICAgICBpbnB1dEZpbHRlclNlbnNpdGl2ZUxvZyxcbiAgICAgICAgb3V0cHV0RmlsdGVyU2Vuc2l0aXZlTG9nLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBsb2dnZXJNaWRkbGV3YXJlKCkobW9ja05leHQsIGNvbnRleHQpKG1vY2tBcmdzKTtcbiAgICAgIGV4cGVjdChtb2NrTmV4dCkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b1N0cmljdEVxdWFsKG1vY2tSZXNwb25zZSk7XG5cbiAgICAgIGV4cGVjdChpbnB1dEZpbHRlclNlbnNpdGl2ZUxvZykudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgICAgZXhwZWN0KGlucHV0RmlsdGVyU2Vuc2l0aXZlTG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChtb2NrQXJncy5pbnB1dCk7XG5cbiAgICAgIGNvbnN0IHsgJG1ldGFkYXRhLCAuLi5vdXRwdXRXaXRob3V0TWV0YWRhdGEgfSA9IG1vY2tPdXRwdXQ7XG4gICAgICBleHBlY3Qob3V0cHV0RmlsdGVyU2Vuc2l0aXZlTG9nKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgICBleHBlY3Qob3V0cHV0RmlsdGVyU2Vuc2l0aXZlTG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChvdXRwdXRXaXRob3V0TWV0YWRhdGEpO1xuXG4gICAgICBleHBlY3QobG9nZ2VyLmluZm8pLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICAgIGV4cGVjdChsb2dnZXIuaW5mbykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICBjbGllbnROYW1lLFxuICAgICAgICBjb21tYW5kTmFtZSxcbiAgICAgICAgaW5wdXQ6IG1vY2tJbnB1dExvZyxcbiAgICAgICAgb3V0cHV0OiBtb2NrT3V0cHV0TG9nLFxuICAgICAgICBtZXRhZGF0YTogJG1ldGFkYXRhLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdChcImhlYWRlciB4LWFtem4tcmVxdWVzdC1pZCBhcyByZXF1ZXN0SWQgaWYgeC1hbXpuLXJlcXVlc3RpZCBpcyBub3QgcHJlc2VudFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0SWRCYWNrdXAgPSBcInJlcXVlc3RJZEJhY2t1cFwiO1xuICAgICAgY29uc3QgY3VzdG9tUmVzcG9uc2UgPSB7XG4gICAgICAgIC4uLm1vY2tSZXNwb25zZSxcbiAgICAgICAgcmVzcG9uc2U6IHtcbiAgICAgICAgICAuLi5tb2NrUmVzcG9uc2UucmVzcG9uc2UsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJ4LWFtem4tcmVxdWVzdC1pZFwiOiByZXF1ZXN0SWRCYWNrdXAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBtb2NrTmV4dC5tb2NrUmVzb2x2ZWRWYWx1ZU9uY2UoY3VzdG9tUmVzcG9uc2UpO1xuICAgICAgY29uc3QgbG9nZ2VyID0gKHsgaW5mbzogamVzdC5mbigpIH0gYXMgdW5rbm93bikgYXMgTG9nZ2VyO1xuICAgICAgY29uc3QgaW5wdXRGaWx0ZXJTZW5zaXRpdmVMb2cgPSBqZXN0LmZuKCkubW9ja0ltcGxlbWVudGF0aW9uT25jZSgoaW5wdXQpID0+IGlucHV0KTtcbiAgICAgIGNvbnN0IG91dHB1dEZpbHRlclNlbnNpdGl2ZUxvZyA9IGplc3QuZm4oKS5tb2NrSW1wbGVtZW50YXRpb25PbmNlKChvdXRwdXQpID0+IG91dHB1dCk7XG5cbiAgICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICAgIGxvZ2dlcixcbiAgICAgICAgaW5wdXRGaWx0ZXJTZW5zaXRpdmVMb2csXG4gICAgICAgIG91dHB1dEZpbHRlclNlbnNpdGl2ZUxvZyxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbG9nZ2VyTWlkZGxld2FyZSgpKG1vY2tOZXh0LCBjb250ZXh0KShtb2NrQXJncyk7XG4gICAgICBleHBlY3QobW9ja05leHQpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICAgIGV4cGVjdChyZXNwb25zZSkudG9TdHJpY3RFcXVhbChjdXN0b21SZXNwb25zZSk7XG5cbiAgICAgIGNvbnN0IHsgJG1ldGFkYXRhLCAuLi5vdXRwdXRXaXRob3V0TWV0YWRhdGEgfSA9IG1vY2tPdXRwdXQ7XG4gICAgICBleHBlY3QobG9nZ2VyLmluZm8pLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICAgIGV4cGVjdChsb2dnZXIuaW5mbykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICBpbnB1dDogbW9ja0FyZ3MuaW5wdXQsXG4gICAgICAgIG91dHB1dDogb3V0cHV0V2l0aG91dE1ldGFkYXRhLFxuICAgICAgICBtZXRhZGF0YTogJG1ldGFkYXRhLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=