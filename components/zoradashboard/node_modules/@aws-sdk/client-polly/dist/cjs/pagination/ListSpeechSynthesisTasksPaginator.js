"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateListSpeechSynthesisTasks = void 0;
const Polly_1 = require("../Polly");
const PollyClient_1 = require("../PollyClient");
const ListSpeechSynthesisTasksCommand_1 = require("../commands/ListSpeechSynthesisTasksCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new ListSpeechSynthesisTasksCommand_1.ListSpeechSynthesisTasksCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.listSpeechSynthesisTasks(input, ...args);
};
async function* paginateListSpeechSynthesisTasks(config, input, ...additionalArguments) {
    // ToDo: replace with actual type instead of typeof input.NextToken
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.NextToken = token;
        input["MaxResults"] = config.pageSize;
        if (config.client instanceof Polly_1.Polly) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof PollyClient_1.PollyClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected Polly | PollyClient");
        }
        yield page;
        token = page.NextToken;
        hasNext = !!token;
    }
    // @ts-ignore
    return undefined;
}
exports.paginateListSpeechSynthesisTasks = paginateListSpeechSynthesisTasks;
//# sourceMappingURL=ListSpeechSynthesisTasksPaginator.js.map