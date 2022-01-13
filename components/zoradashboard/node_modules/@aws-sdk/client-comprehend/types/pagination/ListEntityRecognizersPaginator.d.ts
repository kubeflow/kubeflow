import { ListEntityRecognizersCommandInput, ListEntityRecognizersCommandOutput } from "../commands/ListEntityRecognizersCommand";
import { ComprehendPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListEntityRecognizers(config: ComprehendPaginationConfiguration, input: ListEntityRecognizersCommandInput, ...additionalArguments: any): Paginator<ListEntityRecognizersCommandOutput>;
