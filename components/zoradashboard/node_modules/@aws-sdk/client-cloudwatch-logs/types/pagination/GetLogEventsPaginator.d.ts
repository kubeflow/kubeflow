import { GetLogEventsCommandInput, GetLogEventsCommandOutput } from "../commands/GetLogEventsCommand";
import { CloudWatchLogsPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateGetLogEvents(config: CloudWatchLogsPaginationConfiguration, input: GetLogEventsCommandInput, ...additionalArguments: any): Paginator<GetLogEventsCommandOutput>;
