import { ListTerminologiesCommandInput, ListTerminologiesCommandOutput } from "../commands/ListTerminologiesCommand";
import { TranslatePaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListTerminologies(config: TranslatePaginationConfiguration, input: ListTerminologiesCommandInput, ...additionalArguments: any): Paginator<ListTerminologiesCommandOutput>;
