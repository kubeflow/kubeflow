import { Rekognition } from "../Rekognition";
import { RekognitionClient } from "../RekognitionClient";
import {
  GetFaceSearchCommand,
  GetFaceSearchCommandInput,
  GetFaceSearchCommandOutput,
} from "../commands/GetFaceSearchCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: RekognitionClient,
  input: GetFaceSearchCommandInput,
  ...args: any
): Promise<GetFaceSearchCommandOutput> => {
  // @ts-ignore
  return await client.send(new GetFaceSearchCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: Rekognition,
  input: GetFaceSearchCommandInput,
  ...args: any
): Promise<GetFaceSearchCommandOutput> => {
  // @ts-ignore
  return await client.getFaceSearch(input, ...args);
};
export async function* paginateGetFaceSearch(
  config: RekognitionPaginationConfiguration,
  input: GetFaceSearchCommandInput,
  ...additionalArguments: any
): Paginator<GetFaceSearchCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: GetFaceSearchCommandOutput;
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
