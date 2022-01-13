import { CloudWatchLogs } from "../CloudWatchLogs";
import { CloudWatchLogsClient } from "../CloudWatchLogsClient";
import {
  DescribeLogGroupsCommand,
  DescribeLogGroupsCommandInput,
  DescribeLogGroupsCommandOutput,
} from "../commands/DescribeLogGroupsCommand";
import { CloudWatchLogsPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: CloudWatchLogsClient,
  input: DescribeLogGroupsCommandInput,
  ...args: any
): Promise<DescribeLogGroupsCommandOutput> => {
  // @ts-ignore
  return await client.send(new DescribeLogGroupsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: CloudWatchLogs,
  input: DescribeLogGroupsCommandInput,
  ...args: any
): Promise<DescribeLogGroupsCommandOutput> => {
  // @ts-ignore
  return await client.describeLogGroups(input, ...args);
};
export async function* paginateDescribeLogGroups(
  config: CloudWatchLogsPaginationConfiguration,
  input: DescribeLogGroupsCommandInput,
  ...additionalArguments: any
): Paginator<DescribeLogGroupsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.nextToken
  let token: typeof input.nextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: DescribeLogGroupsCommandOutput;
  while (hasNext) {
    input.nextToken = token;
    input["limit"] = config.pageSize;
    if (config.client instanceof CloudWatchLogs) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof CloudWatchLogsClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected CloudWatchLogs | CloudWatchLogsClient");
    }
    yield page;
    token = page.nextToken;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
