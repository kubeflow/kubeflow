"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForBucketExists = void 0;
const HeadBucketCommand_1 = require("../commands/HeadBucketCommand");
const util_waiter_1 = require("@aws-sdk/util-waiter");
const checkState = async (client, input) => {
    try {
        let result = await client.send(new HeadBucketCommand_1.HeadBucketCommand(input));
        return { state: util_waiter_1.WaiterState.SUCCESS };
    }
    catch (exception) { }
    return { state: util_waiter_1.WaiterState.RETRY };
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to HeadBucketCommand for polling.
 */
const waitForBucketExists = async (params, input) => {
    const serviceDefaults = { minDelay: 5, maxDelay: 120 };
    return util_waiter_1.createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
exports.waitForBucketExists = waitForBucketExists;
//# sourceMappingURL=waitForBucketExists.js.map