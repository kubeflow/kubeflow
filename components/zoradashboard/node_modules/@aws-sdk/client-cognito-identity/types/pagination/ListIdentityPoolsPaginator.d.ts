import { ListIdentityPoolsCommandInput, ListIdentityPoolsCommandOutput } from "../commands/ListIdentityPoolsCommand";
import { CognitoIdentityPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListIdentityPools(config: CognitoIdentityPaginationConfiguration, input: ListIdentityPoolsCommandInput, ...additionalArguments: any): Paginator<ListIdentityPoolsCommandOutput>;
