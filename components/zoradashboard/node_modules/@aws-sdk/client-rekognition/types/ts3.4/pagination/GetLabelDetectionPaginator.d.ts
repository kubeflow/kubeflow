import { GetLabelDetectionCommandInput, GetLabelDetectionCommandOutput } from "../commands/GetLabelDetectionCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateGetLabelDetection(config: RekognitionPaginationConfiguration, input: GetLabelDetectionCommandInput, ...additionalArguments: any): Paginator<GetLabelDetectionCommandOutput>;
