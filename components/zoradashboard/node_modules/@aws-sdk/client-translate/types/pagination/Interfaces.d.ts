import { Translate } from "../Translate";
import { TranslateClient } from "../TranslateClient";
import { PaginationConfiguration } from "@aws-sdk/types";
export interface TranslatePaginationConfiguration extends PaginationConfiguration {
    client: Translate | TranslateClient;
}
