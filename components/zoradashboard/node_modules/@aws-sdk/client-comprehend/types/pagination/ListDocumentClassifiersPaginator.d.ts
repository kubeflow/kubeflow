import { ListDocumentClassifiersCommandInput, ListDocumentClassifiersCommandOutput } from "../commands/ListDocumentClassifiersCommand";
import { ComprehendPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";
export declare function paginateListDocumentClassifiers(config: ComprehendPaginationConfiguration, input: ListDocumentClassifiersCommandInput, ...additionalArguments: any): Paginator<ListDocumentClassifiersCommandOutput>;
