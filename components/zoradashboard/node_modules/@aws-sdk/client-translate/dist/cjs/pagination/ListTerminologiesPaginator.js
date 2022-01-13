"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateListTerminologies = void 0;
const Translate_1 = require("../Translate");
const TranslateClient_1 = require("../TranslateClient");
const ListTerminologiesCommand_1 = require("../commands/ListTerminologiesCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new ListTerminologiesCommand_1.ListTerminologiesCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.listTerminologies(input, ...args);
};
async function* paginateListTerminologies(config, input, ...additionalArguments) {
    // ToDo: replace with actual type instead of typeof input.NextToken
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.NextToken = token;
        input["MaxResults"] = config.pageSize;
        if (config.client instanceof Translate_1.Translate) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof TranslateClient_1.TranslateClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected Translate | TranslateClient");
        }
        yield page;
        token = page.NextToken;
        hasNext = !!token;
    }
    // @ts-ignore
    return undefined;
}
exports.paginateListTerminologies = paginateListTerminologies;
//# sourceMappingURL=ListTerminologiesPaginator.js.map