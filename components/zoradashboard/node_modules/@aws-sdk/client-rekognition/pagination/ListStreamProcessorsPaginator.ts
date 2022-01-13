import { Rekognition } from "../Rekognition";
import { RekognitionClient } from "../RekognitionClient";
import {
  ListStreamProcessorsCommand,
  ListStreamProcessorsCommandInput,
  ListStreamProcessorsCommandOutput,
} from "../commands/ListStreamProcessorsCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: RekognitionClient,
  input: ListStreamProcessorsCommandInput,
  ...args: any
): Promise<ListStreamProcessorsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListStreamProcessorsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: Rekognition,
  input: ListStreamProcessorsCommandInput,
  ...args: any
): Promise<ListStreamProcessorsCommandOutput> => {
  // @ts-ignore
  return await client.listStreamProcessors(input, ...args);
};
export async function* paginateListStreamProcessors(
  config: RekognitionPaginationConfiguration,
  input: ListStreamProcessorsCommandInput,
  ...additionalArguments: any
): Paginator<ListStreamProcessorsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListStreamProcessorsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof Rekognition) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof RekognitionClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Rekognition | RekognitionClient");
    }
    yield page;
    token = page.NextToken;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
