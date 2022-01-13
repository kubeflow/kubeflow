import { ListCollectionsCommandInput, ListCollectionsCommandOutput } from "../commands/ListCollectionsCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListCollections(config: RekognitionPaginationConfiguration, input: ListCollectionsCommandInput, ...additionalArguments: any): Paginator<ListCollectionsCommandOutput>;
