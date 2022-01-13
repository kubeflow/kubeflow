import { Polly } from "../Polly";
import { PollyClient } from "../PollyClient";
import { PaginationConfiguration } from "@aws-sdk/types";

export interface PollyPaginationConfiguration extends PaginationConfiguration {
  client: Polly | PollyClient;
}
