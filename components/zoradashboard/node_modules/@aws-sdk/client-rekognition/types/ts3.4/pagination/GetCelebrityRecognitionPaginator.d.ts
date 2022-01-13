import { GetCelebrityRecognitionCommandInput, GetCelebrityRecognitionCommandOutput } from "../commands/GetCelebrityRecognitionCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateGetCelebrityRecognition(config: RekognitionPaginationConfiguration, input: GetCelebrityRecognitionCommandInput, ...additionalArguments: any): Paginator<GetCelebrityRecognitionCommandOutput>;
