import { __asyncGenerator, __await, __awaiter, __generator, __read, __spread } from "tslib";
import { S3 } from "../S3";
import { S3Client } from "../S3Client";
import { ListObjectsV2Command, } from "../commands/ListObjectsV2Command";
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
                case 0: return [4 /*yield*/, client.send.apply(client, __spread([new ListObjectsV2Command(input)], args))];
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
                case 0: return [4 /*yield*/, client.listObjectsV2.apply(client, __spread([input], args))];
                case 1: 
                // @ts-ignore
                return [2 /*return*/, _a.sent()];
            }
        });
    });
};
export function paginateListObjectsV2(config, input) {
    var additionalArguments = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        additionalArguments[_i - 2] = arguments[_i];
    }
    return __asyncGenerator(this, arguments, function paginateListObjectsV2_1() {
        var token, hasNext, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = config.startingToken || undefined;
                    hasNext = true;
                    _a.label = 1;
                case 1:
                    if (!hasNext) return [3 /*break*/, 9];
                    input.ContinuationToken = token;
                    input["MaxKeys"] = config.pageSize;
                    if (!(config.client instanceof S3)) return [3 /*break*/, 3];
                    return [4 /*yield*/, __await(makePagedRequest.apply(void 0, __spread([config.client, input], additionalArguments)))];
                case 2:
                    page = _a.sent();
                    return [3 /*break*/, 6];
                case 3:
                    if (!(config.client instanceof S3Client)) return [3 /*break*/, 5];
                    return [4 /*yield*/, __await(makePagedClientRequest.apply(void 0, __spread([config.client, input], additionalArguments)))];
                case 4:
                    page = _a.sent();
                    return [3 /*break*/, 6];
                case 5: throw new Error("Invalid client, expected S3 | S3Client");
                case 6: return [4 /*yield*/, __await(page)];
                case 7: return [4 /*yield*/, _a.sent()];
                case 8:
                    _a.sent();
                    token = page.NextContinuationToken;
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
//# sourceMappingURL=ListObjectsV2Paginator.js.map