"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForStreamNotExists = void 0;
const DescribeStreamCommand_1 = require("../commands/DescribeStreamCommand");
const util_waiter_1 = require("@aws-sdk/util-waiter");
const checkState = async (client, input) => {
    try {
        let result = await client.send(new DescribeStreamCommand_1.DescribeStreamCommand(input));
    }
    catch (exception) {
        if (exception.name && exception.name == "ResourceNotFoundException") {
            return { state: util_waiter_1.WaiterState.SUCCESS };
        }
    }
    return { state: util_waiter_1.WaiterState.RETRY };
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to DescribeStreamCommand for polling.
 */
const waitForStreamNotExists = async (params, input) => {
    const serviceDefaults = { minDelay: 10, maxDelay: 120 };
    return util_waiter_1.createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
exports.waitForStreamNotExists = waitForStreamNotExists;
//# sourceMappingURL=waitForStreamNotExists.js.map