import { CognitoIdentity } from "../CognitoIdentity";
import { CognitoIdentityClient } from "../CognitoIdentityClient";
import {
  ListIdentityPoolsCommand,
  ListIdentityPoolsCommandInput,
  ListIdentityPoolsCommandOutput,
} from "../commands/ListIdentityPoolsCommand";
import { CognitoIdentityPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

/**
 * @private
 */
const makePagedClientRequest = async (
  client: CognitoIdentityClient,
  input: ListIdentityPoolsCommandInput,
  ...args: any
): Promise<ListIdentityPoolsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListIdentityPoolsCommand(input), ...args);
};
/**
 * @private
 */
const makePagedRequest = async (
  client: CognitoIdentity,
  input: ListIdentityPoolsCommandInput,
  ...args: any
): Promise<ListIdentityPoolsCommandOutput> => {
  // @ts-ignore
  return await client.listIdentityPools(input, ...args);
};
export async function* paginateListIdentityPools(
  config: CognitoIdentityPaginationConfiguration,
  input: ListIdentityPoolsCommandInput,
  ...additionalArguments: any
): Paginator<ListIdentityPoolsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListIdentityPoolsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof CognitoIdentity) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof CognitoIdentityClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected CognitoIdentity | CognitoIdentityClient");
    }
    yield page;
    token = page.NextToken;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
