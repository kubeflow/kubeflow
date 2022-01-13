import { GetPersonTrackingCommandInput, GetPersonTrackingCommandOutput } from "../commands/GetPersonTrackingCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateGetPersonTracking(config: RekognitionPaginationConfiguration, input: GetPersonTrackingCommandInput, ...additionalArguments: any): Paginator<GetPersonTrackingCommandOutput>;
