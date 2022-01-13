import { CognitoIdentity } from "../CognitoIdentity";
import { CognitoIdentityClient } from "../CognitoIdentityClient";
import { PaginationConfiguration } from "@aws-sdk/types";

export interface CognitoIdentityPaginationConfiguration extends PaginationConfiguration {
  client: CognitoIdentity | CognitoIdentityClient;
}
