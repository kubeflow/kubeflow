import { Comprehend } from "../Comprehend";
import { ComprehendClient } from "../ComprehendClient";
import {
  ListDocumentClassificationJobsCommand,
  ListDocumentClassificationJobsCommandInput,
  ListDocumentClassificationJobsCommandOutput,
} from "../commands/ListDocumentClassificationJobsCommand";
import { ComprehendPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: ComprehendClient,
  input: ListDocumentClassificationJobsCommandInput,
  ...args: any
): Promise<ListDocumentClassificationJobsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListDocumentClassificationJobsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: Comprehend,
  input: ListDocumentClassificationJobsCommandInput,
  ...args: any
): Promise<ListDocumentClassificationJobsCommandOutput> => {
  // @ts-ignore
  return await client.listDocumentClassificationJobs(input, ...args);
};
export async function* paginateListDocumentClassificationJobs(
  config: ComprehendPaginationConfiguration,
  input: ListDocumentClassificationJobsCommandInput,
  ...additionalArguments: any
): Paginator<ListDocumentClassificationJobsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListDocumentClassificationJobsCommandOutput;
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
