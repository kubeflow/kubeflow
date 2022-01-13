import { GetFaceSearchCommandInput, GetFaceSearchCommandOutput } from "../commands/GetFaceSearchCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateGetFaceSearch(config: RekognitionPaginationConfiguration, input: GetFaceSearchCommandInput, ...additionalArguments: any): Paginator<GetFaceSearchCommandOutput>;
