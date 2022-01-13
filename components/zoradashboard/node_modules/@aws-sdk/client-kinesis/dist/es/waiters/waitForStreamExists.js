import { __assign, __awaiter, __generator } from "tslib";
import { DescribeStreamCommand } from "../commands/DescribeStreamCommand";
import { WaiterState, createWaiter } from "@aws-sdk/util-waiter";
var checkState = function (client, input) { return __awaiter(void 0, void 0, void 0, function () {
    var result_1, returnComparator, exception_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.send(new DescribeStreamCommand(input))];
            case 1:
                result_1 = _a.sent();
                try {
                    returnComparator = function () {
                        return result_1.StreamDescription.StreamStatus;
                    };
                    if (returnComparator() === "ACTIVE") {
                        return [2 /*return*/, { state: WaiterState.SUCCESS }];
                    }
                }
                catch (e) { }
                return [3 /*break*/, 3];
            case 2:
                exception_1 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/, { state: WaiterState.RETRY }];
        }
    });
}); };
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeStreamCommand for polling.
 */
export var waitForStreamExists = function (params, input) { return __awaiter(void 0, void 0, void 0, function () {
    var serviceDefaults;
    return __generator(this, function (_a) {
        serviceDefaults = { minDelay: 10, maxDelay: 120 };
        return [2 /*return*/, createWaiter(__assign(__assign({}, serviceDefaults), params), input, checkState)];
    });
}); };
//# sourceMappingURL=waitForStreamExists.js.map