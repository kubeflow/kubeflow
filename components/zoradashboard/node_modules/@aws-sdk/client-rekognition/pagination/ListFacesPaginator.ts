import { Rekognition } from "../Rekognition";
import { RekognitionClient } from "../RekognitionClient";
import { ListFacesCommand, ListFacesCommandInput, ListFacesCommandOutput } from "../commands/ListFacesCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: RekognitionClient,
  input: ListFacesCommandInput,
  ...args: any
): Promise<ListFacesCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListFacesCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: Rekognition,
  input: ListFacesCommandInput,
  ...args: any
): Promise<ListFacesCommandOutput> => {
  // @ts-ignore
  return await client.listFaces(input, ...args);
};
export async function* paginateListFaces(
  config: RekognitionPaginationConfiguration,
  input: ListFacesCommandInput,
  ...additionalArguments: any
): Paginator<ListFacesCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListFacesCommandOutput;
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
