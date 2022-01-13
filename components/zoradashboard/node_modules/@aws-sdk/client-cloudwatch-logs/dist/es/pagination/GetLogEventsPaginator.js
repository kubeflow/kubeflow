import { __asyncGenerator, __await, __awaiter, __generator, __read, __spread } from "tslib";
import { CloudWatchLogs } from "../CloudWatchLogs";
import { CloudWatchLogsClient } from "../CloudWatchLogsClient";
import { GetLogEventsCommand, } from "../commands/GetLogEventsCommand";
/**
 * @private
 */
var makePagedClientRequest = function (client, input) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.send.apply(client, __spread([new GetLogEventsCommand(input)], args))];
                case 1: 
                // @ts-ignore
                return [2 /*return*/, _a.sent()];
            }
        });
    });
};
/**
 * @private
 */
var makePagedRequest = function (client, input) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.getLogEvents.apply(client, __spread([input], args))];
                case 1: 
                // @ts-ignore
                return [2 /*return*/, _a.sent()];
            }
        });
    });
};
export function paginateGetLogEvents(config, input) {
    var additionalArguments = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        additionalArguments[_i - 2] = arguments[_i];
    }
    return __asyncGenerator(this, arguments, function paginateGetLogEvents_1() {
        var token, hasNext, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = config.startingToken || undefined;
                    hasNext = true;
                    _a.label = 1;
                case 1:
                    if (!hasNext) return [3 /*break*/, 9];
                    input.nextToken = token;
                    input["limit"] = config.pageSize;
                    if (!(config.client instanceof CloudWatchLogs)) return [3 /*break*/, 3];
                    return [4 /*yield*/, __await(makePagedRequest.apply(void 0, __spread([config.client, input], additionalArguments)))];
                case 2:
                    page = _a.sent();
                    return [3 /*break*/, 6];
                case 3:
                    if (!(config.client instanceof CloudWatchLogsClient)) return [3 /*break*/, 5];
                    return [4 /*yield*/, __await(makePagedClientRequest.apply(void 0, __spread([config.client, input], additionalArguments)))];
                case 4:
                    page = _a.sent();
                    return [3 /*break*/, 6];
                case 5: throw new Error("Invalid client, expected CloudWatchLogs | CloudWatchLogsClient");
                case 6: return [4 /*yield*/, __await(page)];
                case 7: return [4 /*yield*/, _a.sent()];
                case 8:
                    _a.sent();
                    token = page.nextForwardToken;
                    hasNext = !!token;
                    return [3 /*break*/, 1];
                case 9: return [4 /*yield*/, __await(undefined)];
                case 10: 
                // @ts-ignore
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//# sourceMappingURL=GetLogEventsPaginator.js.map