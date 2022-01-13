import { ListFacesCommandInput, ListFacesCommandOutput } from "../commands/ListFacesCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListFaces(config: RekognitionPaginationConfiguration, input: ListFacesCommandInput, ...additionalArguments: any): Paginator<ListFacesCommandOutput>;
