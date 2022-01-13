import { ListPartsCommandInput, ListPartsCommandOutput } from "../commands/ListPartsCommand";
import { S3PaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListParts(config: S3PaginationConfiguration, input: ListPartsCommandInput, ...additionalArguments: any): Paginator<ListPartsCommandOutput>;
