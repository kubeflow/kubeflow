import { Rekognition } from "../Rekognition";
import { RekognitionClient } from "../RekognitionClient";
import {
  GetCelebrityRecognitionCommand,
  GetCelebrityRecognitionCommandInput,
  GetCelebrityRecognitionCommandOutput,
} from "../commands/GetCelebrityRecognitionCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: RekognitionClient,
  input: GetCelebrityRecognitionCommandInput,
  ...args: any
): Promise<GetCelebrityRecognitionCommandOutput> => {
  // @ts-ignore
  return await client.send(new GetCelebrityRecognitionCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: Rekognition,
  input: GetCelebrityRecognitionCommandInput,
  ...args: any
): Promise<GetCelebrityRecognitionCommandOutput> => {
  // @ts-ignore
  return await client.getCelebrityRecognition(input, ...args);
};
export async function* paginateGetCelebrityRecognition(
  config: RekognitionPaginationConfiguration,
  input: GetCelebrityRecognitionCommandInput,
  ...additionalArguments: any
): Paginator<GetCelebrityRecognitionCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: GetCelebrityRecognitionCommandOutput;
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
