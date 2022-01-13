import { __assign, __awaiter, __generator, __read, __spread, __values } from "tslib";
import { DescribeProjectVersionsCommand, } from "../commands/DescribeProjectVersionsCommand";
import { WaiterState, createWaiter } from "@aws-sdk/util-waiter";
var checkState = function (client, input) { return __awaiter(void 0, void 0, void 0, function () {
    var result_1, returnComparator, allStringEq_5, _a, _b, element_4, returnComparator, _c, _d, anyStringEq_4, exception_1;
    var e_1, _e, e_2, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.send(new DescribeProjectVersionsCommand(input))];
            case 1:
                result_1 = _g.sent();
                try {
                    returnComparator = function () {
                        var flat_1 = [].concat.apply([], __spread(result_1.ProjectVersionDescriptions));
                        var projection_3 = flat_1.map(function (element_2) {
                            return element_2.Status;
                        });
                        return projection_3;
                    };
                    allStringEq_5 = returnComparator().length > 0;
                    try {
                        for (_a = __values(returnComparator()), _b = _a.next(); !_b.done; _b = _a.next()) {
                            element_4 = _b.value;
                            allStringEq_5 = allStringEq_5 && element_4 == "RUNNING";
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    if (allStringEq_5) {
                        return [2 /*return*/, { state: WaiterState.SUCCESS }];
                    }
                }
                catch (e) { }
                try {
                    returnComparator = function () {
                        var flat_1 = [].concat.apply([], __spread(result_1.ProjectVersionDescriptions));
                        var projection_3 = flat_1.map(function (element_2) {
                            return element_2.Status;
                        });
                        return projection_3;
                    };
                    try {
                        for (_c = __values(returnComparator()), _d = _c.next(); !_d.done; _d = _c.next()) {
                            anyStringEq_4 = _d.value;
                            if (anyStringEq_4 == "FAILED") {
                                return [2 /*return*/, { state: WaiterState.FAILURE }];
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                catch (e) { }
                return [3 /*break*/, 3];
            case 2:
                exception_1 = _g.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/, { state: WaiterState.RETRY }];
        }
    });
}); };
/**
 * Wait until the ProjectVersion is running.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeProjectVersionsCommand for polling.
 */
export var waitForProjectVersionRunning = function (params, input) { return __awaiter(void 0, void 0, void 0, function () {
    var serviceDefaults;
    return __generator(this, function (_a) {
        serviceDefaults = { minDelay: 30, maxDelay: 120 };
        return [2 /*return*/, createWaiter(__assign(__assign({}, serviceDefaults), params), input, checkState)];
    });
}); };
//# sourceMappingURL=waitForProjectVersionRunning.js.map