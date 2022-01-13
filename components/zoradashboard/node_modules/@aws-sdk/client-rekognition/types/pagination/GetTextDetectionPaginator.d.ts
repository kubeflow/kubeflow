import { GetTextDetectionCommandInput, GetTextDetectionCommandOutput } from "../commands/GetTextDetectionCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateGetTextDetection(config: RekognitionPaginationConfiguration, input: GetTextDetectionCommandInput, ...additionalArguments: any): Paginator<GetTextDetectionCommandOutput>;
