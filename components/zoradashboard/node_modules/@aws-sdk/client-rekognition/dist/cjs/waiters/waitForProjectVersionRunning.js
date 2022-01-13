"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForProjectVersionRunning = void 0;
const DescribeProjectVersionsCommand_1 = require("../commands/DescribeProjectVersionsCommand");
const util_waiter_1 = require("@aws-sdk/util-waiter");
const checkState = async (client, input) => {
    try {
        let result = await client.send(new DescribeProjectVersionsCommand_1.DescribeProjectVersionsCommand(input));
        try {
            let returnComparator = () => {
                let flat_1 = [].concat(...result.ProjectVersionDescriptions);
                let projection_3 = flat_1.map((element_2) => {
                    return element_2.Status;
                });
                return projection_3;
            };
            let allStringEq_5 = returnComparator().length > 0;
            for (let element_4 of returnComparator()) {
                allStringEq_5 = allStringEq_5 && element_4 == "RUNNING";
            }
            if (allStringEq_5) {
                return { state: util_waiter_1.WaiterState.SUCCESS };
            }
        }
        catch (e) { }
        try {
            let returnComparator = () => {
                let flat_1 = [].concat(...result.ProjectVersionDescriptions);
                let projection_3 = flat_1.map((element_2) => {
                    return element_2.Status;
                });
                return projection_3;
            };
            for (let anyStringEq_4 of returnComparator()) {
                if (anyStringEq_4 == "FAILED") {
                    return { state: util_waiter_1.WaiterState.FAILURE };
                }
            }
        }
        catch (e) { }
    }
    catch (exception) { }
    return { state: util_waiter_1.WaiterState.RETRY };
};
/**
 * Wait until the ProjectVersion is running.
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeProjectVersionsCommand for polling.
 */
const waitForProjectVersionRunning = async (params, input) => {
    const serviceDefaults = { minDelay: 30, maxDelay: 120 };
    return util_waiter_1.createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
exports.waitForProjectVersionRunning = waitForProjectVersionRunning;
//# sourceMappingURL=waitForProjectVersionRunning.js.map