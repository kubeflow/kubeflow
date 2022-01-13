"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForObjectExists = void 0;
const HeadObjectCommand_1 = require("../commands/HeadObjectCommand");
const util_waiter_1 = require("@aws-sdk/util-waiter");
const checkState = async (client, input) => {
    try {
        let result = await client.send(new HeadObjectCommand_1.HeadObjectCommand(input));
        return { state: util_waiter_1.WaiterState.SUCCESS };
    }
    catch (exception) { }
    return { state: util_waiter_1.WaiterState.RETRY };
};
/**
 *
 *  @param params : Waiter configuration options.
 *  @param input : the input to HeadObjectCommand for polling.
 */
const waitForObjectExists = async (params, input) => {
    const serviceDefaults = { minDelay: 5, maxDelay: 120 };
    return util_waiter_1.createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
exports.waitForObjectExists = waitForObjectExists;
//# sourceMappingURL=waitForObjectExists.js.map