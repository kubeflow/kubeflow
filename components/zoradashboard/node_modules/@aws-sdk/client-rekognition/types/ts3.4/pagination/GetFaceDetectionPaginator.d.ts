import { GetFaceDetectionCommandInput, GetFaceDetectionCommandOutput } from "../commands/GetFaceDetectionCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateGetFaceDetection(config: RekognitionPaginationConfiguration, input: GetFaceDetectionCommandInput, ...additionalArguments: any): Paginator<GetFaceDetectionCommandOutput>;
