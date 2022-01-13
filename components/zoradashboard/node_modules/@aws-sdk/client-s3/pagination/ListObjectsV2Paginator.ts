import { S3 } from "../S3";
import { S3Client } from "../S3Client";
import {
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  ListObjectsV2CommandOutput,
} from "../commands/ListObjectsV2Command";
import { S3PaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: S3Client,
  input: ListObjectsV2CommandInput,
  ...args: any
): Promise<ListObjectsV2CommandOutput> => {
  // @ts-ignore
  return await client.send(new ListObjectsV2Command(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: S3,
  input: ListObjectsV2CommandInput,
  ...args: any
): Promise<ListObjectsV2CommandOutput> => {
  // @ts-ignore
  return await client.listObjectsV2(input, ...args);
};
export async function* paginateListObjectsV2(
  config: S3PaginationConfiguration,
  input: ListObjectsV2CommandInput,
  ...additionalArguments: any
): Paginator<ListObjectsV2CommandOutput> {
  // ToDo: replace with actual type instead of typeof input.ContinuationToken
  let token: typeof input.ContinuationToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListObjectsV2CommandOutput;
  while (hasNext) {
    input.ContinuationToken = token;
    input["MaxKeys"] = config.pageSize;
    if (config.client instanceof S3) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof S3Client) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected S3 | S3Client");
    }
    yield page;
    token = page.NextContinuationToken;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
