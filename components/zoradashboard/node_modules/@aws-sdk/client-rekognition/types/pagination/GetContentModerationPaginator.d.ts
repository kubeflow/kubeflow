import { GetContentModerationCommandInput, GetContentModerationCommandOutput } from "../commands/GetContentModerationCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateGetContentModeration(config: RekognitionPaginationConfiguration, input: GetContentModerationCommandInput, ...additionalArguments: any): Paginator<GetContentModerationCommandOutput>;
