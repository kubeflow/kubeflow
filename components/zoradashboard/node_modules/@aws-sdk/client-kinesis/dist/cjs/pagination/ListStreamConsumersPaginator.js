"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateListStreamConsumers = void 0;
const Kinesis_1 = require("../Kinesis");
const KinesisClient_1 = require("../KinesisClient");
const ListStreamConsumersCommand_1 = require("../commands/ListStreamConsumersCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new ListStreamConsumersCommand_1.ListStreamConsumersCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.listStreamConsumers(input, ...args);
};
async function* paginateListStreamConsumers(config, input, ...additionalArguments) {
    // ToDo: replace with actual type instead of typeof input.NextToken
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.NextToken = token;
        input["MaxResults"] = config.pageSize;
        if (config.client instanceof Kinesis_1.Kinesis) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof KinesisClient_1.KinesisClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected Kinesis | KinesisClient");
        }
        yield page;
        token = page.NextToken;
        hasNext = !!token;
    }
    // @ts-ignore
    return undefined;
}
exports.paginateListStreamConsumers = paginateListStreamConsumers;
//# sourceMappingURL=ListStreamConsumersPaginator.js.map