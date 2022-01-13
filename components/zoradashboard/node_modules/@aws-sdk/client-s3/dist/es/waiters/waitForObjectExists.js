import { __assign, __awaiter, __generator } from "tslib";
import { HeadObjectCommand } from "../commands/HeadObjectCommand";
import { WaiterState, createWaiter } from "@aws-sdk/util-waiter";
var checkState = function (client, input) { return __awaiter(void 0, void 0, void 0, function () {
    var result, exception_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.send(new HeadObjectCommand(input))];
            case 1:
                result = _a.sent();
                return [2 /*return*/, { state: WaiterState.SUCCESS }];
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
 *  @param input : the input to HeadObjectCommand for polling.
 */
export var waitForObjectExists = function (params, input) { return __awaiter(void 0, void 0, void 0, function () {
    var serviceDefaults;
    return __generator(this, function (_a) {
        serviceDefaults = { minDelay: 5, maxDelay: 120 };
        return [2 /*return*/, createWaiter(__assign(__assign({}, serviceDefaults), params), input, checkState)];
    });
}); };
//# sourceMappingURL=waitForObjectExists.js.map