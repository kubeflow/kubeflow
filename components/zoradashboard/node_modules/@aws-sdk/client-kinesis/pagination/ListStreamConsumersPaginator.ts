import { Kinesis } from "../Kinesis";
import { KinesisClient } from "../KinesisClient";
import {
  ListStreamConsumersCommand,
  ListStreamConsumersCommandInput,
  ListStreamConsumersCommandOutput,
} from "../commands/ListStreamConsumersCommand";
import { KinesisPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: KinesisClient,
  input: ListStreamConsumersCommandInput,
  ...args: any
): Promise<ListStreamConsumersCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListStreamConsumersCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: Kinesis,
  input: ListStreamConsumersCommandInput,
  ...args: any
): Promise<ListStreamConsumersCommandOutput> => {
  // @ts-ignore
  return await client.listStreamConsumers(input, ...args);
};
export async function* paginateListStreamConsumers(
  config: KinesisPaginationConfiguration,
  input: ListStreamConsumersCommandInput,
  ...additionalArguments: any
): Paginator<ListStreamConsumersCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListStreamConsumersCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof Kinesis) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof KinesisClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Kinesis | KinesisClient");
    }
    yield page;
    token = page.NextToken;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
