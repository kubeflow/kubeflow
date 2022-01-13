import { Comprehend } from "../Comprehend";
import { ComprehendClient } from "../ComprehendClient";
import {
  ListEventsDetectionJobsCommand,
  ListEventsDetectionJobsCommandInput,
  ListEventsDetectionJobsCommandOutput,
} from "../commands/ListEventsDetectionJobsCommand";
import { ComprehendPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: ComprehendClient,
  input: ListEventsDetectionJobsCommandInput,
  ...args: any
): Promise<ListEventsDetectionJobsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListEventsDetectionJobsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: Comprehend,
  input: ListEventsDetectionJobsCommandInput,
  ...args: any
): Promise<ListEventsDetectionJobsCommandOutput> => {
  // @ts-ignore
  return await client.listEventsDetectionJobs(input, ...args);
};
export async function* paginateListEventsDetectionJobs(
  config: ComprehendPaginationConfiguration,
  input: ListEventsDetectionJobsCommandInput,
  ...additionalArguments: any
): Paginator<ListEventsDetectionJobsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListEventsDetectionJobsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof Comprehend) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof ComprehendClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Comprehend | ComprehendClient");
    }
    yield page;
    token = page.NextToken;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
