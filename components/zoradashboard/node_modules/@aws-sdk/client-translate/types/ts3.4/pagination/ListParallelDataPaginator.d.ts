import { ListParallelDataCommandInput, ListParallelDataCommandOutput } from "../commands/ListParallelDataCommand";
import { TranslatePaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListParallelData(config: TranslatePaginationConfiguration, input: ListParallelDataCommandInput, ...additionalArguments: any): Paginator<ListParallelDataCommandOutput>;
