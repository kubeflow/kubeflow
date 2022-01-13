import { FilterLogEventsCommandInput, FilterLogEventsCommandOutput } from "../commands/FilterLogEventsCommand";
import { CloudWatchLogsPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateFilterLogEvents(config: CloudWatchLogsPaginationConfiguration, input: FilterLogEventsCommandInput, ...additionalArguments: any): Paginator<FilterLogEventsCommandOutput>;
