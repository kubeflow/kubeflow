"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateDescribeMetricFilters = void 0;
const CloudWatchLogs_1 = require("../CloudWatchLogs");
const CloudWatchLogsClient_1 = require("../CloudWatchLogsClient");
const DescribeMetricFiltersCommand_1 = require("../commands/DescribeMetricFiltersCommand");
/**
 * @private
 */
const makePagedClientRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.send(new DescribeMetricFiltersCommand_1.DescribeMetricFiltersCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (client, input, ...args) => {
    // @ts-ignore
    return await client.describeMetricFilters(input, ...args);
};
async function* paginateDescribeMetricFilters(config, input, ...additionalArguments) {
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
exports.paginateDescribeMetricFilters = paginateDescribeMetricFilters;
//# sourceMappingURL=DescribeMetricFiltersPaginator.js.map