import { Comprehend } from "../Comprehend";
import { ComprehendClient } from "../ComprehendClient";
import { PaginationConfiguration } from "@aws-sdk/types";
export interface ComprehendPaginationConfiguration extends PaginationConfiguration {
    client: Comprehend | ComprehendClient;
}
