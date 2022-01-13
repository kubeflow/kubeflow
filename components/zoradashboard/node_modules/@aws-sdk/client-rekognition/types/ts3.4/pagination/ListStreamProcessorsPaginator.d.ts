import { ListStreamProcessorsCommandInput, ListStreamProcessorsCommandOutput } from "../commands/ListStreamProcessorsCommand";
import { RekognitionPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListStreamProcessors(config: RekognitionPaginationConfiguration, input: ListStreamProcessorsCommandInput, ...additionalArguments: any): Paginator<ListStreamProcessorsCommandOutput>;
