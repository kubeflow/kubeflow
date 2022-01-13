import { Rekognition } from "../Rekognition";
import { RekognitionClient } from "../RekognitionClient";
import {
  GetSegmentDetectionCommand,
  GetSegmentDetectionCommandInput,
  GetSegmentDetectionCommandOutput,
} from "../commands/GetSegmentDetectionCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: RekognitionClient,
  input: GetSegmentDetectionCommandInput,
  ...args: any
): Promise<GetSegmentDetectionCommandOutput> => {
  // @ts-ignore
  return await client.send(new GetSegmentDetectionCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: Rekognition,
  input: GetSegmentDetectionCommandInput,
  ...args: any
): Promise<GetSegmentDetectionCommandOutput> => {
  // @ts-ignore
  return await client.getSegmentDetection(input, ...args);
};
export async function* paginateGetSegmentDetection(
  config: RekognitionPaginationConfiguration,
  input: GetSegmentDetectionCommandInput,
  ...additionalArguments: any
): Paginator<GetSegmentDetectionCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: GetSegmentDetectionCommandOutput;
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
