import { Rekognition } from "../Rekognition";
import { RekognitionClient } from "../RekognitionClient";
import {
  DescribeProjectVersionsCommand,
  DescribeProjectVersionsCommandInput,
  DescribeProjectVersionsCommandOutput,
} from "../commands/DescribeProjectVersionsCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: RekognitionClient,
  input: DescribeProjectVersionsCommandInput,
  ...args: any
): Promise<DescribeProjectVersionsCommandOutput> => {
  // @ts-ignore
  return await client.send(new DescribeProjectVersionsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: Rekognition,
  input: DescribeProjectVersionsCommandInput,
  ...args: any
): Promise<DescribeProjectVersionsCommandOutput> => {
  // @ts-ignore
  return await client.describeProjectVersions(input, ...args);
};
export async function* paginateDescribeProjectVersions(
  config: RekognitionPaginationConfiguration,
  input: DescribeProjectVersionsCommandInput,
  ...additionalArguments: any
): Paginator<DescribeProjectVersionsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: DescribeProjectVersionsCommandOutput;
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
