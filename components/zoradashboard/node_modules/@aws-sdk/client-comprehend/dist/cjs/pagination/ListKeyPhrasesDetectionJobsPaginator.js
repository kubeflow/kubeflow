"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateListKeyPhrasesDetectionJobs = void 0;
const Comprehend_1 = require("../Comprehend");
const ComprehendClient_1 = require("../ComprehendClient");
const ListKeyPhrasesDetectionJobsCommand_1 = require("../commands/ListKeyPhrasesDetectionJobsCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new ListKeyPhrasesDetectionJobsCommand_1.ListKeyPhrasesDetectionJobsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.listKeyPhrasesDetectionJobs(input, ...args);
};
async function* paginateListKeyPhrasesDetectionJobs(config, input, ...additionalArguments) {
    // ToDo: replace with actual type instead of typeof input.NextToken
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.NextToken = token;
        input["MaxResults"] = config.pageSize;
        if (config.client instanceof Comprehend_1.Comprehend) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof ComprehendClient_1.ComprehendClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected Comprehend | ComprehendClient");
        }
        yield page;
        token = page.NextToken;
        hasNext = !!token;
    }
    // @ts-ignore
    return undefined;
}
exports.paginateListKeyPhrasesDetectionJobs = paginateListKeyPhrasesDetectionJobs;
//# sourceMappingURL=ListKeyPhrasesDetectionJobsPaginator.js.map