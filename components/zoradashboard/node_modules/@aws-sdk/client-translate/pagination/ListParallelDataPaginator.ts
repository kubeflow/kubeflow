import { Translate } from "../Translate";
import { TranslateClient } from "../TranslateClient";
import {
  ListParallelDataCommand,
  ListParallelDataCommandInput,
  ListParallelDataCommandOutput,
} from "../commands/ListParallelDataCommand";
import { TranslatePaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: TranslateClient,
  input: ListParallelDataCommandInput,
  ...args: any
): Promise<ListParallelDataCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListParallelDataCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: Translate,
  input: ListParallelDataCommandInput,
  ...args: any
): Promise<ListParallelDataCommandOutput> => {
  // @ts-ignore
  return await client.listParallelData(input, ...args);
};
export async function* paginateListParallelData(
  config: TranslatePaginationConfiguration,
  input: ListParallelDataCommandInput,
  ...additionalArguments: any
): Paginator<ListParallelDataCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListParallelDataCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof Translate) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof TranslateClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Translate | TranslateClient");
    }
    yield page;
    token = page.NextToken;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
