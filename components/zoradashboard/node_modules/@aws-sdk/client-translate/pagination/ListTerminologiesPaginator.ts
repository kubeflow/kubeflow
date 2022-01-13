import { Translate } from "../Translate";
import { TranslateClient } from "../TranslateClient";
import {
  ListTerminologiesCommand,
  ListTerminologiesCommandInput,
  ListTerminologiesCommandOutput,
} from "../commands/ListTerminologiesCommand";
import { TranslatePaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: TranslateClient,
  input: ListTerminologiesCommandInput,
  ...args: any
): Promise<ListTerminologiesCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListTerminologiesCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: Translate,
  input: ListTerminologiesCommandInput,
  ...args: any
): Promise<ListTerminologiesCommandOutput> => {
  // @ts-ignore
  return await client.listTerminologies(input, ...args);
};
export async function* paginateListTerminologies(
  config: TranslatePaginationConfiguration,
  input: ListTerminologiesCommandInput,
  ...additionalArguments: any
): Paginator<ListTerminologiesCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListTerminologiesCommandOutput;
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
