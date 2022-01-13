"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateDescribeLogGroups = void 0;
const CloudWatchLogs_1 = require("../CloudWatchLogs");
const CloudWatchLogsClient_1 = require("../CloudWatchLogsClient");
const DescribeLogGroupsCommand_1 = require("../commands/DescribeLogGroupsCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new DescribeLogGroupsCommand_1.DescribeLogGroupsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.describeLogGroups(input, ...args);
};
async function* paginateDescribeLogGroups(config, input, ...additionalArguments) {
    // ToDo: replace with actual type instead of typeof input.nextToken
    let token = config.startingToken || undefined;
    let hasNext = true;
    let page;
    while (hasNext) {
        input.nextToken = token;
        input["limit"] = config.pageSize;
        if (config.client instanceof CloudWatchLogs_1.CloudWatchLogs) {
            page = await makePagedRequest(config.client, input, ...additionalArguments);
        }
        else if (config.client instanceof CloudWatchLogsClient_1.CloudWatchLogsClient) {
            page = await makePagedClientRequest(config.client, input, ...additionalArguments);
        }
        else {
            throw new Error("Invalid client, expected CloudWatchLogs | CloudWatchLogsClient");
        }
        yield page;
        token = page.nextToken;
        hasNext = !!token;
    }
    // @ts-ignore
    return undefined;
}
exports.paginateDescribeLogGroups = paginateDescribeLogGroups;
//# sourceMappingURL=DescribeLogGroupsPaginator.js.map