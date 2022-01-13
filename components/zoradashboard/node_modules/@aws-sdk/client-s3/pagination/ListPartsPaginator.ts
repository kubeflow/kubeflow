import { S3 } from "../S3";
import { S3Client } from "../S3Client";
import { ListPartsCommand, ListPartsCommandInput, ListPartsCommandOutput } from "../commands/ListPartsCommand";
import { S3PaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: S3Client,
  input: ListPartsCommandInput,
  ...args: any
): Promise<ListPartsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListPartsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: S3,
  input: ListPartsCommandInput,
  ...args: any
): Promise<ListPartsCommandOutput> => {
  // @ts-ignore
  return await client.listParts(input, ...args);
};
export async function* paginateListParts(
  config: S3PaginationConfiguration,
  input: ListPartsCommandInput,
  ...additionalArguments: any
): Paginator<ListPartsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.PartNumberMarker
  let token: typeof input.PartNumberMarker | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListPartsCommandOutput;
  while (hasNext) {
    input.PartNumberMarker = token;
    input["MaxParts"] = config.pageSize;
    if (config.client instanceof S3) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof S3Client) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected S3 | S3Client");
    }
    yield page;
    token = page.NextPartNumberMarker;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
