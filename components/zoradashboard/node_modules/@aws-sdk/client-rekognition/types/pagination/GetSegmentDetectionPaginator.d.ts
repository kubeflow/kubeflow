import { GetSegmentDetectionCommandInput, GetSegmentDetectionCommandOutput } from "../commands/GetSegmentDetectionCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateGetSegmentDetection(config: RekognitionPaginationConfiguration, input: GetSegmentDetectionCommandInput, ...additionalArguments: any): Paginator<GetSegmentDetectionCommandOutput>;
