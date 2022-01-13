import { Comprehend } from "../Comprehend";
import { ComprehendClient } from "../ComprehendClient";
import {
  ListDominantLanguageDetectionJobsCommand,
  ListDominantLanguageDetectionJobsCommandInput,
  ListDominantLanguageDetectionJobsCommandOutput,
} from "../commands/ListDominantLanguageDetectionJobsCommand";
import { ComprehendPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: ComprehendClient,
  input: ListDominantLanguageDetectionJobsCommandInput,
  ...args: any
): Promise<ListDominantLanguageDetectionJobsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListDominantLanguageDetectionJobsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: Comprehend,
  input: ListDominantLanguageDetectionJobsCommandInput,
  ...args: any
): Promise<ListDominantLanguageDetectionJobsCommandOutput> => {
  // @ts-ignore
  return await client.listDominantLanguageDetectionJobs(input, ...args);
};
export async function* paginateListDominantLanguageDetectionJobs(
  config: ComprehendPaginationConfiguration,
  input: ListDominantLanguageDetectionJobsCommandInput,
  ...additionalArguments: any
): Paginator<ListDominantLanguageDetectionJobsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListDominantLanguageDetectionJobsCommandOutput;
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
